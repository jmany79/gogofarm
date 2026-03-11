import { useState } from 'react';
import { Search, Map, DollarSign, Ruler, Tractor, Home, MapPin, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function FarmlandInfo() {
  const [regionFilter, setRegionFilter] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [newFarm, setNewFarm] = useState({
    region: '경기',
    title: '',
    price: '',
    area: '',
    type: '전',
    desc: '',
    img: ''
  });

  const farmImages = {
    smartfarm: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?auto=format&fit=crop&w=400&q=80', // 스마트팜/온실
    orchard: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80', // 과수원
    field: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80', // 밭/전
    paddy: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80', // 논/답
    livestock: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80', // 축사
    garden: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=400&q=80', // 텃밭/채소
  };

  const defaultFarms = [
    // 경기
    { id: 1, region: '경기', title: '경기 여주시 가남읍 스마트팜 부지', price: '4억 2,000만', area: '2,100㎡', type: '답', desc: '수도권 접근성 우수, 전기/수도 기반시설 완비, 즉시 하우스 시공 가능', img: farmImages.smartfarm },
    { id: 2, region: '경기', title: '경기 양평군 용문면 전원주택 및 텃밭', price: '3억 5,000만', area: '1,500㎡', type: '대/전', desc: '소규모 귀농 및 귀촌에 적합, 남향, 맑은 계곡 인접', img: farmImages.garden },
    { id: 3, region: '경기', title: '경기 이천시 장호원읍 복숭아 과수원', price: '5억 8,000만', area: '4,200㎡', type: '과수원', desc: '수확기 복숭아 나무 300주 식재, 저온저장고 포함', img: farmImages.orchard },
    
    // 강원
    { id: 4, region: '강원', title: '강원 평창군 봉평면 고랭지 배추밭', price: '1억 8,000만', area: '4,500㎡', type: '전', desc: '고랭지 채소 재배 적합, 일조량 풍부, 대형 트랙터 진입 가능', img: farmImages.field },
    { id: 5, region: '강원', title: '강원 횡성군 둔내면 한우 축사 부지', price: '2억 9,000만', area: '3,800㎡', type: '목장용지', desc: '민원 소지 없는 외곽 지역, 기존 축사 허가 득함', img: farmImages.livestock },
    
    // 충북
    { id: 6, region: '충북', title: '충북 충주시 엄정면 사과 과수원', price: '3억 2,000만', area: '3,300㎡', type: '과수원', desc: '충주 사과 특구 내 위치, 관수 시설 완비, 즉시 수확 가능', img: farmImages.orchard },
    { id: 7, region: '충북', title: '충북 보은군 마로면 대추 농장', price: '2억 1,000만', area: '2,800㎡', type: '전', desc: '보은 특산물 대추 재배지, 비가림 시설 일부 설치', img: farmImages.field },

    // 충남
    { id: 8, region: '충남', title: '충남 부여군 규암면 비닐하우스 부지', price: '3억 1,000만', area: '2,800㎡', type: '답', desc: '기존 하우스 뼈대 활용 가능, 토마토/딸기 재배 추천', img: farmImages.smartfarm },
    { id: 9, region: '충남', title: '충남 논산시 연무읍 딸기 하우스', price: '4억 5,000만', area: '3,000㎡', type: '답', desc: '수경재배 시설 완비, 논산 딸기 브랜드 활용 가능', img: farmImages.smartfarm },

    // 전북
    { id: 10, region: '전북', title: '전북 김제시 백구면 스마트팜 온실', price: '6억 5,000만', area: '4,000㎡', type: '답', desc: '최신식 유리온실, 파프리카 재배 중, 연매출 우수', img: farmImages.smartfarm },
    { id: 11, region: '전북', title: '전북 고창군 공음면 수박/멜론 밭', price: '1억 5,000만', area: '3,500㎡', type: '전', desc: '황토 흙으로 당도 높은 과채류 재배 최적지', img: farmImages.field },

    // 전남
    { id: 12, region: '전남', title: '전남 해남군 송지면 배추/마늘 밭', price: '1억 2,000만', area: '5,000㎡', type: '전', desc: '대규모 노지 재배 적합, 평탄한 지형, 용수 풍부', img: farmImages.field },
    { id: 13, region: '전남', title: '전남 나주시 금천면 배 과수원', price: '3억 8,000만', area: '4,500㎡', type: '과수원', desc: '나주배 명품 단지 내 위치, 수령 15년 성목 위주', img: farmImages.orchard },

    // 경북
    { id: 14, region: '경북', title: '경북 안동시 길안면 과수원 부지', price: '2억 5,000만', area: '3,300㎡', type: '전', desc: '사과 재배에 최적화된 토질, 진입로 확보, 관정 설치 완료', img: farmImages.orchard },
    { id: 15, region: '경북', title: '경북 상주시 화서면 포도(샤인머스캣) 농장', price: '5억 2,000만', area: '2,500㎡', type: '전', desc: '샤인머스캣 비가림 하우스 완비, 고수익 창출 가능', img: farmImages.smartfarm },

    // 경남
    { id: 16, region: '경남', title: '경남 진주시 대곡면 파프리카 하우스', price: '4억 8,000만', area: '3,200㎡', type: '답', desc: '수출용 파프리카 재배 단지, 복합 환경 제어기 설치', img: farmImages.smartfarm },
    { id: 17, region: '경남', title: '경남 밀양시 산내면 얼음골 사과밭', price: '3억 6,000만', area: '2,900㎡', type: '과수원', desc: '얼음골 특구, 일교차가 커서 당도 높은 사과 생산', img: farmImages.orchard },

    // 제주
    { id: 18, region: '제주', title: '제주 서귀포시 남원읍 감귤 과수원', price: '6억 2,000만', area: '3,000㎡', type: '과수원', desc: '타이벡 감귤 재배 중, 방풍림 조성 완료, 바다 조망', img: farmImages.orchard },
    { id: 19, region: '제주', title: '제주시 구좌읍 당근/무 밭', price: '4억 1,000만', area: '4,500㎡', type: '전', desc: '화산회토로 뿌리채소 재배 최적지, 2차선 도로 접함', img: farmImages.field },
  ];

  const [allFarms, setAllFarms] = useState(() => {
    const saved = localStorage.getItem('farmlandData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultFarms;
      }
    }
    return defaultFarms;
  });

  const filteredFarms = allFarms.filter(farm => searchQuery === '전체' || farm.region === searchQuery);

  const totalPages = Math.ceil(filteredFarms.length / itemsPerPage);
  const currentFarms = filteredFarms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = () => {
    setSearchQuery(regionFilter);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleRegisterClick = () => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarm.title || !newFarm.price || !newFarm.area) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    const newFarmData = {
      id: Date.now(),
      ...newFarm,
      img: newFarm.img || farmImages.field // Default image if empty
    };

    const updatedFarms = [newFarmData, ...allFarms];
    setAllFarms(updatedFarms);
    localStorage.setItem('farmlandData', JSON.stringify(updatedFarms));
    
    setIsModalOpen(false);
    setNewFarm({
      region: '경기',
      title: '',
      price: '',
      area: '',
      type: '전',
      desc: '',
      img: ''
    });
    alert('농지가 성공적으로 등록되었습니다.');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFarm({ ...newFarm, img: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-stone-900 mb-4">농지 및 창업 정보</h1>
          <p className="text-xl text-stone-500">귀농의 첫걸음, 나에게 맞는 농지와 창업 비용을 알아보세요</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-stone-200 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">지역</label>
              <select 
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
              >
                <option value="전체">전체</option>
                <option value="경기">경기</option>
                <option value="강원">강원</option>
                <option value="충북">충북</option>
                <option value="충남">충남</option>
                <option value="전북">전북</option>
                <option value="전남">전남</option>
                <option value="경북">경북</option>
                <option value="경남">경남</option>
                <option value="제주">제주</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">가격대</label>
              <select className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow">
                <option>전체</option>
                <option>1억 미만</option>
                <option>1억 ~ 3억</option>
                <option>3억 ~ 5억</option>
                <option>5억 이상</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">면적</label>
              <select className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow">
                <option>전체</option>
                <option>1,000㎡ 미만</option>
                <option>1,000㎡ ~ 3,000㎡</option>
                <option>3,000㎡ 이상</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleSearch}
                className="w-full bg-stone-900 hover:bg-stone-800 hover:scale-105 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center shadow-md"
              >
                <Search className="mr-2 h-5 w-5" />
                검색
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Farmland List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-stone-900 flex items-center">
                <Map className="mr-2 h-6 w-6 text-emerald-600" />
                추천 농지 매물 {searchQuery !== '전체' && <span className="text-emerald-600 ml-2 text-lg">({searchQuery})</span>}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-stone-500 font-medium">총 {filteredFarms.length}건</span>
                <button 
                  onClick={handleRegisterClick}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold flex items-center transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  농지 등록하기
                </button>
              </div>
            </div>
            
            {currentFarms.length > 0 ? currentFarms.map((farm, i) => (
              <motion.div 
                key={farm.id} 
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 5) * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col md:flex-row md:h-56 group cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="md:w-1/3 h-48 md:h-full relative overflow-hidden shrink-0">
                  <img src={farm.img} alt="농지" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    매매
                  </div>
                  <div className="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                    <MapPin className="w-3 h-3 mr-1" /> {farm.region}
                  </div>
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-600 transition-colors pr-4 line-clamp-1">{farm.title}</h3>
                      <span className="text-xl font-bold text-emerald-600 whitespace-nowrap shrink-0">{farm.price}</span>
                    </div>
                    <p className="text-stone-500 text-sm mb-4 leading-relaxed line-clamp-2">{farm.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 text-sm text-stone-600 bg-stone-50 p-3 rounded-lg mt-auto">
                    <div className="flex items-center"><Ruler className="mr-2 h-4 w-4 text-stone-400" /> 면적: <strong className="ml-1 text-stone-800">{farm.area}</strong></div>
                    <div className="flex items-center"><Map className="mr-2 h-4 w-4 text-stone-400" /> 지목: <strong className="ml-1 text-stone-800">{farm.type}</strong></div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-500">
                해당 지역의 농지 매물이 없습니다.
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  이전
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                      currentPage === i + 1
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  다음
                </button>
              </div>
            )}
          </div>

          {/* Startup Info */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-stone-200 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center">
                <DollarSign className="mr-2 h-6 w-6 text-emerald-600" />
                창업 비용 가이드
              </h2>
              
              <div className="space-y-6">
                <div className="border-b border-stone-100 pb-4">
                  <h3 className="font-bold text-stone-900 mb-2 flex items-center">
                    <Tractor className="mr-2 h-5 w-5 text-stone-500" />
                    농업 창업 비용 (전통 농업 기준)
                  </h3>
                  <ul className="space-y-2 text-sm text-stone-600">
                    <li className="flex justify-between"><span>농지 구입 (1,000평)</span> <span>약 1.5억 ~ 3억</span></li>
                    <li className="flex justify-between"><span>농기계 및 장비</span> <span>약 3,000만 ~ 5,000만</span></li>
                    <li className="flex justify-between"><span>종자 및 비료 (초기)</span> <span>약 500만 ~ 1,000만</span></li>
                    <li className="flex justify-between font-bold text-stone-900 mt-2 pt-2 border-t border-stone-100"><span>예상 총 비용</span> <span>약 2억 ~ 4억</span></li>
                  </ul>
                </div>

                <div className="border-b border-stone-100 pb-4">
                  <h3 className="font-bold text-stone-900 mb-2 flex items-center">
                    <Home className="mr-2 h-5 w-5 text-stone-500" />
                    시설 비용 (스마트팜 기준)
                  </h3>
                  <ul className="space-y-2 text-sm text-stone-600">
                    <li className="flex justify-between"><span>온실 시공 (300평)</span> <span>약 1.5억 ~ 2.5억</span></li>
                    <li className="flex justify-between"><span>환경 제어 시스템</span> <span>약 3,000만 ~ 5,000만</span></li>
                    <li className="flex justify-between"><span>양액기 및 관수 시설</span> <span>약 2,000만 ~ 4,000만</span></li>
                    <li className="flex justify-between font-bold text-stone-900 mt-2 pt-2 border-t border-stone-100"><span>예상 총 비용</span> <span>약 2억 ~ 3.5억</span></li>
                  </ul>
                </div>

                <div className="bg-emerald-50 p-4 rounded-xl">
                  <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                    * 위 비용은 대략적인 예상치이며, 지역, 작물, 시설 수준에 따라 크게 달라질 수 있습니다. 정확한 비용 산출을 위해 전문가 상담을 권장합니다.
                  </p>
                </div>

                <button 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 hover:scale-105 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-md"
                >
                  맞춤형 창업 비용 상담
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Register Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                <h3 className="text-xl font-bold text-stone-800">새 농지 등록</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">지역 *</label>
                      <select 
                        value={newFarm.region}
                        onChange={(e) => setNewFarm({...newFarm, region: e.target.value})}
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      >
                        <option value="경기">경기</option>
                        <option value="강원">강원</option>
                        <option value="충북">충북</option>
                        <option value="충남">충남</option>
                        <option value="전북">전북</option>
                        <option value="전남">전남</option>
                        <option value="경북">경북</option>
                        <option value="경남">경남</option>
                        <option value="제주">제주</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">지목 *</label>
                      <select 
                        value={newFarm.type}
                        onChange={(e) => setNewFarm({...newFarm, type: e.target.value})}
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      >
                        <option value="전">전 (밭)</option>
                        <option value="답">답 (논)</option>
                        <option value="과수원">과수원</option>
                        <option value="목장용지">목장용지</option>
                        <option value="대/전">대/전</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">매물명 (제목) *</label>
                    <input 
                      type="text" 
                      required
                      value={newFarm.title}
                      onChange={(e) => setNewFarm({...newFarm, title: e.target.value})}
                      placeholder="예: 경기 여주시 가남읍 스마트팜 부지"
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">매매가 *</label>
                      <input 
                        type="text" 
                        required
                        value={newFarm.price}
                        onChange={(e) => setNewFarm({...newFarm, price: e.target.value})}
                        placeholder="예: 4억 2,000만"
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">면적 *</label>
                      <input 
                        type="text" 
                        required
                        value={newFarm.area}
                        onChange={(e) => setNewFarm({...newFarm, area: e.target.value})}
                        placeholder="예: 2,100㎡"
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">상세 설명</label>
                    <textarea 
                      value={newFarm.desc}
                      onChange={(e) => setNewFarm({...newFarm, desc: e.target.value})}
                      placeholder="농지의 특징, 접근성, 기반시설 등을 자세히 적어주세요."
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none h-24 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">이미지 첨부 (선택)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                    {newFarm.img && (
                      <div className="mt-4 w-full h-48 bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                        <img src={newFarm.img} alt="미리보기" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <p className="text-xs text-stone-500 mt-2">이미지를 첨부하지 않으면 기본 이미지가 사용됩니다.</p>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 font-medium transition-colors"
                    >
                      취소
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors"
                    >
                      등록하기
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
