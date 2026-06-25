"use client";

import React, { useState, use, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { PRODUCTS, Product } from "../../../data/products";
import { useStore } from "../../../context/StoreContext";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart, isInCart } = useStore();

  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === resolvedParams.id) || PRODUCTS[0];
  }, [resolvedParams.id]);

  // Gallery and Tab states
  const [activeImage, setActiveImage] = useState(product.images[0] || product.image);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [licenseType, setLicenseType] = useState<"personal" | "extended">("extended");

  // Handle cart addition
  const handleAddToCart = () => {
    addToCart(product);
  };

  // Handle buy now
  const handleBuyNow = () => {
    addToCart(product);
    router.push("/checkout");
  };

  // Find related products (excluding current one, matching same category)
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4)
      .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
      .slice(0, 4);
  }, [product]);

  const price = licenseType === "extended" ? product.price : parseFloat((product.price * 0.55).toFixed(2));

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background selection:bg-primary/30">
      <Navbar />

      <main className="max-w-container-max mx-auto px-margin-desktop py-12 w-full flex-grow">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 font-label-md text-label-md text-on-surface-variant text-sm">
          <Link href="/" className="hover:text-primary transition-colors">
            Marketplace
          </Link>
          <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
          <Link href={`/browse?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
          <span className="text-on-surface truncate max-w-xs md:max-w-md">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Image Gallery & Tabs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden border border-outline-variant bg-surface-container aspect-video relative group">
              <img
                className="w-full h-full object-cover"
                alt={product.title}
                src={activeImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    className={`rounded-lg overflow-hidden border bg-surface-container aspect-square transition-all ${
                      activeImage === imgSrc ? "border-2 border-primary" : "border-outline-variant hover:border-primary/50"
                    }`}
                    onClick={() => setActiveImage(imgSrc)}
                  >
                    <img className="w-full h-full object-cover" alt={`${product.title} view ${idx + 1}`} src={imgSrc} />
                  </button>
                ))}
              </div>
            )}

            {/* Tabs Section */}
            <div className="mt-12 border-b border-outline-variant">
              <div className="flex gap-8">
                <button
                  className={`pb-4 font-label-md text-label-md transition-colors relative ${
                    activeTab === "description" ? "text-primary font-bold border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`pb-4 font-label-md text-label-md transition-colors relative ${
                    activeTab === "specs" ? "text-primary font-bold border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  onClick={() => setActiveTab("specs")}
                >
                  Specifications
                </button>
                <button
                  className={`pb-4 font-label-md text-label-md transition-colors relative ${
                    activeTab === "reviews" ? "text-primary font-bold border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews ({product.reviewsCount})
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="py-8 min-h-[250px]">
              {activeTab === "description" && (
                <div className="space-y-6">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Advanced Performance for Modern Apps</h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    {product.fullDescription}
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 pt-4">
                    <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-low">
                      <span className="material-symbols-outlined text-primary mb-3 text-3xl">bolt</span>
                      <h3 className="font-label-md text-label-md text-on-surface mb-2 font-semibold">Zero-Latency Rendering</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Optimized for processing high workloads and dynamic elements without UI lag.</p>
                    </div>
                    <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-low">
                      <span className="material-symbols-outlined text-primary mb-3 text-3xl">palette</span>
                      <h3 className="font-label-md text-label-md text-on-surface mb-2 font-semibold">Fully Customizable</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Extensive variables and clean code structures that align perfectly with your project needs.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "specs" && (
                <table className="w-full text-left font-body-md text-body-md border-collapse">
                  <tbody>
                    <tr className="border-b border-outline-variant">
                      <th className="py-4 font-label-md text-on-surface w-1/3 font-semibold">Framework Support</th>
                      <td className="py-4 text-on-surface-variant">{product.techStack.join(" / ")}</td>
                    </tr>
                    <tr className="border-b border-outline-variant">
                      <th className="py-4 font-label-md text-on-surface font-semibold">Category</th>
                      <td className="py-4 text-on-surface-variant">{product.category}</td>
                    </tr>
                    <tr className="border-b border-outline-variant">
                      <th className="py-4 font-label-md text-on-surface font-semibold">Version</th>
                      <td className="py-4 text-on-surface-variant">v{product.version}</td>
                    </tr>
                    <tr className="border-b border-outline-variant">
                      <th className="py-4 font-label-md text-on-surface font-semibold">Downloads</th>
                      <td className="py-4 text-on-surface-variant">{product.downloadsCount} installs</td>
                    </tr>
                    <tr>
                      <th className="py-4 font-label-md text-on-surface font-semibold">Developer</th>
                      <td className="py-4 text-on-surface-variant">{product.developer}</td>
                    </tr>
                  </tbody>
                </table>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                    <div>
                      <div className="flex items-center gap-1 text-warning">
                        <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                        <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                        <span className="ml-2 font-headline-sm text-on-surface font-semibold text-lg">{product.rating} / 5</span>
                      </div>
                      <p className="text-on-surface-variant font-label-md text-sm mt-1">Based on {product.reviewsCount} verified purchases</p>
                    </div>
                    <button className="px-6 py-3 rounded-lg border border-primary text-primary font-label-md hover:bg-primary/10 transition-all font-semibold text-sm">
                      Write a Review
                    </button>
                  </div>
                  {/* Review 1 */}
                  <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-low">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[12px] font-bold">AJ</div>
                        <span className="font-label-md text-on-surface font-medium">Alex Jensen</span>
                      </div>
                      <span className="text-on-surface-variant text-[12px]">2 days ago</span>
                    </div>
                    <p className="text-body-md text-on-surface-variant">
                      Exceptional quality. The codebase is remarkably clean and the documentation saved us weeks of work. Truly worth the premium price tag.
                    </p>
                  </div>
                  {/* Review 2 */}
                  <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-low">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[12px] font-bold">ML</div>
                        <span className="font-label-md text-on-surface font-medium">Marcus Liang</span>
                      </div>
                      <span className="text-on-surface-variant text-[12px]">1 week ago</span>
                    </div>
                    <p className="text-body-md text-on-surface-variant">
                      Highly responsive layout and extremely modular components. We easily integrated it with our existing API. Outstanding performance.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Purchase Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="p-8 rounded-xl border border-outline-variant bg-surface-container space-y-6 shadow-2xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {product.bestseller && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20">
                      Bestseller
                    </span>
                  )}
                  {product.statusLabel && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-success/10 text-success border border-success/20">
                      {product.statusLabel}
                    </span>
                  )}
                </div>
                <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">{product.title}</h1>
                <p className="text-on-surface-variant font-body-sm text-sm">
                  Created by <span className="text-primary hover:underline cursor-pointer font-medium">{product.developer}</span>
                </p>
              </div>

              {/* Price section */}
              <div className="py-4 border-y border-outline-variant/30">
                <div className="flex items-baseline gap-2">
                  <span className="font-display-lg text-display-lg-mobile text-on-surface font-extrabold text-3xl">
                    ${price.toFixed(2)}
                  </span>
                  {licenseType === "extended" && (
                    <span className="text-on-surface-variant font-body-md line-through text-sm">
                      ${(product.price * 1.3).toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-success mt-1 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[14px]">local_offer</span>
                  Save 25% for a limited time
                </p>
              </div>

              {/* License Selectors */}
              <div className="space-y-3">
                <div 
                  onClick={() => setLicenseType("extended")}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    licenseType === "extended" 
                      ? "bg-surface border-primary" 
                      : "bg-transparent border-outline-variant hover:border-primary/50"
                  }`}
                >
                  <span className={`material-symbols-outlined ${licenseType === "extended" ? "text-primary" : "text-on-surface-variant"} mt-0.5`}>
                    {licenseType === "extended" ? "radio_button_checked" : "radio_button_unchecked"}
                  </span>
                  <div>
                    <p className="text-label-md font-bold text-on-surface text-sm">Extended License</p>
                    <p className="text-[12px] text-on-surface-variant">Unlimited projects & priority developer support</p>
                  </div>
                </div>

                <div 
                  onClick={() => setLicenseType("personal")}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    licenseType === "personal" 
                      ? "bg-surface border-primary" 
                      : "bg-transparent border-outline-variant hover:border-primary/50"
                  }`}
                >
                  <span className={`material-symbols-outlined ${licenseType === "personal" ? "text-primary" : "text-on-surface-variant"} mt-0.5`}>
                    {licenseType === "personal" ? "radio_button_checked" : "radio_button_unchecked"}
                  </span>
                  <div>
                    <p className="text-label-md font-bold text-on-surface text-sm">Personal License</p>
                    <p className="text-[12px] text-on-surface-variant">Single project, self-support deployment</p>
                  </div>
                </div>
              </div>

              {/* Purchase triggers */}
              <div className="flex flex-col gap-3 pt-2">
                <button 
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-primary text-on-primary font-label-md font-bold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                >
                  Buy Now
                </button>
                <button 
                  onClick={handleAddToCart}
                  disabled={isInCart(product.id)}
                  className={`w-full py-4 font-label-md font-bold rounded-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 border ${
                    isInCart(product.id)
                      ? "bg-surface-container border-outline-variant text-success cursor-default"
                      : "bg-surface border-outline-variant text-on-surface hover:bg-surface-variant"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isInCart(product.id) ? "check" : "shopping_cart"}
                  </span>
                  {isInCart(product.id) ? "In Cart" : "Add to Cart"}
                </button>
              </div>

              {/* Secure Trust details */}
              <div className="pt-4 grid grid-cols-3 gap-2 text-center text-on-surface-variant border-t border-outline-variant/30">
                <div className="space-y-1">
                  <span className="material-symbols-outlined text-[20px] text-primary">download</span>
                  <p className="text-[10px] font-label-sm uppercase tracking-wider">Instant</p>
                </div>
                <div className="space-y-1">
                  <span className="material-symbols-outlined text-[20px] text-primary">update</span>
                  <p className="text-[10px] font-label-sm uppercase tracking-wider">Lifetime</p>
                </div>
                <div className="space-y-1">
                  <span className="material-symbols-outlined text-[20px] text-primary">support_agent</span>
                  <p className="text-[10px] font-label-sm uppercase tracking-wider">24/7 Help</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Related Digital Assets</h2>
            <Link href="/browse" className="text-primary font-label-md flex items-center gap-2 group hover:underline text-sm font-semibold">
              View all items
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {relatedProducts.map((relatedProd) => (
              <div key={relatedProd.id} className="rounded-xl border border-outline-variant bg-surface-container overflow-hidden group hover:border-primary/50 hover-lift transition-all flex flex-col justify-between">
                <div className="aspect-video relative overflow-hidden bg-surface-container-high shrink-0">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={relatedProd.title} src={relatedProd.image} />
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${relatedProd.id}`} className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors line-clamp-1 font-semibold block" title={relatedProd.title}>
                      {relatedProd.title}
                    </Link>
                    <p className="text-[12px] text-on-surface-variant">{relatedProd.category}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30">
                    <span className="text-primary font-bold text-label-md">${relatedProd.price}</span>
                    <button 
                      onClick={() => addToCart(relatedProd)}
                      disabled={isInCart(relatedProd.id)}
                      className={`p-2 rounded-lg transition-all ${
                        isInCart(relatedProd.id) 
                          ? "bg-surface-container text-success cursor-default" 
                          : "bg-surface-variant/50 hover:bg-primary hover:text-on-primary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isInCart(relatedProd.id) ? "check" : "add_shopping_cart"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full pt-16 pb-10 bg-surface-container-lowest border-t border-outline-variant mt-24">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter mb-12">
          <div className="space-y-4">
            <span className="font-display-lg text-headline-sm text-on-surface font-bold tracking-tight block">MediaBundle</span>
            <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
              The premium marketplace for world-class digital assets. Built for creators who demand excellence and performance.
            </p>
          </div>
          <div>
            <h4 className="font-label-md text-on-surface uppercase tracking-widest text-[11px] font-bold mb-4">Marketplace</h4>
            <nav className="flex flex-col gap-2 font-body-sm text-body-sm">
              <Link className="text-text-secondary hover:text-on-surface transition-colors" href="/browse">Browse Assets</Link>
              <Link className="text-text-secondary hover:text-on-surface transition-colors" href="/browse?sort=new">New Releases</Link>
              <Link className="text-text-secondary hover:text-on-surface transition-colors" href="/browse?bestsellers=true">Best Sellers</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-label-md text-on-surface uppercase tracking-widest text-[11px] font-bold mb-4">Resources</h4>
            <nav className="flex flex-col gap-2 font-body-sm text-body-sm">
              <a className="text-text-secondary hover:text-on-surface transition-colors" href="#">Licenses</a>
              <a className="text-text-secondary hover:text-on-surface transition-colors" href="#">Documentation</a>
              <Link className="text-text-secondary hover:text-on-surface transition-colors" href="/dashboard">Help Center</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-label-md text-on-surface uppercase tracking-widest text-[11px] font-bold mb-4">Stay Updated</h4>
            <p className="text-body-sm text-text-secondary mb-3">Get the latest assets delivered to your inbox.</p>
            <div className="flex gap-2">
              <input className="bg-surface-container border border-outline-variant rounded-lg px-4 py-2 text-body-sm w-full focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-on-surface" placeholder="email@example.com" type="email"/>
              <button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md hover:brightness-110 transition-all text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center text-text-secondary font-body-sm text-body-sm gap-4">
          <span>© {new Date().getFullYear()} MediaBundle. All rights reserved.</span>
          <div className="flex gap-6">
            <a className="hover:text-on-surface" href="#">Privacy</a>
            <a className="hover:text-on-surface" href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
