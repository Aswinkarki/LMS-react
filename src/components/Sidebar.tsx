// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Settings, User, BookOpen, Users, BarChart2, FileText, LogOut } from 'lucide-react';

// const Sidebar = () => {
//   return (
//     <div className="h-screen w-[150px] bg-[#1B4965] text-white flex flex-col">
//       {/* Logo/Header */}
//       <div className="p-4 text-center border-b border-[#1B4965]/30">
//         <h1 className="font-bold text-xl">HSMSS</h1>
//         <h2 className="font-bold text-lg">LIBRARY</h2>
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex-1">
//         <NavLink 
//           to="/dashboard/setting" 
//           className={({ isActive }) => 
//             `flex items-center p-4 hover:bg-[#1B4965]/80 ${isActive ? 'bg-[#1B4965]/80' : ''}`
//           }
//         >
//           <Settings className="w-5 h-5 mr-3" />
//           <span>Setting</span>
//         </NavLink>
        
//         <NavLink 
//           to="/dashboard/author" 
//           className={({ isActive }) => 
//             `flex items-center p-4 hover:bg-[#1B4965]/80 ${isActive ? 'bg-[#1B4965]/80' : ''}`
//           }
//         >
//           <User className="w-5 h-5 mr-3" />
//           <span>Author</span>
//         </NavLink>
        
//         <NavLink 
//           to="/dashboard/books" 
//           className={({ isActive }) => 
//             `flex items-center p-4 hover:bg-[#1B4965]/80 ${isActive ? 'bg-[#1B4965]/80' : ''}`
//           }
//         >
//           <BookOpen className="w-5 h-5 mr-3" />
//           <span>Books</span>
//         </NavLink>
        
//         <NavLink 
//           to="/dashboard/students" 
//           className={({ isActive }) => 
//             `flex items-center p-4 hover:bg-[#1B4965]/80 ${isActive ? 'bg-[#1B4965]/80' : ''}`
//           }
//         >
//           <Users className="w-5 h-5 mr-3" />
//           <span>Students</span>
//         </NavLink>
        
//         <NavLink 
//           to="/dashboard/transactions" 
//           className={({ isActive }) => 
//             `flex items-center p-4 hover:bg-[#1B4965]/80 ${isActive ? 'bg-[#1B4965]/80' : ''}`
//           }
//         >
//           <BarChart2 className="w-5 h-5 mr-3" />
//           <span>Transaction</span>
//         </NavLink>
        
//         <NavLink 
//           to="/dashboard/issuing" 
//           className={({ isActive }) => 
//             `flex items-center p-4 hover:bg-[#1B4965]/80 ${isActive ? 'bg-[#1B4965]/80' : ''}`
//           }
//         >
//           <FileText className="w-5 h-5 mr-3" />
//           <span>Issuing</span>
//         </NavLink>
//       </nav>

//       {/* Logout Button */}
//       <button 
//         onClick={() => {
//           // Clear tokens
//           localStorage.removeItem("accessToken");
//           localStorage.removeItem("refreshToken");
//           // Redirect to login
//           window.location.href = "/";
//         }}
//         className="flex items-center p-4 hover:bg-[#1B4965]/80 border-t border-[#1B4965]/30"
//       >
//         <LogOut className="w-5 h-5 mr-3" />
//         <span>Log Out</span>
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
