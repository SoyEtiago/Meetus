import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'


const { VITE_API_KEY, VITE_AUTH_DOMAIN, VITE_PROJECT_ID, VITE_STORAGE_BUCKET, VITE_MESSAGINGSENDER_ID, VITE_APP_ID, VITE_MEASUREMENT_ID} = import.meta.env

const firebaseConfig  = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGINGSENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID
};

let app, auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log('Firebase SDK connection established');
} catch (error) {
  console.error(`Error connecting to Firebase SDK: ${error.message}`);
}

export {app, auth}