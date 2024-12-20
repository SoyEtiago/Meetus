import { useContext } from "react"
import { authContext } from "../context/authContext"

export const useAuth = () => {
  const context = useContext(authContext)
  return context;
}