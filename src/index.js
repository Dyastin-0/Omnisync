import React from 'react';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './contexts/auth/auth';

import SignIn from './views/sign-in';
import SignUp from './views/sign-up';
import Panel from './views/panel';

import { SettingsProvider } from './contexts/settings/settings';
import { DataProvider } from './contexts/data/data';
import { NavBar } from './components/nav-bar/nav-bar';

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
    path: '/panel',
    element: <Panel />
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