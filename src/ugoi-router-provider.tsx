import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import routes from "./routesConfig";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Portfolio from "./pages/Portfolio/Portfolio";
import Chat from "./pages/Chat/Chat";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login/Login";

// Add this new component
const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

// Modify the Root component to include ScrollToTop
const Root: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <ResponsiveAppBar data-testid="responsive-app-bar" routes={routes} />
      <div
        id="detail"
        style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <AuthProvider>
          <Outlet />
        </AuthProvider>
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
        element: <Chat />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  // Add more routes as needed
]);

export const UgoiRouterProvider: React.FC = () => {
  return <RouterProvider router={router} />;
};
