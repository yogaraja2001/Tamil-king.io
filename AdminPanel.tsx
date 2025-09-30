import React, { useRef, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Check, Facebook, Play, Settings, Upload, Video, X, Youtube } from 'lucide-react'

interface AdminPanelProps {
  logoUrl: string | null
  setLogoUrl: (url: string | null) => void
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ logoUrl, setLogoUrl }) => {
  const inputLogoRef = useRef<HTMLInputElement | null>(null)
  const [previewLogo, setPreviewLogo] = useState<string | null>(logoUrl)
  const [isLive, setIsLive] = useState<boolean>(false)
  const [streamType, setStreamType] = useState<string>("m3u8")
  const [streamLink, setStreamLink] = useState<string>("")
  const [fbLink, setFbLink] = useState<string>("")
  const [ytLink, setYtLink] = useState<string>("")
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Get current streamSettings to fetch id for update
  const streamSettings = useQuery(api.streamSettings.getStreamSettings, {})

  // For updating streamSettings
  const updateStreamSettings = useMutation(api.streamSettings.updateStreamSettings)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string)
        setLogoUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      if (!streamSettings || !streamSettings._id) {
        setError("இணைப்பு இல்லை. மீண்டும் முயற்சியுங்கள்.")
        setLoading(false)
        return
      }
      await updateStreamSettings({ id: streamSettings._id })
      setSuccess("நேரலை அமைப்புகள் வெற்றிகரமாக புதுப்பிக்கப்பட்டது.")
    } catch (err) {
      setError("புதுப்பிப்பு தோல்வியடைந்தது.")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto bg-tv-dark rounded-3xl shadow-2xl p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Settings size={28} className="text-tv-blue" />
        நிர்வாக கட்டுப்பாடுகள்
      </h2>
      <form className="space-y-8" onSubmit={handleUpdateSettings}>
        <div>
          <label className="block text-sm font-semibold mb-2">Logo (வலது மேல்)</label>
          <input
            type="file"
            accept="image/*"
            ref={inputLogoRef}
            onChange={handleLogoUpload}
            className="block w-full text-sm text-gray-400 rounded-lg border border-gray-600 bg-gray-800 focus:outline-none focus:ring-tv-blue"
            aria-label="Upload Logo"
          />
          {previewLogo && (
            <img
              src={previewLogo}
              alt="Logo Preview"
              className="mt-2 rounded-lg w-32 h-16 object-contain border border-gray-700 bg-gray-900"
              onError={e => (e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='64' viewBox='0 0 128 64'%3E%3Crect width='128' height='64' fill='%236366f1'/%3E%3Ctext x='64' y='34' font-family='Arial' font-size='18' fill='white' text-anchor='middle' dy='5'%3ELogo%3C/text%3E%3C/svg%3E")}
            />
          )}
        </div>

        <div className="flex items-center gap-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isLive}
              onChange={e => setIsLive(e.target.checked)}
              className="form-checkbox h-5 w-5 text-tv-blue"
              aria-label="Live On/Off"
            />
            <Play size={20} className={isLive ? "text-tv-red animate-pulse" : "text-gray-400"} />
            நேரலை
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Streaming Link</label>
          <select
            value={streamType}
            onChange={e => setStreamType(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
            aria-label="Stream Type"
          >
            <option value="m3u8">M3U8 (HLS)</option>
            <option value="facebook">Facebook Live</option>
            <option value="youtube">YouTube Live</option>
            <option value="video">Direct Video Link</option>
          </select>
          <input
            type="url"
            placeholder="Streaming Link (e.g., m3u8/fb/yt/video url)"
            className="w-full px-4 py-2 mt-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
            value={streamLink}
            onChange={e => setStreamLink(e.target.value)}
            aria-label="Streaming Link"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Facebook Live Link</label>
          <input
            type="url"
            placeholder="Facebook Live URL"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
            value={fbLink}
            onChange={e => setFbLink(e.target.value)}
            aria-label="Facebook Live Link"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">YouTube Live/Video Link</label>
          <input
            type="url"
            placeholder="YouTube Video/Live URL"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
            value={ytLink}
            onChange={e => setYtLink(e.target.value)}
            aria-label="YouTube Link"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded-lg bg-tv-blue hover:bg-blue-700 font-semibold transition flex items-center justify-center"
          aria-label="Update Stream Settings"
        >
          {loading ? (
            <span className="animate-pulse">புதுப்பிக்கிறது...</span>
          ) : (
            <>
              <Check size={20} className="mr-2" />
              புதுப்பிக்க
            </>
          )}
        </button>
        {success && <div className="text-green-500 font-semibold mt-2">{success}</div>}
        {error && <div className="text-tv-red font-semibold mt-2">{error}</div>}
      </form>
    </div>
  )
}