import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "react";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

// import { Navigate, useLocation, Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { TokenService } from "../token/TokenService";
// import { isTokenExpired } from "../token/isTokenExpired";
// import { AuthService } from "../token/AuthService";
// import LoadingSpinner from "./LoadingSpinner";

// const PrivateRoute = () => {
//   const [isChecking, setIsChecking] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const accessToken = TokenService.getAccessToken();
//         if (accessToken && isTokenExpired(accessToken)) {
//           await AuthService.silentRefresh();
//         }
//         setIsAuthenticated(!!TokenService.getAccessToken());
//       } catch (error) {
//         console.error('Token validation failed:', error);
//         setIsAuthenticated(false);
//       } finally {
//         setIsChecking(false);
//       }
//     };

//     verifyToken();
//   }, []); // Empty dependency array so the effect runs only once when the component mounts

//   if (isChecking) return <LoadingSpinner />; // Show spinner while checking token status

//   if (!isAuthenticated) {
//     // If not authenticated, redirect to login page
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   // Render the protected content (Outlet) if authenticated
//   return <Outlet />;
// };

// export default PrivateRoute;
