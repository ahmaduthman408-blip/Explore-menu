import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../lib/StoreContext";
import { LayoutDashboard, Package, ShoppingCart, Star, Users, BarChart, Settings, LogOut } from "lucide-react";
import { AdminProducts } from "./AdminProducts";
import { AdminDashboardHome } from "./AdminDashboardHome";
import { AdminOrders } from "./AdminOrders";
import { AdminReviews } from "./AdminReviews";
import { AdminCustomers } from "./AdminCustomers";
import { AdminAnalytics } from "./AdminAnalytics";
import { AdminSettings } from "./AdminSettings";

export function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Relying strictly on React state, removed local storage entirely per instructions.
    if (isAuthenticated && location.pathname === "/admin") {
      navigate("/admin/dashboard");
    }
  }, [location.pathname, navigate, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentAdminPassword = "Abu Nasir 123";
    if (password === currentAdminPassword) {
      setIsAuthenticated(true);
      navigate("/admin/dashboard");
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/admin");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-[12px] shadow-sm border border-[#eaeaea] max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-[24px] font-[800] text-brand-blue mb-2">Admin Access</h1>
            <p className="text-[#64748b]">Enter your password to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#f8fafc] border border-[#eaeaea] rounded-[6px] outline-none text-[#111] focus:border-brand-blue transition-colors"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-brand-blue text-white rounded-[6px] font-[600] text-[14px] hover:bg-opacity-90 transition-all"
            >
              Login
            </button>
            <Link to="/" className="block text-center mt-4 text-[#64748b] text-[14px] hover:text-brand-blue">
              Back to Website
            </Link>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-[#eaeaea] flex flex-col fixed h-full z-10">
        <div className="p-6">
          <h2 className="text-[20px] font-black tracking-[1px] text-brand-blue uppercase">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-[8px] text-[14px] font-[500] transition-colors ${
                  isActive 
                    ? "bg-brand-blue text-white" 
                    : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-brand-blue"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#eaeaea]">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-[14px] font-[500] text-[#64748b] hover:text-brand-blue transition-colors mb-2">Back to Site</Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-left text-[14px] font-[500] text-red-500 hover:bg-red-50 rounded-[8px] transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-[72px] bg-white border-b border-[#eaeaea] flex items-center px-8 sticky top-0 z-10">
          <h1 className="text-[20px] font-[700] text-brand-blue">
            {navItems.find(item => location.pathname.startsWith(item.href))?.name || "Dashboard"}
          </h1>
        </header>

        <main className="flex-1 p-8">
          <Routes>
            <Route path="/dashboard" element={<AdminDashboardHome />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/reviews" element={<AdminReviews />} />
            <Route path="/customers" element={<AdminCustomers />} />
            <Route path="/analytics" element={<AdminAnalytics />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
