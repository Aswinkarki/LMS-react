import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "react";

type PublicRouteProps = {
  children: JSX.Element;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
// src/components/PublicRoute.tsx
// import { Navigate, useLocation, Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { TokenService } from "../token/TokenService";
// import { isTokenExpired } from "../token/isTokenExpired";
// import { AuthService } from "../token/AuthService";
// import LoadingSpinner from "./LoadingSpinner";

// const PublicRoute = () => {
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
//   }, [location]);

//   if (isChecking) return <LoadingSpinner />;

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// };

// export default PublicRoute;
