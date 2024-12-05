import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddCampaign = ({ user }) => {
    const [formData, setFormData] = useState({
        imageUrl: '',
        title: '',
        type: 'personal issue', // Default value for the dropdown
        description: '',
        minDonation: '',
        deadline: '',
    });

    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Add user details to the formData
        const campaignData = {
            ...formData,
            userEmail: user.email,
            userName: user.name,
        };

        // POST the campaign data to the server
        fetch('http://localhost:5000/campaigns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(campaignData),
        })
            .then((response) => {
                if (response.ok) {
                    Swal.fire('Success', 'Campaign added successfully!', 'success');
                    navigate('/my-campaigns'); // Redirect to My Campaigns page
                } else {
                    Swal.fire('Error', 'Failed to add campaign. Please try again.', 'error');
                }
            })
            .catch((error) => {
                console.error('Error adding campaign:', error);
                Swal.fire('Error', 'Something went wrong. Please try again later.', 'error');
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-zinc-900 rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
                Add New Campaign
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image/Thumbnail */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Image URL
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                {/* Campaign Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Campaign Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        placeholder="Enter campaign title"
                        required
                    />
                </div>

                {/* Campaign Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Campaign Type
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    >
                        <option value="personal issue">Personal Issue</option>
                        <option value="startup">Startup</option>
                        <option value="business">Business</option>
                        <option value="creative ideas">Creative Ideas</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        rows="4"
                        placeholder="Enter campaign description"
                        required
                    />
                </div>

                {/* Minimum Donation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Minimum Donation Amount ($)
                    </label>
                    <input
                        type="number"
                        name="minDonation"
                        value={formData.minDonation}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        placeholder="Enter minimum donation amount"
                        required
                    />
                </div>

                {/* Deadline */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Deadline
                    </label>
                    <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                        required
                    />
                </div>

                {/* User Email (Read Only) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        User Email
                    </label>
                    <input
                        type="email"
                        value={user.email}
                        className="w-full mt-1 p-2 border rounded bg-gray-100"
                        readOnly
                    />
                </div>

                {/* User Name (Read Only) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        User Name
                    </label>
                    <input
                        type="text"
                        value={user.name}
                        className="w-full mt-1 p-2 border rounded bg-gray-100"
                        readOnly
                    />
                </div>

                {/* Add Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Add Campaign
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCampaign;
