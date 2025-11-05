import { useEffect, useState } from "react";
import AddEmployee from "./addEmployee";

export default function ManageEmployee() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/users/db")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const handleRegister = () => {
    setIsModalOpen(!isModalOpen);
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

      {/* Employee List */}
      <div className="w-[95%] mt-6 overflow-x-auto max-h-[65vh]">
        <table className="w-full border-separate border-spacing-y-3">
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
                className="bg-white shadow-sm hover:shadow-md transition rounded-xl"
              >
                <td className="px-3 py-3 flex items-center gap-3">
                  <img
                    src={emp.profile_picture || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {emp.first_name} {emp.middle_name} {emp.last_name}
                  </span>
                </td>
                <td className="px-3 text-gray-700">{emp.position}</td>
                <td className="px-3 text-gray-700">{emp.email}</td>
                <td className="px-3 text-gray-700">{emp.phone}</td>
                <td className="px-3 text-gray-700">{emp.employee_code}</td>
                <td className="px-3 text-center">
                  <button className="text-gray-600 hover:text-gray-900 mr-2">
                    ✏️
                  </button>
                  <button className="text-red-500 hover:text-red-700">🗑️</button>
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

      {/* Modal - Contained within parent */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="w-full h-full max-w-6xl">
            <AddEmployee />
          </div>
        </div>
      )}
    </div>
  );
}