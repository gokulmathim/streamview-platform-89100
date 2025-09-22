import React, { useEffect, useState } from 'react';
import { PlaybackAPI } from '../services/api';
import './styles.css';

// PUBLIC_INTERFACE
export default function VideoPlayerModal({ open, video, onClose }) {
  const [playUrl, setPlayUrl] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (open && video?.id) {
        try {
          setErr('');
          const { url } = await PlaybackAPI.getPlaybackUrl(video.id);
          if (mounted) setPlayUrl(url);
        } catch (e) {
          if (mounted) setErr('Failed to load video');
        }
      } else {
        setPlayUrl('');
      }
    })();
    return () => {
      mounted = false;
    };
  }, [open, video]);

  if (!open) return null;

  return (
    <div className="sv-modal-backdrop" role="dialog" aria-modal="true" aria-label={video?.title || 'Video Player'}>
      <div className="sv-modal">
        <div className="sv-modal-header">
          <div className="sv-modal-title">{video?.title}</div>
          <button className="sv-icon-btn" onClick={onClose} aria-label="Close player">✕</button>
        </div>
        <div className="sv-modal-content">
          {err ? (
            <div className="sv-error">{err}</div>
          ) : (
            <video className="sv-video" controls autoPlay src={playUrl} />
          )}
          <div className="sv-video-meta">
            <div className="sv-video-author">{video?.author}</div>
            <div className="sv-video-desc">{video?.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
