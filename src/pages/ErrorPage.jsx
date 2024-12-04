import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ErrorPage = () => {
    return (
        <div>
            <Navbar />


            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
                <div className="text-center px-6 sm:px-10">
                    {/* Error Illustration */}
                    <div className="flex justify-center mb-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-36 h-36 text-red-500 dark:text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m2-4h.01M12 6.5c-3.037 0-5.5 2.463-5.5 5.5s2.463 5.5 5.5 5.5 5.5-2.463 5.5-5.5-2.463-5.5-5.5-5.5zm0 8.5a3 3 0 100-6 3 3 0 000 6z"
                            />
                        </svg>
                    </div>

                    {/* Error Message */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white mb-4">
                        404 Not Found
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6">
                        Oops! The page you’re looking for doesn’t exist or has been moved.
                    </p>

                    {/* Action Button */}
                    <Link
                        to="/"
                        className="inline-block bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 dark:bg-red-400 dark:hover:bg-red-500"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>


            <Footer />
        </div>
    );
};

export default ErrorPage;
