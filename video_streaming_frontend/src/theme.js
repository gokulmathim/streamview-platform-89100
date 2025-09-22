//
// Ocean Professional theme tokens and helpers
//

// PUBLIC_INTERFACE
export const theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',    // Blue
    secondary: '#F59E0B',  // Amber
    success: '#F59E0B',
    error: '#EF4444',
    gradientFrom: 'rgba(59, 130, 246, 0.1)', // blue-500/10
    gradientTo: '#f9fafb', // gray-50
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    textMuted: 'rgba(17,24,39,0.65)',
    border: 'rgba(17,24,39,0.08)',
    shadow: 'rgba(17,24,39,0.1)'
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px'
  },
  shadow: {
    sm: '0 2px 6px rgba(17,24,39,0.05)',
    md: '0 6px 16px rgba(17,24,39,0.08)',
    lg: '0 16px 30px rgba(17,24,39,0.12)'
  },
  transition: 'all 200ms ease'
};

// PUBLIC_INTERFACE
export function applyThemeToRoot() {
  // Apply CSS variables to :root for easy theming via CSS
  const r = document.documentElement;
  const c = theme.colors;
  r.style.setProperty('--ocn-primary', c.primary);
  r.style.setProperty('--ocn-secondary', c.secondary);
  r.style.setProperty('--ocn-bg', c.background);
  r.style.setProperty('--ocn-surface', c.surface);
  r.style.setProperty('--ocn-text', c.text);
  r.style.setProperty('--ocn-text-muted', c.textMuted);
  r.style.setProperty('--ocn-border', c.border);
  r.style.setProperty('--ocn-shadow', c.shadow);
  r.style.setProperty('--ocn-grad-from', c.gradientFrom);
  r.style.setProperty('--ocn-grad-to', c.gradientTo);
}
