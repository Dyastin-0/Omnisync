import React from 'react';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './contexts/auth/auth';

import SignIn from './views/sign-in';
import SignUp from './views/sign-up';
import Dashboard from './views/dashboard';

import { SettingsProvider } from './contexts/settings/settings';
import { DataProvider } from './contexts/data/data';
import Manage from './views/manage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/sign-in',
    element: <SignIn />
  },
  {
    path: 'sign-up',
    element: <SignUp />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/panel/manage',
    element: <Manage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <DataProvider>
            <RouterProvider router={router} />
        </DataProvider> 
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>
);