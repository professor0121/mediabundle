"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useStore } from "../../context/StoreContext";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { purchasedAssets, orders } = useStore();

  // Tab state (purchased, history, requests)
  const [activeTab, setActiveTab] = useState<"purchased" | "history" | "requests">("purchased");
  
  // Custom request form states
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDesc, setRequestDesc] = useState("");
  const [requestBudget, setRequestBudget] = useState("medium");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Copy License Key states
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Sync tab state from query parameter
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "history" || tabParam === "requests" || tabParam === "purchased") {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  // Calculations
  const totalValueSpent = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.amount, 0);
  }, [orders]);

  const handleCopyLicenseKey = (prodId: string) => {
    const fakeKey = `MB-LIC-${prodId.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    navigator.clipboard.writeText(fakeKey).then(() => {
      setCopiedKeyId(prodId);
      setTimeout(() => {
        setCopiedKeyId(null);
      }, 2000);
    });
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestTitle || !requestDesc) return;

    setIsSubmittingRequest(true);
    setTimeout(() => {
      setIsSubmittingRequest(false);
      setRequestSuccess(true);
      setRequestTitle("");
      setRequestDesc("");
      setTimeout(() => {
        setRequestSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-on-background selection:bg-primary/30">
      
      {/* SideNavBar Anchor */}
      <aside className="w-full md:w-64 bg-surface-container border-b md:border-b-0 md:border-r border-outline-variant flex flex-col p-stack-md space-y-stack-sm md:h-screen md:sticky md:top-0 z-40 shrink-0">
        <div className="flex items-center space-x-3 px-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined">dashboard</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-primary text-base leading-tight">Admin Console</h1>
            <p className="text-[11px] font-label-sm text-text-secondary uppercase tracking-wider">Client Workspace</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <Link 
            href="/"
            className="flex items-center space-x-3 px-3 py-2.5 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-all duration-200 rounded-lg group"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span className="font-label-md text-label-md text-sm">Marketplace Home</span>
          </Link>
          
          <button 
            onClick={() => setActiveTab("purchased")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              activeTab === "purchased" 
                ? "bg-primary-container text-on-primary-container font-semibold" 
                : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">folder_open</span>
            <span className="font-label-md text-label-md text-sm">My Library</span>
          </button>

          <button 
            onClick={() => setActiveTab("history")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              activeTab === "history" 
                ? "bg-primary-container text-on-primary-container font-semibold" 
                : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">payments</span>
            <span className="font-label-md text-label-md text-sm">Order History</span>
          </button>

          <button 
            onClick={() => setActiveTab("requests")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              activeTab === "requests" 
                ? "bg-primary-container text-on-primary-container font-semibold" 
                : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">code</span>
            <span className="font-label-md text-label-md text-sm">Custom Request</span>
          </button>
        </nav>

        <button 
          onClick={() => setActiveTab("requests")}
          className="w-full bg-primary text-on-primary font-label-md font-bold py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all text-sm shadow-md shadow-primary/10"
        >
          Custom Project
        </button>

        <div className="pt-4 border-t border-outline-variant/65 space-y-1 text-sm">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-on-surface-variant hover:text-on-surface transition-all duration-200">
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span className="font-label-md text-label-md">Support</span>
          </a>
          <Link href="/" className="flex items-center space-x-3 px-3 py-2 text-on-surface-variant hover:text-on-surface transition-all duration-200">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span className="font-label-md text-label-md">Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 min-h-screen flex flex-col justify-between overflow-x-hidden">
        <div className="space-y-10">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-outline-variant/30 pb-6">
            <div>
              <h2 className="font-display-lg text-3xl font-extrabold text-primary tracking-tight">Your Library</h2>
              <p className="text-body-md text-text-secondary mt-1">Manage your purchased assets, licenses, and order history.</p>
            </div>
            <div className="bg-surface-container border border-outline-variant px-4 py-2 rounded-lg flex items-center space-x-2 shrink-0">
              <span className="material-symbols-outlined text-primary text-[20px]">download_done</span>
              <span className="font-label-md text-sm font-semibold">{purchasedAssets.length} Assets Owned</span>
            </div>
          </header>

          {/* Stats Bento Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="glass-panel p-6 rounded-xl space-y-3 hover:border-primary/30 transition-all">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                </div>
                <span className="text-success text-[11px] font-bold bg-success/10 px-2 py-0.5 rounded-full">Active Account</span>
              </div>
              <div>
                <h3 className="text-text-secondary font-label-md text-xs uppercase tracking-wider font-semibold">Total Orders</h3>
                <p className="text-2xl font-bold text-on-surface mt-1">{orders.length}</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl space-y-3 hover:border-primary/30 transition-all">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">payments</span>
                </div>
                <span className="text-primary text-[11px] font-bold bg-primary/10 px-2 py-0.5 rounded-full">Top Buyer</span>
              </div>
              <div>
                <h3 className="text-text-secondary font-label-md text-xs uppercase tracking-wider font-semibold">Total Invested</h3>
                <p className="text-2xl font-bold text-on-surface mt-1">${totalValueSpent.toFixed(2)}</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl space-y-3 hover:border-primary/30 transition-all">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">history</span>
                </div>
              </div>
              <div>
                <h3 className="text-text-secondary font-label-md text-xs uppercase tracking-wider font-semibold">Recent Activity</h3>
                <p className="text-sm text-on-surface mt-2 font-medium">Last session active just now</p>
              </div>
            </div>
          </section>

          {/* Tab Navigation */}
          <div className="flex gap-6 border-b border-outline-variant">
            <button
              onClick={() => setActiveTab("purchased")}
              className={`pb-4 font-label-md text-sm transition-all relative ${
                activeTab === "purchased" ? "text-primary font-bold border-b-2 border-primary" : "text-text-secondary hover:text-on-surface"
              }`}
            >
              Purchased Assets
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-4 font-label-md text-sm transition-all relative ${
                activeTab === "history" ? "text-primary font-bold border-b-2 border-primary" : "text-text-secondary hover:text-on-surface"
              }`}
            >
              Order History
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`pb-4 font-label-md text-sm transition-all relative ${
                activeTab === "requests" ? "text-primary font-bold border-b-2 border-primary" : "text-text-secondary hover:text-on-surface"
              }`}
            >
              Custom Requests
            </button>
          </div>

          {/* Dynamic Tab Contents */}
          <div className="min-h-[300px]">
            {/* Tab: Purchased Assets */}
            {activeTab === "purchased" && (
              purchasedAssets.length === 0 ? (
                <div className="glass-panel p-16 rounded-xl text-center space-y-4">
                  <span className="material-symbols-outlined text-outline text-5xl">inventory_2</span>
                  <h3 className="font-headline-sm text-headline-sm text-text-primary">No assets purchased yet</h3>
                  <p className="font-body-md text-text-secondary max-w-sm mx-auto">
                    Browse our premium catalog of WordPress themes, core plugins, and landing pages to populate your library.
                  </p>
                  <Link
                    href="/browse"
                    className="inline-block bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-sm font-bold hover:brightness-110 transition-all"
                  >
                    Go to Marketplace
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                  {purchasedAssets.map((asset) => (
                    <div key={asset.id} className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden hover:border-primary transition-all duration-300 flex flex-col">
                      <div className="aspect-[16/9] w-full relative overflow-hidden bg-surface-container-high shrink-0">
                        <img className="w-full h-full object-cover" alt={asset.title} src={asset.image} />
                        <div className="absolute top-2 right-2">
                          <span className="bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full text-label-sm font-label-sm text-primary uppercase text-[10px] font-bold">
                            {asset.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-headline-sm text-body-lg font-semibold text-on-surface leading-tight line-clamp-1" title={asset.title}>
                              {asset.title}
                            </h4>
                            <span className="text-primary font-bold text-sm shrink-0">${asset.price}</span>
                          </div>
                          <p className="text-body-sm text-text-secondary line-clamp-2 text-sm mt-1">
                            {asset.description}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-outline-variant flex items-center justify-between mt-auto">
                          <button 
                            onClick={() => handleCopyLicenseKey(asset.id)}
                            className="flex items-center space-x-1.5 text-primary hover:brightness-125 transition-all text-xs font-semibold"
                          >
                            <span className="material-symbols-outlined text-[16px]">key</span>
                            <span>{copiedKeyId === asset.id ? "Key Copied!" : "License Key"}</span>
                          </button>
                          
                          <a 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Mocking download of file package: ${asset.id}-v${asset.version}.zip`);
                            }}
                            className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md hover:brightness-110 transition-all flex items-center space-x-1.5 text-xs font-bold"
                          >
                            <span className="material-symbols-outlined text-[16px]">download</span>
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* Tab: Order History */}
            {activeTab === "history" && (
              orders.length === 0 ? (
                <div className="glass-panel p-16 rounded-xl text-center space-y-4">
                  <span className="material-symbols-outlined text-outline text-5xl">receipt_long</span>
                  <h3 className="font-headline-sm text-headline-sm text-text-primary">No orders placed yet</h3>
                  <p className="font-body-md text-text-secondary max-w-sm mx-auto">
                    Your invoice transactions and billing history will appear here once you make a purchase.
                  </p>
                </div>
              ) : (
                <div className="glass-panel rounded-xl overflow-hidden overflow-x-auto border border-outline-variant">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-outline-variant bg-surface-container-high/40">
                        <th className="p-4 font-label-md text-xs text-text-secondary uppercase tracking-widest font-bold">Order ID</th>
                        <th className="p-4 font-label-md text-xs text-text-secondary uppercase tracking-widest font-bold">Date</th>
                        <th className="p-4 font-label-md text-xs text-text-secondary uppercase tracking-widest font-bold">Status</th>
                        <th className="p-4 font-label-md text-xs text-text-secondary uppercase tracking-widest font-bold">Amount</th>
                        <th className="p-4 font-label-md text-xs text-text-secondary uppercase tracking-widest font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-surface-container/30 transition-colors group">
                          <td className="p-4">
                            <span className="font-label-md text-sm text-on-surface font-semibold">{order.id}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-body-sm text-sm text-text-secondary">{order.date}</span>
                          </td>
                          <td className="p-4">
                            <span className="px-3 py-1 rounded-full bg-success/10 text-success text-[11px] font-bold border border-success/20">
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-label-md text-sm text-on-surface font-semibold">${order.amount.toFixed(2)}</span>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => alert(`Mocking invoice PDF download for ${order.id}`)}
                              className="text-primary hover:underline text-xs font-semibold transition-all"
                            >
                              View Invoice
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

            {/* Tab: Custom Requests */}
            {activeTab === "requests" && (
              <div className="glass-panel p-8 rounded-xl max-w-2xl">
                <div className="mb-6">
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface">Submit Custom Development Request</h3>
                  <p className="font-body-sm text-sm text-text-secondary mt-1">
                    Need a custom WordPress plugin, a specific Next.js theme configuration, or database synchronization setup? Partner with our core team.
                  </p>
                </div>

                {requestSuccess && (
                  <div className="mb-6 p-4 rounded-lg bg-success/10 border border-success/30 text-success flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    <span>Your request has been successfully submitted! A technical manager will email you within 24 hours.</span>
                  </div>
                )}

                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-text-secondary text-xs uppercase tracking-wider font-semibold px-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={requestTitle}
                      onChange={(e) => setRequestTitle(e.target.value)}
                      className="bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                      placeholder="e.g., Headless WordPress Sync Plugin"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-text-secondary text-xs uppercase tracking-wider font-semibold px-1">Technical Requirements & Scope</label>
                    <textarea
                      rows={5}
                      required
                      value={requestDesc}
                      onChange={(e) => setRequestDesc(e.target.value)}
                      className="bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm resize-none"
                      placeholder="Describe the integration details, database scale, expected features..."
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-text-secondary text-xs uppercase tracking-wider font-semibold px-1">Approximate Budget (USD)</label>
                    <select
                      value={requestBudget}
                      onChange={(e) => setRequestBudget(e.target.value)}
                      className="bg-surface border border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm outline-none cursor-pointer"
                    >
                      <option value="low">Under $2,000</option>
                      <option value="medium">$2,000 - $5,000</option>
                      <option value="high">$5,000 - $15,000</option>
                      <option value="enterprise">Enterprise ($15,000+)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingRequest}
                    className="bg-primary text-on-primary font-label-md font-bold px-6 py-3.5 rounded-lg hover:brightness-110 active:scale-98 transition-all disabled:opacity-40 text-sm flex items-center gap-2"
                  >
                    {isSubmittingRequest ? (
                      <>
                        <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        <span>Submit Request</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Footer info for dashboard page */}
        <footer className="pt-12 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center text-text-secondary font-body-sm text-xs gap-4 mt-16">
          <span>© {new Date().getFullYear()} MediaBundle. All rights reserved.</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-on-surface transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-background text-on-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
