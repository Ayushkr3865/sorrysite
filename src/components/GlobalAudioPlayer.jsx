"use client"
import { useRef, useEffect, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function GlobalAudioPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(true) // 🔥 start as playing

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.volume = 0.7
    audioRef.current.loop = true
    audioRef.current.muted = false

    // Try to autoplay
    const playAudio = () => {
      audioRef.current
        .play()
        .then(() => console.log("Autoplay started 🎵"))
        .catch(err => console.log("Autoplay blocked 🚫, waiting for click", err))
    }

    if (playing) {
      playAudio()
    } else {
      audioRef.current.pause()
    }
  }, [playing])

  // Ensure music plays after *any* user click if autoplay fails
  useEffect(() => {
    const resumeOnClick = () => {
      if (audioRef.current && audioRef.current.paused && playing) {
        audioRef.current.play().catch(() => {})
      }
    }
    window.addEventListener("click", resumeOnClick)
    return () => window.removeEventListener("click", resumeOnClick)
  }, [playing])

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setPlaying(prev => !prev)}
        className="bg-pink-500/20 backdrop-blur-sm border border-pink-300/30 rounded-full p-3 text-pink-200 hover:bg-pink-500/30 transition-all duration-300"
      >
        {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      <audio ref={audioRef} autoPlay>
        <source src="/audio/galti.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}
