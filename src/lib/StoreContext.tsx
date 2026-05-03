import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PRODUCTS, Product as DefaultProduct } from "../data/products";
import { supabase } from "./supabase";

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
  const [products, setProducts] = useState<DashboardProduct[]>([]);

  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD-001", customerName: "John Doe", email: "john@example.com", total: 120, status: "Pending", date: new Date().toISOString() },
    { id: "ORD-002", customerName: "Jane Smith", email: "jane@example.com", total: 45, status: "Delivered", date: new Date().toISOString() },
  ]);

  const [reviews, setReviews] = useState<Review[]>([]);

  const [customers, setCustomers] = useState<Customer[]>([
    { id: "CUST-001", name: "John Doe", email: "john@example.com", ordersCount: 1, totalSpent: 120 },
    { id: "CUST-002", name: "Jane Smith", email: "jane@example.com", ordersCount: 1, totalSpent: 45 },
  ]);

  const [settings, setSettings] = useState<Settings>({
    websiteName: "EXPLORE MENU",
    logo: "",
    ourStory: "Welcome to our store. We provide the best fragrance experiences.",
  });

  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        const { data: dbProducts, error } = await supabase.from('products').select('*');
        if (!error && dbProducts) {
          const formattedProducts = dbProducts.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: Number(p.price),
            description: p.description,
            volume: p.volume,
            notes: p.notes || [],
            images: Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []),
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

    // Set up real-time sync globally across devices
    const channel = supabase
      .channel('products-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchSupabaseData(); // Re-fetch on any change
        }
      )
      .subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

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
