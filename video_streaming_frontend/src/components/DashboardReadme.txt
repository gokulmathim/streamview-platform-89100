This is an internal note:

Dashboard.js is a modular page that composes:
- Your Topics (preferences chips)
- Recent Watch History (VideoGrid)
- Recommended For You (VideoGrid)

APIs used (all mocked for now):
- UserAPI.getWatchHistory(userId)
- UserAPI.getPreferences(userId)
- RecommendationAPI.getRecommended({ user, history, preferences, catalog })

Replace these with real backend endpoints keeping return shapes consistent.
