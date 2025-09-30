import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import { Check, LogIn, LogOut, Play, Settings, Tv, Video, X } from 'lucide-react'
import { AdminLogin } from './components/AdminLogin'
import { AdminPanel } from './components/AdminPanel'
import { LivePlayer } from './components/LivePlayer'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  // Get current stream settings
  const streamSettings = useQuery(api.streamSettings.getStreamSettings, {})

  // If not authenticated, show only the player for viewers
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
        <header className="w-full flex items-center justify-between px-6 py-4 bg-tv-dark shadow-lg">
          <div className="flex items-center gap-3">
            <Tv size={32} className="text-tv-blue" aria-label="TV Logo" />
            <span className="text-2xl font-bold tracking-tight">நேரலை தொலைக்காட்சி</span>
          </div>
          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Settings size={24} className="text-tv-blue" aria-label="Admin Panel" />
                <button
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-tv-red hover:bg-red-700 font-semibold transition"
                  onClick={() => setIsAuthenticated(false)}
                  aria-label="Admin Logout"
                >
                  <LogOut size={20} className="mr-2" />
                  வெளியேறு
                </button>
              </>
            ) : (
              <button
                className="inline-flex items-center px-4 py-2 rounded-lg bg-tv-blue hover:bg-blue-700 font-semibold transition"
                onClick={() => setIsAuthenticated(true)}
                aria-label="Admin Login"
              >
                <LogIn size={20} className="mr-2" />
                நிர்வாகம்
              </button>
            )}
          </nav>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-2 py-4">
          <Routes>
            <Route
              path="/"
              element={
                <LivePlayer
                  streamSettings={streamSettings}
                  logoUrl={logoUrl}
                />
              }
            />
            <Route
              path="/admin"
              element={
                !isAuthenticated ? (
                  <AdminLogin onSuccess={() => setIsAuthenticated(true)} setLogoUrl={setLogoUrl} />
                ) : (
                  <AdminPanel
                    logoUrl={logoUrl}
                    setLogoUrl={setLogoUrl}
                  />
                )
              }
            />
            {/* Protect admin route */}
            <Route
              path="/admin/panel"
              element={
                isAuthenticated ? (
                  <AdminPanel
                    logoUrl={logoUrl}
                    setLogoUrl={setLogoUrl}
                  />
                ) : (
                  <Navigate to="/admin" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="w-full py-3 px-6 text-center text-gray-400 bg-tv-dark border-t border-gray-800">
          © 2024 நேரலை இணைய தொலைக்காட்சி. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  )
}