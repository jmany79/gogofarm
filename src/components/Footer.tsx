import { useState, useEffect } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [isPcMode, setIsPcMode] = useState(false);
  const [footerData, setFooterData] = useState<any[]>([]);

  useEffect(() => {
    const savedFooter = localStorage.getItem('footerLinks');
    if (savedFooter) {
      try {
        setFooterData(JSON.parse(savedFooter));
      } catch (e) {
        console.error('Failed to parse footer links', e);
      }
    } else {
      setFooterData([
        {
          id: 1,
          title: "회사소개",
          links: [
            { id: 101, name: "GoGoFarm 소개", slug: "about", content: "고고팜은 대한민국 No.1 귀농 플랫폼입니다.\n\n귀농을 준비하거나 관심 있는 사람들이 정보 탐색부터 정착까지 한 곳에서 해결할 수 있도록 지원하는 통합 귀농 플랫폼입니다." },
            { id: 102, name: "인재채용", slug: "recruit", content: "고고팜과 함께할 인재를 모십니다.\n\n현재 채용 중인 포지션이 없습니다." },
            { id: 103, name: "오시는 길", slug: "location", content: "고고팜 본사 오시는 길 안내입니다.\n\n주소: 서울특별시 강남구 테헤란로 123, 고고팜 빌딩 10층\n전화번호: 1588-0000" }
          ]
        },
        {
          id: 2,
          title: "고객지원",
          links: [
            { id: 201, name: "이용약관", slug: "terms", content: "제1조 (목적)\n이 약관은 고고팜이 제공하는 서비스의 이용조건 및 절차, 이용자와 고고팜의 권리, 의무, 책임사항을 규정함을 목적으로 합니다.\n\n제2조 (정의)\n1. \"서비스\"란 구현되는 단말기와 상관없이 회원이 이용할 수 있는 고고팜 관련 제반 서비스를 의미합니다." },
            { id: 202, name: "개인정보처리방침", slug: "privacy", content: "고고팜은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다." },
            { id: 203, name: "문의하기", slug: "contact", content: "고객센터: 1588-0000\n운영시간: 평일 09:00 - 18:00\n이메일: support@gogofarm.co.kr" }
          ]
        }
      ]);
    }
    let viewport = document.querySelector('meta[name="viewport"]');
    
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }

    if (isPcMode) {
      viewport.setAttribute('content', 'width=1280');
    } else {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }

    return () => {
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    };
  }, [isPcMode]);

  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">GoGoFarm</h3>
            <p className="text-sm leading-relaxed">귀농을 준비하거나 관심 있는 사람들이 정보 탐색부터 정착까지 한 곳에서 해결할 수 있도록 지원하는 통합 귀농 플랫폼입니다.</p>
          </div>
          
          {footerData.map(category => (
            <div key={category.id}>
              <h4 className="text-white font-medium mb-4">{category.title}</h4>
              <ul className="space-y-2 text-sm">
                {category.links.map((link: any) => (
                  <li key={link.id}>
                    <Link to={`/page/${link.slug}`} className="hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white font-medium mb-4">문의</h4>
            <p className="text-sm">1588-0000</p>
            <p className="text-sm mt-2">평일 09:00 - 18:00</p>
            <p className="text-sm">support@gogofarm.co.kr</p>
          </div>
        </div>
        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} GoGoFarm. All rights reserved.
          </div>
          <button
            onClick={() => setIsPcMode(!isPcMode)}
            className={`items-center gap-2 px-5 py-2.5 bg-stone-800 hover:bg-stone-700 rounded-full text-stone-300 transition-colors text-sm font-medium ${isPcMode ? 'flex' : 'flex lg:hidden'}`}
          >
            {isPcMode ? (
              <>
                <Smartphone className="w-4 h-4" />
                모바일 버전으로 보기
              </>
            ) : (
              <>
                <Monitor className="w-4 h-4" />
                PC 버전으로 보기
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
