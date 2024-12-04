import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const RunningCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {

        fetch('http://localhost:5000/running-campaigns')
            .then((response) => response.json())
            .then((data) => setCampaigns(data))
            .catch((error) => console.error('Error fetching campaigns:', error));
    }, []);

    return (
        <div>


            <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
                Running Campaigns
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 dark:bg-zinc-800 w-11/12 mx-auto rounded-lg">
                {campaigns.map((campaign) => (
                    <div key={campaign._id} className="card bg-gray-200 dark:bg-zinc-950 shadow-lg p-3 rounded-lg overflow-hidden">
                        <img src={campaign.imageUrl || 'default_image.jpg'} alt={campaign.title} className="w-full h-48 object-cover rounded-lg" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{campaign.title}</h3>
                            <p className="text-sm text-gray-500">{campaign.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-lg font-bold">{`Goal: $${campaign.goalAmount}`}</span>
                                <span className="text-lg font-semibold text-green-500">{`Raised: $${campaign.raisedAmount}`}</span>
                            </div>
                            <div className="mt-4">
                                <Link to={`/campaign/${campaign._id}`} className="btn btn-primary w-full">See More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RunningCampaign;
