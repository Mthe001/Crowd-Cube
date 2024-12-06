import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RunningCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {

        fetch('https://assignment-10-server-kappa-steel.vercel.app/campaigns')
            .then((response) => response.json())
            .then((data) => {

                const currentDate = new Date();
                const activeCampaigns = data.filter((campaign) => {
                    const campaignDeadline = new Date(campaign.deadline);
                    return campaignDeadline > currentDate;
                });

                setCampaigns(activeCampaigns.slice(0, 6));
            })
            .catch((error) => console.error('Error fetching campaigns:', error));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
                Running Campaigns
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 dark:bg-zinc-800 w-11/12 mx-auto rounded-lg">
                {campaigns.length > 0 ? (
                    campaigns.map((campaign) => (
                        <div key={campaign._id} className="card bg-gray-200 dark:bg-zinc-950 shadow-lg p-3 rounded-lg overflow-hidden">
                            <img
                                src={campaign.imageUrl || 'default_image.jpg'}
                                alt={campaign.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{campaign.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{campaign.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold">{`Min Donation: $${campaign.minimumDonation}`}</span>
                                    <span className="text-lg font-semibold text-green-500">{`Deadline: ${campaign.deadline}`}</span>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                    <span>Campaign Type: {campaign.type}</span>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        to={`/campaigns/${campaign._id}`}
                                        className="btn btn-primary w-full"
                                    >
                                        See More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-500">No running campaigns found.</p>
                )}
            </div>
        </div>
    );
};

export default RunningCampaigns;
