import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white">
            <div className="text-center">
                {/* Error Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-24 h-24 mx-auto mb-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6M12 18l6-6-6-6"
                    />
                </svg>

                {/* Error Message */}
                <h1 className="text-6xl font-extrabold mb-4">Oops!</h1>
                <p className="text-2xl mb-6">Something went wrong. The page you are looking for does not exist.</p>

                {/* Button to go back to Home */}
                <Link to="/" className="btn btn-primary px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
