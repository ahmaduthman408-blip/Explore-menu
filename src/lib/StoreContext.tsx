import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PRODUCTS, Product as DefaultProduct } from "../data/products";

export interface DashboardProduct extends DefaultProduct {
  videoUrl?: string; // YouTube or Drive link
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  date: string;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
}

interface Settings {
  websiteName: string;
  logo: string;
  ourStory: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

interface StoreContextType {
  products: DashboardProduct[];
  setProducts: React.Dispatch<React.SetStateAction<DashboardProduct[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  // Use local storage to keep state across refreshes
  const [products, setProducts] = useState<DashboardProduct[]>(() => {
    const saved = localStorage.getItem("admin_products");
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("admin_orders");
    return saved ? JSON.parse(saved) : [
      { id: "ORD-001", customerName: "John Doe", email: "john@example.com", total: 120, status: "Pending", date: new Date().toISOString() },
      { id: "ORD-002", customerName: "Jane Smith", email: "jane@example.com", total: 45, status: "Delivered", date: new Date().toISOString() },
    ];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem("admin_reviews");
    return saved ? JSON.parse(saved) : [];
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem("admin_customers");
    return saved ? JSON.parse(saved) : [
      { id: "CUST-001", name: "John Doe", email: "john@example.com", ordersCount: 1, totalSpent: 120 },
      { id: "CUST-002", name: "Jane Smith", email: "jane@example.com", ordersCount: 1, totalSpent: 45 },
    ];
  });

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem("admin_settings");
    return saved ? JSON.parse(saved) : {
      websiteName: "EXPLORE MENU",
      logo: "",
      ourStory: "Welcome to our store. We provide the best fragrance experiences.",
      supabaseUrl: "",
      supabaseAnonKey: "",
    };
  });

  useEffect(() => {
    localStorage.setItem("admin_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("admin_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("admin_reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("admin_customers", JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem("admin_settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <StoreContext.Provider value={{
      products, setProducts,
      orders, setOrders,
      reviews, setReviews,
      customers, setCustomers,
      settings, setSettings
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
