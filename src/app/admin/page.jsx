'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  fetchProjects,
  addProjectToDb,
  updateProjectInDb,
  deleteProjectFromDb,
  seedInitialProjectsToFirestore,
} from '../../lib/projectService';
import { getFirebaseDb, getFirebaseAuth } from '../../lib/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import Link from 'next/link';

// Strictly allowed administrator email
const ADMIN_EMAIL = 'aadarshkumarman@gmail.com';
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [mobileTab, setMobileTab] = useState('list'); // 'list' | 'form'

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [originalOrder, setOriginalOrder] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'personal',
    tech: 'react',
    img: '',
    gitLink: '',
    hostedLink: '',
    order: 1,
  });

  const fileInputRef = useRef(null);
  const inactivityTimerRef = useRef(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = (user.email || '').toLowerCase().trim();
        if (userEmail === ADMIN_EMAIL) {
          setIsAuthenticated(true);
          setAdminUser({ email: user.email, name: user.displayName, photoURL: user.photoURL });
          sessionStorage.setItem('portfolio_admin_auth', 'true');
          setAuthError('');
        } else {
          firebaseSignOut(auth);
          setIsAuthenticated(false);
          setAdminUser(null);
          sessionStorage.removeItem('portfolio_admin_auth');
          setAuthError(`Access denied: ${user.email} is not authorized. Only ${ADMIN_EMAIL} has access.`);
        }
      } else {
        setIsAuthenticated(false);
        setAdminUser(null);
        sessionStorage.removeItem('portfolio_admin_auth');
      }
    });

    return () => unsubscribe();
  }, []);

  // Inactivity auto-logout (30 mins)
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (isAuthenticated) {
      inactivityTimerRef.current = setTimeout(() => {
        handleLogout();
        alert('Admin session expired due to 30 minutes of inactivity.');
      }, INACTIVITY_TIMEOUT_MS);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((evt) => window.addEventListener(evt, resetInactivityTimer));
    resetInactivityTimer();
    return () => {
      events.forEach((evt) => window.removeEventListener(evt, resetInactivityTimer));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [isAuthenticated, resetInactivityTimer]);

  // Load projects on authenticate
  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      showMessage(`Error loading projects: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage({ text: '', type: '' });
    }, 4500);
  };

  // Google Sign-in Handler (Restricted strictly to aadarshkumarman@gmail.com)
  const handleGoogleSignIn = async () => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setAuthError('Firebase Auth is not initialized. Please verify NEXT_PUBLIC_FIREBASE_API_KEY in .env.local.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const userEmail = (result.user.email || '').toLowerCase().trim();

      if (userEmail === ADMIN_EMAIL) {
        setIsAuthenticated(true);
        setAdminUser({
          email: result.user.email,
          name: result.user.displayName,
          photoURL: result.user.photoURL,
        });
        sessionStorage.setItem('portfolio_admin_auth', 'true');
        setAuthError('');
      } else {
        await firebaseSignOut(auth);
        setIsAuthenticated(false);
        setAdminUser(null);
        sessionStorage.removeItem('portfolio_admin_auth');
        setAuthError(`Access denied: ${userEmail} is not authorized. Only ${ADMIN_EMAIL} can access this admin panel.`);
      }
    } catch (err) {
      if (err.code === 'auth/unauthorized-domain') {
        const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'your domain';
        setAuthError(`Domain "${currentDomain}" is not authorized in Firebase. Please add "${currentDomain}" to Firebase Console > Authentication > Settings > Authorized domains.`);
      } else if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError(err.message || 'Google authentication failed.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    const auth = getFirebaseAuth();
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        console.warn('Sign out error:', e);
      }
    }
    setIsAuthenticated(false);
    setAdminUser(null);
    sessionStorage.removeItem('portfolio_admin_auth');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image File Upload directly to filesystem (/uploads)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showMessage('Please select a valid image file (PNG, JPG, WEBP, SVG).', 'error');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      showMessage('Image exceeds 8MB size limit.', 'error');
      return;
    }

    setIsUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setFormData((prev) => ({ ...prev, img: data.url }));
          showMessage(`Image saved to file: ${data.url}`);
          setIsUploading(false);
          return;
        }
      }

      // Client-side compressed WebP fallback if API route is unavailable
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgEl = new Image();
        imgEl.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          let width = imgEl.width;
          let height = imgEl.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(imgEl, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/webp', 0.85);
          setFormData((prev) => ({ ...prev, img: compressedDataUrl }));
          showMessage('Image converted and linked successfully!');
          setIsUploading(false);
        };
        imgEl.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      showMessage(`Upload error: ${err.message}`, 'error');
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showMessage('Project title is required.', 'error');
      return;
    }

    setLoading(true);
    try {
      if (isEditing && editingId) {
        await updateProjectInDb(editingId, formData, originalOrder);
        showMessage(`Project updated at order #${formData.order}! Any subsequent projects were rearranged (+1).`);
      } else {
        await addProjectToDb(formData);
        showMessage(`New project added at order #${formData.order}! Previous #${formData.order} and all subsequent projects were rearranged (+1).`);
      }
      resetForm();
      setMobileTab('list');
      await loadProjects();
    } catch (err) {
      showMessage(`Operation failed: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setEditingId(project.id);
    setOriginalOrder(project.order || 1);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      type: project.type || 'personal',
      tech: project.tech || 'react',
      img: typeof project.img === 'object' && project.img?.src ? project.img.src : String(project.img || ''),
      gitLink: project.gitLink || '',
      hostedLink: project.hostedLink || '',
      order: project.order || 1,
    });
    setMobileTab('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete project "${title}"?`)) {
      return;
    }

    setLoading(true);
    try {
      await deleteProjectFromDb(id);
      showMessage(`Project "${title}" deleted.`);
      await loadProjects();
    } catch (err) {
      showMessage(`Delete failed: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setOriginalOrder(null);
    setFormData({
      title: '',
      description: '',
      type: 'personal',
      tech: 'react',
      img: '',
      gitLink: '',
      hostedLink: '',
      order: projects.length + 1,
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSeed = async () => {
    if (!window.confirm("Seed all initial local projects into Firestore?")) return;
    setLoading(true);
    try {
      const count = await seedInitialProjectsToFirestore();
      showMessage(`Successfully migrated ${count} projects into Firestore!`);
      await loadProjects();
    } catch (err) {
      showMessage(`Migration notice: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const isDbConfigured = Boolean(getFirebaseDb());

  // Login Gate (Google Sign-In Only)
  if (!isAuthenticated) {
    return (
      <div className="tw-min-h-[80vh] tw-flex tw-items-center tw-justify-center tw-p-3 sm:tw-p-4 tw-font-mono">
        <div className="tw-bg-[#011627] tw-border tw-border-[#1E2D3D] tw-rounded-lg tw-p-5 sm:tw-p-8 tw-max-w-md tw-w-full tw-shadow-2xl">
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
            <div className="tw-flex tw-items-center tw-gap-2">
              <i className="ri-shield-keyhole-line tw-text-[#43D9AD] tw-text-xl sm:tw-text-2xl"></i>
              <h1 className="tw-text-white tw-text-lg sm:tw-text-xl tw-font-bold">_admin-login</h1>
            </div>
            <span className="tw-text-[10px] tw-text-[#43D9AD] tw-border tw-border-[#43D9AD]/30 tw-px-2 tw-py-0.5 tw-rounded tw-bg-[#43D9AD]/10">
              GOOGLE AUTH
            </span>
          </div>

          <p className="tw-text-[#607B96] tw-text-xs tw-mb-5">
            // Administrator access is strictly restricted to verified owner
          </p>

          <div className="tw-space-y-4 sm:tw-space-y-5">
            <div className="tw-bg-[#011221] tw-border tw-border-[#1E2D3D] tw-p-3.5 tw-rounded tw-text-xs">
              <p className="tw-text-[#607B96] tw-mb-1">// Authorized administrator account:</p>
              <p className="tw-text-white tw-font-semibold tw-flex tw-items-center tw-gap-1.5 font-mono tw-break-all">
                <i className="ri-shield-check-line tw-text-[#43D9AD] tw-text-base tw-flex-shrink-0"></i> {ADMIN_EMAIL}
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={authLoading}
              className="tw-w-full tw-bg-[#1C2B3A] tw-border tw-border-[#1E2D3D] hover:tw-border-[#43D9AD] hover:tw-text-[#43D9AD] tw-text-white tw-py-3.5 tw-rounded-md tw-text-xs tw-flex tw-items-center tw-justify-center tw-gap-2.5 tw-transition tw-font-semibold disabled:tw-opacity-50"
            >
              <i className={authLoading ? "ri-loader-4-line tw-animate-spin tw-text-lg" : "ri-google-fill tw-text-lg tw-text-[#43D9AD]"}></i>
              <span>{authLoading ? "verifying_identity()..." : "Sign in with Google"}</span>
            </button>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="tw-mt-4 tw-p-3 tw-rounded tw-border tw-border-[#E99287]/40 tw-bg-[#E99287]/10 tw-text-[#E99287] tw-text-xs tw-break-words">
              // {authError}
            </div>
          )}

          <div className="tw-mt-6 tw-pt-4 tw-border-t tw-border-[#1E2D3D] tw-flex tw-justify-between tw-text-[11px] tw-text-[#607B96]">
            <span>// Google OAuth 2.0</span>
            <Link href="/" className="hover:tw-text-[#43D9AD] tw-py-1">
              &larr; return home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tw-min-h-[85vh] tw-p-3 sm:tw-p-6 md:tw-p-8 tw-max-w-6xl tw-mx-auto tw-font-mono">
      {/* Top Header */}
      <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-justify-between tw-pb-4 tw-border-b tw-border-[#1E2D3D] tw-mb-6 sm:tw-mb-8 tw-gap-4">
        <div>
          <h1 className="tw-text-white tw-text-xl sm:tw-text-2xl tw-font-bold tw-flex tw-items-center tw-gap-2">
            <i className="ri-dashboard-fill tw-text-[#43D9AD]"></i> _projects-manager
          </h1>
          <div className="tw-text-[#607B96] tw-text-xs tw-mt-1 tw-flex tw-flex-wrap tw-items-center tw-gap-x-2 tw-gap-y-1">
            <span>// Firestore: {isDbConfigured ? <span className="tw-text-[#43D9AD]">● connected</span> : <span className="tw-text-[#FEA55F]">▲ local fallback</span>}</span>
            {adminUser?.email && (
              <span className="tw-text-[#43D9AD] sm:tw-border-l sm:tw-border-[#1E2D3D] sm:tw-pl-2 tw-break-all">
                auth: {adminUser.email}
              </span>
            )}
          </div>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2.5 sm:tw-gap-3">
          <Link
            href="/projects"
            className="tw-flex-1 sm:tw-flex-initial tw-text-center tw-bg-[#011221] tw-border tw-border-[#1E2D3D] hover:tw-border-[#43D9AD] tw-text-[#607B96] hover:tw-text-white tw-px-3.5 tw-py-2 sm:tw-py-1.5 tw-rounded tw-text-xs tw-transition"
          >
            view /projects
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="tw-flex-1 sm:tw-flex-initial tw-bg-[#1C2B3A] tw-border tw-border-[#1E2D3D] hover:tw-border-[#E99287] hover:tw-text-[#E99287] tw-text-[#607B96] tw-px-3.5 tw-py-2 sm:tw-py-1.5 tw-rounded tw-text-xs tw-transition tw-flex tw-items-center tw-justify-center tw-gap-1.5"
          >
            <i className="ri-logout-box-r-line"></i> logout()
          </button>
        </div>
      </div>

      {/* Status banner */}
      {statusMessage.text && (
        <div
          className={`tw-mb-6 tw-p-3 sm:tw-p-3.5 tw-rounded tw-border tw-text-xs tw-break-words ${
            statusMessage.type === 'error'
              ? 'tw-bg-[#E99287]/15 tw-border-[#E99287] tw-text-[#E99287]'
              : 'tw-bg-[#43D9AD]/15 tw-border-[#43D9AD] tw-text-[#43D9AD]'
          }`}
        >
          // {statusMessage.text}
        </div>
      )}

      {/* Mobile Tab Switcher */}
      <div className="lg:tw-hidden tw-grid tw-grid-cols-2 tw-gap-2 tw-mb-6 tw-bg-[#011221] tw-p-1.5 tw-rounded-lg tw-border tw-border-[#1E2D3D]">
        <button
          type="button"
          onClick={() => setMobileTab('list')}
          className={`tw-py-2.5 tw-px-3 tw-rounded-md tw-text-xs tw-font-semibold tw-transition tw-flex tw-items-center tw-justify-center tw-gap-1.5 ${
            mobileTab === 'list'
              ? 'tw-bg-[#1C2B3A] tw-text-[#43D9AD] tw-shadow-sm'
              : 'tw-text-[#607B96] hover:tw-text-white'
          }`}
        >
          <i className="ri-folder-line"></i>
          <span>Projects ({projects.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('form')}
          className={`tw-py-2.5 tw-px-3 tw-rounded-md tw-text-xs tw-font-semibold tw-transition tw-flex tw-items-center tw-justify-center tw-gap-1.5 ${
            mobileTab === 'form'
              ? 'tw-bg-[#1C2B3A] tw-text-[#43D9AD] tw-shadow-sm'
              : 'tw-text-[#607B96] hover:tw-text-white'
          }`}
        >
          <i className={isEditing ? 'ri-edit-line' : 'ri-add-line'}></i>
          <span>{isEditing ? 'Edit Project' : '+ New Project'}</span>
        </button>
      </div>

      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-6 lg:tw-gap-8">
        {/* Project Form (Add / Edit) */}
        <div className={`lg:tw-col-span-5 ${mobileTab === 'form' ? 'tw-block' : 'tw-hidden lg:tw-block'}`}>
          <div className="tw-bg-[#011627] tw-border tw-border-[#1E2D3D] tw-rounded-lg tw-p-4 sm:tw-p-6 tw-shadow-xl">
            <h2 className="tw-text-white tw-text-base sm:tw-text-lg tw-font-semibold tw-mb-4 tw-flex tw-items-center tw-justify-between">
              <span>{isEditing ? '// edit-project' : '// add-new-project'}</span>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setMobileTab('list');
                  }}
                  className="tw-text-xs tw-text-[#E99287] hover:tw-underline tw-py-1 tw-px-2"
                >
                  cancel
                </button>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="tw-space-y-4 tw-text-xs">
              <div>
                <label className="tw-block tw-text-[#607B96] tw-mb-1 font-semibold">_title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="e.g. BirgunjByte News Portal"
                  className="ai-chat-input tw-w-full"
                  required
                />
              </div>

              <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-3">
                <div>
                  <label className="tw-block tw-text-[#607B96] tw-mb-1 font-semibold">_category</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    className="ai-chat-input tw-w-full tw-cursor-pointer"
                  >
                    <option value="personal">personal</option>
                    <option value="professional">professional</option>
                  </select>
                </div>
                <div>
                  <label className="tw-block tw-text-[#607B96] tw-mb-1 font-semibold">_tech</label>
                  <select
                    name="tech"
                    value={formData.tech}
                    onChange={handleFormChange}
                    className="ai-chat-input tw-w-full tw-cursor-pointer"
                  >
                    <option value="react">react</option>
                    <option value="nextjs">nextjs</option>
                    <option value="nodejs">nodejs</option>
                    <option value="nestjs">nestjs</option>
                    <option value="typescript">typescript</option>
                    <option value="php">php</option>
                    <option value="html">html</option>
                    <option value="css">css</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="tw-block tw-text-[#607B96] tw-mb-1 font-semibold">_description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                  placeholder="Short description of the project, features, and stack..."
                  className="ai-chat-input tw-w-full"
                  required
                />
              </div>

              {/* Upload Image to File & Save Link */}
              <div className="tw-p-3 sm:tw-p-3.5 tw-bg-[#011221] tw-border tw-border-[#1E2D3D] tw-rounded-lg tw-space-y-2.5">
                <div className="tw-flex tw-items-center tw-justify-between">
                  <label className="tw-block tw-text-[#607B96] tw-font-semibold">
                    _project_image (upload & link)
                  </label>
                  {formData.img && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, img: '' }))}
                      className="tw-text-[#E99287] hover:tw-underline tw-text-[11px] tw-p-1"
                    >
                      clear
                    </button>
                  )}
                </div>

                <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2.5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="tw-hidden"
                    id="project-image-input"
                  />
                  <label
                    htmlFor="project-image-input"
                    className="tw-bg-[#1C2B3A] tw-border tw-border-[#1E2D3D] hover:tw-border-[#43D9AD] hover:tw-text-[#43D9AD] tw-text-white tw-px-3.5 tw-py-2 tw-rounded-md tw-cursor-pointer tw-flex tw-items-center tw-gap-1.5 tw-transition tw-text-xs"
                  >
                    <i className={isUploading ? "ri-loader-4-line tw-animate-spin" : "ri-upload-cloud-2-line"}></i>
                    <span>{isUploading ? 'uploading file...' : 'upload image file'}</span>
                  </label>
                  <span className="tw-text-[#607B96] tw-text-[11px]">
                    PNG, JPG, WEBP (max 8MB)
                  </span>
                </div>

                {/* Image Preview & Generated Link */}
                {formData.img && (
                  <div className="tw-mt-2 tw-pt-2 tw-border-t tw-border-[#1E2D3D] tw-flex tw-items-center tw-gap-3">
                    <img
                      src={formData.img}
                      alt="Project preview"
                      className="tw-w-16 tw-h-12 tw-object-cover tw-rounded tw-border tw-border-[#1E2D3D] tw-flex-shrink-0"
                    />
                    <div className="tw-flex-1 tw-overflow-hidden">
                      <p className="tw-text-[10px] tw-text-[#43D9AD]">// saved link:</p>
                      <p className="tw-text-xs tw-text-gray-300 tw-truncate font-mono" title={formData.img}>
                        {formData.img}
                      </p>
                    </div>
                  </div>
                )}

                {/* Direct link input */}
                <div className="tw-pt-1">
                  <span className="tw-text-[10px] tw-text-[#607B96]">or paste link:</span>
                  <input
                    type="text"
                    name="img"
                    value={formData.img}
                    onChange={handleFormChange}
                    placeholder="/uploads/... or https://..."
                    className="ai-chat-input tw-w-full tw-mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="tw-block tw-text-[#607B96] tw-mb-1 font-semibold">_github_link</label>
                <input
                  type="text"
                  name="gitLink"
                  value={formData.gitLink}
                  onChange={handleFormChange}
                  placeholder="https://github.com/aadik6/..."
                  className="ai-chat-input tw-w-full"
                />
              </div>

              <div>
                <label className="tw-block tw-text-[#607B96] tw-mb-1 font-semibold">_live_demo_link</label>
                <input
                  type="text"
                  name="hostedLink"
                  value={formData.hostedLink}
                  onChange={handleFormChange}
                  placeholder="https://example.com"
                  className="ai-chat-input tw-w-full"
                />
              </div>

              <div>
                <label className="tw-block tw-text-[#607B96] tw-mb-1 font-semibold">_display_order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleFormChange}
                  className="ai-chat-input tw-w-full"
                />
                <p className="tw-text-[11px] tw-text-[#43D9AD] tw-mt-1.5 tw-flex tw-items-start tw-gap-1.5 tw-leading-relaxed">
                  <i className="ri-information-line tw-mt-0.5 tw-flex-shrink-0"></i>
                  <span>Setting an order (e.g. 4) will automatically shift existing items down (+1).</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || isUploading}
                className="tw-w-full tw-bg-[#1C2B3A] tw-border tw-border-[#1E2D3D] hover:tw-border-[#43D9AD] hover:tw-text-[#43D9AD] tw-text-white tw-py-3 sm:tw-py-2.5 tw-rounded-md tw-text-xs sm:tw-text-sm tw-font-semibold tw-transition disabled:tw-opacity-50"
              >
                {loading ? 'saving...' : isEditing ? 'update_project()' : 'create_project()'}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Projects List */}
        <div className={`lg:tw-col-span-7 ${mobileTab === 'list' ? 'tw-block' : 'tw-hidden lg:tw-block'}`}>
          <div className="tw-bg-[#011627] tw-border tw-border-[#1E2D3D] tw-rounded-lg tw-p-4 sm:tw-p-6 tw-shadow-xl">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4 tw-gap-2">
              <h2 className="tw-text-white tw-text-base sm:tw-text-lg tw-font-semibold">
                // active-projects ({projects.length})
              </h2>
              <div className="tw-flex tw-items-center tw-gap-2">
                <button
                  type="button"
                  onClick={handleSeed}
                  disabled={loading}
                  title="Migrate hardcoded projects into Firestore"
                  className="tw-bg-[#011221] tw-border tw-border-[#1E2D3D] hover:tw-border-[#FEA55F] tw-text-[#FEA55F] tw-px-2.5 tw-py-1.5 sm:tw-py-1 tw-rounded tw-text-xs tw-transition"
                >
                  <span className="tw-hidden sm:tw-inline">seed_firestore()</span>
                  <span className="sm:tw-hidden">seed</span>
                </button>
                <button
                  type="button"
                  onClick={loadProjects}
                  disabled={loading}
                  title="Refresh list"
                  className="tw-bg-[#011221] tw-border tw-border-[#1E2D3D] hover:tw-border-[#43D9AD] tw-text-[#607B96] hover:tw-text-[#43D9AD] tw-px-2.5 tw-py-1.5 sm:tw-py-1 tw-rounded tw-text-xs tw-transition"
                >
                  <i className="ri-refresh-line"></i>
                </button>
              </div>
            </div>

            {loading && (
              <p className="tw-text-xs tw-text-[#607B96] tw-py-4">// loading projects...</p>
            )}

            <div className="tw-space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.id || proj.title}
                  className="tw-bg-[#011221] tw-border tw-border-[#1E2D3D] tw-rounded-lg tw-p-3 sm:tw-p-4 tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-start tw-justify-between tw-gap-3.5 tw-transition hover:tw-border-[#607B96]/40"
                >
                  <div className="tw-flex tw-items-start tw-gap-3 tw-flex-1 tw-min-w-0">
                    {/* Thumbnail */}
                    {proj.img && (
                      <img
                        src={typeof proj.img === 'object' && proj.img?.src ? proj.img.src : String(proj.img)}
                        alt={proj.title}
                        className="tw-w-16 tw-h-14 sm:tw-w-14 sm:tw-h-12 tw-object-cover tw-rounded-md tw-border tw-border-[#1E2D3D] tw-flex-shrink-0"
                      />
                    )}

                    <div className="tw-space-y-1.5 tw-flex-1 tw-min-w-0">
                      <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-1.5 sm:tw-gap-2">
                        <span className="tw-text-[#43D9AD] tw-font-bold tw-text-xs">
                          #{proj.order || '-'}
                        </span>
                        <h3 className="tw-text-white tw-font-semibold tw-text-sm tw-break-words">
                          {proj.title}
                        </h3>
                        <span className="tw-bg-[#1E2D3D] tw-text-[#607B96] tw-text-[10px] tw-px-2 tw-py-0.5 tw-rounded">
                          {proj.type}
                        </span>
                        <span className="tw-bg-[#1E2D3D] tw-text-[#FEA55F] tw-text-[10px] tw-px-2 tw-py-0.5 tw-rounded">
                          {proj.tech}
                        </span>
                      </div>
                      <p className="tw-text-[#607B96] tw-text-xs tw-line-clamp-2 tw-break-words">
                        {proj.description}
                      </p>
                      <div className="tw-flex tw-flex-wrap tw-gap-3 tw-text-[11px] tw-text-[#607B96] tw-pt-1">
                        {proj.gitLink && (
                          <a
                            href={proj.gitLink}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:tw-text-[#43D9AD] tw-flex tw-items-center tw-gap-1 tw-py-0.5"
                          >
                            <i className="ri-github-fill"></i> repo
                          </a>
                        )}
                        {proj.hostedLink && (
                          <a
                            href={proj.hostedLink}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:tw-text-[#43D9AD] tw-flex tw-items-center tw-gap-1 tw-py-0.5"
                          >
                            <i className="ri-cast-line"></i> live
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions (Touch-friendly on mobile) */}
                  <div className="tw-flex sm:tw-flex-col tw-items-center tw-justify-end tw-gap-2 tw-pt-2.5 sm:tw-pt-0 tw-border-t sm:tw-border-t-0 tw-border-[#1E2D3D]/60 sm:tw-flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(proj)}
                      className="tw-flex-1 sm:tw-flex-initial tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-px-3 tw-py-2 sm:tw-p-2 tw-text-xs tw-text-[#607B96] hover:tw-text-white tw-bg-[#011627] sm:tw-bg-transparent hover:tw-bg-[#1E2D3D] tw-border sm:tw-border-0 tw-border-[#1E2D3D] tw-rounded-md tw-transition"
                      title="Edit"
                    >
                      <i className="ri-edit-line tw-text-sm tw-text-[#43D9AD]"></i>
                      <span className="sm:tw-hidden">Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(proj.id, proj.title)}
                      className="tw-flex-1 sm:tw-flex-initial tw-flex tw-items-center tw-justify-center tw-gap-1.5 tw-px-3 tw-py-2 sm:tw-p-2 tw-text-xs tw-text-[#607B96] hover:tw-text-[#E99287] tw-bg-[#011627] sm:tw-bg-transparent hover:tw-bg-[#1E2D3D] tw-border sm:tw-border-0 tw-border-[#1E2D3D] tw-rounded-md tw-transition"
                      title="Delete"
                    >
                      <i className="ri-delete-bin-line tw-text-sm tw-text-[#E99287]"></i>
                      <span className="sm:tw-hidden">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
