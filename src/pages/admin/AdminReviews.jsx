import React, { useState } from 'react';
import {
  MessageSquare,
  CheckCircle2,
  EyeOff,
  Trash2,
  Filter,
  Star,
  Sparkles
} from 'lucide-react';
import { mockReviews } from '../../data/reviews.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function AdminReviews() {
  const { showToast } = useToast();

  const [reviews, setReviews] = useState(() => {
    return mockReviews.map((r, i) => ({
      ...r,
      productName: i % 2 === 0 ? 'Oversized Linen Shirt' : 'Satin Slip Dress',
      status: i === 0 ? 'Pending' : 'Approved'
    }));
  });

  const [filter, setFilter] = useState('All');

  const filteredReviews = reviews.filter((r) => {
    if (filter === 'All') return true;
    return r.status === filter;
  });

  const handleStatusChange = (id, newStatus) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    showToast(`Review marked as ${newStatus}`, 'success');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this review permanently?')) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      showToast('Review deleted', 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E6E1]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#8C7A6B] font-semibold">
            SOCIAL PROOF &amp; TESTIMONIALS
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light tracking-tight">
            Customer Reviews
          </h1>
          <p className="text-xs text-[#6E6961] mt-0.5">
            Moderate client feedback, verified buyer ratings, and storefront visibility.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center bg-[#F4F1EA] p-1 rounded-md border border-[#E2DED6] text-xs">
          {['All', 'Approved', 'Pending', 'Hidden'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-xs transition-colors ${
                filter === f
                  ? 'bg-white text-[#191919] font-semibold shadow-xs'
                  : 'text-[#6E6961] hover:text-[#191919]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white border border-[#E8E6E1] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8E6E1] bg-[#FCFBF9] text-[#7A756D] font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Patron</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Review Content</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9]">
              {filteredReviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-[#FAF9F5] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-[#191919]">
                    {rev.productName}
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-medium text-[#191919]">{rev.userName}</p>
                    <p className="text-[11px] text-[#7A756D]">{rev.city}</p>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[#D97706] whitespace-nowrap">
                    {'★'.repeat(rev.rating)}
                  </td>

                  <td className="py-3.5 px-4 max-w-md">
                    <p className="font-semibold text-[#191919]">{rev.title}</p>
                    <p className="text-[#6E6961] leading-relaxed line-clamp-2 mt-0.5">
                      {rev.comment}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 text-[#7A756D] whitespace-nowrap">
                    {rev.date}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase rounded-full border ${
                        rev.status === 'Approved'
                          ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                          : rev.status === 'Pending'
                          ? 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]'
                          : 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]'
                      }`}
                    >
                      {rev.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {rev.status !== 'Approved' && (
                        <button
                          onClick={() => handleStatusChange(rev.id, 'Approved')}
                          title="Approve"
                          className="p-1.5 text-[#166534] hover:bg-[#F0FDF4] rounded-xs transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      {rev.status !== 'Hidden' && (
                        <button
                          onClick={() => handleStatusChange(rev.id, 'Hidden')}
                          title="Hide from Store"
                          className="p-1.5 text-[#7A756D] hover:bg-[#F4F1EA] rounded-xs transition-colors"
                        >
                          <EyeOff className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(rev.id)}
                        title="Delete"
                        className="p-1.5 text-[#DC2626] hover:bg-[#FEF2F2] rounded-xs transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
