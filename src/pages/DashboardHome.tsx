import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Book, Building } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type DashboardData = {
  total_student_count: number;
  total_book_count: number;
  total_transaction_count: number;
  total_borrowed_books: number;
  total_returned_books: number;
};

type OverdueBorrower = {
  borrowed_id: string;
  student_name: string;
};

const DashboardHome: React.FC = () => {
  const { logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    total_student_count: 0,
    total_book_count: 0,
    total_transaction_count: 0,
    total_borrowed_books: 0,
    total_returned_books: 0
  });
  const [overdueBorrowers, setOverdueBorrowers] = useState<OverdueBorrower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        logout();
        return;
      }

      try {
        setLoading(true);
        
        // Fetch dashboard data
        const dashboardResponse = await axios.get(
          'http://127.0.0.1:8000/dashboard/', 
          {
            headers: { 
              'Authorization': `Bearer ${accessToken}` 
            }
          }
        );
        
        // Fetch overdue borrowers
        const overdueResponse = await axios.get(
          'http://127.0.0.1:8000/dashboard/GetOverdueBorrowers',
          {
            headers: { 
              'Authorization': `Bearer ${accessToken}` 
            }
          }
        );
        
        setDashboardData(dashboardResponse.data);
        setOverdueBorrowers(overdueResponse.data);
        setError(null);
      } catch (err: any) {
        console.error("Dashboard fetch error:", err);
        
        // Handle token expiration or unauthorized access
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError("Session expired. Please log in again.");
          logout();
        } else {
          setError("Failed to load dashboard data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [logout]);

  // Calculate the percentage for the pie chart
  const borrowedPercentage = dashboardData.total_borrowed_books + dashboardData.total_returned_books > 0 
    ? (dashboardData.total_borrowed_books / (dashboardData.total_borrowed_books + dashboardData.total_returned_books)) * 360
    : 0;

  // Display only first 5 overdue borrowers
  const displayedBorrowers = overdueBorrowers.slice(0, 5);

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-gray-200 p-4 rounded-lg mr-4">
                <User className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  {dashboardData.total_student_count.toString().padStart(4, '0')}
                </h2>
                <p className="text-gray-500">Total User Base</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-gray-200 p-4 rounded-lg mr-4">
                <Book className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  {dashboardData.total_book_count.toString().padStart(4, '0')}
                </h2>
                <p className="text-gray-500">Total Book Count</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="bg-gray-200 p-4 rounded-lg mr-4">
                <Building className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  {dashboardData.total_transaction_count.toString().padStart(4, '0')}
                </h2>
                <p className="text-gray-500">Transaction Count</p>
              </div>
            </div>
          </div>
          
          {/* Chart and Data Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-64 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-[#1B4965] relative">
                  <div 
                    className="absolute top-0 left-0 w-64 h-64 rounded-full" 
                    style={{
                      background: `conic-gradient(#3D85B0 0deg, #3D85B0 ${borrowedPercentage}deg, #5DA1CB ${borrowedPercentage}deg, #5DA1CB 360deg)`,
                      clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)"
                    }}
                  />
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center">
                  <Book className="h-10 w-10 mr-4" />
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 rounded-full bg-[#3D85B0] mr-2"></div>
                      <span>Total Borrowed Books: {dashboardData.total_borrowed_books}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[#5DA1CB] mr-2"></div>
                      <span>Total Returned Books: {dashboardData.total_returned_books}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overdue Borrowers */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">
                Overdue Borrowers ({overdueBorrowers.length})
              </h3>
              
              {overdueBorrowers.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  No overdue borrowers found
                </div>
              ) : (
                <div className="space-y-2">
                  {displayedBorrowers.map((borrower, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        <div>
                          <div>{borrower.student_name}</div>
                          <div className="text-xs text-gray-500">
                            Borrowed ID: {borrower.borrowed_id}
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path 
                            fillRule="evenodd" 
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  
                  {overdueBorrowers.length > 5 && (
                    <div className="text-center mt-4">
                      <span className="text-sm text-gray-500">
                        Showing 5 of {overdueBorrowers.length} overdue borrowers
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;