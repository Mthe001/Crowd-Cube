import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const PrivateRoutes = () => {
    const { user } = useContext(AuthContext);

    if (!user) {

        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoutes;
