import React, { useState, useEffect } from 'react';
import { 
  User, Phone, Mail, MapPin, Calendar, Heart, 
  AlertTriangle, Users, Activity, Edit, FileText,
  ChevronRight, Star, Stethoscope, Plus, Clock, UserCheck, CheckCircle, XCircle
} from 'lucide-react';

export default function PatientDetails({ patientId, onBack }) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    if (patientId) {
      fetchPatientDetails();
      fetchVisits();
    }
  }, [patientId]);

  const fetchPatientDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/patients/${patientId}`);
      const data = await response.json();
      console.log('Patient API Response:', data);
      if (data.success) {
        setPatient(data.patient);
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVisits = async () => {
    try {
      // Mock data - replace with actual API call
      const mockVisits = [
        {
          id: 1,
          scheduled_date: '2024-01-15',
          created_date: '2024-01-10',
          doctor_name: 'Dr. Smith',
          status: 'Scheduled'
        },
        {
          id: 2,
          scheduled_date: '2024-01-20',
          created_date: '2024-01-12',
          doctor_name: 'Dr. Johnson',
          status: 'Completed'
        },
        {
          id: 3,
          scheduled_date: '2024-01-25',
          created_date: '2024-01-18',
          doctor_name: 'Dr. Williams',
          status: 'Cancelled'
        }
      ];
      setVisits(mockVisits);
    } catch (error) {
      console.error('Error fetching visits:', error);
    }
  };

  // Navigation items
  const navItems = [
    { id: 'personal', label: 'PERSONAL DETAILS', icon: User },
    { id: 'medical', label: 'MEDICAL DETAILS', icon: Heart },
    { id: 'contacts', label: 'CONTACTS DETAILS', icon: Users },
    { id: 'allergies', label: 'ALLERGIES DETAILS', icon: AlertTriangle },
    { id: 'visits', label: 'VISITS', icon: FileText },
  ];

  if (loading) {
    return (
      <div className="w-full h-full bg-white rounded-lg border border-gray-200">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 rounded-t-lg"></div>
          <div className="flex">
            <div className="w-64 border-r border-gray-200 p-4 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="flex-1 p-6 space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="w-full h-full bg-white rounded-lg border border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">Patient not found</p>
          <p className="text-sm">Please select a valid patient</p>
        </div>
      </div>
    );
  }

  // Safe data access functions
  const getPersonalData = () => patient.personal || patient || {};
  const getMedicalData = () => patient.medical || {};
  const getContactData = () => patient.contact || patient || {};
  const getVitalsData = () => patient.vitals || {};
  const getEmergencyData = () => patient.emergency_contact || {};
  const getAllergiesData = () => patient.allergies || [];

  const getFullName = () => {
    const personal = getPersonalData();
    const names = [
      personal.first_name,
      personal.middle_name,
      personal.last_name
    ].filter(Boolean);
    return names.join(' ') || 'Unknown Patient';
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    try {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    } catch {
      return 'N/A';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalDetails patient={patient} getPersonalData={getPersonalData} calculateAge={calculateAge} formatDate={formatDate} />;
      case 'medical':
        return <MedicalDetails patient={patient} getMedicalData={getMedicalData} getVitalsData={getVitalsData} formatDate={formatDate} />;
      case 'contacts':
        return <ContactDetails patient={patient} getPersonalData={getPersonalData} getContactData={getContactData} getEmergencyData={getEmergencyData} />;
      case 'allergies':
        return <AllergyDetails patient={patient} getAllergiesData={getAllergiesData} />;
      case 'visits':
        return <VisitDetails patient={patient} visits={visits} formatDate={formatDate} onAddVisit={() => setShowVisitModal(true)} />;
      default:
        return <PersonalDetails patient={patient} getPersonalData={getPersonalData} calculateAge={calculateAge} formatDate={formatDate} />;
    }
  };

  return (
    <div className="w-full h-150 bg-white rounded-lg border border-gray-200 flex flex-col">
      {/* Thin Top Navbar - Patient Basic Info */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {getFullName()}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {calculateAge(getPersonalData().date_of_birth)} years
                  </span>
                  <span>{getPersonalData().gender || 'N/A'}</span>
                  <span>ID: {patient.patient_id}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>{isEditing ? 'Save' : 'Edit'}</span>
            </button>
            {onBack && (
              <button 
                onClick={onBack}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Back to List
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Navigation */}
        <div className="w-64 border-r border-gray-200 bg-gray-50">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                      : 'text-gray-700 hover:bg-white hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ml-auto ${
                    activeSection === item.id ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Add Visit Modal */}
      {showVisitModal && (
        <AddVisitModal 
          onClose={() => setShowVisitModal(false)}
          onSave={(newVisit) => {
            setVisits(prev => [...prev, { ...newVisit, id: Date.now() }]);
            setShowVisitModal(false);
          }}
          patientName={getFullName()}
        />
      )}
    </div>
  );
}

// Personal Details Component
function PersonalDetails({ patient, getPersonalData, calculateAge, formatDate }) {
  const personal = getPersonalData();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        <div className="text-sm text-gray-500">
          Last updated: {formatDate(patient.created_at)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          icon={User}
          title="Basic Info"
          items={[
            { label: 'Full Name', value: [
              personal.first_name,
              personal.middle_name,
              personal.last_name
            ].filter(Boolean).join(' ') || 'Not provided' },
            { label: 'Date of Birth', value: formatDate(personal.date_of_birth) },
            { label: 'Age', value: `${calculateAge(personal.date_of_birth)} years` },
            { label: 'Gender', value: personal.gender },
          ]}
        />

        <InfoCard
          icon={Calendar}
          title="Demographics"
          items={[
            { label: 'Nationality', value: personal.nationality || 'Not provided' },
            { label: 'Occupation', value: personal.occupation || 'Not provided' },
            { label: 'Marital Status', value: personal.marital_status || 'Not provided' },
          ]}
        />

        <InfoCard
          icon={Star}
          title="Identification"
          items={[
            { label: 'Patient ID', value: patient.patient_id },
            { label: 'Registration Date', value: formatDate(patient.created_at) },
          ]}
        />
      </div>
    </div>
  );
}

// Medical Details Component
function MedicalDetails({ patient, getMedicalData, getVitalsData, formatDate }) {
  const medical = getMedicalData();
  const vitals = getVitalsData();
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Medical Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          icon={Heart}
          title="Vital Statistics"
          items={[
            { label: 'Blood Type', value: medical.blood_type || 'Not recorded' },
            { label: 'Height', value: medical.height ? `${medical.height} cm` : 'Not recorded' },
            { label: 'Weight', value: medical.weight ? `${medical.weight} kg` : 'Not recorded' },
          ]}
        />

        <InfoCard
          icon={Activity}
          title="Latest Vitals"
          items={[
            { label: 'Blood Pressure', value: vitals.blood_pressure || 'Not recorded' },
            { label: 'Heart Rate', value: vitals.heart_rate ? `${vitals.heart_rate} bpm` : 'Not recorded' },
            { label: 'Temperature', value: vitals.temperature ? `${vitals.temperature}°C` : 'Not recorded' },
            { label: 'Oxygen Saturation', value: vitals.oxygen_saturation ? `${vitals.oxygen_saturation}%` : 'Not recorded' },
          ]}
        />

        <div className="md:col-span-2 lg:col-span-1">
          <InfoCard
            icon={Stethoscope}
            title="Care Team"
            items={[
              { label: 'Primary Physician', value: medical.primary_physician || 'Not assigned' },
            ]}
          />
        </div>
      </div>

      {/* Medical History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Medical History
          </h4>
          <div className="text-sm text-gray-600">
            {medical.medical_history || 'No medical history recorded.'}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Current Medications
          </h4>
          <div className="text-sm text-gray-600">
            {medical.current_medications || 'No current medications recorded.'}
          </div>
        </div>
      </div>
    </div>
  );
}

// Contact Details Component
function ContactDetails({ patient, getPersonalData, getContactData, getEmergencyData }) {
  const personal = getPersonalData();
  const contact = getContactData();
  const emergency = getEmergencyData();
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard
          icon={Mail}
          title="Contact Details"
          items={[
            { label: 'Email', value: personal.email || contact.email || 'Not provided' },
            { label: 'Mobile', value: contact.mobile_number || 'Not provided' },
            { label: 'Telephone', value: contact.telephone || 'Not provided' },
          ]}
        />

        <InfoCard
          icon={MapPin}
          title="Address"
          items={[
            { label: 'Street', value: contact.street_address || 'Not provided' },
            { label: 'Barangay', value: contact.barangay || 'Not provided' },
            { label: 'City/Municipality', value: contact.city_municipality || 'Not provided' },
            { label: 'Province', value: contact.province || 'Not provided' },
            { label: 'Postal Code', value: contact.postal_code || 'Not provided' },
          ]}
        />

        <InfoCard
          icon={Users}
          title="Emergency Contact"
          items={[
            { label: 'Name', value: emergency.contact_name || 'Not provided' },
            { label: 'Relation', value: emergency.relation || 'Not provided' },
            { label: 'Phone', value: emergency.phone || 'Not provided' },
            { label: 'Email', value: emergency.email || 'Not provided' },
          ]}
        />
      </div>
    </div>
  );
}

// Allergy Details Component
function AllergyDetails({ patient, getAllergiesData }) {
  const allergies = getAllergiesData();
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Allergies & Reactions</h3>
      
      {allergies && allergies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allergies.map((allergy, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900">{allergy.allergen || 'Unknown Allergen'}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  allergy.severity === 'Severe' ? 'bg-red-100 text-red-800' :
                  allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {allergy.severity || 'Unknown'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Reaction:</strong> {allergy.reaction || 'Not specified'}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No allergies recorded for this patient.</p>
        </div>
      )}
    </div>
  );
}

// Visit Details Component
function VisitDetails({ patient, visits, formatDate, onAddVisit }) {
  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";
    switch (status) {
      case 'Scheduled':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Scheduled':
        return <Clock className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Visit History</h3>
        <button
          onClick={onAddVisit}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Visit</span>
        </button>
      </div>

      {visits.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scheduled Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visits.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(visit.scheduled_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(visit.created_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-gray-400" />
                      <span>{visit.doctor_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(visit.status)}
                      <span className={getStatusBadge(visit.status)}>
                        {visit.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No visit history available for this patient.</p>
          <p className="text-sm">Click "Add Visit" to create a new visit record.</p>
        </div>
      )}
    </div>
  );
}

// Add Visit Modal Component
function AddVisitModal({ onClose, onSave, patientName }) {
  const [formData, setFormData] = useState({
    scheduled_date: '',
    created_date: new Date().toISOString().split('T')[0],
    doctor_name: '',
    status: 'Scheduled'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Add New Visit</h2>
              <p className="text-gray-600 text-sm">Patient: {patientName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scheduled Date *
            </label>
            <input
              type="date"
              name="scheduled_date"
              value={formData.scheduled_date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Created Date *
            </label>
            <input
              type="date"
              name="created_date"
              value={formData.created_date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Doctor Name *
            </label>
            <input
              type="text"
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleChange}
              required
              placeholder="Enter doctor's name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Visit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable Info Card Component
function InfoCard({ icon: Icon, title, items }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Icon className="w-4 h-4 text-blue-600" />
        <h4 className="font-medium text-gray-900">{title}</h4>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-500">{item.label}:</span>
            <span className="text-gray-900 font-medium text-right">
              {item.value || 'Not provided'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}