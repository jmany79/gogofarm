import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Information from './pages/Information';
import Consulting from './pages/Consulting';
import AIConsulting from './pages/AIConsulting';
import RegionalInfo from './pages/RegionalInfo';
import FarmlandInfo from './pages/FarmlandInfo';
import ImagePreview from './pages/ImagePreview';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import GogoMall from './pages/GogoMall';
import Admin from './pages/Admin';
import BannerDetail from './pages/BannerDetail';
import PageViewer from './pages/PageViewer';

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      {!isLandingPage && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Home />} />
          <Route path="/info" element={<Information />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/ai-consulting" element={<AIConsulting />} />
          <Route path="/regional" element={<RegionalInfo />} />
          <Route path="/farmland" element={<FarmlandInfo />} />
          <Route path="/preview-image" element={<ImagePreview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/gogomall" element={<GogoMall />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/banner/:id" element={<BannerDetail />} />
          <Route path="/page/:slug" element={<PageViewer />} />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
