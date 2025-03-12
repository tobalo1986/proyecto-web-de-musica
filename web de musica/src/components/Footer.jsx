import React from "react";
import { Youtube, Mail, BookOpen, Music, Scroll } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 text-center">
      <div className="container mx-auto px-4">
        {/* Logo y Descripción */}
        <h2 className="text-2xl font-bold">Diario de un cateto ilustrado</h2>
        <p className="text-gray-400 max-w-lg mx-auto mt-2">
          Fusionando la riqueza de la historia con el poder del metal para
          crear experiencias épicas que trascienden el tiempo.
        </p>

        {/* Enlaces */}
        <nav className="flex flex-wrap justify-center gap-6 mt-4 text-gray-300">
          <a href="#videos" className="hover:text-white flex items-center">
            <Scroll className="mr-2" size={20} /> Videos
          </a>
          <a href="#music" className="hover:text-white flex items-center">
            <Music className="mr-2" size={20} /> Música
          </a>
          <a href="#about" className="hover:text-white flex items-center">
            <BookOpen className="mr-2" size={20} /> Sobre Mí
          </a>
        </nav>

        {/* Sobre el Creador */}
        <div className="mt-6 max-w-md mx-auto text-gray-400">
          <h3 className="text-lg font-semibold text-white">Sobre el Creador</h3>
          <p>
            Historiador, poeta y músico apasionado por compartir las grandes
            historias del pasado a través del poder del metal y la narrativa
            épica.
          </p>
        </div>

        {/* Botón de Suscripción */}
        <Button
          className="bg-red-600 hover:bg-red-700 text-white mt-6"
          onClick={() =>
            window.open(
              "https://www.youtube.com/channel/UCdQwYfsssxTvr8WGgq5FtHA",
              "_blank"
            )
          }
        >
          <Youtube className="mr-2" size={20} /> Suscribirse al Canal
        </Button>

        {/* Derechos Reservados */}
        <p className="text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Épica Metálica. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

