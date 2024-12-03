import React from 'react';

const About = () => {
    return (
        <div className=" bg-gray-100 dark:bg-gray-900 py-12 px-6">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
                    About Our Crowdfunding Platform
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Empowering dreams and ideas, one contribution at a time.
                </p>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto bg-white dark:bg-black rounded-lg shadow-lg p-8 transform transition hover:scale-105">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-7">
                    A crowdfunding website is a platform where people can raise money for different projects, ideas, or
                    causes by inviting others to contribute financially. These projects can include:
                </p>
                <ul className="list-disc list-inside my-6 text-gray-700 dark:text-gray-300">
                    <li>
                        <strong>Personal needs:</strong> Like medical expenses, education costs, or emergency support.
                    </li>
                    <li>
                        <strong>Creative ideas:</strong> Such as making a film, publishing a book, or developing an app.
                    </li>
                    <li>
                        <strong>Startups:</strong> Launching innovative products, businesses, or community initiatives.
                    </li>
                </ul>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-7">
                    By connecting creators and contributors, our platform fosters a community of support and innovation.
                    Together, we turn ideas into reality and dreams into achievements.
                </p>
            </div>

            {/* Call-to-Action */}
            <div className="text-center mt-12">
                <button className="bg-indigo-500 text-white py-3 px-8 rounded-full shadow-md hover:bg-indigo-600 transition duration-300">
                    Explore Campaigns
                </button>
            </div>
        </div>
    );
};

export default About;
