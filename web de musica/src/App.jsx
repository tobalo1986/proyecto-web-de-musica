import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import VideoGallery from "./components/VideoGallery";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";
import { useToast } from "./components/ui/use-toast";

function App() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState(() => {
    const savedVideos = localStorage.getItem("epicVideos");
    return savedVideos ? JSON.parse(savedVideos) : demoVideos;
  });

  const [songs, setSongs] = useState(() => {
    const savedSongs = localStorage.getItem("epicSongs");
    return savedSongs ? JSON.parse(savedSongs) : demoSongs;
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "¡Bienvenido a la Épica!",
        description: "Prepárate para un viaje a través de la historia y el metal.",
        duration: 5000,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    localStorage.setItem("epicVideos", JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem("epicSongs", JSON.stringify(songs));
  }, [songs]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl medieval-font text-primary">Cargando el portal épico...</h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero featuredVideo={videos.find((v) => v.featured)} />
        <VideoGallery videos={videos} />
        <MusicPlayer songs={songs} />
      </main>
      <Footer />
    </div>
  );
}

// Demo data
const demoVideos = [
  {
    id: "1",
    title: "La Batalla de Hastings",
    description: "Narración épica de la batalla que cambió el destino de Inglaterra en 1066",
    thumbnail: "https://images.unsplash.com/photo-1599753894977-834b702c0486?q=80&w=2070&auto=format&fit=crop",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "historia",
    featured: true,
  },
  {
    id: "2",
    title: "Ragnarök: El Ocaso de los Dioses",
    description: "Canción épica sobre el fin del mundo según la mitología nórdica",
    thumbnail: "https://images.unsplash.com/photo-1566241832378-917a0f30db2c?q=80&w=2070&auto=format&fit=crop",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "canciones",
  },
  {
    id: "3",
    title: "El Poema del Mío Cid en Metal",
    description: "Adaptación del clásico poema épico español al estilo heavy metal",
    thumbnail: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2070&auto=format&fit=crop",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "poesia",
  },
];

const demoSongs = [
  {
    id: "1",
    title: "Sangre y Gloria",
    description: "Canción épica sobre batallas medievales",
    cover: "https://images.unsplash.com/photo-1599753894977-834b702c0486?q=80&w=2070&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    lyrics: `En campos de batalla, sangre y gloria,
Donde el acero canta su canción,
Guerreros que escribieron su historia,
Con espada, escudo y corazón.

¡Sangre y Gloria! ¡Sangre y Gloria!
El metal resuena como un trueno,
La historia vive en cada memoria,
Y en el canto que brota de mi seno.`,
  },
];

export default App;
