import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../pages/Loading'; // Assuming Loading is your custom loading component

const PrivateRoutes = () => {
    const { user, loading } = useContext(AuthContext); // Ensure loading is provided by AuthContext

    // Show the loading component while authentication is in progress
    if (loading) {
        return <Loading />;
    }

    // Redirect to login if the user is not authenticated
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    // Render child routes if the user is authenticated
    return <Outlet />;
};

export default PrivateRoutes;
