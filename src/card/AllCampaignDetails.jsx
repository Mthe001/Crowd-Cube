import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const AllCampaignDetails = () => {
    const { id } = useParams(); // Get campaign ID from URL
    const { user } = useContext(AuthContext); // Get current logged-in user
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [donationAmount, setDonationAmount] = useState(''); // State to store donation amount

    const navigate = useNavigate(); // Initialize navigation

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            const url = `http://localhost:5000/campaigns/${id}`;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch campaign details. Status: ${response.status}`);
                }

                const data = await response.json();
                setCampaign(data);
            } catch (error) {
                console.error('Error details:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Failed to fetch campaign details. Please try again later.`,
                });
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaignDetails();
    }, [id]);

    // Handle donation submission
    const handleDonationSubmit = async (e) => {
        e.preventDefault();

        // Validate donation amount
        const amount = parseFloat(donationAmount);
        if (!donationAmount || isNaN(amount) || amount <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Donation',
                text: 'Please enter a valid donation amount greater than 0.',
            });
            return;
        }

        if (amount < campaign.minimumDonation) {
            Swal.fire({
                icon: 'warning',
                title: 'Donation Too Low',
                text: `The minimum donation amount is $${campaign.minimumDonation}. Please enter a higher amount.`,
            });
            return;
        }

        if (!user?.email) {
            Swal.fire({
                icon: 'warning',
                title: 'Not Logged In',
                text: 'You need to log in to make a donation.',
            });
            return;
        }

        const donationData = {
            campaignId: id,
            campaignTitle: campaign.title, // Campaign title
            userEmail: user.email, // Use logged-in user's email
            amount,
            deadline: campaign.deadline ? campaign.deadline : null, // Include the deadline if available
            donatedAt: new Date().toISOString(),
        };

        try {
            const response = await fetch('http://localhost:5000/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donationData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Failed to submit donation. Status: ${response.status}`);
            }

            Swal.fire({
                icon: 'success',
                title: 'Thank You!',
                text: `Your donation of $${amount} to the campaign "${campaign.title}" was successful.`,
            });

            setDonationAmount(''); // Clear the input field
        } catch (error) {
            console.error('Error during donation:', error);
            Swal.fire({
                icon: 'error',
                title: 'Donation Failed',
                text: 'Failed to process your donation. Please try again later.',
            });
        }

    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!campaign) {
        Swal.fire({
            icon: 'error',
            title: 'Campaign Not Found',
            text: 'The campaign you are looking for does not exist.',
        });
        return null;
    }

    return (
        <div className="p-6 dark:bg-zinc-800 w-full md:w-11/12 mx-auto rounded-lg">
            <button
                onClick={() => navigate(-1)} // Go back to the previous page
                className="flex items-center text-gray-600 dark:text-gray-200 mb-4"
            >
                <IoArrowBack className="mr-2 text-xl" />
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
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Minimum Donation Amount:</h2>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">${campaign.minimumDonation}</h3>
            </div>

            {/* Deadline Information */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Deadline:</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : 'No deadline set'}
                </p>
            </div>

            {/* Donation Form */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Make a Donation</h2>
                <form onSubmit={handleDonationSubmit} className="flex flex-col gap-4">
                    <input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        placeholder="Enter donation amount"
                        className="p-2 border border-gray-300 rounded-lg"
                        min="0"
                        step="0.01"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Donate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AllCampaignDetails;
