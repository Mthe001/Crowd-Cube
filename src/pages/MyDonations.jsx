import React, { useState, useEffect } from 'react';
import { useAuth } from '../provider/AuthProvider';  // Import useAuth hook from AuthContext

const MyDonations = () => {
    const { user } = useAuth();  // Get logged-in user data (including email) from AuthContext
    const [donations, setDonations] = useState([]);  // To store donations data
    const [loading, setLoading] = useState(true);    // Loading state
    const [error, setError] = useState(null);        // Error state

    useEffect(() => {
        // Function to fetch donations data for the specific user
        const fetchDonations = async () => {
            if (!user || !user.email) {
                setError('No user email found');
                setLoading(false);
                return;
            }

            console.log(`Fetching donations for: ${user.email}`);  // Debugging line

            try {
                const response = await fetch(`http://localhost:5000/donations/${user.email}`);
                console.log(response);  // Log the response object to see if it's successful
                if (!response.ok) {
                    throw new Error('Failed to fetch donations');
                }

                const data = await response.json();
                console.log(data);  // Log the fetched data
                setDonations(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load donations. Please try again later.');
            } finally {
                setLoading(false);
            }
        };


        fetchDonations();  // Trigger the fetch on component mount
    }, [user]);  // Runs again if user data changes (e.g., user logs in)

    // Render loading state
    if (loading) {
        return <div className="text-center text-gray-600">Loading donations...</div>;
    }

    // Render error state
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    // If there are no donations
    if (donations.length === 0) {
        return <div className="text-center text-gray-600">You have not made any donations yet.</div>;
    }

    // Render donations data
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 m-5 rounded-lg bg-white dark:bg-zinc-800 dark:text-white">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">My Donations</h1>
            <p className="text-center text-gray-600 mb-10 dark:text-gray-400">
                Here are the donations you have made.
            </p>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {donations.map((donation) => (
                    <div key={donation._id} className="bg-white dark:bg-zinc-700 rounded-lg shadow-lg p-6">
                        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Donation for campaign: {donation.campaignTitle}
                        </div>
                        <div className="text-gray-800 dark:text-gray-300 mb-2">
                            <strong>Donated Amount:</strong> ${donation.amount}
                        </div>
                        <div className="text-gray-800 dark:text-gray-300 mb-2">
                            <strong>Donation Date:</strong> {new Date(donation.donatedAt).toLocaleDateString()}
                        </div>
                        <div className="text-gray-800 dark:text-gray-300 mb-4">
                            <strong>Donor Email:</strong> {donation.donorEmail}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyDonations;
