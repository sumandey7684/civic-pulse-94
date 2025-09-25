import React from "react";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../hooks/useAuth";

// Placeholder for graph analytics component
const GraphAnalytics = () => (
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-6">
    <h2 className="text-xl font-bold mb-2">Analytics</h2>
    {/* TODO: Replace with real graph/chart */}
    <div className="h-48 flex items-center justify-center text-gray-400">Graph will appear here</div>
  </div>
);

const CivicCoinsSection = ({ civicCoins }: { civicCoins: number }) => (
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-6">
    <h2 className="text-xl font-bold mb-2">Civic Coins</h2>
    <div className="text-2xl font-semibold">{civicCoins}</div>
    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Check Balance</button>
  </div>
);

const DashboardPage = () => {
  const { user, civicCoins } = useAuth(); // Replace with your actual auth hook

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 p-8 rounded shadow text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in or sign up to view your dashboard.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-blue-gradient">
      <h1 className="mb-8 text-3xl font-bold text-center text-blue-700 dark:text-blue-300">Citizen Dashboard</h1>
      <button className="px-10 py-5 bg-blue-600 text-white rounded-xl shadow-xl text-2xl font-bold hover:bg-blue-700 transition-all">
        Dashboard & Reward
      </button>
    </div>
  );
};

export default DashboardPage;
