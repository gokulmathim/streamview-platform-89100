import React, { useEffect, useMemo, useState } from 'react';
import '../components/styles.css';
import { applyThemeToRoot } from '../theme';
import { VideoAPI, UserAPI, RecommendationAPI } from '../services/api';
import VideoGrid from '../components/VideoGrid';
import TopBar from '../components/TopBar';

// PUBLIC_INTERFACE
export default function Dashboard({ user, onSelectVideo, onRequestSearch }) {
  /**
   * Dashboard page shows:
   * - Welcome header for the user
   * - Preferred genres/topics (chips)
   * - Recent Watch History (grid)
   * - Recommended For You (grid) — simulated AI recommendations
   * All sections are visually highlighted using Ocean Professional theme.
   */
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    applyThemeToRoot();
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        // Simulated calls for user-specific data
        const [histRes, prefRes] = await Promise.all([
          UserAPI.getWatchHistory(user?.id),
          UserAPI.getPreferences(user?.id),
        ]);
        const vids = (await VideoAPI.getVideos({})).items;
        const recoRes = await RecommendationAPI.getRecommended({
          user,
          history: histRes || [],
          preferences: prefRes || [],
          catalog: vids,
        });
        if (!mounted) return;
        setHistory(histRes || []);
        setPreferences(prefRes || []);
        setRecommended(recoRes || []);
      } catch (e) {
        if (mounted) {
          setHistory([]);
          setPreferences([]);
          setRecommended([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [user]);

  const greeting = useMemo(() => {
    const name = user?.name || 'Guest';
    const hour = new Date().getHours();
    const salutation = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return `${salutation}, ${name}`;
  }, [user]);

  return (
    <div className="sv-content">
      <div className="sv-dash-hero">
        <div className="sv-dash-hero-left">
          <div className="sv-dash-eyebrow">Dashboard</div>
          <h1 className="sv-dash-title">{greeting}</h1>
          <p className="sv-dash-sub">
            Here’s your personalized StreamView hub. Explore your recent activity and tailored picks.
          </p>
        </div>
        <div className="sv-dash-hero-right">
          <button
            className="sv-btn sv-btn-primary"
            onClick={() => onRequestSearch?.('')}
            aria-label="Explore videos"
          >
            Explore Videos →
          </button>
        </div>
      </div>

      {/* Preferences/Topics */}
      <section className="sv-dash-section">
        <div className="sv-section-header">
          <h2 className="sv-section-title">Your Topics</h2>
          <div className="sv-section-sub">Based on your viewing and likes</div>
        </div>
        <div className="sv-chip-row">
          {(preferences?.length ? preferences : ['Featured', 'Documentary', 'Education', 'Music']).map((tag) => (
            <button
              key={tag}
              className="sv-chip"
              onClick={() => onRequestSearch?.(tag)}
              aria-label={`Filter by ${tag}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Watch History */}
      <section className="sv-dash-section">
        <div className="sv-section-header">
          <h2 className="sv-section-title">Recent Watch History</h2>
          <div className="sv-section-sub">Pick up where you left off</div>
        </div>
        {loading ? (
          <div className="sv-grid-empty">
            <div className="sv-empty-title">Loading your history…</div>
            <div className="sv-empty-sub">Curating your recent viewing activity.</div>
          </div>
        ) : history?.length ? (
          <VideoGrid videos={history} onSelect={onSelectVideo} />
        ) : (
          <div className="sv-grid-empty">
            <div className="sv-empty-title">No watch history yet</div>
            <div className="sv-empty-sub">Start watching to see your history here.</div>
          </div>
        )}
      </section>

      {/* Recommended */}
      <section className="sv-dash-section">
        <div className="sv-section-header">
          <h2 className="sv-section-title">Recommended For You</h2>
          <div className="sv-section-sub">AI-driven suggestions tailored to your taste</div>
        </div>
        {loading ? (
          <div className="sv-grid-empty">
            <div className="sv-empty-title">Generating recommendations…</div>
            <div className="sv-empty-sub">Analyzing preferences with Ocean Professional intelligence.</div>
          </div>
        ) : recommended?.length ? (
          <VideoGrid videos={recommended} onSelect={onSelectVideo} />
        ) : (
          <div className="sv-grid-empty">
            <div className="sv-empty-title">No recommendations yet</div>
            <div className="sv-empty-sub">
              Try exploring topics above — we’ll personalize suggestions for you.
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
