import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

export default function AIConsulting() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q');

  const [messages, setMessages] = useState([
    { type: 'ai', text: '안녕하세요! 귀농에 대해 궁금한 점이 있으신가요? 지역, 작물, 자금 등 무엇이든 물어보세요.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const chatRef = useRef<any>(null);
  const hasInitializedQuery = useRef(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoadingChat]);

  const handleSendQuery = async (queryText: string, displayText?: string) => {
    if (!queryText.trim() || isLoadingChat) return;

    const textToShow = displayText || queryText;
    setMessages(prev => [...prev, { type: 'user', text: textToShow }]);
    setIsLoadingChat(true);
    
    try {
      if (!chatRef.current) {
        throw new Error('Chat not initialized');
      }
      const response = await chatRef.current.sendMessage({ message: queryText });
      setMessages(prev => [...prev, { type: 'ai', text: response.text }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { type: 'ai', text: '죄송합니다. 응답을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  useEffect(() => {
    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        chatRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: '당신은 한국의 귀농/귀촌 전문 AI 컨설턴트입니다. 귀농 정책, 자금, 작물 선택, 지역 정보 등에 대해 친절하고 전문적으로 답변해주세요. 마크다운 포맷을 적절히 사용하여 가독성 좋게 답변해주세요.',
          }
        });

        if (initialQuery && !hasInitializedQuery.current) {
          hasInitializedQuery.current = true;
          await handleSendQuery(initialQuery);
        }
      } catch (error) {
        console.error('Failed to initialize Gemini API', error);
      }
    };
    initChat();
  }, [initialQuery]);
  
  // 폼 상태 관리 추가
  const [age, setAge] = useState('30대');
  const [capital, setCapital] = useState('5천만원 ~ 1억원');
  const [region, setRegion] = useState('충청권');
  const [interest, setInterest] = useState('스마트팜');

  const [recResult, setRecResult] = useState<string | null>(null);
  const [isRecommending, setIsRecommending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoadingChat) return;
    const userMessage = input;
    setInput('');
    await handleSendQuery(userMessage);
  };

  const handleRecommend = async () => {
    setIsRecommending(true);
    
    const displayPrompt = `나이: ${age}\n자본금: ${capital}\n희망 지역: ${region}\n관심 분야: ${interest}\n\n위 조건으로 맞춤형 귀농 추천을 부탁드립니다. 고객이 궁금해 할 다음 정보를 전체적으로 포함해서 구체적이고 전문적으로 작성해주세요:\n1. 추천 귀농 시기 및 준비 로드맵\n2. 해당 조건에서 받을 수 있는 귀농 혜택 및 지원금\n3. 최근 추천 작물 트렌드\n4. 100평 기준 예상 년 수익 (대략적인 추정치)\n5. 성공적인 정착을 위한 조언\n6. 컨설팅 전문가 상담의 필요성`;
    
    const apiPrompt = `${displayPrompt} (귀농 실패 확률을 획기적으로 낮추고, 숨은 지원금 혜택을 100% 찾아주며, 시행착오와 초기 비용을 절감할 수 있다는 점을 강조하여 고객이 당장이라도 맞춤형 컨설팅을 받고 싶게끔 매우 매력적이고 설득력 있는 문구로 작성해주세요. 마지막에는 상단의 '컨설팅' 메뉴를 통해 무료 상담을 받아보라고 적극적으로 유도해주세요.)`;
    
    await handleSendQuery(apiPrompt, displayPrompt);
    setIsRecommending(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-stone-900 mb-4 flex items-center justify-center">
            <Sparkles className="mr-3 h-8 w-8 text-emerald-500" />
            AI 귀농 상담
          </h1>
          <p className="text-xl text-stone-500">24시간 언제든 귀농에 대한 모든 것을 물어보세요</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Chat */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-stone-200 flex flex-col h-[600px] overflow-hidden"
            >
              <div ref={chatContainerRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-stone-50/50">
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.type === 'user' ? 'bg-stone-200 ml-4' : 'bg-emerald-100 mr-4'}`}>
                        {msg.type === 'user' ? <User className="h-6 w-6 text-stone-600" /> : <Bot className="h-6 w-6 text-emerald-600" />}
                      </div>
                      <div className={`p-4 rounded-2xl shadow-sm ${msg.type === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white border border-stone-100 text-stone-800 rounded-tl-none'} prose prose-sm max-w-none prose-emerald`}>
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoadingChat && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex max-w-[80%] flex-row">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-emerald-100 mr-4">
                        <Bot className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div className="p-4 rounded-2xl shadow-sm bg-white border border-stone-100 text-stone-800 rounded-tl-none flex items-center">
                        <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                        <span className="ml-2 text-sm text-stone-500">답변을 생성하고 있습니다...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="p-4 border-t border-stone-100 bg-white">
                <form onSubmit={handleSend} className="flex gap-2">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="궁금한 귀농 정보를 질문하세요 (예: 스마트팜 창업 비용은 얼마인가요?)" 
                    className="flex-grow px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
                  />
                  <button 
                    type="submit" 
                    disabled={isLoadingChat}
                    className="bg-emerald-600 hover:bg-emerald-500 hover:scale-105 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center shadow-md disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* AI Recommendation Form */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-stone-200"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center">
                <Sparkles className="mr-2 h-6 w-6 text-emerald-500" />
                맞춤형 귀농 추천
              </h2>
              <p className="text-sm text-stone-500 mb-6">조건을 변경하시면 AI가 실시간으로 새로운 귀농 계획을 분석해 드립니다.</p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">연령대</label>
                  <select value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow">
                    <option>20대</option>
                    <option>30대</option>
                    <option>40대</option>
                    <option>50대</option>
                    <option>60대 이상</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">가용 자본</label>
                  <select value={capital} onChange={(e) => setCapital(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow">
                    <option>5천만원 미만</option>
                    <option>5천만원 ~ 1억원</option>
                    <option>1억원 ~ 3억원</option>
                    <option>3억원 ~ 5억원</option>
                    <option>5억원 이상</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">희망 지역</label>
                  <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow">
                    <option>상관없음</option>
                    <option>경기/강원</option>
                    <option>충청권</option>
                    <option>전라권</option>
                    <option>경상권</option>
                    <option>제주</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">관심 분야</label>
                  <select value={interest} onChange={(e) => setInterest(e.target.value)} className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow">
                    <option>전통 농업 (과수/채소)</option>
                    <option>스마트팜</option>
                    <option>곤충 사육</option>
                    <option>파충류 사육</option>
                    <option>축산</option>
                  </select>
                </div>
                
                <button 
                  type="button" 
                  onClick={handleRecommend}
                  disabled={isRecommending || isLoadingChat}
                  className="w-full bg-stone-900 hover:bg-stone-800 hover:scale-105 text-white font-bold py-3 rounded-lg transition-all duration-300 mt-4 shadow-md flex items-center justify-center disabled:opacity-70"
                >
                  {isRecommending ? (
                    <><Loader2 className="animate-spin mr-2 h-5 w-5" /> 분석 중...</>
                  ) : (
                    'AI 추천 받기'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
