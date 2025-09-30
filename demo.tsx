import React, { useState } from 'react'
import { LivePlayer } from './LivePlayer'
import { AdminLogin } from './AdminLogin'
import { AdminPanel } from './AdminPanel'

// DEMO: This file shows how to use the main components with example data
export default function Demo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const exampleStreamSettings = {
    isLive: true,
    streamType: "youtube",
    streamLink: "https://www.youtube.com/embed/tgbNymZ7vqY",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Demo: நேரலை இணைய தொலைக்காட்சி</h1>
        <LivePlayer streamSettings={exampleStreamSettings} logoUrl={logoUrl} />
        <div className="mt-12">
          {isAuthenticated ? (
            <AdminPanel logoUrl={logoUrl} setLogoUrl={setLogoUrl} />
          ) : (
            <AdminLogin onSuccess={() => setIsAuthenticated(true)} setLogoUrl={setLogoUrl} />
          )}
        </div>
      </div>
    </div>
  )
}