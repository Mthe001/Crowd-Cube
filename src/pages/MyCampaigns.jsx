import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';  // Assuming you have AuthContext for user info
import Swal from 'sweetalert2';  // Import SweetAlert2
import { Link } from 'react-router-dom';  // Import Link for navigation

const MyCampaigns = () => {
    const { user } = useContext(AuthContext);  // Get the logged-in user from context
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the user's campaigns
    useEffect(() => {
        const fetchCampaigns = async () => {
            if (!user?.email) {
                setError('User email is missing!');
                setLoading(false);
                return;
            }

            try {
                console.log('Fetching campaigns for userEmail:', user.email);

                const response = await fetch(`http://localhost:5000/my-campaigns/${user.email}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch campaigns. Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Campaigns fetched successfully:', data);

                if (Array.isArray(data) && data.length > 0) {
                    setCampaigns(data);  // Update campaigns state if the response is valid
                } else {
                    setCampaigns([]);  // Set empty array if no campaigns are found
                }
            } catch (err) {
                console.error('Error fetching campaigns:', err);
                setError(' You have not campaign created yet !');
            } finally {
                setLoading(false);
            }
        };

        // Trigger the fetch function if the user email is available
        if (user?.email) {
            fetchCampaigns();
        } else {
            setLoading(false);  // If no user email, stop loading
        }
    }, [user]);


    // Handle deleting a campaign with confirmation
    const handleDelete = async (campaignId) => {
        // Show SweetAlert2 confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                // Send DELETE request to backend
                const response = await fetch(`http://localhost:5000/myCampaigns/${campaignId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Failed to delete campaign. Status: ${response.status}`);
                }

                // Remove deleted campaign from state
                setCampaigns(prevCampaigns => prevCampaigns.filter(campaign => campaign._id !== campaignId));

                // Show success alert
                Swal.fire('Deleted!', 'Your campaign has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting campaign:', error);
                Swal.fire('Error!', 'Failed to delete campaign.', 'error');
            }
        }
    };


    // If loading, show loading state
    if (loading) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400">
                <p>Loading...</p>
            </div>
        );
    }

    // If there was an error, display the error message
    if (error) {
        return (
            <div className="text-center text-red-500 dark:text-red-400">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 m-5 rounded-lg dark:bg-zinc-800 dark:text-white">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
                My Campaigns
            </h1>
            <p className="text-center text-gray-600 mb-10 dark:text-gray-400">
                Here are the campaigns you have created. You can view, edit, or delete them.
            </p>

            {campaigns.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400">
                    You have no campaigns yet.
                </div>
            ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {campaigns.map((campaign, index) => (
                        <div key={campaign._id} className="bg-white dark:bg-zinc-700 rounded-lg shadow-lg p-6">
                            <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                <span className="text-gray-500 dark:text-gray-300">#{index + 1}</span> {campaign.title}
                            </div>
                            <div className="text-gray-800 dark:text-gray-300 mb-2">
                                <strong>Minimum Donation:</strong> ${campaign.minimumDonation}
                            </div>
                            <div className="text-gray-800 dark:text-gray-300 mb-4">
                                <strong>Deadline:</strong> {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : 'No deadline set'}
                            </div>
                            <div className="flex justify-between mt-4">
                                <Link
                                    to={`/updateCampaign/${campaign._id}`}  // Set the link to the edit page with campaign ID
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(campaign._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCampaigns;
