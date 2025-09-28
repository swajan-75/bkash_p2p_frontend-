"use client";

import { useState, useEffect } from "react";
import api from "../lib/axios";
import Navbar from "../component/navbar";

interface Transaction {
  transaction_id: number;
  trx_id: string;
  type: "credit" | "debit";
  amount: string;
  aksing_balance: string;
  created_at: string;
  phone_number: string;
  reference?: string | null;
  date?: string;
  time?: string;
}

export default function TransactionPage() {
  const [form, setForm] = useState({ user_id: "", amount: "", trxid: "", mobile: "", type: "credit" });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTxns, setFilteredTxns] = useState<Transaction[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("id");

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/user/alltransactions/" + localStorage.getItem("userEmail"));
      setTransactions(res.data.transactions || []);
      setFilteredTxns(res.data.transactions || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const filtered = transactions.filter((txn) => {
      const value = search.toLowerCase();
      switch (category) {
        case "id":
          return txn.trx_id.toLowerCase().includes(value);
        case "phone_number":
          return txn.phone_number?.toLowerCase().includes(value);
        case "reference":
          return txn.reference?.toLowerCase().includes(value);
        default:
          return true;
      }
    });
    setFilteredTxns(filtered);
  }, [search, category, transactions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    try {
      const res = await api.post("/user/transaction", {
        amount: parseFloat(form.amount),
        type: form.type,
        trxid: form.trxid,
        mobile: form.mobile,
        user_email: localStorage.getItem("userEmail"),
      });

      setSuccessMessage(res.data.message || "Transaction successful!");
      setForm({ user_id: "", trxid: "", mobile: "", amount: "", type: "credit" });
      fetchTransactions();
    } catch (err: any) {
      console.error(err);
      setErrors({ general: err.response?.data?.message || "Something went wrong!" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-start py-10 gap-10 px-4 md:px-10">

        {/* Left Side: Transaction Form */}
        <div className="w-full md:w-1/3 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-xl">
            Make a Transaction
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            <input
              type="text"
              name="trxid"
              value={form.trxid}
              onChange={handleChange}
              placeholder="Enter TrxID"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
            {errors.general && <p className="text-red-600 text-sm">{errors.general}</p>}
            {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 py-2 text-white font-semibold shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Side: Transactions Table */}
        <div className="w-full md:w-2/3 bg-white p-8 rounded-2xl shadow-lg overflow-x-auto">
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-xl">
            All Transactions
          </h2>

          {/* Search & Filter */}
          <div className="flex justify-between mb-4 gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-1/4 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="id">Transaction ID</option>
              <option value="phone_number">Phone Number</option>
              <option value="reference">Reference</option>
            </select>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">TrxID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Asking Balance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTxns.map((txn, idx) => (
                <tr key={txn.transaction_id} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition`}>
                  <td className="px-6 py-4 text-sm text-gray-800">{txn.transaction_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{txn.phone_number}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{txn.trx_id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{txn.reference}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-white text-xs ${txn.type === "credit" ? "bg-green-500" : "bg-red-500"}`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-semibold ${txn.type === "credit" ? "text-green-600" : "text-red-600"}`}>{txn.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{txn.aksing_balance}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{txn.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{txn.time}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{new Date(txn.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTxns.length === 0 && <p className="text-center text-gray-700 mt-4">No transactions found.</p>}
        </div>
      </div>
    </div>
  );
}
