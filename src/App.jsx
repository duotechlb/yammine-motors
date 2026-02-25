import { useState, useEffect, useRef } from "react";

// ----- TRANSLATIONS -----
const translations = {
  en: {
    appName: "Yammine Motors",
    home: "Home",
    inventory: "Cars",
    chat: "Chat",
    inbox: "Inbox",
    profile: "Profile",
    admin: "Admin",
    logout: "Logout",
    login: "Sign In",
    register: "Create Account",
    email: "Email address",
    password: "Password",
    fullName: "Full name",
    demoHint: "Demo — Client: client@demo.com / demo123\nDemo — Admin: admin@yammine.com / admin123",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    browseInventory: "Browse Inventory",
    contactOwner: "Contact Maykel",
    featuredCars: "Featured Cars",
    handPicked: "Hand-picked by Maykel",
    viewAll: "View All →",
    inStock: "In Stock",
    openAirShowroom: "Open Air Showroom",
    directChat: "Direct with Owner",
    carInventory: "Car Inventory",
    carsFound: "cars found",
    searchPlaceholder: "Search make, model...",
    filterBrand: "All Brands",
    filterStatus: "All Status",
    currency: "USD/LBP",
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
    details: "Details",
    year: "Year",
    mileage: "Mileage",
    fuel: "Fuel",
    transmission: "Transmission",
    color: "Color",
    engine: "Engine",
    owners: "Owners",
    description: "Description",
    chatWithMaykel: "Chat with Maykel",
    favorite: "Favorite",
    communityChat: "Community Chat",
    openToAll: "Open to all Yammine Motors clients",
    typeMessage: "Type a message...",
    send: "Send",
    privateChat: "Private Chat",
    directWithMaykel: "Direct conversation with Maykel Yammine",
    usuallyReplies: "Usually replies within an hour",
    askAboutCar: "Ask about a car...",
    profileTitle: "My Profile",
    clientAccount: "Client Account",
    favorites: "Favorites",
    savedCars: "saved cars",
    chats: "Chats",
    activeConversation: "active conversation",
    viewed: "Viewed",
    recentlyBrowsed: "Recently browsed cars",
    alerts: "Alerts",
    priceDrop: "Price drop notifications",
    savedCarsTitle: "Saved Cars",
    signOut: "Sign Out",
    welcomeBack: "Welcome back, Maykel. Here's your showroom overview.",
    totalCars: "Total Cars",
    recentListings: "Recent Listings",
    car: "Car",
    price: "Price",
    status: "Status",
    actions: "Actions",
    addNewCar: "+ Add New Car",
    edit: "Edit",
    delete: "Delete",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    addCar: "Add Car",
    editCar: "Edit Car",
    messages: "Messages",
    privateConversations: "Private conversations from your clients.",
    active: "Active",
    confirmDelete: "Are you sure?",
    make: "Make",
    model: "Model",
    yes: "Yes",
    no: "No",
    makePlaceholder: "e.g. BMW",
    modelPlaceholder: "e.g. 5 Series",
    yearPlaceholder: "e.g. 2023",
    pricePlaceholder: "e.g. 42000",
    mileagePlaceholder: "e.g. 15000",
    enginePlaceholder: "e.g. 2.0L Turbo",
    colorPlaceholder: "e.g. Alpine White",
    descriptionPlaceholder: "Car description...",
    contactViaWhatsApp: "Contact on WhatsApp",
  },
  ar: {
    appName: "يامين موتورز",
    home: "الرئيسية",
    inventory: "السيارات",
    chat: "المجتمع",
    inbox: "الرسائل",
    profile: "الملف",
    admin: "الإدارة",
    logout: "تسجيل خروج",
    login: "تسجيل دخول",
    register: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    fullName: "الاسم الكامل",
    demoHint: "تجربة — عميل: client@demo.com / demo123\nإداري: admin@yammine.com / admin123",
    noAccount: "ليس لديك حساب؟",
    haveAccount: "لديك حساب بالفعل؟",
    browseInventory: "تصفح السيارات",
    contactOwner: "تواصل مع ميكائيل",
    featuredCars: "سيارات مميزة",
    handPicked: "اختارها ميكائيل",
    viewAll: "عرض الكل ←",
    inStock: "متوفر",
    openAirShowroom: "معرض مفتوح",
    directChat: "تواصل مباشر",
    carInventory: "قائمة السيارات",
    carsFound: "سيارة متوفرة",
    searchPlaceholder: "ابحث عن ماركة، موديل...",
    filterBrand: "جميع الماركات",
    filterStatus: "جميع الحالات",
    currency: "دولار/ليرة",
    available: "متوفر",
    reserved: "محجوز",
    sold: "مباع",
    details: "التفاصيل",
    year: "السنة",
    mileage: "عدد الكيلومترات",
    fuel: "الوقود",
    transmission: "ناقل الحركة",
    color: "اللون",
    engine: "المحرك",
    owners: "الملاك السابقون",
    description: "الوصف",
    chatWithMaykel: "راسل ميكائيل",
    favorite: "المفضلة",
    communityChat: "الدردشة العامة",
    openToAll: "متاحة لجميع عملاء يامين موتورز",
    typeMessage: "اكتب رسالة...",
    send: "إرسال",
    privateChat: "دردشة خاصة",
    directWithMaykel: "محادثة مباشرة مع ميكائيل يامين",
    usuallyReplies: "عادة يرد خلال ساعة",
    askAboutCar: "اسأل عن سيارة...",
    profileTitle: "ملفي الشخصي",
    clientAccount: "حساب عميل",
    favorites: "المفضلة",
    savedCars: "سيارات محفوظة",
    chats: "الدردشات",
    activeConversation: "محادثة نشطة",
    viewed: "شوهدت",
    recentlyBrowsed: "سيارات تم تصفحها مؤخراً",
    alerts: "تنبيهات",
    priceDrop: "إشعارات انخفاض الأسعار",
    savedCarsTitle: "السيارات المحفوظة",
    signOut: "تسجيل خروج",
    welcomeBack: "مرحباً ميكائيل. هذه نظرة عامة على معرضك.",
    totalCars: "إجمالي السيارات",
    recentListings: "أحدث الإضافات",
    car: "السيارة",
    price: "السعر",
    status: "الحالة",
    actions: "إجراءات",
    addNewCar: "+ إضافة سيارة",
    edit: "تعديل",
    delete: "حذف",
    saveChanges: "حفظ التغييرات",
    cancel: "إلغاء",
    addCar: "إضافة",
    editCar: "تعديل السيارة",
    messages: "الرسائل",
    privateConversations: "محادثات خاصة من عملائك.",
    active: "نشط",
    confirmDelete: "هل أنت متأكد؟",
    make: "الماركة",
    model: "الموديل",
    yes: "نعم",
    no: "لا",
    makePlaceholder: "مثال: بي إم دبليو",
    modelPlaceholder: "مثال: الفئة الخامسة",
    yearPlaceholder: "مثال: 2023",
    pricePlaceholder: "مثال: 42000",
    mileagePlaceholder: "مثال: 15000",
    enginePlaceholder: "مثال: 2.0 لتر تيربو",
    colorPlaceholder: "مثال: أبيض",
    descriptionPlaceholder: "وصف السيارة...",
    contactViaWhatsApp: "تواصل عبر واتساب",
  }
};

// ----- CAR DATA (unchanged) -----
const CARS_DATA = [
  { id: 1, make: "Mercedes-Benz", model: "C 300", year: 2022, price: 38500, priceLBP: 3465000000, mileage: 22000, fuel: "Petrol", transmission: "Automatic", color: "Obsidian Black", engine: "2.0L Turbo", owners: 1, status: "available", featured: true, description: "Pristine condition, full service history. Panoramic roof, Burmester sound system, AMG package.", images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80","https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80"] },
  { id: 2, make: "BMW", model: "5 Series 530i", year: 2021, price: 42000, priceLBP: 3780000000, mileage: 31000, fuel: "Petrol", transmission: "Automatic", color: "Alpine White", engine: "2.0L TwinPower", owners: 1, status: "available", featured: true, description: "Executive edition. Harman Kardon audio, heated seats, live cockpit pro navigation.", images: ["https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80","https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"] },
  { id: 3, make: "Audi", model: "Q7 Quattro", year: 2023, price: 61000, priceLBP: 5490000000, mileage: 9000, fuel: "Petrol", transmission: "Automatic", color: "Daytona Grey", engine: "3.0L V6 TFSI", owners: 1, status: "available", featured: true, description: "Nearly new. 7-seat luxury SUV, virtual cockpit plus, Bang & Olufsen 3D sound.", images: ["https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80","https://images.unsplash.com/photo-1605559424843-9073730702d7?w=800&q=80"] },
  { id: 4, make: "Range Rover", model: "Sport HSE", year: 2020, price: 55000, priceLBP: 4950000000, mileage: 48000, fuel: "Diesel", transmission: "Automatic", color: "Santorini Black", engine: "3.0L SDV6", owners: 2, status: "available", featured: false, description: "Full option, air suspension, meridian surround sound, panoramic sunroof.", images: ["https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80","https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&q=80"] },
  { id: 5, make: "Porsche", model: "Cayenne S", year: 2022, price: 78000, priceLBP: 7020000000, mileage: 18000, fuel: "Petrol", transmission: "Automatic", color: "Carrara White", engine: "2.9L V6 Twin-Turbo", owners: 1, status: "available", featured: false, description: "Sport Chrono package, PASM sport suspension, Bose surround sound.", images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80","https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"] },
  { id: 6, make: "Toyota", model: "Land Cruiser 300", year: 2023, price: 85000, priceLBP: 7650000000, mileage: 5000, fuel: "Petrol", transmission: "Automatic", color: "Midnight Black", engine: "3.5L V6 Twin-Turbo", owners: 1, status: "reserved", featured: false, description: "Brand new model year. E-KDSS, Multi-Terrain Select, JBL premium audio.", images: ["https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=80","https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80"] },
  { id: 7, make: "Volkswagen", model: "Golf GTI Mk8", year: 2023, price: 28000, priceLBP: 2520000000, mileage: 12000, fuel: "Petrol", transmission: "DSG 7-Speed", color: "Tornado Red", engine: "2.0L TSI 245hp", owners: 1, status: "available", featured: false, description: "Hot hatch icon. IQ.DRIVE assist, Harman Kardon, DCC adaptive chassis.", images: ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80","https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80"] },
  { id: 8, make: "Chevrolet", model: "Tahoe High Country", year: 2022, price: 68000, priceLBP: 6120000000, mileage: 27000, fuel: "Petrol", transmission: "Automatic 10-Speed", color: "Summit White", engine: "5.3L V8 EcoTec3", owners: 1, status: "sold", featured: false, description: "Full-size American luxury SUV. Super Cruise, Bose premium audio, captain's chairs.", images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80","https://images.unsplash.com/photo-1469285994282-454ceb49e63c?w=800&q=80"] },
];

// Messages (unchanged)
const MESSAGES_GENERAL = [
  { id: 1, sender: "Rami K.", text: "Anyone tried the new Audi Q7? Worth the price?", time: "10:24 AM", isAdmin: false },
  { id: 2, sender: "Maykel Yammine", text: "Just added it yesterday Rami — best car in the lot honestly. Come test drive this weekend!", time: "10:26 AM", isAdmin: true },
  { id: 3, sender: "Lara M.", text: "Is the BMW 530i still available?", time: "11:02 AM", isAdmin: false },
  { id: 4, sender: "Maykel Yammine", text: "Yes Lara, still available! Check the listing for full details.", time: "11:05 AM", isAdmin: true },
  { id: 5, sender: "Tony B.", text: "Can prices be negotiated?", time: "2:15 PM", isAdmin: false },
  { id: 6, sender: "Maykel Yammine", text: "Always room to talk Tony 😄 send me a private message", time: "2:17 PM", isAdmin: true },
];

const PRIVATE_CHATS = {
  "client": [
    { id: 1, sender: "You", text: "Hi Maykel, I'm interested in the Mercedes C300. Is it still available?", time: "Yesterday 3:12 PM", isMe: true },
    { id: 2, sender: "Maykel", text: "Yes it's still available! Great choice. Want to come for a test drive?", time: "Yesterday 3:45 PM", isMe: false },
    { id: 3, sender: "You", text: "Sure, when are you available this week?", time: "Yesterday 4:01 PM", isMe: true },
    { id: 4, sender: "Maykel", text: "Thursday or Friday afternoon works for me. The showroom is in Batroun open space.", time: "Yesterday 4:10 PM", isMe: false },
  ]
};

const DEMO_ACCOUNTS = {
  "client@demo.com": { password: "demo123", role: "client", name: "Ahmad Khalil", avatar: "AK" },
  "admin@yammine.com": { password: "admin123", role: "admin", name: "Maykel Yammine", avatar: "MY" },
};

// WhatsApp number (from images)
const WHATSAPP_NUMBER = "+9613000420"; // without spaces or +

export default function App() {
  const [language, setLanguage] = useState("en");
  const t = translations[language];
  const isRTL = language === "ar";

  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerMode, setRegisterMode] = useState(false);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [cars, setCars] = useState(CARS_DATA);
  const [selectedCar, setSelectedCar] = useState(null);
  const [carPhoto, setCarPhoto] = useState(0);
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMax] = useState(200000);
  const [searchQ, setSearchQ] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [favorites, setFavorites] = useState([]);
  const [generalMsgs, setGeneralMsgs] = useState(MESSAGES_GENERAL);
  const [genInput, setGenInput] = useState("");
  const [privateChats, setPrivateChats] = useState(PRIVATE_CHATS);
  const [privInput, setPrivInput] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [adminTab, setAdminTab] = useState("dashboard");
  const [editingCar, setEditingCar] = useState(null);
  const [showAddCar, setShowAddCar] = useState(false);
  const [newCar, setNewCar] = useState({ make:"", model:"", year:"", price:"", mileage:"", fuel:"Petrol", transmission:"Automatic", color:"", engine:"", description:"", status:"available" });
  const [toast, setToast] = useState(null);
  const chatRef = useRef(null);
  const privRef = useRef(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [generalMsgs]);
  useEffect(() => {
    if (privRef.current) privRef.current.scrollTop = privRef.current.scrollHeight;
  }, [privateChats]);

  const login = () => {
    const acc = DEMO_ACCOUNTS[loginEmail];
    if (!acc || acc.password !== loginPass) { setLoginError("Invalid email or password."); return; }
    setUser({ ...acc, email: loginEmail });
    setPage(acc.role === "admin" ? "adminDashboard" : "home");
    setLoginError("");
  };

  const register = () => {
    if (!regName || !regEmail || !regPass) { setLoginError("Please fill all fields."); return; }
    setUser({ role: "client", name: regName, avatar: regName.slice(0,2).toUpperCase(), email: regEmail });
    setPage("home");
    showToast("Welcome to Yammine Motors!");
  };

  const logout = () => { setUser(null); setPage("login"); setLoginEmail(""); setLoginPass(""); setMobileMenu(false); };

  const fmt = (price) => currency === "USD" ? `$${price.toLocaleString()}` : `${(price * 90000).toLocaleString()} LBP`;

  const filteredCars = cars.filter(c => {
    if (filterBrand !== "All" && c.make !== filterBrand) return false;
    if (filterStatus !== "All" && c.status !== filterStatus) return false;
    if (c.price > filterMax) return false;
    if (searchQ && !`${c.make} ${c.model} ${c.year}`.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const brands = ["All", ...new Set(cars.map(c => c.make))];

  const toggleFav = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const sendGeneral = () => {
    if (!genInput.trim()) return;
    setGeneralMsgs(prev => [...prev, { id: prev.length+1, sender: user.name, text: genInput, time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}), isAdmin: user.role === "admin" }]);
    setGenInput("");
  };

  const sendPrivate = () => {
    if (!privInput.trim()) return;
    const key = user.role === "admin" ? "client" : "client";
    setPrivateChats(prev => ({ ...prev, [key]: [...(prev[key]||[]), { id: Date.now(), sender: user.role === "admin" ? "Maykel" : "You", text: privInput, time: "Just now", isMe: true }] }));
    setPrivInput("");
    if (user.role !== "admin") {
      setTimeout(() => {
        setPrivateChats(prev => ({ ...prev, [key]: [...(prev[key]||[]), { id: Date.now()+1, sender: "Maykel", text: "Thanks for reaching out! I'll get back to you shortly.", time: "Just now", isMe: false }] }));
      }, 1200);
    }
  };

  const deleteCar = (id) => { setCars(prev => prev.filter(c => c.id !== id)); showToast("Car deleted.","error"); };

  const addCar = () => {
    if (!newCar.make || !newCar.model || !newCar.price) { showToast("Fill required fields.", "error"); return; }
    const img = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80";
    setCars(prev => [...prev, { ...newCar, id: Date.now(), year: parseInt(newCar.year)||2023, price: parseInt(newCar.price)||0, priceLBP: (parseInt(newCar.price)||0)*90000, mileage: parseInt(newCar.mileage)||0, owners: 1, featured: false, images: [img] }]);
    setShowAddCar(false); setNewCar({ make:"", model:"", year:"", price:"", mileage:"", fuel:"Petrol", transmission:"Automatic", color:"", engine:"", description:"", status:"available" });
    showToast("Car added successfully!");
  };

  const statusColor = s => s === "available" ? "#22c55e" : s === "reserved" ? "#f59e0b" : "#ef4444";
  const statusBg = s => s === "available" ? "#052e16" : s === "reserved" ? "#1c1400" : "#1f0000";

  // Styles (responsive)
  const S = {
    app: { fontFamily: "'Sora', sans-serif", background: "#070A0F", minHeight: "100vh", color: "#E8E2D9", direction: isRTL ? "rtl" : "ltr" },
    loginWrap: { minHeight: "100vh", background: "linear-gradient(135deg, #070A0F 0%, #0D1520 50%, #070A0F 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", position:"relative", overflow:"hidden" },
    loginCard: { background: "rgba(255,255,255,0.04)", backdropFilter:"blur(20px)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:"20px", padding:"48px 40px", width:"100%", maxWidth:"420px", position:"relative", zIndex:2 },
    loginLogo: { textAlign:"center", marginBottom:"36px" },
    loginTitle: { fontFamily:"'Playfair Display', serif", fontSize:"28px", fontWeight:700, color:"#E8E2D9", textAlign:"center", marginBottom:"6px" },
    loginSub: { color:"#8A8070", fontSize:"13px", textAlign:"center", marginBottom:"32px" },
    input: { width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px", padding:"13px 16px", color:"#E8E2D9", fontSize:"14px", outline:"none", boxSizing:"border-box", marginBottom:"14px", transition:"border 0.2s" },
    btnGold: { width:"100%", background:"linear-gradient(135deg, #C9A84C, #E8C96A)", color:"#070A0F", border:"none", borderRadius:"10px", padding:"14px", fontWeight:700, fontSize:"15px", cursor:"pointer", fontFamily:"'Sora', sans-serif", letterSpacing:"0.5px" },
    btnOutline: { background:"transparent", border:"1px solid rgba(201,168,76,0.4)", color:"#C9A84C", borderRadius:"8px", padding:"10px 20px", cursor:"pointer", fontSize:"13px", fontFamily:"'Sora', sans-serif", fontWeight:600 },
    hint: { background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:"10px", padding:"12px 16px", marginBottom:"20px", fontSize:"12px", color:"#C9A84C", lineHeight:"1.8" },
    error: { color:"#ef4444", fontSize:"13px", marginBottom:"12px", textAlign:"center" },
    nav: { background:"rgba(7,10,15,0.95)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"0 20px", position:"sticky", top:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", height:"64px" },
    navLogo: { fontFamily:"'Playfair Display', serif", fontSize:"20px", fontWeight:700, color:"#C9A84C", cursor:"pointer", letterSpacing:"0.5px" },
    navLinks: { display:"flex", gap:"4px", alignItems:"center" },
    navLink: { padding:"7px 14px", borderRadius:"8px", fontSize:"13px", cursor:"pointer", color:"#8A8070", fontWeight:500, transition:"all 0.2s", border:"none", background:"transparent", fontFamily:"'Sora', sans-serif" },
    navLinkActive: { padding:"7px 14px", borderRadius:"8px", fontSize:"13px", cursor:"pointer", color:"#C9A84C", fontWeight:600, background:"rgba(201,168,76,0.1)", border:"none", fontFamily:"'Sora', sans-serif" },
    avatar: { width:"36px", height:"36px", borderRadius:"50%", background:"linear-gradient(135deg, #C9A84C, #E8C96A)", color:"#070A0F", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"13px", cursor:"pointer" },
    langToggle: { background:"transparent", border:"1px solid rgba(201,168,76,0.3)", color:"#C9A84C", borderRadius:"6px", padding:"4px 10px", fontSize:"12px", fontWeight:600, cursor:"pointer", marginRight:"10px" },
    page: { padding:"24px 20px", maxWidth:"1100px", margin:"0 auto" },
    pageTitle: { fontFamily:"'Playfair Display', serif", fontSize:"28px", fontWeight:700, color:"#E8E2D9", marginBottom:"6px" },
    pageSub: { color:"#8A8070", fontSize:"14px", marginBottom:"28px" },
    carGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"20px" },
    carCard: { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px", overflow:"hidden", cursor:"pointer", transition:"all 0.25s" },
    carImg: { width:"100%", height:"180px", objectFit:"cover" },
    carBody: { padding:"16px" },
    carMake: { fontSize:"11px", color:"#C9A84C", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase" },
    carName: { fontSize:"17px", fontWeight:700, color:"#E8E2D9", marginTop:"2px", marginBottom:"4px" },
    carPrice: { fontSize:"20px", fontWeight:800, color:"#C9A84C", fontFamily:"'Playfair Display', serif" },
    badge: (s) => ({ display:"inline-block", padding:"3px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:700, letterSpacing:"0.5px", textTransform:"uppercase", background: statusBg(s), color: statusColor(s), border:`1px solid ${statusColor(s)}40` }),
    detailBack: { display:"flex", alignItems:"center", gap:"8px", color:"#C9A84C", cursor:"pointer", marginBottom:"24px", fontSize:"14px", fontWeight:600, background:"none", border:"none", fontFamily:"'Sora',sans-serif" },
    filterBar: { display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"24px", alignItems:"center" },
    filterSelect: { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"8px", padding:"9px 14px", color:"#E8E2D9", fontSize:"13px", outline:"none", cursor:"pointer" },
    searchInput: { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"8px", padding:"9px 14px", color:"#E8E2D9", fontSize:"13px", outline:"none", flex:"1", minWidth:"180px" },
    chatWrap: { display:"flex", flexDirection:"column", height:"calc(100vh - 160px)", background:"rgba(255,255,255,0.02)", borderRadius:"16px", border:"1px solid rgba(255,255,255,0.07)", overflow:"hidden" },
    chatHeader: { padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.04)" },
    chatBody: { flex:1, overflowY:"auto", padding:"20px", display:"flex", flexDirection:"column", gap:"12px" },
    chatInput: { display:"flex", gap:"10px", padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.04)" },
    msgBubble: (isMe, isAdmin) => ({ maxWidth:"70%", alignSelf: isMe ? "flex-end" : "flex-start", background: isAdmin && !isMe ? "rgba(201,168,76,0.15)" : isMe ? "rgba(27,58,107,0.8)" : "rgba(255,255,255,0.07)", border: isAdmin && !isMe ? "1px solid rgba(201,168,76,0.3)" : "1px solid rgba(255,255,255,0.08)", borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding:"10px 14px" }),
    msgSender: { fontSize:"11px", fontWeight:700, color:"#C9A84C", marginBottom:"4px" },
    msgText: { fontSize:"14px", color:"#E8E2D9", lineHeight:"1.5" },
    msgTime: { fontSize:"10px", color:"#666", marginTop:"4px" },
    statCard: { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"14px", padding:"24px", flex:"1", minWidth:"160px" },
    statNum: { fontFamily:"'Playfair Display', serif", fontSize:"36px", fontWeight:700, color:"#C9A84C" },
    statLabel: { fontSize:"12px", color:"#8A8070", marginTop:"4px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.5px" },
    table: { width:"100%", borderCollapse:"collapse" },
    th: { padding:"12px 16px", textAlign:"left", fontSize:"11px", color:"#8A8070", fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", borderBottom:"1px solid rgba(255,255,255,0.07)" },
    td: { padding:"14px 16px", fontSize:"13px", color:"#E8E2D9", borderBottom:"1px solid rgba(255,255,255,0.04)" },
    modal: { position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, padding:"20px" },
    modalCard: { background:"#0D1520", border:"1px solid rgba(201,168,76,0.2)", borderRadius:"20px", padding:"32px", width:"100%", maxWidth:"500px", maxHeight:"85vh", overflowY:"auto" },
    toast: (type) => ({ position:"fixed", bottom:"24px", right:"24px", background: type==="error" ? "#7f1d1d" : "#052e16", border:`1px solid ${type==="error"?"#ef4444":"#22c55e"}40`, color: type==="error" ? "#fca5a5" : "#86efac", padding:"12px 20px", borderRadius:"12px", fontSize:"14px", fontWeight:600, zIndex:300, boxShadow:"0 8px 32px rgba(0,0,0,0.4)" }),
    mobileNav: { display:"flex", justifyContent:"space-around", padding:"12px 0", background:"rgba(7,10,15,0.97)", borderTop:"1px solid rgba(255,255,255,0.07)", position:"fixed", bottom:0, left:0, right:0, zIndex:100 },
    mobileNavBtn: (active) => ({ display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", cursor:"pointer", color: active ? "#C9A84C" : "#555", fontSize:"10px", fontWeight:600, background:"none", border:"none", fontFamily:"'Sora',sans-serif" }),
    whatsappBtn: { display:"inline-flex", alignItems:"center", justifyContent:"center", background:"#25D366", color:"white", border:"none", borderRadius:"8px", padding:"8px 16px", fontSize:"13px", fontWeight:600, cursor:"pointer", textDecoration:"none", marginTop:"8px", width:"100%" },
  };

  const responsiveStyles = `
    @media (max-width: 640px) {
      .nav-links { display: none; }
      .page-title { font-size: 24px; }
      .car-grid { grid-template-columns: 1fr; }
      .filter-bar { flex-direction: column; align-items: stretch; }
      .filter-bar > * { width: 100%; }
      .admin-tabs { flex-wrap: wrap; }
    }
    @media (min-width: 641px) and (max-width: 1024px) {
      .car-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `;

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Sora:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    if (!document.head.querySelector('link[href*="Playfair"]')) document.head.appendChild(link);
  }, []);

  // ----- RENDER LOGIN -----
  if (!user) {
    return (
      <div style={S.loginWrap} dir={isRTL ? "rtl" : "ltr"}>
        <style>{responsiveStyles}</style>
        <div style={{position:"absolute",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",top:"-100px",right:"-100px",pointerEvents:"none"}} />
        <div style={{position:"absolute",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle, rgba(27,58,107,0.15) 0%, transparent 70%)",bottom:"-50px",left:"-50px",pointerEvents:"none"}} />
        <div style={S.loginCard}>
          <div style={S.loginLogo}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"14px",letterSpacing:"4px",color:"#C9A84C",marginBottom:"4px",textTransform:"uppercase"}}>Yammine</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"32px",fontWeight:800,color:"#E8E2D9",lineHeight:1}}>MOTORS</div>
            <div style={{width:"40px",height:"2px",background:"linear-gradient(90deg,#C9A84C,transparent)",margin:"10px auto 0"}} />
          </div>
          <div style={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
            <button style={S.langToggle} onClick={() => setLanguage(language === "en" ? "ar" : "en")}>
              {language === "en" ? "العربية" : "English"}
            </button>
          </div>
          {!registerMode ? (
            <>
              <div style={S.hint}>{t.demoHint}</div>
              <input style={S.input} placeholder={t.email} value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} type="email" />
              <input style={S.input} placeholder={t.password} value={loginPass} onChange={e=>setLoginPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} type="password" />
              {loginError && <div style={S.error}>{loginError}</div>}
              <button style={S.btnGold} onClick={login}>{t.login}</button>
              <p style={{textAlign:"center",color:"#555",fontSize:"13px",marginTop:"20px"}}>{t.noAccount} <span style={{color:"#C9A84C",cursor:"pointer",fontWeight:600}} onClick={()=>{setRegisterMode(true);setLoginError("")}}>{t.register}</span></p>
            </>
          ) : (
            <>
              <input style={S.input} placeholder={t.fullName} value={regName} onChange={e=>setRegName(e.target.value)} />
              <input style={S.input} placeholder={t.email} value={regEmail} onChange={e=>setRegEmail(e.target.value)} type="email" />
              <input style={S.input} placeholder={t.password} value={regPass} onChange={e=>setRegPass(e.target.value)} type="password" />
              {loginError && <div style={S.error}>{loginError}</div>}
              <button style={S.btnGold} onClick={register}>{t.register}</button>
              <p style={{textAlign:"center",color:"#555",fontSize:"13px",marginTop:"20px"}}>{t.haveAccount} <span style={{color:"#C9A84C",cursor:"pointer",fontWeight:600}} onClick={()=>{setRegisterMode(false);setLoginError("")}}>{t.login}</span></p>
            </>
          )}
        </div>
      </div>
    );
  }

  // ----- MAIN APP (client or admin) -----
  return (
    <div style={S.app} dir={isRTL ? "rtl" : "ltr"}>
      <style>{responsiveStyles}</style>

      {/* Navigation */}
      <nav style={S.nav}>
        <span style={S.navLogo} onClick={()=>setPage("home")}>{t.appName}</span>
        <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
          <button style={S.langToggle} onClick={() => setLanguage(language === "en" ? "ar" : "en")}>
            {language === "en" ? "العربية" : "English"}
          </button>
          {user.role === "client" && (
            <div style={S.navLinks} className="nav-links">
              <button style={page==="home"?S.navLinkActive:S.navLink} onClick={()=>setPage("home")}>{t.home}</button>
              <button style={page==="inventory"?S.navLinkActive:S.navLink} onClick={()=>setPage("inventory")}>{t.inventory}</button>
              <button style={page==="generalChat"?S.navLinkActive:S.navLink} onClick={()=>setPage("generalChat")}>{t.chat}</button>
              <button style={page==="privateChat"?S.navLinkActive:S.navLink} onClick={()=>setPage("privateChat")}>{t.inbox}</button>
              <button style={page==="profile"?S.navLinkActive:S.navLink} onClick={()=>setPage("profile")}>{t.profile}</button>
            </div>
          )}
          {user.role === "admin" && (
            <div style={S.navLinks} className="nav-links">
              <button style={page==="adminDashboard"?S.navLinkActive:S.navLink} onClick={()=>setPage("adminDashboard")}>{t.admin}</button>
            </div>
          )}
          <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
            <button style={S.btnOutline} onClick={()=>setCurrency(c=>c==="USD"?"LBP":"USD")}>{t.currency}</button>
            <div style={S.avatar}>{user.avatar}</div>
            <button style={{...S.btnOutline, padding:"7px 14px", fontSize:"12px"}} onClick={logout}>{t.logout}</button>
          </div>
        </div>
      </nav>

      {/* ----- CLIENT PAGES ----- */}
      {user.role === "client" && (
        <>
          {/* HOME */}
          {page === "home" && (
            <div style={{paddingBottom:"80px"}}>
              <div style={{position:"relative",height:"380px",overflow:"hidden"}}>
                <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80" style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.3)"}} />
                <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"20px"}}>
                  <div style={{fontSize:"12px",letterSpacing:"4px",color:"#C9A84C",marginBottom:"12px",textTransform:"uppercase"}}>Batroun Open Space · Lebanon</div>
                  <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"42px",fontWeight:800,color:"#E8E2D9",margin:"0 0 12px",lineHeight:1.15}}>Drive Your<br/>Dream Car</h1>
                  <p style={{color:"#A09080",fontSize:"15px",marginBottom:"28px",maxWidth:"380px"}}>Premium vehicles, transparent pricing, and a showroom experience like no other.</p>
                  <div style={{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"}}>
                    <button style={{...S.btnGold,width:"auto",padding:"13px 28px"}} onClick={()=>setPage("inventory")}>{t.browseInventory}</button>
                    <button style={{...S.btnOutline,padding:"13px 28px"}} onClick={()=>setPage("privateChat")}>{t.contactOwner}</button>
                  </div>
                </div>
              </div>
              <div style={S.page}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
                  <div>
                    <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:"#E8E2D9",margin:0}}>{t.featuredCars}</h2>
                    <p style={{color:"#8A8070",fontSize:"13px",margin:"4px 0 0"}}>{t.handPicked}</p>
                  </div>
                  <button style={{...S.btnOutline,padding:"8px 16px",fontSize:"12px"}} onClick={()=>setPage("inventory")}>{t.viewAll}</button>
                </div>
                <div style={S.carGrid}>
                  {cars.filter(c=>c.featured).map(c=>(
                    <div key={c.id} style={S.carCard} onClick={()=>{setSelectedCar(c);setCarPhoto(0);setPage("detail")}}>
                      <div style={{position:"relative"}}>
                        <img src={c.images[0]} alt={c.model} style={S.carImg} />
                        <div style={{position:"absolute",top:"10px",left:"10px"}}><span style={S.badge(c.status)}>{t[c.status]}</span></div>
                      </div>
                      <div style={S.carBody}>
                        <div style={S.carMake}>{c.make}</div>
                        <div style={S.carName}>{c.model} <span style={{color:"#666",fontWeight:400,fontSize:"14px"}}>{c.year}</span></div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                          <span style={S.carPrice}>{fmt(c.price)}</span>
                          <span style={{fontSize:"12px",color:"#666"}}>{c.mileage.toLocaleString()} km</span>
                        </div>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm%20interested%20in%20${c.make}%20${c.model}%20${c.year}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} onClick={(e)=>e.stopPropagation()}>
                          <button style={S.whatsappBtn}>{t.contactViaWhatsApp}</button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px",marginTop:"36px"}}>
                  {[[cars.filter(c=>c.status==="available").length, t.inStock], ["Batroun", t.openAirShowroom], ["Direct", t.directChat]].map(([v,label],i)=>(
                    <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"20px",textAlign:"center"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:700,color:"#C9A84C"}}>{v}</div>
                      <div style={{fontSize:"12px",color:"#666",marginTop:"2px"}}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INVENTORY */}
          {page === "inventory" && (
            <div style={S.page}>
              <h1 style={S.pageTitle}>{t.carInventory}</h1>
              <p style={S.pageSub}>{filteredCars.length} {t.carsFound}</p>
              <div style={S.filterBar}>
                <input style={S.searchInput} placeholder={t.searchPlaceholder} value={searchQ} onChange={e=>setSearchQ(e.target.value)} />
                <select style={S.filterSelect} value={filterBrand} onChange={e=>setFilterBrand(e.target.value)}>
                  {brands.map(b=><option key={b}>{b === "All" ? t.filterBrand : b}</option>)}
                </select>
                <select style={S.filterSelect} value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
                  {["All","available","reserved","sold"].map(s=><option key={s}>{s === "All" ? t.filterStatus : t[s]}</option>)}
                </select>
              </div>
              <div style={S.carGrid}>
                {filteredCars.map(c=>(
                  <div key={c.id} style={S.carCard} onClick={()=>{setSelectedCar(c);setCarPhoto(0);setPage("detail")}}>
                    <div style={{position:"relative"}}>
                      <img src={c.images[0]} alt={c.model} style={S.carImg} />
                      <div style={{position:"absolute",top:"10px",left:"10px"}}><span style={S.badge(c.status)}>{t[c.status]}</span></div>
                    </div>
                    <div style={S.carBody}>
                      <div style={S.carMake}>{c.make}</div>
                      <div style={S.carName}>{c.model} <span style={{color:"#666",fontWeight:400,fontSize:"14px"}}>{c.year}</span></div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                        <span style={S.carPrice}>{fmt(c.price)}</span>
                        <span style={{fontSize:"12px",color:"#666"}}>{c.mileage.toLocaleString()} km</span>
                      </div>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm%20interested%20in%20${c.make}%20${c.model}%20${c.year}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} onClick={(e)=>e.stopPropagation()}>
                        <button style={S.whatsappBtn}>{t.contactViaWhatsApp}</button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              {filteredCars.length === 0 && <div style={{textAlign:"center",padding:"60px 20px",color:"#555",fontSize:"15px"}}>No cars match your filters.</div>}
            </div>
          )}

          {/* CAR DETAIL */}
          {page === "detail" && selectedCar && (
            <div style={S.app}>
              <div style={{...S.page,paddingBottom:"80px"}}>
                <button style={S.detailBack} onClick={()=>setPage("inventory")}>← {t.inventory}</button>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"28px"}}>
                  <div>
                    <img src={selectedCar.images[carPhoto]} alt={selectedCar.model} style={{width:"100%",height:"320px",objectFit:"cover",borderRadius:"16px",marginBottom:"12px"}} />
                    <div style={{display:"flex",gap:"10px"}}>
                      {selectedCar.images.map((img,i)=>(
                        <img key={i} src={img} alt="" onClick={()=>setCarPhoto(i)} style={{width:"80px",height:"56px",objectFit:"cover",borderRadius:"8px",cursor:"pointer",border:carPhoto===i?"2px solid #C9A84C":"2px solid transparent",opacity:carPhoto===i?1:0.5}} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
                      <span style={S.carMake}>{selectedCar.make}</span>
                      <span style={S.badge(selectedCar.status)}>{t[selectedCar.status]}</span>
                    </div>
                    <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"30px",fontWeight:800,color:"#E8E2D9",margin:"0 0 6px"}}>{selectedCar.model}</h1>
                    <div style={{fontSize:"13px",color:"#8A8070",marginBottom:"20px"}}>{selectedCar.year} · {selectedCar.mileage.toLocaleString()} km · {selectedCar.fuel}</div>
                    <div style={{display:"flex",alignItems:"baseline",gap:"12px",marginBottom:"24px"}}>
                      <span style={{fontFamily:"'Playfair Display',serif",fontSize:"34px",fontWeight:800,color:"#C9A84C"}}>{fmt(selectedCar.price)}</span>
                      <button style={{...S.btnOutline,padding:"5px 12px",fontSize:"11px"}} onClick={()=>setCurrency(currency==="USD"?"LBP":"USD")}>{t.currency}</button>
                    </div>
                    <p style={{color:"#A09080",fontSize:"14px",lineHeight:"1.7",marginBottom:"24px"}}>{selectedCar.description}</p>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"24px"}}>
                      {[[t.engine, selectedCar.engine], [t.transmission, selectedCar.transmission], [t.color, selectedCar.color], [t.fuel, selectedCar.fuel], [t.mileage, `${selectedCar.mileage.toLocaleString()} km`], [t.owners, selectedCar.owners]].map(([k,v])=>(
                        <div key={k} style={{background:"rgba(255,255,255,0.04)",borderRadius:"10px",padding:"12px 16px",border:"1px solid rgba(255,255,255,0.06)"}}>
                          <div style={{fontSize:"11px",color:"#8A8070",marginBottom:"3px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{k}</div>
                          <div style={{fontSize:"14px",fontWeight:600,color:"#E8E2D9"}}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:"10px"}}>
                      <button style={{...S.btnGold,flex:1,padding:"14px"}} onClick={()=>setPage("privateChat")}>{t.chatWithMaykel}</button>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm%20interested%20in%20${selectedCar.make}%20${selectedCar.model}%20${selectedCar.year}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none", flex:1}}>
                        <button style={{...S.whatsappBtn, width:"100%"}}>{t.contactViaWhatsApp}</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GENERAL CHAT */}
          {page === "generalChat" && (
            <div style={{...S.page,height:"calc(100vh - 140px)",display:"flex",flexDirection:"column"}}>
              <h1 style={{...S.pageTitle,marginBottom:"4px"}}>{t.communityChat}</h1>
              <p style={{...S.pageSub}}>{t.openToAll}</p>
              <div style={{...S.chatWrap,flex:1}}>
                <div style={{...S.chatHeader,display:"flex",alignItems:"center",gap:"10px"}}>
                  <div style={{width:"10px",height:"10px",background:"#22c55e",borderRadius:"50%"}} />
                  <span style={{fontWeight:700,color:"#E8E2D9"}}>{t.communityChat}</span>
                  <span style={{fontSize:"12px",color:"#8A8070"}}>· {generalMsgs.length} messages</span>
                </div>
                <div style={S.chatBody} ref={chatRef}>
                  {generalMsgs.map(m=>(
                    <div key={m.id} style={{...S.msgBubble(m.sender===user.name, m.isAdmin),alignSelf:m.sender===user.name?"flex-end":"flex-start"}}>
                      <div style={S.msgSender}>{m.isAdmin?"👑 "+m.sender:m.sender}</div>
                      <div style={S.msgText}>{m.text}</div>
                      <div style={S.msgTime}>{m.time}</div>
                    </div>
                  ))}
                </div>
                <div style={S.chatInput}>
                  <input value={genInput} onChange={e=>setGenInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendGeneral()} placeholder={t.typeMessage} style={{...S.input,marginBottom:0,flex:1}} />
                  <button style={{...S.btnGold,width:"auto",padding:"11px 20px"}} onClick={sendGeneral}>{t.send}</button>
                </div>
              </div>
            </div>
          )}

          {/* PRIVATE CHAT */}
          {page === "privateChat" && (
            <div style={{...S.page,height:"calc(100vh - 140px)",display:"flex",flexDirection:"column"}}>
              <h1 style={{...S.pageTitle,marginBottom:"4px"}}>{t.privateChat}</h1>
              <p style={{...S.pageSub}}>{t.directWithMaykel}</p>
              <div style={{...S.chatWrap,flex:1}}>
                <div style={{...S.chatHeader,display:"flex",alignItems:"center",gap:"12px"}}>
                  <div style={{...S.avatar,flexShrink:0}}>MY</div>
                  <div><div style={{fontWeight:700,color:"#E8E2D9"}}>Maykel Yammine</div><div style={{fontSize:"12px",color:"#22c55e"}}>{t.usuallyReplies}</div></div>
                </div>
                <div style={S.chatBody} ref={privRef}>
                  {(privateChats["client"]||[]).map(m=>(
                    <div key={m.id} style={{...S.msgBubble(m.isMe, !m.isMe),alignSelf:m.isMe?"flex-end":"flex-start"}}>
                      <div style={S.msgSender}>{m.isMe?user.name:"Maykel"}</div>
                      <div style={S.msgText}>{m.text}</div>
                      <div style={S.msgTime}>{m.time}</div>
                    </div>
                  ))}
                </div>
                <div style={S.chatInput}>
                  <input value={privInput} onChange={e=>setPrivInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendPrivate()} placeholder={t.askAboutCar} style={{...S.input,marginBottom:0,flex:1}} />
                  <button style={{...S.btnGold,width:"auto",padding:"11px 20px"}} onClick={sendPrivate}>{t.send}</button>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE */}
          {page === "profile" && (
            <div style={S.page}>
              <div style={{display:"flex",alignItems:"center",gap:"20px",marginBottom:"32px",background:"rgba(255,255,255,0.03)",borderRadius:"16px",padding:"24px",border:"1px solid rgba(255,255,255,0.07)"}}>
                <div style={{...S.avatar,width:"64px",height:"64px",fontSize:"22px",flexShrink:0}}>{user.avatar}</div>
                <div>
                  <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:"#E8E2D9",margin:"0 0 4px"}}>{user.name}</h1>
                  <p style={{color:"#8A8070",fontSize:"14px",margin:0}}>{user.email} · {t.clientAccount}</p>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"32px"}}>
                {[[t.favorites, favorites.length+" "+t.savedCars], [t.chats, "1 "+t.activeConversation], [t.viewed, t.recentlyBrowsed], [t.alerts, t.priceDrop]].map(([title,sub],i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,0.03)",borderRadius:"12px",padding:"20px",border:"1px solid rgba(255,255,255,0.07)",cursor:"pointer"}}>
                    <div style={{fontWeight:700,color:"#E8E2D9",marginBottom:"2px"}}>{title}</div>
                    <div style={{fontSize:"12px",color:"#8A8070"}}>{sub}</div>
                  </div>
                ))}
              </div>
              {favorites.length > 0 && (
                <>
                  <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#E8E2D9",marginBottom:"16px"}}>{t.savedCarsTitle}</h2>
                  <div style={S.carGrid}>
                    {cars.filter(c=>favorites.includes(c.id)).map(c=>(
                      <div key={c.id} style={S.carCard} onClick={()=>{setSelectedCar(c);setCarPhoto(0);setPage("detail")}}>
                        <img src={c.images[0]} style={S.carImg} />
                        <div style={S.carBody}>
                          <div style={S.carMake}>{c.make}</div>
                          <div style={S.carName}>{c.model} {c.year}</div>
                          <span style={S.carPrice}>{fmt(c.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <button style={{...S.btnOutline,width:"100%",marginTop:"32px",padding:"14px",color:"#ef4444",borderColor:"rgba(239,68,68,0.3)"}} onClick={logout}>{t.signOut}</button>
            </div>
          )}

          {/* Mobile bottom nav (text only) */}
          <div style={S.mobileNav}>
            {[
              ["home", t.home],
              ["inventory", t.inventory],
              ["generalChat", t.chat],
              ["privateChat", t.inbox],
              ["profile", t.profile],
            ].map(([pg, label]) => (
              <button key={pg} style={S.mobileNavBtn(page === pg)} onClick={() => setPage(pg)}>
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ----- ADMIN PANEL (simplified, similar text replacements) ----- */}
      {user.role === "admin" && (
        <div style={S.page}>
          <div style={{display:"flex", gap:"6px", marginBottom:"28px", background:"rgba(255,255,255,0.03)", padding:"6px", borderRadius:"12px", width:"fit-content"}} className="admin-tabs">
            {[
              ["dashboard", t.admin],
              ["cars", t.inventory],
              ["messages", t.messages],
            ].map(([key, label]) => (
              <button key={key} onClick={()=>setAdminTab(key)} style={{...adminTab===key?{background:"rgba(201,168,76,0.15)",color:"#C9A84C",border:"1px solid rgba(201,168,76,0.3)"}:{background:"transparent",color:"#8A8070",border:"1px solid transparent"}, padding:"9px 18px",borderRadius:"8px",cursor:"pointer",fontWeight:600,fontSize:"13px",fontFamily:"'Sora',sans-serif"}}>
                {label}
              </button>
            ))}
          </div>

          {adminTab === "dashboard" && (
            <>
              <h1 style={S.pageTitle}>{t.admin}</h1>
              <p style={S.pageSub}>{t.welcomeBack}</p>
              <div style={{display:"flex",gap:"14px",flexWrap:"wrap",marginBottom:"32px"}}>
                {[
                  [t.totalCars, cars.length],
                  [t.available, cars.filter(c=>c.status==="available").length],
                  [t.sold, cars.filter(c=>c.status==="sold").length],
                  [t.reserved, cars.filter(c=>c.status==="reserved").length],
                ].map(([label,num])=>(
                  <div key={label} style={S.statCard}>
                    <div style={S.statNum}>{num}</div>
                    <div style={S.statLabel}>{label}</div>
                  </div>
                ))}
              </div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#E8E2D9",marginBottom:"16px"}}>{t.recentListings}</h2>
              <div style={{background:"rgba(255,255,255,0.02)",borderRadius:"14px",border:"1px solid rgba(255,255,255,0.06)",overflow:"hidden"}}>
                <table style={S.table}>
                  <thead><tr>{[t.car, t.year, t.price, t.status].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                  <tbody>{cars.slice(0,5).map(c=>(
                    <tr key={c.id}>
                      <td style={S.td}><strong>{c.make} {c.model}</strong></td>
                      <td style={S.td}>{c.year}</td>
                      <td style={S.td}>${c.price.toLocaleString()}</td>
                      <td style={S.td}><span style={S.badge(c.status)}>{t[c.status]}</span></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </>
          )}

          {adminTab === "cars" && (
            <>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexWrap:"wrap",gap:"12px"}}>
                <div><h1 style={{...S.pageTitle,marginBottom:"4px"}}>{t.inventory}</h1><p style={{...S.pageSub,marginBottom:0}}>{cars.length} {t.carsFound}</p></div>
                <button style={{...S.btnGold,width:"auto",padding:"11px 22px"}} onClick={()=>setShowAddCar(true)}>{t.addNewCar}</button>
              </div>
              <div style={{background:"rgba(255,255,255,0.02)",borderRadius:"14px",border:"1px solid rgba(255,255,255,0.06)",overflow:"auto"}}>
                <table style={S.table}>
                  <thead><tr>{["", t.car, t.year, t.price, t.status, t.actions].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                  <tbody>{cars.map((c,i)=>(
                    <tr key={c.id}>
                      <td style={S.td}><img src={c.images[0]} style={{width:"60px",height:"40px",objectFit:"cover",borderRadius:"6px"}} /></td>
                      <td style={S.td}><strong>{c.make}</strong> {c.model}</td>
                      <td style={S.td}>{c.year}</td>
                      <td style={{...S.td,color:"#C9A84C",fontWeight:700}}>${c.price.toLocaleString()}</td>
                      <td style={S.td}><span style={S.badge(c.status)}>{t[c.status]}</span></td>
                      <td style={S.td}>
                        <div style={{display:"flex",gap:"6px"}}>
                          <button onClick={()=>{setEditingCar({...c});}} style={{background:"rgba(27,58,107,0.4)",border:"1px solid rgba(27,58,107,0.7)",color:"#93c5fd",borderRadius:"6px",padding:"5px 10px",cursor:"pointer",fontSize:"12px",fontFamily:"'Sora',sans-serif"}}>{t.edit}</button>
                          <button onClick={()=>deleteCar(c.id)} style={{background:"rgba(127,29,29,0.4)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",borderRadius:"6px",padding:"5px 10px",cursor:"pointer",fontSize:"12px",fontFamily:"'Sora',sans-serif"}}>{t.delete}</button>
                        </div>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </>
          )}

          {adminTab === "messages" && (
            <>
              <h1 style={S.pageTitle}>{t.messages}</h1>
              <p style={S.pageSub}>{t.privateConversations}</p>
              <div style={{display:"grid",gridTemplateColumns:"240px 1fr",gap:"16px",height:"500px"}}>
                <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"12px",border:"1px solid rgba(255,255,255,0.07)",overflow:"hidden"}}>
                  {["Ahmad Khalil","Lara M.","Tony B."].map((name,i)=>(
                    <div key={name} style={{padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,0.05)",cursor:"pointer",background:i===0?"rgba(201,168,76,0.08)":"transparent",display:"flex",alignItems:"center",gap:"10px"}}>
                      <div style={{...S.avatar,width:"32px",height:"32px",fontSize:"11px",flexShrink:0}}>{name.slice(0,2).toUpperCase()}</div>
                      <div><div style={{fontSize:"13px",fontWeight:600,color:"#E8E2D9"}}>{name}</div><div style={{fontSize:"11px",color:"#666"}}>2 messages</div></div>
                      {i===0&&<div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#C9A84C",marginLeft:"auto",flexShrink:0}} />}
                    </div>
                  ))}
                </div>
                <div style={S.chatWrap}>
                  <div style={S.chatHeader}><div style={{fontWeight:700,color:"#E8E2D9"}}>Ahmad Khalil</div><div style={{fontSize:"12px",color:"#22c55e"}}>{t.active}</div></div>
                  <div style={S.chatBody} ref={privRef}>
                    {(privateChats["client"]||[]).map(m=>(
                      <div key={m.id} style={{...S.msgBubble(!m.isMe, false),alignSelf:!m.isMe?"flex-end":"flex-start"}}>
                        <div style={S.msgSender}>{m.isMe ? "Ahmad Khalil" : "You (Maykel)"}</div>
                        <div style={S.msgText}>{m.text}</div>
                        <div style={S.msgTime}>{m.time}</div>
                      </div>
                    ))}
                  </div>
                  <div style={S.chatInput}>
                    <input value={privInput} onChange={e=>setPrivInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendPrivate()} placeholder={t.typeMessage} style={{...S.input,marginBottom:0,flex:1}} />
                    <button style={{...S.btnGold,width:"auto",padding:"11px 20px"}} onClick={sendPrivate}>{t.send}</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Add/Edit Modals - similar text replacements */}
          {showAddCar && (
            <div style={S.modal} onClick={e=>e.target===e.currentTarget&&setShowAddCar(false)}>
              <div style={S.modalCard}>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",color:"#E8E2D9",marginBottom:"20px"}}>{t.addCar}</h2>
                {[["make", t.make, t.makePlaceholder], ["model", t.model, t.modelPlaceholder], ["year", t.year, t.yearPlaceholder], ["price", t.price, t.pricePlaceholder], ["mileage", t.mileage, t.mileagePlaceholder], ["engine", t.engine, t.enginePlaceholder], ["color", t.color, t.colorPlaceholder]].map(([key,label,ph])=>(
                  <div key={key}>
                    <label style={{fontSize:"12px",color:"#8A8070",fontWeight:600,display:"block",marginBottom:"4px"}}>{label}</label>
                    <input style={S.input} placeholder={ph} value={newCar[key]||""} onChange={e=>setNewCar(p=>({...p,[key]:e.target.value}))} />
                  </div>
                ))}
                <label style={{fontSize:"12px",color:"#8A8070",fontWeight:600,display:"block",marginBottom:"4px"}}>{t.status}</label>
                <select style={{...S.filterSelect,width:"100%",marginBottom:"14px"}} value={newCar.status} onChange={e=>setNewCar(p=>({...p,status:e.target.value}))}>
                  <option value="available">{t.available}</option>
                  <option value="reserved">{t.reserved}</option>
                  <option value="sold">{t.sold}</option>
                </select>
                <label style={{fontSize:"12px",color:"#8A8070",fontWeight:600,display:"block",marginBottom:"4px"}}>{t.description}</label>
                <textarea style={{...S.input,minHeight:"80px",resize:"vertical"}} placeholder={t.descriptionPlaceholder} value={newCar.description} onChange={e=>setNewCar(p=>({...p,description:e.target.value}))} />
                <div style={{display:"flex",gap:"10px",marginTop:"8px"}}>
                  <button style={{...S.btnGold}} onClick={addCar}>{t.addCar}</button>
                  <button style={{...S.btnOutline,flex:1}} onClick={()=>setShowAddCar(false)}>{t.cancel}</button>
                </div>
              </div>
            </div>
          )}

          {editingCar && (
            <div style={S.modal} onClick={e=>e.target===e.currentTarget&&setEditingCar(null)}>
              <div style={S.modalCard}>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",color:"#E8E2D9",marginBottom:"20px"}}>{t.editCar}</h2>
                {[["make", t.make], ["model", t.model], ["price", t.price], ["mileage", t.mileage], ["color", t.color]].map(([key,label])=>(
                  <div key={key}>
                    <label style={{fontSize:"12px",color:"#8A8070",fontWeight:600,display:"block",marginBottom:"4px"}}>{label}</label>
                    <input style={S.input} value={editingCar[key]||""} onChange={e=>setEditingCar(p=>({...p,[key]:e.target.value}))} />
                  </div>
                ))}
                <label style={{fontSize:"12px",color:"#8A8070",fontWeight:600,display:"block",marginBottom:"4px"}}>{t.status}</label>
                <select style={{...S.filterSelect,width:"100%",marginBottom:"20px"}} value={editingCar.status} onChange={e=>setEditingCar(p=>({...p,status:e.target.value}))}>
                  <option value="available">{t.available}</option>
                  <option value="reserved">{t.reserved}</option>
                  <option value="sold">{t.sold}</option>
                </select>
                <div style={{display:"flex",gap:"10px"}}>
                  <button style={S.btnGold} onClick={()=>{setCars(prev=>prev.map(c=>c.id===editingCar.id?{...editingCar,price:parseInt(editingCar.price)||editingCar.price}:c));setEditingCar(null);showToast("Car updated!");}}>{t.saveChanges}</button>
                  <button style={{...S.btnOutline,flex:1}} onClick={()=>setEditingCar(null)}>{t.cancel}</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {toast && <div style={S.toast(toast.type)}>{toast.type==="success"?"✓":"✗"} {toast.msg}</div>}
    </div>
  );
}