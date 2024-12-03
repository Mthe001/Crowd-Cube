import React, { useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const { signUpWithEmailPassword, updateUserProfile } = useContext(AuthContext); // Accessing the signUp function
    const navigate = useNavigate();

    // State for form inputs
    const [name, setName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Password visibility toggle
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Password validation function
    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!hasLowerCase) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!hasNumber) {
            return "Password must contain at least one number.";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character.";
        }
        return null; // Password is valid
    };

    // Handle form submission
    const handleRegister = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        // Validate password
        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        try {
            // Call the signUpWithEmailPassword method from AuthContext
            const userCredential = await signUpWithEmailPassword(email, password);

            // Update the user's profile with the name and photo URL
            await updateUserProfile(name, photoUrl);

            toast.success('Registration successful!');
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Registration Error:', error);
            toast.error(error.message || 'Registration failed!');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white dark:bg-black">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <ToastContainer /> {/* Toast Container for showing toast alerts */}

            <form onSubmit={handleRegister} className="space-y-4">
                {/* Name Field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full bg-zinc-200 dark:bg-black"
                        required
                    />
                </div>

                {/* Photo URL Field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input
                        type="url"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        className="input input-bordered w-full bg-zinc-200 dark:bg-black"
                    />
                </div>

                {/* Email Field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full bg-zinc-200 dark:bg-black"
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full bg-zinc-200 dark:bg-black"
                        required
                    />
                    <button
                        type="button"
                        className="absolute top-10 right-4"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {/* Confirm Password Field */}
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input input-bordered w-full bg-zinc-200 dark:bg-black"
                        required
                    />
                    <button
                        type="button"
                        className="absolute top-10 right-4"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full mt-4">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;
