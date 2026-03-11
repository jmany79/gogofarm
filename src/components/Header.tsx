import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-stone-900 border-b border-stone-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/main" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold text-emerald-400 tracking-tight">GoGoFarm</span>
          </Link>
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
          <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </header>
  );
}
