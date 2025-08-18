// Restaurant information constants
export const RESTAURANT_INFO = {
  NAME: "La Reina Del Sabor",
  ADDRESS: "137 1/2 Main St, Hackensack, NJ 07601",
  PHONE: "(201) 880-5153",
  HOURS: "Daily 7:30 AM - 8:00 PM",
  CUISINE: "Dominican",
  DESCRIPTION: "Authentic Dominican cuisine with traditional recipes and fresh ingredients"
};

// Color scheme constants
export const COLORS = {
  PRIMARY: "#FF8B41",
  SECONDARY: "#FFD6A3",
  ACCENT: "#3B82F6",
  NEUTRAL: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827"
  }
};

// Menu items constants
export const FEATURED_MENU_ITEMS = [
  {
    id: 1,
    name: "Mofongo",
    description: "Traditional Dominican dish with mashed plantains, garlic, and pork cracklings",
    price: "$12.99",
    image: "/images/mofongo.jpg",
    category: "Main Course"
  },
  {
    id: 2,
    name: "Sancocho",
    description: "Hearty Dominican stew with meat, vegetables, and root vegetables",
    price: "$15.99",
    image: "/images/sancocho.jpg",
    category: "Soup"
  },
  {
    id: 3,
    name: "Tostones",
    description: "Crispy fried plantains served as a side dish",
    price: "$6.99",
    image: "/images/tostones.jpg",
    category: "Side Dish"
  }
];

// Social media and ordering links
export const LINKS = {
  GRUBHUB: "https://www.grubhub.com/restaurant/la-reina-del-sabor",
  SEAMLESS: "https://www.seamless.com/restaurant/la-reina-del-sabor",
  GOOGLE_MAPS: "https://maps.google.com/?q=137+1/2+Main+St,+Hackensack,+NJ+07601"
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: "320px",
  TABLET: "768px",
  DESKTOP: "1024px",
  LARGE_DESKTOP: "1280px"
};

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5
};
