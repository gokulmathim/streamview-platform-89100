import React, { useEffect, useMemo, useState } from 'react';
import { PlaybackAPI } from '../services/api';
import './styles.css';
import { useUser } from '../context/UserContext';
import AdPlaceholder from './AdPlaceholder';

/**
 * PUBLIC_INTERFACE
 * VideoPlayerModal enforces premium locking and shows ads for free users watching free content.
 * Integration seams:
 * - Replace lock check with server-side entitlement check when backend is available.
 * - Replace AdPlaceholder with real ad SDK integration.
 * - Replace PlaybackAPI.getPlaybackUrl with signed/secure playback URL retrieval.
 */
export default function VideoPlayerModal({ open, video, onClose }) {
  const [playUrl, setPlayUrl] = useState('');
  const [err, setErr] = useState('');
  const { isPremium } = useUser();

  const locked = useMemo(() => !!(video?.isPremium && !isPremium), [video, isPremium]);
  const shouldShowAds = useMemo(() => !isPremium && video && !video.isPremium, [isPremium, video]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (open && video?.id && !locked) {
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
  }, [open, video, locked]);

  if (!open) return null;

  return (
    <div className="sv-modal-backdrop" role="dialog" aria-modal="true" aria-label={video?.title || 'Video Player'}>
      <div className="sv-modal">
        <div className="sv-modal-header">
          <div className="sv-modal-title">{video?.title}</div>
          <button className="sv-icon-btn" onClick={onClose} aria-label="Close player">✕</button>
        </div>
        <div className="sv-modal-content">
          {locked ? (
            <div className="sv-grid-empty">
              <div className="sv-empty-title">Premium content</div>
              <div className="sv-empty-sub">Upgrade to Premium to watch this video. Ocean-grade perks, no ads.</div>
            </div>
          ) : err ? (
            <div className="sv-error">{err}</div>
          ) : (
            <>
              <video className="sv-video" controls autoPlay src={playUrl} />
              {shouldShowAds ? <AdPlaceholder type="banner" /> : null}
            </>
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
