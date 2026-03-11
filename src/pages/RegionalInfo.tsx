import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sun, Sprout, Landmark } from 'lucide-react';
import { motion } from 'motion/react';

export default function RegionalInfo() {
  const [selectedRegion, setSelectedRegion] = useState('경북');

  const regions = ['경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

  const defaultRegionData: Record<string, any> = {
    '경기': {
      crops: ['쌀', '배', '포도', '인삼', '채소류'],
      climate: '연평균 기온 11~13도, 강수량 1,200~1,400mm. 수도권과 인접하여 근교 농업 및 스마트팜이 발달했습니다.',
      priceJeon: '평균 35만원 / ㎡',
      priceDap: '평균 28만원 / ㎡',
      priceJeonPercent: '75%',
      priceDapPercent: '65%',
      successImages: [
        'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400&q=80'
      ]
    },
    '강원': {
      crops: ['고랭지 배추', '감자', '옥수수', '한우', '산나물'],
      climate: '연평균 기온 10~12도, 강수량 1,300~1,500mm. 일교차가 크고 서늘하여 고랭지 농업과 축산업에 적합합니다.',
      priceJeon: '평균 12만원 / ㎡',
      priceDap: '평균 10만원 / ㎡',
      priceJeonPercent: '35%',
      priceDapPercent: '30%',
      successImages: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80'
      ]
    },
    '충북': {
      crops: ['사과', '복숭아', '포도', '수박', '옥수수'],
      climate: '연평균 기온 11~13도, 강수량 1,100~1,300mm. 내륙성 기후로 일조량이 풍부해 과수 재배에 최적화되어 있습니다.',
      priceJeon: '평균 14만원 / ㎡',
      priceDap: '평균 11만원 / ㎡',
      priceJeonPercent: '40%',
      priceDapPercent: '32%',
      successImages: [
        'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80'
      ]
    },
    '충남': {
      crops: ['딸기', '토마토', '쌀', '인삼', '밤'],
      climate: '연평균 기온 12~14도, 강수량 1,200~1,300mm. 평야가 발달하고 기후가 온화하여 시설원예 및 벼농사가 발달했습니다.',
      priceJeon: '평균 16만원 / ㎡',
      priceDap: '평균 13만원 / ㎡',
      priceJeonPercent: '45%',
      priceDapPercent: '38%',
      successImages: [
        'https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'
      ]
    },
    '전북': {
      crops: ['쌀', '수박', '파프리카', '블루베리', '오미자'],
      climate: '연평균 기온 13~14도, 강수량 1,300~1,400mm. 넓은 평야와 풍부한 일조량으로 식량작물 및 스마트팜 농업이 활발합니다.',
      priceJeon: '평균 13만원 / ㎡',
      priceDap: '평균 11만원 / ㎡',
      priceJeonPercent: '38%',
      priceDapPercent: '32%',
      successImages: [
        'https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'
      ]
    },
    '전남': {
      crops: ['쌀', '양파', '마늘', '배', '유자'],
      climate: '연평균 기온 14~15도, 강수량 1,400~1,500mm. 온화한 해양성 기후로 난지형 작물 및 이모작 재배에 유리합니다.',
      priceJeon: '평균 11만원 / ㎡',
      priceDap: '평균 9만원 / ㎡',
      priceJeonPercent: '32%',
      priceDapPercent: '28%',
      successImages: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80'
      ]
    },
    '경북': {
      crops: ['사과', '포도', '복숭아', '마늘', '고추'],
      climate: '연평균 기온 13~15도, 강수량 1,000~1,200mm. 일조량이 매우 풍부하고 일교차가 커서 전국 최대의 과수 주산지입니다.',
      priceJeon: '평균 15만원 / ㎡',
      priceDap: '평균 12만원 / ㎡',
      priceJeonPercent: '45%',
      priceDapPercent: '35%',
      successImages: [
        'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80'
      ]
    },
    '경남': {
      crops: ['딸기', '파프리카', '단감', '마늘', '양파'],
      climate: '연평균 기온 14~15도, 강수량 1,400~1,600mm. 겨울철이 따뜻하여 시설원예(스마트팜) 및 과채류 재배가 발달했습니다.',
      priceJeon: '평균 17만원 / ㎡',
      priceDap: '평균 14만원 / ㎡',
      priceJeonPercent: '48%',
      priceDapPercent: '40%',
      successImages: [
        'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400&q=80'
      ]
    },
    '제주': {
      crops: ['감귤', '만감류', '당근', '무', '브로콜리'],
      climate: '연평균 기온 16~17도, 강수량 1,500~1,800mm. 아열대성 기후와 화산회토로 감귤류 및 월동 채소 재배의 최적지입니다.',
      priceJeon: '평균 45만원 / ㎡',
      priceDap: '평균 35만원 / ㎡',
      priceJeonPercent: '85%',
      priceDapPercent: '70%',
      successImages: [
        'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'
      ]
    }
  };

  const [regionData, setRegionData] = useState(() => {
    const saved = localStorage.getItem('regionData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultRegionData;
      }
    }
    return defaultRegionData;
  });

  const currentData = regionData[selectedRegion];

  return (
    <div className="min-h-screen bg-stone-50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-stone-900 mb-4">지역 귀농 정보</h1>
          <p className="text-xl text-stone-500">전국 각 지역의 귀농 환경과 지원 정책을 확인하세요</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Region Selector */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden sticky top-24"
            >
              <div className="p-4 bg-stone-900 text-white font-bold text-lg">
                지역 선택
              </div>
              <div className="flex flex-col">
                {regions.map(region => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-6 py-4 text-left font-medium transition-colors border-b border-stone-100 last:border-0 ${
                      selectedRegion === region 
                        ? 'bg-emerald-50 text-emerald-700 border-l-4 border-l-emerald-600' 
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Region Content */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div 
              key={selectedRegion} // Re-animate when region changes
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center">
                <MapPin className="mr-3 h-8 w-8 text-emerald-600" />
                {selectedRegion} 귀농 정보
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 hover:border-emerald-200 transition-colors">
                  <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center">
                    <Sprout className="mr-2 h-5 w-5 text-emerald-600" />
                    주요 작물
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentData.crops.map((item: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white border border-stone-200 text-stone-700 rounded-full text-sm font-medium shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 hover:border-emerald-200 transition-colors">
                  <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center">
                    <Sun className="mr-2 h-5 w-5 text-emerald-600" />
                    기후 및 환경
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {currentData.climate}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center">
                  <Landmark className="mr-2 h-6 w-6 text-emerald-600" />
                  귀농 지원 정책
                </h3>
                <ul className="space-y-3">
                  {[
                    '귀농 농업창업 및 주택구입 지원사업 (최대 3억원)',
                    '청년창업농 영농정착 지원금 (월 최대 110만원)',
                    '귀농인 정착장려금 지원 (세대당 500만원)',
                    '농기계 임대사업소 운영 및 임대료 감면'
                  ].map((policy, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      <span className="text-stone-700">{policy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-4">농지 가격 동향</h3>
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-stone-600 font-medium">전 (밭)</span>
                    <span className="text-stone-900 font-bold">{currentData.priceJeon}</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2 mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: currentData.priceJeonPercent }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-emerald-500 h-2 rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-stone-600 font-medium">답 (논)</span>
                    <span className="text-stone-900 font-bold">{currentData.priceDap}</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: currentData.priceDapPercent }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="bg-emerald-400 h-2 rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Success Stories */}
            <motion.div 
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200"
            >
              <h3 className="text-2xl font-bold text-stone-900 mb-6">{selectedRegion} 귀농 성공 사례</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[0, 1].map((index) => {
                  const story = currentData.successStories ? currentData.successStories[index] : null;
                  const defaultImg = currentData.successImages[index];
                  const title = story?.title || `"도시의 삶을 뒤로하고 찾은 ${selectedRegion}에서의 두 번째 인생"`;
                  const desc = story?.desc || `${currentData.crops[0]} 농장 운영 3년차 김귀농 님`;
                  const img = story?.img || defaultImg;

                  return (
                    <motion.div 
                      key={index} 
                      className="group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
                    >
                      <div className="overflow-hidden rounded-xl mb-4 shadow-md">
                        <img src={img} alt="사례" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="font-bold text-lg text-stone-900 group-hover:text-emerald-600 transition-colors mb-2">
                        {title}
                      </h4>
                      <p className="text-stone-500 text-sm">{desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-8 text-center text-white shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4">{selectedRegion} 귀농, 전문가와 상담하세요</h3>
              <p className="mb-6 text-emerald-100">지역 특성에 맞는 작물 선택부터 정착까지 상세히 안내해 드립니다.</p>
              <Link 
                to={`/consulting?region=${selectedRegion}`}
                className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-xl font-bold hover:bg-stone-50 hover:scale-105 transition-all duration-300 shadow-md"
              >
                {selectedRegion} 귀농 상담 신청
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
