import { useState } from 'react';
import { Search, BookOpen, Landmark, GraduationCap, Map, TrendingUp, ArrowRight, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function Information() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // 구체적인 데이터 구조로 변경
  const policies = [
    { title: '귀농 농업창업 및 주택구입 지원', desc: '귀농 초기 안정적인 정착을 위해 농업창업(최대 3억원) 및 주택구입(최대 7,500만원) 융자 지원', target: '만 65세 이하 귀농인', tag: '창업/주택', link: 'https://www.greendaero.go.kr/' },
    { title: '청년후계농 영농정착 지원사업', desc: '만 40세 미만 청년 창업농에게 최장 3년간 월 최대 110만원의 영농정착지원금 지급', target: '만 18세~40세 미만', tag: '청년/생활비', link: 'https://www.agrix.go.kr/' },
    { title: '스마트팜 종합자금 지원', desc: '스마트팜 신축 및 개보수를 위한 시설 자금 지원 (연 1% 고정금리, 최대 30억원)', target: '스마트팜 창업 희망자', tag: '스마트팜/시설', link: 'https://smartfarmkorea.net/' },
    { title: '귀농인 농지임대차 지원', desc: '한국농어촌공사를 통해 귀농인에게 적합한 농지를 장기 임대 및 임대료 일부 지원', target: '초기 귀농인', tag: '농지/임대', link: 'https://www.alimi.or.kr/' }
  ];

  const funds = [
    { title: '농업종합자금 (운전자금)', desc: '농업 경영에 소요되는 1년 이내의 단기 운영 자금 대출 지원 (연 2.5% 수준)', limit: '개인당 최대 5천만원', tag: '운영비', link: 'https://www.nhbank.com/' },
    { title: '귀농인 보증지원 (농림수산업자신용보증기금)', desc: '담보력이 부족한 귀농인을 위해 농신보에서 신용보증서 발급 지원', limit: '최대 3억원 (보증비율 90%)', tag: '신용보증', link: 'https://www.nongshinbo.com/' },
    { title: '지자체별 귀농 정착지원금', desc: '각 지자체 조례에 따라 전입 귀농인에게 1회성 정착 장려금 지급 (지자체별 상이)', limit: '100만원 ~ 500만원', tag: '지자체/보조금', link: 'https://www.returnfarm.com/' }
  ];

  const educations = [
    { title: '귀농귀촌 종합교육 (기본과정)', desc: '귀농 정책, 농업 기초, 작물 재배 기초 등 100시간 필수 이수 과정', type: '온/오프라인 병행', tag: '필수/기초', link: 'https://www.greendaero.go.kr/' },
    { title: '청년농업인 스마트팜 보육센터', desc: '20개월간 스마트팜 기초이론부터 경영실습까지 전 과정 밀착 교육', type: '합숙/실습 위주', tag: '스마트팜/심화', link: 'https://smartfarmkorea.net/' },
    { title: '현장실습교육 (WPL)', desc: '선도농가(멘토) 농장에서 직접 숙식하며 작물 재배 기술 및 노하우 전수', type: '현장 실습', tag: '멘토링', link: 'https://www.agriedu.net/' },
    { title: '미래농업 곤충사육 마스터 과정', desc: '식용/사료용 곤충 사육 기술 및 가공, 유통 마케팅 전문 교육', type: '오프라인 특강', tag: '특화작물', link: 'https://www.agriedu.net/' }
  ];

  const procedures = [
    { title: '1단계: 귀농 결심 및 정보 수집', desc: '가족과의 합의, 귀농 목적 설정, 관련 기관 및 지자체 상담을 통한 기초 정보 수집', type: '준비기', tag: '정보수집', link: 'https://www.greendaero.go.kr/' },
    { title: '2단계: 영농 기술 습득', desc: '귀농귀촌종합센터, 농업기술원 등의 교육 프로그램 이수 및 선도농가 현장 실습', type: '교육기', tag: '기술습득', link: 'https://www.agriedu.net/' },
    { title: '3단계: 정착지 및 농지 탐색', desc: '재배 희망 작물에 적합한 기후, 토양 조건 및 생활 인프라를 고려한 지역 선정', type: '탐색기', tag: '지역선정', link: 'https://www.alimi.or.kr/' },
    { title: '4단계: 영농 계획 수립 및 정착', desc: '구체적인 사업계획서 작성, 농지 및 주택 구입, 농업경영체 등록 후 본격 영농 시작', type: '실행기', tag: '정착', link: 'https://uni.agrix.go.kr/' }
  ];

  const trends = [
    { title: '스마트 농업의 가속화', desc: 'AI, IoT, 빅데이터를 활용한 정밀 농업 및 스마트팜 보급 확대로 생산성 향상', type: '기술/혁신', tag: '스마트팜', link: 'https://smartfarmkorea.net/' },
    { title: '저탄소 친환경 농업 부상', desc: '기후 변화에 대응하기 위한 탄소 저감 농법, 유기농 및 무농약 재배에 대한 수요 증가', type: '환경/지속가능성', tag: '친환경', link: 'https://www.enviagro.go.kr/' },
    { title: '농촌 융복합산업(6차 산업) 활성화', desc: '단순 생산(1차)을 넘어 가공(2차), 체험/관광(3차)을 결합한 새로운 부가가치 창출', type: '비즈니스 모델', tag: '6차산업', link: 'https://www.6차산업.com/' },
    { title: '푸드테크와 대체 식품', desc: '식물성 대체육, 배양육, 곤충 식품 등 미래 식량 자원 개발 및 관련 스타트업 증가', type: '미래식량', tag: '푸드테크', link: 'https://www.foodtech.or.kr/' }
  ];

  const filterList = (list: any[]) => {
    if (!searchTerm) return list;
    const term = searchTerm.toLowerCase();
    return list.filter(item => 
      item.title.toLowerCase().includes(term) || 
      item.desc.toLowerCase().includes(term) || 
      item.tag.toLowerCase().includes(term)
    );
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Adjust for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-stone-900 mb-6">귀농 정보센터</h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 h-5 w-5" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="귀농 정보를 검색하세요 (예: 스마트팜, 청년, 자금)" 
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm text-lg transition-shadow hover:shadow-md"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {[
            { icon: Landmark, title: '귀농 정책', id: 'policy-section' },
            { icon: TrendingUp, title: '창업 자금', id: 'fund-section' },
            { icon: GraduationCap, title: '교육 프로그램', id: 'education-section' },
            { icon: Map, title: '귀농 절차', id: 'procedure-section' },
            { icon: BookOpen, title: '농업 트렌드', id: 'trend-section' }
          ].map((cat, i) => (
            <button 
              key={i}
              onClick={() => scrollToSection(cat.id)}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-stone-200 hover:border-emerald-500 hover:text-emerald-600 hover:-translate-y-1 hover:scale-105 transition-all duration-300 group shadow-sm hover:shadow-lg"
            >
              <cat.icon className="h-8 w-8 mb-3 text-stone-400 group-hover:text-emerald-500 transition-colors" />
              <span className="font-medium">{cat.title}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Policy Info */}
          <motion.div 
            id="policy-section"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-bold text-stone-900 flex items-center">
                <Landmark className="mr-3 h-6 w-6 text-emerald-600" />
                정책 지원 정보
              </h2>
            </div>
            <ul className="space-y-4">
              {filterList(policies).length > 0 ? filterList(policies).map((item, i) => (
                <li 
                  key={i} 
                  onClick={() => setSelectedItem(item)}
                  className="flex flex-col p-5 bg-stone-50 rounded-xl hover:bg-emerald-50 transition-colors duration-200 cursor-pointer group border border-transparent hover:border-emerald-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-stone-900 group-hover:text-emerald-800 text-lg">{item.title}</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-md whitespace-nowrap ml-2">{item.tag}</span>
                  </div>
                  <p className="text-stone-600 text-sm mb-3 leading-relaxed">{item.desc}</p>
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-stone-200/50">
                    <span className="text-xs font-medium text-stone-500">대상: {item.target}</span>
                    <span className="text-emerald-600 text-sm font-bold flex items-center">자세히 보기 <ArrowRight className="w-4 h-4 ml-1" /></span>
                  </div>
                </li>
              )) : <li className="text-stone-500 p-8 text-center bg-stone-50 rounded-xl">검색 결과가 없습니다.</li>}
            </ul>
          </motion.div>

          {/* Startup Funds */}
          <motion.div 
            id="fund-section"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-bold text-stone-900 flex items-center">
                <TrendingUp className="mr-3 h-6 w-6 text-emerald-600" />
                창업 자금
              </h2>
            </div>
            <ul className="space-y-4">
              {filterList(funds).length > 0 ? filterList(funds).map((item, i) => (
                <li 
                  key={i} 
                  onClick={() => setSelectedItem(item)}
                  className="flex flex-col p-5 bg-stone-50 rounded-xl hover:bg-emerald-50 transition-colors duration-200 cursor-pointer group border border-transparent hover:border-emerald-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-stone-900 group-hover:text-emerald-800 text-lg">{item.title}</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-md whitespace-nowrap ml-2">{item.tag}</span>
                  </div>
                  <p className="text-stone-600 text-sm mb-3 leading-relaxed">{item.desc}</p>
                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-stone-200/50">
                    <span className="text-xs font-medium text-stone-500">한도: {item.limit}</span>
                    <span className="text-emerald-600 text-sm font-bold flex items-center">자세히 보기 <ArrowRight className="w-4 h-4 ml-1" /></span>
                  </div>
                </li>
              )) : <li className="text-stone-500 p-8 text-center bg-stone-50 rounded-xl">검색 결과가 없습니다.</li>}
            </ul>
          </motion.div>

          {/* Education */}
          <motion.div 
            id="education-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 lg:col-span-2 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-bold text-stone-900 flex items-center">
                <GraduationCap className="mr-3 h-6 w-6 text-emerald-600" />
                교육 프로그램
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filterList(educations).length > 0 ? filterList(educations).map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedItem(item)}
                  className="p-6 bg-stone-50 rounded-xl border border-stone-100 hover:border-emerald-300 hover:bg-emerald-50 transition-colors duration-200 cursor-pointer flex flex-col h-full shadow-sm"
                >
                  <span className="inline-block px-2 py-1 bg-stone-200 text-stone-700 text-xs font-bold rounded-md mb-3 w-fit">{item.tag}</span>
                  <h3 className="font-bold text-stone-900 mb-2 text-lg leading-tight">{item.title}</h3>
                  <p className="text-sm text-stone-500 mb-4 flex-grow">{item.desc}</p>
                  <div className="text-xs font-bold text-emerald-600 bg-emerald-50 py-2 px-3 rounded-lg text-center">
                    {item.type}
                  </div>
                </div>
              )) : <div className="col-span-full text-stone-500 p-8 text-center bg-stone-50 rounded-xl">검색 결과가 없습니다.</div>}
            </div>
          </motion.div>

          {/* Procedures */}
          <motion.div 
            id="procedure-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 lg:col-span-2 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-bold text-stone-900 flex items-center">
                <Map className="mr-3 h-6 w-6 text-emerald-600" />
                귀농 절차
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filterList(procedures).length > 0 ? filterList(procedures).map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedItem(item)}
                  className="p-6 bg-stone-50 rounded-xl border border-stone-100 hover:border-emerald-300 hover:bg-emerald-50 transition-colors duration-200 cursor-pointer flex flex-col h-full shadow-sm"
                >
                  <span className="inline-block px-2 py-1 bg-stone-200 text-stone-700 text-xs font-bold rounded-md mb-3 w-fit">{item.tag}</span>
                  <h3 className="font-bold text-stone-900 mb-2 text-lg leading-tight">{item.title}</h3>
                  <p className="text-sm text-stone-500 mb-4 flex-grow">{item.desc}</p>
                  <div className="text-xs font-bold text-emerald-600 bg-emerald-50 py-2 px-3 rounded-lg text-center">
                    {item.type}
                  </div>
                </div>
              )) : <div className="col-span-full text-stone-500 p-8 text-center bg-stone-50 rounded-xl">검색 결과가 없습니다.</div>}
            </div>
          </motion.div>

          {/* Trends */}
          <motion.div 
            id="trend-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 lg:col-span-2 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-bold text-stone-900 flex items-center">
                <BookOpen className="mr-3 h-6 w-6 text-emerald-600" />
                농업 트렌드
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filterList(trends).length > 0 ? filterList(trends).map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedItem(item)}
                  className="p-6 bg-stone-50 rounded-xl border border-stone-100 hover:border-emerald-300 hover:bg-emerald-50 transition-colors duration-200 cursor-pointer flex flex-col h-full shadow-sm"
                >
                  <span className="inline-block px-2 py-1 bg-stone-200 text-stone-700 text-xs font-bold rounded-md mb-3 w-fit">{item.tag}</span>
                  <h3 className="font-bold text-stone-900 mb-2 text-lg leading-tight">{item.title}</h3>
                  <p className="text-sm text-stone-500 mb-4 flex-grow">{item.desc}</p>
                  <div className="text-xs font-bold text-emerald-600 bg-emerald-50 py-2 px-3 rounded-lg text-center">
                    {item.type}
                  </div>
                </div>
              )) : <div className="col-span-full text-stone-500 p-8 text-center bg-stone-50 rounded-xl">검색 결과가 없습니다.</div>}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-lg mb-3">
                    {selectedItem.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-stone-900">{selectedItem.title}</h3>
                </div>
                <button onClick={() => setSelectedItem(null)} className="text-stone-400 hover:text-stone-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-stone-900 mb-2">사업 개요</h4>
                  <p className="text-stone-600 leading-relaxed">{selectedItem.desc}</p>
                </div>

                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 space-y-4">
                  <div className="flex items-start">
                    <span className="w-24 font-bold text-stone-700 shrink-0">지원 대상</span>
                    <span className="text-stone-600">{selectedItem.target || selectedItem.limit || selectedItem.type}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-24 font-bold text-stone-700 shrink-0">신청 기간</span>
                    <span className="text-stone-600">상시 접수 (지자체별 예산 소진 시까지)</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-24 font-bold text-stone-700 shrink-0">필요 서류</span>
                    <span className="text-stone-600">귀농 농업창업계획서, 주민등록등본, 가족관계증명서, 신용조사서 등</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-24 font-bold text-stone-700 shrink-0">접수처</span>
                    <span className="text-stone-600">관할 시·군 농업기술센터 또는 귀농귀촌지원센터</span>
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                  <button onClick={() => setSelectedItem(null)} className="px-6 py-3 rounded-xl font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors">
                    닫기
                  </button>
                  <a 
                    href={selectedItem.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-md flex items-center"
                  >
                    공식 홈페이지 이동
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
