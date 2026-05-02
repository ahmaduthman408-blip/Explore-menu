import { useStore } from "../../lib/StoreContext";
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";

export function AdminDashboardHome() {
  const { products, orders, customers } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  
  const stats = [
    { name: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-500", bg: "bg-green-50" },
    { name: "Total Orders", value: orders.length, icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Total Products", value: products.length, icon: Package, color: "text-purple-500", bg: "bg-purple-50" },
    { name: "Total Customers", value: customers.length, icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-[12px] border border-[#eaeaea] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#64748b] font-[500] mb-1">{stat.name}</p>
              <h3 className="text-[24px] font-[800] text-[#111]">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-[12px] border border-[#eaeaea] shadow-sm">
        <h3 className="text-[18px] font-[700] text-brand-blue mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#eaeaea]">
                <th className="pb-3 text-[#64748b] font-[500] text-[14px]">Order ID</th>
                <th className="pb-3 text-[#64748b] font-[500] text-[14px]">Customer</th>
                <th className="pb-3 text-[#64748b] font-[500] text-[14px]">Date</th>
                <th className="pb-3 text-[#64748b] font-[500] text-[14px]">Status</th>
                <th className="pb-3 text-[#64748b] font-[500] text-[14px] text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="border-b border-[#eaeaea] last:border-0">
                  <td className="py-4 text-[14px] font-[500] text-brand-blue">{order.id}</td>
                  <td className="py-4 text-[14px] text-[#111]">{order.customerName}</td>
                  <td className="py-4 text-[14px] text-[#64748b]">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-[600] ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' : 
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-[14px] font-[600] text-[#111] text-right">₦{order.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
