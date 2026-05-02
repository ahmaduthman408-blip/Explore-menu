import { useStore } from "../../lib/StoreContext";

export function AdminCustomers() {
  const { customers } = useStore();

  return (
    <div className="bg-white p-6 rounded-[12px] border border-[#eaeaea] shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[20px] font-[700] text-brand-blue">Customers</h2>
          <p className="text-[14px] text-[#64748b]">Manage and help your customers</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#eaeaea]">
              <th className="pb-3 text-[#64748b] font-[500] text-[14px]">Customer Name</th>
              <th className="pb-3 text-[#64748b] font-[500] text-[14px]">Email</th>
              <th className="pb-3 text-[#64748b] font-[500] text-[14px]">Orders</th>
              <th className="pb-3 text-[#64748b] font-[500] text-[14px] text-right">Total Spent</th>
              <th className="pb-3 text-[#64748b] font-[500] text-[14px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className="border-b border-[#eaeaea] last:border-0 hover:bg-[#f8fafc]">
                <td className="py-4 text-[14px] font-[500] text-[#111]">{customer.name}</td>
                <td className="py-4 text-[14px] text-[#64748b]">{customer.email}</td>
                <td className="py-4 text-[14px] text-[#111]">{customer.ordersCount}</td>
                <td className="py-4 text-[14px] font-[600] text-brand-blue text-right">₦{customer.totalSpent.toLocaleString()}</td>
                <td className="py-4 text-right">
                  <button onClick={() => alert("Password reset link sent to customer email.")} className="text-brand-orange font-[500] text-[14px] hover:underline">Reset Password</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
