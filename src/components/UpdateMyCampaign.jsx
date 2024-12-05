import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateMyCampaign = () => {
    const { id } = useParams(); // Get the id from the URL
    const [campaign, setCampaign] = useState(null); // Store the campaign data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // To navigate back to MyCampaigns after updating

    useEffect(() => {
        const fetchCampaignData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/campaigns/${id}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch campaign. Status: ${response.status}`);
                }

                const data = await response.json();
                setCampaign(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching campaign:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        // Fetch campaign data when the component mounts
        fetchCampaignData();

        // Cleanup function in case the component unmounts before the fetch finishes
        return () => setLoading(false);
    }, [id]); // Re-run effect when id changes
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const deadline = form.deadline.value;

        // Validate if the deadline is in the future
        const currentDate = new Date();
        const selectedDeadline = new Date(deadline);

        if (selectedDeadline <= currentDate) {
            Swal.fire({
                title: 'Error!',
                text: 'The deadline must be a future date.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return; // Stop form submission if the deadline is invalid
        }

        const updatedCampaign = {
            imageUrl: form.imageUrl.value,
            title: form.title.value,
            type: form.type.value,
            description: form.description.value,
            minimumDonation: form.minimumDonation.value,
            deadline: form.deadline.value,
        };

        try {
            const response = await fetch(`http://localhost:5000/campaigns/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCampaign),
            });

            if (!response.ok) {
                throw new Error(`Failed to update campaign. Status: ${response.status}`);
            }

            Swal.fire({
                title: 'Success!',
                text: 'Campaign updated successfully',
                icon: 'success',
                confirmButtonText: 'Cool',
            });

            // Navigate back to MyCampaigns after successful update
            navigate('/my-campaigns');
        } catch (error) {
            console.error('Error updating campaign:', error);
            Swal.fire('Error!', 'Failed to update campaign.', 'error');
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Make sure the campaign object is loaded before trying to access its properties
    if (!campaign) {
        return <div>No campaign data found.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6 dark:text-gray-200">Update Campaign</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 dark:bg-zinc-950 shadow-lg rounded-lg p-8 grid w-11/12 mx-auto gap-6 md:grid-cols-2"
            >
                {/* Image URL */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700 dark:text-zinc-300 dark:font-semibold">Image/Thumbnail URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        defaultValue={campaign.imageUrl || ''}
                        placeholder="Enter image URL"
                        className="input input-bordered w-full bg-zinc-200 dark:bg-zinc-800"
                        required
                    />
                </div>

                {/* Campaign Title */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700 dark:text-zinc-300 dark:font-semibold">Campaign Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={campaign.title || ''}
                        placeholder="Enter campaign title"
                        className="input input-bordered w-full bg-zinc-200 dark:bg-zinc-800"
                        required
                    />
                </div>

                {/* Campaign Type */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700 dark:text-zinc-300 dark:font-semibold">Campaign Type</label>
                    <select name="type" defaultValue={campaign.type || ''} className="select select-bordered w-full bg-zinc-200 dark:bg-zinc-800" required>
                        <option value="personal issue">Personal Issue</option>
                        <option value="startup">Startup</option>
                        <option value="business">Business</option>
                        <option value="creative ideas">Creative Ideas</option>
                    </select>
                </div>

                {/* Minimum Donation */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700 dark:text-zinc-300 dark:font-semibold">Minimum Donation ($)</label>
                    <input
                        type="number"
                        name="minimumDonation"
                        defaultValue={campaign.minimumDonation || ''}
                        placeholder="Enter minimum donation amount"
                        className="input input-bordered w-full bg-zinc-200 dark:bg-zinc-800"
                        required
                    />
                </div>

                {/* Deadline */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700 dark:text-zinc-300 dark:font-semibold">Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                        defaultValue={campaign.deadline ? new Date(campaign.deadline).toISOString().split('T')[0] : ''}
                        className="input input-bordered w-full bg-zinc-200 dark:bg-zinc-800"
                        required
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col md:col-span-2">
                    <label className="label mb-2 font-medium text-gray-700 dark:text-zinc-300 dark:font-semibold">Description</label>
                    <textarea
                        name="description"
                        defaultValue={campaign.description || ''}
                        placeholder="Enter detailed campaign description"
                        className="textarea textarea-bordered w-full bg-zinc-200 dark:bg-zinc-800"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-center">
                    <button type="submit" className="btn btn-primary w-full md:w-1/2">
                        Update Campaign
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateMyCampaign;
