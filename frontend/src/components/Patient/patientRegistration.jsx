import React, { useState } from "react";
import { Camera, User, Home, Users, Plus, X, Heart, AlertTriangle, Activity } from "lucide-react";

export default function PatientRegistration() {
  const [formData, setFormData] = useState({
    // Personal Info (maps to patient_info)
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    occupation: '',
    personalEmail: '',
    maritalStatus: '',
    
    // Address Info (maps to patient_info)
    streetAddress: '',
    barangay: '',
    cityMunicipality: '',
    province: '',
    region: '',
    postalCode: '',
    mobileNumber: '',
    telephone: '',
    addressEmail: '',
    
    // Medical Info (maps to patient_medical_info)
    bloodType: '',
    height: '',
    weight: '',
    primaryPhysician: '',
    medicalHistory: '',
    currentMedications: '',
    
    // Vital Signs (maps to patient_vital_signs)
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    
    // Emergency Contact (maps to patient_emergency_contact)
    emergencyContactName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    
    // Allergies (maps to patient_allergy)
    allergies: []
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [newAllergy, setNewAllergy] = useState({ allergen: '', reaction: '', severity: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleAddAllergy = () => {
    if (newAllergy.allergen && newAllergy.reaction) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, { ...newAllergy, id: Date.now() }]
      }));
      setNewAllergy({ allergen: '', reaction: '', severity: '' });
    }
  };

  const handleRemoveAllergy = (id) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter(allergy => allergy.id !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Patient added successfully:', result);
        alert('Patient registered successfully!');
        // Reset form
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          dateOfBirth: '',
          gender: '',
          nationality: '',
          occupation: '',
          personalEmail: '',
          maritalStatus: '',
          streetAddress: '',
          barangay: '',
          cityMunicipality: '',
          province: '',
          region: '',
          postalCode: '',
          mobileNumber: '',
          telephone: '',
          addressEmail: '',
          bloodType: '',
          height: '',
          weight: '',
          primaryPhysician: '',
          medicalHistory: '',
          currentMedications: '',
          bloodPressure: '',
          heartRate: '',
          temperature: '',
          respiratoryRate: '',
          oxygenSaturation: '',
          emergencyContactName: '',
          emergencyRelation: '',
          emergencyPhone: '',
          allergies: []
        });
        setProfileImage(null);
      } else {
        throw new Error('Failed to add patient');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error registering patient. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full p-6 overflow-y-auto max-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Admission</h1>
            <p className="text-sm text-gray-600 mt-1">
              Fill in the patient's basic details to create a new record
            </p>
          </div>
          
          {/* Profile Picture Upload */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <label 
                htmlFor="profile-upload"
                className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-3 h-3" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <Section title="Personal Details" icon={<User className="w-4 h-4" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input 
                label="First Name" 
                placeholder="Juan"
                value={formData.firstName}
                onChange={(value) => handleInputChange('firstName', value)}
                required
              />
              <Input 
                label="Middle Name" 
                placeholder="Dela"
                value={formData.middleName}
                onChange={(value) => handleInputChange('middleName', value)}
              />
              <Input 
                label="Last Name" 
                placeholder="Cruz"
                value={formData.lastName}
                onChange={(value) => handleInputChange('lastName', value)}
                required
              />
              <Input 
                label="Date of Birth" 
                type="date"
                value={formData.dateOfBirth}
                onChange={(value) => handleInputChange('dateOfBirth', value)}
                required
              />
              <Input 
                label="Gender" 
                as="select"
                value={formData.gender}
                onChange={(value) => handleInputChange('gender', value)}
                options={["", "Male", "Female", "Other"]}
                required
              />
              <Input 
                label="Nationality" 
                placeholder="Filipino"
                value={formData.nationality}
                onChange={(value) => handleInputChange('nationality', value)}
              />
              <Input 
                label="Occupation" 
                placeholder="Professional"
                value={formData.occupation}
                onChange={(value) => handleInputChange('occupation', value)}
              />
              <Input 
                label="Email Address" 
                type="email"
                placeholder="example@mail.com"
                value={formData.personalEmail}
                onChange={(value) => handleInputChange('personalEmail', value)}
              />
              <Input 
                label="Marital Status" 
                as="select"
                value={formData.maritalStatus}
                onChange={(value) => handleInputChange('maritalStatus', value)}
                options={["", "Single", "Married", "Divorced", "Widowed"]}
              />
            </div>
          </Section>

          {/* Contact Information */}
          <Section title="Contact Information" icon={<Home className="w-4 h-4" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input 
                label="Street Address" 
                placeholder="123 Main Street"
                value={formData.streetAddress}
                onChange={(value) => handleInputChange('streetAddress', value)}
                required
              />
              <Input 
                label="Barangay" 
                placeholder="Barangay 123"
                value={formData.barangay}
                onChange={(value) => handleInputChange('barangay', value)}
                required
              />
              <Input 
                label="City/Municipality" 
                placeholder="Quezon City"
                value={formData.cityMunicipality}
                onChange={(value) => handleInputChange('cityMunicipality', value)}
                required
              />
              <Input 
                label="Province" 
                placeholder="Metro Manila"
                value={formData.province}
                onChange={(value) => handleInputChange('province', value)}
                required
              />
              <Input 
                label="Region" 
                placeholder="NCR"
                value={formData.region}
                onChange={(value) => handleInputChange('region', value)}
              />
              <Input 
                label="Postal Code" 
                placeholder="1100"
                value={formData.postalCode}
                onChange={(value) => handleInputChange('postalCode', value)}
              />
              <Input 
                label="Mobile Number" 
                placeholder="0912 345 6789"
                value={formData.mobileNumber}
                onChange={(value) => handleInputChange('mobileNumber', value)}
                required
              />
              <Input 
                label="Telephone" 
                placeholder="(02) 8123 4567"
                value={formData.telephone}
                onChange={(value) => handleInputChange('telephone', value)}
              />
              <Input 
                label="Email Address" 
                type="email"
                placeholder="patient@email.com"
                value={formData.addressEmail}
                onChange={(value) => handleInputChange('addressEmail', value)}
              />
            </div>
          </Section>

          {/* Medical Information */}
          <Section title="Medical Information" icon={<Heart className="w-4 h-4" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input 
                label="Blood Type" 
                as="select"
                value={formData.bloodType}
                onChange={(value) => handleInputChange('bloodType', value)}
                options={["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              />
              <Input 
                label="Height (cm)" 
                type="number"
                placeholder="170"
                value={formData.height}
                onChange={(value) => handleInputChange('height', value)}
              />
              <Input 
                label="Weight (kg)" 
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={(value) => handleInputChange('weight', value)}
              />
              <Input 
                label="Primary Physician" 
                placeholder="Dr. Santos"
                value={formData.primaryPhysician}
                onChange={(value) => handleInputChange('primaryPhysician', value)}
              />
              <Input 
                label="Emergency Contact" 
                placeholder="Maria Cruz"
                value={formData.emergencyContactName}
                onChange={(value) => handleInputChange('emergencyContactName', value)}
              />
              <Input 
                label="Emergency Phone" 
                placeholder="0917 123 4567"
                value={formData.emergencyPhone}
                onChange={(value) => handleInputChange('emergencyPhone', value)}
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical History / Conditions
              </label>
              <textarea
                placeholder="List any existing medical conditions, surgeries, or relevant medical history..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
                value={formData.medicalHistory}
                onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Medications
              </label>
              <textarea
                placeholder="List any current medications, dosage, and frequency..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[80px]"
                value={formData.currentMedications}
                onChange={(e) => handleInputChange('currentMedications', e.target.value)}
              />
            </div>
          </Section>

          {/* Vital Signs */}
          <Section title="Vital Signs" icon={<Activity className="w-4 h-4" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input 
                label="Blood Pressure" 
                placeholder="120/80"
                value={formData.bloodPressure}
                onChange={(value) => handleInputChange('bloodPressure', value)}
              />
              <Input 
                label="Heart Rate (bpm)" 
                type="number"
                placeholder="72"
                value={formData.heartRate}
                onChange={(value) => handleInputChange('heartRate', value)}
              />
              <Input 
                label="Temperature (°C)" 
                type="number"
                step="0.1"
                placeholder="36.5"
                value={formData.temperature}
                onChange={(value) => handleInputChange('temperature', value)}
              />
              <Input 
                label="Respiratory Rate" 
                type="number"
                placeholder="16"
                value={formData.respiratoryRate}
                onChange={(value) => handleInputChange('respiratoryRate', value)}
              />
              <Input 
                label="Oxygen Saturation (%)" 
                type="number"
                placeholder="98"
                value={formData.oxygenSaturation}
                onChange={(value) => handleInputChange('oxygenSaturation', value)}
              />
            </div>
          </Section>

          {/* Allergies */}
          <Section title="Allergies" icon={<AlertTriangle className="w-4 h-4" />}>
            <div className="space-y-4">
              {formData.allergies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Current Allergies:</h4>
                  {formData.allergies.map(allergy => (
                    <div key={allergy.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div>
                        <span className="font-medium">{allergy.allergen}</span>
                        <span className="text-gray-600 ml-2">- {allergy.reaction}</span>
                        {allergy.severity && (
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            allergy.severity === 'Severe' ? 'bg-red-100 text-red-800' :
                            allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {allergy.severity}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAllergy(allergy.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-3">Add New Allergy</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allergy Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Penicillin, Peanuts"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={newAllergy.allergen}
                      onChange={(e) => setNewAllergy(prev => ({ ...prev, allergen: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reaction
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Rash, Difficulty breathing"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={newAllergy.reaction}
                      onChange={(e) => setNewAllergy(prev => ({ ...prev, reaction: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Severity
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={newAllergy.severity}
                      onChange={(e) => setNewAllergy(prev => ({ ...prev, severity: e.target.value }))}
                    >
                      <option value="">Select Severity</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddAllergy}
                  className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Allergy
                </button>
              </div>
            </div>
          </Section>

          {/* Emergency Contact */}
          <Section title="Emergency Contact" icon={<Users className="w-4 h-4" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input 
                label="Contact Name" 
                placeholder="Jane Doe"
                value={formData.emergencyContactName}
                onChange={(value) => handleInputChange('emergencyContactName', value)}
              />
              <Input 
                label="Relation" 
                placeholder="Sister"
                value={formData.emergencyRelation}
                onChange={(value) => handleInputChange('emergencyRelation', value)}
              />
              <Input 
                label="Contact Number" 
                placeholder="0917 123 4567"
                value={formData.emergencyPhone}
                onChange={(value) => handleInputChange('emergencyPhone', value)}
              />
            </div>
          </Section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button 
              type="button"
              className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 shadow-sm"
            >
              {isSubmitting ? 'Saving...' : 'Save Patient Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper Components (unchanged)
function Section({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}

function Input({ label, placeholder, type = "text", as, options = [], value, onChange, required = false }) {
  const commonClasses = "w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  
  if (as === "select") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select 
          className={commonClasses}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={commonClasses}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}