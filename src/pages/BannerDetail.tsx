import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BannerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banners, setBanners] = useState<any[]>([]);
  const bannerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const savedBanners = localStorage.getItem('siteBanners');
    if (savedBanners) {
      const parsed = JSON.parse(savedBanners);
      // Show all active banners
      const activeBanners = parsed.filter((b: any) => b.status);
      setBanners(activeBanners);
    }
  }, []);

  useEffect(() => {
    if (id && banners.length > 0) {
      const targetId = Number(id);
      const element = bannerRefs.current[targetId];
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [id, banners]);

  if (banners.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-stone-50 px-4">
        <p className="text-stone-500 mb-4">등록된 배너/팝업이 없습니다.</p>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          이전으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-stone-500 hover:text-stone-800 mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> 목록으로 돌아가기
        </button>
        
        <div className="space-y-12">
          {banners.map(banner => (
            <div 
              key={banner.id} 
              ref={el => { bannerRefs.current[banner.id] = el; }}
              className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden transition-all hover:shadow-md"
            >
              {banner.img && (
                <img 
                  src={banner.img} 
                  alt={banner.title} 
                  className="w-full h-64 sm:h-96 object-cover" 
                  referrerPolicy="no-referrer" 
                />
              )}
              <div className="p-8 sm:p-12">
                <div className="flex items-center mb-6">
                  <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${banner.type === '팝업' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {banner.type}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-6 leading-tight tracking-tight">
                  {banner.title}
                </h2>
                <div className="prose prose-stone prose-lg max-w-none">
                  <p className="text-stone-600 whitespace-pre-wrap leading-relaxed">
                    {banner.content || banner.desc || '상세 내용이 없습니다.'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
