import axios from 'axios'

// Read base URLs from Vite environment variables (prefix VITE_)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5454'
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
})

export default api