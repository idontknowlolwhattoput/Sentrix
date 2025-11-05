import React from 'react';

export default function AddEmployee() {
    return (
        <div className="w-full h-full bg-white rounded-lg flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">Employee Registration</h2>
                <button className="text-gray-400 hover:text-gray-600 text-xl">
                    ✕
                </button>
            </div>

            {/* Form Content - This will expand to fill available space */}
            <div className="flex-1 overflow-auto p-6">
                <form className="h-full">
                    <div className="grid grid-cols-2 gap-8 h-full">
                        {/* Personal Information Column */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold border-b pb-2">Personal Information</h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">First Name *</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter first name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Middle Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter middle name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Last Name *</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter last name"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="employee@company.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Sex</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Home Address</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                                    placeholder="Enter complete address"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Account Information Column */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold border-b pb-2">Account Information</h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Username *</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter username"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Employee ID</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 bg-gray-50 rounded-lg"
                                        placeholder="Auto-generated"
                                        disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Password *</label>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter password"
                                    />
                                    <button
                                        type="button"
                                        className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 whitespace-nowrap"
                                    >
                                        Generate Password
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Position *</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Select Position</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Developer">Developer</option>
                                        <option value="Designer">Designer</option>
                                        <option value="Analyst">Analyst</option>
                                        <option value="Admin">Administrator</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Department</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Select Department</option>
                                        <option value="IT">IT</option>
                                        <option value="HR">Human Resources</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Operations">Operations</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Employment Type</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">Select Type</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Intern">Intern</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Hire Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Access Level</label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="radio" name="access" className="mr-2" />
                                        Basic User
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="access" className="mr-2" />
                                        Department Manager
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="access" className="mr-2" />
                                        Administrator
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Fixed Footer with Buttons */}
            <div className="border-t p-6">
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-colors"
                    >
                        Save as Draft
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                        Register Employee
                    </button>
                </div>
            </div>
        </div>
    );
}