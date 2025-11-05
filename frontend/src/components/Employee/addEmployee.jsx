import React, { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalProvider";

export default function AddEmployee() {
  const [isModalOpen, setModalOpen] = useContext(ModalContext);

  // Employee state
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    sex: "",
    department: "",
    position: "",
    profilePicture: null,
  });

  // Confirmation modal visibility
  const [showConfirm, setShowConfirm] = useState(false);

  // Department and position mapping
  const departmentPositions = {
    "General Medicine": [
      "General Physician / Family Doctor",
      "Pediatrician",
      "Obstetrician-Gynecologist (OB-GYN)",
    ],
    Surgery: ["Surgeon", "Orthopedic Doctor"],
    Diagnostics: [
      "Medical Technologist / Lab Technician",
      "Radiologic Technologist (X-ray, MRI, CT Scan)",
    ],
    Specializations: ["Cardiologist", "Neurologist", "Oncologist"],
    Administration: ["Receptionist / Front Desk Staff"],
  };

  const [filteredPositions, setFilteredPositions] = useState([]);

  const handleDeptChange = (e) => {
    const dept = e.target.value;
    setEmployeeData({ ...employeeData, department: dept, position: "" });
    setFilteredPositions(departmentPositions[dept] || []);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployeeData({ ...employeeData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true); // show confirmation modal
  };

  return (
    <>
      {/* ============= Main Registration Modal ============= */}
      <div className="w-[900px] h-[85vh] bg-white rounded-2xl shadow-lg relative flex flex-col">
        {/* Close Button */}
        <button
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-xl"
          onClick={() => setModalOpen(!isModalOpen)}
        >
          ✕
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-8 pt-8 pb-4 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-5 border-b border-gray-300 pb-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border">
              {employeeData.profilePicture ? (
                <img
                  src={employeeData.profilePicture}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
              <label
                htmlFor="imageUpload"
                className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-700"
              >
                Edit
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Employee Registration
              </h2>
              <p className="text-sm text-gray-500">
                Upload photo and fill out details
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Personal Information
              </h3>
              <Field
                label="First Name"
                placeholder="Enter first name"
                value={employeeData.firstName}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, firstName: e.target.value })
                }
              />
              <Field
                label="Middle Name"
                placeholder="Enter middle name"
                value={employeeData.middleName}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, middleName: e.target.value })
                }
              />
              <Field
                label="Last Name"
                placeholder="Enter last name"
                value={employeeData.lastName}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, lastName: e.target.value })
                }
              />
              <Field
                label="Email"
                type="email"
                placeholder="Enter email address"
                value={employeeData.email}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, email: e.target.value })
                }
              />
              <Select
                label="Sex"
                options={["Male", "Female"]}
                value={employeeData.sex}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, sex: e.target.value })
                }
              />
            </div>

            {/* Employment Info */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Employment Details
              </h3>
              <Select
                label="Department"
                options={Object.keys(departmentPositions)}
                value={employeeData.department}
                onChange={handleDeptChange}
              />
              <Select
                label="Position / Role"
                options={
                  filteredPositions.length
                    ? filteredPositions
                    : ["Select Department First"]
                }
                value={employeeData.position}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, position: e.target.value })
                }
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 p-4 flex justify-end gap-3 bg-white rounded-b-2xl">
          <button
            type="button"
            className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            onClick={handleSubmit}
          >
            Save Employee
          </button>
        </div>
      </div>

      {/* ============= Confirmation Modal ============= */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="w-[850px] bg-white rounded-2xl shadow-lg p-8 relative">
            {/* Close */}
            <button
              className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setShowConfirm(false)}
            >
              ✕
            </button>

            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-3 mb-5">
              Confirm Employee Details
            </h2>

            {/* Content */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
                  {employeeData.profilePicture ? (
                    <img
                      src={employeeData.profilePicture}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">Profile Picture</p>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">First Name:</span>{" "}
                  {employeeData.firstName || "—"}
                </p>
                <p>
                  <span className="font-medium">Middle Name:</span>{" "}
                  {employeeData.middleName || "—"}
                </p>
                <p>
                  <span className="font-medium">Last Name:</span>{" "}
                  {employeeData.lastName || "—"}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {employeeData.email || "—"}
                </p>
                <p>
                  <span className="font-medium">Sex:</span>{" "}
                  {employeeData.sex || "—"}
                </p>
                <p>
                  <span className="font-medium">Department:</span>{" "}
                  {employeeData.department || "—"}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-300 mt-6 pt-4 flex justify-end gap-3">
              <button
                className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
                onClick={() => setShowConfirm(false)}
              >
                Edit
              </button>
              <button
                className="px-5 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                onClick={() => {
                  console.log("Final Employee Saved:", employeeData);
                  setShowConfirm(false);
                  setModalOpen(false);
                }}
              >
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* Reusable Components */
function Field({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
