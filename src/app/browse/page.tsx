"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { PRODUCTS, Product } from "../../data/products";
import { useStore } from "../../context/StoreContext";

function BrowseContent() {
  const searchParams = useSearchParams();
  const { addToCart, isInCart } = useStore();

  // Search parameter defaults
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  // Interactive filter states
  const [searchVal, setSearchVal] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sync state if query parameters change
  useEffect(() => {
    setSearchVal(searchParams.get("search") || "");
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategories([cat]);
    }
  }, [searchParams]);

  // Categories list derived from products
  const categoriesList = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map((p) => p.category)));
  }, []);

  // Tech stack list derived from products
  const techStackList = useMemo(() => {
    const list = new Set<string>();
    PRODUCTS.forEach((p) => p.techStack.forEach((t) => list.add(t)));
    return Array.from(list);
  }, []);

  // Category toggle handler
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  // Tech stack toggle handler
  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Search Query
    if (searchVal.trim()) {
      const q = searchVal.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // 2. Categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // 3. Tech Stack
    if (selectedTech.length > 0) {
      result = result.filter((p) =>
        p.techStack.some((t) => selectedTech.includes(t))
      );
    }

    // 4. Price
    result = result.filter((p) => p.price <= maxPrice);

    // 5. Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: newest / sort order by array index
      result.reverse();
    }

    return result;
  }, [searchVal, selectedCategories, selectedTech, maxPrice, sortBy]);

  // Pagination bounds
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="flex gap-gutter">
      {/* Left Sidebar Filters */}
      <aside className="hidden lg:block w-64 flex-shrink-0 space-y-stack-lg">
        {/* Categories Section */}
        <section className="glass-panel p-5 rounded-xl">
          <h3 className="font-headline-sm text-[16px] text-primary uppercase tracking-wider mb-stack-md font-bold">
            Categories
          </h3>
          <div className="space-y-3">
            {categoriesList.map((category) => (
              <label key={category} className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4.5 h-4.5 rounded border-outline-variant bg-surface-container text-primary-container focus:ring-primary focus:ring-offset-background"
                />
                <span
                  className={`font-body-sm text-sm transition-colors ${
                    selectedCategories.includes(category)
                      ? "text-primary font-medium"
                      : "text-on-surface-variant group-hover:text-on-surface"
                  }`}
                >
                  {category}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="glass-panel p-5 rounded-xl">
          <h3 className="font-headline-sm text-[16px] text-primary uppercase tracking-wider mb-stack-md font-bold">
            Tech Stack
          </h3>
          <div className="space-y-3">
            {techStackList.map((tech) => (
              <label key={tech} className="flex items-center gap-3 group cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTech.includes(tech)}
                  onChange={() => handleTechToggle(tech)}
                  className="w-4.5 h-4.5 rounded border-outline-variant bg-surface-container text-primary-container focus:ring-primary focus:ring-offset-background"
                />
                <span
                  className={`font-body-sm text-sm transition-colors ${
                    selectedTech.includes(tech)
                      ? "text-primary font-medium"
                      : "text-on-surface-variant group-hover:text-on-surface"
                  }`}
                >
                  {tech}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Price Range Section */}
        <section className="glass-panel p-5 rounded-xl">
          <h3 className="font-headline-sm text-[16px] text-primary uppercase tracking-wider mb-stack-md font-bold">
            Price Range
          </h3>
          <input
            type="range"
            min="0"
            max="150"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary border border-outline-variant/30"
          />
          <div className="flex justify-between mt-2 font-label-md text-text-secondary text-sm">
            <span>$0</span>
            <span className="text-primary font-bold">${maxPrice}</span>
            <span>$150+</span>
          </div>
        </section>
      </aside>

      {/* Catalog Content */}
      <div className="flex-grow">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-stack-lg gap-4">
          <div className="flex items-baseline gap-3">
            <h1 className="font-headline-md text-headline-md text-text-primary">
              {selectedCategories.length === 1 ? selectedCategories[0] : "All Marketplace Assets"}
            </h1>
            <span className="font-body-sm text-sm text-text-secondary bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30 shrink-0">
              {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-auto">
            {/* Sort selection */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-container border border-outline-variant text-on-surface px-4 py-2 pr-8 rounded-lg font-label-md hover:bg-surface-container-high transition-all text-sm outline-none cursor-pointer appearance-none"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Popularity (Rating)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-sm">
                expand_more
              </span>
            </div>

            {/* Grid/List switch */}
            <div className="flex border border-outline-variant rounded-lg overflow-hidden shrink-0">
              <button
                onClick={() => setViewType("grid")}
                className={`p-2 transition-colors ${
                  viewType === "grid" ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
              </button>
              <button
                onClick={() => setViewType("list")}
                className={`p-2 transition-colors ${
                  viewType === "list" ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">view_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Catalog listings */}
        {filteredProducts.length === 0 ? (
          <div className="glass-panel p-16 rounded-xl text-center space-y-4">
            <span className="material-symbols-outlined text-outline text-5xl">folder_off</span>
            <h3 className="font-headline-sm text-headline-sm text-text-primary">No assets match your search</h3>
            <p className="font-body-md text-text-secondary max-w-sm mx-auto">
              Try adjusting your filters, clearing your search query, or increasing the max price slider.
            </p>
            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedTech([]);
                setMaxPrice(300);
                setSearchVal("");
              }}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-sm font-bold hover:brightness-110 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : viewType === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {paginatedProducts.map((product) => {
              const inCart = isInCart(product.id);
              
              return (
                <div
                  key={product.id}
                  className="group bg-surface-container border border-outline-variant rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-surface-container-highest shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={product.title}
                      src={product.image}
                    />
                    {product.bestseller && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-success/20 border border-success/30 backdrop-blur-md text-success text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          Bestseller
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-base flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h2 className="font-headline-sm text-body-lg text-text-primary font-semibold line-clamp-1" title={product.title}>
                          {product.title}
                        </h2>
                        <span className="font-label-md text-primary font-bold shrink-0">${product.price}</span>
                      </div>
                      <p className="font-body-sm text-text-secondary mb-stack-lg line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-outline-variant pt-4 mt-auto">
                      <Link href={`/product/${product.id}`} className="font-label-md text-primary hover:underline text-sm font-semibold">
                        View Details
                      </Link>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={inCart}
                        className={`font-label-md px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
                          inCart
                            ? "bg-surface-container text-success cursor-default"
                            : "bg-primary text-on-primary hover:brightness-110 active:scale-95"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">{inCart ? "check" : "shopping_cart"}</span>
                        {inCart ? "In Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {paginatedProducts.map((product) => {
              const inCart = isInCart(product.id);
              
              return (
                <div
                  key={product.id}
                  className="group bg-surface-container border border-outline-variant rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-all duration-300 p-base flex flex-col md:flex-row gap-6"
                >
                  <div className="w-full md:w-56 aspect-[16/9] md:aspect-auto md:h-32 rounded-lg overflow-hidden bg-surface-container-highest shrink-0 relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={product.title}
                      src={product.image}
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <h2 className="font-headline-sm text-body-lg text-text-primary font-semibold">
                          {product.title}
                        </h2>
                        <span className="font-label-md text-primary font-bold">${product.price}</span>
                      </div>
                      <p className="font-body-sm text-text-secondary line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.techStack.map((tech) => (
                          <span key={tech} className="bg-surface-container-high text-[10px] text-text-secondary border border-outline-variant/35 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-outline-variant pt-3">
                      <Link href={`/product/${product.id}`} className="font-label-md text-primary hover:underline text-sm font-semibold">
                        View Details
                      </Link>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={inCart}
                        className={`font-label-md px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
                          inCart
                            ? "bg-surface-container text-success cursor-default"
                            : "bg-primary text-on-primary hover:brightness-110 active:scale-95"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">{inCart ? "check" : "shopping_cart"}</span>
                        {inCart ? "In Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-2 mt-stack-lg py-stack-md">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all text-sm ${
                  currentPage === idx + 1
                    ? "bg-primary text-on-primary"
                    : "border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background selection:bg-primary/30">
      <Navbar />
      <main className="flex-grow max-w-container-max mx-auto w-full px-margin-desktop py-stack-lg">
        <Suspense fallback={
          <div className="flex items-center justify-center py-32 w-full">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <BrowseContent />
        </Suspense>
      </main>
    </div>
  );
}
