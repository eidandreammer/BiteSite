# La Reina Del Sabor - Modern Dominican Restaurant Website

[![npm version](https://badge.fury.io/js/la-reina-del-sabor.svg)](https://badge.fury.io/js/la-reina-del-sabor)
[![npm downloads](https://img.shields.io/npm/dm/la-reina-del-sabor.svg)](https://www.npmjs.com/package/la-reina-del-sabor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive website template for La Reina Del Sabor, an authentic Dominican restaurant. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 📦 NPM Package

This project is available as an npm package for easy integration into your projects.

### Installation

```bash
npm install la-reina-del-sabor
# or
yarn add la-reina-del-sabor
# or
pnpm add la-reina-del-sabor
```

### Quick Start

```tsx
import { LaReinaDelSabor } from 'la-reina-del-sabor';

function App() {
  return (
    <LaReinaDelSabor 
      restaurantName="Your Restaurant Name"
      restaurantAddress="123 Main St, City, State"
      restaurantPhone="(555) 123-4567"
      restaurantHours="Daily 9:00 AM - 10:00 PM"
      grubhubUrl="https://your-grubhub-url.com"
      seamlessUrl="https://your-seamless-url.com"
      customStyles={{
        primaryColor: "#FF6B35",
        secondaryColor: "#FFE5D9",
        accentColor: "#4A90E2"
      }}
    />
  );
}
```

### Individual Components

You can also import and use individual components:

```tsx
import { 
  Header, 
  Hero, 
  FeaturedMenu, 
  About, 
  Reviews, 
  Contact, 
  OrderNowBanner, 
  Footer 
} from 'la-reina-del-sabor';

// Use components individually
<Header restaurantName="Your Restaurant" />
<Hero restaurantName="Your Restaurant" />
<FeaturedMenu />
<About 
  restaurantName="Your Restaurant"
  restaurantAddress="123 Main St"
  restaurantPhone="(555) 123-4567"
  restaurantHours="Daily 9:00 AM - 10:00 PM"
/>
```

### Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `restaurantName` | string | "La Reina Del Sabor" | Name of your restaurant |
| `restaurantAddress` | string | "137 1/2 Main St, Hackensack, NJ 07601" | Restaurant address |
| `restaurantPhone` | string | "(201) 880-5153" | Restaurant phone number |
| `restaurantHours` | string | "Daily 7:30 AM - 8:00 PM" | Operating hours |
| `grubhubUrl` | string | Grubhub URL | Link to your Grubhub page |
| `seamlessUrl` | string | Seamless URL | Link to your Seamless page |
| `customStyles` | object | Default colors | Custom color scheme |
| `className` | string | "" | Additional CSS classes |

### Custom Styling

```tsx
const customStyles = {
  primaryColor: "#FF6B35",    // Main brand color
  secondaryColor: "#FFE5D9",  // Secondary/accent color
  accentColor: "#4A90E2"      // Interactive elements
};

<LaReinaDelSabor customStyles={customStyles} />
```

### Utilities

The package also exports useful utility functions:

```tsx
import { 
  formatPhoneNumber, 
  generateGoogleMapsUrl, 
  isMobile, 
  isDesktop 
} from 'la-reina-del-sabor';

// Format phone number
const formatted = formatPhoneNumber("5551234567"); // "(555) 123-4567"

// Generate Google Maps URL
const mapsUrl = generateGoogleMapsUrl("123 Main St, City, State");

// Check device type
if (isMobile()) {
  // Mobile-specific logic
}
```

---

## 🍽️ About

La Reina Del Sabor serves authentic Dominican cuisine with a focus on traditional recipes, fresh ingredients, and warm hospitality. This website showcases their menu, story, and makes it easy for customers to order online.

## ✨ Features

- **Modern Design**: Clean, professional design that reflects the restaurant's authentic Dominican heritage
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Engaging micro-interactions using Framer Motion
- **SEO Optimized**: Built with Next.js for excellent search engine optimization
- **Fast Performance**: Optimized images, fonts, and code for lightning-fast loading
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels
- **Online Ordering**: Direct links to Grubhub and Seamless for easy ordering

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Source Sans Pro, Lato)
- **Deployment**: Ready for Vercel/Netlify

## 📱 Sections

1. **Hero**: Compelling headline with clear call-to-action
2. **Featured Menu**: Showcase of signature Dominican dishes
3. **About**: Restaurant story and contact information
4. **Reviews**: Customer testimonials and ratings
5. **Contact**: Location, hours, and service information
6. **Order Now Banner**: Prominent online ordering section
7. **Footer**: Comprehensive links and information

## 🎨 Design System

### Colors
- **Primary**: Orange (#FF8B41) - Warm, appetizing Dominican feel
- **Secondary**: Yellow (#FFD6A3) - Bright, welcoming accent
- **Neutral**: Grays for text and backgrounds
- **Accent**: Blue for interactive elements

### Typography
- **Display**: Source Sans Pro for headings
- **Body**: Lato for body text
- **Responsive**: Fluid type scaling using clamp()

### Components
- **Buttons**: Primary, secondary, and outline variants
- **Cards**: Consistent spacing and shadows
- **Navigation**: Sticky header with mobile drawer
- **Animations**: Smooth transitions and micro-interactions

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd la-reina-del-sabor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## 🌐 Deployment

This project is optimized for deployment on:

- **Vercel** (Recommended)
- **Netlify**
- **Any Node.js hosting platform**

### Environment Variables
No environment variables required for basic functionality.

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast ratios
- Reduced motion support

## 🔍 SEO Features

- Meta tags and Open Graph
- Structured data (JSON-LD)
- Sitemap ready
- Optimized images
- Fast loading times
- Mobile-first design

## 📊 Performance

- Lighthouse score targets:
  - Performance: ≥90
  - Accessibility: ≥95
  - Best Practices: ≥95
  - SEO: ≥95

## 🎯 Key Features

### Navigation
- Sticky header with smooth scrolling
- Mobile-friendly hamburger menu
- Breadcrumb navigation

### Content
- Rich media support
- Optimized images
- Lazy loading
- Responsive grids

### Interactions
- Hover effects
- Smooth transitions
- Loading states
- Form validation

## 🚀 Future Enhancements

- **Online Menu**: Full interactive menu with categories
- **Reservation System**: Table booking functionality
- **Loyalty Program**: Customer rewards system
- **Blog**: Recipe sharing and food stories
- **Multi-language**: Spanish/English support
- **Analytics**: Customer behavior tracking

## 📞 Contact Information

**La Reina Del Sabor**
- Address: 137 1/2 Main St, Hackensack, NJ 07601
- Phone: (201) 880-5153
- Hours: Daily 7:30 AM - 8:00 PM
- Cuisine: Dominican, Breakfast, Dinner

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 🙏 Acknowledgments

- La Reina Del Sabor team for their authentic Dominican recipes
- Next.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Lucide for beautiful icons

---

**Built with ❤️ for authentic Dominican cuisine in Hackensack, NJ** 