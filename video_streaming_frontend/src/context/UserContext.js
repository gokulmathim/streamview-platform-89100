import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * UserContext holds mock authentication and subscription plan state for the app.
 * Separates integration areas for future backend wiring.
 */

// PUBLIC_INTERFACE
export const UserContext = createContext({
  user: null,
  token: '',
  plan: 'free', // 'free' | 'premium'
  isPremium: false,
  // Actions
  login: async () => {},
  logout: async () => {},
  upgradeToPremium: () => {},
  downgradeToFree: () => {},
  togglePlan: () => {},
});

/**
 * PUBLIC_INTERFACE
 * UserProvider provides user and subscription plan data to the tree.
 * This is a mock implementation and should be replaced with a real integration.
 */
export function UserProvider({ children, initialUser = null, initialToken = '', initialPlan = 'free' }) {
  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(initialToken);
  const [plan, setPlan] = useState(initialPlan); // 'free' | 'premium'

  const isPremium = plan === 'premium';

  // Integration seam: replace with AuthAPI.login and plan retrieval from backend.
  const login = useCallback(async (loginImpl) => {
    const exec = loginImpl ? loginImpl : async () => ({ token: 'mock', user: { id: 'user_1', name: 'Ocean Pro', email: 'ocean.pro@example.com', avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=Ocean%20Pro` } });
    const res = await exec();
    setUser(res.user);
    setToken(res.token);
    // Optionally fetch plan from backend here in the future
    return res;
  }, []);

  // Integration seam: replace with AuthAPI.logout
  const logout = useCallback(async () => {
    setToken('');
    setUser(null);
    setPlan('free');
  }, []);

  // PUBLIC_INTERFACE
  const upgradeToPremium = useCallback(() => setPlan('premium'), []);
  // PUBLIC_INTERFACE
  const downgradeToFree = useCallback(() => setPlan('free'), []);
  // PUBLIC_INTERFACE
  const togglePlan = useCallback(() => setPlan((p) => (p === 'premium' ? 'free' : 'premium')), []);

  const value = useMemo(
    () => ({ user, token, plan, isPremium, login, logout, upgradeToPremium, downgradeToFree, togglePlan }),
    [user, token, plan, isPremium, login, logout, upgradeToPremium, downgradeToFree, togglePlan]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// PUBLIC_INTERFACE
export function useUser() {
  /** Access the user, token, and plan flags throughout the app. */
  return useContext(UserContext);
}
