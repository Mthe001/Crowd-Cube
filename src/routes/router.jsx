import React from 'react';
import { createBrowserRouter } from 'react-router';

import ErrorPage from '../pages/ErrorPage'; // Import the ErrorPage component
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import AddCampaign from '../pages/AddCampaign'; // Import AddCampaign component
import MyCampaigns from '../pages/MyCampaigns'; // Import MyCampaigns component
import MyDonations from '../pages/MyDonations'; // Import MyDonations component
import PrivateRoutes from './PrivateRoutes'; // Wrapper for private routes
import AllCampaigns from '../pages/AllCampaigns';
import HomeLayout from '../layouts/HomeLayout'; // Import the HomeLayout
import AuthLayout from '../layouts/AuthLayout'; // Import the AuthLayout
import UpdateProfile from '../pages/UpdatePorfile';
import Home from '../components/Home';
import CampaignDetails from '../card/CampaignDetails';


const router = createBrowserRouter([


    // Main Routes with HomeLayout (Profile, Settings, Campaigns)
    {
        path: "/",
        element: <HomeLayout />, // HomeLayout for main content
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "settings",
                element: <UpdateProfile />,
            },
            {
                path: "campaigns",
                element: <AllCampaigns />,
                loader: () => fetch('http://localhost:5000/campaigns')
            },

            {
                path: '/campaign/:id',
                element: <CampaignDetails />,

            },


            // Private Routes under HomeLayout
            {
                path: "add-campaign",
                element: (
                    <PrivateRoutes>
                        <AddCampaign />
                    </PrivateRoutes>
                ),
            },
            {
                path: "my-campaigns",
                element: (
                    <PrivateRoutes>
                        <MyCampaigns />
                    </PrivateRoutes>
                ),
            },
            {
                path: "my-donations",
                element: (
                    <PrivateRoutes>
                        <MyDonations />
                    </PrivateRoutes>
                ),
            },
        ],
    },

    // Public Routes with AuthLayout (Login, Register)
    {
        path: "/auth",
        element: <AuthLayout />, // AuthLayout for login/register
        children: [
            {
                path: "/auth/login",
                element: <Login />,
            },
            {
                path: "/auth/register",
                element: <Register />,
            },
        ],
    },


    // Catch-All Route for 404
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

export default router;
