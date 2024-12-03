import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <Navbar />

            <main className="auth-main">
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
