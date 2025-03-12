import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Download, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useToast } from "./ui/use-toast";

const MusicPlayer = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const audioRef = useRef(null);
  const { toast } = useToast();

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleEnded = () => {
    handleNext();
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const downloadLyrics = () => {
    const element = document.createElement("a");
    const lyrics = currentSong.lyrics;
    const file = new Blob([lyrics], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${currentSong.title} - Lyrics.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Letra descargada",
      description: `Has descargado la letra de "${currentSong.title}"`,
      duration: 3000,
    });
  };

  return (
    <div className="music-player bg-black text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold">Música Épica</h2>
      <p className="text-gray-400 mb-4">
        Escucha mis composiciones originales que fusionan el poder del metal con la riqueza de la historia y la poesía.
      </p>

      <div className="current-song">
        <h3 className="text-xl font-semibold">{currentSong.title}</h3>
        <p className="text-gray-300">{currentSong.description}</p>
      </div>

      {/* Barra de Progreso */}
      <Slider value={[progress]} min={0} max={duration || 1} step={1} onValueChange={handleProgressChange} />
      <div className="flex justify-between text-sm text-gray-400">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controles de Reproducción */}
      <div className="controls flex justify-center items-center gap-4 mt-4">
        <Button onClick={handlePrevious}>
          <SkipBack size={20} />
        </Button>
        <Button onClick={handlePlayPause}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </Button>
        <Button onClick={handleNext}>
          <SkipForward size={20} />
        </Button>
      </div>

      {/* Control de Volumen */}
      <div className="volume-control flex items-center gap-2 mt-4">
        <Button onClick={toggleMute}>{isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}</Button>
        <Slider value={[volume]} min={0} max={1} step={0.1} onValueChange={handleVolumeChange} />
      </div>

      {/* Botón de Mostrar Letra */}
      <Button className="mt-4" onClick={() => setShowLyrics(!showLyrics)}>
        {showLyrics ? "Ocultar Letra" : "Ver Letra"}
      </Button>

      {/* Letra de la Canción */}
      {showLyrics && (
        <div className="lyrics bg-gray-800 p-4 rounded-md mt-4">
          <h3 className="text-lg font-semibold">Letra de {currentSong.title}</h3>
          <pre className="whitespace-pre-wrap">{currentSong.lyrics}</pre>
          <Button className="mt-4 bg-blue-600" onClick={downloadLyrics}>
            <Download size={20} className="mr-2" />
            Descargar Letra
          </Button>
        </div>
      )}

      {/* Lista de Canciones */}
      <div className="song-list mt-6">
        <h3 className="text-lg font-semibold mb-2">Lista de Canciones</h3>
        {songs.map((song, index) => (
          <div
            key={song.id}
            className={`p-2 rounded-md cursor-pointer hover:bg-gray-800 ${
              currentSongIndex === index ? "bg-gray-700" : ""
            }`}
            onClick={() => {
              setCurrentSongIndex(index);
              setIsPlaying(true);
            }}
          >
            <h4 className="text-md font-semibold">{song.title}</h4>
            <p className="text-gray-400 text-sm">{song.description}</p>
          </div>
        ))}
      </div>

      {/* Elemento de Audio */}
      <audio ref={audioRef} src={currentSong.audioUrl} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />
    </div>
  );
};

export default MusicPlayer;
