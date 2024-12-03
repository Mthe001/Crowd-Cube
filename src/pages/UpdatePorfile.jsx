import React, { useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom'; // to navigate after update
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Call updateUserProfile without passing email
            await updateUserProfile(displayName, photoURL);
            toast.success('Profile updated successfully!');
            navigate('/profile'); // Navigate to profile page after successful update
        } catch (error) {
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="max-w-lg w-full bg-white dark:bg-black p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-white">Update Your Profile</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label className="block text-lg mb-2 text-gray-800 dark:text-white" htmlFor="displayName">Display Name</label>
                        <input
                            type="text"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full p-3 border rounded-md bg-slate-300 dark:bg-black dark:text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg mb-2 text-gray-800 dark:text-white" htmlFor="photoURL">Profile Photo URL</label>
                        <input
                            type="text"
                            id="photoURL"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="w-full p-3 border rounded-md bg-slate-300 dark:bg-black dark:text-white"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white p-3 rounded-lg ${loading ? 'bg-blue-400' : 'hover:bg-blue-600'}`}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
