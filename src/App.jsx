import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/NotFound";
import { useAuthStore } from "../Store/useAuthStore";
import { Spinner } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
// import Loader from "./Components/Loader";
// import ProtectedRoute from "./Components/ProtectedRoute";

// const Home = lazy(() => import("./Pages/Home"));
// const Login = lazy(() => import("./Pages/Login"));
// const Profile = lazy(() => import("./Pages/Profile"));


function Layout() {
  return (
    // <div className="d-flex flex-column min-vh-100">
    //   <Header />
    //   <main className="flex-grow-1">
    //     <Container fluid className="flex-grow-1">
    //       <Suspense fallback={<h1>Loading...</h1>}>
    //         <Outlet />
    //       </Suspense>
    //     </Container>
    //     <Toaster
    //       position="bottom-right"
    //       reverseOrder={false}
    //     />
    //   </main >
    // </div>
    <div className="min-vh-100 bg-light">
      <Outlet />
    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="d-flex flex-column gap-2 align-items-center justify-content-center min-vh-100">
        <Spinner animation="border" variant="primary" />
        <p className="fw-bold mb-0">Loading...</p>
      </div>
    );
  }

  return authUser ? children : <Navigate to="/login" replace />;
};

const AuthRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="d-flex flex-column gap-2 align-items-center justify-content-center min-vh-100">
        <Spinner animation="border" variant="primary" />
        <p className="fw-bold mb-0">Loading...</p>
      </div>
    );
  }

  return !authUser ? children : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthRoute>
            <Signup />
          </AuthRoute>
        ),
      },
      {
        path: "login",
        element: (
          <AuthRoute>
            <Login />
          </AuthRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  return (
    <RouterProvider router={router} />
  )
}

export default App
