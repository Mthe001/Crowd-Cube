
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { ThemeContext } from '../provider/AuthProvider';
import { FaRegSun, FaRegMoon, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logout();
            toast.success('Logout successful');
            navigate('/auth/login');
        } catch (error) {
            toast.error('Error during logout');
            console.error('Logout error:', error);
        }
    };

    const defaultPhotoUrl = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
    const userPhotoUrl = user?.photoURL || defaultPhotoUrl;

    return (
        <div>
            <div className={`navbar ${theme === 'light' ? 'bg-white' : 'bg-base-900'} shadow`}>
                {/* Mobile/Tablet Hamburger Menu */}
                <div className="navbar-start lg:hidden">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/campaigns"
                                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                                >
                                    All Campaigns
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/add-campaign"
                                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                                >
                                    Add New Campaign
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/my-campaigns"
                                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                                >
                                    My Campaigns
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/my-donations"
                                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                                >
                                    My Donations
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Logo */}
                <div className="navbar-start">
                    <NavLink to="/" className="btn btn-ghost text-xl">
                        CrowdCube
                    </NavLink>
                </div>

                {/* Navbar Center (Desktop Version) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/campaigns"
                                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                            >
                                All Campaigns
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/add-campaign"
                                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                            >
                                Add New Campaign
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/my-campaigns"
                                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                            >
                                My Campaigns
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/my-donations"
                                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                            >
                                My Donations
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Navbar End */}
                <div className="navbar-end flex items-center gap-4">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn-sm btn-ghost hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out max-[1020px]:hidden max-[1025px]:visible"
                    >
                        {theme === 'light' ? <FaRegMoon className="text-xl" /> : <FaRegSun className="text-xl" />}
                    </button>

                    {/* User Authentication Links */}
                    {!user ? (
                        <div className="flex gap-4">
                            <NavLink to="/auth/login" className="btn btn-sm btn-ghost flex items-center gap-2">
                                <FaSignInAlt />
                                Login
                            </NavLink>
                            <NavLink to="/auth/register" className="btn btn-sm btn-ghost flex items-center gap-2">
                                <FaUserPlus />
                                Register
                            </NavLink>
                        </div>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="User Avatar" src={userPhotoUrl} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-zinc-500 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                                    >
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/settings"
                                        className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                                    >
                                        Settings
                                    </NavLink>
                                </li>
                                <li>
                                    <button onClick={handleLogOut}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
