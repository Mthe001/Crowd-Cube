import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route params

const CampaignDetails = () => {
    const { id } = useParams(); // Get the campaign ID from the URL
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        // Fetch the details of the selected campaign
        fetch(`http://localhost:5000/campaigns/${id}`)
            .then((response) => response.json())
            .then((data) => setCampaign(data))
            .catch((error) => console.error('Error fetching campaign details:', error));
    }, [id]);

    if (!campaign) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold">{campaign.title}</h1>
            <p className="text-lg mt-4">{campaign.description}</p>
            <div className="mt-4">
                <span className="text-lg font-bold">{`Goal: $${campaign.goalAmount}`}</span>
                <br />
                <span className="text-lg font-semibold text-green-500">{`Raised: $${campaign.raisedAmount}`}</span>
            </div>
            <div className="mt-6">
                <button className="btn btn-primary">Donate</button>
            </div>
        </div>
    );
};

export default CampaignDetails;
