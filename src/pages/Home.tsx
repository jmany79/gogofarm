import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sprout, Tractor, Bug, Shell, Wheat, Sun, Cloud, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Banners and Popups State
  const [activeBanners, setActiveBanners] = useState<any[]>([]);
  const [activePopups, setActivePopups] = useState<any[]>([]);
  const [closedPopups, setClosedPopups] = useState<number[]>([]);

  useEffect(() => {
    const savedBanners = localStorage.getItem('siteBanners');
    if (savedBanners) {
      try {
        const parsed = JSON.parse(savedBanners);
        setActiveBanners(parsed.filter((b: any) => b.type === '메인 배너' && b.status));
        
        // Filter popups based on "Do not show today"
        const now = new Date().getTime();
        const hiddenPopupsStr = localStorage.getItem('hiddenPopups');
        const hiddenPopups = hiddenPopupsStr ? JSON.parse(hiddenPopupsStr) : {};
        
        const visiblePopups = parsed.filter((b: any) => {
          if (b.type !== '팝업' || !b.status) return false;
          if (hiddenPopups[b.id] && hiddenPopups[b.id] > now) return false;
          return true;
        });
        
        setActivePopups(visiblePopups);
      } catch (e) {
        console.error('Failed to parse banners', e);
      }
    } else {
      // Default active banners
      setActiveBanners([
        { id: 1, title: '봄맞이 농기계 특별 할인전', type: '메인 배너', status: true },
        { id: 2, title: '청년 창업농 정부지원금 안내', type: '메인 배너', status: true }
      ]);
    }
  }, []);

  const handleHidePopupToday = (id: number) => {
    const now = new Date();
    // Set expiration to midnight of the next day
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    
    const hiddenPopupsStr = localStorage.getItem('hiddenPopups');
    const hiddenPopups = hiddenPopupsStr ? JSON.parse(hiddenPopupsStr) : {};
    
    hiddenPopups[id] = tomorrow.getTime();
    localStorage.setItem('hiddenPopups', JSON.stringify(hiddenPopups));
    
    setClosedPopups(prev => [...prev, id]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/ai-consulting?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/ai-consulting');
    }
  };

  // Success Stories Data
  const defaultStories = [
    { title: '청년 농부의 스마트팜 도전기', tag: '스마트팜', img: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=600&q=80' },
    { title: '도시를 떠나 감귤농장으로', tag: '전통 농업', img: 'https://images.unsplash.com/photo-1557800636-8ab37fa8e270?auto=format&fit=crop&w=600&q=80' },
    { title: '미래 식량, 곤충 사육의 비전', tag: '곤충 사육', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80' }
  ];
  
  const [successStories, setSuccessStories] = useState(() => {
    const saved = localStorage.getItem('successStories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultStories;
      }
    }
    return defaultStories;
  });

  // Floating animation variant
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const floatingAnimationDelayed = {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 1
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Main Banners */}
      {activeBanners.length > 0 && (
        <div className="py-4 px-4 text-center text-sm font-medium relative z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10">
            {activeBanners.map(banner => (
              <Link key={banner.id} to={`/banner/${banner.id}`} className="flex items-center transition-transform hover:scale-105 cursor-pointer group">
                <span className="w-2.5 h-2.5 bg-pink-500 rounded-full mr-3 animate-ping shadow-[0_0_12px_rgba(236,72,153,0.9)]"></span>
                <span className="font-extrabold text-pink-500 tracking-wide mr-2 text-lg animate-pulse drop-shadow-[0_0_8px_rgba(236,72,153,0.6)] group-hover:text-pink-400">{banner.title}</span>
                {banner.desc && <span className="hidden sm:inline text-pink-700/80 font-bold">- {banner.desc}</span>}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popups */}
      <div className="fixed top-32 left-4 right-4 z-[100] flex flex-wrap gap-4 pointer-events-none items-start">
        <AnimatePresence>
          {activePopups.filter(p => !closedPopups.includes(p.id)).map(popup => (
            <motion.div
              key={popup.id}
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl shadow-emerald-500/30 border border-emerald-400 p-6 w-full sm:w-80 pointer-events-auto shrink-0 relative"
            >
              <button 
                onClick={() => setClosedPopups(prev => [...prev, popup.id])}
                className="absolute top-4 right-4 text-emerald-100 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex flex-col mb-4">
                {popup.img && (
                  <img src={popup.img} alt={popup.title} className="w-full h-32 object-cover rounded-lg mb-4 border border-emerald-400" referrerPolicy="no-referrer" />
                )}
                <div className="flex items-start">
                  {!popup.img && (
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 shrink-0 border border-emerald-400">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-white text-lg pr-6 tracking-wide drop-shadow-sm">{popup.title}</h3>
                    <p className="text-emerald-50 text-sm mt-1">{popup.desc || '고고팜의 새로운 소식을 확인하세요.'}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setClosedPopups(prev => [...prev, popup.id])}
                    className="flex-1 py-2 px-4 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 border border-emerald-400 transition-colors"
                  >
                    닫기
                  </button>
                  <Link to={`/banner/${popup.id}`} className="flex-1 py-2 px-4 bg-white text-emerald-700 rounded-lg text-sm font-bold hover:bg-emerald-50 transition-colors text-center shadow-md">
                    자세히 보기
                  </Link>
                </div>
                <button 
                  onClick={() => handleHidePopupToday(popup.id)}
                  className="text-xs text-emerald-100 hover:text-white text-right underline underline-offset-2 transition-colors"
                >
                  오늘 하루 보지 않기
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Hero Section - 고급스러운 배경 (Elegant Background) */}
      <section className="relative bg-gradient-to-br from-stone-100 via-stone-50 to-emerald-50/50 pt-20 pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-stone-50/60 backdrop-blur-[2px]" />
        
        {/* Anti-gravity decorative elements */}
        <motion.div animate={floatingAnimation} className="absolute top-20 left-[10%] text-emerald-400/50">
          <Cloud size={80} />
        </motion.div>
        <motion.div animate={floatingAnimationDelayed} className="absolute top-40 right-[15%] text-teal-400/40">
          <Sun size={100} />
        </motion.div>
        <motion.div animate={floatingAnimation} className="absolute bottom-40 left-[20%] text-emerald-500/30">
          <Sprout size={60} />
        </motion.div>
        <motion.div animate={floatingAnimationDelayed} className="absolute top-32 left-[80%] text-cyan-400/40">
          <Cloud size={60} />
        </motion.div>

        {/* Scattered Icons Background (Replacing Images) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[
            { Icon: Wheat, className: "absolute left-[5%] md:left-[10%] top-[15%] md:top-[20%] text-amber-500/40", size: 80, delay: 0, duration: 4 },
            { Icon: Sprout, className: "absolute right-[5%] md:right-[15%] top-[20%] md:top-[25%] text-emerald-500/40", size: 100, delay: 1.5, duration: 5 },
            { Icon: Bug, className: "absolute left-[10%] md:left-[15%] bottom-[20%] md:bottom-[25%] text-lime-500/40", size: 90, delay: 2.5, duration: 4.5 },
            { Icon: Shell, className: "absolute right-[10%] md:right-[20%] bottom-[15%] md:bottom-[20%] text-teal-500/40", size: 70, delay: 0.5, duration: 3.5 },
            { Icon: Tractor, className: "absolute left-[45%] md:left-[50%] top-[10%] md:top-[15%] text-orange-500/40", size: 120, delay: 3, duration: 6 },
            { Icon: Wheat, className: "absolute right-[2%] md:right-[5%] top-[45%] md:top-[50%] text-amber-400/30", size: 60, delay: 2, duration: 4 },
            { Icon: Sprout, className: "absolute left-[2%] md:left-[5%] top-[55%] md:top-[60%] text-emerald-400/30", size: 75, delay: 1, duration: 5.5 },
          ].map((item, index) => (
            <motion.div
              key={index}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.1, 0.8],
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: item.duration, 
                delay: item.delay, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className={`${item.className} drop-shadow-sm`}
            >
              <item.Icon size={item.size} />
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm mb-6 shadow-sm">
              자연과 함께하는 새로운 시작
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-stone-900 drop-shadow-sm">
              귀농을 <span className="text-emerald-600">시작하세요</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl mb-16 text-stone-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            정보 탐색부터 상담, 실행, 정착까지<br/>한 곳에서 해결하는 통합 귀농 플랫폼
          </motion.p>
          
          {/* AI Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-2 flex flex-col sm:flex-row items-center shadow-2xl border border-white/50 relative z-20"
          >
            <div className="flex items-center w-full px-4 py-2 sm:py-0">
              <Search className="h-6 w-6 text-emerald-500 shrink-0" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="어떤 귀농 정보를 찾고 계신가요?" 
                className="flex-grow px-4 py-3 text-stone-900 focus:outline-none text-lg bg-transparent placeholder-stone-400"
              />
            </div>
            <button type="submit" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg whitespace-nowrap mt-2 sm:mt-0">
              AI 상담 시작하기
            </button>
          </motion.form>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-stone-900">귀농 시작 가이드</h2>
            <p className="text-stone-500 mt-4">성공적인 정착을 위한 5단계 로드맵</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-emerald-100 -z-10 -translate-y-1/2"></div>
            {[
              { step: 1, title: '귀농 이해', desc: '귀농의 기본 개념과 마음가짐' },
              { step: 2, title: '귀농 교육', desc: '기초부터 전문 기술까지' },
              { step: 3, title: '농지 선택', desc: '나에게 맞는 지역과 땅 찾기' },
              { step: 4, title: '자금 신청', desc: '정부 지원금 및 대출 알아보기' },
              { step: 5, title: '농장 구축', desc: '본격적인 농업 시작' }
            ].map((item, index) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-lg shadow-stone-200/50 border border-stone-100 cursor-pointer hover:-translate-y-3 hover:scale-105 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-6 shadow-md">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-3 text-stone-900">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-stone-900">귀농 인기 분야</h2>
            <p className="text-stone-500 mt-4">나에게 딱 맞는 농업 분야를 찾아보세요</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Wheat, title: '전통 농업', desc: '과수, 채소, 논농사', color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: Sprout, title: '스마트팜', desc: '온실, 수경재배', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: Bug, title: '곤충 사육', desc: '식용, 사료용, 반려', color: 'text-lime-600', bg: 'bg-lime-50' },
              { icon: Shell, title: '파충류 사육', desc: '도마뱀, 거북이', color: 'text-teal-600', bg: 'bg-teal-50' },
              { icon: Tractor, title: '축산', desc: '한우, 양계, 양봉', color: 'text-orange-600', bg: 'bg-orange-50' }
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="h-full"
              >
                <Link to="/consulting" className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-3 transition-all duration-300 border border-stone-100 flex flex-col items-center text-center h-full">
                  <motion.div 
                    animate={i % 2 === 0 ? floatingAnimation : floatingAnimationDelayed}
                    className={`w-20 h-20 ${cat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${cat.color}`}
                  >
                    <cat.icon className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-stone-900">{cat.title}</h3>
                  <p className="text-stone-500 text-sm">{cat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-stone-900 mb-4">지역별 귀농 정보</h2>
              <p className="text-stone-500">전국 각지의 귀농 지원 정책과 정보를 확인하세요.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/regional" className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700 bg-emerald-50 px-6 py-3 rounded-full transition-colors">
                전체보기 <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'].map((region, i) => (
              <motion.div
                key={region}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link to="/regional" className="block bg-stone-50 hover:bg-gradient-to-br hover:from-emerald-400 hover:to-teal-500 hover:text-white p-6 rounded-2xl text-center font-bold text-stone-700 hover:-translate-y-1 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg border border-stone-100 hover:border-transparent">
                  {region}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">귀농 성공 사례</h2>
            <p className="text-stone-400">먼저 길을 걸어간 선배들의 생생한 이야기</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {successStories.map((story: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group cursor-pointer hover:-translate-y-3 transition-transform duration-300"
              >
                <div className="overflow-hidden rounded-3xl mb-6 relative shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent z-10" />
                  <img src={story.img} alt={story.title} className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-6 left-6 z-20">
                    <span className="inline-block px-4 py-1.5 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider shadow-sm">
                      {story.tag}
                    </span>
                    <h3 className="text-2xl font-bold group-hover:text-emerald-300 transition-colors leading-tight pr-4">
                      {story.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600" />
        <motion.div 
          animate={floatingAnimation}
          className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        />
        <motion.div 
          animate={floatingAnimationDelayed}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-8 text-white drop-shadow-md"
          >
            전문가와 함께 귀농을 준비하세요
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-emerald-50 mb-12 font-medium leading-relaxed"
          >
            작물 선택부터 농지 구입, 창업 자금까지<br/>전문가가 1:1로 확실하게 도와드립니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link to="/consulting" className="inline-block bg-white text-emerald-600 px-12 py-5 rounded-2xl font-extrabold text-xl hover:bg-emerald-50 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-900/50">
              전문가 귀농 상담 신청
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
