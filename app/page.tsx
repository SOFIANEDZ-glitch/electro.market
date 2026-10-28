'use client';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  commission: number;
  images: string[];
  category: string;
  available: boolean;
}

interface Marketer {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  commune: string;
  code: string;
  active?: boolean;
}

interface WilayaRate {
  code: number;
  name: string;
  home: number | null;      
  stopDesk: number | null;
}

interface VisitLog {
  date: string;
  timestamp: number;
}

interface OrderRecord {
  timestamp: number;
}

interface CustomerOrder {
  id: number;
  customerName: string;
  customerPhone1: string;
  wilaya: string;
  town: string;
  address: string;
  items: { productName: string; quantity: number; price: number }[];
  grandTotal: number;
  date: string;
  status: string;
}

export const deliveryRates: WilayaRate[] = [
  { code: 1, name: "ADRAR", home: 1300, stopDesk: 770 },
  { code: 2, name: "CHLEF", home: 1000, stopDesk: 570 },
  { code: 3, name: "LAGHOUAT", home: 1000, stopDesk: 570 },
  { code: 4, name: "OUM EL BOUAGHI", home: 850, stopDesk: 570 },
  { code: 5, name: "BATNA", home: 800, stopDesk: 570 },
  { code: 6, name: "BEJAIA", home: 850, stopDesk: 570 },
  { code: 7, name: "BISKRA", home: 800, stopDesk: 570 },
  { code: 8, name: "BECHAR", home: 1300, stopDesk: 570 },
  { code: 9, name: "BLIDA", home: 900, stopDesk: 570 },
  { code: 10, name: "BOUIRA", home: 900, stopDesk: 570 },
  { code: 11, name: "TAMANRASSET", home: 1400, stopDesk: 870 },
  { code: 12, name: "TEBESSA", home: 800, stopDesk: 570 },
  { code: 13, name: "TLEMCEN", home: 1000, stopDesk: 570 },
  { code: 14, name: "TIARET", home: 1000, stopDesk: 570 },
  { code: 15, name: "TIZI OUZOU", home: 900, stopDesk: 570 },
  { code: 16, name: "ALGER", home: 700, stopDesk: 570 },
  { code: 17, name: "DJELFA", home: 1000, stopDesk: 570 },
  { code: 18, name: "JIJEL", home: 850, stopDesk: 570 },
  { code: 19, name: "SETIF", home: 850, stopDesk: 570 },
  { code: 20, name: "SAIDA", home: 1600, stopDesk: 620 },
  { code: 21, name: "SKIKDA", home: 850, stopDesk: 570 },
  { code: 22, name: "SIDI BEL ABBES", home: 1000, stopDesk: 570 },
  { code: 23, name: "ANNABA", home: 850, stopDesk: 570 },
  { code: 24, name: "GUELMA", home: 850, stopDesk: 570 },
  { code: 25, name: "CONSTANTINE", home: 850, stopDesk: 570 },
  { code: 26, name: "MEDEA", home: 900, stopDesk: 570 },
  { code: 27, name: "MOSTAGANEM", home: 1000, stopDesk: 570 },
  { code: 28, name: "M'SILA", home: 900, stopDesk: 570 },
  { code: 29, name: "MASCARA", home: 1000, stopDesk: 570 },
  { code: 30, name: "OUARGLA", home: 900, stopDesk: 570 },
  { code: 31, name: "ORAN", home: 1000, stopDesk: 570 },
  { code: 32, name: "EL BAYADH", home: 1300, stopDesk: 670 },
  { code: 33, name: "ILLIZI", home: null, stopDesk: null },
  { code: 34, name: "BORDJ BOU ARRERIDJ", home: 850, stopDesk: 570 },
  { code: 35, name: "BOUMERDES", home: 900, stopDesk: 570 },
  { code: 36, name: "EL TARF", home: 850, stopDesk: 570 },
  { code: 37, name: "TINDOUF", home: null, stopDesk: null },
  { code: 38, name: "TISSEMSILT", home: 1000, stopDesk: 570 },
  { code: 39, name: "EL OUED", home: 500, stopDesk: 420 },
  { code: 40, name: "KHENCHELA", home: 800, stopDesk: 570 },
  { code: 41, name: "SOUK AHRAS", home: 850, stopDesk: 570 },
  { code: 42, name: "TIPAZA", home: 900, stopDesk: 570 },
  { code: 43, name: "MILA", home: 850, stopDesk: 570 },
  { code: 44, name: "AIN DEFLA", home: 1000, stopDesk: 570 },
  { code: 45, name: "NAAMA", home: 1200, stopDesk: 670 },
  { code: 46, name: "AIN TEMOUCHENT", home: 1000, stopDesk: 570 },
  { code: 47, name: "GHARDAIA", home: 1000, stopDesk: 570 },
  { code: 48, name: "RELIZANE", home: 1000, stopDesk: 570 },
  { code: 49, name: "TIMIMOUN", home: 1300, stopDesk: 770 },
  { code: 50, name: "BORDJ BADJI MOKHTAR", home: null, stopDesk: null },
  { code: 51, name: "OULED DJELLAL", home: 800, stopDesk: 570 },
  { code: 52, name: "BENI ABBES", home: 1200, stopDesk: 770 },
  { code: 53, name: "IN SALAH", home: 1400, stopDesk: null },
  { code: 54, name: "IN GUEZZAM", home: 1400, stopDesk: null },
  { code: 55, name: "TOUGGOURT", home: 800, stopDesk: 570 },
  { code: 56, name: "DJANET", home: null, stopDesk: null },
  { code: 57, name: "M'GHAIR", home: 800, stopDesk: null },
  { code: 58, name: "EL MENIA", home: 1100, stopDesk: null }
];

const initialProducts: Product[] = [
  { id: 1, name: 'ساعة ذكية Ultra الذكية', description: 'ساعة ذكية أصلية مقاومة للماء مع عدة أشرطة وبطارية قوية.', price: 8500, commission: 1000, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'], category: 'إلكترونيات وهواتف', available: true },
  { id: 2, name: 'سماعات بلوتوث برو اللاسلكية', description: 'سماعات ذات جودة صوت عالية ونقاء ممتاز مع خاصية عزل الضوضاء.', price: 4500, commission: 600, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'], category: 'إلكترونيات وهواتف', available: true },
  { id: 3, name: 'آلة حلاقة احترافية لاسلكية', description: 'ماكينا حلاقة دقيقة لشعر الرأس واللحية بشفرات فولاذية حادة.', price: 5400, commission: 700, images: ['https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&q=80'], category: 'العناية الشخصية والجمال', available: true },
];

const categories = [
  { name: 'إلكترونيات وهواتف', image: 'https://cdn.phototourl.com/free/2026-09-18-d11ae186-aa4f-49d5-a22e-7ee9bb56b966.jpg' },
  { name: 'أجهزة كهرو منزلية كبرى', image: 'https://cdn.phototourl.com/free/2026-09-18-77e8299e-3f89-4bf0-82c0-8c26e998c63e.jpg' },
  { name: 'أجهزة كهرو منزلية صغرى', image: 'https://cdn.phototourl.com/free/2026-09-18-d896d2da-3287-4da5-9dad-06365ba9d758.jpg' },
  { name: 'العناية الشخصية والجمال', image: 'https://cdn.phototourl.com/free/2026-09-18-f937403b-0249-4ac3-9d1a-30b6cbe5394a.jpg' },
  { name: 'منتجات أخرى', image: 'https://cdn.phototourl.com/member/2026-09-19-f98df957-d660-4cea-a2de-9bc403d59787.jpg' },
  { name: 'عروض خاصة', image: 'https://cdn.phototourl.com/member/2026-09-19-7a503537-87f4-44f6-a473-dbb7b082728f.jpg' },
];

const staticCategory = { name: 'الكل', image: 'https://cdn.phototourl.com/member/2026-09-19-789e2116-c45a-4bfc-9311-7008b2801342.jpg' };

const translations: Record<string, Record<string, string>> = {
  ar: {
    subtitle: 'منصة التسويق بالعمولة والتجارة الإلكترونية الأولى في الجزائر 🇩🇿',
    cartTitle: 'سلة الطلبات',
    emptyCart: 'سلة المشتريات فارغة حالياً.',
    customerInfo: 'معلومات الزبون للتوصيل (69 ولاية):',
    fullName: 'الاسم الكامل للزبون *',
    phone1: 'رقم الهاتف الأول *',
    phone2: 'رقم الهاتف الثاني  ',
    selectWilaya: 'اختر الولاية لتحديد سعر التوصيل *',
    town: 'البلدية *',
    address: 'العنوان الدقيق (حي، شارع) *',
    productTotal: 'مجموع المنتجات:',
    deliveryCost: 'سعر التوصيل:',
    grandTotal: 'المجموع الكلي:',
    checkoutBtn: 'شراء 🛒',
    addToCart: 'أضف للسلة 🛒',
    footerText: 'Electro Market © 2026 - جميع الحقوق محفوظة',
    menuHome: 'الرئيسية',
    menuSupport: 'الدعم',
    menuPurchases: 'المشتريات',
    menuDashboard: 'لوحة تحكم المالك',
    searchPlaceholder: 'ابحث عما تريده هنا...',
    relatedProducts: 'منتجات مقترحة لك',
    expressOrder: 'اطلب الآن بسرعة',
  },
  fr: {
    subtitle: 'La première plateforme d\'affiliation et e-commerce en Algérie 🇩🇿',
    cartTitle: 'Panier de commandes',
    emptyCart: 'Votre panier est actuellement vide.',
    customerInfo: 'Informations de livraison (58 Wilayas) :',
    fullName: 'Nom complet du client *',
    phone1: 'Téléphone 1 *',
    selectWilaya: 'Sélectionnez la Wilaya *',
    town: 'Commune *',
    address: 'Adresse exacte (Quartier, Rue) *',
    productTotal: 'Total produits :',
    deliveryCost: 'Frais de livraison :',
    grandTotal: 'Montant total :',
    checkoutBtn: 'Acheter 🛒',
    addToCart: 'Ajouter au panier 🛒',
    footerText: 'Electro Market © 2026 - Tous droits réservés',
    menuHome: 'Accueil',
    menuSupport: 'Support',
    menuPurchases: 'Achats',
    menuDashboard: 'Tableau de bord',
    searchPlaceholder: 'Rechercher un produit...',
    relatedProducts: 'Produits suggérés',
    expressOrder: 'Commander rapidement',
  },
  en: {
    subtitle: 'The #1 Affiliate Marketing & E-commerce Platform in Algeria 🇩🇿',
    cartTitle: 'Order Cart',
    emptyCart: 'Your cart is currently empty.',
    customerInfo: 'Customer Delivery Information (69 Wilayas):',
    fullName: 'Full Name *',
    phone1: 'Phone Number *',
    selectWilaya: 'Select Wilaya *',
    town: 'Town / Municipality *',
    address: 'Exact Address (District, Street) *',
    productTotal: 'Products Total:',
    deliveryCost: 'Delivery Cost:',
    grandTotal: 'Grand Total:',
    checkoutBtn: 'Buy 🛒',
    addToCart: 'Add to Cart 🛒',
    footerText: 'Electro Market © 2026 - All Rights Reserved',
    menuHome: 'Home',
    menuSupport: 'Support',
    menuPurchases: 'Purchases',
    menuDashboard: 'Owner Dashboard',
    searchPlaceholder: 'Search for anything here...',
    relatedProducts: 'Suggested Products',
    expressOrder: 'Express Order Now',
  }
};

export default function Sawa9lyClone() {
  const [lang, setLang] = useState<'ar' | 'fr' | 'en'>('ar');
  const t = translations[lang];

  const [viewMode, setViewMode] = useState<'welcome' | 'store'>('welcome');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
 
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCity, setRegCity] = useState('');

  const [marketer, setMarketer] = useState<Marketer | null>(null);
  const [marketersList, setMarketersList] = useState<Marketer[]>([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
 
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ product: Product; quantity: number; customCommission: number }[]>([]);

  const [categoryList, setCategoryList] = useState(categories);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [totalVisits, setTotalVisits] = useState<VisitLog[]>([]);
  const [totalOrdersCount, setTotalOrdersCount] = useState<number>(0);
  const [orderRecords, setOrderRecords] = useState<OrderRecord[]>([]);
  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>([]);
  const [chartInterval, setChartInterval] = useState<'day' | 'week' | 'month' | 'year'>('day');

  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [orderSuccessMessage, setOrderSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCategoryList(prev => {
          const copy = [...prev];
          const firstItem = copy.shift();
          if (firstItem) copy.push(firstItem);
          return copy;
        });
        setIsTransitioning(false);
      }, 600);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const [newProdName, setNewProdName] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdComm, setNewProdComm] = useState('');
  const [newProdCat, setNewProdCat] = useState('إلكترونيات وهواتف');
  const [newProdImages, setNewProdImages] = useState<string[]>([]);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone1, setCustomerPhone1] = useState('');
  const [customerWilayaCode, setCustomerWilayaCode] = useState<number | ''>('');
  const [customerTown, setCustomerTown] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryType] = useState<'home' | 'stopDesk'>('home');

  const [activeAffiliateCode, setActiveAffiliateCode] = useState<string | null>(null);

  useEffect(() => {
    const savedMarketer = localStorage.getItem('electro_marketer');
    if (savedMarketer) {
      try { setMarketer(JSON.parse(savedMarketer)); } catch (e) {}
    }

    const savedMarketersList = localStorage.getItem('electro_marketers_list');
    if (savedMarketersList) {
      try { setMarketersList(JSON.parse(savedMarketersList)); } catch (e) {}
    } else {
      const defaultMarketers: Marketer[] = [
        { name: 'أحمد بن علي', phone: '0700000001', email: 'ahmed@mail.com', address: 'حي البدر', city: 'الجزائر', commune: 'الجزائر المركزية', code: 'REF101', active: true },
        { name: 'محمد صالح', phone: '0700000002', email: 'mohamed@mail.com', address: 'شارع الاستقلال', city: 'وهران', commune: 'وهران', code: 'REF102', active: false }
      ];
      setMarketersList(defaultMarketers);
      localStorage.setItem('electro_marketers_list', JSON.stringify(defaultMarketers));
    }

    const savedProds = localStorage.getItem('electro_products');
    if (savedProds) {
      try { setProducts(JSON.parse(savedProds)); } catch (e) {}
    }

    const savedCustomerOrders = localStorage.getItem('electro_customer_orders');
    if (savedCustomerOrders) {
      try { setCustomerOrders(JSON.parse(savedCustomerOrders)); } catch (e) {}
    }

    const savedVisits = localStorage.getItem('electro_visits');
    let visits: VisitLog[] = savedVisits ? JSON.parse(savedVisits) : [];
    const currentMonthYear = new Date().toISOString().slice(0, 7);
   
    visits.push({ date: currentMonthYear, timestamp: Date.now() });
    localStorage.setItem('electro_visits', JSON.stringify(visits));
    setTotalVisits(visits);

    const savedOrdersCount = localStorage.getItem('electro_orders_count');
    if (savedOrdersCount) {
      setTotalOrdersCount(Number(savedOrdersCount));
    }

    const savedOrderRecords = localStorage.getItem('electro_order_records');
    if (savedOrderRecords) {
      try { setOrderRecords(JSON.parse(savedOrderRecords)); } catch (e) {}
    }

    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      setActiveAffiliateCode(refCode);
      localStorage.setItem('active_ref', refCode);
    } else {
      const storedRef = localStorage.getItem('active_ref');
      if (storedRef) setActiveAffiliateCode(storedRef);
    }
  }, []);

  const saveProductsToStorage = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('electro_products', JSON.stringify(updated));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (newProdImages.length + files.length > 20) {
      return alert('عذراً، الحد الأقصى المسموح به هو 20 صورة فقط للمنتج الواحد.');
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setNewProdImages(prev => [...prev, uploadEvent.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleStartEdit = (product: Product) => {
    setEditingProductId(product.id);
    setNewProdName(product.name);
    setNewProdDesc(product.description);
    setNewProdPrice(String(product.price));
    setNewProdComm(String(product.commission));
    setNewProdCat(product.category);
    setNewProdImages(product.images);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice('');
    setNewProdComm('');
    setNewProdImages([]);
  };

  const handleAddOrUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || newProdImages.length === 0) {
      return alert('الرجاء إدخال اسم المنتج، السعر، ورفع صورة واحدة على الأقل من جهازك.');
    }

    if (editingProductId !== null) {
      const updatedList = products.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            name: newProdName,
            description: newProdDesc,
            price: Number(newProdPrice),
            commission: Number(newProdComm) || 0,
            category: newProdCat,
            images: newProdImages,
          };
        }
        return p;
      });
      saveProductsToStorage(updatedList);
      setEditingProductId(null);
      alert('تم تحديث وتعديل المنتج بنجاح! 🚀');
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: newProdName,
        description: newProdDesc,
        price: Number(newProdPrice),
        commission: Number(newProdComm) || 0,
        images: newProdImages,
        category: newProdCat,
        available: true
      };
      saveProductsToStorage([newProduct, ...products]);
      alert('تم إضافة المنتج بنجاح مع الصور والوصف!');
    }

    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice('');
    setNewProdComm('');
    setNewProdImages([]);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      const updated = products.filter(p => p.id !== id);
      saveProductsToStorage(updated);
      if (editingProductId === id) handleCancelEdit();
    }
  };

  const handleDeleteCustomerOrder = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذه الطلبية؟')) {
      const updated = customerOrders.filter(o => o.id !== id);
      setCustomerOrders(updated);
      localStorage.setItem('electro_customer_orders', JSON.stringify(updated));
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1, customCommission: 0 }];
    });
    alert(`تمت إضافة "${product.name}" إلى السلة بنجاح! 🛒`);
  };

  const updateCustomCommission = (productId: number, val: number) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, customCommission: val < 0 ? 0 : val } : item));
  };

  const openCart = () => {
    setSelectedProduct(null);
    setShowDashboard(false);
    setShowCartModal(true);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'الكل' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPrice = cart.reduce((sum, item) => sum + ((item.product.price + item.customCommission) * item.quantity), 0);
  const selectedWilayaObj = deliveryRates.find(w => w.code === customerWilayaCode);
  const deliveryCost = selectedWilayaObj ? (deliveryType === 'home' ? (selectedWilayaObj.home ?? 0) : (selectedWilayaObj.stopDesk ?? 0)) : 0;
  const grandTotal = totalPrice + deliveryCost;

  const currentMonthStr = new Date().toISOString().slice(0, 7);
  const monthlyVisitors = totalVisits.filter(v => v.date === currentMonthStr).length;
  const conversionRate = monthlyVisitors > 0 ? ((totalOrdersCount / monthlyVisitors) * 100).toFixed(2) : '0';

  const totalMarketersCount = marketersList.length;
  const activeMarketersCount = marketersList.filter(m => m.active === true).length;
  const inactiveMarketersCount = marketersList.filter(m => m.active !== true).length;

  const registerNewOrderRecord = (newOrder: CustomerOrder) => {
    const newOrderCount = totalOrdersCount + 1;
    setTotalOrdersCount(newOrderCount);
    localStorage.setItem('electro_orders_count', String(newOrderCount));

    const updatedRecords = [...orderRecords, { timestamp: Date.now() }];
    setOrderRecords(updatedRecords);
    localStorage.setItem('electro_order_records', JSON.stringify(updatedRecords));

    const updatedCustomerOrders = [newOrder, ...customerOrders];
    setCustomerOrders(updatedCustomerOrders);
    localStorage.setItem('electro_customer_orders', JSON.stringify(updatedCustomerOrders));
  };

  const getChartData = () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
   
    if (chartInterval === 'day') {
      const todayStart = new Date().setHours(0,0,0,0);
      const countToday = orderRecords.filter(r => r.timestamp >= todayStart).length;
      return [{ label: 'اليوم', count: countToday }];
    } else if (chartInterval === 'week') {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now - i * oneDay);
        const dayStart = new Date(d.setHours(0,0,0,0)).getTime();
        const dayEnd = dayStart + oneDay;
        const count = orderRecords.filter(r => r.timestamp >= dayStart && r.timestamp < dayEnd).length;
        days.push({ label: d.toLocaleDateString('ar', { weekday: 'short' }), count });
      }
      return days;
    } else if (chartInterval === 'month') {
      const weeks = [];
      for (let i = 3; i >= 0; i--) {
        const start = now - (i + 1) * 7 * oneDay;
        const end = now - i * 7 * oneDay;
        const count = orderRecords.filter(r => r.timestamp >= start && r.timestamp < end).length;
        weeks.push({ label: `أسبوع ${4 - i}`, count });
      }
      return weeks;
    } else {
      const months = [];
      const currentYear = new Date().getFullYear();
      for (let m = 0; m < 12; m++) {
        const count = orderRecords.filter(r => {
          const rDate = new Date(r.timestamp);
          return rDate.getFullYear() === currentYear && rDate.getMonth() === m;
        }).length;
        const monthName = new Date(currentYear, m, 1).toLocaleDateString('ar', { month: 'short' });
        months.push({ label: monthName, count });
      }
      return months;
    }
  };

  const currentChartData = getChartData();
  const maxChartCount = Math.max(...currentChartData.map(d => d.count), 5);

  const checkout = () => {
    if (cart.length === 0) return alert('السلة فارغة');
    if (!customerName || !customerPhone1 || customerWilayaCode === '' || !customerTown || !customerAddress) {
      return alert('الرجاء إكمال كافة معلومات الزبون الإجبارية.');
    }

    const orderItems = cart.map(item => ({
      productName: item.product.name,
      quantity: item.quantity,
      price: item.product.price + item.customCommission
    }));

    const newOrder: CustomerOrder = {
      id: Date.now(),
      customerName,
      customerPhone1,
      wilaya: `${selectedWilayaObj?.code} - ${selectedWilayaObj?.name}`,
      town: customerTown,
      address: customerAddress,
      items: orderItems,
      grandTotal,
      date: new Date().toLocaleString('ar'),
      status: 'قيد الانتظار'
    };

    registerNewOrderRecord(newOrder);

    setCart([]);
    setOrderSuccessMessage('تم الشراء بنجاح! شكراً لك 🎉');
    setTimeout(() => setOrderSuccessMessage(null), 5000);
  };

  const expressCheckoutForProduct = (product: Product) => {
    if (!customerName || !customerPhone1 || customerWilayaCode === '' || !customerTown || !customerAddress) {
      return alert('الرجاء إكمال كافة معلومات التوصيل في نموذج الطلب السريع.');
    }

    const orderItems = [{
      productName: product.name,
      quantity: 1,
      price: product.price
    }];

    const expressGrandTotal = product.price + deliveryCost;

    const newOrder: CustomerOrder = {
      id: Date.now(),
      customerName,
      customerPhone1,
      wilaya: `${selectedWilayaObj?.code} - ${selectedWilayaObj?.name}`,
      town: customerTown,
      address: customerAddress,
      items: orderItems,
      grandTotal: expressGrandTotal,
      date: new Date().toLocaleString('ar'),
      status: 'قيد الانتظار'
    };

    registerNewOrderRecord(newOrder);

    setOrderSuccessMessage('تم الشراء بنجاح! شكراً لك 🎉');
    setTimeout(() => setOrderSuccessMessage(null), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans relative overflow-x-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
     
      {viewMode === 'welcome' ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center relative">
          <div className="absolute top-6 flex items-center gap-3">
            <img
              src="https://cdn.phototourl.com/member/2026-09-19-156291c4-7bd3-44fa-8f02-fbabb8effaed.jpg"
              alt="Electro Market Logo"
              className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400 shadow-xl shadow-cyan-500/30"
            />
          </div>

          <div className="max-w-3xl space-y-6 pt-12">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {lang === 'ar' ? 'ابدأ عملك التجاري بدون رأس مال واربح عمولات ضخمة معنا' : lang === 'fr' ? 'Démarrez votre business sans capital et gagnez de superbes commissions' : 'Start your business without capital and earn huge commissions with us'}
            </h1>
            <p className="text-slate-300 text-base md:text-lg">
              {t.subtitle}
            </p>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              {lang === 'ar' ? 'نحن نتكفل بالتخزين، التغليف، والتوصيل لجميع ولايات الوطن (69 ولاية). اختر المنتجات، روج لها، واقبض أرباحك فور تأكيد الطلبات!' : lang === 'fr' ? 'Nous gérons le stockage, l\'emballage et la livraison dans les 58 wilayas. Choisissez vos produits et encaissez vos profits !' : 'We handle storage, packaging, and delivery to all 58 wilayas. Choose products, promote them, and get paid instantly!'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                onClick={() => setViewMode('store')}
                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl border border-slate-800 shadow-xl transition text-base"
              >
                {lang === 'ar' ? ' تصفح المتجر ' : lang === 'fr' ? ' Visiter la boutique' : ' Browse Store'}
              </button>
             
              <button
                onClick={() => { setShowAuthModal(true); setAuthType('register'); }}
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-2xl shadow-xl shadow-cyan-500/25 transition text-base"
              >
                {lang === 'ar' ? ' تسجيل كمسوق ' : lang === 'fr' ? ' Espace Affilié / Connexion' : ' Marketer / Dashboard Login'}
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 text-xs text-slate-500">
            {t.footerText}
          </div>
        </div>
      ) : (
        <>
          <header className="p-4 md:p-6 flex justify-between items-center max-w-7xl mx-auto w-full border-b border-slate-900">
            <div className="flex items-center gap-2">
              <button
                onClick={openCart}
                className="relative p-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-2xl transition shadow-lg shadow-cyan-500/25 flex items-center justify-center"
                title="سلة المشتريات"
              >
                <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950">
                    {cart.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex flex-col justify-center items-center gap-1 p-3 bg-cyan-600 hover:bg-cyan-500 rounded-2xl transition shadow-lg shadow-cyan-500/25 w-11 h-11"
                aria-label="Menu"
              >
                <span className="w-5 h-0.5 bg-slate-950 rounded-full font-bold"></span>
                <span className="w-5 h-0.5 bg-slate-950 rounded-full font-bold"></span>
                <span className="w-5 h-0.5 bg-slate-950 rounded-full font-bold"></span>
              </button>

              <div className="relative flex items-center bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-2xl shadow-lg shadow-cyan-500/25 px-3 py-2.5 cursor-pointer">
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as 'ar' | 'fr' | 'en')}
                  className="bg-transparent text-slate-950 font-black text-xs md:text-sm outline-none cursor-pointer appearance-none pr-5 pl-1"
                >
                  <option value="ar" className="bg-slate-900 text-white">ع</option>
                  <option value="fr" className="bg-slate-900 text-white">FR</option>
                  <option value="en" className="bg-slate-900 text-white">EN</option>
                </select>
                <span className="absolute left-2 text-slate-950 text-[10px] pointer-events-none font-bold">▼</span>
              </div>
            </div>

            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelectedProduct(null); setViewMode('welcome'); setShowDashboard(false); }}>
              <span className="font-black text-cyan-400 text-lg md:text-xl tracking-wider uppercase font-sans hidden sm:inline">
                ELECTRO MARKET
              </span>
              <img
                src="https://cdn.phototourl.com/member/2026-09-19-156291c4-7bd3-44fa-8f02-fbabb8effaed.jpg"
                alt="Electro Market Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500 shadow-md shadow-cyan-500/20"
              />
            </div>
          </header>

          <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-6 space-y-6">
            {showDashboard ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-black text-cyan-400">⚙ {t.menuDashboard}</h2>
                  <button onClick={() => setShowDashboard(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition">
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs text-slate-400">{lang === 'ar' ? 'إجمالي زوار الموقع هذا الشهر' : 'Total Visitors This Month'}</span>
                    <span className="text-2xl font-black text-cyan-400 mt-2">{monthlyVisitors}</span>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs text-slate-400">{lang === 'ar' ? 'إجمالي الطلبيات هذا الشهر' : 'Total Orders This Month'}</span>
                    <span className="text-2xl font-black text-emerald-400 mt-2">{totalOrdersCount}</span>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs text-slate-400">Conversion Rate</span>
                    <span className="text-2xl font-black text-amber-400 mt-2">{conversionRate}%</span>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
                    <span className="text-xs text-cyan-400 font-bold">{lang === 'ar' ? '👥 إجمالي المسوقين المشتركين' : 'Total Marketers'}</span>
                    <span className="text-2xl font-black text-cyan-300 mt-2">{totalMarketersCount}</span>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
                    <span className="text-xs text-emerald-400 font-bold">{lang === 'ar' ? '🟢 الحسابات النشطة' : 'Active Marketers'}</span>
                    <span className="text-2xl font-black text-emerald-300 mt-2">{activeMarketersCount}</span>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-2xl border border-rose-500/30 flex flex-col justify-between">
                    <span className="text-xs text-rose-400 font-bold">{lang === 'ar' ? '🔴 الحسابات غير النشطة' : 'Inactive Marketers'}</span>
                    <span className="text-2xl font-black text-rose-300 mt-2">{inactiveMarketersCount}</span>
                  </div>
                </div>

                {/* قسم إدارة الطلبيات الواردة */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-black text-cyan-400">📦 الطلبيات الواردة من الزبائن ({customerOrders.length})</h3>
                  {customerOrders.length === 0 ? (
                    <p className="text-xs text-slate-400">لا توجد طلبيات جديدة حالياً.</p>
                  ) : (
                    <div className="space-y-4">
                      {customerOrders.map(order => (
                        <div key={order.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{order.customerName}</span>
                              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded font-mono">{order.customerPhone1}</span>
                            </div>
                            <p className="text-xs text-slate-400">📍 الولاية: {order.wilaya} | البلدية: {order.town} | العنوان: {order.address}</p>
                            <div className="text-xs text-emerald-400 font-bold">المبلغ الإجمالي: {order.grandTotal} DZD</div>
                            <div className="text-[11px] text-slate-500">تاريخ الطلب: {order.date}</div>
                            <div className="pt-1">
                              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">المنتجات: {order.items.map(i => `${i.productName} (×${i.quantity})`).join(', ')}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                            <a
                              href={`https://wa.me/213${order.customerPhone1.replace(/^0/, '')}?text=مرحباً ${order.customerName}، لقد تلقينا طلبيتك عبر Electro Market ونحن بصدد إرسالها لك.`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                            >
                              إرسال الطلبية واتساب 📲
                            </a>
                            <button
                              onClick={() => handleDeleteCustomerOrder(order.id)}
                              className="px-3 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl text-xs font-bold transition"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-4">
                    <div>
                      <h3 className="text-base font-black text-cyan-400">📈 منحنى إنجازات الطلبيات</h3>
                      <p className="text-xs text-slate-400">تتبع حجم مبيعاتك وعدد الطلبيات</p>
                    </div>

                    <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 gap-1">
                      {(['day', 'week', 'month', 'year'] as const).map((interval) => (
                        <button
                          key={interval}
                          onClick={() => setChartInterval(interval)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${chartInterval === interval ? 'bg-cyan-600 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                        >
                          {interval === 'day' ? 'اليوم' : interval === 'week' ? 'الأسبوع' : interval === 'month' ? 'الشهر' : 'السنة'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-64 flex items-end gap-3 pt-8 pb-2 px-2 overflow-x-auto border-b border-slate-900">
                    {currentChartData.map((item, index) => {
                      const heightPercent = Math.max((item.count / maxChartCount) * 100, 8);
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2 min-w-[45px] h-full justify-end group">
                          <span className="text-[10px] text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition">{item.count}</span>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-xl transition-all duration-500 hover:brightness-125 shadow-lg shadow-cyan-500/20 relative"
                          >
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-black text-white bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                              {item.count} طلبية
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-bold truncate max-w-full">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-400 px-2">
                    <span>إجمالي الفترة الحالية: <strong className="text-cyan-400">{currentChartData.reduce((acc, curr) => acc + curr.count, 0)} طلبية</strong></span>
                    <span>أعلى إنجاز في النقطة: <strong className="text-emerald-400">{Math.max(...currentChartData.map(d => d.count), 0)} طلبية</strong></span>
                  </div>
                </div>

                <form onSubmit={handleAddOrUpdateProduct} className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white">
                      {editingProductId !== null ? '✏️ تعديل المنتج' : '➕ إضافة منتج جديد'}
                    </h3>
                    {editingProductId !== null && (
                      <button type="button" onClick={handleCancelEdit} className="text-xs text-amber-400 hover:underline">
                        إلغاء التعديل
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="اسم المنتج *" value={newProdName} onChange={e => setNewProdName(e.target.value)} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm" />
                    <input type="number" placeholder="السعر (DZD) *" value={newProdPrice} onChange={e => setNewProdPrice(e.target.value)} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm" />
                    <input type="number" placeholder="قيمة العمولة (DZD)" value={newProdComm} onChange={e => setNewProdComm(e.target.value)} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm" />
                    <select value={newProdCat} onChange={e => setNewProdCat(e.target.value)} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm">
                      {categories.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                 
                  <textarea
                    placeholder="وصف المنتج..."
                    value={newProdDesc}
                    onChange={e => setNewProdDesc(e.target.value)}
                    rows={3}
                    className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
                  />

                  <div className="space-y-2">
                    <label className="text-xs text-cyan-400 font-bold block">رفع الصور من الجهاز (حد أقصى 20 صورة):</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-600 file:text-slate-950 hover:file:bg-cyan-500 cursor-pointer"
                    />
                    <div className="text-xs text-slate-400">الصور المختارة: {newProdImages.length} / 20</div>
                   
                    {newProdImages.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto py-2">
                        {newProdImages.map((img, idx) => (
                          <img key={idx} src={img} alt="preview" className="w-16 h-16 object-cover rounded-xl border border-slate-700 flex-shrink-0" />
                        ))}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition shadow-lg shadow-cyan-600/20">
                    {editingProductId !== null ? 'حفظ التعديلات' : 'إضافة المنتج للمتجر'}
                  </button>
                </form>

                <div className="space-y-3 pt-4">
                  <h3 className="text-sm font-bold text-white">المنتجات ({products.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(p => (
                      <div key={p.id} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-sm text-white truncate">{p.name}</h4>
                          <p className="text-xs text-cyan-400">{p.price} DZD</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleStartEdit(p)} className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-white rounded-xl transition text-xs font-bold">تعديل</button>
                          <button onClick={() => handleDeleteProduct(p.id)} className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition text-xs font-bold">حذف</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : selectedProduct ? (
              <div className="space-y-8">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-800"
                >
                  ←
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                 
                  <div className="lg:col-span-7 space-y-4">
                    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl">
                      <div className="w-full h-80 md:h-[450px] rounded-2xl overflow-hidden bg-slate-950 mb-4">
                        <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" />
                      </div>

                      {selectedProduct.images.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {selectedProduct.images.map((img, idx) => (
                            <div key={idx} className="h-24 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer hover:border-cyan-400 transition">
                              <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl space-y-6">
                     
                      <div className="space-y-2 border-b border-slate-800 pb-4">
                        <span className="text-xs bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full font-bold">
                          {selectedProduct.category}
                        </span>
                        <h1 className="text-xl md:text-2xl font-black text-white pt-2">{selectedProduct.name}</h1>
                        <div className="text-2xl font-black text-cyan-400">{selectedProduct.price} DZD</div>
                       
                        <div className="text-xs text-slate-300 pt-2 space-y-1">
                          <p>{selectedProduct.description || 'مواصفات عالية الجودة.'}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-black text-cyan-400 flex items-center gap-2">
                          <span>⚡</span> {t.expressOrder}
                        </h3>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                            <span className="text-slate-400">السعر:</span>
                            <span className="font-bold text-white">{selectedProduct.price} DZD</span>
                          </div>

                          <div className="flex justify-between items-center text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                            <span className="text-slate-400">{t.deliveryCost}</span>
                            <span className="font-bold text-emerald-400">{deliveryCost} DZD</span>
                          </div>

                          <div className="flex justify-between items-center text-sm bg-slate-950 p-3.5 rounded-xl border border-cyan-500/30">
                            <span className="font-bold text-cyan-400">{t.grandTotal}</span>
                            <span className="font-black text-cyan-400">{selectedProduct.price + deliveryCost} DZD</span>
                          </div>

                          <div className="space-y-3 pt-2">
                            <input
                              type="text"
                              placeholder={t.fullName}
                              value={customerName}
                              onChange={e => setCustomerName(e.target.value)}
                              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                            />
                            <input
                              type="text"
                              placeholder={t.phone1}
                              value={customerPhone1}
                              onChange={e => setCustomerPhone1(e.target.value)}
                              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                            />
                            <select
                              value={customerWilayaCode}
                              onChange={e => setCustomerWilayaCode(Number(e.target.value))}
                              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                            >
                              <option value="">{t.selectWilaya}</option>
                              {deliveryRates.map(w => <option key={w.code} value={w.code}>{w.code}. {w.name}</option>)}
                            </select>
                            <input
                              type="text"
                              placeholder={t.town}
                              value={customerTown}
                              onChange={e => setCustomerTown(e.target.value)}
                              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                            />
                            <input
                              type="text"
                              placeholder={t.address}
                              value={customerAddress}
                              onChange={e => setCustomerAddress(e.target.value)}
                              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                            />
                          </div>

                          <button
                            onClick={() => expressCheckoutForProduct(selectedProduct)}
                            className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-xl transition shadow-lg shadow-cyan-600/20 text-sm mt-2"
                          >
                            {t.checkoutBtn}
                          </button>

                          {orderSuccessMessage && (
                            <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 p-3 rounded-xl text-center font-bold text-xs shadow-md animate-pulse">
                              {orderSuccessMessage}
                            </div>
                          )}

                          <button
                            onClick={() => addToCart(selectedProduct)}
                            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition text-xs"
                          >
                            {t.addToCart}
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                <div className="space-y-4 pt-6 border-t border-slate-900">
                  <h3 className="text-lg font-black text-white">{t.relatedProducts}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products
                      .filter(p => p.id !== selectedProduct.id)
                      .slice(0, 4)
                      .map(product => (
                        <div
                          key={product.id}
                          onClick={() => { setSelectedProduct(product); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group cursor-pointer"
                        >
                          <div>
                            <div className="h-48 overflow-hidden relative bg-slate-800">
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-4 space-y-2">
                              <h4 className="font-bold text-white text-base line-clamp-1">{product.name}</h4>
                              <div className="text-lg font-black text-cyan-400">{product.price} DZD</div>
                            </div>
                          </div>
                          <div className="p-4 pt-0">
                            <span className="block text-center w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl font-bold text-xs transition">
                              عرض التفاصيل
                            </span>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <>
                <div className="w-full max-w-4xl mx-auto px-2 pt-2">
                  <div className="relative flex items-center shadow-2xl shadow-cyan-950/20 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/95">
                    <span className="absolute right-4 text-cyan-400 pointer-events-none">🔍</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className="w-full py-4 pr-12 pl-4 bg-transparent text-white placeholder-slate-400 text-sm md:text-base font-medium outline-none"
                    />
                  </div>
                </div>

                <div className="w-full flex items-center gap-4 py-4 overflow-hidden border-b border-slate-900/50">
                  <button
                    onClick={() => setSelectedCategory(staticCategory.name)}
                    className={`flex flex-col items-center gap-3 min-w-[100px] md:min-w-[130px] p-2 rounded-2xl transition flex-shrink-0 bg-slate-950 ${selectedCategory === staticCategory.name ? 'scale-105' : 'opacity-90'}`}
                  >
                    <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 bg-slate-900 flex items-center justify-center ${selectedCategory === staticCategory.name ? 'border-cyan-400 shadow-xl' : 'border-slate-800'}`}>
                      <img src={staticCategory.image} alt={staticCategory.name} className="w-full h-full object-cover scale-110" />
                    </div>
                    <span className="text-xs md:text-sm font-bold text-cyan-400">{lang === 'ar' ? 'الكل' : lang === 'fr' ? 'Tous' : 'All'}</span>
                  </button>

                  <div className="overflow-hidden w-full flex items-center">
                    <div className={`flex gap-6 md:gap-8 items-center w-full transition-all duration-1000 ${isTransitioning ? 'opacity-30' : 'opacity-100'}`}>
                      {categoryList.map((cat, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedCategory(cat.name)}
                          className="flex flex-col items-center gap-3 min-w-[100px] md:min-w-[130px] p-2 rounded-2xl flex-shrink-0"
                        >
                          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-slate-800 bg-slate-900 flex items-center justify-center">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover scale-110" />
                          </div>
                          <span className="text-xs md:text-sm font-bold text-slate-300">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => { setSelectedProduct(product); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="h-48 overflow-hidden relative bg-slate-800">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="font-bold text-white text-base line-clamp-1">{product.name}</h3>
                          {product.description && (
                            <p className="text-xs text-slate-400 line-clamp-2">{product.description}</p>
                          )}
                          <div className="pt-2">
                            <span className="text-xl font-black text-cyan-400">{product.price} DZD</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 pt-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-sm transition shadow-lg shadow-cyan-600/20"
                        >
                          {t.addToCart}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>

          {/* الفوتر في أقصى أسفل المتجر (مكان دائرة 'صح' بالضبط) */}
          <footer className="w-full py-6 border-t border-slate-900 bg-slate-950 flex flex-col items-center gap-3 mt-12">
            <div className="flex items-center gap-3">
              <a href="https://wa.me/213000000000" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-white transition shadow-lg font-bold">
                📱
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition shadow-lg font-bold">
                f
              </a>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {t.footerText}
            </div>
          </footer>
        </>
      )}

      {showCartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCartModal(false)}></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h2 className="text-xl font-black text-white">🛒 {t.cartTitle}</h2>
              <button onClick={() => setShowCartModal(false)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-slate-400 text-sm py-4 text-center">{t.emptyCart}</p>
            ) : (
              <>
                <div className="space-y-4 border-b border-slate-800 pb-4">
                  <h3 className="text-sm font-bold text-cyan-400">المنتجات في السلة:</h3>
                  {cart.map((item, i) => (
                    <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-sm text-white">{item.product.name}</h4>
                          <p className="text-xs text-slate-400">السعر الأساسي: {item.product.price} DZD</p>
                        </div>
                      </div>
                     
                      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-end">
                        <div className="text-xs text-slate-300 w-full sm:w-auto">
                          <label className="block text-[11px] text-cyan-400 mb-1">زيادة السعر للزبون (ربحك):</label>
                          <input
                            type="number"
                            value={item.customCommission}
                            onChange={(e) => updateCustomCommission(item.product.id, Number(e.target.value))}
                            placeholder="0"
                            className="w-full sm:w-28 p-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-bold"
                          />
                        </div>
                        <div className="text-left font-black text-cyan-400 text-sm pt-4 sm:pt-0">
                          المجموع: {(item.product.price + item.customCommission) * item.quantity} DZD
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-cyan-400">{t.customerInfo}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder={t.fullName} value={customerName} onChange={e => setCustomerName(e.target.value)} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm" />
                    <input type="text" placeholder={t.phone1} value={customerPhone1} onChange={e => setCustomerPhone1(e.target.value)} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm" />
                    <select value={customerWilayaCode} onChange={e => setCustomerWilayaCode(Number(e.target.value))} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm">
                      <option value="">{t.selectWilaya}</option>
                      {deliveryRates.map(w => <option key={w.code} value={w.code}>{w.code}. {w.name}</option>)}
                    </select>
                    <input type="text" placeholder={t.town} value={customerTown} onChange={e => setCustomerTown(e.target.value)} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm" />
                  </div>
                  <input type="text" placeholder={t.address} value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm" />
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm space-y-1">
                      <div>{t.productTotal} <span className="font-bold text-white">{totalPrice} DZD</span></div>
                      <div>{t.deliveryCost} <span className="font-bold text-white">{deliveryCost} DZD</span></div>
                      <div className="text-base font-black text-cyan-400">{t.grandTotal} {grandTotal} DZD</div>
                    </div>
                    <button onClick={() => { checkout(); }} className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-base shadow-lg transition">
                      {t.checkoutBtn}
                    </button>
                  </div>

                  {orderSuccessMessage && (
                    <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 p-3 rounded-xl text-center font-bold text-xs shadow-md animate-pulse">
                      {orderSuccessMessage}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAuthModal(false)}></div>
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl z-10 space-y-6">
           
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black text-cyan-400">
                {authType === 'register' ? 'إنشاء حساب' : 'تسجيل دخول'}
              </h3>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
            </div>

            {authType === 'register' ? (
              <div className="space-y-4">
                <input type="text" placeholder="الاسم الكامل *" value={regName} onChange={e => setRegName(e.target.value)} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm" />
                <input type="text" placeholder="رقم الهاتف *" value={regPhone} onChange={e => setRegPhone(e.target.value)} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm" />
                <input type="email" placeholder="البريد الإلكتروني *" value={regEmail} onChange={e => setRegEmail(e.target.value)} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm" />
                <input type="text" placeholder="المدينة / الولاية *" value={regCity} onChange={e => setRegCity(e.target.value)} className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm" />
               
                <button
                  onClick={() => {
                    if (!regName || !regPhone || !regEmail) return alert('الرجاء إكمال المعلومات.');
                   
                    const newMarketerObj: Marketer = {
                      name: regName,
                      phone: regPhone,
                      email: regEmail,
                      address: '',
                      city: regCity,
                      commune: '',
                      code: 'REF' + Math.floor(100 + Math.random() * 900),
                      active: true
                    };
                    const updatedList = [...marketersList, newMarketerObj];
                    setMarketersList(updatedList);
                    localStorage.setItem('electro_marketers_list', JSON.stringify(updatedList));

                    alert('تم التسجيل بنجاح!');
                    setShowAuthModal(false);
                  }}
                  className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-xl transition"
                >
                  تأكيد
                </button>

                <div className="text-center pt-2">
                  <button onClick={() => setAuthType('login')} className="text-xs text-cyan-400 hover:underline">
                    لديك حساب؟ تسجيل الدخول
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />

                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    setViewMode('store');
                    setShowDashboard(true);
                  }}
                  className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-xl transition"
                >
                  تسجيل دخول
                </button>

                <div className="text-center pt-2">
                  <button onClick={() => setAuthType('register')} className="text-xs text-cyan-400 hover:underline">
                    إنشاء حساب
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="relative w-80 max-w-[85%] bg-slate-900 border-r border-slate-800 h-full shadow-2xl flex flex-col p-4 z-10 overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-4">
              <span className="text-cyan-400 font-black text-lg">ELECTRO MARKET</span>
              <button onClick={() => setIsSidebarOpen(false)} className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold">✕</button>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { name: t.menuHome, icon: '🏠', action: () => { setSelectedProduct(null); setViewMode('store'); setShowDashboard(false); setIsSidebarOpen(false); } },
                { name: t.menuSupport, icon: '🎧', action: () => { setIsSidebarOpen(false); } },
                { name: t.menuPurchases, icon: '🛒', action: () => { setIsSidebarOpen(false); openCart(); } },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="flex items-center justify-between bg-slate-950 hover:bg-slate-800 text-slate-200 p-3 rounded-2xl transition text-sm font-bold px-4 border border-slate-800"
                >
                  <span className="flex items-center gap-3">
                    <span className="bg-slate-900 w-8 h-8 rounded-xl flex items-center justify-center text-xs text-cyan-400">{item.icon}</span>
                    {item.name}
                  </span>
                  <span className="text-slate-500 text-xs">‹</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

