import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './views/sign-in';
import SignUp from './views/sign-up';
import Dashboard from './views/dashboard';

import { Layout } from './layout';

const App = () => {
	const [toastMessage, setToastMessage] = useState(null);
	const router = createBrowserRouter([
		{
			element: <Layout toastMessage={toastMessage} setToastMessage={setToastMessage} />,
			errorElement: <></>,
			children: [
				{
					path: '/',
					element: <SignIn setToastMessage={setToastMessage} />
				},
				{
					path: '/sign-in',
					element: <SignIn setToastMessage={setToastMessage} />
				},
				{
					path: 'sign-up',
					element: <SignUp setToastMessage={setToastMessage} />
				},
				{
					path: '/dashboard',
					element: <Dashboard />
				}
			]
		}
	]);

	return (
		<RouterProvider router={router} />
	)
}

export default App;
