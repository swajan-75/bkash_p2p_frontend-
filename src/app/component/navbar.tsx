"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import api from "../lib/axios";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Main Balance", href: "/cashout" },
    { name : "Transactions", href : "/transactions"},
  { name: "About", href: "/about" },
  
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false); // track client-side

  useEffect(() => {
    setMounted(true); // mark as mounted
  }, []);

  const fetchBalance = async () => {
    if (!mounted) return; // only run on client
    if (balance !== null) {
      setBalance(null);
      if (timerId) clearTimeout(timerId);
      return;
    }

    try {
      const email = localStorage.getItem("userEmail");
      if (!email) return;

      const res = await api.get("/user/mainbalance/" + email);
      setBalance(res.data.balance);

      const id = setTimeout(() => setBalance(null), 5000);
      setTimerId(id);
    } catch (err) {
      console.error(err);
      setBalance(null);
    }
  };

  if (!mounted) return null; // prevent SSR mismatch

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black border-b border-gray-200 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-2xl font-bold">
          Bkash_p2p
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {links.map((link) =>
            link.name === "Main Balance" ? (
              <button
                key={link.name}
                onClick={fetchBalance}
                className="hover:text-gray-600 transition-colors min-w-[120px] text-center"
              >
                {balance !== null ? balance : link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-gray-600 transition-colors"
              >
                {link.name}
              </Link>
            )
          )}
          <button className="ml-4 rounded-lg bg-red-600 px-4 py-1 text-white font-semibold hover:bg-red-700">
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 pb-4 space-y-4 text-sm font-medium">
          {links.map((link) =>
            link.name === "Main Balance" ? (
              <button
                key={link.name}
                onClick={fetchBalance}
                className="block hover:text-gray-600 min-w-[120px] text-center"
              >
                {balance !== null ? balance : link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="block hover:text-gray-600"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}
          <button
            className="w-full rounded-lg bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700"
            onClick={() => setMenuOpen(false)}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
