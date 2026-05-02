import { useStore } from "../../lib/StoreContext";

export function AdminReviews() {
  const { reviews } = useStore();

  return (
    <div className="bg-white p-6 rounded-[12px] border border-[#eaeaea] shadow-sm">
      <h2 className="text-[20px] font-[700] text-brand-blue mb-6">Reviews</h2>
      {reviews.length === 0 ? (
        <div className="text-center py-12 text-[#64748b]">No reviews yet.</div>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="p-4 border border-[#eaeaea] rounded-[8px]">
              <div className="flex justify-between items-start mb-2">
                <span className="font-[600] text-[#111]">{review.customerName}</span>
                <span className="text-[14px] text-brand-orange">{"★".repeat(review.rating)}</span>
              </div>
              <p className="text-[#555] text-[14px]">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
