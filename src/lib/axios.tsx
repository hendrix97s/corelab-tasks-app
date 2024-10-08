import Axios from 'axios'
import { getCookie } from 'cookies-next';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

axios.interceptors.request.use(
  (config) => {
    const token = getCookie(process.env.NEXT_PUBLIC_USER_PERSONAL_ACCESS_TOKEN!);
    if (token) 
      config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
)

export default axios
