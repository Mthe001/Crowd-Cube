import React from 'react';
import { Link } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';

const About = () => {
    return (
        <div id='about' className="bg-white dark:bg-zinc-950 py-16 px-6 rounded-lg">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                    <Typewriter
                        words={['About Our Crowdfunding Platform']}
                        loop={2}
                        cursor
                        cursorStyle="_"
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Empowering dreams and ideas, one contribution at a time.
                </p>
            </div>

            {/* Card Section */}
            <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Card 1 */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Personal Needs
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Raise funds for medical expenses, education costs, or emergency support. Every contribution
                        makes a meaningful difference.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Creative Ideas
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Fund your artistic dreams, whether it’s a film, a book, or the next big app idea. Let creativity
                        soar with the help of our community.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Startups and Innovation
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Turn your entrepreneurial vision into reality by connecting with supporters who believe in your
                        groundbreaking ideas.
                    </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Community Impact
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Launch initiatives that bring people together, solve challenges, and create positive change in
                        your community.
                    </p>
                </div>

                {/* Card 5 */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Environmental Projects
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Support eco-friendly projects aimed at preserving our planet, from clean energy solutions to
                        tree-planting campaigns.
                    </p>
                </div>

                {/* Card 6 */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Technology Advancements
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Back cutting-edge technologies and innovations that aim to solve global challenges and improve
                        lives.
                    </p>
                </div>
            </div>

            {/* Call-to-Action */}
            <div className="text-center mt-12">
                <Link to='/campaigns' className=' bg-zinc-700 hover:bg-zinc-500 text-white py-3 px-8 rounded-full shadow-md transform hover:scale-105 transition duration-300'>
                    Explore Campaigns
                </Link>


            </div>
        </div >
    );
};

export default About;
