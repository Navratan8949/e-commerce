import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast("You're on the list.", 'success');
  };

  return (
    <section className="py-20 lg:py-24 bg-[#F2EFEB] border-t border-b border-[#E8E4DC]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block mb-3">
          The LUMÉRA Gazette
        </span>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light mb-4">
          Stay in the know.
        </h2>

        <p className="text-xs sm:text-sm text-[#696359] max-w-md mx-auto mb-8 font-light leading-relaxed">
          Get early access to new collections, private offers, and stories from LUMÉRA.
        </p>

        {isSubscribed ? (
          <div className="inline-flex items-center gap-2.5 px-6 py-4 bg-[#FAF9F5] border border-[#DCD5C9] text-xs uppercase tracking-wider text-[#191919] shadow-xs">
            <Check className="w-4 h-4 text-[#2C5234]" />
            <span>You're on the list. Welcome to LUMÉRA.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full px-4 py-3.5 bg-[#FAF9F5] border border-[#DCD5C9] text-xs text-[#191919] placeholder-[#9E988F] focus:outline-hidden focus:border-[#191919] transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[10px] text-[#A39E94] mt-4 tracking-wider uppercase">
          Zero spam. Unsubscribe with one click anytime.
        </p>
      </div>
    </section>
  );
}
