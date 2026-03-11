import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, DollarSign, Activity, Settings, Package, MessageSquare, AlertTriangle, Image as ImageIcon, Save, Edit, Trash2, CheckCircle, XCircle, Globe, Layout, ListTree, CreditCard, Bell, ShieldCheck, Plus, ToggleRight, ToggleLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSettingTab, setActiveSettingTab] = useState('site');

  // Content Management State
  const defaultStories = [
    { title: '청년 농부의 스마트팜 도전기', tag: '스마트팜', img: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=600&q=80' },
    { title: '도시를 떠나 감귤농장으로', tag: '전통 농업', img: 'https://images.unsplash.com/photo-1557800636-8ab37fa8e270?auto=format&fit=crop&w=600&q=80' },
    { title: '미래 식량, 곤충 사육의 비전', tag: '곤충 사육', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80' }
  ];
  const [successStories, setSuccessStories] = useState(() => {
    const saved = localStorage.getItem('successStories');
    return saved ? JSON.parse(saved) : defaultStories;
  });

  const handleStoryChange = (index: number, field: string, value: string) => {
    const newStories = [...successStories];
    newStories[index] = { ...newStories[index], [field]: value };
    setSuccessStories(newStories);
  };

  const defaultFarms = [
    { id: 1, region: '경기', title: '경기 여주시 가남읍 스마트팜 부지', price: '4억 2,000만', area: '2,100㎡', type: '답', desc: '수도권 접근성 우수, 전기/수도 기반시설 완비, 즉시 하우스 시공 가능', img: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?auto=format&fit=crop&w=400&q=80' },
    { id: 2, region: '경기', title: '경기 양평군 용문면 전원주택 및 텃밭', price: '3억 5,000만', area: '1,500㎡', type: '대/전', desc: '소규모 귀농 및 귀촌에 적합, 남향, 맑은 계곡 인접', img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=400&q=80' },
    { id: 3, region: '경기', title: '경기 이천시 장호원읍 복숭아 과수원', price: '5억 8,000만', area: '4,200㎡', type: '과수원', desc: '수확기 복숭아 나무 300주 식재, 저온저장고 포함', img: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80' },
  ];

  const [usersList, setUsersList] = useState([
    { id: 1, name: '김농부', email: 'farmer1@example.com', role: '판매자', date: '2023-10-25', status: '활성' },
    { id: 2, name: '이소비', email: 'consumer1@example.com', role: '구매자', date: '2023-10-24', status: '활성' },
    { id: 3, name: '박청년', email: 'youth@example.com', role: '판매자', date: '2023-10-23', status: '대기' },
    { id: 4, name: '최귀농', email: 'return@example.com', role: '구매자', date: '2023-10-22', status: '정지' },
  ]);

  const [productsList, setProductsList] = useState([
    { id: 1, title: '유기농 꿀고구마 10kg', seller: '김농부', price: '25,000', status: '판매중', date: '2023-10-25' },
    { id: 2, title: '중고 관리기', seller: '박청년', price: '850,000', status: '판매완료', date: '2023-10-24' },
    { id: 3, title: '친환경 비료 50포', seller: '이장님', price: '400,000', status: '판매중', date: '2023-10-23' },
  ]);

  const [consultingList, setConsultingList] = useState(() => {
    const saved = localStorage.getItem('consultingRequests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      { id: 1, user: '박청년', type: '스마트팜 창업', date: '2023-10-26', status: '답변대기', content: '초기 자본 5천만원으로 스마트팜 창업이 가능할까요?' },
      { id: 2, user: '최귀농', type: '농지 구입', date: '2023-10-25', status: '완료', content: '충남 지역 1000평 규모 밭 매매 상담 원합니다.' },
      { id: 3, user: '이소비', type: '정부 지원금', date: '2023-10-24', status: '진행중', content: '청년 창업농 지원금 신청 조건 문의드립니다.' },
    ];
  });

  const handleUserStatusChange = (id: number, newStatus: string) => {
    setUsersList(usersList.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const handleProductStatusChange = (id: number, newStatus: string) => {
    setProductsList(productsList.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleConsultingStatusChange = (id: number, newStatus: string) => {
    const newList = consultingList.map((c: any) => c.id === id ? { ...c, status: newStatus } : c);
    setConsultingList(newList);
    localStorage.setItem('consultingRequests', JSON.stringify(newList));
  };

  const deleteUser = (id: number) => {
    if(confirm('정말 삭제하시겠습니까?')) {
      setUsersList(usersList.filter(u => u.id !== id));
    }
  };

  const deleteProduct = (id: number) => {
    if(confirm('정말 삭제하시겠습니까?')) {
      setProductsList(productsList.filter(p => p.id !== id));
    }
  };
  const [farmlandData, setFarmlandData] = useState(() => {
    const saved = localStorage.getItem('farmlandData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.slice(0, 5); // Show only first 5 for simplicity in admin
      } catch (e) {
        return defaultFarms;
      }
    }
    return defaultFarms;
  });

  const handleFarmChange = (index: number, field: string, value: string) => {
    const newData = [...farmlandData];
    newData[index] = { ...newData[index], [field]: value };
    setFarmlandData(newData);
  };

  const defaultRegionData: Record<string, any> = {
    '경기': { crops: ['쌀', '배', '포도', '인삼', '채소류'], successImages: ['https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400&q=80'] },
    '강원': { crops: ['고랭지 배추', '감자', '옥수수', '한우', '산나물'], successImages: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80'] },
    '충북': { crops: ['사과', '복숭아', '포도', '수박', '옥수수'], successImages: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80'] },
    '충남': { crops: ['딸기', '토마토', '쌀', '인삼', '밤'], successImages: ['https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'] },
    '전북': { crops: ['쌀', '수박', '파프리카', '블루베리', '오미자'], successImages: ['https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'] },
    '전남': { crops: ['쌀', '양파', '마늘', '배', '유자'], successImages: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80'] },
    '경북': { crops: ['사과', '포도', '복숭아', '마늘', '고추'], successImages: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80'] },
    '경남': { crops: ['딸기', '파프리카', '단감', '마늘', '양파'], successImages: ['https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=400&q=80'] },
    '제주': { crops: ['감귤', '만감류', '당근', '무', '브로콜리'], successImages: ['https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'] }
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

  const [selectedAdminRegion, setSelectedAdminRegion] = useState('경기');

  const defaultBanners = [
    { id: 1, title: '봄맞이 농기계 특별 할인전', desc: '최대 50% 할인 혜택을 놓치지 마세요!', content: '봄맞이 농기계 특별 할인전이 시작되었습니다.\n\n다양한 농기계를 최대 50% 할인된 가격에 만나보세요.\n기간: 2024년 3월 1일 ~ 4월 30일\n대상: 고고팜 회원 누구나', img: '', type: '메인 배너', status: true },
    { id: 2, title: '청년 창업농 정부지원금 안내', desc: '2024년 청년 창업농 지원금 신청 가이드', content: '2024년 청년 창업농 정부지원금 신청이 시작되었습니다.\n\n자격 요건 및 신청 방법을 확인하시고 지원 혜택을 받으세요.\n자세한 내용은 고객센터로 문의 바랍니다.', img: '', type: '메인 배너', status: true },
    { id: 3, title: '주말 서버 점검 안내', desc: '안정적인 서비스 제공을 위해 서버 점검을 진행합니다.', content: '안정적인 서비스 제공을 위해 아래와 같이 서버 점검을 진행합니다.\n\n일시: 2024년 3월 16일(토) 02:00 ~ 06:00 (4시간)\n내용: 시스템 안정화 및 업데이트\n\n점검 시간 동안 서비스 이용이 제한될 수 있으니 양해 부탁드립니다.', img: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=400&q=80', type: '팝업', status: false },
  ];

  const [banners, setBanners] = useState(() => {
    const saved = localStorage.getItem('siteBanners');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultBanners;
      }
    }
    return defaultBanners;
  });

  const [editingBannerId, setEditingBannerId] = useState<number | null>(null);
  const [editBannerForm, setEditBannerForm] = useState<any>(null);

  const toggleBanner = (id: number) => {
    const newBanners = banners.map((b: any) => b.id === id ? { ...b, status: !b.status } : b);
    setBanners(newBanners);
    localStorage.setItem('siteBanners', JSON.stringify(newBanners));
  };

  const handleEditBanner = (banner: any) => {
    setEditingBannerId(banner.id);
    setEditBannerForm({ ...banner });
  };

  const saveBannerEdit = () => {
    const newBanners = banners.map((b: any) => b.id === editBannerForm.id ? editBannerForm : b);
    setBanners(newBanners);
    localStorage.setItem('siteBanners', JSON.stringify(newBanners));
    setEditingBannerId(null);
  };

  const addNewBanner = () => {
    const newBanner = { id: Date.now(), title: '새 배너', desc: '', content: '', img: '', type: '팝업', status: false };
    const newBanners = [...banners, newBanner];
    setBanners(newBanners);
    localStorage.setItem('siteBanners', JSON.stringify(newBanners));
    handleEditBanner(newBanner);
  };

  const deleteBanner = (id: number) => {
    if(confirm('정말 삭제하시겠습니까?')) {
      const newBanners = banners.filter((b: any) => b.id !== id);
      setBanners(newBanners);
      localStorage.setItem('siteBanners', JSON.stringify(newBanners));
    }
  };

  // Footer Links Management
  const defaultFooterLinks = [
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
  ];

  const [footerLinks, setFooterLinks] = useState(() => {
    const saved = localStorage.getItem('footerLinks');
    return saved ? JSON.parse(saved) : defaultFooterLinks;
  });

  const saveFooterLinks = (newLinks: any) => {
    setFooterLinks(newLinks);
    localStorage.setItem('footerLinks', JSON.stringify(newLinks));
  };

  const addFooterCategory = () => {
    const newCategory = { id: Date.now(), title: '새 카테고리', links: [] };
    saveFooterLinks([...footerLinks, newCategory]);
  };

  const deleteFooterCategory = (categoryId: number) => {
    if (confirm('이 카테고리와 하위 링크를 모두 삭제하시겠습니까?')) {
      saveFooterLinks(footerLinks.filter((c: any) => c.id !== categoryId));
    }
  };

  const updateFooterCategory = (categoryId: number, newTitle: string) => {
    saveFooterLinks(footerLinks.map((c: any) => c.id === categoryId ? { ...c, title: newTitle } : c));
  };

  const addFooterLink = (categoryId: number) => {
    const newLink = { id: Date.now(), name: '새 링크', slug: `page-${Date.now()}`, content: '' };
    saveFooterLinks(footerLinks.map((c: any) => {
      if (c.id === categoryId) {
        return { ...c, links: [...c.links, newLink] };
      }
      return c;
    }));
  };

  const deleteFooterLink = (categoryId: number, linkId: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      saveFooterLinks(footerLinks.map((c: any) => {
        if (c.id === categoryId) {
          return { ...c, links: c.links.filter((l: any) => l.id !== linkId) };
        }
        return c;
      }));
    }
  };

  const updateFooterLink = (categoryId: number, linkId: number, field: string, value: string) => {
    saveFooterLinks(footerLinks.map((c: any) => {
      if (c.id === categoryId) {
        return {
          ...c,
          links: c.links.map((l: any) => l.id === linkId ? { ...l, [field]: value } : l)
        };
      }
      return c;
    }));
  };

  // Notification Settings
  const defaultNotiSettings = {
    adminPhone: '010-0000-0000',
    signup: { customer: true, admin: true },
    consulting: { customer: true, admin: true }
  };

  const [notiSettings, setNotiSettings] = useState(() => {
    const saved = localStorage.getItem('notiSettings');
    return saved ? JSON.parse(saved) : defaultNotiSettings;
  });

  const handleNotiSettingChange = (field: string, value: any) => {
    setNotiSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleNestedNotiChange = (category: string, field: string, value: boolean) => {
    setNotiSettings((prev: any) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const saveNotiSettings = () => {
    localStorage.setItem('notiSettings', JSON.stringify(notiSettings));
    alert('알림 설정이 저장되었습니다.');
  };

  const handleRegionStoryChange = (region: string, index: number, field: string, value: string) => {
    setRegionData((prev: Record<string, any>) => {
      const newData = { ...prev };
      if (!newData[region].successStories) {
        newData[region].successStories = [
          { title: `"도시의 삶을 뒤로하고 찾은 ${region}에서의 두 번째 인생"`, desc: `${newData[region].crops[0]} 농장 운영 3년차 김귀농 님`, img: newData[region].successImages[0] },
          { title: `"도시의 삶을 뒤로하고 찾은 ${region}에서의 두 번째 인생"`, desc: `${newData[region].crops[0]} 농장 운영 3년차 김귀농 님`, img: newData[region].successImages[1] }
        ];
      }
      newData[region].successStories[index] = { ...newData[region].successStories[index], [field]: value };
      return newData;
    });
  };

  const saveContent = () => {
    localStorage.setItem('successStories', JSON.stringify(successStories));
    
    // For farmland, we only edit the first few, so we merge them back
    const savedFarms = localStorage.getItem('farmlandData');
    let allFarms = [];
    if (savedFarms) {
      try {
        allFarms = JSON.parse(savedFarms);
      } catch (e) {}
    }
    
    if (allFarms.length > 0) {
      const mergedFarms = [...allFarms];
      for (let i = 0; i < farmlandData.length; i++) {
        mergedFarms[i] = farmlandData[i];
      }
      localStorage.setItem('farmlandData', JSON.stringify(mergedFarms));
    } else {
      localStorage.setItem('farmlandData', JSON.stringify(farmlandData));
    }
    
    localStorage.setItem('regionData', JSON.stringify(regionData));
    
    alert('콘텐츠가 성공적으로 저장되었습니다.');
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-800 mb-2">접근 권한이 없습니다</h2>
          <p className="text-stone-600 mb-6">관리자만 접근할 수 있는 페이지입니다.</p>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { title: '총 가입자', value: '1,234', change: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100' },
    { title: '등록된 상품', value: '856', change: '+5%', icon: Package, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { title: '이번 달 거래액', value: '₩45,230,000', change: '+18%', icon: DollarSign, color: 'text-purple-500', bg: 'bg-purple-100' },
    { title: '활성 사용자', value: '432', change: '+2%', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-100' },
  ];

  const recentUsers = [
    { id: 1, name: '김농부', email: 'farmer1@example.com', role: '판매자', date: '2023-10-25', status: '활성' },
    { id: 2, name: '이소비', email: 'consumer1@example.com', role: '구매자', date: '2023-10-24', status: '활성' },
    { id: 3, name: '박청년', email: 'youth@example.com', role: '판매자', date: '2023-10-23', status: '대기' },
    { id: 4, name: '최귀농', email: 'return@example.com', role: '구매자', date: '2023-10-22', status: '정지' },
  ];

  const recentProducts = [
    { id: 1, title: '유기농 꿀고구마 10kg', seller: '김농부', price: '25,000', status: '판매중', date: '2023-10-25' },
    { id: 2, title: '중고 관리기', seller: '박청년', price: '850,000', status: '판매완료', date: '2023-10-24' },
    { id: 3, title: '친환경 비료 50포', seller: '이장님', price: '400,000', status: '판매중', date: '2023-10-23' },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-stone-900 text-white flex flex-col">
        <div className="p-6 border-b border-stone-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            고고팜 관리자
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'dashboard' ? 'bg-emerald-500 text-white' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <Activity className="w-5 h-5 mr-3" />
            대시보드
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'users' ? 'bg-emerald-500 text-white' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            회원 관리
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'products' ? 'bg-emerald-500 text-white' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-5 h-5 mr-3" />
            상품 관리
          </button>
          <button
            onClick={() => setActiveTab('consulting')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'consulting' ? 'bg-emerald-500 text-white' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            컨설팅 관리
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'content' ? 'bg-emerald-500 text-white' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <ImageIcon className="w-5 h-5 mr-3" />
            콘텐츠 관리
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'settings' ? 'bg-emerald-500 text-white' : 'text-stone-400 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            시스템 설정
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-stone-800">
            {activeTab === 'dashboard' && '대시보드'}
            {activeTab === 'users' && '회원 관리'}
            {activeTab === 'products' && '상품 관리'}
            {activeTab === 'consulting' && '컨설팅 관리'}
            {activeTab === 'content' && '콘텐츠 관리'}
            {activeTab === 'settings' && '시스템 설정'}
          </h2>
          <p className="text-stone-500 mt-2">고고팜 플랫폼의 현황을 한눈에 확인하세요.</p>
        </div>

        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-stone-500 text-sm font-medium mb-1">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-stone-800">{stat.value}</h3>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-emerald-500 font-bold">{stat.change}</span>
                    <span className="text-stone-400 ml-2">지난달 대비</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Users */}
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-stone-800">최근 가입 회원</h3>
                  <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700">전체보기</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-stone-50 text-stone-500 text-sm">
                      <tr>
                        <th className="px-6 py-3 font-medium">이름</th>
                        <th className="px-6 py-3 font-medium">역할</th>
                        <th className="px-6 py-3 font-medium">가입일</th>
                        <th className="px-6 py-3 font-medium">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-sm">
                      {usersList.slice(0, 4).map((user) => (
                        <tr key={user.id} className="hover:bg-stone-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-stone-800">{user.name}</div>
                            <div className="text-stone-500 text-xs">{user.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.role === '판매자' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-stone-600">{user.date}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.status === '활성' ? 'bg-emerald-100 text-emerald-700' : 
                              user.status === '대기' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Products */}
              <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-stone-800">최근 등록 상품</h3>
                  <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700">전체보기</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-stone-50 text-stone-500 text-sm">
                      <tr>
                        <th className="px-6 py-3 font-medium">상품명</th>
                        <th className="px-6 py-3 font-medium">판매자</th>
                        <th className="px-6 py-3 font-medium">가격</th>
                        <th className="px-6 py-3 font-medium">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-sm">
                      {productsList.slice(0, 3).map((product) => (
                        <tr key={product.id} className="hover:bg-stone-50">
                          <td className="px-6 py-4 font-medium text-stone-800">{product.title}</td>
                          <td className="px-6 py-4 text-stone-600">{product.seller}</td>
                          <td className="px-6 py-4 font-bold text-stone-800">{product.price}원</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              product.status === '판매중' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-700'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-stone-800">전체 회원 목록</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-500 text-sm">
                  <tr>
                    <th className="px-6 py-3 font-medium">이름</th>
                    <th className="px-6 py-3 font-medium">역할</th>
                    <th className="px-6 py-3 font-medium">가입일</th>
                    <th className="px-6 py-3 font-medium">상태</th>
                    <th className="px-6 py-3 font-medium text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm">
                  {usersList.map((user) => (
                    <tr key={user.id} className="hover:bg-stone-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-stone-800">{user.name}</div>
                        <div className="text-stone-500 text-xs">{user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === '판매자' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-stone-600">{user.date}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={user.status}
                          onChange={(e) => handleUserStatusChange(user.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium outline-none cursor-pointer ${
                            user.status === '활성' ? 'bg-emerald-100 text-emerald-700' : 
                            user.status === '대기' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                          }`}
                        >
                          <option value="활성">활성</option>
                          <option value="대기">대기</option>
                          <option value="정지">정지</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => deleteUser(user.id)} className="text-red-500 hover:text-red-700 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-stone-800">전체 상품 목록</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-500 text-sm">
                  <tr>
                    <th className="px-6 py-3 font-medium">상품명</th>
                    <th className="px-6 py-3 font-medium">판매자</th>
                    <th className="px-6 py-3 font-medium">가격</th>
                    <th className="px-6 py-3 font-medium">등록일</th>
                    <th className="px-6 py-3 font-medium">상태</th>
                    <th className="px-6 py-3 font-medium text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm">
                  {productsList.map((product) => (
                    <tr key={product.id} className="hover:bg-stone-50">
                      <td className="px-6 py-4 font-medium text-stone-800">{product.title}</td>
                      <td className="px-6 py-4 text-stone-600">{product.seller}</td>
                      <td className="px-6 py-4 font-bold text-stone-800">{product.price}원</td>
                      <td className="px-6 py-4 text-stone-600">{product.date}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={product.status}
                          onChange={(e) => handleProductStatusChange(product.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium outline-none cursor-pointer ${
                            product.status === '판매중' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          <option value="판매중">판매중</option>
                          <option value="판매완료">판매완료</option>
                          <option value="숨김">숨김</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'consulting' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-stone-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-stone-800">컨설팅 요청 목록</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-500 text-sm">
                  <tr>
                    <th className="px-6 py-3 font-medium">요청자</th>
                    <th className="px-6 py-3 font-medium">상담 분야</th>
                    <th className="px-6 py-3 font-medium">내용 요약</th>
                    <th className="px-6 py-3 font-medium">요청일</th>
                    <th className="px-6 py-3 font-medium">상태</th>
                    <th className="px-6 py-3 font-medium text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm">
                  {consultingList.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50">
                      <td className="px-6 py-4 font-medium text-stone-800">{item.user}</td>
                      <td className="px-6 py-4 text-stone-600">
                        <span className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs">{item.type}</span>
                      </td>
                      <td className="px-6 py-4 text-stone-600 max-w-xs truncate" title={item.content}>{item.content}</td>
                      <td className="px-6 py-4 text-stone-600">{item.date}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={item.status}
                          onChange={(e) => handleConsultingStatusChange(item.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium outline-none cursor-pointer ${
                            item.status === '완료' ? 'bg-emerald-100 text-emerald-700' : 
                            item.status === '진행중' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          <option value="답변대기">답변대기</option>
                          <option value="진행중">진행중</option>
                          <option value="완료">완료</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-emerald-600 hover:text-emerald-800 p-1 text-sm font-medium">
                          상세보기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-stone-800">메인페이지: 귀농 성공 사례</h3>
                <button 
                  onClick={saveContent}
                  className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  저장하기
                </button>
              </div>
              
              <div className="space-y-6">
                {successStories.map((story: any, index: number) => (
                  <div key={index} className="p-6 border border-stone-100 rounded-xl bg-stone-50">
                    <h4 className="font-bold text-stone-700 mb-4">사례 #{index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-600 mb-1">제목</label>
                          <input 
                            type="text" 
                            value={story.title}
                            onChange={(e) => handleStoryChange(index, 'title', e.target.value)}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-600 mb-1">태그 (분야)</label>
                          <input 
                            type="text" 
                            value={story.tag}
                            onChange={(e) => handleStoryChange(index, 'tag', e.target.value)}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-600 mb-1">이미지 URL</label>
                          <input 
                            type="text" 
                            value={story.img}
                            onChange={(e) => handleStoryChange(index, 'img', e.target.value)}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            placeholder="https://..."
                          />
                          <p className="text-xs text-stone-500 mt-1">Unsplash 등 외부 이미지 URL을 입력하거나, public 폴더에 업로드 후 경로(/image.jpg)를 입력하세요.</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">이미지 미리보기</label>
                        <div className="w-full h-48 bg-stone-200 rounded-lg overflow-hidden border border-stone-300">
                          {story.img ? (
                            <img src={story.img} alt="미리보기" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                              <ImageIcon className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-stone-800">지역별 귀농 정보: 귀농 성공 사례</h3>
                <select 
                  value={selectedAdminRegion}
                  onChange={(e) => setSelectedAdminRegion(e.target.value)}
                  className="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  {['경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'].map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-6">
                {[0, 1].map((index) => {
                  const currentRegionData = regionData[selectedAdminRegion];
                  const story = currentRegionData.successStories ? currentRegionData.successStories[index] : null;
                  const defaultImg = currentRegionData.successImages[index];
                  const title = story?.title || `"도시의 삶을 뒤로하고 찾은 ${selectedAdminRegion}에서의 두 번째 인생"`;
                  const desc = story?.desc || `${currentRegionData.crops[0]} 농장 운영 3년차 김귀농 님`;
                  const img = story?.img || defaultImg;

                  return (
                    <div key={index} className="p-6 border border-stone-100 rounded-xl bg-stone-50">
                      <h4 className="font-bold text-stone-700 mb-4">사례 #{index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-stone-600 mb-1">제목</label>
                            <input 
                              type="text" 
                              value={title}
                              onChange={(e) => handleRegionStoryChange(selectedAdminRegion, index, 'title', e.target.value)}
                              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-stone-600 mb-1">설명</label>
                            <input 
                              type="text" 
                              value={desc}
                              onChange={(e) => handleRegionStoryChange(selectedAdminRegion, index, 'desc', e.target.value)}
                              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-stone-600 mb-1">이미지 URL</label>
                            <input 
                              type="text" 
                              value={img}
                              onChange={(e) => handleRegionStoryChange(selectedAdminRegion, index, 'img', e.target.value)}
                              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-600 mb-1">이미지 미리보기</label>
                          <div className="w-full h-48 bg-stone-200 rounded-lg overflow-hidden border border-stone-300">
                            {img ? (
                              <img src={img} alt="미리보기" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-400">
                                <ImageIcon className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
              <h3 className="text-xl font-bold text-stone-800 mb-6">시스템 설정</h3>
              
              {/* Settings Navigation */}
              <div className="flex flex-wrap gap-2 mb-8 border-b border-stone-100 pb-4">
                {[
                  { id: 'site', name: '기본 환경', icon: Globe },
                  { id: 'display', name: '배너/팝업', icon: Layout },
                  { id: 'footer', name: '푸터 링크', icon: Layout },
                  { id: 'category', name: '분류 관리', icon: ListTree },
                  { id: 'payment', name: '결제/수수료', icon: CreditCard },
                  { id: 'notification', name: '알림/메시지', icon: Bell },
                  { id: 'security', name: '권한/보안', icon: ShieldCheck },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSettingTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSettingTab === tab.id
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'text-stone-500 hover:bg-stone-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Settings Content */}
              <div className="min-h-[400px]">
                {activeSettingTab === 'site' && (
                  <div className="space-y-6 max-w-2xl">
                    <h4 className="font-bold text-stone-700 mb-4">1. 사이트 기본 환경 설정</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">사이트명</label>
                        <input type="text" defaultValue="고고팜" className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-600 mb-1">고객센터 연락처</label>
                          <input type="text" defaultValue="1588-0000" className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-600 mb-1">운영시간</label>
                          <input type="text" defaultValue="평일 09:00 - 18:00" className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">사업자등록번호</label>
                        <input type="text" defaultValue="123-45-67890" className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1">SEO 메타 설명 (검색엔진 노출용)</label>
                        <textarea defaultValue="귀농, 농지, 농산물 거래 플랫폼 고고팜입니다. 성공적인 귀농을 위한 모든 것을 제공합니다." className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-24 resize-none" />
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">저장하기</button>
                  </div>
                )}

                {activeSettingTab === 'display' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-stone-700">2. 배너 및 팝업 관리</h4>
                      <button 
                        onClick={addNewBanner}
                        className="flex items-center px-3 py-1.5 bg-stone-900 text-white rounded-lg text-sm hover:bg-stone-800 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-1" /> 새 배너 등록
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {banners.map((banner: any) => (
                        <div key={banner.id} className="p-4 border border-stone-200 rounded-xl bg-stone-50">
                          {editingBannerId === banner.id ? (
                            <div className="space-y-4">
                              <div className="flex justify-between items-center mb-2">
                                <h5 className="font-bold text-stone-800">배너/팝업 수정</h5>
                                <button onClick={() => deleteBanner(banner.id)} className="text-red-500 hover:text-red-700 text-sm flex items-center">
                                  <Trash2 className="w-4 h-4 mr-1" /> 삭제
                                </button>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-stone-600 mb-1">유형</label>
                                  <select 
                                    value={editBannerForm.type}
                                    onChange={(e) => setEditBannerForm({...editBannerForm, type: e.target.value})}
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none"
                                  >
                                    <option value="메인 배너">메인 배너</option>
                                    <option value="팝업">팝업</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-stone-600 mb-1">제목</label>
                                  <input 
                                    type="text" 
                                    value={editBannerForm.title}
                                    onChange={(e) => setEditBannerForm({...editBannerForm, title: e.target.value})}
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">간단 설명 (배너/팝업에 표시)</label>
                                <input 
                                  type="text" 
                                  value={editBannerForm.desc}
                                  onChange={(e) => setEditBannerForm({...editBannerForm, desc: e.target.value})}
                                  className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">상세 내용 (클릭 시 상세페이지에 표시)</label>
                                <textarea 
                                  value={editBannerForm.content || ''}
                                  onChange={(e) => setEditBannerForm({...editBannerForm, content: e.target.value})}
                                  className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none h-32 resize-y"
                                  placeholder="고객이 배너나 팝업을 클릭했을 때 보여질 상세 내용을 입력하세요."
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">이미지 첨부 (선택)</label>
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setEditBannerForm({...editBannerForm, img: reader.result as string});
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                />
                                {editBannerForm.img && (
                                  <div className="mt-3 relative inline-block">
                                    <img src={editBannerForm.img} alt="preview" className="h-24 object-cover rounded-lg border border-stone-200" />
                                    <button 
                                      onClick={() => setEditBannerForm({...editBannerForm, img: ''})} 
                                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                      X
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div className="flex justify-end gap-2 mt-4">
                                <button onClick={() => setEditingBannerId(null)} className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg text-sm font-medium">취소</button>
                                <button onClick={saveBannerEdit} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">저장</button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                {banner.img && (
                                  <img src={banner.img} alt="banner" className="w-16 h-16 object-cover rounded-lg" referrerPolicy="no-referrer" />
                                )}
                                <div>
                                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md mb-2 inline-block">{banner.type}</span>
                                  <h5 className="font-medium text-stone-800">{banner.title}</h5>
                                  <p className="text-sm text-stone-500 mt-1">{banner.desc}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <button onClick={() => handleEditBanner(banner)} className="text-stone-500 hover:text-emerald-600 p-1">
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button 
                                  onClick={() => toggleBanner(banner.id)}
                                  className={`p-1 transition-colors ${banner.status ? 'text-emerald-500' : 'text-stone-300'}`}
                                >
                                  {banner.status ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSettingTab === 'footer' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-stone-700">푸터 링크 관리</h4>
                      <button 
                        onClick={addFooterCategory}
                        className="flex items-center px-3 py-1.5 bg-stone-900 text-white rounded-lg text-sm hover:bg-stone-800 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-1" /> 새 카테고리 추가
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {footerLinks.map((category: any) => (
                        <div key={category.id} className="p-6 border border-stone-200 rounded-xl bg-stone-50">
                          <div className="flex justify-between items-center mb-4 pb-4 border-b border-stone-200">
                            <div className="flex items-center gap-4 flex-1">
                              <label className="text-sm font-bold text-stone-700 w-24">카테고리명</label>
                              <input 
                                type="text" 
                                value={category.title}
                                onChange={(e) => updateFooterCategory(category.id, e.target.value)}
                                className="px-3 py-1.5 border border-stone-300 rounded-lg outline-none w-64 focus:ring-2 focus:ring-emerald-500"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => addFooterLink(category.id)}
                                className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm hover:bg-emerald-200 transition-colors flex items-center"
                              >
                                <Plus className="w-4 h-4 mr-1" /> 링크 추가
                              </button>
                              <button 
                                onClick={() => deleteFooterCategory(category.id)}
                                className="px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition-colors flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-1" /> 카테고리 삭제
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            {category.links.map((link: any) => (
                              <div key={link.id} className="p-4 bg-white border border-stone-200 rounded-lg flex gap-4 items-start">
                                <div className="flex-1 space-y-3">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-xs font-medium text-stone-500 mb-1">링크 이름</label>
                                      <input 
                                        type="text" 
                                        value={link.name}
                                        onChange={(e) => updateFooterLink(category.id, link.id, 'name', e.target.value)}
                                        className="w-full px-3 py-1.5 border border-stone-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-emerald-500"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-stone-500 mb-1">URL 경로 (영문)</label>
                                      <div className="flex items-center">
                                        <span className="text-stone-400 text-sm mr-1">/page/</span>
                                        <input 
                                          type="text" 
                                          value={link.slug}
                                          onChange={(e) => updateFooterLink(category.id, link.id, 'slug', e.target.value)}
                                          className="flex-1 px-3 py-1.5 border border-stone-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-emerald-500"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-stone-500 mb-1">상세 내용</label>
                                    <textarea 
                                      value={link.content}
                                      onChange={(e) => updateFooterLink(category.id, link.id, 'content', e.target.value)}
                                      className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none text-sm h-24 resize-y focus:ring-2 focus:ring-emerald-500"
                                      placeholder="클릭 시 보여질 내용을 입력하세요."
                                    />
                                  </div>
                                </div>
                                <button 
                                  onClick={() => deleteFooterLink(category.id, link.id)}
                                  className="text-stone-400 hover:text-red-500 p-2"
                                  title="링크 삭제"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            ))}
                            {category.links.length === 0 && (
                              <div className="text-center py-4 text-stone-500 text-sm bg-stone-100 rounded-lg border border-dashed border-stone-300">
                                등록된 링크가 없습니다. 링크 추가 버튼을 눌러주세요.
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSettingTab === 'category' && (
                  <div className="space-y-6">
                    <h4 className="font-bold text-stone-700 mb-4">3. 카테고리 및 분류 관리</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="border border-stone-200 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="font-bold text-stone-800">상품 카테고리</h5>
                          <button className="text-emerald-600 hover:text-emerald-700"><Plus className="w-4 h-4" /></button>
                        </div>
                        <ul className="space-y-2 text-sm text-stone-600">
                          <li className="flex justify-between items-center p-2 bg-stone-50 rounded-lg">농산물 <Trash2 className="w-4 h-4 text-stone-400 hover:text-red-500 cursor-pointer"/></li>
                          <li className="flex justify-between items-center p-2 bg-stone-50 rounded-lg">농기계 <Trash2 className="w-4 h-4 text-stone-400 hover:text-red-500 cursor-pointer"/></li>
                          <li className="flex justify-between items-center p-2 bg-stone-50 rounded-lg">비료/농약 <Trash2 className="w-4 h-4 text-stone-400 hover:text-red-500 cursor-pointer"/></li>
                        </ul>
                      </div>
                      <div className="border border-stone-200 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="font-bold text-stone-800">농지 지목 분류</h5>
                          <button className="text-emerald-600 hover:text-emerald-700"><Plus className="w-4 h-4" /></button>
                        </div>
                        <ul className="space-y-2 text-sm text-stone-600">
                          <li className="flex justify-between items-center p-2 bg-stone-50 rounded-lg">전 (밭) <Trash2 className="w-4 h-4 text-stone-400 hover:text-red-500 cursor-pointer"/></li>
                          <li className="flex justify-between items-center p-2 bg-stone-50 rounded-lg">답 (논) <Trash2 className="w-4 h-4 text-stone-400 hover:text-red-500 cursor-pointer"/></li>
                          <li className="flex justify-between items-center p-2 bg-stone-50 rounded-lg">과수원 <Trash2 className="w-4 h-4 text-stone-400 hover:text-red-500 cursor-pointer"/></li>
                        </ul>
                      </div>
                      <div className="border border-stone-200 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="font-bold text-stone-800">컨설팅 분야</h5>
                          <button className="text-emerald-600 hover:text-emerald-700"><Plus className="w-4 h-4" /></button>
                        </div>
                        <ul className="space-y-2 text-sm text-stone-600">
                          <li className="flex justify-between items-center p-2 bg-stone-50 rounded-lg">스마트팜 창업 <Trash2 className="w-4 h-4 text-stone-400 hover:text-red-500 cursor-pointer"/></li>
                          <li className="flex justify-between items-center p-2 bg-stone-50 rounded-lg">정부 지원금 <Trash2 className="w-4 h-4 text-stone-400 hover:text-red-500 cursor-pointer"/></li>
                          <li className="flex justify-between items-center p-2 bg-stone-50 rounded-lg">농지 구입 <Trash2 className="w-4 h-4 text-stone-400 hover:text-red-500 cursor-pointer"/></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSettingTab === 'payment' && (
                  <div className="space-y-6 max-w-2xl">
                    <h4 className="font-bold text-stone-700 mb-4">4. 결제 및 수수료 설정</h4>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="p-4 border border-stone-200 rounded-xl">
                        <label className="block text-sm font-bold text-stone-800 mb-2">플랫폼 기본 수수료율 (%)</label>
                        <div className="flex items-center">
                          <input type="number" defaultValue="5.5" className="w-32 px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-right" />
                          <span className="ml-2 text-stone-600">%</span>
                        </div>
                        <p className="text-xs text-stone-500 mt-2">고고몰 상품 판매 시 판매자에게 부과되는 기본 수수료입니다.</p>
                      </div>
                      
                      <div className="p-4 border border-stone-200 rounded-xl">
                        <label className="block text-sm font-bold text-stone-800 mb-2">결제 수단 사용 설정</label>
                        <div className="space-y-3">
                          <label className="flex items-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500" /><span className="ml-2 text-stone-700">신용/체크카드</span></label>
                          <label className="flex items-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500" /><span className="ml-2 text-stone-700">무통장 입금 (가상계좌)</span></label>
                          <label className="flex items-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500" /><span className="ml-2 text-stone-700">카카오페이</span></label>
                          <label className="flex items-center"><input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500" /><span className="ml-2 text-stone-700">네이버페이</span></label>
                        </div>
                      </div>

                      <div className="p-4 border border-stone-200 rounded-xl">
                        <label className="block text-sm font-bold text-stone-800 mb-2">신규 가입 축하 포인트</label>
                        <div className="flex items-center">
                          <input type="number" defaultValue="3000" className="w-32 px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-right" />
                          <span className="ml-2 text-stone-600">P</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">저장하기</button>
                  </div>
                )}

                {activeSettingTab === 'notification' && (
                  <div className="space-y-6 max-w-3xl">
                    <h4 className="font-bold text-stone-700 mb-4">5. 알림 및 메시지 템플릿</h4>
                    
                    <div className="bg-stone-50 p-4 border border-stone-200 rounded-xl mb-6">
                      <label className="block text-sm font-bold text-stone-800 mb-2">관리자 수신 번호 (카카오톡 알림용)</label>
                      <input 
                        type="text" 
                        value={notiSettings.adminPhone}
                        onChange={(e) => handleNotiSettingChange('adminPhone', e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
                        placeholder="010-0000-0000"
                      />
                      <p className="text-xs text-stone-500 mt-2">새로운 컨설팅 요청, 회원가입 등 주요 이벤트 발생 시 해당 번호로 카카오톡 알림이 발송됩니다.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div className="border border-stone-200 rounded-xl overflow-hidden">
                        <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 flex justify-between items-center">
                          <span className="font-bold text-stone-800">회원가입 완료 알림톡</span>
                          <div className="flex gap-4">
                            <label className="flex items-center text-sm cursor-pointer">
                              <input type="checkbox" checked={notiSettings.signup.customer} onChange={(e) => handleNestedNotiChange('signup', 'customer', e.target.checked)} className="mr-2 text-emerald-600 focus:ring-emerald-500 rounded" />
                              고객 발송
                            </label>
                            <label className="flex items-center text-sm cursor-pointer">
                              <input type="checkbox" checked={notiSettings.signup.admin} onChange={(e) => handleNestedNotiChange('signup', 'admin', e.target.checked)} className="mr-2 text-emerald-600 focus:ring-emerald-500 rounded" />
                              관리자 발송
                            </label>
                          </div>
                        </div>
                        <div className="p-4">
                          <textarea 
                            defaultValue="[고고팜] {이름}님, 고고팜 회원가입을 진심으로 환영합니다!&#10;성공적인 귀농의 첫걸음, 고고팜이 함께하겠습니다.&#10;&#10;지급된 가입 축하 포인트 {포인트}P를 확인해보세요." 
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-32 resize-none text-sm" 
                          />
                          <p className="text-xs text-stone-500 mt-2">사용 가능 변수: {'{이름}'}, {'{포인트}'}</p>
                        </div>
                      </div>

                      <div className="border border-stone-200 rounded-xl overflow-hidden">
                        <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 flex justify-between items-center">
                          <span className="font-bold text-stone-800">컨설팅 접수 완료 알림톡</span>
                          <div className="flex gap-4">
                            <label className="flex items-center text-sm cursor-pointer">
                              <input type="checkbox" checked={notiSettings.consulting.customer} onChange={(e) => handleNestedNotiChange('consulting', 'customer', e.target.checked)} className="mr-2 text-emerald-600 focus:ring-emerald-500 rounded" />
                              고객 발송
                            </label>
                            <label className="flex items-center text-sm cursor-pointer">
                              <input type="checkbox" checked={notiSettings.consulting.admin} onChange={(e) => handleNestedNotiChange('consulting', 'admin', e.target.checked)} className="mr-2 text-emerald-600 focus:ring-emerald-500 rounded" />
                              관리자 발송
                            </label>
                          </div>
                        </div>
                        <div className="p-4">
                          <textarea 
                            defaultValue="[고고팜] {이름}님, 요청하신 '{상담분야}' 컨설팅 접수가 완료되었습니다.&#10;담당 전문가가 배정되는 대로 연락드리겠습니다.&#10;&#10;접수일시: {접수일시}" 
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-32 resize-none text-sm" 
                          />
                          <p className="text-xs text-stone-500 mt-2">사용 가능 변수: {'{이름}'}, {'{상담분야}'}, {'{접수일시}'}</p>
                        </div>
                      </div>
                    </div>
                    <button onClick={saveNotiSettings} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">저장하기</button>
                  </div>
                )}

                {activeSettingTab === 'security' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-stone-700">6. 관리자 권한 및 보안</h4>
                      <button className="flex items-center px-3 py-1.5 bg-stone-900 text-white rounded-lg text-sm hover:bg-stone-800 transition-colors">
                        <Plus className="w-4 h-4 mr-1" /> 부관리자 계정 생성
                      </button>
                    </div>
                    <div className="overflow-x-auto border border-stone-200 rounded-xl">
                      <table className="w-full text-left">
                        <thead className="bg-stone-50 text-stone-500 text-sm">
                          <tr>
                            <th className="px-6 py-3 font-medium">관리자명</th>
                            <th className="px-6 py-3 font-medium">아이디</th>
                            <th className="px-6 py-3 font-medium">부여된 권한 (역할)</th>
                            <th className="px-6 py-3 font-medium">최근 접속일시</th>
                            <th className="px-6 py-3 font-medium text-right">관리</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-sm">
                          <tr className="hover:bg-stone-50">
                            <td className="px-6 py-4 font-bold text-stone-800">최고관리자</td>
                            <td className="px-6 py-4 text-stone-600">admin_master</td>
                            <td className="px-6 py-4"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">전체 권한 (Super Admin)</span></td>
                            <td className="px-6 py-4 text-stone-500">2023-10-26 14:30:22</td>
                            <td className="px-6 py-4 text-right"><button className="text-stone-400 cursor-not-allowed" disabled>수정불가</button></td>
                          </tr>
                          <tr className="hover:bg-stone-50">
                            <td className="px-6 py-4 font-medium text-stone-800">김상담 (CS)</td>
                            <td className="px-6 py-4 text-stone-600">cs_kim</td>
                            <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">회원/컨설팅 관리</span></td>
                            <td className="px-6 py-4 text-stone-500">2023-10-26 09:15:00</td>
                            <td className="px-6 py-4 text-right"><button className="text-emerald-600 hover:text-emerald-800 font-medium">권한수정</button></td>
                          </tr>
                          <tr className="hover:bg-stone-50">
                            <td className="px-6 py-4 font-medium text-stone-800">이상품 (MD)</td>
                            <td className="px-6 py-4 text-stone-600">md_lee</td>
                            <td className="px-6 py-4"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">상품/콘텐츠 관리</span></td>
                            <td className="px-6 py-4 text-stone-500">2023-10-25 18:40:11</td>
                            <td className="px-6 py-4 text-right"><button className="text-emerald-600 hover:text-emerald-800 font-medium">권한수정</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-8 p-4 bg-stone-50 border border-stone-200 rounded-xl">
                      <h5 className="font-bold text-stone-800 mb-2 flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-stone-500"/>보안 설정</h5>
                      <div className="space-y-3 mt-4">
                        <label className="flex items-center justify-between max-w-md">
                          <span className="text-sm text-stone-700">해외 IP 로그인 차단</span>
                          <button className="text-emerald-500"><ToggleRight className="w-8 h-8" /></button>
                        </label>
                        <label className="flex items-center justify-between max-w-md">
                          <span className="text-sm text-stone-700">관리자 2단계 인증 (2FA) 필수 사용</span>
                          <button className="text-emerald-500"><ToggleRight className="w-8 h-8" /></button>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
