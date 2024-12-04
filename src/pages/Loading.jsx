import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-zinc-900">
            <div className="flex flex-col items-center space-y-4">
                <div className="radial-progress animate-spin text-indigo-500" style={{ "--value": 70 }}></div>
                <p className="text-lg text-gray-800 dark:text-white">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default Loading;
