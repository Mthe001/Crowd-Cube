import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(AuthContext);

    const [userPhotoUrl, setUserPhotoUrl] = useState('');
    const defaultPhotoUrl = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

    useEffect(() => {
        setUserPhotoUrl(user?.photoURL || defaultPhotoUrl);
    }, [user]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-lg w-full bg-gray-400 dark:bg-black p-8 rounded-3xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-xl">
                {user ? (
                    <div className="text-center">
                        {/* User Avatar */}
                        <div className="relative group">
                            <img
                                src={userPhotoUrl}
                                alt="User Avatar"
                                className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-white shadow-lg transform transition duration-300 group-hover:scale-110"
                            />

                        </div>

                        {/* User Details */}
                        <h2 className="text-4xl font-bold dark:text-white text-gray-800 mb-2">{user.displayName || 'User'}</h2>
                        <p className="text-gray-500 dark:text-gray-300 text-lg mb-4">
                            Email: <span className="font-medium text-gray-800 dark:text-white">{user.email}</span>
                        </p>
                        {user.phoneNumber && (
                            <p className="text-gray-500 dark:text-gray-300 text-lg mb-4">
                                Phone: <span className="font-medium text-gray-800 dark:text-white">{user.phoneNumber}</span>
                            </p>
                        )}
                        <p className="text-gray-500 dark:text-gray-300 text-lg">
                            UID: <span className="font-medium text-gray-800 dark:text-white">{user.uid}</span>
                        </p>
                    </div>
                ) : (
                    <div className="text-center text-white">
                        <p className="text-2xl font-semibold mb-4">You are not logged in.</p>
                        <Link
                            to="/login"
                            className="text-lg bg-white text-indigo-500 px-6 py-2 rounded-full shadow-md hover:bg-indigo-100 transition duration-300"
                        >
                            Login Now
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
