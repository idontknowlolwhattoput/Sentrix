import React from "react";

export default function AddEmployee() {
  return (
    <div className="w-full h-full bg-gray-50 rounded-2xl shadow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <h2 className="text-2xl font-bold text-gray-800">
          Employee Registration
        </h2>
        <button className="text-gray-400 hover:text-gray-600 text-2xl font-semibold">
          ✕
        </button>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <form className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Personal Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name *" placeholder="Enter first name" />
                <Input label="Middle Name" placeholder="Enter middle name" />
              </div>

              <Input label="Last Name *" placeholder="Enter last name" />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="employee@company.com"
                />
                <Select label="Sex" options={["Male", "Female"]} />
              </div>

              <Textarea label="Home Address" placeholder="Enter full address" />

              <div className="grid grid-cols-2 gap-4">
                <Input label="Phone Number" placeholder="+1 (555) 000-0000" />
                <Input label="Date of Birth" type="date" />
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Account Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Username *" placeholder="Enter username" />
                <Input
                  label="Employee ID"
                  placeholder="Auto-generated"
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-400"
                  >
                    Generate
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Position *"
                  options={[
                    "Manager",
                    "Developer",
                    "Designer",
                    "Analyst",
                    "Administrator",
                  ]}
                />
                <Select
                  label="Department"
                  options={[
                    "IT",
                    "HR",
                    "Finance",
                    "Marketing",
                    "Operations",
                  ]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Employment Type"
                  options={[
                    "Full-time",
                    "Part-time",
                    "Contract",
                    "Intern",
                  ]}
                />
                <Input label="Hire Date" type="date" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Level
                </label>
                <div className="flex flex-col space-y-2">
                  {["Basic User", "Department Manager", "Administrator"].map(
                    (role) => (
                      <label
                        key={role}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <input
                          type="radio"
                          name="access"
                          className="mr-2 accent-blue-600"
                        />
                        {role}
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="border-t bg-white p-6 flex justify-end space-x-4">
        <button className="px-6 py-3 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg">
          Cancel
        </button>
        <button className="px-6 py-3 text-sm font-medium text-yellow-700 bg-yellow-100 hover:bg-yellow-200 rounded-lg">
          Save as Draft
        </button>
        <button className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
          Register Employee
        </button>
      </div>
    </div>
  );
}

/* Reusable components for cleaner code */
function Input({ label, type = "text", placeholder, disabled, className = "" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
}

function Select({ label, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function Textarea({ label, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
      />
    </div>
  );
}
