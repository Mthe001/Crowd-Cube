import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FaArrowLeft } from 'react-icons/fa';
import { FaGoogle, FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
    const {
        signInWithGoogle,
        signInWithFacebook,
        signInWithGithub,
        signInWithTwitter,
        loginWithEmailPassword,
        user,
        resetPassword
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [isResettingPassword, setIsResettingPassword] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate('/');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            setError('Google sign-in failed.');
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            await signInWithFacebook();
            navigate('/');
        } catch (error) {
            console.error('Facebook Sign-In Error:', error);
            setError('Facebook sign-in failed.');
        }
    };

    const handleGithubSignIn = async () => {
        try {
            await signInWithGithub();
            navigate('/');
        } catch (error) {
            console.error('GitHub Sign-In Error:', error);
            setError('GitHub sign-in failed.');
        }
    };

    const handleTwitterSignIn = async () => {
        try {
            await signInWithTwitter();
            navigate('/');
        } catch (error) {
            console.error('Twitter Sign-In Error:', error);
            setError('Twitter sign-in failed.');
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await loginWithEmailPassword(email, password);
            navigate('/');
        } catch (error) {
            console.error('Email Login Error:', error);
            setError('Email login failed.');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(resetEmail);
            toast.success('Password reset email sent!');
            setIsResettingPassword(false); // Close the reset password form
        } catch (error) {
            console.error('Password Reset Error:', error);
            setError('Failed to send reset email. Please try again.');
        }
    };

    if (user) {
        const photoURL = user.photoURL || 'https://www.example.com/fallback-image.jpg';
        return (
            <div className="text-center">
                <img
                    src={photoURL}
                    alt={user.displayName || 'User'}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <p>Welcome, {user.displayName || 'User'}</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white dark:bg-black">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => navigate(-1)} className="btn btn-ghost">
                    <FaArrowLeft className="text-xl" />
                </button>
            </div>

            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Email/password login form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full bg-slate-200 dark:bg-black"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full bg-slate-200 dark:bg-black"
                        required
                    />
                </div>

                <div className="text-right">
                    <button
                        type="button"
                        onClick={() => setIsResettingPassword(true)}
                        className="text-blue-500 text-sm"
                    >
                        Forgot Password?
                    </button>
                </div>


                <button
                    type="submit"
                    className="btn hover:border-1 hover:duration-300 hover:ease-in-out hover:border-white transition-all w-full mt-4  dark:bg-black bg-gray-100 dark:text-white  text-black"
                >
                    Login
                </button>


            </form>

            {/* Forgot Password Modal or Form */}
            {isResettingPassword && (
                <div className="mt-4">
                    <h3 className="text-xl text-center mb-4">Reset Your Password</h3>
                    <form onSubmit={handlePasswordReset}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Enter your email</span>
                            </label>
                            <input
                                type="email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            Send Reset Email
                        </button>
                    </form>
                    <div className="mt-2">
                        <button
                            onClick={() => setIsResettingPassword(false)}
                            className="text-blue-500"
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            )}

            {/* Social login buttons */}
            {!isResettingPassword && (
                <div className="mt-6 space-y-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline w-full btn-secondary flex items-center justify-center"
                    >
                        <FaGoogle className="mr-2 text-xl" />
                        Login with Google
                    </button>
                    <button
                        onClick={handleFacebookSignIn}
                        className="btn btn-outline w-full btn-primary flex items-center dark:text-black justify-center"
                    >
                        <FaFacebook className="mr-2 text-xl" />
                        Login with Facebook
                    </button>

                    <button
                        onClick={handleGithubSignIn}
                        className="btn btn-outline w-full dark:bg-black  flex items-center justify-center"
                    >
                        <FaGithub className="mr-2 text-xl" />
                        Login with GitHub
                    </button>

                </div>
            )}
        </div>
    );
};

export default Login;
