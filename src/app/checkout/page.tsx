"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useStore } from "../../context/StoreContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, checkout, removeFromCart } = useStore();

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  
  // UI states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const processingFee = cart.length > 0 ? 2.50 : 0.00;
  const total = subtotal + processingFee;

  // Formatting Card Number: Groups of 4 digits
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted.substring(0, 19));
  };

  // Submit handler
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (cart.length === 0) {
      setErrorMsg("Your cart is empty. Please add items to your cart before checking out.");
      return;
    }

    if (!firstName || !lastName || !email) {
      setErrorMsg("Please complete all Customer Information fields.");
      return;
    }

    if (!cardHolder || !cardNumber || !expiry || !cvc) {
      setErrorMsg("Please complete all Payment Method fields.");
      return;
    }

    // Trigger mock loading state
    setIsProcessing(true);
    
    setTimeout(() => {
      const success = checkout({ firstName, lastName, email });
      setIsProcessing(false);
      if (success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard?tab=purchased");
        }, 2200);
      } else {
        setErrorMsg("Payment failed. Please check your credentials.");
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background selection:bg-primary/30">
      <Navbar />

      <main className="max-w-container-max mx-auto px-margin-desktop py-12 flex-grow w-full">
        {/* Success Overlay Modal */}
        {isSuccess && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in">
            <div className="glass-panel p-10 max-w-md w-full rounded-2xl text-center space-y-6 border border-primary/45 shadow-[0_0_50px_rgba(128,131,255,0.2)]">
              <div className="w-16 h-16 bg-success/20 border border-success/40 text-success rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <h2 className="font-headline-md text-2xl text-text-primary font-bold">Purchase Successful!</h2>
              <p className="font-body-md text-text-secondary">
                Thank you for your order. We are compiling your assets and redirecting you to your Library...
              </p>
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        )}

        {/* Processing Loader */}
        {isProcessing && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="glass-panel p-8 max-w-sm w-full rounded-xl text-center space-y-4">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="font-label-md text-on-surface font-semibold">Authorizing secure transaction...</p>
            </div>
          </div>
        )}

        {/* Page Title */}
        <div className="mb-stack-lg">
          <h1 className="font-display-lg text-3xl font-extrabold text-primary mb-2 tracking-tight">Secure Checkout</h1>
          <p className="font-body-md text-text-secondary">Complete your purchase and access your premium assets instantly.</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-lg bg-error/10 border border-error/30 text-error flex items-center gap-3 text-sm">
            <span className="material-symbols-outlined text-[20px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Billing & Payment forms */}
          <div className="lg:col-span-7 space-y-gutter">
            <section className="glass-panel p-base rounded-xl">
              <div className="flex items-center gap-stack-sm mb-stack-lg">
                <span className="material-symbols-outlined text-primary text-[24px]">person</span>
                <h2 className="font-headline-sm text-lg font-semibold text-text-primary">Customer Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-text-secondary text-xs px-1 uppercase tracking-wider font-semibold">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-text-secondary text-xs px-1 uppercase tracking-wider font-semibold">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                    placeholder="Doe"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="font-label-md text-text-secondary text-xs px-1 uppercase tracking-wider font-semibold">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                    placeholder="john.doe@example.com"
                  />
                </div>
              </div>
            </section>

            <section className="glass-panel p-base rounded-xl">
              <div className="flex items-center justify-between mb-stack-lg">
                <div className="flex items-center gap-stack-sm">
                  <span className="material-symbols-outlined text-primary text-[24px]">payments</span>
                  <h2 className="font-headline-sm text-lg font-semibold text-text-primary">Payment Method</h2>
                </div>
                <div className="flex gap-2 text-on-surface-variant opacity-60">
                  <span className="material-symbols-outlined text-xl">credit_card</span>
                  <span className="material-symbols-outlined text-xl">shield</span>
                </div>
              </div>
              
              <div className="space-y-stack-md">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-text-secondary text-xs px-1 uppercase tracking-wider font-semibold">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                    placeholder="Johnathan Doe"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-text-secondary text-xs px-1 uppercase tracking-wider font-semibold">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full bg-surface border border-outline-variant rounded-lg p-3 pr-12 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                      placeholder="0000 0000 0000 0000"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary text-[20px]">
                      credit_card
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-stack-md">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-text-secondary text-xs px-1 uppercase tracking-wider font-semibold">Expiry Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-text-secondary text-xs px-1 uppercase tracking-wider font-semibold">CVC</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ""))}
                      className="bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                      placeholder="•••"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-stack-lg pt-stack-md border-t border-outline-variant">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4.5 h-4.5 rounded border-outline-variant bg-surface text-primary-container focus:ring-primary focus:ring-offset-background"
                  />
                  <span className="font-body-sm text-sm text-on-surface-variant">
                    Securely save my card for future purchases
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-gutter sticky top-24">
            <div className="glass-panel rounded-xl overflow-hidden shadow-2xl">
              <div className="p-base border-b border-outline-variant bg-surface-container/60">
                <h3 className="font-headline-sm text-lg font-bold text-text-primary">Order Summary</h3>
              </div>

              {/* Cart items list */}
              {cart.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant font-body-sm space-y-2">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">shopping_cart_off</span>
                  <p>Your shopping cart is empty.</p>
                  <Link href="/browse" className="text-primary hover:underline text-sm font-semibold inline-block pt-1">
                    Go browse catalog
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-outline-variant max-h-[300px] overflow-y-auto custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="p-base flex gap-4 items-center justify-between group">
                      <div className="w-16 h-12 rounded overflow-hidden border border-outline-variant bg-surface shrink-0">
                        <img className="w-full h-full object-cover" alt={item.title} src={item.image} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-label-md text-on-surface text-sm truncate font-semibold">{item.title}</h4>
                        <p className="font-body-sm text-[12px] text-text-secondary">{item.category}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-label-md text-primary font-bold text-sm">${item.price}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pricing breakdown */}
              <div className="p-base bg-surface-container-low border-t border-outline-variant space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="text-on-surface font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Processing Fee</span>
                  <span className="text-on-surface font-semibold">${processingFee.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-outline-variant flex justify-between items-baseline">
                  <span className="text-on-surface font-bold text-base">Total</span>
                  <span className="text-primary font-display-lg text-xl font-extrabold">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <div className="p-base space-y-4">
                <button
                  onClick={handlePayment}
                  disabled={cart.length === 0}
                  className="w-full py-4 bg-primary text-on-primary font-label-md rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-bold disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-primary/20"
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                  Pay ${total.toFixed(2)} Now
                </button>

                <div className="flex flex-col items-center gap-3 border-t border-outline-variant/30 pt-4">
                  <p className="font-body-sm text-[12px] text-text-secondary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-success" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    Encrypted 256-bit SSL Connection
                  </p>
                  
                  {/* Trust icons */}
                  <div className="flex justify-center items-center gap-6 opacity-40 select-none">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">security</span>
                      <span className="font-label-sm uppercase tracking-wider text-[9px] font-bold">PCI-DSS</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span className="font-label-sm uppercase tracking-wider text-[9px] font-bold">Norton</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">shield</span>
                      <span className="font-label-sm uppercase tracking-wider text-[9px] font-bold">Stripe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-outline-variant bg-surface-container-lowest/50 text-center">
              <p className="font-body-sm text-[13px] text-on-surface-variant italic leading-relaxed">
                "Your transaction is 100% secure. You will receive an email with your download links and license keys immediately after payment."
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full pt-12 pb-8 border-t border-outline-variant bg-surface-container-lowest mt-24">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter mb-12">
          <div>
            <span className="font-headline-sm text-headline-sm text-on-surface mb-stack-sm block font-bold">MediaBundle</span>
            <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
              The curated marketplace for high-performance digital assets and technical design systems.
            </p>
          </div>
          <div>
            <h5 className="font-label-md text-primary mb-4 uppercase tracking-wider text-[11px] font-bold">Marketplace</h5>
            <ul className="space-y-2 font-body-sm text-body-sm text-text-secondary">
              <li><Link href="/browse" className="hover:text-on-surface transition-colors">Browse All</Link></li>
              <li><Link href="/browse?sort=new" className="hover:text-on-surface transition-colors">New Releases</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-label-md text-primary mb-4 uppercase tracking-wider text-[11px] font-bold">Support</h5>
            <ul className="space-y-2 font-body-sm text-body-sm text-text-secondary">
              <li><Link href="/dashboard" className="hover:text-on-surface transition-colors">Help Center</Link></li>
              <li><a href="#" className="hover:text-on-surface transition-colors">Refund Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-label-md text-primary mb-4 uppercase tracking-wider text-[11px] font-bold">Legal</h5>
            <ul className="space-y-2 font-body-sm text-body-sm text-text-secondary">
              <li><a href="#" className="hover:text-on-surface transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop mt-8 pt-8 border-t border-outline-variant/30 flex justify-between items-center text-text-secondary font-body-sm text-body-sm">
          <span>© {new Date().getFullYear()} MediaBundle. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary transition-colors">public</span>
            <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary transition-colors">rss_feed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
