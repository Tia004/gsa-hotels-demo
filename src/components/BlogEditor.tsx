"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface BlogEditorProps {
  onSuccess?: () => void;
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
  
  const editorRef = useRef<HTMLDivElement>(null);


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
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
    const content = editorRef.current.innerHTML;

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          content, 
          category, 
          image_url: imageUrl,
          created_at: publishedAt 
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
    } catch (error) {
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
            box-shadow: 0 15px 45px rgba(0, 0, 0, 0.4), 0 0 20px rgba(197, 160, 89, 0.2);
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
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(197, 160, 89, 0.3);
          }
          .add-post-trigger i {
            font-size: 1.2rem;
          }
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
          <input 
            type="text" 
            placeholder="Titolo dell'articolo..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
            required
          />

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


          {imageUrl && (
            <div className="image-preview">
              <img src={imageUrl} alt="Preview" />
              <button type="button" onClick={() => setImageUrl('')}>Rimuovi</button>
            </div>
          )}

          <div className="toolbar">
            <button type="button" onClick={() => execCommand('bold')} title="Grassetto">B</button>
            <button type="button" onClick={() => execCommand('italic')} title="Corsivo">I</button>
            <div className="link-tool-wrapper" style={{ position: 'relative' }}>
              <button type="button" onClick={() => {
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0) {
                  setSavedSelection(selection.getRangeAt(0));
                  setShowLinkModal(!showLinkModal);
                } else {
                  setShowLinkModal(!showLinkModal);
                }
              }} title="Link">
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
          </div>


          <div 
            ref={editorRef}
            contentEditable 
            className="rich-editor" 
            data-placeholder="Scrivi qui il tuo articolo..."
          />

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Pubblicazione...' : 'Pubblica Articolo'}
          </button>
        </form>
      </div>

      <style jsx>{`
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
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .blog-modal-content {
          background: #0a0a0a;
          width: 100%;
          max-width: 900px;
          height: 90vh;
          border-radius: 4px;
          border: 1px solid rgba(197, 160, 89, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: white;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
        }

        .modal-header {
          padding: 30px 40px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h2 {
          font-family: var(--font-display);
          margin: 0;
          font-size: 1.8rem;
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
        }

        .close-btn:hover {
          color: var(--gold-accent);
        }

        .editor-form {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 40px;
          overflow-y: auto;
          gap: 30px;
        }

        .title-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          font-size: 2.5rem;
          font-family: var(--font-display);
          font-weight: 500;
          padding: 10px 0;
          outline: none;
          color: white;
          transition: border-color 0.3s ease;
        }

        .title-input:focus {
          border-color: var(--gold-accent);
        }

        .form-row {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .category-select {
          background: #0f1111;
          color: white;
          padding: 12px 20px;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.1);
          font-family: var(--font-body);
          outline: none;
          cursor: pointer;
        }

        .file-upload label {
          background: rgba(197, 160, 89, 0.1);
          color: var(--gold-accent);
          padding: 12px 25px;
          border-radius: 4px;
          border: 1px solid rgba(197, 160, 89, 0.2);
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
        }

        .file-upload label:hover {
          background: var(--gold-accent);
          color: black;
        }

        .file-upload input {
          display: none;
        }

        .image-preview {
          position: relative;
          width: 100%;
          height: 250px;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-preview button {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(0,0,0,0.8);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          backdrop-filter: blur(5px);
        }

        .toolbar {
          display: flex;
          gap: 8px;
          padding: 10px;
          background: #0f1111;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 4px;
        }

        .toolbar button {
          background: transparent;
          border: 1px solid transparent;
          width: 40px;
          height: 40px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          color: rgba(255,255,255,0.6);
          transition: all 0.2s ease;
        }

        .toolbar button:hover {
          background: rgba(255,255,255,0.05);
          color: white;
          border-color: rgba(255,255,255,0.1);
        }

        .rich-editor {
          flex: 1;
          min-height: 300px;
          outline: none;
          padding: 20px 0;
          font-family: var(--font-body);
          line-height: 1.8;
          font-size: 1.1rem;
          color: rgba(255,255,255,0.8);
        }

        .rich-editor[data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: rgba(255,255,255,0.2);
        }

        .submit-btn {
          background: var(--gold-accent);
          color: black;
          border: none;
          padding: 18px;
          border-radius: 4px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          margin-top: 20px;
        }

        .submit-btn:hover {
          background: #d4b57a;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(197, 160, 89, 0.3);
        }
        
        .submit-btn:disabled {
          background: #333;
          color: #666;
          cursor: not-allowed;
          transform: none;
        }

        .date-picker-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .date-picker-group label {
          font-size: 0.65rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .date-input {
          background: #0f1111;
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 10px;
          border-radius: 4px;
          font-family: inherit;
          outline: none;
        }

        /* Inline Link Modal */
        .inline-link-modal {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 10px;
          background: #1a1a1a;
          border: 1px solid var(--gold-accent);
          padding: 15px;
          border-radius: 4px;
          z-index: 100;
          width: 250px;
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
        }

        .link-modal-actions {
          display: flex;
          gap: 8px;
        }

        .link-modal-actions button {
          flex: 1;
          padding: 8px;
          font-size: 0.75rem;
          background: #222;
          color: white;
          border: none;
          cursor: pointer;
        }

        .link-modal-actions button:first-child {
          background: var(--gold-accent);
          color: black;
          font-weight: bold;
        }

      `}</style>
    </div>
  );
};

export default BlogEditor;
