import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
let auth = null;

function initFirebaseApp() {
  if (app) return app;
  if (typeof window === 'undefined') return null;
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) return null;
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  return app;
}

// Only initialize if configured or when running on client/server
export function getFirebaseDb() {
  if (db) return db;

  try {
    const initializedApp = initFirebaseApp();
    if (initializedApp) {
      db = getFirestore(initializedApp);
      return db;
    }
  } catch (error) {
    console.warn("Firebase Firestore initialization skipped:", error?.message);
  }
  return null;
}

export function getFirebaseAuth() {
  if (auth) return auth;

  try {
    const initializedApp = initFirebaseApp();
    if (initializedApp) {
      auth = getAuth(initializedApp);
      return auth;
    }
  } catch (error) {
    console.warn("Firebase Auth initialization skipped:", error?.message);
  }
  return null;
}

export { app };
