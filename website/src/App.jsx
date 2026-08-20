import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Hero from './components/Hero'
import Deals from './components/Deals'
import Category from './components/Category'
import ProductGrid from './components/ProductGrid'
import PromoPoster from './components/PromoPoster'
import Testimonials from './components/Testimonials'
import Stores from './components/Stores'
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

        <Category
          id="lounge"
          title="Lounge Suite"
          subtitle="Comfort for every day"
          image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"
          link="#products"
        />

        <ProductGrid
          sectionId="sofas"
          label="SOFAS & LOUNGE"
          title="Relax in style."
          productsKey="sofas"
        />

        <Category
          id="bedroom"
          title="Bedroom"
          subtitle="Rest beautifully"
          image="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=85"
          link="#products"
          reverse
        />

        <ProductGrid
          label="BEDROOM COLLECTION"
          title="Beautiful rest begins here."
          productsKey="bedroom"
          compact
        />

        <Category
          id="dining"
          title="Dining"
          subtitle="Gather around good moments"
          image="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1800&q=85"
          link="#dining-products"
        />

        <ProductGrid
          sectionId="dining-products"
          label="DINING COLLECTION"
          title="Made for gathering."
          productsKey="dining"
        />

        <PromoPoster />
        <Testimonials />
        <Stores />
      </main>
      <Footer />
    </>
  )
}

export default App
