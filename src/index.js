import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Root from './Root';
import HomePage from './Components/Pages/HomePage';
import LoginPage from './Components/Pages/LoginPage';
import ProfilePage, { loader as profilePageLoader } from './Components/Pages/ProfilePage';
import ErrorPage from './ErrorPage';
import reportWebVitals from './reportWebVitals';
import DiscussionPage, { loader as discussionPageLoader } from './Components/Pages/DiscussionPage';
import CreatePulsePage from './Components/Pages/CreatePulsePage';
import SignUpPage from './Components/Pages/SignUpPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/sign-up",
        element: <SignUpPage />
      },
      {
        path: "/profile/:username",
        element: <ProfilePage />,
        loader: profilePageLoader
      },
      {
        path: "/discussion/:pulseId",
        element: <DiscussionPage />,
        loader: discussionPageLoader
      },
      {
        path: "/pulses/new",
        element: <CreatePulsePage />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
