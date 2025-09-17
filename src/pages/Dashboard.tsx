import React from "react";
const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-blue-gradient">
      <h1 className="mb-8 text-3xl font-bold text-center text-blue-700 dark:text-blue-300">Citizen Dashboard</h1>
      <button className="px-10 py-5 bg-blue-600 text-white rounded-xl shadow-xl text-2xl font-bold hover:bg-blue-700 transition-all">
        Dashboard
      </button>
    </div>
  );
};

export default DashboardPage;
