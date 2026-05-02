import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PRODUCTS, Product as DefaultProduct } from "../data/products";
import { getSupabase } from "./supabase";

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
    const parsed = saved ? JSON.parse(saved) : {};
    return {
      websiteName: parsed.websiteName || "EXPLORE MENU",
      logo: parsed.logo || "",
      ourStory: parsed.ourStory || "Welcome to our store. We provide the best fragrance experiences.",
      supabaseUrl: parsed.supabaseUrl || "https://xwfxpjwcqddavwzsfoct.supabase.co/rest/v1/",
      supabaseAnonKey: parsed.supabaseAnonKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3ZnhwandjcWRkYXZ3enNmb2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTcyODAsImV4cCI6MjA5MzI5MzI4MH0.YoUeWmP6BFjyi5mSj2zmIUZ3foqnqmJ1BXBonMVWEac",
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

  useEffect(() => {
    const fetchSupabaseData = async () => {
      const supa = getSupabase(settings.supabaseUrl, settings.supabaseAnonKey);
      if (!supa) return;

      try {
        const { data: dbProducts, error } = await supa.from('products').select('*');
        if (!error && dbProducts && dbProducts.length > 0) {
          const formattedProducts = dbProducts.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: Number(p.price),
            description: p.description,
            volume: p.volume,
            notes: p.notes || [],
            images: p.images || [],
            videoUrl: p.video_url || '',
            category: p.category || 'Unisex',
            stockLeft: p.stock_left,
            tags: p.tags || [],
            urgencyType: p.urgency_type
          }));
          setProducts(formattedProducts);
        }
      } catch (err) {
        console.error("Failed fetching products from supabase", err);
      }
    };

    fetchSupabaseData();
  }, [settings.supabaseUrl, settings.supabaseAnonKey]);

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
