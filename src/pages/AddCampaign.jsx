import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const AddCampaign = () => {
    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const campaignDeadline = new Date(form.deadline.value);
        const currentDate = new Date();


        if (campaignDeadline < currentDate) {
            Swal.fire({
                title: 'Invalid Deadline!',
                text: 'The deadline cannot be set to a past date.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return;
        }

        const campaign = {
            imageUrl: form.imageUrl.value,
            title: form.title.value,
            type: form.type.value,
            description: form.description.value,
            minimumDonation: form.minimumDonation.value,
            deadline: form.deadline.value,
            userEmail: user.email,
            userName: user.displayName || 'User',
        };

        console.log('Campaign Data to be sent:', campaign);

        fetch('https://assignment-10-server-kappa-steel.vercel.app/campaigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campaign),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to add campaign: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Server Response:', data);
                if (data.campaign) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Campaign added successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    });
                }
                form.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while adding the campaign. Please try again later.');
            });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6 dark:text-gray-200">Add New Campaign</h1>
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
                        placeholder="Enter image URL"
                        className="input input-bordered w-full bg-zinc-200 dark:bg-zinc-800"
                        required
                    />
                </div>

                {/* Campaign Title */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700  dark:text-zinc-300 dark:font-semibold">Campaign Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter campaign title"
                        className="input input-bordered w-full bg-zinc-200 dark:bg-zinc-800"
                        required
                    />
                </div>

                {/* Campaign Type */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700  dark:text-zinc-300 dark:font-semibold">Campaign Type</label>
                    <select name="type" className="select select-bordered w-full bg-zinc-200 dark:bg-zinc-800" required>
                        <option value="">Select Type</option>
                        <option value="personal issue">Personal Issue</option>
                        <option value="startup">Startup</option>
                        <option value="business">Business</option>
                        <option value="creative ideas">Creative Ideas</option>
                    </select>
                </div>

                {/* Minimum Donation */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700  dark:text-zinc-300 dark:font-semibold">Minimum Donation ($)</label>
                    <input
                        type="number"
                        name="minimumDonation"
                        placeholder="Enter minimum donation amount"
                        className="input input-bordered w-full bg-zinc-200 dark:bg-zinc-800"
                        required
                    />
                </div>

                {/* Deadline */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700  dark:text-zinc-300 dark:font-semibold">Deadline</label>
                    <input type="date" name="deadline" className="input input-bordered w-full bg-zinc-200 dark:bg-zinc-800" required />
                </div>

                {/* User Email */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700  dark:text-zinc-300 dark:font-semibold">User Email</label>
                    <input
                        type="email"
                        name="userEmail"
                        value={user.email}
                        className="input input-bordered w-full bg-zinc-200 dark:bg-zinc-800"
                        readOnly
                    />
                </div>

                {/* User Name */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700  dark:text-zinc-300 dark:font-semibold">User Name</label>
                    <input
                        type="text"
                        name="userName"
                        value={user.displayName || 'User'}
                        className="input input-bordered w-full bg-zinc-200 dark:bg-zinc-800"
                        readOnly
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col md:col-span-2">
                    <label className="label mb-2 font-medium text-gray-700  dark:text-zinc-300 dark:font-semibold">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter detailed campaign description"
                        className="textarea textarea-bordered w-full bg-zinc-200 dark:bg-zinc-800"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-center">
                    <button type="submit" className="btn btn-primary w-full md:w-1/2">
                        Add Campaign
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCampaign;
