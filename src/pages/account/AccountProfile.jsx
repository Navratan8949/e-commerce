import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Check } from 'lucide-react';

export default function AccountProfile() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || '',
    state: user.state || '',
    pincode: user.pincode || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    showToast('Client profile updated successfully.', 'success');
  };

  return (
    <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#E8E4DC] pb-4">
        <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#191919]">
          Client Credentials & Preferences
        </h2>
        <p className="text-xs text-[#736C62] mt-1 font-light">
          Manage your personal details, contact preferences, and default shipping addresses.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <h3 className="text-xs uppercase tracking-wider font-semibold text-[#191919] mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919] focus:outline-hidden focus:border-[#191919]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919] focus:outline-hidden focus:border-[#191919]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1">
                Telephone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919] focus:outline-hidden focus:border-[#191919]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E4DC]">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-[#191919] mb-4">
            Default Delivery Destination
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919] focus:outline-hidden focus:border-[#191919]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919] focus:outline-hidden focus:border-[#191919]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919] focus:outline-hidden focus:border-[#191919]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C9] text-xs font-mono text-[#191919] focus:outline-hidden focus:border-[#191919]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E4DC] flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-[#333333] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
