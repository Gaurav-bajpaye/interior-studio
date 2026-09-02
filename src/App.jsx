import Header from './components/Header'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Benefits from './components/Benefits'
import Process from './components/Process'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'

export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Header />

      <main>
        <Hero />
        <Portfolio />
        <Services />
        <Benefits />
        <Process />
        <About />
        <Testimonials />
        <Booking />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFab />
    </>
  )
}
