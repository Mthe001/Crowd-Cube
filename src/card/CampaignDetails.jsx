import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useAuth } from '../provider/AuthProvider'; // Use the useAuth hook

const CampaignDetails = () => {
    const { id } = useParams();
    const { user } = useAuth(); // Get the user from the Auth context
    const [campaign, setCampaign] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/running-campaigns/${id}`)
            .then((response) => response.json())
            .then((data) => setCampaign(data))
            .catch((error) => console.error('Error fetching campaign details:', error));
    }, [id]);

    if (!campaign) return <p>Loading...</p>;

    // Function to format the deadline correctly
    const formatDeadline = (deadline) => {
        const [day, month, year] = deadline.split('/'); // Split by '/'
        const date = new Date(year, month - 1, day); // Date expects month to be 0-indexed
        return date.toLocaleDateString(); // Format the date in a human-readable format
    };

    // Function to handle donation
    const handleDonate = async () => {
        // Ask for the donation amount
        const { value: donationAmount } = await Swal.fire({
            title: 'Enter Donation Amount',
            input: 'number',
            inputLabel: 'Donation Amount',
            inputPlaceholder: 'Enter amount to donate',
            inputAttributes: {
                min: 1,
                step: 1,
            },
            showCancelButton: true,
            confirmButtonText: 'Donate',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value || value <= 0) {
                    return 'Please enter a valid amount!';
                }
            },
        });

        // If a donation amount is entered, proceed with donation
        if (donationAmount) {
            const newRaisedAmount = campaign.raisedAmount + parseFloat(donationAmount);

            try {
                // Save donation in running-donations collection
                const response = await fetch('http://localhost:5000/running-donations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        campaignId: campaign._id,
                        donationAmount: parseFloat(donationAmount),
                        donorName: user?.displayName || 'Anonymous', // Use the user's name if available
                        donorEmail: user?.email || 'anonymous@example.com', // Use the user's email if available
                    }),
                });

                if (!response.ok) {
                    throw new Error('Donation failed');
                }

                // Update raisedAmount in running campaign
                const campaignUpdateResponse = await fetch(`http://localhost:5000/running-campaigns/${id}/donate`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ raisedAmount: newRaisedAmount }),
                });

                if (!campaignUpdateResponse.ok) {
                    throw new Error('Failed to update raised amount');
                }

                setCampaign((prevCampaign) => ({
                    ...prevCampaign,
                    raisedAmount: newRaisedAmount,
                }));

                Swal.fire({
                    title: 'Donation Successful!',
                    text: `You donated $${donationAmount}. Thank you for your contribution!`,
                    icon: 'success',
                    confirmButtonText: 'Close',
                });
            } catch (error) {
                console.error('Error processing donation:', error);
                Swal.fire({
                    title: 'Donation Failed!',
                    text: 'There was an error processing your donation. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'Close',
                });
            }
        } else {
            Swal.fire({
                title: 'Donation Failed!',
                text: 'Please make sure you are logged in to donate.',
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 bg-gray-200 dark:bg-zinc-900 rounded-lg">
            <div className="flex items-center space-x-2 mb-6">
                <button onClick={() => navigate(-1)} className="flex items-center text-blue-500 hover:text-blue-700">
                    <FiArrowLeft className="mr-2" />
                    Back
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                    <img
                        src={campaign.imageUrl || 'default_image.jpg'}
                        alt={campaign.title}
                        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>

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
                        <div className="font-semibold text-gray-700 dark:text-zinc-300 mt-2">
                            Deadline: <span>{formatDeadline(campaign.deadline)}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleDonate}
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
