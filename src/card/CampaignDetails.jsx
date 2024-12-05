import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2'; // Import SweetAlert2

const CampaignDetails = () => {
    const { id } = useParams(); // Get campaign ID from URL
    const [campaign, setCampaign] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetch(`http://localhost:5000/running-campaigns/${id}`)
            .then((response) => response.json())
            .then((data) => setCampaign(data))
            .catch((error) => console.error('Error fetching campaign details:', error));
    }, [id]);

    if (!campaign) return <p>Loading...</p>;

    // Function to handle donation
    const handleDonate = () => {
        Swal.fire({
            title: 'Donation Successful!',
            text: 'Thank you for your contribution.',
            icon: 'success',
            confirmButtonText: 'Close',
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 bg-gray-200 dark:bg-zinc-900 rounded-lg">
            <div className="flex items-center space-x-2 mb-6">
                <button
                    onClick={() => navigate(-1)} // Go back to the previous page
                    className="flex items-center text-blue-500 hover:text-blue-700">
                    <FiArrowLeft className="mr-2" />
                    Back
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Campaign Image */}
                <div>
                    <img
                        src={campaign.imageUrl || 'default_image.jpg'}
                        alt={campaign.title}
                        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Campaign Details */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                        {campaign.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                        {campaign.description}
                    </p>
                    <div className="text-lg">
                        <div className="font-bold">
                            Goal: <span className="text-zinc-800 dark:text-gray-100">${campaign.goalAmount}</span>
                        </div>
                        <div className="font-semibold text-green-500 mt-2">
                            Raised: <span>${campaign.raisedAmount}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6">
                        <button
                            onClick={handleDonate} // Trigger SweetAlert on click
                            className="w-full md:w-auto btn border-gray-500 bg-zinc-800 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                        >
                            Donate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
