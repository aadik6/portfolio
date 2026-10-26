import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { getFirebaseDb } from './firebase';
import { Projects as initialProjects } from '../data/projectData';

const COLLECTION_NAME = 'projects';

/**
 * Fetch all projects from Firestore with fallback to local projectData.js
 */
export async function fetchProjects() {
  const db = getFirebaseDb();
  if (!db) {
    return initialProjects;
  }

  try {
    const projectsCol = collection(db, COLLECTION_NAME);
    const q = query(projectsCol, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Fallback if collection exists but has no documents yet
      return initialProjects;
    }

    const projects = snapshot.docs.map((docSnap, index) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        order: data.order !== undefined ? data.order : index + 1,
        type: data.type || 'personal',
        tech: data.tech || 'react',
        title: data.title || '',
        description: data.description || '',
        icon: data.icon || getDefaultTechIcon(data.tech),
        img: data.img || '',
        gitLink: data.gitLink || '',
        hostedLink: data.hostedLink || '',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
      };
    });

    return projects;
  } catch (err) {
    console.warn("Could not fetch from Firestore, using local projects fallback:", err?.message);
    return initialProjects;
  }
}

/**
 * Add a new project to Firestore
 */
export async function addProjectToDb(project) {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase Firestore is not initialized. Please verify your environment credentials.");
  }

  const projectsCol = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(projectsCol, {
    ...project,
    order: Number(project.order) || 99,
    icon: project.icon || getDefaultTechIcon(project.tech),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Update an existing project in Firestore
 */
export async function updateProjectInDb(id, project) {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase Firestore is not initialized.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...project,
    order: Number(project.order) || 99,
    icon: project.icon || getDefaultTechIcon(project.tech),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a project from Firestore
 */
export async function deleteProjectFromDb(id) {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase Firestore is not initialized.");
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

/**
 * Seed initial local projects to Firestore
 */
export async function seedInitialProjectsToFirestore() {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase Firestore is not initialized.");
  }

  const projectsCol = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(projectsCol);

  if (!snapshot.empty) {
    throw new Error("Firestore projects collection is not empty. Please clear existing projects first to avoid duplicates.");
  }

  for (let i = 0; i < initialProjects.length; i++) {
    const proj = initialProjects[i];
    await addDoc(projectsCol, {
      title: proj.title,
      description: proj.description,
      type: proj.type,
      tech: proj.tech,
      icon: proj.icon || getDefaultTechIcon(proj.tech),
      img: typeof proj.img === 'object' && proj.img?.src ? proj.img.src : String(proj.img || ''),
      gitLink: proj.gitLink || '',
      hostedLink: proj.hostedLink || '',
      order: i + 1,
      createdAt: serverTimestamp(),
    });
  }

  return initialProjects.length;
}

/**
 * Helper to get default Remixicon for a technology name
 */
export function getDefaultTechIcon(tech) {
  const t = (tech || '').toLowerCase();
  if (t.includes('react') || t.includes('next')) return 'ri-reactjs-fill';
  if (t.includes('node') || t.includes('express')) return 'ri-nodejs-fill';
  if (t.includes('nest')) return 'ri-server-fill';
  if (t.includes('type') || t.includes('ts')) return 'ri-code-s-slash-fill';
  if (t.includes('php')) return 'ri-php-fill';
  if (t.includes('html')) return 'ri-html5-fill';
  if (t.includes('css') || t.includes('tailwind')) return 'ri-css3-fill';
  if (t.includes('python')) return 'ri-terminal-box-fill';
  if (t.includes('vue')) return 'ri-vuejs-fill';
  return 'ri-code-box-line';
}
