import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import SplashScreen from './components/SplashScreen';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import PublicProfile from './pages/PublicProfile';
import Bookmarks from './pages/Bookmarks';
import SearchResults from './pages/SearchResults';
import CategoryIndex from './pages/CategoryIndex';
import CategoryPage from './pages/CategoryPage';
import Trending from './pages/Trending';
import NotFound from './pages/NotFound';

const SPLASH_SESSION_KEY = 'inksphere-splash-shown';

export default function App() {
  // Plays once per browser session (a page refresh keeps it hidden;
  // a fresh tab/session shows it again) — the rest of the app mounts
  // and starts fetching underneath it, so content is ready the moment
  // the splash fades out.
  const [showSplash, setShowSplash] = useState(
    () => typeof window !== 'undefined' && !sessionStorage.getItem(SPLASH_SESSION_KEY),
  );

  const handleSplashFinish = () => {
    sessionStorage.setItem(SPLASH_SESSION_KEY, 'true');
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#16151f',
            color: '#faf9f6',
            fontSize: '14px',
            borderRadius: '2px',
          },
        }}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/authors/:id" element={<PublicProfile />} />
          <Route path="/category" element={<CategoryIndex />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResults />} />

          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <Trending />
              </ProtectedRoute>
            }
          />
          <Route
            path="/write"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
