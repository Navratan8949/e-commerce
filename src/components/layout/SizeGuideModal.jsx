import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-[#FAF9F5] border border-[#E8E4DC] max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C857B]">
              LUMÉRA Atelier
            </span>
            <h3 className="font-serif-luxury text-2xl text-[#191919]">
              Size & Measurement Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#191919] hover:opacity-60 transition-opacity"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        <div className="py-6 space-y-6">
          <p className="text-xs text-[#696359] leading-relaxed">
            All LUMÉRA garments are engineered using European tailoring standards with generous ease for relaxed, unrestrictive movement. If between sizes, we recommend sizing down for a closer fit or choosing your customary size for an editorial drape.
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#DCD5C9] text-[#191919] uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 font-semibold">Size</th>
                  <th className="py-2.5 font-semibold">Chest (Inches)</th>
                  <th className="py-2.5 font-semibold">Waist (Inches)</th>
                  <th className="py-2.5 font-semibold">Hips (Inches)</th>
                  <th className="py-2.5 font-semibold">Standard EU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6] text-[#555048] font-mono tabular-nums">
                <tr>
                  <td className="py-3 font-semibold text-[#191919]">XS</td>
                  <td className="py-3">33 - 35"</td>
                  <td className="py-3">26 - 28"</td>
                  <td className="py-3">35 - 37"</td>
                  <td className="py-3">34 - 36</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-[#191919]">S</td>
                  <td className="py-3">36 - 38"</td>
                  <td className="py-3">29 - 31"</td>
                  <td className="py-3">38 - 40"</td>
                  <td className="py-3">38 - 40</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-[#191919]">M</td>
                  <td className="py-3">39 - 41"</td>
                  <td className="py-3">32 - 34"</td>
                  <td className="py-3">41 - 43"</td>
                  <td className="py-3">42 - 44</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-[#191919]">L</td>
                  <td className="py-3">42 - 44"</td>
                  <td className="py-3">35 - 37"</td>
                  <td className="py-3">44 - 46"</td>
                  <td className="py-3">46 - 48</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-[#191919]">XL</td>
                  <td className="py-3">45 - 47"</td>
                  <td className="py-3">38 - 40"</td>
                  <td className="py-3">47 - 49"</td>
                  <td className="py-3">50 - 52</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Tailor measurement advice */}
          <div className="bg-[#F2EFEB] p-4 text-[11px] text-[#696359] space-y-1">
            <strong className="text-[#191919] uppercase tracking-wider block mb-1">
              Need personalized fitting advice?
            </strong>
            <p>
              Our client concierge team is available via concierge@lumera.studio to provide bespoke advice on measurements and custom sleeve/hem alterations.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E4DC] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-[#333333] transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
