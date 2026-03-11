import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-stone-900 border-b border-stone-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/main" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-emerald-500" />
              <span className="text-2xl font-bold text-emerald-400 tracking-tight">GoGoFarm</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/gogomall" className="relative group flex items-center px-5 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 border border-pink-400 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <span className="text-white font-extrabold text-lg">
                고고몰
              </span>
            </Link>
            <Link to="/info" className="text-stone-200 hover:text-white font-medium transition-colors">귀농 정보</Link>
            <Link to="/consulting" className="text-stone-200 hover:text-white font-medium transition-colors">귀농 컨설팅</Link>
            <Link to="/ai-consulting" className="text-stone-200 hover:text-white font-medium transition-colors">AI 귀농 상담</Link>
            <Link to="/regional" className="text-stone-200 hover:text-white font-medium transition-colors">지역 귀농 정보</Link>
            <Link to="/farmland" className="text-stone-200 hover:text-white font-medium transition-colors">농지 정보</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user?.isAdmin && (
              <Link to="/admin" className="text-stone-400 hover:text-white font-medium transition-colors text-sm border border-stone-700 px-3 py-1 rounded-full">관리자</Link>
            )}
            {user ? (
              <>
                <Link to="/mypage" className="text-stone-300 hover:text-emerald-400 font-medium transition-colors">마이페이지</Link>
                <button onClick={logout} className="text-stone-300 hover:text-emerald-400 font-medium transition-colors">로그아웃</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-stone-300 hover:text-emerald-400 font-medium transition-colors">로그인</Link>
                <Link to="/signup" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">회원가입</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/gogomall" className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 border border-pink-400 rounded-full text-white font-bold text-sm shadow-md">
              고고몰
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-stone-900 border-b border-stone-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/gogomall" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 rounded-md text-base font-bold text-pink-400 hover:text-pink-300 hover:bg-stone-800 bg-stone-800/50 mb-2">🛍️ 고고몰 바로가기</Link>
            <Link to="/info" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-white hover:bg-stone-800">귀농 정보</Link>
            <Link to="/consulting" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-white hover:bg-stone-800">귀농 컨설팅</Link>
            <Link to="/ai-consulting" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-white hover:bg-stone-800">AI 귀농 상담</Link>
            <Link to="/regional" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-white hover:bg-stone-800">지역 귀농 정보</Link>
            <Link to="/farmland" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-white hover:bg-stone-800">농지 정보</Link>
            
            <div className="border-t border-stone-800 pt-4 pb-2 mt-4">
              {user?.isAdmin && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-emerald-400 hover:text-emerald-300 hover:bg-stone-800">관리자 페이지</Link>
              )}
              {user ? (
                <>
                  <Link to="/mypage" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-white hover:bg-stone-800">마이페이지</Link>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-white hover:bg-stone-800">로그아웃</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-white hover:bg-stone-800">로그인</Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-emerald-400 hover:text-emerald-300 hover:bg-stone-800">회원가입</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
