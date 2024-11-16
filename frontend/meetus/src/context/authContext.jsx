import {createContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import {app, auth} from "../config/firebase/firebaseConfig.js"

export const authContext = createContext()

export function AuthProvider({children}) {
  
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  }
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    signOut(auth);
  }

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  useEffect(()=> {
      onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false)
    })
  }, [])
  
  return (
    <authContext.Provider value={{user, signup, login, logout, loading, loginWithGoogle}}>
      {children}
    </authContext.Provider>
  )
}