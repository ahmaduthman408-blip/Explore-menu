import React, { useState, useRef } from "react";
import { DashboardProduct, useStore } from "../../lib/StoreContext";
import { supabase } from "../../lib/supabase";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Video, UploadCloud } from "lucide-react";

export function AdminProducts() {
  const { products, setProducts, settings } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<DashboardProduct>>({});
  const [productToDelete, setProductToDelete] = useState<string | number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct(prev => ({...prev, images: [reader.result as string]}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.price) return;

    setIsEditing(false);
    
    // Generate an ID if this is a new product
    const productId = currentProduct.id || crypto.randomUUID();

    const newProductState: DashboardProduct = {
      id: productId,
      name: currentProduct.name || "Untitled",
      price: currentProduct.price || 0,
      originalPrice: currentProduct.originalPrice || currentProduct.price || 0,
      description: currentProduct.description || "",
      images: currentProduct.images && currentProduct.images.length > 0 ? currentProduct.images : [''],
      videoUrl: currentProduct.videoUrl || '',
      stockLeft: currentProduct.stockLeft || 10,
      tags: currentProduct.tags || [],
      rating: currentProduct.rating || 5,
      reviews: currentProduct.reviews || 0,
      urgencyType: currentProduct.urgencyType || null
    };

    if (currentProduct.id) {
      setProducts(prev => prev.map(p => p.id === currentProduct.id ? newProductState : p));
    } else {
      setProducts(prev => [...prev, newProductState]);
    }

    // Supabase Sync
    try {
      const dbProduct = {
        name: currentProduct.name,
        price: currentProduct.price,
        description: currentProduct.description || "",
        image: currentProduct.images && currentProduct.images.length > 0 ? currentProduct.images[0] : ''
      };
      
      if (currentProduct.id) {
        // Update existing using exactly the id provided
        await supabase.from('products').update(dbProduct).eq('id', currentProduct.id);
      } else {
        // Insert new product
        await supabase.from('products').insert([{ ...dbProduct, id: productId, created_at: new Date().toISOString() }]);
      }
    } catch (e) {
      console.error("Save error:", e);
    }
    
    setCurrentProduct({});
  };

  const handleDelete = (id: string | number) => {
    setProductToDelete(id);
  };

  const confirmDelete = async () => {
    if (productToDelete !== null) {
      try {
        await supabase.from('products').delete().eq('id', typeof productToDelete !== 'string' ? String(productToDelete) : productToDelete);
      } catch (e) {
        console.error("Delete error:", e);
      }
      setProductToDelete(null);
    }
  };


  const openEditor = (product?: DashboardProduct) => {
    if (product) {
      setCurrentProduct(product);
    } else {
      setCurrentProduct({
        name: "", price: 0, description: "", volume: "100ml", images: [""], videoUrl: "", category: "Unisex"
      });
    }
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-[12px] border border-[#eaeaea] shadow-sm">
        <div>
          <h2 className="text-[20px] font-[700] text-brand-blue">Products list</h2>
          <p className="text-[14px] text-[#64748b]">Manage your store products</p>
        </div>
        <button 
          onClick={() => openEditor()}
          className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-[8px] text-[14px] font-[500] hover:bg-opacity-90 transition-colors"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-[12px] border border-[#eaeaea] shadow-sm overflow-hidden flex flex-col">
            <div className="h-48 relative bg-gray-100 flex items-center justify-center">
              {product.images && product.images[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-gray-400" size={48} />
              )}
              {product.videoUrl && (
                <div className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm">
                  <Video size={16} />
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-[16px] font-[700] text-[#111] mb-1">{product.name}</h3>
              <p className="text-[#64748b] text-[14px] mb-4">₦{product.price.toLocaleString()}</p>
              
              <div className="mt-auto flex items-center gap-2 pt-4 border-t border-[#eaeaea]">
                <button 
                  onClick={() => openEditor(product)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#f8fafc] text-brand-blue border border-[#eaeaea] rounded-[6px] text-[14px] font-[500] hover:bg-[#eaeaea] transition-colors"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center justify-center p-2 text-red-500 bg-red-50 rounded-[6px] hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {productToDelete !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[12px] max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-[18px] font-[700] text-[#111] mb-2">Delete Product?</h3>
            <p className="text-[#64748b] text-[14px] mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setProductToDelete(null)} className="flex-1 py-2 font-[600] text-[#111] border border-[#eaeaea] rounded-[6px] hover:bg-[#f8fafc]">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-2 bg-red-500 text-white font-[600] rounded-[6px] hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="p-6 border-b border-[#eaeaea] flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-[20px] font-[700] text-brand-blue">
                {currentProduct.id ? "Edit Product" : "Add Product"}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-[#64748b] hover:text-[#111]">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 flex-1 flex flex-col gap-5">
              
              <div>
                <label className="block text-[14px] font-[600] text-[#111] mb-2">Product Name</label>
                <input 
                  type="text" 
                  value={currentProduct.name || ""} 
                  onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                  className="w-full px-4 py-2 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue" 
                  required 
                />
              </div>

              <div>
                <label className="block text-[14px] font-[600] text-[#111] mb-2">Price (₦)</label>
                <input 
                  type="number" 
                  value={currentProduct.price || ""} 
                  onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                  className="w-full px-4 py-2 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-[14px] font-[600] text-[#111] mb-2">Category</label>
                <input 
                  type="text" 
                  value={currentProduct.category || ""} 
                  onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}
                  className="w-full px-4 py-2 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue" 
                />
              </div>

              <div>
                <label className="block text-[14px] font-[600] text-[#111] mb-2">Description</label>
                <textarea 
                  rows={3}
                  value={currentProduct.description || ""} 
                  onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                  className="w-full px-4 py-2 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue resize-none" 
                />
              </div>

              <div>
                <label className="block text-[14px] font-[600] text-[#111] mb-2">Image</label>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 border border-brand-blue text-brand-blue rounded-[6px] text-[14px] font-[600] hover:bg-brand-blue/5 transition-colors"
                    >
                      <UploadCloud size={16} /> Upload Image
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <span className="text-[14px] text-[#64748b]">OR</span>
                  </div>

                  <input 
                    type="text" 
                    value={(currentProduct.images && currentProduct.images[0]) || ""} 
                    onChange={e => setCurrentProduct({...currentProduct, images: [e.target.value]})}
                    className="w-full px-4 py-2 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue" 
                    placeholder="Paste image URL here..."
                  />
                  
                  {currentProduct.images && currentProduct.images[0] && (
                    <div className="w-full h-32 mt-2 bg-gray-50 rounded-[8px] overflow-hidden border border-[#eaeaea]">
                      <img src={currentProduct.images[0]} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-[600] text-[#111] mb-2">Video URL (Optional)</label>
                <input 
                  type="text" 
                  value={currentProduct.videoUrl || ""} 
                  onChange={e => setCurrentProduct({...currentProduct, videoUrl: e.target.value})}
                  className="w-full px-4 py-2 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue" 
                  placeholder="YouTube, Vimeo, or MP4 link"
                />
                <p className="text-[12px] text-[#64748b] mt-1">Displays a video player instead of image if provided</p>
              </div>

              <div className="mt-auto pt-6 border-t border-[#eaeaea] flex gap-3">
                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-3 text-[#111] font-[600] border border-[#eaeaea] rounded-[6px] hover:bg-[#f8fafc]">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-brand-blue text-white font-[600] rounded-[6px] hover:bg-opacity-90">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
