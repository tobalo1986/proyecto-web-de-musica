import React, { useState } from "react";
import { motion } from "framer-motion";
import { Youtube, Play } from "lucide-react";
import { Button } from "./ui/button";

const Hero = ({ featuredVideo }) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!featuredVideo) return null;

  return (
    <section className="relative flex flex-col items-center justify-center h-screen text-white bg-black/50">
      {/* Fondo Difuminado */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581345628965-9a5d438b4e5f?q=80&w=1974&auto=format&fit=crop')`,
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 text-center max-w-2xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Historia y Metal: Una Épica Fusión
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Donde las páginas de la historia cobran vida a través del poder del
          metal. Sumérgete en un viaje a través del tiempo con narraciones
          épicas, poesía y música que despierta el espíritu guerrero.
        </p>

        {/* Botones */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* Botón de Suscripción */}
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => window.open("https://www.youtube.com/channel/UCdQwYfsssxTvr8WGgq5FtHA", "_blank")}
          >
            <Youtube className="mr-2" size={20} />
            Suscribirse
          </Button>

          {/* Botón de Ver Video */}
          <Button
            className="bg-gray-800 hover:bg-gray-900 text-white flex items-center"
            onClick={() => setShowVideo(true)}
          >
            <Play className="mr-2" size={20} />
            Ver Destacado
          </Button>
        </div>
      </div>

      {/* Video Destacado */}
      {showVideo && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/90 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="relative w-full max-w-3xl aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${featuredVideo.id}`}
              title={featuredVideo.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            {/* Botón para cerrar */}
            <button
              className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white"
              onClick={() => setShowVideo(false)}
            >
              ✖
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
