import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  writeBatch,
} from 'firebase/firestore';
import { getFirebaseDb } from './firebase';
import { Projects as initialProjects } from '../data/projectData';

const COLLECTION_NAME = 'projects';

/**
 * Ensure initial local projects exist in Firestore so that order shifts and queries
 * apply uniformly to all projects.
 */
export async function ensureInitialProjectsInFirestore() {
  const db = getFirebaseDb();
  if (!db) return;

  try {
    const projectsCol = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(projectsCol);

    const existingTitles = new Set(
      snapshot.docs.map((d) => (d.data().title || '').toLowerCase().trim())
    );

    const missing = initialProjects.filter(
      (p) => !existingTitles.has((p.title || '').toLowerCase().trim())
    );

    if (missing.length === 0) return;

    for (let i = 0; i < missing.length; i += 400) {
      const chunk = missing.slice(i, i + 400);
      const batch = writeBatch(db);
      for (const proj of chunk) {
        const newDocRef = doc(projectsCol);
        batch.set(newDocRef, {
          title: proj.title,
          description: proj.description,
          type: proj.type,
          tech: proj.tech,
          icon: proj.icon || getDefaultTechIcon(proj.tech),
          img: typeof proj.img === 'object' && proj.img?.src ? proj.img.src : String(proj.img || ''),
          gitLink: proj.gitLink || '',
          hostedLink: proj.hostedLink || '',
          order: Number(proj.order) || (i + 1),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      await batch.commit();
    }
  } catch (err) {
    console.warn("Could not ensure initial projects in Firestore:", err?.message);
  }
}

/**
 * Rearrange projects in Firestore when inserting or updating a project at `targetOrder`:
 * All existing projects with order >= targetOrder (excluding `excludeDocId`) have their order incremented by 1.
 */
export async function shiftOrdersAfter(targetOrder, excludeDocId = null) {
  const db = getFirebaseDb();
  if (!db) return;

  const targetNum = Number(targetOrder);
  if (isNaN(targetNum) || targetNum <= 0) return;

  const projectsCol = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(projectsCol);
  if (snapshot.empty) return;

  const docsToShift = [];
  snapshot.docs.forEach((docSnap) => {
    if (excludeDocId && docSnap.id === excludeDocId) return;
    const data = docSnap.data();
    const currentOrder = Number(data.order);
    if (!isNaN(currentOrder) && currentOrder >= targetNum) {
      docsToShift.push({
        ref: docSnap.ref,
        id: docSnap.id,
        currentOrder,
        newOrder: currentOrder + 1,
      });
    }
  });

  if (docsToShift.length === 0) return;

  // Sort descending so there is no ambiguity during update
  docsToShift.sort((a, b) => b.currentOrder - a.currentOrder);

  // Batch update all shifted documents atomically (chunked at 400 for safety)
  for (let i = 0; i < docsToShift.length; i += 400) {
    const chunk = docsToShift.slice(i, i + 400);
    const batch = writeBatch(db);
    for (const item of chunk) {
      batch.update(item.ref, {
        order: item.newOrder,
        updatedAt: serverTimestamp(),
      });
    }
    await batch.commit();
  }
}

/**
 * Fetch all projects from Firestore with fallback to local projectData.js
 */
export async function fetchProjects() {
  const db = getFirebaseDb();
  if (!db) {
    return [...initialProjects].sort(
      (a, b) => (Number(a.order) || 99) - (Number(b.order) || 99)
    );
  }

  try {
    const projectsCol = collection(db, COLLECTION_NAME);
    const q = query(projectsCol, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Auto-populate initial projects to Firestore if empty, then return them
      try {
        await ensureInitialProjectsInFirestore();
        const seededSnap = await getDocs(q);
        if (!seededSnap.empty) {
          return seededSnap.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              order: Number(data.order) || 99,
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
        }
      } catch (seedErr) {
        console.warn("Could not auto-seed Firestore:", seedErr);
      }
      return [...initialProjects].sort(
        (a, b) => (Number(a.order) || 99) - (Number(b.order) || 99)
      );
    }

    const firestoreProjects = snapshot.docs.map((docSnap, index) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        order: data.order !== undefined ? Number(data.order) : index + 1,
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

    // Merge any initial local projects that are not yet in Firestore so all projects always appear
    const firestoreTitles = new Set(firestoreProjects.map(p => (p.title || '').toLowerCase().trim()));
    const missingInitial = initialProjects
      .filter(p => !firestoreTitles.has((p.title || '').toLowerCase().trim()))
      .map((p, idx) => ({
        ...p,
        order: Number(p.order || p.id || (firestoreProjects.length + idx + 1)),
      }));

    return [...firestoreProjects, ...missingInitial].sort(
      (a, b) => (Number(a.order) || 99) - (Number(b.order) || 99)
    );
  } catch (err) {
    console.warn("Could not fetch from Firestore, using local projects fallback:", err?.message);
    return [...initialProjects].sort(
      (a, b) => (Number(a.order) || 99) - (Number(b.order) || 99)
    );
  }
}

/**
 * Add a new project to Firestore.
 * Automatically rearranges all existing projects at or after project.order (+1).
 */
export async function addProjectToDb(project) {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase Firestore is not initialized. Please verify your environment credentials.");
  }

  // Ensure initial projects exist in Firestore so reordering affects all projects
  await ensureInitialProjectsInFirestore();

  const targetOrder = Number(project.order);
  if (!isNaN(targetOrder) && targetOrder > 0) {
    // Shift all projects at or after targetOrder by +1
    await shiftOrdersAfter(targetOrder);
  }

  const projectsCol = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(projectsCol, {
    ...project,
    order: !isNaN(targetOrder) && targetOrder > 0 ? targetOrder : 99,
    icon: project.icon || getDefaultTechIcon(project.tech),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Update an existing project in Firestore.
 * If the display order was changed, shifts other projects at or after new order (+1).
 */
export async function updateProjectInDb(id, project, originalOrder = null) {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error("Firebase Firestore is not initialized.");
  }

  const newOrder = Number(project.order);
  const prevOrder = originalOrder !== null ? Number(originalOrder) : null;

  // If order changed, shift other projects at or after newOrder (+1)
  if (!isNaN(newOrder) && newOrder > 0 && (prevOrder === null || prevOrder !== newOrder)) {
    await shiftOrdersAfter(newOrder, id);
  }

  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...project,
    order: !isNaN(newOrder) && newOrder > 0 ? newOrder : 99,
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

  const existingTitles = new Set(
    snapshot.docs.map((d) => (d.data().title || '').toLowerCase().trim())
  );

  const missing = initialProjects.filter(
    (p) => !existingTitles.has((p.title || '').toLowerCase().trim())
  );

  if (missing.length === 0) {
    return 0;
  }

  for (let i = 0; i < missing.length; i++) {
    const proj = missing[i];
    await addDoc(projectsCol, {
      title: proj.title,
      description: proj.description,
      type: proj.type,
      tech: proj.tech,
      icon: proj.icon || getDefaultTechIcon(proj.tech),
      img: typeof proj.img === 'object' && proj.img?.src ? proj.img.src : String(proj.img || ''),
      gitLink: proj.gitLink || '',
      hostedLink: proj.hostedLink || '',
      order: Number(proj.order) || (i + 1),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return missing.length;
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
