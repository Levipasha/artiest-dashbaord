import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('artistToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Artist authentication APIs
export const artistAuth = {
  // Request OTP for artist login
  requestOTP: async (email) => {
    const response = await api.post('/artists/login/request-otp', { email })
    return response.data
  },

  // Verify OTP and get token
  verifyOTP: async (email, otp) => {
    const response = await api.post('/artists/login/verify-otp', { email, otp })
    return response.data
  },

  // Get current artist profile
  getProfile: async () => {
    const response = await api.get('/artists/me')
    return response.data
  },

  // Update artist profile
  updateProfile: async (data) => {
    const response = await api.put('/artists/me', data)
    return response.data
  },

  // Upload artist image
  uploadImage: async (formData) => {
    const response = await api.post('/artists/me/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}

export default api
