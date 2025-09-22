import React from 'react';
import './styles.css';

// PUBLIC_INTERFACE
export default function VideoCard({ video, onClick }) {
  return (
    <button className="sv-card" onClick={() => onClick?.(video)} aria-label={`Play ${video.title}`}>
      <div className="sv-thumb-wrap">
        <img className="sv-thumb" src={video.thumbnailUrl} alt={video.title} />
        <span className="sv-duration">{video.duration}</span>
      </div>
      <div className="sv-card-body">
        <div className="sv-card-title" title={video.title}>{video.title}</div>
        <div className="sv-card-meta">{video.author} · {video.views.toLocaleString()} views</div>
      </div>
    </button>
  );
}
