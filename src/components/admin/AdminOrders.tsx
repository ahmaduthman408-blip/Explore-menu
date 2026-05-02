import { useStore } from "../../lib/StoreContext";

export function AdminOrders() {
  const { orders } = useStore();

  return (
    <div className="bg-white p-6 rounded-[12px] border border-[#eaeaea] shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[20px] font-[700] text-brand-blue">Orders</h2>
          <p className="text-[14px] text-[#64748b]">Track and manage customer orders</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#eaeaea]">
              <th className="pb-3 text-[#64748b] font-[500] text-[14px]">Order ID</th>
              <th className="pb-3 text-[#64748b] font-[500] text-[14px]">Customer</th>
              <th className="pb-3 text-[#64748b] font-[500] text-[14px]">Date</th>
              <th className="pb-3 text-[#64748b] font-[500] text-[14px]">Status</th>
              <th className="pb-3 text-[#64748b] font-[500] text-[14px] text-right">Total</th>
              <th className="pb-3 text-[#64748b] font-[500] text-[14px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-[#eaeaea] last:border-0 hover:bg-[#f8fafc]">
                <td className="py-4 text-[14px] font-[500] text-brand-blue">{order.id}</td>
                <td className="py-4 text-[14px]">
                  <div className="font-[500] text-[#111]">{order.customerName}</div>
                  <div className="text-[#64748b] text-[12px]">{order.email}</div>
                </td>
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
                <td className="py-4 text-right">
                  <button className="text-brand-blue font-[500] text-[14px] hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="text-center py-12 text-[#64748b]">No orders found.</div>
        )}
      </div>
    </div>
  );
}
