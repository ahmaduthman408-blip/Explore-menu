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
      supabaseUrl: parsed.supabaseUrl || "",
      supabaseAnonKey: parsed.supabaseAnonKey || "",
    };
  });

  useEffect(() => {
    localStorage.setItem("admin_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("admin_products", JSON.stringify(products));
  }, [products]);

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
      try {
        const { data: dbProducts, error } = await supabase.from('products').select('*');
        if (!error && dbProducts) {
          const formatDbProduct = (p: any) => ({
            id: p.id,
            name: p.name,
            price: Number(p.price),
            description: p.description,
            images: p.image ? [p.image] : [],
            videoUrl: '',
            category: 'Unisex',
            stockLeft: 10,
            tags: []
          });

          if (dbProducts.length === 0) {
            // Database is empty, try to seed with initial products
            const mapped = PRODUCTS.map((p: any) => ({
              id: crypto.randomUUID(),
              name: p.name,
              price: Number(p.price) || 0,
              description: p.description || "",
              image: p.images && p.images.length > 0 ? p.images[0] : (p.image || ""),
              created_at: new Date().toISOString()
            }));
            
            const insertReq = await supabase.from('products').insert(mapped);
            if (insertReq.error) {
              console.error("Failed to seed initial products. Please ensure RLS policies allow INSERT and the schema has the 'image' column.", insertReq.error);
              // Fallback: Populate local state from local storage or defaults if DB inserting fails
              const saved = localStorage.getItem("admin_products");
               setProducts(saved ? JSON.parse(saved) : PRODUCTS);
            } else {
              const { data: refetched } = await supabase.from('products').select('*');
              if (refetched) {
                setProducts(refetched.map(formatDbProduct));
              } else {
                setProducts(PRODUCTS as any);
              }
            }
            return;
          }

          setProducts(dbProducts.map(formatDbProduct));
        } else {
          // If supabase fails altogether, fallback to local
          const saved = localStorage.getItem("admin_products");
          setProducts(saved ? JSON.parse(saved) : PRODUCTS);
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
