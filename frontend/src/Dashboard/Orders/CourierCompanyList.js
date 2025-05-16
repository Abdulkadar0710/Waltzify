import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function CourierCompanyList() {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState(null);

    useEffect(() => {
        fetchCompanyData();
    }, []);

    useEffect(() => {
        const filtered = companyData.filter(company =>
            company.Courier_Company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            company.Id.toString().includes(searchQuery)
        );
        setFilteredData(filtered);
    }, [searchQuery, companyData]);

    const fetchCompanyData = async () => {
        try {
            const response = await fetch('http://localhost/waltzify_copy_fake/Backend/Fetch_Courier_company.php');
            const data = await response.json();
            setCompanyData(data);
            setFilteredData(data);
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const confirmDelete = (Id) => {
        setCompanyToDelete(Id);
        setShowConfirm(true);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost/waltzify_copy_fake/Backend/Delete_Company.php?Id=${companyToDelete}`, {
                method: 'DELETE'
            });
            const result = await response.json();

            if (result.success) {
                setCompanyData((prevData) =>
                    prevData.filter(company => company.Id !== companyToDelete)
                );
                setShowConfirm(false);
            } else {
                console.error('Error deleting company:', result.error);
            }
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    return (
        <div className="bg-[#F2F6F9] py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center px-8">
                <p className="text-xl lg:text-3xl font-bold">Courier Company List</p>
                <p className="text-gray-600">
                    Dashboard <FontAwesomeIcon icon={faArrowRight} /> Courier <FontAwesomeIcon icon={faArrowRight} /> <span className="font-light text-gray-500">Company List</span>
                </p>
            </div>
            <div className="bg-white rounded-xl my-8 mx-8 lg:mx-16 py-8">
                <div className="px-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
                    <div className="border-2 flex items-center p-2 rounded-lg w-full lg:w-1/2">
                        <input
                            className="flex-grow focus:outline-none"
                            type="text"
                            placeholder="Search by ID or name..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <FontAwesomeIcon icon={faSearch} color="#3B81F6" />
                    </div>
                    <Link to="/addcouriercompany">
                        <button className="text-[#3B81F6] hover:text-white hover:bg-[#3B81F6] border-2 border-[#3B81F6] py-2 px-8 rounded-xl">
                            <FontAwesomeIcon className="pr-2" icon={faPlus} />
                            Add New
                        </button>
                    </Link>
                </div>
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full text-left">
                        <thead className="bg-[#F2F6F9]">
                            <tr>
                                <th className="py-4 px-6">Company ID</th>
                                <th className="py-4 px-6">Company Name</th>
                                <th className="py-4 px-6">Company URL</th>
                                <th className="py-4 px-6">Edit</th>
                                <th className="py-4 px-6">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(company => (
                                <tr key={company.Id} className="border-t">
                                    <td className="py-4 px-6">{company.Id}</td>
                                    <td className="py-4 px-6">{company.Courier_Company}</td>
                                    <td className="py-4 px-6">{company.Tracking_URL}</td>
                                    <td className="py-4 px-6 text-blue-500 cursor-pointer"><Link to = {`/updateCompany/${company.Id}`} >Edit</Link></td>
                                    <td className="py-4 px-6 text-red-500 cursor-pointer" onClick={() => confirmDelete(company.Id)}>Delete</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 px-8">
                    <p className="text-sm text-gray-500">Showing {filteredData.length} items</p>
                </div>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md">
                        <p>Are you sure you want to delete this courier company?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CourierCompanyList;
