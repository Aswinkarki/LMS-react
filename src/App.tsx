import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "../src/components/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Author from './pages/Author'
import {  Students, Transaction, Issuing } from "./pages/PlaceholderComponents";
import { useAuth } from "./context/AuthContext";
import { JSX } from "react";
import Book from "./pages/Book";

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  return (
   
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="author" element={<Author />} />
            <Route path="books" element={<Book />} />
            <Route path="students" element={<Students />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="issuing" element={<Issuing />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
 
  );
};

export default App;