import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import './components/styles.css';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import VideoGrid from './components/VideoGrid';
import VideoPlayerModal from './components/VideoPlayerModal';
import { AuthAPI, VideoAPI } from './services/api';
import { applyThemeToRoot, theme } from './theme';
import Dashboard from './pages/Dashboard';

// PUBLIC_INTERFACE
export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [playerOpen, setPlayerOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState('');

  // Simple route-like state: 'home' | 'dashboard'
  const [view, setView] = useState('home');

  const categories = useMemo(() => {
    const set = new Set(videos.map(v => v.category));
    return Array.from(set);
  }, [videos]);

  // Initialize theme
  useEffect(() => {
    applyThemeToRoot();
    document.title = `StreamView · ${theme.name}`;
  }, []);

  // Load videos with filters
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const { items } = await VideoAPI.getVideos({ query, category });
        if (mounted) setVideos(items);
      } catch (e) {
        if (mounted) setVideos([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [query, category]);

  // PUBLIC_INTERFACE
  const handleSelectVideo = (v) => {
    setActiveVideo(v);
    setPlayerOpen(true);
  };

  // PUBLIC_INTERFACE
  const openDashboard = () => {
    setView('dashboard');
  };

  // PUBLIC_INTERFACE
  const goHome = () => {
    setView('home');
  };

  // PUBLIC_INTERFACE
  const handleLogin = async () => {
    try {
      const res = await AuthAPI.login({ email: 'ocean.pro@example.com', password: 'password' });
      setAuthToken(res.token);
      setUser(res.user);
      setView('dashboard');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      alert('Login failed (mock).');
    }
  };

  // PUBLIC_INTERFACE
  const handleLogout = async () => {
    await AuthAPI.logout();
    setAuthToken('');
    setUser(null);
  };

  return (
    <div className="sv-container">
      <div className="sv-layout">
        <Sidebar
          categories={categories}
          activeCategory={category}
          onSelectCategory={(cat) => { setCategory(cat); setView('home'); }}
          user={user}
          onLoginClick={handleLogin}
          onLogoutClick={handleLogout}
          onOpenDashboard={openDashboard}
        />
        <main>
          <TopBar query={query} onQueryChange={(q) => { setQuery(q); setView('home'); }} />
          {view === 'dashboard' && user ? (
            <Dashboard
              user={user}
              onSelectVideo={handleSelectVideo}
              onRequestSearch={(q) => { setQuery(q); setView('home'); }}
            />
          ) : (
            <section className="sv-content">
              {loading ? (
                <div className="sv-grid-empty">
                  <div className="sv-empty-title">Loading videos…</div>
                  <div className="sv-empty-sub">Fetching Ocean Professional content.</div>
                </div>
              ) : (
                <VideoGrid videos={videos} onSelect={handleSelectVideo} />
              )}
            </section>
          )}
        </main>
      </div>

      <VideoPlayerModal
        open={playerOpen}
        video={activeVideo}
        onClose={() => setPlayerOpen(false)}
      />
    </div>
  );
}
