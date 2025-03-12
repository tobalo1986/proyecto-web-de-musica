import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scroll, Music, BookOpen, Clock } from "lucide-react";

const VideoGallery = ({ videos }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredVideo, setHoveredVideo] = useState(null);

  const categories = [
    { id: "all", label: "Todos", icon: <Scroll size={20} /> },
    { id: "historia", label: "Historia Narrada", icon: <BookOpen size={20} /> },
    { id: "canciones", label: "Canciones Épicas", icon: <Music size={20} /> },
    { id: "poesia", label: "Poesía Metal", icon: <Scroll size={20} /> },
    { id: "cortos", label: "Videos Cortos", icon: <Clock size={20} /> },
  ];

  const filteredVideos =
    selectedCategory === "all"
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  return (
    <section className="video-gallery py-10 text-white">
      <div className="container mx-auto px-6">
        {/* Título */}
        <h2 className="text-3xl font-bold text-center mb-4">Biblioteca de Videos</h2>
        <p className="text-gray-400 text-center mb-6">
          Explora mi colección de contenido épico, desde narraciones históricas hasta poesía metal y canciones originales.
        </p>

        {/* Tabs de Categorías */}
        <div className="flex justify-center gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
                selectedCategory === category.id ? "bg-primary text-black" : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </div>

        {/* Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              className="video-card relative bg-gray-900 p-4 rounded-lg cursor-pointer"
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover rounded-md" />
              <div className="mt-2">
                <h3 className="text-lg font-bold">{video.title}</h3>
                <p className="text-gray-400 text-sm">{video.description}</p>
              </div>

              {/* Botón de Reproducción en Hover */}
              {hoveredVideo === video.id && (
                <motion.button
                  className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-lg font-bold rounded-lg transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => window.open(video.url.replace("embed/", "watch?v="), "_blank")}
                >
                  ▶ Ver Video
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
