import { Concierge } from "@/components/Concierge";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { MenuSection } from "@/components/MenuSection";
import { Navbar } from "@/components/Navbar";
import { OrderDrawer } from "@/components/OrderDrawer";
import { Testimonials } from "@/components/Testimonials";
import { Visit } from "@/components/Visit";
import { WhyUs } from "@/components/WhyUs";
import { site } from "@/lib/site";

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description:
    "Luxury seafood restaurant in Al Olaya, Riyadh. Daily Red Sea catch, charcoal-fired signatures and an AI concierge for reservations.",
  image: "/images/fishfactory-hero.jpg",
  servesCuisine: ["Seafood", "Mediterranean"],
  priceRange: "SAR 74–420",
  telephone: "+966551220045",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "King Fahd Road, Al Olaya",
    addressLocality: "Riyadh",
    postalCode: "12214",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.7136,
    longitude: 46.6753,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "12:00",
    closes: "01:00",
  },
  acceptsReservations: "True",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "10000",
    bestRating: "5",
  },
  sameAs: [site.instagram, site.x],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <MenuSection />
        <WhyUs />
        <Testimonials />
        <Visit />
      </main>
      <Footer />
      <OrderDrawer />
      <Concierge />
    </>
  );
}
