import React, { useState, useEffect } from 'react';
import { Search, User, Phone, Calendar, Mail, Edit, MoreVertical, X } from 'lucide-react';
import PatientDetails from './patientDetails.jsx'; // Import the PatientDetails component we created

export default function PatientList({ 
  onPatientSelect, 
  showActions = true,
  compact = false,
  enableSearch = true,
  enablePagination = true 
}) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = compact ? 5 : 10;

  const fetchPatients = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const url = search 
        ? `http://localhost:5000/patient/patients/search?search=${encodeURIComponent(search)}&page=${page}&limit=${itemsPerPage}`
        : `http://localhost:5000/patient/patients?page=${page}&limit=${itemsPerPage}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setPatients(data.patients || []);
        setTotalPages(data.pagination?.pages || 1);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getFullName = (patient) => {
    const names = [patient.first_name, patient.middle_name, patient.last_name].filter(Boolean);
    return names.join(' ');
  };

  const handlePatientClick = (patient) => {
    if (onPatientSelect) {
      onPatientSelect(patient);
    } else {
      // Show modal if no custom handler provided
      setSelectedPatient(patient);
      setShowModal(true);
    }
  };

  const handleViewClick = (patient, e) => {
    e.stopPropagation();
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  if (loading && patients.length === 0) {
    return (
      <div className="animate-pulse">
        <div className="space-y-3">
          {[...Array(compact ? 3 : 5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`bg-white rounded-lg border border-gray-200 ${!compact && 'shadow-sm'}`}>
        {/* Search Bar */}
        {enableSearch && (
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                {!compact && (
                  <>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                  </>
                )}
                {showActions && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr 
                  key={patient.patient_id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handlePatientClick(patient)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {getFullName(patient)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {patient.gender || 'N/A'} • {formatDate(patient.date_of_birth)}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {!compact && (
                    <>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="space-y-1">
                          {patient.mobile_number && (
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1 text-gray-400" />
                              {patient.mobile_number}
                            </div>
                          )}
                          {patient.email && (
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1 text-gray-400" />
                              <span className="truncate max-w-[150px]">{patient.email}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {formatDate(patient.created_at)}
                      </td>
                    </>
                  )}
                  
                  {showActions && (
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => handleViewClick(patient, e)}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {enablePagination && totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 z-50 overflow-auto backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-4 ">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">
                Patient Details - {getFullName(selectedPatient)}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="h[90%] overflow-auto ">
              <PatientDetails 
                patientId={selectedPatient.patient_id}
                onBack={closeModal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}