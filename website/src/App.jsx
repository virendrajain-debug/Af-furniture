// ============================================================
// AF Furnishings - Main Website App Component
// ============================================================
// Root component for the public-facing website.
// Assembles all sections in order from top to bottom.
//
// SECTIONS:
//   1. AnnouncementBar - Top banner
//   2. Header - Navigation + search
//   3. Hero - Main banner
//   4. Deals - Value propositions
//   5. Category sections (Lounge, Bedroom, Dining)
//   6. ProductGrids - Product listings per category
//   7. PromoPoster - Promotional banner
//   8. Testimonials - Customer reviews
//   9. Stores - Showroom locations
//   10. AboutSection - Company info (from API)
//   11. ContactSection - Contact form (to API)
//   12. TermsSection - Terms & Conditions (from API)
//   13. Footer - Site footer
// ============================================================

import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Hero from './components/Hero'
import Deals from './components/Deals'
import Category from './components/Category'
import ProductGrid from './components/ProductGrid'
import PromoPoster from './components/PromoPoster'
import Testimonials from './components/Testimonials'
import Stores from './components/Stores'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import TermsSection from './components/TermsSection'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="home">
        <Hero />
        <Deals />

        {/* Lounge Category Banner */}
        <Category
          id="lounge"
          title="Lounge Suite"
          subtitle="Comfort for every day"
          image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"
          link="#winz"
        />

        {/* Living Room / Winz Products - fetches from API by category */}
        <ProductGrid
          sectionId="winz"
          label="WINZ COLLECTION"
          title="Relax in style."
          productsKey="sofas"
          category="Living Room"
        />

        {/* Bedroom Category Banner */}
        <Category
          id="bedroom"
          title="Bedroom"
          subtitle="Rest beautifully"
          image="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=85"
          link="#bedroom-products"
          reverse
        />

        {/* Bedroom Products */}
        <ProductGrid
          sectionId="bedroom-products"
          label="BEDROOM COLLECTION"
          title="Beautiful rest begins here."
          productsKey="bedroom"
          category="Bedroom"
          compact
        />

        {/* Dining Category Banner */}
        <Category
          id="dining"
          title="Dining"
          subtitle="Gather around good moments"
          image="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1800&q=85"
          link="#dining-products"
        />

        {/* Dining Products */}
        <ProductGrid
          sectionId="dining-products"
          label="DINING COLLECTION"
          title="Made for gathering."
          productsKey="dining"
          category="Dining"
        />

        <PromoPoster />
        <Testimonials />
        <Stores />
        <AboutSection />
        <ContactSection />
        <TermsSection />
      </main>
      <Footer />
    </>
  )
}

export default App
