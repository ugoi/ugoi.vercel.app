import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import routes from "./routesConfig";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";

// Defione navbar component with outlet
const Root: React.FC = () => {
  return (
    <>
      <ResponsiveAppBar data-testid="responsive-app-bar" routes={routes} />
      <div id="detail" style={{ width: "100%" }}>
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
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "chat",
        element: <div data-testid="chat-page">Chat</div>,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
    ],
  },
  // Add more routes as needed
]);

export const UgoiRouterProvider: React.FC = () => {
  return <RouterProvider router={router} />;
};
