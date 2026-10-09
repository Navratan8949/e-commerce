import React, { useState } from 'react';
import {
  Send,
  Plus,
  Mail,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { initialCampaigns } from '../../data/adminMockData.js';
import { useToast } from '../../context/ToastContext.jsx';
import { storage } from '../../lib/storage.js';

export default function AdminCampaigns() {
  const { showToast } = useToast();

  const [campaigns, setCampaigns] = useState(() => {
    return storage.get('fillkart_admin_campaigns', initialCampaigns);
  });

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    channel: 'Email Newsletter',
    audience: 'VIP Patrons (Top 500)',
    status: 'Scheduled'
  });

  const handleCreate = () => {
    if (!form.name.trim()) {
      showToast('Please enter campaign title', 'error');
      return;
    }
    const newCamp = {
      id: `cmp-${Date.now()}`,
      ...form,
      sentDate: 'Scheduled',
      opens: '--',
      clicks: '--',
      revenueGenerated: '--'
    };
    const updated = [newCamp, ...campaigns];
    setCampaigns(updated);
    storage.set('fillkart_admin_campaigns', updated);
    showToast(`Campaign "${form.name}" scheduled`, 'success');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E6E1]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#8C7A6B] font-semibold">
            PATRON OUTREACH &amp; CRM
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light tracking-tight">
            Marketing Campaigns
          </h1>
          <p className="text-xs text-[#6E6961] mt-0.5">
            Deliver bespoke editorial broadcasts, private salon invites, and cart recovery workflows.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#191919] hover:bg-black text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ New Campaign</span>
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white border border-[#E8E6E1] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8E6E1] bg-[#FCFBF9] text-[#7A756D] font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Campaign Name</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Target Audience</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Open Rate</th>
                <th className="py-3 px-4">CTR</th>
                <th className="py-3 px-4 text-right">Revenue Generated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9]">
              {campaigns.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-[#FAF9F5] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-[#191919]">
                    {cmp.name}
                  </td>
                  <td className="py-3.5 px-4 text-[#7A756D]">{cmp.channel}</td>
                  <td className="py-3.5 px-4 text-[#4A4742]">{cmp.audience}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase rounded-full border ${
                        cmp.status === 'Completed' || cmp.status === 'Active'
                          ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                          : 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]'
                      }`}
                    >
                      {cmp.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#191919]">{cmp.opens}</td>
                  <td className="py-3.5 px-4 font-mono text-[#191919]">{cmp.clicks}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#191919] text-right">
                    {cmp.revenueGenerated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-2xl border border-[#E8E6E1] space-y-4">
            <h3 className="font-serif-luxury text-xl text-[#191919]">New Patron Broadcast</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#4A4742] font-medium block mb-1">Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g. Winter Solstice Private Invite"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
                />
              </div>
              <div>
                <label className="text-[#4A4742] font-medium block mb-1">Channel</label>
                <select
                  value={form.channel}
                  onChange={(e) => setForm({ ...form, channel: e.target.value })}
                  className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
                >
                  <option value="Email Newsletter">Email Newsletter</option>
                  <option value="SMS / WhatsApp Concierge">SMS / WhatsApp Concierge</option>
                  <option value="Automated Trigger">Automated Trigger</option>
                </select>
              </div>
              <div>
                <label className="text-[#4A4742] font-medium block mb-1">Target Segment</label>
                <select
                  value={form.audience}
                  onChange={(e) => setForm({ ...form, audience: e.target.value })}
                  className="w-full bg-[#F8F7F4] border border-[#E2DED6] rounded-md p-2 text-[#191919]"
                >
                  <option value="Top 500 VIP Clientele">Top 500 VIP Clientele</option>
                  <option value="All Registered Patrons">All Registered Patrons</option>
                  <option value="High AOV Spenders (&gt;₹50,000)">High AOV Spenders (&gt;₹50,000)</option>
                  <option value="Abandoned Cart (>24h)">Abandoned Cart (&gt;24h)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-[#DDD8CE] rounded-md text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-[#191919] text-white rounded-md text-xs font-semibold"
              >
                Schedule Broadcast
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
