// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Outlet, NavLink, useLocation } from "react-router-dom";
// import { Book, User, Users, RepeatIcon, FileText, Settings, LogOut } from "lucide-react";
// import { useEffect } from "react";

// const Dashboard: React.FC = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//  useEffect(() => {
//   const handlePopState = () => {
//     if (user) {
//       // If user is authenticated, keep them in the dashboard
//       if (location.pathname !== "/dashboard") {
//         navigate("/dashboard", { replace: true });
//       }
//       // Push a new entry to prevent exiting the app
//       window.history.pushState(null, "", "/dashboard");
//     }
//   };

//   window.addEventListener("popstate", handlePopState);

//   return () => {
//     window.removeEventListener("popstate", handlePopState);
//   };
// }, [user, location.pathname, navigate]);

// // Prevent initial back navigation to login
// useEffect(() => {
//   if (user && (location.pathname === "/" || location.pathname === "/login")) {
//     navigate("/dashboard", { replace: true });
//     window.history.pushState(null, "", "/dashboard");
//   }
// }, [user, location.pathname, navigate]);
//   const handleLogout = () => {
//     logout();
//     navigate("/", { replace: true });
//   };

//   return (
//     <div className="flex h-screen w-full bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-[#1B4965] text-white flex flex-col">
//         <div className="p-6">
//           <h1 className="text-2xl font-bold">HSMSS LIBRARY</h1>
//         </div>

//         <nav className="flex-1">
//           <NavLink
//             to="/dashboard"
//             end
//             className={({ isActive }) =>
//               `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
//             }
//           >
//             <Settings className="mr-3 h-5 w-5" />
//             <span>Dashboard</span>
//           </NavLink>
          
//           <NavLink
//             to="/dashboard/author"
//             className={({ isActive }) =>
//               `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
//             }
//           >
//             <User className="mr-3 h-5 w-5" />
//             <span>Author</span>
//           </NavLink>
          
//           <NavLink
//             to="/dashboard/books"
//             className={({ isActive }) =>
//               `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
//             }
//           >
//             <Book className="mr-3 h-5 w-5" />
//             <span>Books</span>
//           </NavLink>
          
//           <NavLink
//             to="/dashboard/students"
//             className={({ isActive }) =>
//               `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
//             }
//           >
//             <Users className="mr-3 h-5 w-5" />
//             <span>Students</span>
//           </NavLink>
          
//           <NavLink
//             to="/dashboard/transaction"
//             className={({ isActive }) =>
//               `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
//             }
//           >
//             <RepeatIcon className="mr-3 h-5 w-5" />
//             <span>Transaction</span>
//           </NavLink>
          
//           <NavLink
//             to="/dashboard/issuing"
//             className={({ isActive }) =>
//               `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
//             }
//           >
//             <FileText className="mr-3 h-5 w-5" />
//             <span>Issuing</span>
//           </NavLink>
//         </nav>

//         <div className="p-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center p-3 w-full hover:bg-[#2C5F7C] rounded"
//           >
//             <LogOut className="mr-3 h-5 w-5" />
//             <span>Log Out</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-white p-4 shadow-sm flex justify-end">
//           <div className="flex items-center">
//             <User className="h-6 w-6 text-[#1B4965] mr-2" />
//             <div>
//               <div className="font-medium">{user?.username || "Admin Name"}</div>
//               <div className="text-xs text-gray-500">Admin</div>
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useAuth } from "../context/AuthContext";
import { useNavigate, Outlet, NavLink, useLocation } from "react-router-dom";
import { Book, User, Users, RepeatIcon, FileText, Settings, LogOut } from "lucide-react";
import { useEffect, useRef } from "react";

const Dashboard: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggingOut = useRef(false); // Flag to track logout intent
  const lastPath = useRef(location.pathname); // Track the last valid dashboard path

  // Prevent back navigation outside of dashboard while authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const handlePopState = (event: PopStateEvent) => {
      if (isAuthenticated && !isLoggingOut.current) {
        const currentPath = window.location.pathname;
        // Allow navigation within /dashboard/* routes
        if (currentPath.startsWith("/dashboard")) {
          lastPath.current = currentPath; // Update last valid path
        } else {
          // If navigating outside /dashboard/*, push back to last valid dashboard route
          window.history.pushState(null, "", lastPath.current);
          navigate(lastPath.current, { replace: true }); // Sync React Router
          event.preventDefault();
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isAuthenticated, navigate]);

  // Redirect to dashboard if authenticated and on root/login
  useEffect(() => {
    if (isAuthenticated && (location.pathname === "/" || location.pathname === "/login")) {
      navigate("/dashboard", { replace: true });
      lastPath.current = "/dashboard";
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Update lastPath when navigating within dashboard
  useEffect(() => {
    if (isAuthenticated && location.pathname.startsWith("/dashboard")) {
      lastPath.current = location.pathname;
    }
  }, [isAuthenticated, location.pathname]);

  const handleLogout = () => {
    isLoggingOut.current = true; // Set flag before logout
    logout();
    navigate("/login", { replace: true });
    setTimeout(() => {
      isLoggingOut.current = false; // Reset flag after navigation
    }, 0);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-[#1B4965] text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold">HSMSS LIBRARY</h1>
        </div>

        <nav className="flex-1">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <Settings className="mr-3 h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/dashboard/author"
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <User className="mr-3 h-5 w-5" />
            <span>Author</span>
          </NavLink>
          <NavLink
            to="/dashboard/books"
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <Book className="mr-3 h-5 w-5" />
            <span>Books</span>
          </NavLink>
          <NavLink
            to="/dashboard/students"
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <Users className="mr-3 h-5 w-5" />
            <span>Students</span>
          </NavLink>
          <NavLink
            to="/dashboard/transaction"
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <RepeatIcon className="mr-3 h-5 w-5" />
            <span>Transaction</span>
          </NavLink>
          <NavLink
            to="/dashboard/issuing"
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <FileText className="mr-3 h-5 w-5" />
            <span>Issuing</span>
          </NavLink>
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center p-3 w-full hover:bg-[#2C5F7C] rounded"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white p-4 shadow-sm flex justify-end">
          <div className="flex items-center">
            <User className="h-6 w-6 text-[#1B4965] mr-2" />
            <div>
              <div className="font-medium">{user?.username || "Admin Name"}</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;