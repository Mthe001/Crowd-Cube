import React, { useState } from 'react';
import { Link } from 'react-router';
import { useLoaderData } from 'react-router-dom';

const AllCampaigns = () => {

    const campaigns = useLoaderData();


    const [isAscending, setIsAscending] = useState(true);


    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };


    const sortedCampaigns = [...campaigns].sort((a, b) => {

        if (isAscending) {
            return a.minimumDonation - b.minimumDonation;
        } else {
            return b.minimumDonation - a.minimumDonation;
        }
    });

    return (
        <div className='dark:bg-zinc-800 rounded-lg'>
            <h1 className='text-center p-5 lg:text-3xl font-semibold md:text-2xl text-xl'>All Campaigns</h1>

            {/* Sort Button - Fixed to the left */}
            <div className="mb-6 w-[85%] mx-auto">
                <button
                    onClick={toggleSortOrder}
                    className="btn btn-secondary px-6 rounded-md bg-orange-600 text-white hover:bg-orange-700"
                >
                    Sort
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 m-10 lg:grid-cols-3 gap-8 p-6 dark:bg-zinc-800 w-11/12 mx-auto rounded-lg">
                {sortedCampaigns.map(campaign => (
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
        </div>
    );
};

export default AllCampaigns;
