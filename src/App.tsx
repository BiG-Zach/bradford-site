import './styles/mobile-header.css';
import { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BrandBar from './components/BrandBar';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#content" className="skip-to-content">Skip to content</a>
      <BrandBar />
      <Header />
      <div id="content" className="flex-1">
        <Suspense
          fallback={
            <div className="p-6 text-center">
              <div className="inline-block rounded border border-slate-300 bg-white px-4 py-2 text-slate-700">
                Loading...
              </div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      {/* Safety net: if Outlet renders nothing for any reason, show a visible hint */}
      <noscript>
        <div className="p-4 text-center text-red-600">
          JavaScript is disabled. Enable it to view this site.
        </div>
      </noscript>
    </div>
  );
}
