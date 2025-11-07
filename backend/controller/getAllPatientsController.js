// controllers/patientController.js
import { connection } from '../config/db.js';

// Get all patients with basic info
export const getAllPatientsController = (req, res) => {
  const query = `
    SELECT 
      patient_id,
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      gender,
      nationality,
      occupation,
      email,
      marital_status,
      mobile_number,
      created_at
    FROM patient_info 
    ORDER BY created_at DESC
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      return res.status(500).json({
        success: false,
        message: 'Error fetching patients',
        error: err.message
      });
    }

    res.json({
      success: true,
      patients: results,
      count: results.length
    });
  });
};

// Get complete patient details by ID
export const getPatientDetailsController = (req, res) => {
  const patientId = req.params.id;

  if (!patientId) {
    return res.status(400).json({
      success: false,
      message: 'Patient ID is required'
    });
  }

  // Query to get all patient data in one go with JOINs
  const query = `
    SELECT 
      -- Patient Info
      pi.*,
      
      -- Medical Info
      pmi.blood_type,
      pmi.height,
      pmi.weight,
      pmi.primary_physician,
      pmi.medical_history,
      pmi.current_medications,
      pmi.created_at as medical_info_created,
      
      -- Latest Vital Signs
      pvs.blood_pressure,
      pvs.heart_rate,
      pvs.temperature,
      pvs.respiratory_rate,
      pvs.oxygen_saturation,
      pvs.recorded_at as vitals_recorded,
      
      -- Emergency Contact
      pec.contact_name,
      pec.relation,
      pec.phone as emergency_phone,
      pec.email as emergency_email,
      
      -- Allergies
      GROUP_CONCAT(
        DISTINCT CONCAT(
          pa.allergen, '|', 
          COALESCE(pa.reaction, ''), '|', 
          COALESCE(pa.severity, '')
        ) SEPARATOR ';;'
      ) as allergies_data
      
    FROM patient_info pi
    LEFT JOIN patient_medical_info pmi ON pi.patient_id = pmi.patient_id
    LEFT JOIN patient_vital_signs pvs ON pi.patient_id = pvs.patient_id 
      AND pvs.recorded_at = (
        SELECT MAX(recorded_at) 
        FROM patient_vital_signs 
        WHERE patient_id = pi.patient_id
      )
    LEFT JOIN patient_emergency_contact pec ON pi.patient_id = pec.patient_id
    LEFT JOIN patient_allergy pa ON pi.patient_id = pa.patient_id
    WHERE pi.patient_id = ?
    GROUP BY pi.patient_id
  `;

  connection.query(query, [patientId], (err, results) => {
    if (err) {
      console.error('Error fetching patient details:', err);
      return res.status(500).json({
        success: false,
        message: 'Error fetching patient details',
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    const patientData = results[0];

    // Parse allergies data
    let allergies = [];
    if (patientData.allergies_data) {
      allergies = patientData.allergies_data.split(';;').map(allergyStr => {
        const [allergen, reaction, severity] = allergyStr.split('|');
        return {
          allergen,
          reaction: reaction || '',
          severity: severity || ''
        };
      });
    }

    // Format the response
    const formattedPatient = {
      patient_id: patientData.patient_id,
      personal: {
        first_name: patientData.first_name,
        middle_name: patientData.middle_name,
        last_name: patientData.last_name,
        date_of_birth: patientData.date_of_birth,
        gender: patientData.gender,
        nationality: patientData.nationality,
        occupation: patientData.occupation,
        email: patientData.email,
        marital_status: patientData.marital_status
      },
      contact: {
        street_address: patientData.street_address,
        barangay: patientData.barangay,
        city_municipality: patientData.city_municipality,
        province: patientData.province,
        region: patientData.region,
        postal_code: patientData.postal_code,
        mobile_number: patientData.mobile_number,
        telephone: patientData.telephone
      },
      medical: {
        blood_type: patientData.blood_type,
        height: patientData.height,
        weight: patientData.weight,
        primary_physician: patientData.primary_physician,
        medical_history: patientData.medical_history,
        current_medications: patientData.current_medications
      },
      vitals: {
        blood_pressure: patientData.blood_pressure,
        heart_rate: patientData.heart_rate,
        temperature: patientData.temperature,
        respiratory_rate: patientData.respiratory_rate,
        oxygen_saturation: patientData.oxygen_saturation,
        recorded_at: patientData.vitals_recorded
      },
      emergency_contact: {
        contact_name: patientData.contact_name,
        relation: patientData.relation,
        phone: patientData.emergency_phone,
        email: patientData.emergency_email
      },
      allergies: allergies,
      created_at: patientData.created_at
    };

    res.json({
      success: true,
      patient: formattedPatient
    });
  });
};

// Alternative: Get patient details with separate queries (more modular)
export const getPatientDetailsSeparateController = (req, res) => {
  const patientId = req.params.id;

  if (!patientId) {
    return res.status(400).json({
      success: false,
      message: 'Patient ID is required'
    });
  }

  const queries = {
    patientInfo: 'SELECT * FROM patient_info WHERE patient_id = ?',
    medicalInfo: 'SELECT * FROM patient_medical_info WHERE patient_id = ?',
    vitalSigns: 'SELECT * FROM patient_vital_signs WHERE patient_id = ? ORDER BY recorded_at DESC LIMIT 1',
    emergencyContact: 'SELECT * FROM patient_emergency_contact WHERE patient_id = ?',
    allergies: 'SELECT * FROM patient_allergy WHERE patient_id = ?'
  };

  // Execute all queries
  connection.query(queries.patientInfo, [patientId], (patientErr, patientResults) => {
    if (patientErr) {
      console.error('Error fetching patient info:', patientErr);
      return res.status(500).json({
        success: false,
        message: 'Error fetching patient information',
        error: patientErr.message
      });
    }

    if (patientResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    const patientData = patientResults[0];

    // Execute remaining queries
    Promise.all([
      new Promise((resolve) => 
        connection.query(queries.medicalInfo, [patientId], (err, results) => resolve(results[0] || {}))
      ),
      new Promise((resolve) => 
        connection.query(queries.vitalSigns, [patientId], (err, results) => resolve(results[0] || {}))
      ),
      new Promise((resolve) => 
        connection.query(queries.emergencyContact, [patientId], (err, results) => resolve(results[0] || {}))
      ),
      new Promise((resolve) => 
        connection.query(queries.allergies, [patientId], (err, results) => resolve(results || []))
      )
    ]).then(([medical, vitals, emergency, allergies]) => {
      const formattedPatient = {
        patient_id: patientData.patient_id,
        personal: {
          first_name: patientData.first_name,
          middle_name: patientData.middle_name,
          last_name: patientData.last_name,
          date_of_birth: patientData.date_of_birth,
          gender: patientData.gender,
          nationality: patientData.nationality,
          occupation: patientData.occupation,
          email: patientData.email,
          marital_status: patientData.marital_status
        },
        contact: {
          street_address: patientData.street_address,
          barangay: patientData.barangay,
          city_municipality: patientData.city_municipality,
          province: patientData.province,
          region: patientData.region,
          postal_code: patientData.postal_code,
          mobile_number: patientData.mobile_number,
          telephone: patientData.telephone
        },
        medical: medical,
        vitals: vitals,
        emergency_contact: emergency,
        allergies: allergies,
        created_at: patientData.created_at
      };

      res.json({
        success: true,
        patient: formattedPatient
      });
    }).catch(error => {
      console.error('Error fetching patient details:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching patient details',
        error: error.message
      });
    });
  });
};

// Search patients by name or other criteria
export const searchPatientsController = (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      patient_id,
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      gender,
      mobile_number,
      email,
      created_at
    FROM patient_info 
  `;
  
  let countQuery = `SELECT COUNT(*) as total FROM patient_info`;
  let queryParams = [];

  if (search) {
    const searchCondition = `
      WHERE first_name LIKE ? 
      OR middle_name LIKE ? 
      OR last_name LIKE ? 
      OR mobile_number LIKE ?
      OR email LIKE ?
    `;
    query += searchCondition;
    countQuery += searchCondition;
    const searchTerm = `%${search}%`;
    queryParams = [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm];
  }

  query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  queryParams.push(parseInt(limit), parseInt(offset));

  // Get total count
  connection.query(countQuery, queryParams.slice(0, -2), (countErr, countResults) => {
    if (countErr) {
      console.error('Error counting patients:', countErr);
      return res.status(500).json({
        success: false,
        message: 'Error searching patients',
        error: countErr.message
      });
    }

    // Get patients
    connection.query(query, queryParams, (err, results) => {
      if (err) {
        console.error('Error searching patients:', err);
        return res.status(500).json({
          success: false,
          message: 'Error searching patients',
          error: err.message
        });
      }

      res.json({
        success: true,
        patients: results,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResults[0].total,
          pages: Math.ceil(countResults[0].total / limit)
        }
      });
    });
  });
};