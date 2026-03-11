import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Wheat, Sprout, Bug, Shell, Tractor, CheckCircle, Info, MessageCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Consulting() {
  const [searchParams] = useSearchParams();
  const initialRegion = searchParams.get('region') || '';

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: '',
    content: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (initialRegion) {
      setSelectedRegion(initialRegion);
    }
  }, [initialRegion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and Alimtalk sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage
    const newRequest = {
      id: Date.now(),
      user: formData.name,
      phone: formData.phone,
      region: selectedRegion,
      type: formData.type,
      content: formData.content,
      date: new Date().toISOString().split('T')[0],
      status: '답변대기'
    };

    const existingRequests = JSON.parse(localStorage.getItem('consultingRequests') || '[]');
    localStorage.setItem('consultingRequests', JSON.stringify([newRequest, ...existingRequests]));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-stone-900 mb-4">귀농 컨설팅 서비스</h1>
          <p className="text-xl text-stone-500">전문가와 함께 성공적인 귀농을 준비하세요</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Consulting Categories */}
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                icon: Wheat,
                title: '전통 농업 컨설팅',
                desc: '과수, 채소, 특용작물 등 전통적인 농업 방식에 대한 전반적인 컨설팅',
                items: ['작물 선택', '농지 선택', '농장 설계', '재배 기술', '유통 및 판매']
              },
              {
                icon: Sprout,
                title: '스마트팜 컨설팅',
                desc: 'ICT 기술을 접목한 첨단 스마트 농업 창업을 위한 전문 컨설팅',
                items: ['스마트팜 창업', '시설 설계', '자동화 시스템', '투자비 분석', '수익성 분석']
              },
              {
                icon: Bug,
                title: '곤충 사육 컨설팅',
                desc: '미래 식량 및 사료용으로 각광받는 곤충 산업 창업 지원',
                items: ['식용 곤충', '사료용 곤충', '곤충 농장 설계', '사육 기술', '유통 채널']
              },
              {
                icon: Shell,
                title: '파충류 사육 컨설팅',
                desc: '애완용 및 특수 목적의 파충류 사육 사업 컨설팅',
                items: ['파충류 농장 창업', '번식 시스템', '사육 환경 구축', '시장 분석', '판매 채널']
              },
              {
                icon: Tractor,
                title: '축산 컨설팅',
                desc: '한우, 양계, 양봉 등 축산업 전반에 걸친 전문 컨설팅',
                items: ['한우', '양계', '염소', '양봉', '버섯']
              }
            ].map((cat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 flex flex-col md:flex-row gap-6 items-start hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                  <cat.icon className="w-8 h-8" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">{cat.title}</h3>
                  <p className="text-stone-500 mb-4">{cat.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cat.items.map((item, j) => (
                      <span key={j} className="px-3 py-1 bg-stone-100 text-stone-600 text-sm rounded-full font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      const type = cat.title.replace(' 컨설팅', '');
                      setFormData(prev => ({ ...prev, type }));
                    }}
                    className="bg-stone-900 hover:bg-emerald-600 hover:scale-105 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md"
                  >
                    상담 신청
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-stone-200 sticky top-24"
            >
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">신청이 완료되었습니다!</h2>
                  <p className="text-stone-500 mb-6">전문 컨설턴트가 내용을 확인한 후<br/>빠른 시일 내에 연락드리겠습니다.</p>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-start text-left">
                    <MessageCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-yellow-800">카카오톡 알림톡 발송 완료</p>
                      <p className="text-xs text-yellow-700 mt-1">고객님과 담당 운영자에게 접수 확인 알림톡이 성공적으로 발송되었습니다.</p>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-5 mb-8 text-left border border-stone-100">
                    <h3 className="font-bold text-stone-900 mb-2 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-emerald-600" />
                      상담 진행 상황 확인 방법
                    </h3>
                    <ul className="text-sm text-stone-600 space-y-2 ml-7 list-disc">
                      <li>입력하신 <strong>이메일과 카카오톡 알림톡</strong>으로 접수 확인 및 진행 상황을 실시간으로 안내해 드립니다.</li>
                      <li>홈페이지 우측 상단의 <strong>'마이페이지 &gt; 상담 내역'</strong> 메뉴에서도 언제든지 신청 상태(접수 대기, 상담 중, 완료)를 조회하실 수 있습니다.</li>
                    </ul>
                  </div>

                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-emerald-600 font-bold hover:underline"
                  >
                    새로운 상담 신청하기
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-stone-900 mb-6">컨설팅 신청</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">이름</label>
                      <input 
                        required 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow" 
                        placeholder="홍길동" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">연락처</label>
                      <input 
                        required 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow" 
                        placeholder="010-0000-0000" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">희망 지역</label>
                      <select 
                        required 
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                      >
                        <option value="">선택하세요</option>
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
                      <label className="block text-sm font-medium text-stone-700 mb-1">희망 농업 분야</label>
                      <select 
                        id="consulting-type" 
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required 
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                      >
                        <option value="">선택하세요</option>
                        <option value="전통 농업">전통 농업</option>
                        <option value="스마트팜">스마트팜</option>
                        <option value="곤충 사육">곤충 사육</option>
                        <option value="파충류 사육">파충류 사육</option>
                        <option value="축산">축산</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">문의 내용</label>
                      <textarea 
                        required 
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={4} 
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none transition-shadow" 
                        placeholder="궁금한 사항을 남겨주세요."
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 hover:scale-105 text-white font-bold py-3 rounded-lg transition-all duration-300 mt-4 shadow-md flex items-center justify-center disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="animate-spin mr-2 h-5 w-5" /> 알림톡 발송 및 신청 중...</>
                      ) : (
                        '상담 신청하기'
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
