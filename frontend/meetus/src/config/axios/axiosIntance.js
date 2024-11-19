import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: 'https://meetus-api.vercel.app/api/',
  timeout: 1000,
})