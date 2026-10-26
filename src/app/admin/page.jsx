'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  fetchProjects,
  addProjectToDb,
  updateProjectInDb,
  deleteProjectFromDb,
  seedInitialProjectsToFirestore,
} from '../../lib/projectService';
import { getFirebaseDb } from '../../lib/firebase';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
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
  const correctPasskey =
    process.env.NEXT_PUBLIC_ADMIN_PASSKEY || 'aadi2026';

  // Check existing session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('portfolio_admin_auth');
      if (stored === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (passkeyInput === correctPasskey) {
      setIsAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid passkey. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('portfolio_admin_auth');
    setPasskeyInput('');
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
        await updateProjectInDb(editingId, formData);
        showMessage('Project updated successfully with image link saved!');
      } else {
        await addProjectToDb(formData);
        showMessage('New project added with image link saved!');
      }
      resetForm();
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

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="tw-min-h-[80vh] tw-flex tw-items-center tw-justify-center tw-p-4 tw-font-mono">
        <div className="tw-bg-[#011627] tw-border tw-border-[#1E2D3D] tw-rounded-lg tw-p-8 tw-max-w-md tw-w-full tw-shadow-2xl">
          <div className="tw-flex tw-items-center tw-gap-2 tw-mb-4">
            <i className="ri-lock-line tw-text-[#43D9AD] tw-text-2xl"></i>
            <h1 className="tw-text-white tw-text-xl tw-font-bold">_admin-login</h1>
          </div>
          <p className="tw-text-[#607B96] tw-text-xs tw-mb-6">
            // Enter passkey to manage portfolio projects dynamically
          </p>

          <form onSubmit={handleLogin} className="tw-space-y-4">
            <div>
              <label className="tw-block tw-text-[#607B96] tw-text-xs tw-mb-2">
                _passkey:
              </label>
              <input
                type="password"
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter admin passkey..."
                className="ai-chat-input tw-w-full"
                autoFocus
              />
            </div>

            {authError && (
              <p className="tw-text-[#E99287] tw-text-xs">// {authError}</p>
            )}

            <button
              type="submit"
              className="tw-w-full tw-bg-[#1C2B3A] tw-border tw-border-[#1E2D3D] hover:tw-border-[#43D9AD] hover:tw-text-[#43D9AD] tw-text-white tw-py-2.5 tw-rounded tw-text-sm tw-transition-colors"
            >
              authenticate()
            </button>
          </form>

          <div className="tw-mt-6 tw-pt-4 tw-border-t tw-border-[#1E2D3D] tw-flex tw-justify-between tw-text-[11px] tw-text-[#607B96]">
        
            <Link href="/" className="hover:tw-text-[#43D9AD]">
              &larr; return home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tw-min-h-[85vh] tw-p-4 md:tw-p-8 tw-max-w-6xl tw-mx-auto tw-font-mono">
      {/* Top Header */}
      <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-pb-4 tw-border-b tw-border-[#1E2D3D] tw-mb-8 tw-gap-4">
        <div>
          <h1 className="tw-text-white tw-text-2xl tw-font-bold tw-flex tw-items-center tw-gap-2">
            <i className="ri-dashboard-fill tw-text-[#43D9AD]"></i> _projects-manager
          </h1>
          <p className="tw-text-[#607B96] tw-text-xs tw-mt-1">
            // Firestore status: {isDbConfigured ? <span className="tw-text-[#43D9AD]">● connected</span> : <span className="tw-text-[#FEA55F]">▲ local fallback active (set NEXT_PUBLIC_FIREBASE_API_KEY in .env.local)</span>}
          </p>
        </div>

        <div className="tw-flex tw-items-center tw-gap-3">
          <Link
            href="/projects"
            className="tw-bg-[#011221] tw-border tw-border-[#1E2D3D] hover:tw-border-[#43D9AD] tw-text-[#607B96] hover:tw-text-white tw-px-3.5 tw-py-1.5 tw-rounded tw-text-xs tw-transition"
          >
            view /projects
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="tw-bg-[#1C2B3A] tw-border tw-border-[#1E2D3D] hover:tw-text-[#E99287] tw-text-[#607B96] tw-px-3.5 tw-py-1.5 tw-rounded tw-text-xs tw-transition"
          >
            logout()
          </button>
        </div>
      </div>

      {/* Status banner */}
      {statusMessage.text && (
        <div
          className={`tw-mb-6 tw-p-3.5 tw-rounded tw-border tw-text-xs ${
            statusMessage.type === 'error'
              ? 'tw-bg-[#E99287]/15 tw-border-[#E99287] tw-text-[#E99287]'
              : 'tw-bg-[#43D9AD]/15 tw-border-[#43D9AD] tw-text-[#43D9AD]'
          }`}
        >
          // {statusMessage.text}
        </div>
      )}

      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-8">
        {/* Project Form (Add / Edit) */}
        <div className="lg:tw-col-span-5">
          <div className="tw-bg-[#011627] tw-border tw-border-[#1E2D3D] tw-rounded-lg tw-p-6 tw-shadow-xl">
            <h2 className="tw-text-white tw-text-lg tw-font-semibold tw-mb-4 tw-flex tw-items-center tw-justify-between">
              <span>{isEditing ? '// edit-project' : '// add-new-project'}</span>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="tw-text-xs tw-text-[#E99287] hover:tw-underline"
                >
                  cancel
                </button>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="tw-space-y-4 tw-text-xs">
              <div>
                <label className="tw-block tw-text-[#607B96] tw-mb-1">_title *</label>
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

              <div className="tw-grid tw-grid-cols-2 tw-gap-3">
                <div>
                  <label className="tw-block tw-text-[#607B96] tw-mb-1">_category</label>
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
                  <label className="tw-block tw-text-[#607B96] tw-mb-1">_tech</label>
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
                <label className="tw-block tw-text-[#607B96] tw-mb-1">_description *</label>
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
              <div className="tw-p-3 tw-bg-[#011221] tw-border tw-border-[#1E2D3D] tw-rounded-lg tw-space-y-2">
                <div className="tw-flex tw-items-center tw-justify-between">
                  <label className="tw-block tw-text-[#607B96] tw-font-semibold">
                    _project_image (upload to file & link)
                  </label>
                  {formData.img && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, img: '' }))}
                      className="tw-text-[#E99287] hover:tw-underline tw-text-[10px]"
                    >
                      clear
                    </button>
                  )}
                </div>

                <div className="tw-flex tw-items-center tw-gap-3">
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
                    className="tw-bg-[#1C2B3A] tw-border tw-border-[#1E2D3D] hover:tw-border-[#43D9AD] hover:tw-text-[#43D9AD] tw-text-white tw-px-3 tw-py-2 tw-rounded tw-cursor-pointer tw-flex tw-items-center tw-gap-1.5 tw-transition tw-text-xs"
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
                      className="tw-w-16 tw-h-12 tw-object-cover tw-rounded tw-border tw-border-[#1E2D3D]"
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
                <label className="tw-block tw-text-[#607B96] tw-mb-1">_github_link</label>
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
                <label className="tw-block tw-text-[#607B96] tw-mb-1">_live_demo_link</label>
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
                <label className="tw-block tw-text-[#607B96] tw-mb-1">_display_order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleFormChange}
                  className="ai-chat-input tw-w-full"
                />
              </div>

              <button
                type="submit"
                disabled={loading || isUploading}
                className="tw-w-full tw-bg-[#1C2B3A] tw-border tw-border-[#1E2D3D] hover:tw-border-[#43D9AD] hover:tw-text-[#43D9AD] tw-text-white tw-py-2.5 tw-rounded tw-text-xs tw-transition"
              >
                {loading ? 'saving...' : isEditing ? 'update_project()' : 'create_project()'}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Projects List */}
        <div className="lg:tw-col-span-7">
          <div className="tw-bg-[#011627] tw-border tw-border-[#1E2D3D] tw-rounded-lg tw-p-6 tw-shadow-xl">
            <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
              <h2 className="tw-text-white tw-text-lg tw-font-semibold">
                // active-projects ({projects.length})
              </h2>
              <div className="tw-flex tw-gap-2">
                <button
                  type="button"
                  onClick={handleSeed}
                  disabled={loading}
                  title="Migrate hardcoded projects into Firestore"
                  className="tw-bg-[#011221] tw-border tw-border-[#1E2D3D] hover:tw-border-[#FEA55F] tw-text-[#FEA55F] tw-px-2.5 tw-py-1 tw-rounded tw-text-xs"
                >
                  seed_firestore()
                </button>
                <button
                  type="button"
                  onClick={loadProjects}
                  disabled={loading}
                  title="Refresh list"
                  className="tw-bg-[#011221] tw-border tw-border-[#1E2D3D] hover:tw-border-[#43D9AD] tw-text-[#607B96] hover:tw-text-[#43D9AD] tw-px-2.5 tw-py-1 tw-rounded tw-text-xs"
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
                  className="tw-bg-[#011221] tw-border tw-border-[#1E2D3D] tw-rounded tw-p-3.5 tw-flex tw-items-start tw-justify-between tw-gap-3"
                >
                  {/* Thumbnail */}
                  {proj.img && (
                    <img
                      src={typeof proj.img === 'object' && proj.img?.src ? proj.img.src : String(proj.img)}
                      alt={proj.title}
                      className="tw-w-14 tw-h-12 tw-object-cover tw-rounded tw-border tw-border-[#1E2D3D] tw-flex-shrink-0"
                    />
                  )}

                  <div className="tw-space-y-1 tw-flex-1">
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <span className="tw-text-[#43D9AD] tw-font-bold tw-text-xs">
                        #{proj.order || '-'}
                      </span>
                      <h3 className="tw-text-white tw-font-semibold tw-text-sm">
                        {proj.title}
                      </h3>
                      <span className="tw-bg-[#1E2D3D] tw-text-[#607B96] tw-text-[10px] tw-px-2 tw-py-0.5 tw-rounded">
                        {proj.type}
                      </span>
                      <span className="tw-bg-[#1E2D3D] tw-text-[#FEA55F] tw-text-[10px] tw-px-2 tw-py-0.5 tw-rounded">
                        {proj.tech}
                      </span>
                    </div>
                    <p className="tw-text-[#607B96] tw-text-xs tw-line-clamp-2">
                      {proj.description}
                    </p>
                    <div className="tw-flex tw-gap-3 tw-text-[11px] tw-text-[#607B96] tw-pt-1">
                      {proj.gitLink && (
                        <a
                          href={proj.gitLink}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:tw-text-[#43D9AD]"
                        >
                          <i className="ri-github-fill"></i> repo
                        </a>
                      )}
                      {proj.hostedLink && (
                        <a
                          href={proj.hostedLink}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:tw-text-[#43D9AD]"
                        >
                          <i className="ri-cast-line"></i> live
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="tw-flex tw-items-center tw-gap-1.5 tw-flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(proj)}
                      className="tw-p-1.5 tw-text-[#607B96] hover:tw-text-white hover:tw-bg-[#1E2D3D] tw-rounded tw-transition"
                      title="Edit"
                    >
                      <i className="ri-edit-line tw-text-sm"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(proj.id, proj.title)}
                      className="tw-p-1.5 tw-text-[#607B96] hover:tw-text-[#E99287] hover:tw-bg-[#1E2D3D] tw-rounded tw-transition"
                      title="Delete"
                    >
                      <i className="ri-delete-bin-line tw-text-sm"></i>
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
