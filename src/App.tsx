import { useAtom } from 'jotai';
import { Route, Routes } from 'react-router-dom';
import { authAtom } from './lib/auth.ts';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import ChatPage from './pages/ChatPage';

function App() {
  const [auth] = useAtom(authAtom);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={auth.isAuthenticated}>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
