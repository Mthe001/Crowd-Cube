import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../provider/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <div className={`app-container min-h-screen flex flex-col ${theme === 'dark' ? 'bg-base-900 text-white' : 'bg-white text-gray-900'}`}>
            <Navbar />
            <main className="flex-grow w-11/12 mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default HomeLayout;
