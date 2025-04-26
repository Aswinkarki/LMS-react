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

// routes/index.tsx (or whatever your routes file is named)

// import { createBrowserRouter, Navigate } from 'react-router-dom';
// import ProtectedRoute from './components/ProtectedRoute';
// import PublicRoute from './components/PublicRoute';
// import Transaction from './components/transaction/Transaction';
// import { dashboardLoader } from './loaders/dashboardLoader';
// import Author from './pages/Author';
// import Book from './pages/Book';
// import DashboardHome from './pages/DashboardHome';
// import IssueBook from './pages/IssueBook';
// import Student from './pages/Students';
// import Login from './pages/Login';

// const router = createBrowserRouter([
//   {
//     path: '/login',
//     element: (
//       <PublicRoute />
//     ),
//     children: [{ index: true, element: <Login /> }],
//   },
//   {
//     path: '/dashboard',
//     element: (
//       <ProtectedRoute />
//     ),
//     children: [
//       {
//         index: true,
//         element: <DashboardHome />,
//         loader: dashboardLoader,
//       },
//       { path: 'author', element: <Author /> },
//       { path: 'books', element: <Book /> },
//       { path: 'students', element: <Student /> },
//       { path: 'transaction', element: <Transaction /> },
//       { path: 'issuing', element: <IssueBook /> },
//     ],
//   },
//   {
//     path: '*',
//     element: <Navigate to="/login" replace />,
//   },
// ]);

// // Export the router so it can be used in App.tsx
// export default router;
