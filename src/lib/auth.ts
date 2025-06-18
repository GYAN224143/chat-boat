import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  username: string | null;
}

export const authAtom = atomWithStorage<AuthState>('auth', {
  isAuthenticated: false,
  token: null,
  userId: null,
  username: null,
});

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);

  const login = (token: string, userId: string, username: string) => {
    setAuth({
      isAuthenticated: true,
      token,
      userId,
      username,
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      userId: null,
      username: null,
    });
  };

  return { auth, login, logout };
};
