# StreamView Frontend (React)

Modern, minimalist video streaming frontend following the “Ocean Professional” theme.

## Features
- Browse videos via grid thumbnails
- Sidebar navigation for categories and user
- Top search bar to filter videos
- Video player modal to stream/play selected videos
- User profile section with mock authentication
- Clean service layer with REST API placeholders

## Tech
- React 18 + react-scripts
- No heavy UI library; handcrafted CSS based on Ocean Professional theme

## Theme (Ocean Professional)
- primary: `#2563EB` (blue)
- secondary: `#F59E0B` (amber)
- error: `#EF4444`
- background: `#f9fafb`
- surface: `#ffffff`
- text: `#111827`

## Getting Started

1. Install:
   npm install

2. Run:
   npm start

3. Test:
   npm test

The app will be available at http://localhost:3000

## Environment Variables
Create `.env` at project root (optional):
- REACT_APP_API_BASE_URL: Base URL of backend API (defaults to http://localhost:4000)

Example `.env.example`:
```
REACT_APP_API_BASE_URL=http://localhost:4000
```

## Integrating Backend
Replace functions in `src/services/api.js` with real `fetch`/`axios` calls:
- VideoAPI.getVideos({ query, category })
- VideoAPI.getVideoById(id)
- AuthAPI.login({ email, password })
- AuthAPI.me({ token })
- PlaybackAPI.getPlaybackUrl(videoId)

Keep return shapes the same to avoid refactors.

## Project Structure
- src/theme.js                    Theme tokens and root CSS variables
- src/services/api.js             REST API placeholders
- src/components/*                UI Components
  - Sidebar.js                    Sidebar navigation with profile
  - TopBar.js                     Top search bar
  - VideoGrid.js                  Grid of videos
  - VideoCard.js                  Individual video card
  - VideoPlayerModal.js           Modal with HTML5 video player
  - styles.css                    Component styles (Ocean Professional)
- src/App.js                      Page layout and integrations
- src/index.css                   Base styles and typography

## Notes
- Video sources use a public sample URL. Replace via PlaybackAPI when backend is ready.
- Accessibility: semantic roles on topbar and modal. Keyboard navigation supported by default buttons/inputs.
