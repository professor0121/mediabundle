"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { PRODUCTS } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function Home() {
  const { addToCart, isInCart } = useStore();
  
  // Show first 4 products on the home page
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-glow -z-10"></div>
        <div className="max-w-container-max mx-auto px-margin-desktop text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary/20 text-primary font-label-sm text-label-sm uppercase tracking-wider mb-stack-lg animate-fade-in">
            Marketplace v2.4 Live
          </div>
          <h1 className="font-display-lg text-display-lg text-text-primary max-w-4xl mx-auto mb-stack-md tracking-tight leading-tight">
            Premium WordPress Themes, Plugins, and Custom Web Solutions
          </h1>
          <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto mb-stack-lg">
            The ultimate technical toolkit for developers and agencies. Build faster with curated assets designed for high-performance enterprise applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-stack-md">
            <Link 
              href="/browse" 
              className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-label-md font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 text-center"
            >
              Explore Assets
            </Link>
            <Link 
              href="/dashboard?tab=requests" 
              className="w-full sm:w-auto bg-surface border border-outline-variant text-on-surface px-8 py-4 rounded-lg font-label-md text-label-md font-bold hover:bg-surface-container-high transition-all active:scale-95 text-center"
            >
              Start Custom Build
            </Link>
          </div>
        </div>
      </header>

      {/* Trust Strip */}
      <section className="border-y border-outline-variant bg-surface-container-low py-10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
            <div>
              <div className="font-headline-md text-headline-md text-primary mb-1">2.4M+</div>
              <div className="font-label-md text-label-md text-text-secondary uppercase tracking-widest text-[11px]">Active Installs</div>
            </div>
            <div>
              <div className="font-headline-md text-headline-md text-primary mb-1">150+</div>
              <div className="font-label-md text-label-md text-text-secondary uppercase tracking-widest text-[11px]">Expert Creators</div>
            </div>
            <div>
              <div className="font-headline-md text-headline-md text-primary mb-1">4.9/5</div>
              <div className="font-label-md text-label-md text-text-secondary uppercase tracking-widest text-[11px]">Customer Rating</div>
            </div>
            <div>
              <div className="font-headline-md text-headline-md text-primary mb-1">24/7</div>
              <div className="font-label-md text-label-md text-text-secondary uppercase tracking-widest text-[11px]">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tiles (Bento Style) */}
      <section className="py-20 max-w-container-max mx-auto w-full px-margin-desktop">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-stack-lg gap-4">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-text-primary mb-2">Browse by Ecosystem</h2>
            <p className="font-body-md text-body-md text-text-secondary">Explore dedicated solutions for every project scale.</p>
          </div>
          <Link href="/browse" className="text-primary font-label-md text-label-md flex items-center hover:underline group">
            View all categories 
            <span className="material-symbols-outlined ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>

        <div className="bento-grid">
          {/* Main Large Bento Card */}
          <div className="col-span-12 lg:col-span-8 h-[360px] glass-card rounded-xl overflow-hidden relative group hover-lift">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10"></div>
            <img 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              alt="Data center server racks glowing in indigo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXnASRTniQvCCYOXDoHeuRrt5S_FIx3hPsFJ3N3mImgvc1rhl-n6FFiLgtLfhf29EpUnU6-K5xcgqM8iVGBOIQ_O5cbWobp2bOvoBuNCmM7Mh7i-MNoEfzkIAqVKpD51qr-QNz4bH3nUy_CJWB9UNUPfNXo1ZZ_NghzVJ1P3QMkFegdtJV4ev2uL210X8TUmn1hOWNkgOmLHmZwbnQv2SBG7SrkK7MDb-rmhVL3gMm_h5HHf1NDylrqtH65ycApW_veipGtA3KEaSe"
            />
            <div className="absolute bottom-0 left-0 p-stack-lg z-20">
              <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-3 inline-block">
                Best Seller
              </span>
              <h3 className="font-headline-md text-headline-md text-text-primary mb-2">Enterprise Themes</h3>
              <p className="font-body-md text-body-md text-text-secondary max-w-md">
                Scalable, accessible, and SEO-optimized foundations for modern corporations and startups.
              </p>
            </div>
          </div>

          {/* Secondary Bento Card */}
          <Link href="/browse?category=Core Plugins" className="col-span-12 md:col-span-6 lg:col-span-4 h-[360px] glass-card rounded-xl p-stack-lg flex flex-col justify-end relative group hover-lift overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent -z-10 group-hover:scale-105 transition-transform duration-500"></div>
            <div className="mb-auto flex items-start justify-between">
              <span className="material-symbols-outlined text-primary text-4xl">extension</span>
              <span className="material-symbols-outlined text-outline text-xl group-hover:text-primary transition-colors">north_east</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary mb-2">Core Plugins</h3>
              <p className="font-body-sm text-body-sm text-text-secondary">
                Extend functionality with vetted, high-performance database, sync, and security extensions.
              </p>
            </div>
          </Link>

          {/* 3 Small Bento Cards */}
          <Link href="/browse?category=Icons %26 3D" className="col-span-12 md:col-span-6 lg:col-span-4 h-[260px] glass-card rounded-xl p-stack-lg flex flex-col justify-between group hover-lift">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary text-3xl">brush</span>
              <span className="material-symbols-outlined text-outline text-xl group-hover:text-primary transition-colors">north_east</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary mb-2">3D Icon Packs</h3>
              <p className="font-body-sm text-body-sm text-text-secondary">
                Rendered transparent glassmorphic vectors for startups.
              </p>
            </div>
          </Link>

          <Link href="/dashboard?tab=requests" className="col-span-12 md:col-span-6 lg:col-span-4 h-[260px] glass-card rounded-xl p-stack-lg flex flex-col justify-between group hover-lift border-primary/30">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary text-3xl">code</span>
              <span className="material-symbols-outlined text-outline text-xl group-hover:text-primary transition-colors">north_east</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary mb-2">Custom Build</h3>
              <p className="font-body-sm text-body-sm text-text-secondary">
                Partner with our core software engineers for bespoke integrations.
              </p>
            </div>
          </Link>

          <Link href="/browse?category=Landing Pages" className="col-span-12 md:col-span-6 lg:col-span-4 h-[260px] glass-card rounded-xl p-stack-lg flex flex-col justify-between group hover-lift">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary text-3xl">web</span>
              <span className="material-symbols-outlined text-outline text-xl group-hover:text-primary transition-colors">north_east</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-text-primary mb-2">Landing Pages</h3>
              <p className="font-body-sm text-body-sm text-text-secondary">
                High-conversion landing page funnels and campaign templates.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-desktop w-full">
          <div className="flex items-center justify-between mb-stack-lg">
            <h2 className="font-headline-sm text-headline-sm text-text-primary">Featured Assets</h2>
            <Link 
              href="/browse" 
              className="text-primary font-label-md text-label-md flex items-center hover:underline"
            >
              Explore Catalog 
              <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {featuredProducts.map((product) => {
              const inCart = isInCart(product.id);
              
              return (
                <div key={product.id} className="bg-surface rounded-xl border border-outline-variant overflow-hidden group hover-lift flex flex-col">
                  {/* Thumbnail */}
                  <div className="aspect-[16/9] relative overflow-hidden bg-surface-variant shrink-0">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt={product.title} 
                      src={product.image}
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className="bg-background/85 backdrop-blur-sm text-primary text-[10px] font-bold px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-stack-md flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1 gap-2">
                        <h4 className="font-headline-sm text-body-lg text-text-primary truncate font-semibold" title={product.title}>
                          {product.title}
                        </h4>
                        <span className="text-primary font-bold text-label-md shrink-0">${product.price}</span>
                      </div>
                      <p className="text-body-sm text-text-secondary mb-stack-md line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-outline-variant pt-stack-md mt-auto">
                      <Link href={`/product/${product.id}`} className="text-primary font-label-md text-label-md hover:underline">
                        View Details
                      </Link>
                      <button 
                        onClick={() => addToCart(product)}
                        disabled={inCart}
                        className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${
                          inCart 
                            ? "bg-surface-container text-success cursor-default" 
                            : "bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary"
                        }`}
                        title={inCart ? "In Cart" : "Add to Cart"}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {inCart ? "check" : "add_shopping_cart"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Solutions Promo */}
      <section className="py-24 max-w-container-max mx-auto w-full px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-gutter">
          <div className="order-2 lg:order-1 relative rounded-2xl border border-outline-variant overflow-hidden shadow-2xl h-[450px]">
            <img 
              className="w-full h-full object-cover" 
              alt="Engineers collaborating in a premium office setting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkXwJaZF7iFTdQdicYJ5yhkNB7_SU50Ge-1C5DrdnEg89lhN594riBDnEoPJ0UQWgZmwSGPjeOwr7w-VVD77UDuVS19udjvxRdpB7LuYsIE4CQ5UPJVXnVoPEKVKIdauTKzfErQ_IYSIB4mWXtyScjE8BM7R-ZXWiolsa-rkhmlrnSRXrjLjTTVfIAzESDocLWsgmFKmQyFV_j3HP1hT-tXhRbEGOuqPEkkhS04qnlRZ-2qZx9SQ8r4Diviza4X9vYEXrXwha8eWBP"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <span className="text-primary font-label-md text-label-md uppercase tracking-[0.2em] block">
              Bespoke Development
            </span>
            <h2 className="font-display-lg text-display-lg text-text-primary tracking-tight">
              Need something completely custom?
            </h2>
            <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed">
              Our engineering team specializes in high-performance WordPress headless architectures, custom plugin development, and global-scale infrastructure setup. We don't just sell themes; we build digital ecosystems.
            </p>
            <ul className="space-y-3 font-body-md text-body-md text-on-surface">
              <li className="flex items-center">
                <span className="material-symbols-outlined text-primary mr-3 text-[20px]">check_circle</span>
                <span>Headless WP with React / Next.js</span>
              </li>
              <li className="flex items-center">
                <span className="material-symbols-outlined text-primary mr-3 text-[20px]">check_circle</span>
                <span>Enterprise Security & Code Audits</span>
              </li>
              <li className="flex items-center">
                <span className="material-symbols-outlined text-primary mr-3 text-[20px]">check_circle</span>
                <span>Custom API & Third-party Integrations</span>
              </li>
            </ul>
            <Link 
              href="/dashboard?tab=requests"
              className="inline-block bg-primary text-on-primary px-8 py-4 rounded-lg font-label-md text-label-md font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 text-center"
            >
              Book a Technical Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full pt-16 pb-10 bg-surface-container-lowest border-t border-outline-variant mt-auto">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <span className="font-display-lg text-headline-sm text-on-surface font-bold tracking-tight block">
              MediaBundle
            </span>
            <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
              The premier destination for high-quality digital assets and bespoke web engineering. Empowering developers since 2018.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all">
                <span className="material-symbols-outlined text-[16px]">public</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all">
                <span className="material-symbols-outlined text-[16px]">terminal</span>
              </a>
              <a href="mailto:support@mediabundle.com" className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all">
                <span className="material-symbols-outlined text-[16px]">mail</span>
              </a>
            </div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h5 className="font-label-md text-label-md text-on-surface uppercase mb-4 tracking-wider text-[11px] font-bold">
              Marketplace
            </h5>
            <ul className="space-y-2 font-body-sm text-body-sm">
              <li><Link href="/browse" className="text-text-secondary hover:text-on-surface transition-colors">Browse Catalog</Link></li>
              <li><Link href="/browse?sort=new" className="text-text-secondary hover:text-on-surface transition-colors">Latest Releases</Link></li>
              <li><Link href="/browse?bestsellers=true" className="text-text-secondary hover:text-on-surface transition-colors">Best Sellers</Link></li>
              <li><Link href="/dashboard" className="text-text-secondary hover:text-on-surface transition-colors">Library & Support</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h5 className="font-label-md text-label-md text-on-surface uppercase mb-4 tracking-wider text-[11px] font-bold">
              Support
            </h5>
            <ul className="space-y-2 font-body-sm text-body-sm">
              <li><Link href="/dashboard" className="text-text-secondary hover:text-on-surface transition-colors">My Account</Link></li>
              <li><a href="#" className="text-text-secondary hover:text-on-surface transition-colors">Licensing Terms</a></li>
              <li><a href="#" className="text-text-secondary hover:text-on-surface transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-text-secondary hover:text-on-surface transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h5 className="font-label-md text-label-md text-on-surface uppercase mb-4 tracking-wider text-[11px] font-bold">
              Stay Updated
            </h5>
            <p className="font-body-sm text-body-sm text-text-secondary mb-3">
              Get the latest asset drops, tutorials, and technical guides.
            </p>
            <div className="flex border border-outline-variant rounded-lg overflow-hidden">
              <input 
                className="bg-surface border-none focus:ring-0 focus:outline-none text-body-sm flex-grow px-3 py-2 text-on-surface placeholder:text-outline/80" 
                placeholder="Email address" 
                type="email" 
              />
              <button className="bg-primary text-on-primary px-4 py-2 font-label-sm text-label-sm font-bold hover:brightness-110 active:scale-95 transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-container-max mx-auto px-margin-desktop pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center text-text-secondary font-body-sm text-body-sm gap-4">
          <span>© {new Date().getFullYear()} MediaBundle. All rights reserved.</span>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-on-surface transition-colors">Cookie Settings</a>
            <a href="#" className="hover:text-on-surface transition-colors">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
