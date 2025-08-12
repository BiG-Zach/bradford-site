import React, { Component, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind should be pulled in here
import './styles/brand-colors.css'; // Aurora Jade brand colors
import './styles/accents.css'; // Design system accents

// Prefer Router-based entry to match App's <Outlet /> usage.
// We keep a safe fallback to render Home directly if router bootstrapping fails.
import { AppRouter } from './utils/routes';
import Home from './pages/Home';

// Global runtime error logging
(function setupGlobalErrorLogging() {
  if (typeof window === 'undefined') return;

  // Deduplicate logs to avoid noisy repeats
  const seen = new Set<string>();

  function logError(prefix: string, err: unknown) {
    try {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : JSON.stringify(err);
      const stack = err instanceof Error ? err.stack : undefined;

      const key = `${prefix}:${message}:${stack ?? ''}`;
      if (seen.has(key)) return;
      seen.add(key);

      // eslint-disable-next-line no-console
      console.error(
        `[GlobalError] ${prefix}`,
        {
          message,
          stack,
          href: window.location.href,
          userAgent: navigator.userAgent,
          time: new Date().toISOString(),
        }
      );

      // Auto-scroll DevTools console to first error by forcing a synchronous log and microtask
      setTimeout(() => {
        // An extra console.error ensures focus/visibility in some browsers
        // eslint-disable-next-line no-console
        console.error('[GlobalError] See details above. Scrolled to first error if console is open.');
      }, 0);
    } catch {
      // eslint-disable-next-line no-console
      console.error('[GlobalError] Failed to log error', err);
    }
  }

  window.onerror = function (message, source, lineno, colno, error) {
    const file = typeof source === 'string' ? source.split('?')[0] : 'unknown';
    const info = `at ${file}:${lineno}:${colno}`;
    logError(`window.onerror ${info}`, error ?? message);
    return false; // allow default handling
  };

  window.onunhandledrejection = function (event) {
    const reason = (event && event.reason) || 'unknown';
    logError('window.onunhandledrejection', reason);
  };
})();

// Error Boundary to catch render errors
type ErrorBoundaryState = { hasError: boolean; error?: Error };
class RootErrorBoundary extends Component<PropsWithChildren<{}>, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] Render error', { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-xl w-full">
            <div className="mb-4 rounded border border-red-300 bg-red-50 p-4 text-red-700">
              <p className="font-semibold">An error occurred while rendering the app.</p>
              <p className="text-sm opacity-80">Check the browser console for details and stack traces.</p>
            </div>
            <pre className="overflow-auto rounded bg-slate-900/90 p-3 text-xs text-red-100">
{String(this.state.error?.stack || this.state.error?.message || 'Unknown error')}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const container = document.getElementById('root');

if (!container) {
  // Hard fail visibly if the root element is missing
  // eslint-disable-next-line no-console
  console.error("Root element with id 'root' not found in index.html");
  // Create a visible fallback so the screen isn't blank
  const body = document.body || document.createElement('body');
  const fallback = document.createElement('div');
  fallback.style.padding = '16px';
  fallback.style.fontFamily = 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial';
  fallback.style.color = '#ef4444';
  fallback.innerText = "Critical error: Root element '#root' not found.";
  body.appendChild(fallback);
} else {
  const root = ReactDOM.createRoot(container);
  try {
    root.render(
      <React.StrictMode>
        <RootErrorBoundary>
          <AppRouter />
        </RootErrorBoundary>
      </React.StrictMode>
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Router render failed, falling back to direct Home render:', err);
    root.render(
      <React.StrictMode>
        <RootErrorBoundary>
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
              <div className="mb-4 rounded border border-red-300 bg-red-50 p-4 text-red-700">
                <p className="font-semibold">Router failed to initialize.</p>
                <p className="text-sm opacity-80">Check react-router-dom setup and route definitions.</p>
              </div>
              <Home />
            </div>
          </div>
        </RootErrorBoundary>
      </React.StrictMode>
    );
  }
}
