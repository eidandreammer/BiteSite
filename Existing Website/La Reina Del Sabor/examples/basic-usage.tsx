import React from 'react';
import { LaReinaDelSabor } from 'la-reina-del-sabor';

// Basic usage example
export default function BasicExample() {
  return (
    <LaReinaDelSabor 
      restaurantName="My Dominican Restaurant"
      restaurantAddress="456 Oak Street, Brooklyn, NY 11201"
      restaurantPhone="(718) 555-0123"
      restaurantHours="Daily 8:00 AM - 9:00 PM"
      grubhubUrl="https://www.grubhub.com/restaurant/my-restaurant"
      seamlessUrl="https://www.seamless.com/restaurant/my-restaurant"
    />
  );
}

// Custom styling example
export function CustomStyledExample() {
  return (
    <LaReinaDelSabor 
      restaurantName="El Sabor Dominicano"
      restaurantAddress="789 Pine Avenue, Queens, NY 11375"
      restaurantPhone="(917) 555-0456"
      restaurantHours="Daily 7:00 AM - 10:00 PM"
      customStyles={{
        primaryColor: "#E74C3C",
        secondaryColor: "#F39C12",
        accentColor: "#3498DB"
      }}
      className="my-custom-restaurant"
    />
  );
}

// Individual components example
export function IndividualComponentsExample() {
  return (
    <div className="my-restaurant-website">
      <Header restaurantName="Mi Restaurante" />
      <Hero restaurantName="Mi Restaurante" />
      <FeaturedMenu />
      <About 
        restaurantName="Mi Restaurante"
        restaurantAddress="123 Calle Principal"
        restaurantPhone="(555) 123-4567"
        restaurantHours="Lunes a Domingo 8:00 AM - 9:00 PM"
      />
      <Contact 
        restaurantAddress="123 Calle Principal"
        restaurantPhone="(555) 123-4567"
        restaurantHours="Lunes a Domingo 8:00 AM - 9:00 PM"
      />
      <Footer 
        restaurantName="Mi Restaurante"
        restaurantAddress="123 Calle Principal"
        restaurantPhone="(555) 123-4567"
        restaurantHours="Lunes a Domingo 8:00 AM - 9:00 PM"
      />
    </div>
  );
}
