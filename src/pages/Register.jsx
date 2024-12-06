import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

const Register = () => {
    const { signUpWithEmailPassword, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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
        return null;
    };

    const handleRegister = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        // Registration process with photoUrl and name
        signUpWithEmailPassword(email, password)
            .then((result) => {
                const user = result.user;

                const createdAt = result?.user?.metadata?.creationTime;

                console.log(result.user);

                const newUser = { name, email, photoUrl, createdAt }
                //save user in database

                fetch('https://assignment-10-server-kappa-steel.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('user created to db', data)
                    })

                // Update user profile with name and photo URL
                updateUserProfile(name, photoUrl)
                    .then(() => {
                        console.log('User profile updated successfully');
                        toast.success('Registration successful!');
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error('Error updating profile:', error);
                        toast.error('Failed to set profile!');
                    });
            })
            .catch((error) => {
                console.error('Registration Error:', error);
                toast.error(error.message || 'Registration failed!');
            });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white dark:bg-black">
            <button
                onClick={() => navigate('/')}
                className="flex items-center mb-4 text-gray-600 hover:text-black dark:hover:text-white"
            >
                <FaArrowLeft className="mr-2" /> Back
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            <ToastContainer />

            <form onSubmit={handleRegister} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full bg-zinc-200 dark:bg-black"
                        required
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input
                        type="url"
                        name="photoUrl"
                        className="input input-bordered w-full bg-zinc-200 dark:bg-black"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="input input-bordered w-full bg-zinc-200 dark:bg-black"
                        required
                    />
                </div>

                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
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

                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
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

                <button type="submit" className="btn btn-primary w-full mt-4">Sign Up</button>
            </form>

            <p className="text-center mt-6">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-blue-500">
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default Register;
