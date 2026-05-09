import { createContext, useContext, useState, useCallback } from 'react'

const ArtistContext = createContext(null)

export const ArtistProvider = ({ children }) => {
  const [artist, setArtist] = useState(() => {
    const saved = localStorage.getItem('artistData')
    return saved ? JSON.parse(saved) : null
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('artistToken')
  })

  const login = useCallback((token, artistData) => {
    localStorage.setItem('artistToken', token)
    localStorage.setItem('artistData', JSON.stringify(artistData))
    setArtist(artistData)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('artistToken')
    localStorage.removeItem('artistData')
    setArtist(null)
    setIsAuthenticated(false)
  }, [])

  const updateArtist = useCallback((updates) => {
    const updated = { ...artist, ...updates }
    localStorage.setItem('artistData', JSON.stringify(updated))
    setArtist(updated)
  }, [artist])

  const value = {
    artist,
    isAuthenticated,
    login,
    logout,
    updateArtist,
  }

  return (
    <ArtistContext.Provider value={value}>
      {children}
    </ArtistContext.Provider>
  )
}

export const useArtist = () => {
  const context = useContext(ArtistContext)
  if (!context) {
    throw new Error('useArtist must be used within ArtistProvider')
  }
  return context
}
