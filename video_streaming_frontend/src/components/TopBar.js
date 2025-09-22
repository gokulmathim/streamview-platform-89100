import React from 'react';
import './styles.css';

// PUBLIC_INTERFACE
export default function TopBar({ query, onQueryChange }) {
  return (
    <header className="sv-topbar" role="banner">
      <div className="sv-search">
        <span className="sv-search-icon" aria-hidden>🔎</span>
        <input
          value={query}
          onChange={(e) => onQueryChange?.(e.target.value)}
          placeholder="Search videos, creators..."
          aria-label="Search videos"
          className="sv-search-input"
        />
      </div>
    </header>
  );
}
