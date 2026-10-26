import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "aadarsh-kushwaha-portfolio.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "aadarsh-kushwaha-portfolio",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "aadarsh-kushwaha-portfolio.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

let app = null;
let db = null;

// Only initialize if configured or when running on client/server
export function getFirebaseDb() {
  if (db) return db;

  try {
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
      app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      db = getFirestore(app);
      return db;
    }
  } catch (error) {
    console.warn("Firebase initialization skipped or credentials missing:", error?.message);
  }
  return null;
}

export { app };
