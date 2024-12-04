import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const RunningCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        // Fetch campaigns from the backend
        fetch('http://localhost:5000/running-campaigns')
            .then((response) => response.json())
            .then((data) => setCampaigns(data))
            .catch((error) => console.error('Error fetching campaigns:', error));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            {campaigns.map((campaign) => (
                <div key={campaign._id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={campaign.imageUrl || 'default_image.jpg'} alt={campaign.title} className="w-full h-48 object-cover" />
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
    );
};

export default RunningCampaign;
