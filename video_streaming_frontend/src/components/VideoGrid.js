import React from 'react';
import VideoCard from './VideoCard';
import './styles.css';
import { useUser } from '../context/UserContext';

// PUBLIC_INTERFACE
export default function VideoGrid({ videos = [], onSelect }) {
  const { isPremium } = useUser();

  if (!videos.length) {
    return (
      <div className="sv-grid-empty">
        <div className="sv-empty-title">No videos found</div>
        <div className="sv-empty-sub">Try adjusting your search or filters.</div>
      </div>
    );
  }
  return (
    <div className="sv-grid">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} onClick={onSelect} isPremiumUser={isPremium} />
      ))}
    </div>
  );
}
