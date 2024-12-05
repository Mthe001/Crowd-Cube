import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../pages/Loading';

const PrivateRoutes = () => {
    const { user, loading } = useContext(AuthContext);


    if (loading) {
        return <Loading />;
    }


    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }


    return <Outlet />;
};

export default PrivateRoutes;
