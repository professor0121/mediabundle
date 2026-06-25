"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "../context/StoreContext";

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/browse");
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center bg-surface-container border border-outline-variant rounded-lg px-4 py-2 w-80">
      <span className="material-symbols-outlined text-outline mr-2 text-[20px]">search</span>
      <input
        type="text"
        placeholder="Search templates..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent border-none focus:outline-none text-label-md w-full text-on-surface placeholder:text-outline/80"
      />
    </form>
  );
}

function MobileSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/browse");
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface-container border border-outline-variant rounded-lg px-4 py-2">
      <span className="material-symbols-outlined text-outline mr-2 text-[20px]">search</span>
      <input
        type="text"
        placeholder="Search templates..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent border-none focus:outline-none text-label-md w-full text-on-surface"
      />
    </form>
  );
}

export const Navbar: React.FC = () => {
  const { cart } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
      <div className="flex items-center justify-between px-margin-desktop py-4 max-w-container-max mx-auto">
        {/* Brand & Search */}
        <div className="flex items-center gap-8 flex-1 md:flex-none">
          <Link href="/" className="font-display-lg text-headline-sm font-bold text-primary tracking-tighter">
            MediaBundle
          </Link>
          
          {/* Search Bar Desktop */}
          <Suspense fallback={
            <div className="hidden md:flex items-center bg-surface-container border border-outline-variant rounded-lg px-4 py-2 w-80">
              <span className="material-symbols-outlined text-outline mr-2 text-[20px]">search</span>
              <span className="text-label-md text-outline/80">Search templates...</span>
            </div>
          }>
            <SearchBar />
          </Suspense>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/browse?category=Web Templates" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Themes
          </Link>
          <Link href="/browse?category=Core Plugins" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Plugins
          </Link>
          <Link href="/browse?category=Mobile Apps" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Websites
          </Link>
          <Link href="/browse?category=Landing Pages" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Landing Pages
          </Link>
          <Link href="/browse?category=Icons %26 3D" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            3D Designs
          </Link>
          <Link href="/dashboard?tab=requests" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            Custom Build
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface-variant hover:bg-surface-container-high/50 rounded-full transition-all md:hidden"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
          </button>

          <Link href="/dashboard" className="p-2 text-on-surface-variant hover:bg-surface-container-high/50 rounded-full transition-all">
            <span className="material-symbols-outlined">notifications</span>
          </Link>

          <Link href="/checkout" className="p-2 text-on-surface-variant hover:bg-surface-container-high/50 rounded-full transition-all relative">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary-container text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {cart.length}
              </span>
            )}
          </Link>

          <Link href="/dashboard" className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant hover:border-primary transition-all">
            <img 
              className="w-full h-full object-cover" 
              alt="User profile avatar" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNOHfMRuUUubc6JUis7F0PpPWj8t1Ga5i2elwUEXF2L_Gsa_4Q0BspuZq9QTtxFM0GkQZVNjI9WRtr_W6NePrGsoQ9DKCtGlnGZL62mCB2Osu1QIUyq02NdRXdXX49wskfp4uMWrrG1sQjsWNG9xaZl5PqCvOANgNXUVFtExMZyT_xWfX43AlPDM-UzVLf1VdGRDro-ef-SEUNpPvnab9-ubuzsh6wGpmFrkRL-VulEkrOSBqRoArouw4Ff-LZ-vJb6wDG5LznyNAB"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="px-margin-desktop py-4 bg-surface border-t border-outline-variant space-y-4 md:hidden">
          <Suspense fallback={
            <div className="flex items-center bg-surface-container border border-outline-variant rounded-lg px-4 py-2">
              <span className="material-symbols-outlined text-outline mr-2 text-[20px]">search</span>
              <span className="text-label-md text-outline/80">Search templates...</span>
            </div>
          }>
            <MobileSearchBar />
          </Suspense>
          <div className="flex flex-col space-y-2">
            <Link 
              href="/browse?category=Web Templates" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Themes
            </Link>
            <Link 
              href="/browse?category=Core Plugins" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Plugins
            </Link>
            <Link 
              href="/browse?category=Mobile Apps" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Websites
            </Link>
            <Link 
              href="/browse?category=Landing Pages" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Landing Pages
            </Link>
            <Link 
              href="/dashboard?tab=requests" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Custom Build
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
