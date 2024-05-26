import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { AuthProvider } from './components/AuthContext';

import './static/main.css';

const LazyRecharge = React.lazy(() => import('./components/Recharge'));
const LazyMomo = React.lazy(() => import('./components/Recharge/Momo'));
const LazyBank = React.lazy(() => import('./components/Recharge/Bank'));
const LazyExchange = React.lazy(() => import('./components/Exchange'));
const LazyDownload = React.lazy(() => import('./components/Download'));
const LazyPost = React.lazy(() => import('./components/Post'));
const LazyCategory = React.lazy(() => import('./components/Category'));
const LazyCommunity = React.lazy(() => import('./components/Community'));
const LazyProfile = React.lazy(() => import('./components/User/Profile'));
const LazyTransactions = React.lazy(() => import('./components/User/Transactions'));
const LazyChangepassword = React.lazy(() => import('./components/User/Change-password'));
const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </React.StrictMode>
  );
};
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    setIsLoading(true);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className='container'>
      <div className='main'>
        <Header />
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/home" element={<Home />} exact />
            <Route path="/recharge" element={<LazyRecharge />} />
            <Route path="/recharge/momo" element={<LazyMomo />} />
            <Route path="/recharge/bank" element={<LazyBank />} />
            <Route path="/exchange" element={<LazyExchange />} />
            <Route path="/download" element={<LazyDownload />} />
            <Route path="/post/:id" element={<LazyPost />} />
            <Route path="/category" element={<LazyCategory />} />
            <Route path="/community" element={<LazyCommunity />} />
            <Route path="/user/profile" element={<LazyProfile />} />
            <Route path="/user/transactions" element={<LazyTransactions />} />
            <Route path="/user/change-password" element={<LazyChangepassword />} />
          </Routes>
        </Suspense>
        {isLoading ? <Loading /> : null}
        <Footer />
      </div>
      <canvas style={{ position: 'fixed', padding: '0px', margin: '0px', right: '0px', left: '0px', top: '0px', zIndex: '100001', display: 'none', opacity: '0.05' }} width="1920" height="5"></canvas>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export default App;
