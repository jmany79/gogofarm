import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, ArrowRight, Bot, ShoppingBag, Map } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-50 overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Navigation / Header */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Sprout className="h-8 w-8 text-emerald-500" />
          <span className="text-2xl font-bold text-emerald-400 tracking-tight">GoGoFarm</span>
        </div>
        <Link 
          to="/main" 
          className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-sm font-medium transition-all flex items-center group"
        >
          메인으로 이동
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/80 to-stone-950" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-sm mb-8 border border-emerald-500/20 backdrop-blur-sm">
              대한민국 No.1 귀농·귀촌 플랫폼
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
              자연과 함께하는 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                새로운 시작
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-stone-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              AI 맞춤 컨설팅부터 농지 거래, 농산물 직거래 쇼핑몰까지. <br className="hidden md:block" />
              성공적인 귀농을 위한 모든 것을 고고팜에서 경험하세요.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/main" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-lg transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center justify-center group"
              >
                고고팜 시작하기
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/gogomall" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-bold text-lg transition-all border border-stone-700 flex items-center justify-center group"
              >
                고고몰 구경하기
              </Link>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left"
          >
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI 맞춤 컨설팅</h3>
              <p className="text-stone-400 leading-relaxed">
                빅데이터 기반의 AI가 당신의 예산과 선호도에 맞는 최적의 귀농 지역과 작물을 추천해 드립니다.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">고고몰 직거래</h3>
              <p className="text-stone-400 leading-relaxed">
                농업에 필요한 농기자재부터 신선한 농산물까지, 생산자와 소비자를 직접 연결하는 마켓플레이스.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Map className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">농지 및 지역 정보</h3>
              <p className="text-stone-400 leading-relaxed">
                전국 각지의 농지 매물 정보와 지자체별 귀농 지원 정책을 한눈에 비교하고 확인하세요.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
