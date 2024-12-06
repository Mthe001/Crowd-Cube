import React from 'react';
import { createBrowserRouter } from 'react-router';

import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import AddCampaign from '../pages/AddCampaign';
import MyCampaigns from '../pages/MyCampaigns';
import MyDonations from '../pages/MyDonations';
import PrivateRoutes from './PrivateRoutes';
import AllCampaigns from '../pages/AllCampaigns';
import HomeLayout from '../layouts/HomeLayout';
import AuthLayout from '../layouts/AuthLayout';
import UpdateProfile from '../pages/UpdatePorfile';
import Home from '../components/Home';
import CampaignDetails from '../card/CampaignDetails';
import AllCampaignDetails from '../card/AllCampaignDetails';
import UpdateMyCampaign from '../components/UpdateMyCampaign';
import Faq from '../components/Faq';
import TermsOfCondition from '../pages/TermsOfCondition';
import PrivacyPolicy from '../pages/PrivacyPolicy';


const router = createBrowserRouter([



    {
        path: "/",
        element: <HomeLayout />,
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
                path: '/running-campaigns/:id',
                element: <CampaignDetails />,

            },
            {
                path: '/campaigns/:id',
                element: <AllCampaignDetails />,
            },
            {
                path: '/updateCampaign/:id',
                element: <UpdateMyCampaign />,
            },
            {
                path: '/faq',
                element: <Faq />,
            },
            {
                path: '/terms',
                element: <TermsOfCondition />,
            },

            {
                path: '/privacy',
                element: <PrivacyPolicy />,
            },
            {
                path: '/copyright-warning',
                element: <CopyRight />,
            },

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


    {
        path: "/auth",
        element: <AuthLayout />,
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



    {
        path: "*",
        element: <ErrorPage />,
    },
]);

export default router;
