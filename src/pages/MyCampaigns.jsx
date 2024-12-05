import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';  // Assuming you have AuthContext for user info

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
    }, [user]);  // This effect runs whenever the `user` object changes

    // Handle updating a campaign (could be a modal or redirect to an edit page)
    const handleUpdate = (campaignId) => {
        console.log("Update campaign with ID:", campaignId);
        // Implement your update logic here
    };

    // Handle deleting a campaign
    const handleDelete = async (campaignId) => {
        try {
            const response = await fetch(`http://localhost:5000/myCampaigns/${campaignId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete campaign. Status: ${response.status}`);
            }

            // Remove deleted campaign from state
            setCampaigns(prevCampaigns => prevCampaigns.filter(campaign => campaign._id !== campaignId));
            alert('Campaign deleted successfully');
        } catch (error) {
            console.error('Error deleting campaign:', error);
            alert('Failed to delete campaign');
        }
    };

    if (loading) {
        return <div>Loading...</div>;  // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>;  // Show error if there was an issue fetching campaigns
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 dark:bg-zinc-800 dark:text-white">
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
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 dark:bg-zinc-800 dark:border-gray-700">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left text-gray-800 dark:text-gray-300">Image</th>
                                <th className="py-2 px-4 border-b text-left text-gray-800 dark:text-gray-300">Title</th>
                                <th className="py-2 px-4 border-b text-left text-gray-800 dark:text-gray-300">Description</th>
                                <th className="py-2 px-4 border-b text-left text-gray-800 dark:text-gray-300">Minimum Donation</th>
                                <th className="py-2 px-4 border-b text-left text-gray-800 dark:text-gray-300">Deadline</th>
                                <th className="py-2 px-4 border-b text-left text-gray-800 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((campaign) => (
                                <tr key={campaign._id} className="hover:bg-gray-100 dark:hover:bg-gray-500">
                                    <td className="py-2 px-4 border-b">
                                        {campaign.imageUrl ? (
                                            <img
                                                src={campaign.imageUrl}  // Display the campaign's image
                                                alt={campaign.title}
                                                className="w-24 h-24 object-cover rounded-md mx-auto"
                                            />
                                        ) : (
                                            <span>No Image</span>  // Fallback text if no image is available
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b">{campaign.title}</td>
                                    <td className="py-2 px-4 border-b">{campaign.description.slice(0, 100)}...</td>
                                    <td className="py-2 px-4 border-b">${campaign.minimumDonation}</td>
                                    <td className="py-2 px-4 border-b">
                                        {campaign.deadline
                                            ? new Date(campaign.deadline).toLocaleDateString()
                                            : 'No deadline set'}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() => handleUpdate(campaign._id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(campaign._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyCampaigns;
