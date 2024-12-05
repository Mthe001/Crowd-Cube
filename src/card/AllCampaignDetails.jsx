import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'; // Import the back arrow icon

const AllCampaignDetails = () => {
    const { id } = useParams(); // Get the campaign ID from the URL
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Hook for navigation

    // Fetch campaign details by ID
    useEffect(() => {
        const fetchCampaignDetails = async () => {
            const url = `http://localhost:5000/campaigns/${id}`;
            console.log(`Fetching campaign details from: ${url}`);

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch campaign details. Status: ${response.status}`);
                }

                const data = await response.json();
                setCampaign(data);
            } catch (error) {
                setError(`Error: ${error.message}`);
                console.error('Error details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaignDetails();
    }, [id]); // Re-run when campaignId changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!campaign) {
        return <div>Campaign not found.</div>;
    }

    return (
        <div className="p-6 dark:bg-zinc-800 w-full md:w-11/12 mx-auto rounded-lg">
            <button
                onClick={() => navigate(-1)} // Go back to the previous page
                className="flex items-center text-gray-600 dark:text-gray-200 mb-4"
            >
                <IoArrowBack className="mr-2 text-xl" /> {/* Back arrow icon */}
                <span>Back</span>
            </button>

            {/* Campaign Image */}
            {campaign.imageUrl && (
                <div className="mb-6 flex justify-center items-center">
                    <img
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        className="w-full md:w-96 h-auto rounded-lg object-cover"
                    />
                </div>
            )}

            {/* Campaign Title */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Title:</h2>
                <h1 className="text-4xl font-bold text-start text-gray-800 dark:text-gray-200">{campaign.title}</h1>
            </div>

            {/* Campaign Description */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Description:</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{campaign.description}</p>
            </div>

            {/* Donation Information */}
            <div className="mt-6 mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Donation Amount:</h2>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">${campaign.minimumDonation}</h3>
            </div>

            {/* Deadline Information */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Deadline:</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : 'No deadline set'}
                </p>
            </div>
        </div>
    );
};

export default AllCampaignDetails;
