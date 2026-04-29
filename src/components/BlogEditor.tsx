"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface BlogEditorProps {
  onSuccess?: () => void;
}

/** Extract a YouTube video ID from any YouTube URL or embed URL */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&\s]+)/,
    /youtu\.be\/([^?\s]+)/,
    /youtube\.com\/embed\/([^?\s]+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

/** Build a responsive 16:9 YouTube iframe HTML string */
function buildYouTubeHtml(videoId: string): string {
  return `<div class="blog-yt-wrapper" style="position:relative;width:100%;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:32px 0;">` +
    `<iframe src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" ` +
    `style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" ` +
    `allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" ` +
    `allowfullscreen loading="lazy" title="Video"></iframe></div>`;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'news' | 'comunica'>('news');
  const [imageUrl, setImageUrl] = useState('');
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Link management
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  // YouTube Inline Modal
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [youtubeInput, setYoutubeInput] = useState('');

  const editorRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) editorRef.current.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorRef.current) return;

    setIsSubmitting(true);
    let content = editorRef.current.innerHTML;

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          category,
          image_url: imageUrl,
          created_at: publishedAt,
        }),
      });

      if (response.ok) {
        setIsOpen(false);
        setTitle('');
        setImageUrl('');
        if (editorRef.current) editorRef.current.innerHTML = '';
        router.refresh();
        if (onSuccess) onSuccess();
      } else {
        alert('Errore durante la pubblicazione.');
      }
    } catch {
      alert('Errore di rete.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button className="add-post-trigger" onClick={() => setIsOpen(true)}>
        <i className="fas fa-pen-nib" />
        <i className="fas fa-book-open" style={{ marginLeft: '-10px', fontSize: '1rem', opacity: 0.8 }} />
        <span>Crea nuovo articolo</span>
        <style jsx>{`
          .add-post-trigger {
            position: fixed;
            bottom: 40px;
            right: 40px;
            padding: 0 35px;
            height: 65px;
            background: #C5A059;
            color: black;
            border: none;
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            cursor: pointer;
            box-shadow: 0 15px 45px rgba(0,0,0,0.4), 0 0 20px rgba(197,160,89,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            font-family: 'Montserrat', sans-serif;
          }
          .add-post-trigger:hover {
            transform: translateY(-5px) scale(1.02);
            background: #d4b57a;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(197,160,89,0.3);
          }
          .add-post-trigger i { font-size: 1.2rem; }
        `}</style>
      </button>
    );
  }

  return (
    <div className="blog-modal-overlay">
      <div className="blog-modal-content">
        <header className="modal-header">
          <h2>Nuovo Articolo</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}>&times;</button>
        </header>

        <form onSubmit={handleSubmit} className="editor-form">
          <div className="editor-scrollable-body">
          {/* TITLE */}
          <input
            type="text"
            placeholder="Titolo dell'articolo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
            required
          />

          {/* META ROW */}
          <div className="form-row">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="category-select"
            >
              <option value="news">News</option>
              <option value="comunica">GSA Comunica</option>
            </select>

            <div className="file-upload">
              <label htmlFor="blog-image-upload">
                {imageUrl ? 'Modifica Immagine' : 'Carica Immagine'}
              </label>
              <input
                id="blog-image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>

            <div className="date-picker-group">
              <label>Data Pubblicazione</label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="date-input"
              />
            </div>
          </div>

          {/* IMAGE PREVIEW */}
          {imageUrl && (
            <div className="image-preview">
              <img src={imageUrl} alt="Preview" />
              <button type="button" onClick={() => setImageUrl('')}>Rimuovi</button>
            </div>
          )}

          {/* TOOLBAR */}
          <div className="toolbar">
            {/* Formatting */}
            <button type="button" onClick={() => execCommand('bold')} title="Grassetto"><b>B</b></button>
            <button type="button" onClick={() => execCommand('italic')} title="Corsivo"><em>I</em></button>

            <div className="toolbar-divider" />

            {/* Headings */}
            <button type="button" onClick={() => execCommand('formatBlock', 'h2')} title="Titolo H2" className="toolbar-heading">H2</button>
            <button type="button" onClick={() => execCommand('formatBlock', 'h3')} title="Sottotitolo H3" className="toolbar-heading">H3</button>
            <button type="button" onClick={() => execCommand('formatBlock', 'h4')} title="Titoletto H4" className="toolbar-heading">H4</button>
            <button type="button" onClick={() => execCommand('formatBlock', 'p')} title="Paragrafo normale" className="toolbar-heading">¶</button>

            <div className="toolbar-divider" />

            {/* Link */}
            <div className="link-tool-wrapper" style={{ position: 'relative' }}>
              <button type="button" onClick={() => {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                  setSavedSelection(selection.getRangeAt(0));
                  setShowLinkModal(!showLinkModal);
                } else {
                  setShowLinkModal(!showLinkModal);
                }
              }} title="Inserisci link">
                <i className="fas fa-link" />
              </button>

              {showLinkModal && (
                <div className="inline-link-modal">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    autoFocus
                  />
                  <div className="link-modal-actions">
                    <button type="button" onClick={() => {
                      if (linkUrl) {
                        const selection = window.getSelection();
                        if (selection && savedSelection) {
                          selection.removeAllRanges();
                          selection.addRange(savedSelection);
                        }
                        execCommand('createLink', linkUrl);
                      }
                      setShowLinkModal(false);
                      setLinkUrl('');
                    }}>Ok</button>
                    <button type="button" onClick={() => setShowLinkModal(false)}>Annulla</button>
                  </div>
                </div>
              )}
            </div>

            {/* YouTube */}
            <div className="link-tool-wrapper" style={{ position: 'relative' }}>
              <button type="button" onClick={() => {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                  setSavedSelection(selection.getRangeAt(0));
                }
                setShowYoutubeModal(!showYoutubeModal);
                setShowLinkModal(false);
              }} title="Inserisci Video YouTube">
                <i className="fab fa-youtube" style={{ color: '#ff5555' }} />
              </button>

              {showYoutubeModal && (
                <div className="inline-link-modal">
                  <input
                    type="text"
                    placeholder="https://youtube.com/..."
                    value={youtubeInput}
                    onChange={(e) => setYoutubeInput(e.target.value)}
                    autoFocus
                  />
                  <div className="link-modal-actions">
                    <button type="button" onClick={() => {
                      if (youtubeInput) {
                        const videoId = extractYouTubeId(youtubeInput);
                        if (videoId) {
                          const selection = window.getSelection();
                          if (selection && savedSelection) {
                            selection.removeAllRanges();
                            selection.addRange(savedSelection);
                          }
                          execCommand('insertHTML', buildYouTubeHtml(videoId));
                        }
                      }
                      setShowYoutubeModal(false);
                      setYoutubeInput('');
                    }}>Inserisci</button>
                    <button type="button" onClick={() => setShowYoutubeModal(false)}>Annulla</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RICH TEXT EDITOR */}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="rich-editor"
            data-placeholder="Scrivi qui il tuo articolo..."
          />
          </div> {/* end scrollable body */}

          <div className="editor-footer">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Pubblicazione...' : 'Pubblica Articolo'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        /* ---- MODAL SHELL ---- */
        .blog-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
          animation: modalFadeIn 0.5s ease-out;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .blog-modal-content {
          background: #0a0a0a;
          width: 100%;
          max-width: 900px;
          height: 90vh;
          border-radius: 8px;
          border: 1px solid rgba(197,160,89,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;          /* clip the outer shell */
          color: white;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
        }

        /* ---- HEADER (fixed) ---- */
        .modal-header {
          flex-shrink: 0;
          padding: 24px 36px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-header h2 {
          font-family: var(--font-display);
          margin: 0;
          font-size: 1.6rem;
          color: white;
          letter-spacing: 0.05em;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          transition: color 0.3s ease;
          line-height: 1;
        }
        .close-btn:hover { color: var(--gold-accent); }

        /* ---- FORM (scrollable body layout) ---- */
        .editor-form {
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          overflow: hidden; /* Only the inner body scrolls */
        }
        
        .editor-scrollable-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px 36px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          scroll-behavior: smooth;
        }

        .editor-footer {
          padding: 16px 36px;
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
          display: flex;
          justify-content: flex-end;
        }

        /* ---- TITLE ---- */
        .title-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          font-size: 2.2rem;
          font-family: var(--font-display);
          font-weight: 500;
          padding: 8px 0;
          outline: none;
          color: white;
          transition: border-color 0.3s ease;
          flex-shrink: 0;
        }
        .title-input:focus { border-color: var(--gold-accent); }

        /* ---- META ROW ---- */
        .form-row {
          display: flex;
          gap: 16px;
          align-items: flex-end; /* Align bottom edges properly */
          flex-wrap: wrap;
          flex-shrink: 0;
        }
        .category-select {
          background: #0f1111;
          color: white;
          padding: 12px 16px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.1);
          font-family: var(--font-body);
          outline: none;
          cursor: pointer;
          height: 44px;
        }
        .file-upload label {
          background: rgba(197,160,89,0.1);
          color: var(--gold-accent);
          padding: 0 22px;
          border-radius: 6px;
          border: 1px solid rgba(197,160,89,0.2);
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
          white-space: nowrap;
          height: 44px;
          display: inline-flex;
          align-items: center;
        }
        .file-upload label:hover { background: var(--gold-accent); color: black; }
        .file-upload input { display: none; }

        .date-picker-group { display: flex; flex-direction: column; gap: 4px; }
        .date-picker-group label {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .date-input {
          background: #0f1111;
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 0 16px;
          border-radius: 6px;
          font-family: inherit;
          outline: none;
          height: 44px;
        }
        /* Invert calendar icon to make it white */
        .date-input::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
          opacity: 0.6;
        }
        .date-input::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }

        /* ---- IMAGE PREVIEW ---- */
        .image-preview {
          position: relative;
          width: 100%;
          height: 200px;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        .image-preview img { width: 100%; height: 100%; object-fit: cover; }
        .image-preview button {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0,0,0,0.8);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.75rem;
        }

        /* ---- TOOLBAR ---- */
        .toolbar {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 10px;
          background: #0f1111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 6px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }
        .toolbar button {
          background: transparent;
          border: 1px solid transparent;
          width: 36px;
          height: 36px;
          border-radius: 4px;
          cursor: pointer;
          color: rgba(255,255,255,0.6);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          position: relative;
        }
        .toolbar button:hover {
          background: rgba(255,255,255,0.06);
          color: white;
          border-color: rgba(255,255,255,0.1);
        }
        /* Custom Tooltip */
        .toolbar button:hover::after {
          content: attr(title);
          position: absolute;
          bottom: 110%;
          left: 50%;
          transform: translateX(-50%);
          background: #000;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-family: var(--font-body);
          white-space: nowrap;
          pointer-events: none;
          z-index: 100;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
        .toolbar-heading {
          font-family: var(--font-display) !important;
          font-size: 0.75rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.02em;
          color: rgba(197,160,89,0.7) !important;
          width: auto !important;
          padding: 0 10px !important;
        }
        .toolbar-heading:hover { color: var(--gold-accent) !important; }
        .toolbar-divider {
          width: 1px;
          height: 24px;
          background: rgba(255,255,255,0.1);
          margin: 0 4px;
          flex-shrink: 0;
        }

        /* ---- RICH EDITOR ---- */
        .rich-editor {
          min-height: 280px;
          outline: none;
          padding: 16px 0;
          font-family: var(--font-body);
          line-height: 1.85;
          font-size: 1.05rem;
          color: rgba(255,255,255,0.82);
          /* No flex:1 here — let the form scroll, not the editor grow infinitely */
        }
        .rich-editor[data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: rgba(255,255,255,0.18);
          pointer-events: none;
        }
        /* Heading styles inside the editor */
        .rich-editor h2 {
          font-family: var(--font-display);
          font-size: 1.7rem;
          color: white;
          margin: 24px 0 8px;
          line-height: 1.25;
        }
        .rich-editor h3 {
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: var(--gold-accent);
          margin: 20px 0 6px;
        }
        .rich-editor h4 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          color: rgba(255,255,255,0.85);
          margin: 16px 0 4px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .rich-editor a { color: var(--gold-accent); text-decoration: underline; }
        .rich-editor p { margin: 0 0 16px; }

        /* ---- SUBMIT ---- */
        .submit-btn {
          background: var(--gold-accent);
          color: black;
          border: none;
          padding: 16px 40px;
          border-radius: 6px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          width: auto;
        }
        .submit-btn:hover {
          background: #d4b57a;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(197,160,89,0.3);
        }
        .submit-btn:disabled {
          background: #333;
          color: #666;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* ---- INLINE LINK MODAL ---- */
        .inline-link-modal {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 8px;
          background: #1a1a1a;
          border: 1px solid var(--gold-accent);
          padding: 14px;
          border-radius: 6px;
          z-index: 100;
          width: 260px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .inline-link-modal input {
          background: #000;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 12px;
          color: white;
          font-size: 0.9rem;
          border-radius: 4px;
          outline: none;
        }
        .link-modal-actions { display: flex; gap: 8px; }
        .link-modal-actions button {
          flex: 1;
          padding: 8px;
          font-size: 0.75rem;
          background: #222;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 4px;
        }
        .link-modal-actions button:first-child {
          background: var(--gold-accent);
          color: black;
          font-weight: bold;
        }

        /* ---- MOBILE OPTIMIZATIONS ---- */
        @media (max-width: 768px) {
          .blog-modal-overlay {
            padding: 10px;
          }
          .blog-modal-content {
            height: 100%;
            border-radius: 12px;
          }
          .modal-header {
            padding: 16px 20px;
          }
          .editor-scrollable-body {
            padding: 16px 20px;
          }
          .form-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .category-select, .file-upload label, .date-input {
            width: 100%;
            justify-content: center;
          }
          .editor-footer {
            padding: 16px 20px;
          }
          .submit-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;
