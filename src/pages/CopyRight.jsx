import React from 'react';

const CopyRight = () => {
    return (
        <div className="bg-gray-100 dark:bg-zinc-950 text-center py-4 px-6">
            <div className="max-w-screen-xl mx-auto text-gray-800 dark:text-gray-200">
                <p className="text-lg sm:text-base">
                    &copy; {new Date().getFullYear()} CrowdCube. All rights reserved.
                </p>
                <p className="mt-2 text-sm sm:text-base">
                    Unauthorized copying or reproduction of any content from this website is strictly prohibited.
                </p>
                <div className="mt-4 flex justify-center space-x-4 text-sm sm:text-base">
                    <a href="#" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500">Terms of Service</a>
                    <span>|</span>
                    <a href="#" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
};

export default CopyRight;
