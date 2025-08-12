import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';

// Lazy page stubs (extensionless imports for TS)
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Quote = lazy(() => import('../pages/quote/Quote'));
const Carriers = lazy(() => import('../pages/Carriers'));
const HowItWorks = lazy(() => import('../pages/HowItWorks'));
// Dynamic state page
const StateDynamic = lazy(() => import('../pages/states/[code]'));
const Referral = lazy(() => import('../pages/Referral'));
const Checklist = lazy(() => import('../pages/Checklist'));
const ThankYou = lazy(() => import('../pages/ThankYou'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const Terms = lazy(() => import('../pages/Terms'));

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'quote', element: <Quote /> },
      { path: 'carriers', element: <Carriers /> },
      { path: 'how-it-works', element: <HowItWorks /> },
      // Dynamic state route: /states/:code (expects 2-letter code like 'fl')
      { path: 'states/:code', element: <StateDynamic /> },
      { path: 'referral', element: <Referral /> },
      { path: 'checklist', element: <Checklist /> },
      { path: 'thank-you', element: <ThankYou /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms', element: <Terms /> },
    ],
  },
];

export function makeRouter() {
  return createBrowserRouter(routes);
}

export function AppRouter() {
  const router = makeRouter();
  return <RouterProvider router={router} />;
}