import { useContext, useEffect, useState } from "react";
import AddEmployee from "./addEmployee";
import { ModalContext } from "../../context/ModalProvider";
import axios from "axios";

export default function ManageEmployee() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useContext(ModalContext);
  const [isViewed, setView] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [confirmDelete, setShowConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showTimeShift, setShowTimeShift] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/employees/view")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, [employees]);

  const handleDeleteModal = (selected) => {
    setShowConfirm(true);
    localStorage.setItem("selected", selected);
  };

  const handleDelete = () => {
    axios
      .post("http://localhost:5000/employees/delete", {
        employee_id: localStorage.getItem("selected"),
      })
      .then(function (response) {
        console.log(response);
        loading();
        setShowConfirm(false);
        localStorage.removeItem("selected");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loading = () => {
    setLoading(true);
    setDeleteSuccess(false);
    setTimeout(() => {
      setLoading(false);
      setDeleteSuccess(true);
    }, 400);
  };

  const handleRegister = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setView(true);
  };

  // Time shift data
  const timeSlots = [
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleTimeSlot = (day, time) => {
    const slot = `${day}-${time}`;
    setSelectedSlots(prev => 
      prev.includes(slot) 
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  return (
    <div className="w-full h-full max-w-full p-10 overflow-auto bg-gray-50 relative">
      {/* Header */}
      <div className="flex items-center justify-between w-[95%] border-b border-gray-300 pb-5">
        <h1 className="text-2xl font-semibold text-gray-800">Employee</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-gray-700 focus:outline-none"
          />
          <button
            className="bg-black text-white text-sm px-5 py-2 rounded-md hover:bg-gray-800 transition"
            onClick={handleRegister}
          >
            Add New Employee
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="w-[95%] mt-6 overflow-x-auto max-h-[65vh]">
        <table className="w-full border-separate border-spacing-y-5">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="text-left px-3">Name</th>
              <th className="text-left px-3">Position</th>
              <th className="text-left px-3">Email</th>
              <th className="text-left px-3">Phone</th>
              <th className="text-left px-3">Employee ID</th>
              <th className="px-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.employee_id}
                className="bg-white shadow-sm hover:shadow-md transition rounded-xl hover:bg-gray-50 cursor-pointer"
                onClick={() => handleViewEmployee(emp)}
              >
                <td className="px-3 py-3 flex items-center gap-3">
                  <span className="font-medium text-gray-800">
                    {emp.first_name} {emp.middle_name} {emp.last_name}
                  </span>
                </td>
                <td className="px-3 text-gray-700">{emp.position}</td>
                <td className="px-3 text-gray-700">{emp.email}</td>
                <td className="px-3 text-gray-700">{emp.phone}</td>
                <td className="px-3 text-gray-700">{emp.employee_id}</td>
                <td className="px-3 text-center" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="text-gray-600 hover:text-gray-900 mr-2"
                    onClick={() => handleViewEmployee(emp)}
                  >
                    👁️
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteModal(emp.employee_id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-10">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 w-full h-full bg-black/40 flex items-center justify-center p-4 transition">
          <AddEmployee />
        </div>
      )}

      {/* Employee View Modal */}
      {isViewed && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div 
            className="relative w-11/12 max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedEmployee.first_name?.charAt(0)}{selectedEmployee.last_name?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedEmployee.first_name} {selectedEmployee.middle_name} {selectedEmployee.last_name}
                  </h2>
                  <p className="text-gray-600">{selectedEmployee.position}</p>
                </div>
              </div>
              <button
                onClick={() => setView(false)}
                className="text-gray-400 hover:text-gray-600 text-xl p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Employee ID</span>
                        <span className="text-gray-800 font-mono">{selectedEmployee.employee_id}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Email</span>
                        <span className="text-gray-800">{selectedEmployee.email || "Not provided"}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Phone</span>
                        <span className="text-gray-800">{selectedEmployee.phone || "Not provided"}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Gender</span>
                        <span className="text-gray-800">{selectedEmployee.sex || "Not specified"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Account Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Position</span>
                        <span className="text-gray-800 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {selectedEmployee.position}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Account Created</span>
                        <span className="text-gray-800 text-sm">
                          {selectedEmployee.account_created ? new Date(selectedEmployee.account_created).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-600">Last Modified</span>
                        <span className="text-gray-800 text-sm">
                          {selectedEmployee.account_last_modified ? new Date(selectedEmployee.account_last_modified).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Time Shift Section */}
                    <div className="pt-4">
                      <button
                        onClick={() => setShowTimeShift(true)}
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                      >
                        <span>🕐</span>
                        Time Shift Schedule
                      </button>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                {selectedEmployee.address && (
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Address</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedEmployee.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setView(false)}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  console.log("Edit employee:", selectedEmployee.employee_id);
                }}
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Edit Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Shift Modal */}
      {showTimeShift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div 
            className="relative w-11/12 max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xl">
                  🕐
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Time Shift Schedule
                  </h2>
                  <p className="text-gray-600">
                    {selectedEmployee?.first_name} {selectedEmployee?.last_name} - {selectedEmployee?.position}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTimeShift(false)}
                className="text-gray-400 hover:text-gray-600 text-xl p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Time Table Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="p-3 border border-gray-300 bg-white font-medium">Time / Day</th>
                        {days.map(day => (
                          <th key={day} className="p-3 border border-gray-300 bg-white font-medium text-center">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map(time => (
                        <tr key={time}>
                          <td className="p-3 border border-gray-300 bg-white font-medium text-sm">
                            {time}
                          </td>
                          {days.map(day => {
                            const slotId = `${day}-${time}`;
                            const isSelected = selectedSlots.includes(slotId);
                            return (
                              <td key={day} className="p-1 border border-gray-300">
                                <button
                                  onClick={() => toggleTimeSlot(day, time)}
                                  className={`w-full h-12 rounded transition-all ${
                                    isSelected 
                                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                  }`}
                                >
                                  {isSelected ? '✓' : ''}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Selected Slots Summary */}
                {selectedSlots.length > 0 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Selected Time Slots:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSlots.map(slot => (
                        <span key={slot} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowTimeShift(false)}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Save time slots:", selectedSlots);
                  setShowTimeShift(false);
                }}
                className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Modal */}
      {isLoading && (
        <div className="flex items-center justify-center inset-0 bg-gray-50 backdrop-blur-2xl w-full h-full absolute">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="relative w-[360px] rounded-2xl bg-white p-6 shadow-[8px_8px_0_#000] border border-slate-200">
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute right-3 top-3 text-slate-500 hover:text-black"
            >
              ✕
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-800">Delete Confirmation</h2>
              <p className="mt-1 text-sm text-slate-600">Are you sure you want to delete this item? This action cannot be undone.</p>
            </div>
            <div className="mt-5 flex justify-center gap-3">
              <button onClick={() => setShowConfirm(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition">Cancel</button>
              <button onClick={() => handleDelete()} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition shadow-[3px_3px_0_#000]">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Success Modal */}
      {deleteSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="relative w-[360px] rounded-2xl bg-white p-6 shadow-[8px_8px_0_#000] border border-slate-200">
            <button onClick={() => setDeleteSuccess(false)} className="absolute right-3 top-3 text-slate-500 hover:text-black">✕</button>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-800">Deleted Successfully</h2>
              <p className="mt-1 text-sm text-slate-600">The employee record has been permanently removed.</p>
            </div>
            <div className="mt-5 flex justify-center">
              <button onClick={() => setDeleteSuccess(false)} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition shadow-[3px_3px_0_#000]">Okay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}