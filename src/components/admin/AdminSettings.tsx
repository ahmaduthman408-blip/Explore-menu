import React, { useState } from "react";
import { useStore } from "../../lib/StoreContext";

export function AdminSettings() {
  const { settings, setSettings } = useStore();
  const [formData, setFormData] = useState(settings);
  const [password, setPassword] = useState(localStorage.getItem("admin_password") || "Abu Nasir 123");
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(formData);
    localStorage.setItem("admin_password", password);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-[12px] border border-[#eaeaea] shadow-sm relative">
      {showNotification && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Settings saved successfully!
        </div>
      )}
      <h2 className="text-[20px] font-[700] text-brand-blue mb-6">Website Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[14px] font-[600] text-[#111] mb-2">Website Name</label>
          <input 
            type="text" 
            value={formData.websiteName}
            onChange={e => setFormData({...formData, websiteName: e.target.value})}
            className="w-full px-4 py-3 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue"
          />
        </div>

        <div>
          <label className="block text-[14px] font-[600] text-[#111] mb-2">Logo URL</label>
          <input 
            type="text" 
            value={formData.logo}
            onChange={e => setFormData({...formData, logo: e.target.value})}
            className="w-full px-4 py-3 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-[14px] font-[600] text-[#111] mb-2">Our Story Content</label>
          <textarea 
            rows={5}
            value={formData.ourStory}
            onChange={e => setFormData({...formData, ourStory: e.target.value})}
            className="w-full px-4 py-3 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue resize-none"
          />
        </div>

        <div className="pt-6 border-t border-[#eaeaea]">
          <h3 className="text-[16px] font-[700] text-brand-blue mb-4">Database Credentials (Supabase)</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[14px] font-[600] text-[#111] mb-2">Supabase URL</label>
              <input 
                type="text" 
                value={formData.supabaseUrl || ""}
                onChange={e => setFormData({...formData, supabaseUrl: e.target.value})}
                className="w-full px-4 py-3 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue"
                placeholder="https://your-project-ref.supabase.co"
              />
            </div>

            <div>
              <label className="block text-[14px] font-[600] text-[#111] mb-2">Supabase Anon Key</label>
              <input 
                type="text" 
                value={formData.supabaseAnonKey || ""}
                onChange={e => setFormData({...formData, supabaseAnonKey: e.target.value})}
                className="w-full px-4 py-3 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#eaeaea]">
          <h3 className="text-[16px] font-[700] text-brand-blue mb-4">Security</h3>
          <div>
            <label className="block text-[14px] font-[600] text-[#111] mb-2">Admin Password</label>
            <input 
              type="text" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#eaeaea] rounded-[6px] outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="px-6 py-3 bg-brand-blue text-white rounded-[6px] font-[600] text-[14px] hover:bg-opacity-90">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
