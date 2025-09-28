"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Example stats
  const stats = [
    { title: "Total Transactions", value: 1520 },
    { title: "Pending Cashouts", value: 24 },
    { title: "Total Users", value: 560 },
    { title: "Revenue (BDT)", value: "1,250,000" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}

      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-4 space-y-2">
          <Link href="/dashboard" className="block hover:text-gray-200 font-medium">Dashboard</Link>
          <Link href="/transactions" className="block hover:text-gray-200 font-medium">Transactions</Link>
          <Link href="/cashout" className="block hover:text-gray-200 font-medium">Cashout</Link>
          <Link href="/users" className="block hover:text-gray-200 font-medium">Users</Link>
          <button className="w-full bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-medium">Logout</button>
        </div>
      )}

      {/* Dashboard Content */}
      <main className="p-6 pt-14" >
        <h2 className="text-xl font-bold mb-4 text-blue-900">Overview</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
              <p className="text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold text-blue-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Example Transactions Table */}
        <div className="mt-8">
  <h3 className="text-lg font-bold mb-2 text-blue-900">Recent Transactions</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-2xl shadow">
      <thead className="bg-blue-700 text-white border-b">
        <tr>
          <th className="text-left px-4 py-2">ID</th>
          <th className="text-left px-4 py-2">User</th>
          <th className="text-left px-4 py-2">Amount (BDT)</th>
          <th className="text-left px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b hover:bg-blue-50">
          <td className="px-4 py-2 text-gray-800">#1001</td>
          <td className="px-4 py-2 text-gray-800">John Doe</td>
          <td className="px-4 py-2 text-gray-800">500</td>
          <td className="px-4 py-2 text-green-600 font-semibold">Completed</td>
        </tr>
        <tr className="border-b hover:bg-blue-50">
          <td className="px-4 py-2 text-gray-800">#1002</td>
          <td className="px-4 py-2 text-gray-800">Jane Smith</td>
          <td className="px-4 py-2 text-gray-800">1200</td>
          <td className="px-4 py-2 text-yellow-600 font-semibold">Pending</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
      </main>
    </div>
  );
}
