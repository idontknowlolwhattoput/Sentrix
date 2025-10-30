import React, { useState } from "react";
import { Camera, User, Home, Users, CreditCard, Plus, X } from "lucide-react";

export default function PatientRegistration() {
  const [formData, setFormData] = useState({
    personal: {},
    address: {},
    relative: {},
    payer: {}
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-full  p-6 overflow-y-auto max-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Registration</h1>
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
          <Section 
            title="Personal Details" 
            icon={<User className="w-4 h-4" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input 
                label="First Name" 
                placeholder="Juan"
                value={formData.personal.firstName || ''}
                onChange={(value) => handleInputChange('personal', 'firstName', value)}
                required
              />
              <Input 
                label="Middle Name" 
                placeholder="Dela "
                value={formData.personal.middleName || ''}
                onChange={(value) => handleInputChange('personal', 'middleName', value)}
              />
              <Input 
                label="Last Name" 
                placeholder="Cruz"
                value={formData.personal.lastName || ''}
                onChange={(value) => handleInputChange('personal', 'lastName', value)}
                required
              />
              <Input 
                label="Date of Birth" 
                type="date"
                value={formData.personal.dob || ''}
                onChange={(value) => handleInputChange('personal', 'dob', value)}
                required
              />
              <Input 
                label="Gender" 
                as="select"
                value={formData.personal.gender || ''}
                onChange={(value) => handleInputChange('personal', 'gender', value)}
                options={["Select Gender", "Male", "Female", "Other"]}
                required
              />
              <Input 
                label="Nationality" 
                placeholder="Filipino"
                value={formData.personal.nationality || ''}
                onChange={(value) => handleInputChange('personal', 'nationality', value)}
              />
              <Input 
                label="Occupation" 
                placeholder="Professional"
                value={formData.personal.occupation || ''}
                onChange={(value) => handleInputChange('personal', 'occupation', value)}
              />
              <Input 
                label="Email Address" 
                type="email"
                placeholder="example@mail.com"
                value={formData.personal.email || ''}
                onChange={(value) => handleInputChange('personal', 'email', value)}
              />
              <Input 
                label="Marital Status" 
                as="select"
                value={formData.personal.maritalStatus || ''}
                onChange={(value) => handleInputChange('personal', 'maritalStatus', value)}
                options={["Select Status", "Single", "Married", "Divorced", "Widowed"]}
              />
            </div>
          </Section>

         {/* Home Address */}
<Section 
  title="Contact Information" 
  icon={<Home className="w-4 h-4" />}
>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Input 
      label="Street Address" 
      placeholder="123 Main Street"
      value={formData.address.street || ''}
      onChange={(value) => handleInputChange('address', 'street', value)}
      required
    />
    <Input 
      label="Barangay" 
      placeholder="Barangay 123"
      value={formData.address.barangay || ''}
      onChange={(value) => handleInputChange('address', 'barangay', value)}
      required
    />
    <Input 
      label="City/Municipality" 
      placeholder="Quezon City"
      value={formData.address.city || ''}
      onChange={(value) => handleInputChange('address', 'city', value)}
      required
    />
    <Input 
      label="Province" 
      placeholder="Metro Manila"
      value={formData.address.province || ''}
      onChange={(value) => handleInputChange('address', 'province', value)}
      required
    />
    <Input 
      label="Region" 
      placeholder="NCR"
      value={formData.address.region || ''}
      onChange={(value) => handleInputChange('address', 'region', value)}
    />
    <Input 
      label="Postal Code" 
      placeholder="1100"
      value={formData.address.postalCode || ''}
      onChange={(value) => handleInputChange('address', 'postalCode', value)}
    />
    <Input 
      label="Mobile Number" 
      placeholder="0912 345 6789"
      value={formData.address.mobile || ''}
      onChange={(value) => handleInputChange('address', 'mobile', value)}
      required
    />
    <Input 
      label="Telephone" 
      placeholder="(02) 8123 4567"
      value={formData.address.telephone || ''}
      onChange={(value) => handleInputChange('address', 'telephone', value)}
    />
    <Input 
      label="Email Address" 
      type="email"
      placeholder="patient@email.com"
      value={formData.address.email || ''}
      onChange={(value) => handleInputChange('address', 'email', value)}
    />
  </div>
</Section>

          {/* Nearest Relative */}
          <Section 
            title="Nearest Relative" 
            icon={<Users className="w-4 h-4" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input 
                label="Relative Name" 
                placeholder="Jane Doe"
                value={formData.relative.name || ''}
                onChange={(value) => handleInputChange('relative', 'name', value)}
              />
              <Input 
                label="Relation" 
                placeholder="Sister"
                value={formData.relative.relation || ''}
                onChange={(value) => handleInputChange('relative', 'relation', value)}
              />
              <Input 
                label="Contact Number" 
                placeholder="+1 555 123 4567"
                value={formData.relative.phone || ''}
                onChange={(value) => handleInputChange('relative', 'phone', value)}
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
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              Save Patient Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* --- Helper Components --- */
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