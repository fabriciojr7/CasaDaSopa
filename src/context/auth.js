import {
  createContext, useState, useMemo, useCallback, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = useCallback(async (email, senha) => {
    const data = await AuthService.realizalogin({ email, password: senha });

    const loggedUser = { id: data.user.id, email: data.user.email };
    const { token } = data.token;

    localStorage.setItem('user', JSON.stringify(loggedUser));
    localStorage.setItem('token', token);

    setUser(loggedUser);
    navigate('/adm');
  }, [navigate]);

  const logout = useCallback(async () => {
    await AuthService.realizalogout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const value = useMemo(() => ({
    authenticated: !!user, user, loading, login, logout,
  }), [login, logout, user, loading]);
  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}
