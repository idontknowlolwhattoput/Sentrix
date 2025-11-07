import { useContext, useState } from "react";
import axios from "axios";

import { ModalContext } from "../../context/ModalProvider";

import ErrorModal from "../modals/errorModal";
import SuccessModal from "../modals/successModal";

export default function AddEmployee() {
  const [isModalOpen, setModalOpen] = useContext(ModalContext);
  const [isloading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    sex: "",
    department: "",
    position: "",
    profilePicture: null,
  });

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
    setShowConfirm(true);

  };

  const saveEmployee = async () => {
    try {
      const response = await axios.post("http://localhost:5000/employees/add", {
        first_name: employeeData.firstName,
        middle_name: employeeData.middleName,
        last_name: employeeData.lastName,
        email: employeeData.email,
        phone: employeeData.phone,
        address: employeeData.address,
        sex: employeeData.sex,
        position: employeeData.position,
      });
      console.log(response.data.message);
      loading()
    } catch (error) {
      console.error(error);
    }
  };

  const loading = () => {
     setLoading(true);
     setSuccess(false); // hide success if visible
     setShowConfirm(false)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true); // show success after loading finishes
    }, 750);
  }

  return (
    <>
      {/* ============= Main Registration Modal ============= */}
      <div className="w-[1100px] h-[85vh] bg-white rounded-2xl shadow-lg relative flex flex-col">
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

          {/* ============= Form Section ============= */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-3 gap-x-10 gap-y-6 p-2"
          >
            {/* Personal Information */}
            <div className="flex flex-col h-full space-y-4 border-r border-gray-200 pr-6">
              <h3 className="text-md font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-1">
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
                  setEmployeeData({
                    ...employeeData,
                    middleName: e.target.value,
                  })
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
              <Select
                label="Sex"
                options={["Male", "Female"]}
                value={employeeData.sex}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, sex: e.target.value })
                }
              />
            </div>

            {/* Contact Information */}
            <div className="flex flex-col h-full space-y-4 border-r border-gray-200 pr-6">
              <h3 className="text-md font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-1">
                Contact Information
              </h3>
              <Field
                label="Email"
                type="email"
                placeholder="Enter email address"
                value={employeeData.email}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, email: e.target.value })
                }
              />
              <Field
                label="Phone"
                placeholder="Enter phone number"
                value={employeeData.phone}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, phone: e.target.value })
                }
              />
              <Field
                label="Address"
                placeholder="Enter home address"
                value={employeeData.address}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, address: e.target.value })
                }
              />
            </div>

            {/* Employment Details */}
            <div className="flex flex-col h-full space-y-4">
              <h3 className="text-md font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-1">
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/58 backdrop-blur-xl z-50">
          <div className="w-[850px] bg-white rounded-2xl shadow-lg p-8 relative">
            <button
              className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-xl"
              onClick={() => setShowConfirm(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-3 mb-5">
              Confirm Employee Details
            </h2>

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
                  <span className="font-medium">Phone Number:</span>{" "}
                  {employeeData.phone || "—"}
                </p>
                 <p>
                  <span className="font-medium">Address:</span>{" "}
                  {employeeData.address || "—"}
                </p>
                <p>
                  <span className="font-medium">Sex:</span>{" "}
                  {employeeData.sex || "—"}
                </p>
                <p>
                  <span className="font-medium">Department:</span>{" "}
                  {employeeData.position || "—"}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 mr-3 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => saveEmployee()}
                className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isloading && (
        <div className="inset-0 fixed w-full h-full bg-gray-50 flex items-center justify-center">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      )}

      {isSuccess && (
        <div className="inset-0 fixed w-full h-full bg-gray-50 flex items-center justify-center">
            <SuccessModal
              title="Added Successfully"
              message="The employee record has been added."
              onClose={() => setModalOpen(false)}
            />
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
