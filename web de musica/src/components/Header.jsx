import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Youtube, Scroll, Music, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <h1 className="text-2xl font-bold text-white">Épica Metálica</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-white">
          <a href="#videos" className="hover:text-gray-300">
            <Youtube className="inline mr-2" size={20} />
            Videos
          </a>
          <a href="#music" className="hover:text-gray-300">
            <Music className="inline mr-2" size={20} />
            Música
          </a>
          <a href="#about" className="hover:text-gray-300">
            <BookOpen className="inline mr-2" size={20} />
            Sobre Mí
          </a>
          <Button className="ml-4">Suscribirse</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-black/90 p-6 flex flex-col gap-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <a
              href="#videos"
              className="hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Youtube className="inline mr-2" size={20} />
              Videos
            </a>
            <a
              href="#music"
              className="hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Music className="inline mr-2" size={20} />
              Música
            </a>
            <a
              href="#about"
              className="hover:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="inline mr-2" size={20} />
              Sobre Mí
            </a>
            <Button onClick={() => setMobileMenuOpen(false)}>Suscribirse</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;


