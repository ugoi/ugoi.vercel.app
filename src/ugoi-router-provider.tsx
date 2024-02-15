import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar/ResponsiveAppBar";
import routes from "./routesConfig";

// Defione navbar component with outlet
const Root: React.FC = () => {
  return (
    <>
      <ResponsiveAppBar data-testid="responsive-app-bar" routes={routes} />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

// Define the router configuration inside the component or outside if it's static and won't change
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <div data-testid="home">Home</div>,
      },
      {
        path: "about",
        element: <div data-testid="about">About</div>,
      },
      {
        path: "chat",
        element: <div data-testid="chat">Chat</div>,
      },
      {
        path: "portfolio",
        element: <div data-testid="portfolio">Portfolio</div>,
      },
    ],
  },
  // Add more routes as needed
]);

export const UgoiRouterProvider: React.FC = () => {
  return <RouterProvider router={router} />;
};
