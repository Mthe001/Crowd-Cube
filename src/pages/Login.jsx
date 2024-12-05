import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FaArrowLeft, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Login = () => {
    const {
        signInWithGoogle,
        signInWithFacebook,
        signInWithGithub,
        loginWithEmailPassword,
        user,
        resetPassword,
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [isResettingPassword, setIsResettingPassword] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await signInWithGoogle();
            const user = userCredential.user;

            // Extract relevant user information
            const userData = {
                uid: user.uid,
                name: user.displayName || 'Anonymous User',
                email: user.email,
                photoURL: user.photoURL,
            };

            // Save user data to the database
            await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            toast.success('Logged in with Google!');
            navigate('/');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            toast.error('Google sign-in failed.');
        }
    };

    // Similarly for Facebook and GitHub
    const handleFacebookSignIn = async () => {
        try {
            const userCredential = await signInWithFacebook();
            const user = userCredential.user;

            const userData = {
                uid: user.uid,
                name: user.displayName || 'Anonymous User',
                email: user.email,
                photoURL: user.photoURL,
            };

            await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            toast.success('Logged in with Facebook!');
            navigate('/');
        } catch (error) {
            console.error('Facebook Sign-In Error:', error);
            toast.error('Facebook sign-in failed.');
        }
    };

    const handleGithubSignIn = async () => {
        try {
            const userCredential = await signInWithGithub();
            const user = userCredential.user;

            const userData = {
                uid: user.uid,
                name: user.displayName || 'Anonymous User',
                email: user.email,
                photoURL: user.photoURL,
            };

            await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            toast.success('Logged in with GitHub!');
            navigate('/');
        } catch (error) {
            console.error('GitHub Sign-In Error:', error);
            toast.error('GitHub sign-in failed.');
        }
    };


    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await loginWithEmailPassword(email, password);
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            console.error('Email Login Error:', error);
            toast.error('Email login failed. Please check your credentials.');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(resetEmail);
            toast.success('Password reset email sent!');
            setIsResettingPassword(false);
        } catch (error) {
            console.error('Password Reset Error:', error);
            toast.error('Failed to send reset email. Please try again.');
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
        <div className="w-full mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white dark:bg-black">
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

                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full bg-slate-200 dark:bg-black"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-14  right-3 flex items-center text-gray-500 dark:text-gray-400"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
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
                    className="btn hover:border-1 hover:duration-300 hover:ease-in-out hover:border-white transition-all w-full mt-4 dark:bg-black bg-gray-100 dark:text-white text-black"
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

            {/* Register link */}
            <p className="text-center mt-6">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-blue-500">
                    Register here
                </Link>
            </p>

            {/* Social login buttons */}
            {!isResettingPassword && (
                <div className="mt-6 flex justify-around gap-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline btn-secondary flex items-center justify-center w-12 h-12 rounded-full"
                    >
                        <FaGoogle className="text-xl" />
                    </button>
                    <button
                        onClick={handleFacebookSignIn}
                        className="btn btn-outline btn-primary flex items-center justify-center w-12 h-12 rounded-full"
                    >
                        <FaFacebook className="text-xl" />
                    </button>
                    <button
                        onClick={handleGithubSignIn}
                        className="btn btn-outline dark:bg-black flex items-center justify-center w-12 h-12 rounded-full"
                    >
                        <FaGithub className="text-xl" />
                    </button>
                </div>
            )}

            {/* ToastContainer */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Login;
