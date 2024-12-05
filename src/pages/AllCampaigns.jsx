import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useLoaderData } from 'react-router-dom';

const AllCampaigns = () => {
    // Load campaigns data using useLoaderData
    const campaigns = useLoaderData();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 m-10 lg:grid-cols-3 gap-8 p-6 dark:bg-zinc-800 w-11/12 mx-auto rounded-lg">
            {campaigns.map(campaign => (
                <div key={campaign._id} className="card bg-gray-200 dark:bg-zinc-950 shadow-lg p-3 rounded-lg overflow-hidden">
                    <img
                        src={campaign.imageUrl || 'default_image.jpg'}
                        alt={campaign.title}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">{campaign.title}</h3>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-lg font-bold">{`Donation: $${campaign.minimumDonation}`}</span>
                            <span className="text-lg font-semibold text-blue-500">{`Deadline: ${campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : 'No deadline set'}`}</span>
                        </div>
                        <div className="mt-4">
                            {/* Using Link to navigate to the details page */}
                            <Link
                                to={`/campaigns/${campaign._id}`}
                                className="btn btn-primary w-full text-center"
                            >
                                See More
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllCampaigns;
