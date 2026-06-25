export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  fullDescription: string;
  category: string;
  techStack: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  downloadsCount: string;
  version: string;
  developer: string;
  images: string[];
  bestseller?: boolean;
  statusLabel?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "nexus-dashboard-kit",
    title: "Nexus Dashboard Kit",
    price: 89.00,
    description: "Complete Next.js dashboard with Tailwind CSS and 50+ modular components.",
    fullDescription: "The Modern Dashboard Engine v2.4 is a comprehensive UI framework designed for high-stakes business intelligence and real-time monitoring applications. Built with React and Tailwind CSS, it offers unmatched speed and flexibility. It is optimized for zero-latency rendering and fully customizable via theme tokens.",
    category: "SaaS UI Kits",
    techStack: ["React / Next.js", "Tailwind CSS", "TypeScript"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6A3yMuDQus5kKJs-hrh0CpsTR5WfOYsVEypEqAXC9e0lzUwHhHLncLvWaFRwKmrWERG3jdlbkP6Jl56iW_3DQqyHiRHf5YO32PYGr45jgd5fTc6SiF4r-lFd39DlILp6bHVYg5t_N0FxJPSPaHz8NmrFL6Ccpe7X-i8ji5ID3vhTt0yEmmfMZvxfGUVQua2zC-v6QBLAeiIXViVlLKFkt0nQCRWo_YyjixbwthnHdm5jnoi4NXd5ZojRj9CgzHVFerRYImvF-53bp",
    rating: 4.9,
    reviewsCount: 128,
    downloadsCount: "12k+",
    version: "2.4",
    developer: "Indigo Systems",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvuYG9KddcfpiXKtfwTlvzzWtJR2em6f4-tA8-K-2yzWlb7NhaktvcoKeXCeLSZMo-Zp_UwLekgAQEmY1ePto2PudWAXxMyaYs17jycumz8WF6QjbNQKJeFy5wWX5Kyg0ildHpiMD7y37bk91USklSWRhZ0RmmbJxyA4ddODTWah6qzobcmfrRsdhA6BNM8Rwa0nK0Ge_xVmcgE9PeJSwdYyBnyp6-OJWNHjjQzHZa3fgYAWIGDmP66DzqsPdW9wJRGlUNpJjOYLWD",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNzDiRCfzo1mdKelHCfwJ8aoJ3-ehVD_G0yRO1qYFnUfc25Wh6EIUn5Dd48TI6y2bM1tH54Z-tyQTt1iGy7bRN8Ry2AouE1vdJR8nMFHs4JP2SrvAFjJahDJeE2plyGpHKOFtYvdvR8paCpwxKL2rycvHvS8xxoMbt6ebyZG9rFDviF2cUA31fM1YCjHPcFVwU-HAP_5zSeozJSm-PBaO-ceP7NYAQjjZGN10sYd3lGg8uR3qWZZ7Ttavc6Hm75cR8QbCZZaH8isgs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiM0wOymQP2FKSiugxTDWEcfFqdVf9AEuyyp2v9FAKeJsj11DTg5zo5lWBtBi68mytZvwZNUfpyCk-onho9rx3PnNOoHoGPzWog7t_aPE3Si98XH5bWsBPC8kuflAOJqc-MZbQ2KvqQ6E2TtXUeV8L156muXZXCEFmpgE9DjrxUHoOz58HfVSnlP60l7_LgZb4JpDQBQE_dU2oZLXl9wU_tnGqtQDixejOsHXJQOplBKwbuj5cwv427UXfRIjwtrEQR73U-MX6SC-w",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYZ310-T7ERmZiQhDBgcJlOBHBpAJZ0DBg0NX_DfOWLwnc4OXAqpHVCDNrXsUe6ZCgacNw9UNyS8s9ui0MaigAOnTNOXp6gk_itdH4QT9UVSro6v4ppRjVJpXbK_g_foZM9c3X2Eglmj6vKi0X9bOrZTGwmsnG-pJHmIMkim8riDQTgrxPxXOMRrGNW2PWP756_DOsHQAYDmRjcGowAWLL9cX1hhIkx6MuPrvCjzV0hDJT2b6oh6GEXjcOmx8tUiannKuRJ8K8tGnS"
    ],
    bestseller: true,
    statusLabel: "v2.4 Live"
  },
  {
    id: "vogue-storefront",
    title: "Vogue Storefront",
    price: 35.00,
    description: "High-performance e-commerce template optimized for conversion and speed.",
    fullDescription: "A clean, minimalist e-commerce landing page template preview. The design features high-end fashion photography, ample whitespace, and elegant serif typography mixed with modern sans-serif. Highly optimized for page speed and conversion.",
    category: "Web Templates",
    techStack: ["Tailwind CSS", "Figma Files", "TypeScript"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0AoI6vIl2N4fTcQsxCE346ERI_0pOCMsdIGTPdnAsRkEFGtqRI1KBPUxkXqKwVY5jcnXwedWuPfz6E1ITBp86fPGC1aaPo6gj6zgZU83tQSU_XJhAyss4OmeER5T_azydNMF0JNOiEYLJI3IVFMN6H4F7cb766nMQLFIQnjwikqv2A_6cIhqcAKh4TvjCiNRNeskB5SDk0hUhwudo3IgyFK-5YcH33qE6Dhi-QH9JK_i6xBy_jhudtTF3QvinxFnWazUrJ7G4UN6O",
    rating: 4.8,
    reviewsCount: 84,
    downloadsCount: "5k+",
    version: "1.2",
    developer: "Vogue Studio",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0AoI6vIl2N4fTcQsxCE346ERI_0pOCMsdIGTPdnAsRkEFGtqRI1KBPUxkXqKwVY5jcnXwedWuPfz6E1ITBp86fPGC1aaPo6gj6zgZU83tQSU_XJhAyss4OmeER5T_azydNMF0JNOiEYLJI3IVFMN6H4F7cb766nMQLFIQnjwikqv2A_6cIhqcAKh4TvjCiNRNeskB5SDk0hUhwudo3IgyFK-5YcH33qE6Dhi-QH9JK_i6xBy_jhudtTF3QvinxFnWazUrJ7G4UN6O"
    ],
    bestseller: true,
    statusLabel: "Popular"
  },
  {
    id: "syncmaster-ai",
    title: "SyncMaster AI",
    price: 29.00,
    description: "Real-time database synchronization plugin for multi-site deployments with AI conflicts resolving.",
    fullDescription: "Extend database replication, cloud-sync, and multi-tenant synchronization inside WordPress or custom applications. Features real-time conflict resolving using lightweight AI models, zero data loss, and encrypted channels.",
    category: "Core Plugins",
    techStack: ["React / Next.js", "TypeScript"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_zmp7WV9HE3574EbeIhkCFgnK4jhbx5LiicBqvYCmLjO4xNAxJ2VZgiHQs3vGLXPudXARviF3fDGNvkxvcLPm78xCibNIBhKKlgjCBumkM_7Ohv1rfgs0UYM0Gv9ANw7tSTVxPmco33rPmvD4Uc3vgy3aGHFLRBHMB3sXOVBXnuqp_385SB5XWb4RLlBuDeKEQBjDb5UiwlHjtqCD1iknlnqJ7BW6kEn-InUMjksdQ5-ZPCAoeVGO0YLtcAmtjxLI0wfSFbXuNcIo",
    rating: 4.7,
    reviewsCount: 46,
    downloadsCount: "3k+",
    version: "1.0",
    developer: "Synchro Tech",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_zmp7WV9HE3574EbeIhkCFgnK4jhbx5LiicBqvYCmLjO4xNAxJ2VZgiHQs3vGLXPudXARviF3fDGNvkxvcLPm78xCibNIBhKKlgjCBumkM_7Ohv1rfgs0UYM0Gv9ANw7tSTVxPmco33rPmvD4Uc3vgy3aGHFLRBHMB3sXOVBXnuqp_385SB5XWb4RLlBuDeKEQBjDb5UiwlHjtqCD1iknlnqJ7BW6kEn-InUMjksdQ5-ZPCAoeVGO0YLtcAmtjxLI0wfSFbXuNcIo"
    ],
    statusLabel: "New Launch"
  },
  {
    id: "alpha-convert",
    title: "Alpha Convert",
    price: 19.00,
    description: "Optimized landing page for software-as-a-service providers.",
    fullDescription: "A high-quality markup of a landing page for a creative agency or SaaS provider. Features crisp layouts, beautiful call-to-action blocks, interactive statistics counters, and lightweight animations.",
    category: "Landing Pages",
    techStack: ["Tailwind CSS", "Figma Files"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBydIXf7g0Vl3FLwyI1ykbyYkQSs-knd7PzrbUNqs4fOpVNEMZbxSguYSoHvAdaUEZRQwX-VfmCOZ8H3AS7VMVR9I4vSmH_MHdTBVBuBI41dbp89N77utNXqBw3ITndS6gMNKExhJemlEmVMwi-TPSKtpAQd1iKmRkQoza3LWJ03al6Hyd1Zit7LhkbgIX9r4fEo8KL4_UVKJ3bl_VFm116kF0CUXDdVsB287uEHmc2Xyyiq1WMxlgi5_023Mp5qxiWzqcljejVcq9p",
    rating: 4.6,
    reviewsCount: 32,
    downloadsCount: "2k+",
    version: "1.0",
    developer: "AlphaDesigns",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBydIXf7g0Vl3FLwyI1ykbyYkQSs-knd7PzrbUNqs4fOpVNEMZbxSguYSoHvAdaUEZRQwX-VfmCOZ8H3AS7VMVR9I4vSmH_MHdTBVBuBI41dbp89N77utNXqBw3ITndS6gMNKExhJemlEmVMwi-TPSKtpAQd1iKmRkQoza3LWJ03al6Hyd1Zit7LhkbgIX9r4fEo8KL4_UVKJ3bl_VFm116kF0CUXDdVsB287uEHmc2Xyyiq1WMxlgi5_023Mp5qxiWzqcljejVcq9p"
    ]
  },
  {
    id: "walletify-ui-kit",
    title: "Walletify UI Kit",
    price: 59.00,
    description: "40+ mobile screens for finance and crypto applications with React Native support.",
    fullDescription: "A modern mobile app UI kit for a fintech platform. High-precision vector graphics showing wallet balances, transaction history, and investment cards. The aesthetic is clean, secure, and technologically advanced, using a palette of deep blues and vibrant success greens.",
    category: "Mobile Apps",
    techStack: ["React / Next.js", "Figma Files", "TypeScript"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWNd7IFbRku4gobL8suPERJNoatFGrJDzs5dXGsEzIVGlAtI3VGLAobE9shl79kTB8j5PjJFELGZqI85LPrMtS2Dh-Sns6w8k2nXrU3lb9lQUPQ7rADv0pGCBXqleXiEGpM_Bs7N3i8L6fuz__MrkYMaHZtynhwOM4WfqnRbgYymGMveior8FKl1SZj5grUfabXAyK1u65oFueHl3w0--uAtEZMmK9qrPOCMuMm4lGDi47erZUJCZhRsfu3kPaQ9HF2OLyqsYJAu7O",
    rating: 4.85,
    reviewsCount: 96,
    downloadsCount: "8k+",
    version: "2.1",
    developer: "Fintech Lab",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWNd7IFbRku4gobL8suPERJNoatFGrJDzs5dXGsEzIVGlAtI3VGLAobE9shl79kTB8j5PjJFELGZqI85LPrMtS2Dh-Sns6w8k2nXrU3lb9lQUPQ7rADv0pGCBXqleXiEGpM_Bs7N3i8L6fuz__MrkYMaHZtynhwOM4WfqnRbgYymGMveior8FKl1SZj5grUfabXAyK1u65oFueHl3w0--uAtEZMmK9qrPOCMuMm4lGDi47erZUJCZhRsfu3kPaQ9HF2OLyqsYJAu7O"
    ]
  },
  {
    id: "pixel-perfect-portfolio",
    title: "Pixel Perfect Portfolio",
    price: 29.00,
    description: "Showcase your creative work with this minimalist and responsive portfolio theme.",
    fullDescription: "A creative agency portfolio template design. Showcases dynamic layout grids, bold typography, and interactive hover states. The visual style is edgy and modern, with deep charcoal backgrounds and electric indigo highlights. Perfect for professional creatives wanting to make a strong digital impression.",
    category: "Web Templates",
    techStack: ["Tailwind CSS", "Figma Files"],
    image: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
    rating: 4.5,
    reviewsCount: 22,
    downloadsCount: "1k+",
    version: "1.0",
    developer: "CreativeDev",
    images: [
      "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
    ]
  },
  {
    id: "narrative-cms-theme",
    title: "Narrative CMS Theme",
    price: 45.00,
    description: "A clean, content-first theme for modern blogs, magazines, and digital publishers.",
    fullDescription: "A creative blog and magazine template design. Features complex typography layouts, rich media integration, and a sleek reading interface. The design is airy yet professional, focusing on content readability and aesthetic presentation of digital media.",
    category: "Web Templates",
    techStack: ["React / Next.js", "Tailwind CSS"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMdSmI0WP6tl1RG0-bWzD054LjjM01P21ovrMLlznpQM6_igDjevtwLJuv327Aipr6v6xgrrN6GXhUODstA27BtqqLpwE_oFYKctextlHfPfog6C6XzwHZccbyA-4nzAmph23eoC2QV-0GmCwK1bGk7IV2l13XaYT0hd105F7vfptnG_jpesmS3Pa2sAsC9A8jrJdFFh17ZtYQEnzvJkfKgW88vAjHlGBTvdvs8PL2IxeRy2pIC_21VgyVz5-UcCab5XocqXRdctY3",
    rating: 4.7,
    reviewsCount: 51,
    downloadsCount: "4k+",
    version: "1.5",
    developer: "PressLabs",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMdSmI0WP6tl1RG0-bWzD054LjjM01P21ovrMLlznpQM6_igDjevtwLJuv327Aipr6v6xgrrN6GXhUODstA27BtqqLpwE_oFYKctextlHfPfog6C6XzwHZccbyA-4nzAmph23eoC2QV-0GmCwK1bGk7IV2l13XaYT0hd105F7vfptnG_jpesmS3Pa2sAsC9A8jrJdFFh17ZtYQEnzvJkfKgW88vAjHlGBTvdvs8PL2IxeRy2pIC_21VgyVz5-UcCab5XocqXRdctY3"
    ]
  },
  {
    id: "glass-3d-icon-pack",
    title: "Glass 3D Icon Pack",
    price: 19.00,
    description: "High-resolution 3D icons with transparent backgrounds for tech interfaces.",
    fullDescription: "A 3D abstract icon pack for tech startups. Stylized geometric shapes in glowing glassmorphism style. The icons represent data, cloud, security, and networking. Professional digital art assets for modern web interfaces and presentations.",
    category: "Icons & 3D",
    techStack: ["Figma Files"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDN_65n7e75DTbcAUdiDyfNxI28VS2vZdC2cgNNG9KfUg-n96Mliya2i-fZQKyyX9dLVpsxXGqJeyrTTVe03SUdBcV1otq0q0ijdXu22VbEFcDMWPMFQeYczKlRVgOk1wW_LlecyzRhV_06PaCTeddEJK3iJ0AAEfF5OW363ONwfMMGavR3DISRPg9js0tXcc_x5E60hBPqZpwk-_P5ixaXHabJQyON0s8PqpmNEuOJSBSAnCi_XZU02QGU2PraxOw5O5KNcfAKorB",
    rating: 4.8,
    reviewsCount: 19,
    downloadsCount: "2k+",
    version: "1.0",
    developer: "Dimension3D",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDN_65n7e75DTbcAUdiDyfNxI28VS2vZdC2cgNNG9KfUg-n96Mliya2i-fZQKyyX9dLVpsxXGqJeyrTTVe03SUdBcV1otq0q0ijdXu22VbEFcDMWPMFQeYczKlRVgOk1wW_LlecyzRhV_06PaCTeddEJK3iJ0AAEfF5OW363ONwfMMGavR3DISRPg9js0tXcc_x5E60hBPqZpwk-_P5ixaXHabJQyON0s8PqpmNEuOJSBSAnCi_XZU02QGU2PraxOw5O5KNcfAKorB"
    ]
  }
];
