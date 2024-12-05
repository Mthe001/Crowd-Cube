import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider'; // Assuming you have AuthContext

const AddCampaign = () => {
    const { user } = useContext(AuthContext);  // Fetch logged-in user info from context

    // Fallback if the name is missing (handle both Google and Facebook login)
    const userName = user.displayName || 'User'; // Use displayName for Google login or fallback to a generic name

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const campaign = {
            imageUrl: form.imageUrl.value,
            title: form.title.value,
            type: form.type.value,
            description: form.description.value,
            minimumDonation: form.minimumDonation.value,
            deadline: form.deadline.value,
            userEmail: user.email,  // Use logged-in user's email
            userName: userName,     // Use dynamic user name or fallback
        };

        console.log("Campaign Data to be sent:", campaign);

        // Send data to the server
        fetch('http://localhost:5000/campaigns', {
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
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Campaign added successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    });
                }
                form.reset(); // Reset the form after a successful submission
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while adding the campaign. Please try again later.');
            });
    };

    if (!user) {
        return <div>Loading...</div>;  // Show loading while user info is being fetched
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Add New Campaign</h1>
            <p className="text-center text-gray-600 mb-10">
                Fill out the form below to add a new campaign to our platform. Provide accurate details to attract supporters!
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 shadow-lg rounded-lg p-8 grid w-11/12 mx-auto gap-6 md:grid-cols-2"
            >
                {/* Image URL */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Image/Thumbnail URL
                    </label>
                    <input
                        type="url"
                        name="imageUrl"
                        placeholder="Enter image URL"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Campaign Title */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Campaign Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter campaign title"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Campaign Type */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Campaign Type
                    </label>
                    <select
                        name="type"
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="personal issue">Personal Issue</option>
                        <option value="startup">Startup</option>
                        <option value="business">Business</option>
                        <option value="creative ideas">Creative Ideas</option>
                    </select>
                </div>

                {/* Minimum Donation */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Minimum Donation ($)
                    </label>
                    <input
                        type="number"
                        name="minimumDonation"
                        placeholder="Enter minimum donation amount"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Deadline */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        Deadline
                    </label>
                    <input
                        type="date"
                        name="deadline"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* User Email */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        User Email
                    </label>
                    <input
                        type="email"
                        name="userEmail"
                        value={user.email} // Dynamically set the logged-in user's email
                        className="input input-bordered w-full"
                        readOnly
                    />
                </div>

                {/* User Name */}
                <div className="flex flex-col">
                    <label className="label mb-2 font-medium text-gray-700">
                        User Name
                    </label>
                    <input
                        type="text"
                        name="userName"
                        value={userName} // Dynamically set the logged-in user's name or fallback name
                        className="input input-bordered w-full"
                        readOnly
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col md:col-span-2">
                    <label className="label mb-2 font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Enter detailed campaign description"
                        className="textarea textarea-bordered w-full"
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
