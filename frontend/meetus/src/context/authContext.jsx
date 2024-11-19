import {createContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {axiosInstance} from "../config/axios/axiosIntance.js"

import {app, auth} from "../config/firebase/firebaseConfig.js"
import { setDoc } from "firebase/firestore";
import {firestore} from "../../../config/firebase/firebaseConfig"

export const authContext = createContext()

export function AuthProvider({children}) {
  
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = async (email, password, nombre) => {

    await setDoc(doc(firestore, "users", user.user.uid), {
      nombre: nombre,
      email: user.user.email,
      id: user.user.uid
    })

    await setDoc(doc(firestore, "userchats", user.user.uid), {
      chats: []
    })

    try {
      const userData = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseId = userData.user.uid;
  
      const response = await axiosInstance.post('/users/new', {
        nombre,
        email,
        hashedPassword: password,
        firebaseId
      });
  
      if (response.status === 201) {
        console.log("Usuario registrado exitosamente");
      }
  
    } catch (error) {
      console.error("Error de autenticación de Firebase:", error.message);
    }
  }

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    signOut(auth);
  }

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider()
    const userData = await signInWithPopup(auth, googleProvider)

    console.log(userData)
    const firebaseId = userData.user.uid;
    const email = userData.user.email;
    const nombre = userData.user.displayName;

    await setDoc(doc(firestore, "users", userData.user.uid), {
      nombre,
      email,
      id: userData.user.uid
    })

    await setDoc(doc(firestore, "userchats", userData.user.uid), {
      chats: []
    })
    
      const response = await axiosInstance.post('/users/new', {
        nombre,
        email,
        firebaseId
      });
    
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