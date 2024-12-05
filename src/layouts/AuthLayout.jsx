import React, { useContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThemeContext } from '../provider/AuthProvider'; // Import ThemeContext

const AuthLayout = () => {
    // Get the current theme from ThemeContext
    const { theme } = useContext(ThemeContext);

    // State to manage loading status
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => setLoading(false), 1000);

        return () => clearTimeout(timer); // Clean up the timer
    }, []);

    // Display a loading spinner or animation while loading
    if (loading) {
        return (
            <div className={`flex items-center justify-center h-screen ${theme === 'light' ? 'bg-white' : 'bg-base-900'}`}>
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
            </div>
        );
    }

    return (
        <div className={`auth-layout ${theme === 'light' ? 'bg-white' : 'bg-base-900'}`}>
            <Navbar />

            <main className={`auth-main ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                <div className="content">
                    {/* The authentication pages (login, register) will be rendered here */}
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AuthLayout;
