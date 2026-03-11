import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, FileText, Settings, Bell, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function MyPage() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-stone-900">마이페이지</h1>
          <p className="text-stone-500 mt-2">{user.name}님의 귀농 준비 현황을 확인하세요</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-stone-900">{user.name}</h2>
                  <p className="text-sm text-stone-500">{user.email}</p>
                </div>
              </div>
              <div className="border-t border-stone-100 pt-4">
                <button className="w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 rounded-lg transition-colors">
                  프로필 수정
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <nav className="flex flex-col">
                <a href="#" className="flex items-center justify-between px-6 py-4 bg-emerald-50 text-emerald-700 font-medium border-l-4 border-emerald-600">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-3" />
                    상담 내역
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center justify-between px-6 py-4 text-stone-600 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 mr-3" />
                    알림 설정
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center justify-between px-6 py-4 text-stone-600 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 mr-3" />
                    계정 설정
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">나의 상담 내역</h2>
              
              <div className="space-y-4">
                {/* Mock Data Item 1 */}
                <div className="border border-stone-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full mb-2">
                        접수 완료
                      </span>
                      <h3 className="text-lg font-bold text-stone-900">전통 농업 컨설팅 (경북 지역)</h3>
                      <p className="text-sm text-stone-500 mt-1">신청일: 2023.10.25</p>
                    </div>
                    <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                      상세 보기
                    </button>
                  </div>
                  <p className="text-stone-600 text-sm bg-stone-50 p-4 rounded-lg">
                    "경북 지역에서 사과 과수원을 시작하고 싶습니다. 초기 자본금과 필요한 농지 규모에 대해 상담받고 싶습니다."
                  </p>
                </div>

                {/* Mock Data Item 2 */}
                <div className="border border-stone-200 rounded-xl p-6 hover:shadow-md transition-shadow opacity-75">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-full mb-2">
                        상담 완료
                      </span>
                      <h3 className="text-lg font-bold text-stone-900">AI 귀농 상담 (스마트팜)</h3>
                      <p className="text-sm text-stone-500 mt-1">신청일: 2023.09.12</p>
                    </div>
                    <button className="text-sm font-medium text-stone-600 hover:text-stone-900">
                      결과 보기
                    </button>
                  </div>
                  <p className="text-stone-600 text-sm bg-stone-50 p-4 rounded-lg">
                    "딸기 스마트팜 창업을 위한 지원금 및 교육 프로그램 문의"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
