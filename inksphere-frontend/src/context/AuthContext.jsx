import { createContext, useCallback, useEffect, useState } from 'react';
import { getMyProfile } from '../api/user.api';
import { loginRequest, logoutRequest, registerRequest } from '../api/auth.api';
import { extractErrorMessage } from '../api/axios';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await getMyProfile();
      setUser(data.user);
      return data.user;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    (async () => {
      await fetchProfile();
      setInitializing(false);
    })();
  }, [fetchProfile]);

  const login = useCallback(
    async (credentials) => {
      try {
        await loginRequest(credentials);
        const profile = await fetchProfile();
        return { success: true, user: profile };
      } catch (error) {
        return { success: false, message: extractErrorMessage(error, 'Could not sign in.') };
      }
    },
    [fetchProfile],
  );

  const register = useCallback(async (payload) => {
    try {
      await registerRequest(payload);
      return { success: true };
    } catch (error) {
      return { success: false, message: extractErrorMessage(error, 'Could not create your account.') };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
    }
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    initializing,
    login,
    register,
    logout,
    refreshProfile: fetchProfile,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
