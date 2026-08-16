import React, { useRef, useState } from 'react';
import { Upload, X, Image, Loader2, Link as LinkIcon } from 'lucide-react';
import { api, resolveImageUrl } from '../../services/api';

interface ImageUploaderProps {
  /** Current image URL value */
  value: string;
  /** Called when image URL changes (either from upload or manual URL input) */
  onChange: (url: string) => void;
  /** Optional label */
  label?: string;
}

type InputMode = 'upload' | 'url';

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Image de Couverture',
}) => {
  const [mode, setMode] = useState<InputMode>('upload');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Veuillez sélectionner un fichier image valide.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image trop grande (maximum 5 Mo).');
      return;
    }

    setUploading(true);
    setUploadError(null);

    const res = await api.uploadImage(file);
    if (res.success && res.url) {
      onChange(res.url);
    } else {
      setUploadError(res.message ?? 'Échec de l\'upload.');
    }
    setUploading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="form-group">
      {/* Label + Mode Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 0 }}>
          <Image size={15} /> {label}
        </label>
        <div style={{ display: 'flex', background: '#f4f7fc', borderRadius: '8px', padding: '3px', gap: '2px' }}>
          <button
            type="button"
            onClick={() => setMode('upload')}
            style={{
              padding: '5px 14px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.2s',
              background: mode === 'upload' ? '#ffffff' : 'transparent',
              color: mode === 'upload' ? '#0122bc' : '#57647c',
              boxShadow: mode === 'upload' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
            }}>
            <Upload size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            Uploader
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            style={{
              padding: '5px 14px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.2s',
              background: mode === 'url' ? '#ffffff' : 'transparent',
              color: mode === 'url' ? '#0122bc' : '#57647c',
              boxShadow: mode === 'url' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'
            }}>
            <LinkIcon size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            URL
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      {mode === 'upload' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? '#0122bc' : '#d1d8e6'}`,
            borderRadius: '10px',
            padding: '24px',
            textAlign: 'center',
            cursor: uploading ? 'not-allowed' : 'pointer',
            background: dragOver ? 'rgba(1,34,188,0.04)' : '#fafbfd',
            transition: 'all 0.25s ease',
          }}>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
          {uploading ? (
            <div style={{ color: '#0122bc' }}>
              <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', marginBottom: '8px' }} />
              <p style={{ fontSize: '14px', margin: 0 }}>Upload en cours...</p>
            </div>
          ) : (
            <div style={{ color: '#57647c' }}>
              <Upload size={28} style={{ color: '#c0c9d8', marginBottom: '8px' }} />
              <p style={{ fontSize: '14px', margin: '0 0 4px', fontWeight: '600' }}>
                Glissez une image ou cliquez pour choisir
              </p>
              <p style={{ fontSize: '12px', margin: 0, color: '#a0aec0' }}>
                JPEG, PNG, GIF, WebP — 5 Mo maximum
              </p>
            </div>
          )}
        </div>
      )}

      {/* URL Input */}
      {mode === 'url' && (
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... ou /assets/images/photo.jpg"
        />
      )}

      {/* Error */}
      {uploadError && (
        <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          ⚠️ {uploadError}
        </p>
      )}

      {/* Image Preview */}
      {value && (
        <div style={{ marginTop: '12px', position: 'relative', display: 'inline-block', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}>
          <img
            src={resolveImageUrl(value)}
            alt="aperçu"
            style={{ display: 'block', width: '100%', maxHeight: '160px', objectFit: 'cover' }}
          />
          <button
            type="button"
            onClick={handleRemove}
            title="Supprimer l'image"
            style={{
              position: 'absolute', top: '8px', right: '8px',
              background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%',
              width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff'
            }}>
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
