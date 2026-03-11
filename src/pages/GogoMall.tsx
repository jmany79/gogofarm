import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, MapPin, Package, Tractor, Leaf, Sprout, X, Upload, Image as ImageIcon, Star } from 'lucide-react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IMP: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daum: any;
  }
}

export default function GogoMall() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const productScrollRef = useRef<HTMLDivElement>(null);
  const paymentScrollRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const { IMP } = window;
    if (IMP) {
      IMP.init('imp14397622');
    }
  }, []);

  useEffect(() => {
    if (isModalOpen && modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (selectedProduct && productScrollRef.current) {
      productScrollRef.current.scrollTop = 0;
      setActiveTab('details');
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (isPaymentModalOpen && paymentScrollRef.current) {
      paymentScrollRef.current.scrollTop = 0;
    }
  }, [isPaymentModalOpen]);
  
  // Form state
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: '농산물',
    location: '',
    description: ''
  });

  const categories = [
    { name: '전체', icon: Package },
    { name: '농산물', icon: Leaf },
    { name: '농기구', icon: Tractor },
    { name: '비료/농약', icon: Sprout },
    { name: '기타', icon: Package },
  ];

  const [products, setProducts] = useState([
    { 
      id: 1, title: '유기농 꿀고구마 10kg 특상', price: '25,000', category: '농산물', seller: '해남농부', location: '전남 해남군', date: '1시간 전', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
      details: {
        images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80'],
        content: '청정 해남 땅끝마을에서 해풍을 맞고 자란 진짜 꿀고구마!\n\n120일의 기다림 끝에 수확한 꿀고구마는 찌거나 구웠을 때 당도가 극대화됩니다.\n\n✔️ 무농약 친환경 재배\n✔️ 산지 직송으로 신선함 유지\n✔️ 꼼꼼한 선별 작업 후 발송\n\n보관방법: 수령 후 박스를 열어 서늘하고 통풍이 잘 되는 곳에 보관해주세요.'
      },
      reviews: [
        { id: 1, user: '김*진', rating: 5, comment: '정말 달고 맛있어요! 재구매 의사 100%입니다.', date: '2023-10-01' },
        { id: 2, user: '이*훈', rating: 4, comment: '크기가 약간 들쭉날쭉하지만 맛은 최고네요.', date: '2023-10-05' }
      ]
    },
    { 
      id: 2, title: '중고 관리기 팝니다 (상태 A급, 점검완료)', price: '850,000', category: '농기구', seller: '김제스마트', location: '전북 김제시', date: '3시간 전', img: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?auto=format&fit=crop&w=400&q=80',
      details: {
        images: ['https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?auto=format&fit=crop&w=800&q=80'],
        content: '아세아 관리기 중고 판매합니다.\n\n작년에 엔진 오일 및 소모품 올 수리 완료했습니다.\n시동 일발 장전되며, 로터리 날도 아직 쓸만합니다.\n\n직접 오셔서 시운전 해보시고 가져가세요.\n화물 거래시 용달비는 구매자 부담입니다.'
      },
      reviews: []
    },
    { id: 3, title: '친환경 유기질 비료 50포 일괄 판매', price: '400,000', category: '비료/농약', seller: '친환경마을', location: '충남 논산시', date: '5시간 전', img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=400&q=80', reviews: [] },
    { id: 4, title: '당도 최고 샤인머스캣 2kg 산지직송', price: '35,000', category: '농산물', seller: '상주포도원', location: '경북 상주시', date: '하루 전', img: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=400&q=80', reviews: [{ id: 1, user: '박*영', rating: 5, comment: '알이 정말 크고 달아요. 아이들이 너무 좋아합니다.', date: '2023-10-08' }] },
    { id: 5, title: '사과 적과용 가위 10개 일괄 처분', price: '50,000', category: '농기구', seller: '청송사과', location: '경북 청송군', date: '하루 전', img: 'https://images.unsplash.com/photo-1416879598553-300b83b8d144?auto=format&fit=crop&w=400&q=80', reviews: [] },
    { id: 6, title: '직접 짠 국산 100% 들기름 350ml', price: '20,000', category: '농산물', seller: '할매손맛', location: '강원 평창군', date: '2일 전', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80', reviews: [{ id: 1, user: '최*미', rating: 5, comment: '향이 정말 진하고 고소해요. 마트에서 파는거랑 차원이 다릅니다.', date: '2023-10-07' }] },
    { id: 7, title: '대동 트랙터 50마력 (연식 18년)', price: '12,000,000', category: '농기구', seller: '나주배농장', location: '전남 나주시', date: '3일 전', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80', reviews: [] },
    { id: 8, title: '친환경 무농약 찰토마토 5kg', price: '18,000', category: '농산물', seller: '부여토마토', location: '충남 부여군', date: '3일 전', img: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=400&q=80', reviews: [] },
  ]);

  const filteredProducts = products.filter(p => 
    (activeCategory === '전체' || p.category === activeCategory) &&
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !newReview.comment.trim()) return;

    const review = {
      id: Date.now(),
      user: '고객님',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedProducts = products.map(p => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          reviews: [review, ...(p.reviews || [])]
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    setSelectedProduct({
      ...selectedProduct,
      reviews: [review, ...(selectedProduct.reviews || [])]
    });
    setNewReview({ rating: 5, comment: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new product object
    const productToAdd = {
      id: products.length + 1,
      title: newProduct.title,
      price: Number(newProduct.price).toLocaleString(),
      category: newProduct.category,
      seller: '새로운 판매자', // Mock user
      location: newProduct.location || '전국',
      date: '방금 전',
      description: newProduct.description,
      // Random placeholder image based on category
      img: imagePreview || (newProduct.category === '농기구' 
        ? 'https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80'),
      reviews: []
    };

    // Add to the beginning of the list
    setProducts([productToAdd, ...products]);
    
    // Reset form and close modal
    setNewProduct({
      title: '',
      price: '',
      category: '농산물',
      location: '',
      description: ''
    });
    setImagePreview(null);
    setIsModalOpen(false);
  };

  const [paymentInfo, setPaymentInfo] = useState({
    buyer_name: '',
    buyer_tel: '',
    buyer_postcode: '',
    buyer_addr: '',
    buyer_detail_addr: '',
    pay_method: 'card'
  });

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      oncomplete: function(data: any) {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setPaymentInfo(prev => ({
          ...prev,
          buyer_postcode: data.zonecode,
          buyer_addr: fullAddress,
          buyer_detail_addr: '' // Reset detail address when new address is selected
        }));
      }
    }).open();
  };

  const handlePayment = () => {
    if (!selectedProduct) return;
    
    if (!paymentInfo.buyer_name || !paymentInfo.buyer_tel || !paymentInfo.buyer_addr || !paymentInfo.buyer_detail_addr) {
      showToast('배송지 정보를 모두 입력해주세요.');
      return;
    }

    const { IMP } = window;
    if (!IMP) {
      showToast('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const amount = Number(selectedProduct.price.replace(/,/g, ''));

    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: paymentInfo.pay_method, // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: amount, // 결제금액
      name: selectedProduct.title, // 주문명
      buyer_name: paymentInfo.buyer_name, // 구매자 이름
      buyer_tel: paymentInfo.buyer_tel, // 구매자 전화번호
      buyer_addr: `${paymentInfo.buyer_addr} ${paymentInfo.buyer_detail_addr}`, // 구매자 주소
      buyer_postcode: paymentInfo.buyer_postcode, // 구매자 우편번호
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    IMP.request_pay(data, (response: any) => {
      // 강제로 포트원(아임포트) 관련 오버레이 및 iframe 제거 (먹통 방지)
      setTimeout(() => {
        const elementsToRemove = document.querySelectorAll('.imp-dialog, iframe[src*="iamport"], iframe[name^="iamport"], #force-close-portone');
        elementsToRemove.forEach(el => {
          if (el.parentElement && el.parentElement.tagName === 'DIV' && el.parentElement.style.zIndex) {
            el.parentElement.remove();
          } else {
            el.remove();
          }
        });
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.bottom = '';
      }, 100);

      if (response.success) {
        setIsPaymentModalOpen(false);
        setSelectedProduct(null);
        showToast('결제가 완료되었습니다!');
      } else {
        setIsPaymentModalOpen(false);
        showToast(`결제 취소/실패: ${response.error_msg}`);
      }
    });

    // 미리보기(iframe) 환경에서 포트원 스크립트가 멈추는 현상을 대비해 강제 닫기 버튼 추가
    setTimeout(() => {
      const existingBtn = document.getElementById('force-close-portone');
      if (existingBtn) existingBtn.remove();

      const forceCloseBtn = document.createElement('button');
      forceCloseBtn.id = 'force-close-portone';
      forceCloseBtn.innerHTML = '✕ 결제창 강제 닫기';
      forceCloseBtn.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 999999999; background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.3);';
      
      forceCloseBtn.onclick = () => {
        const elementsToRemove = document.querySelectorAll('.imp-dialog, iframe[src*="iamport"], iframe[name^="iamport"]');
        elementsToRemove.forEach(el => {
          if (el.parentElement && el.parentElement.tagName === 'DIV' && el.parentElement.style.zIndex) {
            el.parentElement.remove();
          } else {
            el.remove();
          }
        });
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.bottom = '';
        forceCloseBtn.remove();
        setIsPaymentModalOpen(false);
        showToast('결제창이 강제로 닫혔습니다.');
      };
      
      document.body.appendChild(forceCloseBtn);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2 rounded-full mb-4 inline-block shadow-md">고고몰</h1>
            <p className="text-xl text-stone-600 font-medium">농업인과 소비자가 직접 만나는 안심 직거래 장터</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-full font-bold flex items-center transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 border-2 border-pink-400"
          >
            <Plus className="w-5 h-5 mr-2" />
            상품 등록하기
          </button>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            <div className="flex space-x-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
                      activeCategory === cat.name
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold border-2 border-transparent shadow-md'
                        : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200 hover:border-pink-300 font-medium'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="어떤 물품을 찾으시나요?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-stone-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-shadow bg-stone-50 focus:bg-white"
              />
              <Search className="absolute left-4 top-3.5 text-stone-400 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 상품 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 group cursor-pointer flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-stone-100">
                <img src={product.img} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-3 bg-stone-800/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-stone-900 mb-3 line-clamp-2 group-hover:text-stone-900 transition-colors leading-snug">
                  {product.title}
                </h3>
                <div className="mt-auto">
                  <div className="text-2xl font-extrabold text-stone-900 mb-2">
                    {product.price}<span className="text-base font-normal text-stone-500 ml-1">원</span>
                  </div>
                  <div className="flex items-center gap-1 mb-4 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-stone-700">
                      {product.reviews?.length ? (product.reviews.reduce((acc: number, rev: any) => acc + rev.rating, 0) / product.reviews.length).toFixed(1) : '0.0'}
                    </span>
                    <span className="text-stone-400">
                      ({product.reviews?.length || 0})
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-stone-500 border-t border-stone-100 pt-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-stone-400" />
                      <span className="truncate max-w-[100px]">{product.location}</span>
                    </div>
                    <span>{product.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-stone-700 mb-2">검색 결과가 없습니다</h3>
            <p className="text-stone-500">다른 검색어로 다시 시도해보세요.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
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
                    ? 'bg-pink-500 text-white border-pink-500'
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

      {/* 상품 등록 모달 */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                <h2 className="text-2xl font-bold text-stone-800 flex items-center">
                  <Package className="w-6 h-6 mr-2 text-stone-800" />
                  상품 등록하기
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div ref={modalScrollRef} className="p-6 overflow-y-auto custom-scrollbar">
                <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                  {/* 사진 업로드 영역 */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">상품 사진</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-stone-300 rounded-2xl p-8 text-center hover:bg-stone-50 hover:border-stone-400 transition-colors cursor-pointer group relative overflow-hidden"
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-stone-100 text-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <ImageIcon className="w-8 h-8" />
                          </div>
                          <p className="text-stone-600 font-medium mb-1">클릭하여 이미지를 업로드하세요</p>
                          <p className="text-stone-400 text-sm">최대 5장까지 등록 가능합니다 (JPG, PNG)</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="title" className="block text-sm font-semibold text-stone-700 mb-2">상품명 <span className="text-stone-800">*</span></label>
                      <input 
                        type="text" 
                        id="title"
                        name="title"
                        required
                        value={newProduct.title}
                        onChange={handleInputChange}
                        placeholder="예) 해남 꿀고구마 10kg 특상" 
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none transition-shadow bg-stone-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-semibold text-stone-700 mb-2">카테고리 <span className="text-stone-800">*</span></label>
                      <select 
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none transition-shadow bg-stone-50 focus:bg-white appearance-none"
                      >
                        <option value="농산물">농산물</option>
                        <option value="농기구">농기구</option>
                        <option value="비료/농약">비료/농약</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="price" className="block text-sm font-semibold text-stone-700 mb-2">가격 (원) <span className="text-stone-800">*</span></label>
                      <input 
                        type="number" 
                        id="price"
                        name="price"
                        required
                        value={newProduct.price}
                        onChange={handleInputChange}
                        placeholder="숫자만 입력" 
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none transition-shadow bg-stone-50 focus:bg-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="location" className="block text-sm font-semibold text-stone-700 mb-2">거래 지역</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          id="location"
                          name="location"
                          value={newProduct.location}
                          onChange={handleInputChange}
                          placeholder="예) 전남 해남군" 
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none transition-shadow bg-stone-50 focus:bg-white"
                        />
                        <MapPin className="absolute left-3 top-3.5 text-stone-400 w-5 h-5" />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-semibold text-stone-700 mb-2">상품 설명 <span className="text-stone-800">*</span></label>
                      <textarea 
                        id="description"
                        name="description"
                        required
                        value={newProduct.description}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="상품의 상태, 특징, 거래 방식 등을 자세히 적어주세요." 
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none transition-shadow bg-stone-50 focus:bg-white resize-none"
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-medium text-stone-600 hover:bg-stone-200 transition-colors"
                >
                  취소
                </button>
                <button 
                  type="submit"
                  form="product-form"
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-stone-800 hover:bg-stone-900 shadow-md hover:shadow-lg transition-all flex items-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  등록 완료
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 상품 상세 모달 */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="relative h-64 sm:h-80 bg-stone-100 flex-shrink-0">
                <img src={selectedProduct.img} alt={selectedProduct.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-4 bg-stone-800/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full font-medium shadow-sm">
                  {selectedProduct.category}
                </div>
              </div>
              
              <div ref={productScrollRef} className="p-0 overflow-y-auto custom-scrollbar flex-grow">
                <div className="p-6 md:p-8 pb-0">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">{selectedProduct.title}</h2>
                      <div className="text-3xl font-extrabold text-stone-900">
                        {selectedProduct.price}<span className="text-lg font-normal text-stone-500 ml-1">원</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 py-4 border-y border-stone-100 mb-6 text-stone-600">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-stone-400" />
                      {selectedProduct.location}
                    </div>
                    <div className="flex items-center">
                      <Package className="w-5 h-5 mr-2 text-stone-400" />
                      {selectedProduct.seller}
                    </div>
                    <div className="flex items-center text-stone-400">
                      {selectedProduct.date}
                    </div>
                  </div>
                </div>

                {/* 탭 메뉴 */}
                <div className="flex border-b border-stone-200 sticky top-0 bg-white z-10 px-6 md:px-8">
                  <button 
                    onClick={() => setActiveTab('details')}
                    className={`py-4 px-6 font-bold text-lg border-b-4 transition-colors ${activeTab === 'details' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
                  >
                    상품정보
                  </button>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className={`py-4 px-6 font-bold text-lg border-b-4 transition-colors flex items-center gap-2 ${activeTab === 'reviews' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
                  >
                    상품평 <span className="bg-stone-100 text-stone-600 text-sm px-2 py-0.5 rounded-full">{selectedProduct.reviews?.length || 0}</span>
                  </button>
                </div>

                <div className="p-6 md:p-8">
                  {activeTab === 'details' ? (
                    <div className="space-y-8">
                      {/* 상세 이미지들 */}
                      {selectedProduct.details?.images ? (
                        <div className="space-y-4">
                          {selectedProduct.details.images.map((img: string, idx: number) => (
                            <img key={idx} src={img} alt="상세 이미지" className="w-full rounded-2xl" referrerPolicy="no-referrer" />
                          ))}
                        </div>
                      ) : (
                        <img src={selectedProduct.img} alt="상세 이미지" className="w-full rounded-2xl" referrerPolicy="no-referrer" />
                      )}
                      
                      {/* 상세 설명 텍스트 */}
                      <div className="bg-stone-50 p-6 rounded-2xl">
                        <h3 className="text-xl font-bold text-stone-800 mb-4 border-b border-stone-200 pb-2">상품 상세 설명</h3>
                        <p className="text-stone-700 leading-loose whitespace-pre-wrap text-lg">
                          {selectedProduct.details?.content || selectedProduct.description || "상세 설명이 없습니다."}
                        </p>
                      </div>
                      
                      {/* 배송/교환/환불 안내 */}
                      <div className="border border-stone-200 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-stone-800 mb-4">배송 및 교환/환불 안내</h3>
                        <ul className="text-stone-600 space-y-2 text-sm">
                          <li>• 배송비: 무료배송 (도서산간 지역 추가운임 발생 가능)</li>
                          <li>• 배송기간: 결제 완료 후 1~3일 이내 출고 (주말/공휴일 제외)</li>
                          <li>• 교환/환불: 상품 수령 후 7일 이내 고객센터 문의 (신선식품의 경우 단순 변심에 의한 반품 불가)</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* 리뷰 작성 폼 */}
                      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
                        <h3 className="text-lg font-bold text-stone-800 mb-4">상품평 작성하기</h3>
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">별점</label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map(star => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setNewReview({...newReview, rating: star})}
                                  className="focus:outline-none"
                                >
                                  <Star className={`w-8 h-8 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-stone-300'}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-2">내용</label>
                            <textarea
                              required
                              value={newReview.comment}
                              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                              placeholder="상품에 대한 솔직한 평가를 남겨주세요."
                              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none resize-none bg-white"
                              rows={3}
                            ></textarea>
                          </div>
                          <div className="flex justify-end">
                            <button type="submit" className="px-6 py-2.5 bg-stone-800 text-white font-bold rounded-xl hover:bg-stone-900 transition-colors">
                              등록하기
                            </button>
                          </div>
                        </form>
                      </div>

                      {/* 리뷰 목록 */}
                      <div>
                        <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                          전체 상품평 <span className="text-pink-500">{selectedProduct.reviews?.length || 0}</span>
                        </h3>
                        
                        {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
                          <div className="space-y-4">
                            {selectedProduct.reviews.map((review: any) => (
                              <div key={review.id} className="border-b border-stone-100 pb-6 last:border-0">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-stone-800">{review.user}</span>
                                    <span className="text-stone-400 text-sm">{review.date}</span>
                                  </div>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-stone-200'}`} />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-stone-600">{review.comment}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-100">
                            <Star className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                            <p className="text-stone-500 font-medium">아직 등록된 상품평이 없습니다.<br/>첫 번째 상품평을 남겨주세요!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-end space-x-3">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 rounded-xl font-medium text-stone-900 hover:bg-stone-200 transition-colors"
                >
                  닫기
                </button>
                <button 
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-stone-800 to-stone-900 hover:from-stone-900 hover:to-black shadow-md hover:shadow-lg transition-all"
                >
                  결제하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 결제 모달 */}
      <AnimatePresence>
        {isPaymentModalOpen && selectedProduct && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setIsPaymentModalOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                <h2 className="text-xl font-bold text-stone-800">안전 결제</h2>
                <button 
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div ref={paymentScrollRef} className="p-6 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-4 mb-6 p-4 bg-stone-100 rounded-2xl">
                  <img src={selectedProduct.img} alt={selectedProduct.title} className="w-16 h-16 object-cover rounded-xl" />
                  <div>
                    <h3 className="font-bold text-stone-800 line-clamp-1">{selectedProduct.title}</h3>
                    <p className="text-stone-900 font-extrabold">{selectedProduct.price}원</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">수령인 이름 <span className="text-pink-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="이름을 입력해주세요" 
                      value={paymentInfo.buyer_name}
                      onChange={(e) => setPaymentInfo({...paymentInfo, buyer_name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none bg-stone-50 focus:bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">연락처 <span className="text-pink-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="010-0000-0000" 
                      value={paymentInfo.buyer_tel}
                      onChange={(e) => setPaymentInfo({...paymentInfo, buyer_tel: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none bg-stone-50 focus:bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">배송지 주소 <span className="text-pink-500">*</span></label>
                    <div className="flex gap-2 mb-2">
                      <input 
                        type="text" 
                        placeholder="우편번호" 
                        readOnly
                        value={paymentInfo.buyer_postcode}
                        className="w-1/3 px-4 py-3 rounded-xl border border-stone-300 bg-stone-100 outline-none" 
                      />
                      <button
                        type="button"
                        onClick={handleAddressSearch}
                        className="w-2/3 px-4 py-3 bg-stone-800 text-white font-bold rounded-xl hover:bg-stone-900 transition-colors"
                      >
                        우편번호 찾기
                      </button>
                    </div>
                    <input 
                      type="text" 
                      placeholder="기본 주소" 
                      readOnly
                      value={paymentInfo.buyer_addr}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-100 outline-none mb-2" 
                    />
                    <input 
                      type="text" 
                      placeholder="상세 주소를 입력해주세요" 
                      value={paymentInfo.buyer_detail_addr}
                      onChange={(e) => setPaymentInfo({...paymentInfo, buyer_detail_addr: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none bg-stone-50 focus:bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">결제 수단</label>
                    <select 
                      value={paymentInfo.pay_method}
                      onChange={(e) => setPaymentInfo({...paymentInfo, pay_method: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none bg-stone-50 focus:bg-white appearance-none"
                    >
                      <option value="card">신용/체크카드</option>
                      <option value="trans">실시간 계좌이체</option>
                      <option value="vbank">가상계좌</option>
                      <option value="kakaopay">카카오페이</option>
                      <option value="tosspay">토스페이</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-stone-800 to-stone-900 hover:from-stone-900 hover:to-black shadow-md hover:shadow-lg transition-all text-lg"
                >
                  {selectedProduct.price}원 결제하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] bg-stone-800 text-white px-6 py-3 rounded-full shadow-xl font-medium flex items-center gap-2"
          >
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-stone-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
