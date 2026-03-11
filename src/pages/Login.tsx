import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isAdmin = false;
    if (email === 'admin@gogo.com') {
      if (password !== 'kjm14700Q@') {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      isAdmin = true;
    }
    
    login({ name: isAdmin ? '관리자' : '홍길동', email, isAdmin });
    navigate(isAdmin ? '/admin' : '/');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-stone-200">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <Sprout className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-stone-900">로그인</h2>
          <p className="mt-2 text-center text-sm text-stone-600">
            GoGoFarm에 오신 것을 환영합니다
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">이메일</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">비밀번호</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-stone-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-stone-900">
                로그인 유지
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                비밀번호 찾기
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
            >
              로그인
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-stone-600">
            아직 계정이 없으신가요?{' '}
            <Link to="/signup" className="font-medium text-emerald-600 hover:text-emerald-500">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
