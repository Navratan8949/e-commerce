import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowRight, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Bespoke Sizing & Styling Advice',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast("Thanks — we'll be in touch shortly.", 'success');
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#8C857B] font-medium block mb-2">
          Concierge Services
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#191919] font-light">
          Client Care & Private Consultations
        </h1>
        <p className="text-xs sm:text-sm text-[#736C62] mt-2 font-light max-w-xl">
          Whether you require bespoke measurement consultation, fabric swatches, or order tracking assistance, our team is at your disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Contact Form (Left) */}
        <div className="lg:col-span-7 bg-[#FAF9F5] border border-[#E8E4DC] p-6 sm:p-10 shadow-2xs">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#191919] text-[#FAF9F5] flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#191919]">
                Message Received
              </h3>
              <p className="text-xs text-[#555048] max-w-sm mx-auto leading-relaxed">
                Thanks — we'll be in touch shortly. A client care specialist will respond within 4 business hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'Bespoke Sizing & Styling Advice', message: '' });
                }}
                className="text-xs uppercase tracking-widest text-[#191919] underline pt-4"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. Maya Sengupta"
                    className="w-full px-3.5 py-3 bg-white border border-[#DCD5C9] text-xs text-[#191919] placeholder-[#9E988F] focus:outline-hidden focus:border-[#191919]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="maya@example.com"
                    className="w-full px-3.5 py-3 bg-white border border-[#DCD5C9] text-xs text-[#191919] placeholder-[#9E988F] focus:outline-hidden focus:border-[#191919]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1 font-medium">
                  Inquiry Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-3 bg-white border border-[#DCD5C9] text-xs text-[#191919] focus:outline-hidden focus:border-[#191919]"
                >
                  <option>Bespoke Sizing & Styling Advice</option>
                  <option>Order Status & Dispatch Tracking</option>
                  <option>Fabric Provenance & Care Inquiries</option>
                  <option>Press & Editorial Collaborations</option>
                  <option>General Concierge Query</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1 font-medium">
                  Message *
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="How may our atelier assist you?"
                  className="w-full px-3.5 py-3 bg-white border border-[#DCD5C9] text-xs text-[#191919] placeholder-[#9E988F] focus:outline-hidden focus:border-[#191919]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                Dispatch Inquiry
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Contact Coordinates & Details (Right) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#191919]">
              Atelier Coordinates
            </h3>

            <div className="space-y-4 text-xs text-[#555048]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#191919] block uppercase tracking-wider text-[11px]">Electronic Mail</strong>
                  <a href="mailto:concierge@lumera.studio" className="hover:underline">concierge@lumera.studio</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#191919] block uppercase tracking-wider text-[11px]">Private Desk Telephone</strong>
                  <span>+91 (022) 8401 9200</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#191919] block uppercase tracking-wider text-[11px]">Showroom & Flagship Atelier</strong>
                  <p>44 Heritage Lane, Colaba Arts Precinct</p>
                  <p>Mumbai, Maharashtra 400001, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#191919] block uppercase tracking-wider text-[11px]">Hours of Operation</strong>
                  <p>Monday – Saturday: 10:00 AM – 7:30 PM IST</p>
                  <p>Sunday: By Private Salon Appointment Only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ shortcut */}
          <div className="p-6 bg-[#F2EFEB] border border-[#E8E4DC] space-y-3">
            <h4 className="font-serif-luxury text-xl text-[#191919]">
              Have an urgent question?
            </h4>
            <p className="text-xs text-[#696359] leading-relaxed">
              Find instant answers regarding shipping timelines, complimentary returns, and sizing in our comprehensive knowledge base.
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#191919] font-semibold hover:underline"
            >
              Browse FAQ Guide
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
