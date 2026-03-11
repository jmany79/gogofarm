import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PageViewer() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    const savedFooter = localStorage.getItem('footerLinks');
    if (savedFooter) {
      try {
        const parsed = JSON.parse(savedFooter);
        let found = null;
        for (const category of parsed) {
          const link = category.links.find((l: any) => l.slug === slug);
          if (link) {
            found = link;
            break;
          }
        }
        if (found) {
          setPageData(found);
        }
      } catch (e) {
        console.error('Failed to parse footer links', e);
      }
    } else {
      // Default fallback if not found in localStorage
      const defaultData: Record<string, { title: string; content: string }> = {
        'about': { title: 'GoGoFarm 소개', content: '고고팜은 대한민국 No.1 귀농 플랫폼입니다.\n\n귀농을 준비하거나 관심 있는 사람들이 정보 탐색부터 정착까지 한 곳에서 해결할 수 있도록 지원하는 통합 귀농 플랫폼입니다.' },
        'recruit': { title: '인재채용', content: '고고팜과 함께할 인재를 모십니다.\n\n현재 채용 중인 포지션이 없습니다.' },
        'location': { title: '오시는 길', content: '고고팜 본사 오시는 길 안내입니다.\n\n주소: 서울특별시 강남구 테헤란로 123, 고고팜 빌딩 10층\n전화번호: 1588-0000' },
        'terms': { title: '이용약관', content: '제1조 (목적)\n이 약관은 고고팜이 제공하는 서비스의 이용조건 및 절차, 이용자와 고고팜의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.\n\n제2조 (정의)\n1. "서비스"란 구현되는 단말기와 상관없이 회원이 이용할 수 있는 고고팜 관련 제반 서비스를 의미합니다.' },
        'privacy': { title: '개인정보처리방침', content: '고고팜은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.' },
        'contact': { title: '문의하기', content: '고객센터: 1588-0000\n운영시간: 평일 09:00 - 18:00\n이메일: support@gogofarm.co.kr' }
      };
      if (slug && defaultData[slug]) {
        setPageData(defaultData[slug]);
      }
    }
  }, [slug]);

  if (!pageData) {
    return (
      <div className="min-h-screen bg-stone-50 pt-24 pb-12 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">페이지를 찾을 수 없습니다.</h2>
        <button onClick={() => navigate(-1)} className="text-emerald-600 hover:underline">
          이전 페이지로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-stone-500 hover:text-stone-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          뒤로 가기
        </button>
        
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-stone-900 mb-8 pb-6 border-b border-stone-100">
            {pageData.title}
          </h1>
          <div className="prose prose-stone max-w-none">
            <p className="text-stone-700 whitespace-pre-wrap leading-relaxed">
              {pageData.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
