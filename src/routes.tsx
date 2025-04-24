// import { Routes, Route, Navigate } from "react-router-dom";
// import DashboardLayout from "./components/Dashboard";
// import Login from "./pages/Login";
// import DashboardHome from "./pages/DashboardHome";
// import Author from "./pages/Author";
// import Book from "./pages/Book";
// import Student from "./pages/Students";
// import Transaction from "./components/transaction/Transaction";
// import IssueBook from "./pages/IssueBook";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PublicRoute from "./components/PublicRoute";
// import { dashboardLoader } from "./loaders/dashboardLoader";

// const AppRoutes = () => (
//   <Routes>
//     <Route
//       path="/login"
//       element={
//         <PublicRoute>
//           <Login />
//         </PublicRoute>
//       }
//     />
//     <Route
//       path="/dashboard"
//       element={
//         <ProtectedRoute>
//           <DashboardLayout />
//         </ProtectedRoute>
//       }
//     >
//       <Route index element={<DashboardHome />} loader={dashboardLoader} />
//       <Route path="author" element={<Author />} />
//       <Route path="books" element={<Book />} />
//       <Route path="students" element={<Student />} />
//       <Route path="transaction" element={<Transaction />} />
//       <Route path="issuing" element={<IssueBook />} />
//     </Route>
//     <Route path="*" element={<Navigate to="/login" replace />} />
//   </Routes>
// );

// export default AppRoutes;


import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import DashboardLayout from './components/Dashboard';
import Login from './pages/Login';
import DashboardHome from './pages/DashboardHome';
import Author from './pages/Author';
import Book from './pages/Book';
import Student from './pages/Students';
import Transaction from './components/transaction/Transaction';
import IssueBook from './pages/IssueBook';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { dashboardLoader } from './loaders/dashboardLoader';

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
        loader: dashboardLoader,
      },
      {
        path: 'author',
        element: <Author />,
      },
      {
        path: 'books',
        element: <Book />,
      },
      {
        path: 'students',
        element: <Student />,
      },
      {
        path: 'transaction',
        element: <Transaction />,
      },
      {
        path: 'issuing',
        element: <IssueBook />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;