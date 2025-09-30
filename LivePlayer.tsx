import React, { useEffect, useRef, useState } from 'react'
import { AlertCircle, Clock, Play, Video } from 'lucide-react'

interface LivePlayerProps {
  streamSettings: any
  logoUrl: string | null
}

export const LivePlayer: React.FC<LivePlayerProps> = ({ streamSettings, logoUrl }) => {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [videoError, setVideoError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Time ticker for "live"
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now
          .toLocaleTimeString("ta-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
          .replace(/:/g, ":")
      )
    }
    updateTime()
    const id = setInterval(updateTime, 1000)
    return () => clearInterval(id)
  }, [])

  // Get stream link/type
  const { isLive, streamType } = streamSettings || { isLive: false, streamType: "m3u8" }
  // For demo, fallback links
  const demoLinks = {
    m3u8: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    facebook: "https://www.facebook.com/facebookapp/videos/10153231379946729/",
    youtube: "https://www.youtube.com/embed/tgbNymZ7vqY",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  }

  const streamLink = streamSettings?.streamLink || demoLinks[streamType] || demoLinks.m3u8

  // Error handling for video
  const handleVideoError = () => setVideoError("வீடியோ ஏற்ற முடியவில்லை. Stream லிங்கை சரிபார்க்கவும்.")

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <div className="relative bg-black rounded-3xl shadow-2xl mx-auto aspect-video w-full max-w-4xl min-h-[320px] flex items-center justify-center">
        {/* Logo: top-right */}
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            className="absolute top-5 right-5 w-24 h-16 object-contain z-20 bg-white/20 rounded-xl shadow-lg"
            onError={e => (e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='64' viewBox='0 0 96 64'%3E%3Crect width='96' height='64' fill='%236366f1'/%3E%3Ctext x='48' y='34' font-family='Arial' font-size='18' fill='white' text-anchor='middle' dy='5'%3ELogo%3C/text%3E%3C/svg%3E")}
          />
        )}
        {/* LIVE badge: top-left */}
        {isLive && (
          <span className="absolute top-5 left-5 flex items-center gap-2 px-4 py-1 rounded-full bg-tv-red text-white text-xs font-bold z-20 shadow-lg animate-pulse">
            <Play size={16} className="mr-1" />
            நேரலை
          </span>
        )}

        {/* Streaming video */}
        <div className="w-full h-full flex items-center justify-center">
          {streamType === "youtube" ? (
            <iframe
              title="YouTube Live"
              src={streamLink}
              className="w-full h-full rounded-2xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
            />
          ) : streamType === "facebook" ? (
            <iframe
              title="Facebook Live"
              src={streamLink}
              className="w-full h-full rounded-2xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
            />
          ) : streamType === "video" ? (
            <video
              ref={videoRef}
              src={streamLink}
              className="w-full h-full rounded-2xl"
              controls
              autoPlay
              onError={handleVideoError}
            />
          ) : (
            <video
              ref={videoRef}
              src={streamLink}
              className="w-full h-full rounded-2xl"
              controls
              autoPlay
              onError={handleVideoError}
            />
          )}
        </div>

        {/* Live time: small, bottom-right */}
        <span className="absolute bottom-6 right-8 px-3 py-1 rounded-lg bg-gray-900/80 text-gray-200 text-xs font-mono flex items-center gap-2 select-none shadow">
          <Clock size={14} className="mr-1" />
          {currentTime}
        </span>

        {/* Empty background if video fails */}
        {videoError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 rounded-3xl z-30">
            <AlertCircle size={32} className="text-tv-red mb-2" />
            <span className="text-tv-red font-semibold mb-2">{videoError}</span>
            <span className="text-gray-400 text-xs">Stream Link: <span className="underline">{streamLink}</span></span>
          </div>
        )}
      </div>
    </div>
  )
}