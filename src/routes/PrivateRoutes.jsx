
import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../pages/Loading';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (user && user.email) {
        return children;  // If user is authenticated, render the children components
    }

    // If not authenticated, redirect to login and preserve the location they tried to access
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;
