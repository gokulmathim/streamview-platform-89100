import React from 'react';
import './styles.css';

/**
 * PUBLIC_INTERFACE
 * VideoCard shows a thumbnail with duration and indicates premium items with a lock overlay
 * when the viewer is not premium.
 */
export default function VideoCard({ video, onClick, isPremiumUser = false }) {
  const locked = video?.isPremium && !isPremiumUser;

  return (
    <button
      className="sv-card"
      onClick={() => onClick?.(video)}
      aria-label={`${locked ? 'Locked: ' : ''}Play ${video.title}`}
    >
      <div className="sv-thumb-wrap">
        <img className="sv-thumb" src={video.thumbnailUrl} alt={video.title} />
        <span className="sv-duration">{video.duration}</span>
        {video?.isPremium ? (
          <div className="sv-lock-overlay" aria-hidden={!locked}>
            <span className="sv-lock-badge">{locked ? 'Premium' : 'Premium ✓'}</span>
            <span className="sv-lock-icon" aria-hidden>
              {locked ? '🔒' : '⭐'}
            </span>
          </div>
        ) : null}
      </div>
      <div className="sv-card-body">
        <div className="sv-card-title" title={video.title}>{video.title}</div>
        <div className="sv-card-meta">
          {video.author} · {Number(video.views).toLocaleString()} views
          {video?.isPremium ? ' · Premium' : ' · Free'}
        </div>
      </div>
    </button>
  );
}
