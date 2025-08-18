import React from 'react';
import Header from './Header';
import Hero from './Hero';
import FeaturedMenu from './FeaturedMenu';
import About from './About';
import Reviews from './Reviews';
import Contact from './Contact';
import OrderNowBanner from './OrderNowBanner';
import Footer from './Footer';

export interface LaReinaDelSaborProps {
  restaurantName?: string;
  restaurantAddress?: string;
  restaurantPhone?: string;
  restaurantHours?: string;
  grubhubUrl?: string;
  seamlessUrl?: string;
  customStyles?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
  className?: string;
}

const LaReinaDelSabor: React.FC<LaReinaDelSaborProps> = ({
  restaurantName = "La Reina Del Sabor",
  restaurantAddress = "137 1/2 Main St, Hackensack, NJ 07601",
  restaurantPhone = "(201) 880-5153",
  restaurantHours = "Daily 7:30 AM - 8:00 PM",
  grubhubUrl = "https://www.grubhub.com/restaurant/la-reina-del-sabor",
  seamlessUrl = "https://www.seamless.com/restaurant/la-reina-del-sabor",
  customStyles = {},
  className = ""
}) => {
  return (
    <div className={`la-reina-del-sabor ${className}`}>
      <Header 
        restaurantName={restaurantName}
        customStyles={customStyles}
      />
      <Hero 
        restaurantName={restaurantName}
        customStyles={customStyles}
      />
      <FeaturedMenu customStyles={customStyles} />
      <About 
        restaurantName={restaurantName}
        restaurantAddress={restaurantAddress}
        restaurantPhone={restaurantPhone}
        restaurantHours={restaurantHours}
        customStyles={customStyles}
      />
      <Reviews customStyles={customStyles} />
      <Contact 
        restaurantAddress={restaurantAddress}
        restaurantPhone={restaurantPhone}
        restaurantHours={restaurantHours}
        customStyles={customStyles}
      />
      <OrderNowBanner 
        grubhubUrl={grubhubUrl}
        seamlessUrl={seamlessUrl}
        customStyles={customStyles}
      />
      <Footer 
        restaurantName={restaurantName}
        restaurantAddress={restaurantAddress}
        restaurantPhone={restaurantPhone}
        restaurantHours={restaurantHours}
        customStyles={customStyles}
      />
    </div>
  );
};

export default LaReinaDelSabor;
