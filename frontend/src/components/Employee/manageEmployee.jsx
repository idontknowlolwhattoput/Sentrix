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

  useEffect(() => {
    fetch("http://localhost:5000/employees/view")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, [employees]);

  // show the deletion confirmation modal and store the employeeid
  const handleDeleteModal = (selected) => {
    setShowConfirm(true);
    localStorage.setItem("selected", selected);
  };

  // delete the record via argument using localstorage
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
    setDeleteSuccess(false); // hide success if visible

    setTimeout(() => {
      setLoading(false);
      setDeleteSuccess(true); // show success after loading finishes
    }, 1000);
  };

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
                className="bg-white shadow-sm hover:shadow-md transition rounded-xl hover:bg-gray-400 "
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
                <td className="px-3 text-center">
                  <button
                    className="text-gray-600 hover:text-gray-900 mr-2"
                    onClick={() => setView(!isViewed)}
                  >
                    ✏️
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

      {/* Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 w-full h-full bg-black/40 flex items-center justify-center p-4 transition">
          <AddEmployee />
        </div>
      )}

      {isViewed && (
        <div
          className="fixed inset-0 w-full h-full z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setView(!isViewed)}
        ></div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center inset-0 bg-gray-50 backdrop-blur-2xl w-full h-full absolute">
          <span className="loading loading-ring loading-xl"></span>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="relative w-[360px] rounded-2xl bg-white p-6 shadow-[8px_8px_0_#000] border border-slate-200">
            {/* Close button */}
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute right-3 top-3 text-slate-500 hover:text-black"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-bold text-slate-800">
                Delete Confirmation
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700
                hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete()}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition
                shadow-[3px_3px_0_#000]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="relative w-[360px] rounded-2xl bg-white p-6 shadow-[8px_8px_0_#000] border border-slate-200">
            {/* Close button */}
            <button
              onClick={() => setDeleteSuccess(false)}
              className="absolute right-3 top-3 text-slate-500 hover:text-black"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-bold text-slate-800">
                Deleted Successfully
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                The employee record has been permanently removed.
              </p>
            </div>

            {/* Button */}
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => setDeleteSuccess(false)}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition
                shadow-[3px_3px_0_#000]"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
