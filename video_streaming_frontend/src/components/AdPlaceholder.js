import React from 'react';
import './styles.css';

/**
 * PUBLIC_INTERFACE
 * AdPlaceholder is a simulated ad slot. Replace with a real ad SDK/component later.
 * For now, it displays a themed placeholder banner/video indication.
 */
export default function AdPlaceholder({ type = 'banner' }) {
  if (type === 'banner') {
    return (
      <div className="sv-ad" role="note" aria-label="Advertisement">
        <div className="sv-ad-title">Sponsored</div>
        <div className="sv-ad-sub">This is a placeholder banner ad for free users.</div>
      </div>
    );
  }
  // future: if 'video' type is requested
  return (
    <div className="sv-ad" role="note" aria-label="Advertisement">
      <div className="sv-ad-title">Sponsored Video</div>
      <div className="sv-ad-sub">Short pre-roll (placeholder) for free users.</div>
    </div>
  );
}
