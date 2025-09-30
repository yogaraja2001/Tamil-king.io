import React, { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Eye, EyeOff, LogIn } from 'lucide-react'

interface AdminLoginProps {
  onSuccess: () => void
  setLogoUrl: (url: string | null) => void
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, setLogoUrl }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const verifyLogin = useMutation(api.users.verifyLogin)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // Use verifyLogin mutation (expects { data: string })
      const data = JSON.stringify({ username, password })
      const response = await verifyLogin({ data })
      if (response?.success) {
        onSuccess()
      } else {
        setError("பயனாளர் பெயர் அல்லது கடவுச்சொல் தவறாக உள்ளது.")
      }
    } catch (err) {
      setError("உள்நுழைவு சோதனை தோல்வியடைந்தது.")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto bg-tv-dark rounded-3xl shadow-2xl p-8 mt-12">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <LogIn size={28} className="text-tv-blue" />
        நிர்வாக உள்நுழைவு
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-sm font-semibold mb-2">பயனாளர் பெயர்</label>
          <input
            type="text"
            id="username"
            autoComplete="username"
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-tv-blue"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            aria-label="Username"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold mb-2">கடவுச்சொல்</label>
          <div className="flex items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-tv-blue"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
            <button
              type="button"
              className="absolute right-3 text-gray-400 hover:text-tv-blue"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded-lg bg-tv-blue hover:bg-blue-700 font-semibold transition flex items-center justify-center"
          aria-label="Login"
        >
          {loading ? (
            <span className="animate-pulse">சோதனை...</span>
          ) : (
            <>
              <LogIn size={20} className="mr-2" />
              உள்நுழைவு
            </>
          )}
        </button>
        {error && <div className="text-tv-red text-sm mt-2">{error}</div>}
      </form>
    </div>
  )
}