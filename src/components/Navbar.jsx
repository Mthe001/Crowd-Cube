import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { ThemeContext } from '../provider/AuthProvider';
import { FaRegSun, FaRegMoon, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loading from '../pages/Loading';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleLogOut = async () => {
        setIsLoading(true); // Show loading during logout
        try {
            await logout();
            toast.success('Logout successful');
            navigate('/auth/login');
        } catch (error) {
            toast.error('Error during logout');
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const defaultPhotoUrl = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
    const userPhotoUrl = user?.photoURL || defaultPhotoUrl;

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="w-11/12 mx-auto">
            <div className={`navbar ${theme === 'light' ? 'bg-white' : 'bg-base-900'}`}>
                {/* Mobile/Tablet Hamburger Menu */}
                <div className="navbar-start lg:hidden">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden text-orange-500">
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
                            className="menu menu-sm dropdown-content bg-zinc-100 text-orange-500 dark:bg-zinc-900 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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

                            {/* Theme Toggle Button in Dropdown */}
                            <li>
                                <button
                                    onClick={toggleTheme}
                                    className="btn btn-ghost flex items-center gap-2 w-full"
                                >
                                    {theme === 'light' ? <FaRegMoon className="text-xl" /> : <FaRegSun className="text-xl" />}
                                    Toggle Theme
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Main Logo */}
                    <div className="navbar-start">
                        <NavLink to="/" className="btn btn-ghost lg:mx-0 text-xl">
                            CrowdCube
                        </NavLink>
                    </div>
                </div>

                {/* Main Logo */}
                <div className="navbar-start max-[1023px]:hidden max-[1024px]:visible">
                    <NavLink to="/" className="btn btn-ghost lg:mx-0 text-xl">
                        CrowdCube
                    </NavLink>
                </div>

                {/* Navbar Center (Desktop Version) */}
                <div className="navbar-center hidden lg:flex font-semibold">
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
                    {/* Desktop Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn-sm btn-ghost hover:bg-gray-200 dark:hover:bg-zinc-900 transition duration-300 ease-in-out max-[1020px]:hidden max-[1025px]:visible"
                    >
                        {theme === 'light' ? <FaRegMoon className="text-xl" /> : <FaRegSun className="text-xl" />}
                    </button>

                    {/* User Authentication Links */}
                    {!user ? (
                        <div className="flex gap-4">
                            <NavLink to="/auth/login" className="btn btn-sm btn-ghost flex items-center gap-2">
                                <FaSignInAlt />
                            </NavLink>
                            <NavLink to="/auth/register" className="btn btn-sm btn-ghost flex items-center gap-2">
                                <FaUserPlus />
                            </NavLink>
                        </div>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle hover:dark:bg-zinc-950 avatar tooltip tooltip-bottom"
                                data-tip={user?.displayName || "No Display Name"}
                            >
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
