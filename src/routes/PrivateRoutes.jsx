import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const PrivateRoutes = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // If the user is not logged in, redirect to the login page
        return <Navigate to="/auth/login" replace />;
    }

    // If the user is authenticated, render the child components
    return <Outlet />;
};

export default PrivateRoutes;
