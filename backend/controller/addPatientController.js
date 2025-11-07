// controllers/patientController.js
import { connection } from '../config/db.js';

export const addPatientController = (req, res) => {
  const {
    // Personal Info
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    gender,
    nationality,
    occupation,
    personalEmail,
    maritalStatus,
    
    // Address Info
    streetAddress,
    barangay,
    cityMunicipality,
    province,
    region,
    postalCode,
    mobileNumber,
    telephone,
    addressEmail,
    
    // Medical Info
    bloodType,
    height,
    weight,
    primaryPhysician,
    medicalHistory,
    currentMedications,
    
    // Vital Signs
    bloodPressure,
    heartRate,
    temperature,
    respiratoryRate,
    oxygenSaturation,
    
    // Emergency Contact
    emergencyContactName,
    emergencyRelation,
    emergencyPhone,
    
    // Allergies
    allergies
  } = req.body;

  // Start transaction
  connection.beginTransaction(async (beginErr) => {
    if (beginErr) {
      console.error('Error starting transaction:', beginErr);
      return res.status(500).json({
        success: false,
        message: 'Error starting transaction',
        error: beginErr.message
      });
    }

    try {
      // 1. Insert into patient_info
      const patientQuery = `
        INSERT INTO patient_info (
          first_name, middle_name, last_name, date_of_birth, gender, nationality,
          occupation, email, marital_status, street_address, barangay, city_municipality,
          province, region, postal_code, mobile_number, telephone
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const patientValues = [
        firstName, middleName, lastName, dateOfBirth, gender, nationality,
        occupation, personalEmail, maritalStatus, streetAddress, barangay, cityMunicipality,
        province, region, postalCode, mobileNumber, telephone
      ];

      connection.query(patientQuery, patientValues, (patientErr, patientResult) => {
        if (patientErr) {
          return connection.rollback(() => {
            console.error('Error inserting patient info:', patientErr);
            res.status(500).json({
              success: false,
              message: 'Error inserting patient information',
              error: patientErr.message
            });
          });
        }

        const patientId = patientResult.insertId;

        // Array to track all pending queries
        const queries = [];

        // 2. Insert medical info if provided
        if (bloodType || height || weight || primaryPhysician || medicalHistory || currentMedications) {
          const medicalQuery = `
            INSERT INTO patient_medical_info (
              patient_id, blood_type, height, weight, primary_physician,
              medical_history, current_medications
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          const medicalValues = [patientId, bloodType, height, weight, primaryPhysician, medicalHistory, currentMedications];
          
          queries.push(new Promise((resolve, reject) => {
            connection.query(medicalQuery, medicalValues, (medicalErr) => {
              if (medicalErr) reject(medicalErr);
              else resolve();
            });
          }));
        }

        // 3. Insert vital signs if provided
        if (bloodPressure || heartRate || temperature || respiratoryRate || oxygenSaturation) {
          const vitalsQuery = `
            INSERT INTO patient_vital_signs (
              patient_id, blood_pressure, heart_rate, temperature,
              respiratory_rate, oxygen_saturation
            ) VALUES (?, ?, ?, ?, ?, ?)
          `;
          const vitalsValues = [patientId, bloodPressure, heartRate, temperature, respiratoryRate, oxygenSaturation];
          
          queries.push(new Promise((resolve, reject) => {
            connection.query(vitalsQuery, vitalsValues, (vitalsErr) => {
              if (vitalsErr) reject(vitalsErr);
              else resolve();
            });
          }));
        }

        // 4. Insert emergency contact if provided
        if (emergencyContactName) {
          const emergencyQuery = `
            INSERT INTO patient_emergency_contact (
              patient_id, contact_name, relation, phone, email
            ) VALUES (?, ?, ?, ?, ?)
          `;
          const emergencyValues = [patientId, emergencyContactName, emergencyRelation, emergencyPhone, addressEmail];
          
          queries.push(new Promise((resolve, reject) => {
            connection.query(emergencyQuery, emergencyValues, (emergencyErr) => {
              if (emergencyErr) reject(emergencyErr);
              else resolve();
            });
          }));
        }

        // 5. Insert allergies if any
        if (allergies && allergies.length > 0) {
          const allergyQuery = `
            INSERT INTO patient_allergy (patient_id, allergen, reaction, severity)
            VALUES ?
          `;
          const allergyValues = allergies.map(allergy => [
            patientId,
            allergy.allergen,
            allergy.reaction,
            allergy.severity
          ]);
          
          queries.push(new Promise((resolve, reject) => {
            connection.query(allergyQuery, [allergyValues], (allergyErr) => {
              if (allergyErr) reject(allergyErr);
              else resolve();
            });
          }));
        }

        // Execute all queries and commit transaction
        Promise.all(queries)
          .then(() => {
            connection.commit((commitErr) => {
              if (commitErr) {
                return connection.rollback(() => {
                  console.error('Error committing transaction:', commitErr);
                  res.status(500).json({
                    success: false,
                    message: 'Error committing transaction',
                    error: commitErr.message
                  });
                });
              }

              res.status(201).json({
                success: true,
                message: 'Patient registered successfully',
                patientId: patientId
              });
            });
          })
          .catch((queryErr) => {
            connection.rollback(() => {
              console.error('Error in one of the queries:', queryErr);
              res.status(500).json({
                success: false,
                message: 'Error inserting patient data',
                error: queryErr.message
              });
            });
          });

      });

    } catch (error) {
      connection.rollback(() => {
        console.error('Unexpected error:', error);
        res.status(500).json({
          success: false,
          message: 'Unexpected error occurred',
          error: error.message
        });
      });
    }
  });
};

// Optional: Get all patients controller
export const getPatientsController = (req, res) => {
  const query = `
    SELECT 
      p.patient_id,
      p.first_name,
      p.middle_name,
      p.last_name,
      p.date_of_birth,
      p.gender,
      p.mobile_number,
      p.email,
      p.created_at
    FROM patient_info p
    ORDER BY p.created_at DESC
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
      patients: results
    });
  });
};

// Optional: Get single patient by ID
export const getPatientByIdController = (req, res) => {
  const patientId = req.params.id;

  const patientQuery = 'SELECT * FROM patient_info WHERE patient_id = ?';
  const medicalQuery = 'SELECT * FROM patient_medical_info WHERE patient_id = ?';
  const vitalsQuery = 'SELECT * FROM patient_vital_signs WHERE patient_id = ? ORDER BY recorded_at DESC LIMIT 1';
  const emergencyQuery = 'SELECT * FROM patient_emergency_contact WHERE patient_id = ?';
  const allergyQuery = 'SELECT * FROM patient_allergy WHERE patient_id = ?';

  connection.query(patientQuery, [patientId], (patientErr, patientResults) => {
    if (patientErr) {
      console.error('Error fetching patient:', patientErr);
      return res.status(500).json({
        success: false,
        message: 'Error fetching patient',
        error: patientErr.message
      });
    }

    if (patientResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Fetch all related data
    Promise.all([
      new Promise((resolve) => connection.query(medicalQuery, [patientId], (err, results) => resolve(results))),
      new Promise((resolve) => connection.query(vitalsQuery, [patientId], (err, results) => resolve(results))),
      new Promise((resolve) => connection.query(emergencyQuery, [patientId], (err, results) => resolve(results))),
      new Promise((resolve) => connection.query(allergyQuery, [patientId], (err, results) => resolve(results)))
    ]).then(([medical, vitals, emergency, allergies]) => {
      res.json({
        success: true,
        patient: {
          ...patientResults[0],
          medical: medical[0] || {},
          vitals: vitals[0] || {},
          emergency: emergency[0] || {},
          allergies: allergies
        }
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