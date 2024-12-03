
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThemeContext } from '../provider/AuthProvider';  // Import ThemeContext

const AuthLayout = () => {
    // Get the current theme from ThemeContext
    const { theme } = useContext(ThemeContext);

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

