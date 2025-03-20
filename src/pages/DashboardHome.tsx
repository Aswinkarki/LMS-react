import React from "react";
import { User, Book, Building } from "lucide-react";

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-gray-200 p-4 rounded-lg mr-4">
            <User className="h-6 w-6 text-gray-700" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">0150</h2>
            <p className="text-gray-500">Total User Base</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-gray-200 p-4 rounded-lg mr-4">
            <Book className="h-6 w-6 text-gray-700" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">01500</h2>
            <p className="text-gray-500">Total Book Count</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="bg-gray-200 p-4 rounded-lg mr-4">
            <Building className="h-6 w-6 text-gray-700" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">0010</h2>
            <p className="text-gray-500">Branch Count</p>
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
                  background: "conic-gradient(#3D85B0 0deg, #3D85B0 240deg, #5DA1CB 240deg, #5DA1CB 360deg)",
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
                  <div className="w-3 h-3 rounded-full bg-[#1B4965] mr-2"></div>
                  <span>Total Borrowed Books</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#5DA1CB] mr-2"></div>
                  <span>Total Returned Books</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Overdue Borrowers */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Overdue Borrowers</h3>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <div>
                    <div>ABC XYZ</div>
                    <div className="text-xs text-gray-500">Borrowed ID: 10</div>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;