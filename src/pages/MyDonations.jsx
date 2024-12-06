import React, { useState, useEffect } from 'react';
import { useAuth } from '../provider/AuthProvider';
import { Fade } from 'react-awesome-reveal';

const MyDonations = () => {
    const { user } = useAuth();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonations = async () => {

            if (!user || !user.email) {
                setError('No user email found');
                setLoading(false);
                return;
            }

            const userEmail = user.email;
            console.log(`Fetching donations for: ${userEmail}`);

            try {

                const regularDonationsResponse = await fetch(`https://assignment-10-server-kappa-steel.vercel.app/donations/user/${userEmail}`);
                if (!regularDonationsResponse.ok) {
                    throw new Error('Failed to fetch regular donations');
                }
                const regularDonations = await regularDonationsResponse.json();

                setDonations(regularDonations);

            } catch (err) {
                console.error('Error fetching donations:', err);
                setError('You haven’t donated yet.');
            } finally {
                setLoading(false);
            }
        };

        if (user && user.email) {
            fetchDonations();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div className="text-center text-gray-600 dark:text-gray-400">Loading your donations...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (donations.length === 0) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-400">
                You have not made any regular donations yet.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
                My Donations
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                Here are the regular donations you have made.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {donations.map((donation) => (
                    <Fade key={donation._id} duration={1000} delay={300}>
                        <div className="bg-white dark:bg-zinc-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
                            <div className="lg:text-xl text-[15px] font-semibold mb-4">
                                <span
                                    className={`${donation.donationAmount ? 'text-green-500' : 'text-red-500'
                                        }`}
                                >
                                    {donation.donationAmount
                                        ? `Donation for running campaign: ${donation.campaignId}`
                                        : `Donation for regular campaign: ${donation.campaignId}`}
                                </span>
                            </div>

                            <div className="text-gray-800 dark:text-gray-300 mb-2">
                                <strong>Donated Amount:</strong> ${donation.amount || donation.donationAmount}
                            </div>
                            <div className="text-gray-800 dark:text-gray-300 mb-2">
                                <strong>Donation Date:</strong> {new Date(donation.donatedAt || donation.date).toLocaleDateString()}
                            </div>
                            <div className="text-gray-800 dark:text-gray-300 mb-4">
                                <strong>User Email:</strong> {donation.userEmail || donation.donorEmail}
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>
        </div>
    );
};

export default MyDonations;
