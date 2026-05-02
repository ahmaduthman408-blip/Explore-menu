import { useStore } from "../../lib/StoreContext";

export function AdminAnalytics() {
  const { orders } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="bg-white p-6 rounded-[12px] border border-[#eaeaea] shadow-sm">
      <h2 className="text-[20px] font-[700] text-brand-blue mb-6">Analytics</h2>
      <div className="h-64 flex flex-col items-center justify-center bg-[#f8fafc] border border-[#eaeaea] rounded-[8px] border-dashed">
        <p className="text-[24px] font-[800] text-brand-blue mb-2">₦{totalRevenue.toLocaleString()}</p>
        <p className="text-[#64748b]">Total Lifetime Revenue</p>
      </div>
      <p className="text-center mt-6 text-[#64748b] text-[14px]">Advanced analytics charts will appear here when connected to a database.</p>
    </div>
  );
}
