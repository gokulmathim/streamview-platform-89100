import React from 'react';
import './styles.css';

// PUBLIC_INTERFACE
export default function Sidebar({
  categories = [],
  activeCategory = 'All',
  onSelectCategory,
  user,
  plan = 'free',
  isPremium = false,
  onLoginClick,
  onLogoutClick,
  onUpgradeClick,
  onOpenDashboard
}) {
  /** Sidebar includes:
   * - Brand
   * - Navigation with Dashboard
   * - Categories
   * - Profile/Login + Subscription Status & Upgrade CTA
   */
  return (
    <aside className="sv-sidebar">
      <div className="sv-brand">
        <div className="sv-logo">SV</div>
        <div className="sv-brand-text">
          <div className="sv-brand-title">StreamView</div>
          <div className="sv-brand-sub">Ocean Professional</div>
        </div>
      </div>

      <nav className="sv-nav">
        <div className="sv-nav-section-title">Navigation</div>
        <ul className="sv-nav-list">
          <li>
            <button
              className="sv-nav-item"
              onClick={() => onOpenDashboard?.()}
              aria-label="Open Dashboard"
            >
              Dashboard
            </button>
          </li>
        </ul>

        <div className="sv-nav-section-title">Categories</div>
        <ul className="sv-nav-list">
          {['All', ...categories].map((cat) => (
            <li key={cat}>
              <button
                className={`sv-nav-item ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => onSelectCategory?.(cat)}
                aria-current={activeCategory === cat ? 'page' : undefined}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sv-profile">
        {user ? (
          <>
            <div className="sv-profile-info">
              <img src={user.avatarUrl} alt={user.name} className="sv-avatar" />
              <div className="sv-user-meta">
                <div className="sv-user-name">{user.name}</div>
                <div className="sv-user-email">{user.email}</div>
              </div>
            </div>

            <div className="sv-plan-pill" aria-live="polite">
              {isPremium ? 'Premium' : 'Free'}
            </div>

            {!isPremium ? (
              <button className="sv-btn sv-btn-primary" onClick={onUpgradeClick} aria-label="Upgrade to Premium">
                Upgrade to Premium
              </button>
            ) : null}

            <button className="sv-btn sv-btn-secondary" onClick={onLogoutClick}>Logout</button>
          </>
        ) : (
          <>
            <div className="sv-profile-placeholder">
              <div className="sv-avatar placeholder">?</div>
              <div className="sv-user-meta">
                <div className="sv-user-name">Guest</div>
                <div className="sv-user-email">Sign in for more</div>
              </div>
            </div>
            <div className="sv-plan-pill">Free</div>
            <button className="sv-btn sv-btn-primary" onClick={onLoginClick}>Login</button>
          </>
        )}
      </div>
    </aside>
  );
}
