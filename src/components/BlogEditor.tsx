"use client";

import React, { useState, useRef } from 'react';

interface BlogEditorProps {
  onSuccess?: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'news' | 'comunica'>('news');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        body: JSON.stringify({ title, content, category, image_url: imageUrl }),
      });

      if (response.ok) {
        setIsOpen(false);
        setTitle('');
        setImageUrl('');
        if (editorRef.current) editorRef.current.innerHTML = '';
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
        <i className="fas fa-plus" />
        <style jsx>{`
          .add-post-trigger {
            position: fixed;
            bottom: 40px;
            right: 40px;
            width: 60px;
            height: 60px;
            background: #C5A059;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(197, 160, 89, 0.4);
            z-index: 1000;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .add-post-trigger:hover {
            transform: scale(1.1) rotate(90deg);
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
            <button type="button" onClick={() => {
              const url = prompt('Inserisci URL:');
              if (url) execCommand('createLink', url);
            }} title="Link">L</button>
          </div>

          <div 
            ref={editorRef}
            contentEditable 
            className="rich-editor" 
            placeholder="Scrivi qui il tuo articolo..."
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
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .blog-modal-content {
          background: #fff;
          width: 100%;
          max-width: 800px;
          height: 90vh;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: #333;
        }

        .modal-header {
          padding: 20px 30px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h2 {
          font-family: 'Montserrat', sans-serif;
          margin: 0;
          font-size: 1.2rem;
          color: #1a1a1a;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #999;
        }

        .editor-form {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 30px;
          overflow-y: auto;
          gap: 20px;
        }

        .title-input {
          width: 100%;
          border: none;
          border-bottom: 2px solid #eee;
          font-size: 2rem;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          padding: 10px 0;
          outline: none;
        }

        .title-input:focus {
          border-color: #C5A059;
        }

        .form-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .category-select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-family: 'Montserrat', sans-serif;
        }

        .file-upload label {
          background: #f5f5f5;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .file-upload input {
          display: none;
        }

        .image-preview {
          position: relative;
          width: 100%;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
        }

        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-preview button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.5);
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
        }

        .toolbar {
          display: flex;
          gap: 10px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }

        .toolbar button {
          background: #f9f9f9;
          border: 1px solid #ddd;
          width: 40px;
          height: 40px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        .toolbar button:hover {
          background: #eee;
        }

        .rich-editor {
          flex: 1;
          min-height: 200px;
          outline: none;
          padding: 10px 0;
          font-family: 'Montserrat', sans-serif;
          line-height: 1.6;
          font-size: 1.1rem;
        }

        .rich-editor[placeholder]:empty:before {
          content: attr(placeholder);
          color: #999;
        }

        .submit-btn {
          background: #1a1a1a;
          color: white;
          border: none;
          padding: 15px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.3s;
        }

        .submit-btn:hover {
          background: #333;
        }
        
        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;
