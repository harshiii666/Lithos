import React, { lazy, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import App from './App';
import { AuthProvider } from './site/AuthProvider';
import './index.css';

const CoursePage = lazy(() => import('./site/pages/CoursePage'));
const FieldGuidesPage = lazy(() => import('./site/pages/FieldGuidesPage'));
const GuideDetailPage = lazy(() => import('./site/pages/GuideDetailPage'));
const GeologyPage = lazy(() => import('./site/pages/GeologyPage'));
const PlansPage = lazy(() => import('./site/pages/PlansPage'));
const LiveTourPage = lazy(() => import('./site/pages/LiveTourPage'));
const SignUpPage = lazy(() => import('./site/pages/SignUpPage'));
const SignInPage = lazy(() => import('./site/pages/SignInPage'));
const AccountPage = lazy(() => import('./site/pages/AccountPage'));
const LicensePage = lazy(() => import('./site/pages/LicensePage'));
const AboutPage = lazy(() => import('./site/pages/AboutPage'));
const NotFoundPage = lazy(() => import('./site/pages/NotFoundPage'));

const HOME_TITLE = 'Lithos — Layers Hold Tales of Time';
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    if (pathname === '/') document.title = HOME_TITLE;
  }, [pathname]);

  return null;
}

function RouteLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080808]">
      <div className="flex flex-col items-center gap-5">
        <svg
          width="30"
          height="30"
          viewBox="0 0 256 256"
          fill="#ffffff"
          aria-hidden="true"
          className="animate-pulse"
        >
          <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
        </svg>
        <span className="text-[9px] uppercase tracking-[0.24em] text-white/35">
          Finding the ground
        </span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={BASENAME}>
      <AuthProvider>
        <RouteEffects />
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/field-guides" element={<FieldGuidesPage />} />
            <Route path="/field-guides/:slug" element={<GuideDetailPage />} />
            <Route path="/geology" element={<GeologyPage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/live-tour" element={<LiveTourPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/license" element={<LicensePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
