import React from 'react';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './contexts/auth/auth';

import SignIn from './views/sign-in';
import Panel from './views/panel';
import { SettingsProvider } from './contexts/settings/settings';

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
    path: '/panel',
    element: <Panel />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SettingsProvider>
    <AuthProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
   </AuthProvider>
  </SettingsProvider>
);