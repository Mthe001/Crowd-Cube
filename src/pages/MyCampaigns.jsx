import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';  // Assuming you have AuthContext for user info
import Swal from 'sweetalert2';  // Import SweetAlert2

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

                const response = await fetch(`http://localhost:5000/myCampaigns/${user.email}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch campaigns. Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Campaigns fetched successfully:', data);

                setCampaigns(data);  // Update campaigns state
            } catch (err) {
                console.error('Error fetching campaigns:', err);
                setError(err.message);  // Update error state
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

    // Handle updating a campaign (could be a modal or redirect to an edit page)
    const handleUpdate = (campaignId) => {
        console.log("Update campaign with ID:", campaignId);
        // Implement your update logic here
    };

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
                const response = await fetch(`http://localhost:5000/myCampaigns/${campaignId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Failed to delete campaign. Status: ${response.status}`);
                }

                // Remove deleted campaign from state
                setCampaigns(prevCampaigns => prevCampaigns.filter(campaign => campaign._id !== campaignId));
                Swal.fire('Deleted!', 'Your campaign has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting campaign:', error);
                Swal.fire('Error!', 'Failed to delete campaign.', 'error');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
                                <button
                                    onClick={() => handleUpdate(campaign._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Update
                                </button>
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
