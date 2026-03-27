import Navbar from "@/components/sections/Navbar"
import Hero from "@/components/sections/Hero"
import Builder from "@/components/sections/Builder"
import Menu from "@/components/sections/Menu"
import Values from "@/components/sections/Values"
import Newsletter from "@/components/sections/Newsletter"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Builder />
        <Menu />
        <Values />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
