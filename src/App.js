import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { routes } from './routes';
import './global/style.css';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  const { pathname } = useLocation();
  const appRef = useRef();

  // scroll to top every path change

  useEffect(() => {
    appRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return (
    <div className="app-container" ref={appRef}>
      <div className="space-top-container">
        <Header />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
