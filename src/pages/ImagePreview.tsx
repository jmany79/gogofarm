import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion } from 'framer-motion';

export default function ImagePreview() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function generateImage() {
      try {
        console.log("Checking API Key...", process.env.GEMINI_API_KEY ? "Exists" : "Missing");
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A happy Korean family smiling together in a sunny, lush green farm, wearing comfortable farming clothes, successful rural life, high quality, cinematic lighting, photorealistic, beautiful nature background.',
              },
            ],
          },
        });

        const parts = response.candidates?.[0]?.content?.parts || [];
        console.log("Response parts:", parts);
        
        for (const part of parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            setImageUrl(`data:${mimeType};base64,${base64Data}`);
            setLoading(false);
            return;
          }
        }
        throw new Error(`이미지 데이터를 찾을 수 없습니다. 응답: ${JSON.stringify(parts)}`);
      } catch (err: any) {
        console.error("이미지 생성 오류:", err);
        const errorMessage = err.message || JSON.stringify(err) || "알 수 없는 오류가 발생했습니다.";
        setError(`오류 상세: ${errorMessage}\n\nAPI 키 상태: ${process.env.GEMINI_API_KEY ? '존재함' : '없음'}`);
        setLoading(false);
      }
    }
    
    generateImage();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 sm:p-8 pt-24">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10 text-center">
        <h1 className="text-3xl font-bold text-stone-800 mb-4">귀농 성공 가족 이미지 미리보기</h1>
        <p className="text-stone-600 mb-8 text-lg">메인 페이지에 적용하기 전, AI가 생성한 이미지를 미리 확인해 보세요.</p>
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mb-6"></div>
            <p className="text-stone-500 text-lg">AI가 고화질 이미지를 생성하고 있습니다...<br/>(약 10~20초 정도 소요될 수 있습니다)</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-600 p-6 rounded-xl text-left border border-red-100">
            <h3 className="font-bold text-lg mb-2">이미지 생성 실패</h3>
            <p className="whitespace-pre-wrap">{error}</p>
            <button 
              onClick={() => {
                setLoading(true);
                setError(null);
                // Re-trigger useEffect by not doing anything here, just need to extract generateImage
                window.location.reload();
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              다시 시도하기
            </button>
          </div>
        )}
        
        {imageUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img src={imageUrl} alt="귀농 가족" className="w-full h-auto object-cover aspect-video" />
            </div>
            
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <p className="text-emerald-800 font-medium text-lg">
                이 이미지가 마음에 드신다면 <span className="font-bold">"이 이미지로 메인 페이지에 적용해줘"</span>라고 말씀해 주세요!
              </p>
              <p className="text-emerald-600 mt-2">
                마음에 들지 않으신다면 "조금 더 밝은 분위기로 다시 만들어줘" 등 원하시는 느낌을 말씀해 주시면 다시 생성해 드립니다.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
