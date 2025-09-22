//
//
// REST API placeholders with clear separation for future backend integration.
// All functions return mocked data and structure suitable to be replaced by real fetch/axios calls.
//

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

// Simple helper to simulate network delay
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

// Mock dataset
const mockVideos = Array.from({ length: 24 }).map((_, idx) => ({
  id: `vid_${idx + 1}`,
  title: `Oceanic Journey ${idx + 1}`,
  thumbnailUrl: `https://picsum.photos/seed/ocean-${idx + 1}/480/270`,
  duration: `${Math.floor(Math.random() * 9) + 1}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}`,
  views: Math.floor(Math.random() * 90000) + 1000,
  author: idx % 3 === 0 ? 'BlueWave Studio' : idx % 3 === 1 ? 'Amber Labs' : 'DeepDive Media',
  category: ['Featured', 'Education', 'Music', 'Documentary'][idx % 4],
  description:
    'A calming exploration of the sea with minimalist visuals and modern soundscapes. Experience the Ocean Professional aesthetic.',
  videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
}));

// PUBLIC_INTERFACE
export const VideoAPI = {
  /** Fetch a list of videos. Accepts optional query and category filters. */
  async getVideos({ query = '', category = 'All' } = {}) {
    // Replace with:
    // const res = await fetch(`${BASE_URL}/videos?query=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`);
    // if (!res.ok) throw new Error('Failed to fetch videos');
    // return res.json();

    await delay();
    const filtered = mockVideos.filter((v) => {
      const matchQuery =
        !query ||
        v.title.toLowerCase().includes(query.toLowerCase()) ||
        v.author.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === 'All' || v.category === category;
      return matchQuery && matchCat;
    });
    return { items: filtered };
  },

  /** Fetch a single video by ID. */
  async getVideoById(id) {
    await delay();
    const item = mockVideos.find((v) => v.id === id);
    if (!item) {
      throw new Error('Video not found');
    }
    return item;
  }
};

// PUBLIC_INTERFACE
export const AuthAPI = {
  /** Simulated login endpoint. Returns a mock JWT and user. */
  async login({ email, password }) {
    // Replace with real POST:
    // const res = await fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    // if (!res.ok) throw new Error('Login failed');
    // return res.json();
    await delay(500);
    if (!email || !password) throw new Error('Missing credentials');
    return {
      token: 'mock-jwt-token',
      user: {
        id: 'user_1',
        name: 'Ocean Pro',
        email,
        avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(email)}`
      }
    };
  },

  /** Simulated profile fetch using token. */
  async me({ token }) {
    await delay(250);
    if (!token) throw new Error('Unauthorized');
    return {
      id: 'user_1',
      name: 'Ocean Pro',
      email: 'ocean.pro@example.com',
      avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=Ocean%20Pro`
    };
  },

  /** Simulated logout action. */
  async logout() {
    await delay(150);
    return { success: true };
  }
};

// PUBLIC_INTERFACE
export const PlaybackAPI = {
  /** Get playback URL or signed URL for a video. */
  async getPlaybackUrl(videoId) {
    // Replace with secure signed URL retrieval
    await delay(200);
    const v = await VideoAPI.getVideoById(videoId);
    return { url: v.videoUrl };
  }
};

// PUBLIC_INTERFACE
export const UserAPI = {
  /**
   * Simulated user watch history. Replace with:
   * GET `${BASE_URL}/users/{userId}/history`
   */
  async getWatchHistory(userId) {
    await delay(300);
    const { items } = await VideoAPI.getVideos({});
    const sample = items.slice(0, 6);
    return sample.map((v, idx) => ({ ...v, watchedAt: Date.now() - idx * 60 * 60 * 1000 }));
  },
  /**
   * Simulated user preferences. Replace with:
   * GET `${BASE_URL}/users/{userId}/preferences`
   */
  async getPreferences(userId) {
    await delay(200);
    return ['Featured', 'Documentary', 'Education'];
  }
};

// PUBLIC_INTERFACE
export const RecommendationAPI = {
  /**
   * Simulated AI-driven recommendations combining:
   * - Topic affinity (overlap with preferences)
   * - Freshness (randomness)
   * - Popularity (views)
   * Replace with backend ML/rec system in the future.
   */
  async getRecommended({ user, history = [], preferences = [], catalog = [] }) {
    await delay(400);
    const prefSet = new Set(preferences);
    const historyIds = new Set(history.map((h) => h.id));
    const scored = (catalog || []).map((v) => {
      const prefScore = prefSet.has(v.category) ? 2 : 0;
      const popScore = Math.log10((v.views || 1) + 10);
      const randScore = Math.random();
      const penalty = historyIds.has(v.id) ? -2 : 0;
      return { v, score: prefScore + popScore * 0.6 + randScore * 0.4 + penalty };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 8).map((s) => s.v);
  }
};
