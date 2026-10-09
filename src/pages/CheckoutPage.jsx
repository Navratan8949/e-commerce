import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Check, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatPrice } from '../lib/utils.js';
import ImageWithFallback from '../components/common/ImageWithFallback.jsx';

export default function CheckoutPage() {
  const { cart, subtotal, discountAmount, shippingFee, total, clearCart, appliedCoupon } = useCart();
  const { user, createOrder } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Steps: 1: Contact, 2: Delivery, 3: Payment, 4: Review
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Eleanor Vance',
    email: user?.email || 'eleanor.vance@fillkart.com',
    phone: user?.phone || '+91 98201 44521',
    address: user?.address || 'Penthouse 4B, The Imperial Heights, Worli Sea Face',
    city: user?.city || 'Mumbai',
    state: user?.state || 'Maharashtra',
    pincode: user?.pincode || '400018',
    paymentMethod: 'Credit / Debit Card',
    // Mock card fields
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '08/29',
    cardCvc: '•••',
    // Mock UPI fields
    upiId: 'eleanor@okhdfcbank'
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepNext = (step) => {
    // Basic validation
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        showToast('Please fill in all contact details.', 'error');
        return;
      }
    }
    if (step === 2) {
      if (!formData.address || !formData.city || !formData.pincode) {
        showToast('Please fill in all delivery details.', 'error');
        return;
      }
    }
    setCurrentStep(step + 1);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    setTimeout(() => {
      const order = createOrder({
        items: cart,
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        paymentMethod: formData.paymentMethod
      });

      clearCart();
      showToast('Order placed successfully!', 'success');
      navigate(`/order-success?orderId=${order.id}`);
    }, 600);
  };

  if (cart.length === 0) return null;

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Checkout Header */}
      <div className="border-b border-[#E8E4DC] pb-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] font-medium block mb-1">
            Secure Atelier Checkout
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#191919] font-light">
            Complete Your Acquisition
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#2C5234] bg-[#F2EEE6] px-3 py-1.5 border border-[#E0D9CC]">
          <ShieldCheck className="w-4 h-4" />
          <span>256-Bit Encrypted Secure Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left Column: Multi-Step Accordion Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Contact Information */}
          <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${
                  currentStep > 1 ? 'bg-[#2C5234] text-white' : 'bg-[#191919] text-white'
                }`}>
                  {currentStep > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
                </span>
                <h2 className="font-serif-luxury text-xl text-[#191919]">
                  Contact Information
                </h2>
              </div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs uppercase tracking-wider text-[#736C62] hover:text-[#191919] underline"
                >
                  Edit
                </button>
              )}
            </div>

            {currentStep === 1 ? (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1">
                    Full Name *
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1">
                      Email Address *
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
                      Phone Number *
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

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleStepNext(1)}
                    className="px-6 py-3 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-[#333333] transition-colors"
                  >
                    Continue to Delivery
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-xs text-[#555048] space-y-0.5 pt-1 font-light">
                <p><strong>{formData.fullName}</strong></p>
                <p>{formData.email} · {formData.phone}</p>
              </div>
            )}
          </div>

          {/* Step 2: Delivery Address */}
          <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${
                  currentStep > 2 ? 'bg-[#2C5234] text-white' : currentStep === 2 ? 'bg-[#191919] text-white' : 'bg-[#E5DFD5] text-[#777]'
                }`}>
                  {currentStep > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
                </span>
                <h2 className="font-serif-luxury text-xl text-[#191919]">
                  Delivery Address
                </h2>
              </div>
              {currentStep > 2 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs uppercase tracking-wider text-[#736C62] hover:text-[#191919] underline"
                >
                  Edit
                </button>
              )}
            </div>

            {currentStep === 2 ? (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#696359] mb-1">
                    Street Address / Residence *
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
                      City *
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
                      State *
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
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-[#DCD5C9] text-xs text-[#191919] font-mono focus:outline-hidden focus:border-[#191919]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleStepNext(2)}
                    className="px-6 py-3 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-[#333333] transition-colors"
                  >
                    Continue to Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-3 text-xs uppercase tracking-wider text-[#736C62]"
                  >
                    Back
                  </button>
                </div>
              </div>
            ) : currentStep > 2 ? (
              <div className="text-xs text-[#555048] space-y-0.5 pt-1 font-light">
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.state} — {formData.pincode}</p>
              </div>
            ) : null}
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-[#FAF9F5] border border-[#E8E4DC] p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${
                  currentStep > 3 ? 'bg-[#2C5234] text-white' : currentStep === 3 ? 'bg-[#191919] text-white' : 'bg-[#E5DFD5] text-[#777]'
                }`}>
                  {currentStep > 3 ? <Check className="w-3.5 h-3.5" /> : '3'}
                </span>
                <h2 className="font-serif-luxury text-xl text-[#191919]">
                  Payment Preference
                </h2>
              </div>
              {currentStep > 3 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-xs uppercase tracking-wider text-[#736C62] hover:text-[#191919] underline"
                >
                  Edit
                </button>
              )}
            </div>

            {currentStep === 3 ? (
              <div className="space-y-4 pt-2">
                {/* Payment radio cards */}
                <div className="space-y-3">
                  {/* Credit / Debit */}
                  <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                    formData.paymentMethod === 'Credit / Debit Card'
                      ? 'border-[#191919] bg-white ring-1 ring-[#191919]'
                      : 'border-[#DCD5C9] bg-[#FAF9F5]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit / Debit Card"
                      checked={formData.paymentMethod === 'Credit / Debit Card'}
                      onChange={handleChange}
                      className="mt-1 accent-[#191919]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#191919] uppercase tracking-wider">
                          Credit / Debit Card
                        </span>
                        <CreditCard className="w-4 h-4 text-[#736C62]" />
                      </div>
                      <p className="text-[11px] text-[#736C62] mt-0.5">
                        Visa, Mastercard, American Express, RuPay
                      </p>

                      {formData.paymentMethod === 'Credit / Debit Card' && (
                        <div className="mt-4 pt-3 border-t border-[#E8E4DC] space-y-3">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-[#696359] mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              className="w-full px-3 py-2 bg-[#F9F7F2] border border-[#DCD5C9] text-xs font-mono text-[#191919]"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] uppercase tracking-wider text-[#696359] mb-1">
                                Expiration (MM/YY)
                              </label>
                              <input
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-[#F9F7F2] border border-[#DCD5C9] text-xs font-mono text-[#191919]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-wider text-[#696359] mb-1">
                                CVC / CVV
                              </label>
                              <input
                                type="text"
                                name="cardCvc"
                                value={formData.cardCvc}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-[#F9F7F2] border border-[#DCD5C9] text-xs font-mono text-[#191919]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* UPI */}
                  <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                    formData.paymentMethod === 'UPI'
                      ? 'border-[#191919] bg-white ring-1 ring-[#191919]'
                      : 'border-[#DCD5C9] bg-[#FAF9F5]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={formData.paymentMethod === 'UPI'}
                      onChange={handleChange}
                      className="mt-1 accent-[#191919]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#191919] uppercase tracking-wider">
                          Instant UPI Transfer
                        </span>
                        <Smartphone className="w-4 h-4 text-[#736C62]" />
                      </div>
                      <p className="text-[11px] text-[#736C62] mt-0.5">
                        Google Pay, PhonePe, Paytm, BHIM UPI
                      </p>

                      {formData.paymentMethod === 'UPI' && (
                        <div className="mt-3 pt-3 border-t border-[#E8E4DC]">
                          <label className="block text-[10px] uppercase tracking-wider text-[#696359] mb-1">
                            UPI VPA / Handle
                          </label>
                          <input
                            type="text"
                            name="upiId"
                            value={formData.upiId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-[#F9F7F2] border border-[#DCD5C9] text-xs font-mono text-[#191919]"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                    formData.paymentMethod === 'Cash on Delivery'
                      ? 'border-[#191919] bg-white ring-1 ring-[#191919]'
                      : 'border-[#DCD5C9] bg-[#FAF9F5]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === 'Cash on Delivery'}
                      onChange={handleChange}
                      className="mt-1 accent-[#191919]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#191919] uppercase tracking-wider">
                          Cash on Delivery (COD)
                        </span>
                        <Banknote className="w-4 h-4 text-[#736C62]" />
                      </div>
                      <p className="text-[11px] text-[#736C62] mt-0.5">
                        Pay upon doorstep arrival with cash or UPI QR code
                      </p>
                    </div>
                  </label>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleStepNext(3)}
                    className="px-6 py-3 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-[#333333] transition-colors"
                  >
                    Review Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-3 text-xs uppercase tracking-wider text-[#736C62]"
                  >
                    Back
                  </button>
                </div>
              </div>
            ) : currentStep > 3 ? (
              <div className="text-xs text-[#555048] pt-1">
                <p>Selected Method: <strong className="text-[#191919]">{formData.paymentMethod}</strong></p>
              </div>
            ) : null}
          </div>

          {/* Step 4: Final Review & Confirmation */}
          {currentStep === 4 && (
            <div className="bg-[#FAF9F5] border border-[#191919] p-6 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#191919] text-white flex items-center justify-center text-xs font-mono">
                  4
                </span>
                <h2 className="font-serif-luxury text-xl text-[#191919]">
                  Review & Authorization
                </h2>
              </div>

              <p className="text-xs text-[#555048] leading-relaxed">
                By clicking "Authorize & Place Order", you confirm that your shipping details and order items are correct. You will receive an immediate confirmation email and SMS dispatch updates.
              </p>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full py-4 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333333] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isPlacingOrder ? 'Securing Acquisition...' : `Authorize & Place Order (${formatPrice(total)})`}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F5F2EB] border border-[#E8E4DC] p-6 sm:p-8 space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#191919] font-light border-b border-[#E8E4DC] pb-4">
              Acquisition Summary
            </h3>

            {/* Itemized Mini List */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-14 h-18 bg-[#EBE7DF] shrink-0 overflow-hidden">
                    <ImageWithFallback
                      src={item.product.images?.[0]}
                      alt={item.product.name}
                      aspectRatio="4/5"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-xs">
                    <h4 className="font-serif-luxury text-sm text-[#191919] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-[#736C62] mt-0.5 uppercase tracking-wider">
                      Size: {item.size} · {item.color?.name}
                    </p>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-[11px] text-[#8C857B]">Qty: {item.quantity}</span>
                      <span className="font-mono font-medium text-[#191919] tabular-nums">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Math */}
            <div className="pt-4 border-t border-[#E8E4DC] space-y-2 text-xs tracking-wider">
              <div className="flex justify-between text-[#696359]">
                <span>Subtotal</span>
                <span className="font-mono text-[#191919] tabular-nums font-medium">
                  {formatPrice(subtotal)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2C5234]">
                  <span>Promo Savings ({appliedCoupon?.code})</span>
                  <span className="font-mono tabular-nums font-medium">
                    -{formatPrice(discountAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-[#696359]">
                <span>Complimentary Delivery</span>
                <span className="font-mono text-[#191919] tabular-nums font-medium">
                  {shippingFee === 0 ? '₹0' : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-[#E8E4DC] flex justify-between items-baseline text-sm">
                <span className="uppercase tracking-[0.16em] font-medium text-[#191919]">
                  Total Payable
                </span>
                <span className="font-mono text-xl font-bold text-[#191919] tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-white border border-[#E0D9CC] text-[11px] text-[#696359] space-y-1">
              <strong className="text-[#191919] block uppercase tracking-wider">Signature Delivery:</strong>
              <p>Complimentary insurance, signature required upon delivery, packaged in recycled handmade archival gift box.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
