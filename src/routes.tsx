import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/Dashboard";
import Login from "./pages/Login";
import DashboardHome from "./pages/DashboardHome";
import Author from "./pages/Author";
import Book from "./pages/Book";
import Student from "./pages/Students";
import Transaction from "./components/transaction/Transaction";
import IssueBook from "./pages/IssueBook";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<DashboardHome />} />
      <Route path="author" element={<Author />} />
      <Route path="books" element={<Book />} />
      <Route path="students" element={<Student />} />
      <Route path="transaction" element={<Transaction />} />
      <Route path="issuing" element={<IssueBook />} />
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AppRoutes;