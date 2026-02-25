import { useState, useEffect, useRef } from "react";
import { supabase } from './supabase.js';

const translations = {
  en: {
    appName:"Yammine Motors",home:"Home",inventory:"Cars",chat:"Chat",inbox:"Inbox",
    profile:"Profile",admin:"Admin",logout:"Logout",login:"Sign In",register:"Create Account",
    email:"Email address",password:"Password",fullName:"Full name",
    noAccount:"Don't have an account?",haveAccount:"Already have an account?",
    browseInventory:"Browse Inventory",contactOwner:"Contact Maykel",
    featuredCars:"Featured Cars",handPicked:"Hand-picked by Maykel",viewAll:"View All →",
    inStock:"In Stock",openAirShowroom:"Open Air Showroom",directChat:"Direct with Owner",
    carInventory:"Car Inventory",carsFound:"cars found",
    searchPlaceholder:"Search make, model...",filterBrand:"All Brands",
    filterStatus:"All Status",currency:"USD/LBP",available:"Available",
    reserved:"Reserved",sold:"Sold",year:"Year",mileage:"Mileage",fuel:"Fuel",
    transmission:"Transmission",color:"Color",engine:"Engine",owners:"Owners",
    description:"Description",chatWithMaykel:"Chat with Maykel",
    communityChat:"Community Chat",openToAll:"Open to all Yammine Motors clients",
    typeMessage:"Type a message...",send:"Send",privateChat:"Private Chat",
    directWithMaykel:"Direct conversation with Maykel Yammine",
    usuallyReplies:"Usually replies within an hour",askAboutCar:"Ask about a car...",
    clientAccount:"Client Account",favorites:"Favorites",savedCars:"saved cars",
    chats:"Chats",activeConversation:"active conversation",alerts:"Alerts",
    priceDrop:"Price drop notifications",savedCarsTitle:"Saved Cars",signOut:"Sign Out",
    welcomeBack:"Welcome back, Maykel. Here's your showroom overview.",
    totalCars:"Total Cars",recentListings:"Recent Listings",car:"Car",price:"Price",
    status:"Status",actions:"Actions",addNewCar:"+ Add New Car",edit:"Edit",
    delete:"Delete",saveChanges:"Save Changes",cancel:"Cancel",addCar:"Add Car",
    editCar:"Edit Car",messages:"Messages",
    privateConversations:"Private conversations from your clients.",
    active:"Active",make:"Make",model:"Model",
    makePh:"e.g. BMW",modelPh:"e.g. 5 Series",yearPh:"e.g. 2023",
    pricePh:"e.g. 42000",mileagePh:"e.g. 15000",enginePh:"e.g. 2.0L Turbo",
    colorPh:"e.g. Alpine White",descPh:"Car description...",
    contactViaWhatsApp:"Contact on WhatsApp",
    uploadPhoto:"Upload Photo",uploading:"Uploading...",
    photoUploaded:"Photo uploaded ✓",clickToUpload:"Click to select photo",
    featured:"Show on homepage?",noClients:"No clients yet.",
    selectClient:"Select a client to start chatting",
  },
  ar: {
    appName:"يامين موتورز",home:"الرئيسية",inventory:"السيارات",chat:"المجتمع",
    inbox:"الرسائل",profile:"الملف",admin:"الإدارة",logout:"تسجيل خروج",
    login:"تسجيل دخول",register:"إنشاء حساب",email:"البريد الإلكتروني",
    password:"كلمة المرور",fullName:"الاسم الكامل",
    noAccount:"ليس لديك حساب؟",haveAccount:"لديك حساب بالفعل؟",
    browseInventory:"تصفح السيارات",contactOwner:"تواصل مع ميكائيل",
    featuredCars:"سيارات مميزة",handPicked:"اختارها ميكائيل",viewAll:"عرض الكل ←",
    inStock:"متوفر",openAirShowroom:"معرض مفتوح",directChat:"تواصل مباشر",
    carInventory:"قائمة السيارات",carsFound:"سيارة متوفرة",
    searchPlaceholder:"ابحث عن ماركة، موديل...",filterBrand:"جميع الماركات",
    filterStatus:"جميع الحالات",currency:"دولار/ليرة",available:"متوفر",
    reserved:"محجوز",sold:"مباع",year:"السنة",mileage:"الكيلومترات",fuel:"الوقود",
    transmission:"ناقل الحركة",color:"اللون",engine:"المحرك",
    owners:"الملاك السابقون",description:"الوصف",chatWithMaykel:"راسل ميكائيل",
    communityChat:"الدردشة العامة",openToAll:"متاحة لجميع عملاء يامين موتورز",
    typeMessage:"اكتب رسالة...",send:"إرسال",privateChat:"دردشة خاصة",
    directWithMaykel:"محادثة مباشرة مع ميكائيل يامين",
    usuallyReplies:"عادة يرد خلال ساعة",askAboutCar:"اسأل عن سيارة...",
    clientAccount:"حساب عميل",favorites:"المفضلة",savedCars:"سيارات محفوظة",
    chats:"الدردشات",activeConversation:"محادثة نشطة",alerts:"تنبيهات",
    priceDrop:"إشعارات انخفاض الأسعار",savedCarsTitle:"السيارات المحفوظة",
    signOut:"تسجيل خروج",welcomeBack:"مرحباً ميكائيل. هذه نظرة عامة على معرضك.",
    totalCars:"إجمالي السيارات",recentListings:"أحدث الإضافات",car:"السيارة",
    price:"السعر",status:"الحالة",actions:"إجراءات",addNewCar:"+ إضافة سيارة",
    edit:"تعديل",delete:"حذف",saveChanges:"حفظ التغييرات",cancel:"إلغاء",
    addCar:"إضافة",editCar:"تعديل السيارة",messages:"الرسائل",
    privateConversations:"محادثات خاصة من عملائك.",active:"نشط",
    make:"الماركة",model:"الموديل",makePh:"مثال: بي إم دبليو",
    modelPh:"مثال: الفئة الخامسة",yearPh:"مثال: 2023",pricePh:"مثال: 42000",
    mileagePh:"مثال: 15000",enginePh:"مثال: 2.0 لتر تيربو",colorPh:"مثال: أبيض",
    descPh:"وصف السيارة...",contactViaWhatsApp:"تواصل عبر واتساب",
    uploadPhoto:"رفع صورة",uploading:"جاري الرفع...",
    photoUploaded:"تم رفع الصورة ✓",clickToUpload:"اضغط لاختيار صورة",
    featured:"عرض في الصفحة الرئيسية؟",noClients:"لا يوجد عملاء بعد.",
    selectClient:"اختر عميلاً للمحادثة",
  }
};

const WHATSAPP = "+9613000420";

export default function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const isRTL = lang === "ar";

  // ── Auth state ──────────────────────────────────────────────
  const [user, setUser]           = useState(null);
  const [page, setPage]           = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass]   = useState("");
  const [loginError, setLoginError] = useState("");
  const [regMode, setRegMode]       = useState(false);
  const [regName, setRegName]       = useState("");
  const [regEmail, setRegEmail]     = useState("");
  const [regPass, setRegPass]       = useState("");

  // ── Data state ──────────────────────────────────────────────
  const [cars, setCars]             = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [carPhoto, setCarPhoto]     = useState(0);
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQ, setSearchQ]       = useState("");
  const [currency, setCurrency]     = useState("USD");
  const [favorites, setFavorites]   = useState([]);

  // ── Chat state ──────────────────────────────────────────────
  const [generalMsgs, setGeneralMsgs] = useState([]);
  const [genInput, setGenInput]       = useState("");
  const [privateChats, setPrivateChats] = useState([]);
  const [privInput, setPrivInput]     = useState("");
  const [adminId, setAdminId]         = useState(null); // cached admin UUID

  // ── Admin state ─────────────────────────────────────────────
  const [adminTab, setAdminTab]       = useState("dashboard");
  const [clientsList, setClientsList] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [editingCar, setEditingCar]   = useState(null);
  const [showAddCar, setShowAddCar]   = useState(false);
  const [newCar, setNewCar]           = useState({ make:"",model:"",year:"",price:"",mileage:"",fuel:"Petrol",transmission:"Automatic",color:"",engine:"",description:"",status:"available",featured:false });
  const [addPhotoUrl, setAddPhotoUrl] = useState("");
  const [addUploading, setAddUploading] = useState(false);
  const [editPhotoUrl, setEditPhotoUrl] = useState("");
  const [editUploading, setEditUploading] = useState(false);

  const [toast, setToast]     = useState(null);
  const chatRef  = useRef(null);
  const privRef  = useRef(null);

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Parse image_urls from Supabase (JSONB can come back as array or string) ──
  const parseImages = (car) => {
    let imgs = car.image_urls;
    if (!imgs) return [];
    if (Array.isArray(imgs)) return imgs;
    if (typeof imgs === "string") {
      try { imgs = JSON.parse(imgs); return Array.isArray(imgs) ? imgs : [imgs]; }
      catch { return [imgs]; }
    }
    return [];
  };

  // ── Load cars ────────────────────────────────────────────────
  const loadCars = async () => {
    const { data } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
    if (data) setCars(data.map(c => ({ ...c, images: parseImages(c) })));
  };
  useEffect(() => { loadCars(); }, []);

  // ── General chat ─────────────────────────────────────────────
  useEffect(() => {
    supabase.from("messages_general").select("*").order("created_at", { ascending: true })
      .then(({ data }) => { if (data) setGeneralMsgs(data); });
    const sub = supabase.channel("general-chat")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages_general" },
        p => setGeneralMsgs(prev => [...prev, p.new]))
      .subscribe();
    return () => sub.unsubscribe();
  }, []);

  // ── Get & cache admin ID (called once after login) ────────────
  const fetchAdminId = async () => {
    const { data } = await supabase.from("profiles").select("id").eq("role", "admin").maybeSingle();
    if (data) setAdminId(data.id);
    return data?.id;
  };

  // ── Load private chats for client ────────────────────────────
  const loadPrivateChats = async (myId, otherId) => {
    if (!myId || !otherId) return;
    const { data } = await supabase.from("messages_private").select("*")
      .or(`and(sender_id.eq.${myId},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${myId})`)
      .order("created_at", { ascending: true });
    if (data) setPrivateChats(data);
  };

  // ── After login: load admin ID + private chats (client) ──────
  useEffect(() => {
    if (!user) return;
    if (user.role === "client") {
      fetchAdminId().then(aid => { if (aid) loadPrivateChats(user.id, aid); });
    }
    if (user.role === "admin") {
      fetchAdminId();
      supabase.from("profiles").select("id,full_name,avatar_initials").eq("role","client")
        .then(({ data }) => { if (data) setClientsList(data); });
    }
  }, [user]);

  // ── Load selected client chat (admin) ─────────────────────────
  useEffect(() => {
    if (!user || user.role !== "admin" || !selectedClientId) return;
    loadPrivateChats(user.id, selectedClientId);
  }, [selectedClientId]);

  // ── Realtime: private messages ────────────────────────────────
  useEffect(() => {
    if (!user) return;
    const sub = supabase.channel(`priv-${user.id}`)
      .on("postgres_changes", { event:"INSERT", schema:"public", table:"messages_private" }, p => {
        const m = p.new;
        const otherId = user.role === "admin" ? selectedClientId : adminId;
        if ((m.sender_id===user.id && m.receiver_id===otherId) ||
            (m.receiver_id===user.id && m.sender_id===otherId)) {
          setPrivateChats(prev => [...prev, m]);
        }
      })
      .subscribe();
    return () => sub.unsubscribe();
  }, [user, selectedClientId, adminId]);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [generalMsgs]);
  useEffect(() => { if (privRef.current)  privRef.current.scrollTop  = privRef.current.scrollHeight;  }, [privateChats]);

  // ── Auth ──────────────────────────────────────────────────────
  const login = async () => {
    setLoginError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPass });
    if (error) { setLoginError(error.message); return; }
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
    if (!profile) { setLoginError("Profile not found."); return; }
    setUser({ id: data.user.id, email: loginEmail, name: profile.full_name, role: profile.role, avatar: profile.avatar_initials });
    setPage(profile.role === "admin" ? "adminDashboard" : "home");
  };

  const register = async () => {
    if (!regName||!regEmail||!regPass) { setLoginError("Please fill all fields."); return; }
    const { data, error } = await supabase.auth.signUp({ email:regEmail, password:regPass, options:{ data:{ full_name:regName } } });
    if (error) { setLoginError(error.message); return; }
    await supabase.from("profiles").upsert({ id:data.user.id, full_name:regName, role:"client", avatar_initials:regName.slice(0,2).toUpperCase() });
    setUser({ id:data.user.id, email:regEmail, name:regName, role:"client", avatar:regName.slice(0,2).toUpperCase() });
    setPage("home");
    showToast("Welcome to Yammine Motors!");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null); setPage("login"); setLoginEmail(""); setLoginPass("");
    setAdminId(null); setSelectedClientId(null); setPrivateChats([]);
  };

  // ── Upload to Supabase Storage ────────────────────────────────
  const uploadPhoto = async (file, setUrl, setLoading) => {
    if (!file) return;
    setLoading(true);
    const ext = file.name.split(".").pop();
    const path = `car-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("car-images").upload(path, file, { upsert: true });
    if (error) { showToast("Upload failed: " + error.message, "error"); setLoading(false); return; }
    const { data } = supabase.storage.from("car-images").getPublicUrl(path);
    setUrl(data.publicUrl);
    setLoading(false);
    showToast("Photo uploaded!");
  };

  // ── Helpers ───────────────────────────────────────────────────
  const fmt = price => currency==="USD" ? `$${price?.toLocaleString()}` : `${((price||0)*90000).toLocaleString()} LBP`;
  const statusColor = s => s==="available"?"#22c55e":s==="reserved"?"#f59e0b":"#ef4444";
  const statusBg    = s => s==="available"?"#052e16":s==="reserved"?"#1c1400":"#1f0000";

  const filteredCars = cars.filter(c => {
    if (filterBrand!=="All" && c.make!==filterBrand) return false;
    if (filterStatus!=="All" && c.status!==filterStatus) return false;
    if (searchQ && !`${c.make} ${c.model} ${c.year}`.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });
  const brands = ["All", ...new Set(cars.map(c=>c.make))];
  const toggleFav = id => setFavorites(p => p.includes(id) ? p.filter(f=>f!==id) : [...p,id]);

  // ── Send messages ─────────────────────────────────────────────
  const sendGeneral = async () => {
    if (!genInput.trim()||!user) return;
    await supabase.from("messages_general").insert({ sender_id:user.id, sender_name:user.name, text:genInput, is_admin:user.role==="admin" });
    setGenInput("");
  };

  const sendPrivate = async () => {
    if (!privInput.trim()||!user) return;
    let receiverId;
    if (user.role==="admin") {
      if (!selectedClientId) { showToast("Select a client first.", "error"); return; }
      receiverId = selectedClientId;
    } else {
      // Use cached adminId, or fetch it
      let aid = adminId;
      if (!aid) aid = await fetchAdminId();
      if (!aid) { showToast("Admin not found.", "error"); return; }
      receiverId = aid;
    }
    await supabase.from("messages_private").insert({ sender_id:user.id, receiver_id:receiverId, text:privInput, is_read:false });
    setPrivInput("");
  };

  // ── Admin CRUD ────────────────────────────────────────────────
  const addCar = async () => {
    if (!newCar.make||!newCar.model||!newCar.price) { showToast("Fill required fields.","error"); return; }
    const img = addPhotoUrl || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80";
    const { error } = await supabase.from("cars").insert({
      make:newCar.make, model:newCar.model, year:parseInt(newCar.year)||2023,
      price:parseInt(newCar.price)||0, mileage:parseInt(newCar.mileage)||0,
      fuel:newCar.fuel, transmission:newCar.transmission, color:newCar.color,
      engine:newCar.engine, description:newCar.description, status:newCar.status,
      featured:newCar.featured, owners:1, image_urls:JSON.stringify([img])
    });
    if (!error) {
      showToast("Car added!"); setShowAddCar(false); setAddPhotoUrl("");
      setNewCar({ make:"",model:"",year:"",price:"",mileage:"",fuel:"Petrol",transmission:"Automatic",color:"",engine:"",description:"",status:"available",featured:false });
      loadCars();
    } else showToast(error.message,"error");
  };

  const updateCar = async () => {
    if (!editingCar) return;
    const updates = { make:editingCar.make, model:editingCar.model, price:parseInt(editingCar.price)||0, mileage:parseInt(editingCar.mileage)||0, color:editingCar.color, status:editingCar.status, featured:editingCar.featured };
    if (editPhotoUrl) updates.image_urls = JSON.stringify([editPhotoUrl]);
    const { error } = await supabase.from("cars").update(updates).eq("id", editingCar.id);
    if (!error) { showToast("Car updated!"); setEditingCar(null); setEditPhotoUrl(""); loadCars(); }
    else showToast(error.message,"error");
  };

  const deleteCar = async id => {
    await supabase.from("cars").delete().eq("id",id);
    setCars(p => p.filter(c=>c.id!==id));
    showToast("Car deleted.","error");
  };

  // ── Styles ────────────────────────────────────────────────────
  const S = {
    app:         { fontFamily:"'Sora',sans-serif", background:"#070A0F", minHeight:"100vh", color:"#E8E2D9", direction:isRTL?"rtl":"ltr" },
    loginWrap:   { minHeight:"100vh", background:"linear-gradient(135deg,#070A0F 0%,#0D1520 50%,#070A0F 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", position:"relative", overflow:"hidden" },
    loginCard:   { background:"rgba(255,255,255,0.04)", backdropFilter:"blur(20px)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:"20px", padding:"48px 40px", width:"100%", maxWidth:"420px", zIndex:2, position:"relative" },
    input:       { width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px", padding:"13px 16px", color:"#E8E2D9", fontSize:"14px", outline:"none", boxSizing:"border-box", marginBottom:"14px" },
    btnGold:     { width:"100%", background:"linear-gradient(135deg,#C9A84C,#E8C96A)", color:"#070A0F", border:"none", borderRadius:"10px", padding:"14px", fontWeight:700, fontSize:"15px", cursor:"pointer", fontFamily:"'Sora',sans-serif" },
    btnOutline:  { background:"transparent", border:"1px solid rgba(201,168,76,0.4)", color:"#C9A84C", borderRadius:"8px", padding:"10px 20px", cursor:"pointer", fontSize:"13px", fontFamily:"'Sora',sans-serif", fontWeight:600 },
    error:       { color:"#ef4444", fontSize:"13px", marginBottom:"12px", textAlign:"center" },
    nav:         { background:"rgba(7,10,15,0.95)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"0 20px", position:"sticky", top:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", height:"64px" },
    navLogo:     { fontFamily:"'Playfair Display',serif", fontSize:"20px", fontWeight:700, color:"#C9A84C", cursor:"pointer" },
    navLink:     a => ({ padding:"7px 14px", borderRadius:"8px", fontSize:"13px", cursor:"pointer", color:a?"#C9A84C":"#8A8070", fontWeight:a?600:500, background:a?"rgba(201,168,76,0.1)":"transparent", border:"none", fontFamily:"'Sora',sans-serif" }),
    langToggle:  { background:"transparent", border:"1px solid rgba(201,168,76,0.3)", color:"#C9A84C", borderRadius:"6px", padding:"4px 10px", fontSize:"12px", fontWeight:600, cursor:"pointer" },
    avatar:      { width:"36px", height:"36px", borderRadius:"50%", background:"linear-gradient(135deg,#C9A84C,#E8C96A)", color:"#070A0F", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"13px", flexShrink:0 },
    page:        { padding:"24px 20px", maxWidth:"1100px", margin:"0 auto" },
    pageTitle:   { fontFamily:"'Playfair Display',serif", fontSize:"28px", fontWeight:700, color:"#E8E2D9", marginBottom:"6px" },
    pageSub:     { color:"#8A8070", fontSize:"14px", marginBottom:"28px" },
    carGrid:     { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"20px" },
    carCard:     { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px", overflow:"hidden", cursor:"pointer" },
    carImg:      { width:"100%", height:"180px", objectFit:"cover", background:"#111" },
    carBody:     { padding:"16px" },
    carMake:     { fontSize:"11px", color:"#C9A84C", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase" },
    carName:     { fontSize:"17px", fontWeight:700, color:"#E8E2D9", marginTop:"2px", marginBottom:"4px" },
    carPrice:    { fontSize:"20px", fontWeight:800, color:"#C9A84C", fontFamily:"'Playfair Display',serif" },
    badge:       s => ({ display:"inline-block", padding:"3px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:700, textTransform:"uppercase", background:statusBg(s), color:statusColor(s), border:`1px solid ${statusColor(s)}40` }),
    filterBar:   { display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"24px", alignItems:"center" },
    filterSel:   { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"8px", padding:"9px 14px", color:"#E8E2D9", fontSize:"13px", outline:"none" },
    searchInp:   { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"8px", padding:"9px 14px", color:"#E8E2D9", fontSize:"13px", outline:"none", flex:"1", minWidth:"180px" },
    chatWrap:    { display:"flex", flexDirection:"column", flex:1, background:"rgba(255,255,255,0.02)", borderRadius:"16px", border:"1px solid rgba(255,255,255,0.07)", overflow:"hidden" },
    chatHeader:  { padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.04)" },
    chatBody:    { flex:1, overflowY:"auto", padding:"20px", display:"flex", flexDirection:"column", gap:"12px" },
    chatInputRow:{ display:"flex", gap:"10px", padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.04)" },
    msgBubble:   (isMe,isAdm) => ({ maxWidth:"70%", alignSelf:isMe?"flex-end":"flex-start", background:isAdm&&!isMe?"rgba(201,168,76,0.15)":isMe?"rgba(27,58,107,0.8)":"rgba(255,255,255,0.07)", border:isAdm&&!isMe?"1px solid rgba(201,168,76,0.3)":"1px solid rgba(255,255,255,0.08)", borderRadius:isMe?"16px 16px 4px 16px":"16px 16px 16px 4px", padding:"10px 14px" }),
    msgSender:   { fontSize:"11px", fontWeight:700, color:"#C9A84C", marginBottom:"4px" },
    msgText:     { fontSize:"14px", color:"#E8E2D9", lineHeight:"1.5" },
    msgTime:     { fontSize:"10px", color:"#666", marginTop:"4px" },
    statCard:    { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"14px", padding:"24px", flex:"1", minWidth:"160px" },
    statNum:     { fontFamily:"'Playfair Display',serif", fontSize:"36px", fontWeight:700, color:"#C9A84C" },
    statLabel:   { fontSize:"12px", color:"#8A8070", marginTop:"4px", fontWeight:600, textTransform:"uppercase" },
    table:       { width:"100%", borderCollapse:"collapse" },
    th:          { padding:"12px 16px", textAlign:"left", fontSize:"11px", color:"#8A8070", fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", borderBottom:"1px solid rgba(255,255,255,0.07)" },
    td:          { padding:"14px 16px", fontSize:"13px", color:"#E8E2D9", borderBottom:"1px solid rgba(255,255,255,0.04)" },
    modal:       { position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, padding:"20px" },
    modalCard:   { background:"#0D1520", border:"1px solid rgba(201,168,76,0.2)", borderRadius:"20px", padding:"32px", width:"100%", maxWidth:"520px", maxHeight:"88vh", overflowY:"auto" },
    toast:       t => ({ position:"fixed", bottom:"24px", right:"24px", background:t==="error"?"#7f1d1d":"#052e16", border:`1px solid ${t==="error"?"#ef4444":"#22c55e"}40`, color:t==="error"?"#fca5a5":"#86efac", padding:"12px 20px", borderRadius:"12px", fontSize:"14px", fontWeight:600, zIndex:300, boxShadow:"0 8px 32px rgba(0,0,0,0.4)" }),
    mobileNav:   { display:"flex", justifyContent:"space-around", padding:"12px 0", background:"rgba(7,10,15,0.97)", borderTop:"1px solid rgba(255,255,255,0.07)", position:"fixed", bottom:0, left:0, right:0, zIndex:100 },
    mobileBtn:   a => ({ display:"flex", flexDirection:"column", alignItems:"center", gap:"3px", cursor:"pointer", color:a?"#C9A84C":"#555", fontSize:"10px", fontWeight:600, background:"none", border:"none", fontFamily:"'Sora',sans-serif" }),
    waBtn:       { display:"flex", alignItems:"center", justifyContent:"center", background:"#25D366", color:"white", border:"none", borderRadius:"8px", padding:"8px 16px", fontSize:"13px", fontWeight:600, cursor:"pointer", width:"100%", marginTop:"8px" },
    detailBack:  { display:"flex", alignItems:"center", gap:"8px", color:"#C9A84C", cursor:"pointer", marginBottom:"24px", fontSize:"14px", fontWeight:600, background:"none", border:"none", fontFamily:"'Sora',sans-serif" },
    lbl:         { fontSize:"12px", color:"#8A8070", fontWeight:600, display:"block", marginBottom:"4px" },
    uploadBox:   has => ({ border:`2px dashed ${has?"#22c55e":"rgba(201,168,76,0.4)"}`, borderRadius:"10px", padding:"16px", textAlign:"center", cursor:"pointer", background:has?"rgba(34,197,94,0.06)":"rgba(201,168,76,0.04)", marginBottom:"14px" }),
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Sora:wght@400;500;600;700;800&display=swap');
    body{margin:0;padding-bottom:70px}
    input:focus,textarea:focus,select:focus{border-color:rgba(201,168,76,0.5)!important;box-shadow:0 0 0 3px rgba(201,168,76,0.08)!important}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:4px}
    @media(max-width:640px){.hide-mobile{display:none!important}.car-grid{grid-template-columns:1fr!important}.detail-grid{grid-template-columns:1fr!important}}
  `;

  // ── Upload box widget ─────────────────────────────────────────
  const UploadBox = ({ uid, url, loading, onFile }) => (
    <div>
      <label style={S.lbl}>{t.uploadPhoto}</label>
      <div style={S.uploadBox(!!url)} onClick={() => document.getElementById(uid).click()}>
        {loading
          ? <div style={{color:"#C9A84C",fontSize:"13px"}}>⏳ {t.uploading}</div>
          : url
            ? <><img src={url} style={{width:"100%",height:"90px",objectFit:"cover",borderRadius:"6px",marginBottom:"6px"}} /><div style={{color:"#22c55e",fontSize:"12px",fontWeight:600}}>{t.photoUploaded}</div></>
            : <><div style={{fontSize:"28px",marginBottom:"4px"}}>📷</div><div style={{color:"#C9A84C",fontSize:"13px",fontWeight:600}}>{t.clickToUpload}</div><div style={{color:"#555",fontSize:"11px"}}>JPG · PNG · WEBP</div></>
        }
      </div>
      <input id={uid} type="file" accept="image/*" style={{display:"none"}} onChange={e=>onFile(e.target.files[0])} />
    </div>
  );

  // ════════════════════════════════════════════════════════════
  //  LOGIN SCREEN
  // ════════════════════════════════════════════════════════════
  if (!user) return (
    <div style={S.loginWrap} dir={isRTL?"rtl":"ltr"}>
      <style>{css}</style>
      <div style={{position:"absolute",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%)",top:"-100px",right:"-100px",pointerEvents:"none"}} />
      <div style={S.loginCard}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"13px",letterSpacing:"4px",color:"#C9A84C",textTransform:"uppercase"}}>Yammine</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"32px",fontWeight:800,color:"#E8E2D9",lineHeight:1}}>MOTORS</div>
          <div style={{width:"40px",height:"2px",background:"linear-gradient(90deg,#C9A84C,transparent)",margin:"10px auto 0"}} />
        </div>
        <div style={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
          <button style={S.langToggle} onClick={()=>setLang(l=>l==="en"?"ar":"en")}>{lang==="en"?"العربية":"English"}</button>
        </div>
        {!regMode ? <>
          <input style={S.input} placeholder={t.email} value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} type="email" />
          <input style={S.input} placeholder={t.password} value={loginPass} onChange={e=>setLoginPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} type="password" />
          {loginError && <div style={S.error}>{loginError}</div>}
          <button style={S.btnGold} onClick={login}>{t.login}</button>
          <p style={{textAlign:"center",color:"#555",fontSize:"13px",marginTop:"20px"}}>{t.noAccount} <span style={{color:"#C9A84C",cursor:"pointer",fontWeight:600}} onClick={()=>{setRegMode(true);setLoginError("")}}>{t.register}</span></p>
        </> : <>
          <input style={S.input} placeholder={t.fullName} value={regName} onChange={e=>setRegName(e.target.value)} />
          <input style={S.input} placeholder={t.email} value={regEmail} onChange={e=>setRegEmail(e.target.value)} type="email" />
          <input style={S.input} placeholder={t.password} value={regPass} onChange={e=>setRegPass(e.target.value)} type="password" />
          {loginError && <div style={S.error}>{loginError}</div>}
          <button style={S.btnGold} onClick={register}>{t.register}</button>
          <p style={{textAlign:"center",color:"#555",fontSize:"13px",marginTop:"20px"}}>{t.haveAccount} <span style={{color:"#C9A84C",cursor:"pointer",fontWeight:600}} onClick={()=>{setRegMode(false);setLoginError("")}}>{t.login}</span></p>
        </>}
      </div>
    </div>
  );

  // ════════════════════════════════════════════════════════════
  //  MAIN APP
  // ════════════════════════════════════════════════════════════
  return (
    <div style={S.app} dir={isRTL?"rtl":"ltr"}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={S.nav}>
        <span style={S.navLogo} onClick={()=>setPage(user.role==="admin"?"adminDashboard":"home")}>{t.appName}</span>
        <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
          <button style={S.langToggle} onClick={()=>setLang(l=>l==="en"?"ar":"en")}>{lang==="en"?"العربية":"English"}</button>
          {user.role==="client" && <>
            {[["home",t.home],["inventory",t.inventory],["generalChat",t.chat],["privateChat",t.inbox],["profile",t.profile]].map(([pg,lb])=>(
              <button key={pg} className="hide-mobile" style={S.navLink(page===pg)} onClick={()=>setPage(pg)}>{lb}</button>
            ))}
          </>}
          {user.role==="admin" && <button className="hide-mobile" style={S.navLink(true)}>{t.admin}</button>}
          <button style={{...S.btnOutline,padding:"7px 12px",fontSize:"12px"}} onClick={()=>setCurrency(c=>c==="USD"?"LBP":"USD")}>{currency}</button>
          <div style={S.avatar}>{user.avatar}</div>
          <button style={{...S.btnOutline,padding:"7px 12px",fontSize:"12px"}} onClick={logout}>{t.logout}</button>
        </div>
      </nav>

      {/* ══ CLIENT PAGES ══════════════════════════════════════ */}
      {user.role==="client" && <>

        {/* HOME */}
        {page==="home" && (
          <div style={{paddingBottom:"80px"}}>
            <div style={{position:"relative",height:"360px",overflow:"hidden"}}>
              <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80" style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.3)"}} />
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"20px"}}>
                <div style={{fontSize:"11px",letterSpacing:"4px",color:"#C9A84C",marginBottom:"12px",textTransform:"uppercase"}}>Batroun Open Space · Lebanon</div>
                <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"40px",fontWeight:800,color:"#E8E2D9",margin:"0 0 12px",lineHeight:1.15}}>Drive Your<br/>Dream Car</h1>
                <p style={{color:"#A09080",fontSize:"15px",marginBottom:"24px",maxWidth:"360px"}}>Premium vehicles, transparent pricing, a showroom experience like no other.</p>
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
              <div style={S.carGrid} className="car-grid">
                {cars.filter(c=>c.featured).map(c=>(
                  <div key={c.id} style={S.carCard} onClick={()=>{setSelectedCar(c);setCarPhoto(0);setPage("detail")}}>
                    <div style={{position:"relative"}}>
                      <img src={c.images[0]} alt={c.model} style={S.carImg} onError={e=>e.target.style.opacity=0.3} />
                      <div style={{position:"absolute",top:"10px",left:"10px"}}><span style={S.badge(c.status)}>{t[c.status]}</span></div>
                      <button onClick={e=>{e.stopPropagation();toggleFav(c.id)}} style={{position:"absolute",top:"10px",right:"10px",background:"rgba(0,0,0,0.5)",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",fontSize:"16px"}}>
                        {favorites.includes(c.id)?"❤️":"🤍"}
                      </button>
                    </div>
                    <div style={S.carBody}>
                      <div style={S.carMake}>{c.make}</div>
                      <div style={S.carName}>{c.model} <span style={{color:"#666",fontWeight:400,fontSize:"14px"}}>{c.year}</span></div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                        <span style={S.carPrice}>{fmt(c.price)}</span>
                        <span style={{fontSize:"12px",color:"#666"}}>{c.mileage?.toLocaleString()} km</span>
                      </div>
                      <a href={`https://wa.me/${WHATSAPP}?text=I'm interested in ${c.make} ${c.model} ${c.year}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} onClick={e=>e.stopPropagation()}>
                        <button style={S.waBtn}>{t.contactViaWhatsApp}</button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px",marginTop:"36px"}}>
                {[[cars.filter(c=>c.status==="available").length,t.inStock],["Batroun",t.openAirShowroom],["Direct",t.directChat]].map(([v,lb],i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"20px",textAlign:"center"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:700,color:"#C9A84C"}}>{v}</div>
                    <div style={{fontSize:"12px",color:"#666",marginTop:"2px"}}>{lb}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INVENTORY */}
        {page==="inventory" && (
          <div style={S.page}>
            <h1 style={S.pageTitle}>{t.carInventory}</h1>
            <p style={S.pageSub}>{filteredCars.length} {t.carsFound}</p>
            <div style={S.filterBar}>
              <input style={S.searchInp} placeholder={t.searchPlaceholder} value={searchQ} onChange={e=>setSearchQ(e.target.value)} />
              <select style={S.filterSel} value={filterBrand} onChange={e=>setFilterBrand(e.target.value)}>
                {brands.map(b=><option key={b} value={b}>{b==="All"?t.filterBrand:b}</option>)}
              </select>
              <select style={S.filterSel} value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
                {["All","available","reserved","sold"].map(s=><option key={s} value={s}>{s==="All"?t.filterStatus:t[s]}</option>)}
              </select>
            </div>
            <div style={S.carGrid} className="car-grid">
              {filteredCars.map(c=>(
                <div key={c.id} style={S.carCard} onClick={()=>{setSelectedCar(c);setCarPhoto(0);setPage("detail")}}>
                  <div style={{position:"relative"}}>
                    <img src={c.images[0]} alt={c.model} style={S.carImg} onError={e=>e.target.style.opacity=0.3} />
                    <div style={{position:"absolute",top:"10px",left:"10px"}}><span style={S.badge(c.status)}>{t[c.status]}</span></div>
                    <button onClick={e=>{e.stopPropagation();toggleFav(c.id)}} style={{position:"absolute",top:"10px",right:"10px",background:"rgba(0,0,0,0.5)",border:"none",borderRadius:"50%",width:"32px",height:"32px",cursor:"pointer",fontSize:"16px"}}>
                      {favorites.includes(c.id)?"❤️":"🤍"}
                    </button>
                  </div>
                  <div style={S.carBody}>
                    <div style={S.carMake}>{c.make}</div>
                    <div style={S.carName}>{c.model} <span style={{color:"#666",fontWeight:400,fontSize:"14px"}}>{c.year}</span></div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
                      <span style={S.carPrice}>{fmt(c.price)}</span>
                      <span style={{fontSize:"12px",color:"#666"}}>{c.mileage?.toLocaleString()} km</span>
                    </div>
                    <a href={`https://wa.me/${WHATSAPP}?text=I'm interested in ${c.make} ${c.model} ${c.year}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} onClick={e=>e.stopPropagation()}>
                      <button style={S.waBtn}>{t.contactViaWhatsApp}</button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {filteredCars.length===0 && <div style={{textAlign:"center",padding:"60px 20px",color:"#555",fontSize:"15px"}}>No cars match your filters.</div>}
          </div>
        )}

        {/* CAR DETAIL */}
        {page==="detail" && selectedCar && (
          <div style={{...S.page,paddingBottom:"80px"}}>
            <button style={S.detailBack} onClick={()=>setPage("inventory")}>← {t.inventory}</button>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"28px"}} className="detail-grid">
              <div>
                {selectedCar.images[carPhoto] && <img src={selectedCar.images[carPhoto]} alt="" style={{width:"100%",height:"320px",objectFit:"cover",borderRadius:"16px",marginBottom:"12px"}} />}
                <div style={{display:"flex",gap:"8px"}}>
                  {selectedCar.images.map((img,i)=>(
                    <img key={i} src={img} alt="" onClick={()=>setCarPhoto(i)} style={{width:"72px",height:"52px",objectFit:"cover",borderRadius:"6px",cursor:"pointer",border:carPhoto===i?"2px solid #C9A84C":"2px solid transparent",opacity:carPhoto===i?1:0.5}} />
                  ))}
                </div>
              </div>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
                  <span style={S.carMake}>{selectedCar.make}</span>
                  <span style={S.badge(selectedCar.status)}>{t[selectedCar.status]}</span>
                </div>
                <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"30px",fontWeight:800,color:"#E8E2D9",margin:"0 0 6px"}}>{selectedCar.model}</h1>
                <div style={{fontSize:"13px",color:"#8A8070",marginBottom:"20px"}}>{selectedCar.year} · {selectedCar.mileage?.toLocaleString()} km · {selectedCar.fuel}</div>
                <div style={{display:"flex",alignItems:"baseline",gap:"12px",marginBottom:"24px"}}>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:"34px",fontWeight:800,color:"#C9A84C"}}>{fmt(selectedCar.price)}</span>
                  <button style={{...S.btnOutline,padding:"5px 12px",fontSize:"11px"}} onClick={()=>setCurrency(c=>c==="USD"?"LBP":"USD")}>{t.currency}</button>
                </div>
                <p style={{color:"#A09080",fontSize:"14px",lineHeight:"1.7",marginBottom:"24px"}}>{selectedCar.description}</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"24px"}}>
                  {[[t.engine,selectedCar.engine],[t.transmission,selectedCar.transmission],[t.color,selectedCar.color],[t.fuel,selectedCar.fuel],[t.mileage,`${selectedCar.mileage?.toLocaleString()} km`],[t.owners,selectedCar.owners]].map(([k,v])=>(
                    <div key={k} style={{background:"rgba(255,255,255,0.04)",borderRadius:"10px",padding:"12px 16px",border:"1px solid rgba(255,255,255,0.06)"}}>
                      <div style={{fontSize:"11px",color:"#8A8070",marginBottom:"3px",textTransform:"uppercase"}}>{k}</div>
                      <div style={{fontSize:"14px",fontWeight:600,color:"#E8E2D9"}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",gap:"10px"}}>
                  <button style={{...S.btnGold,flex:1,padding:"14px"}} onClick={()=>setPage("privateChat")}>{t.chatWithMaykel}</button>
                  <a href={`https://wa.me/${WHATSAPP}?text=I'm interested in ${selectedCar.make} ${selectedCar.model} ${selectedCar.year}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",flex:1}}>
                    <button style={{...S.waBtn,height:"100%",borderRadius:"10px"}}>{t.contactViaWhatsApp}</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GENERAL CHAT */}
        {page==="generalChat" && (
          <div style={{...S.page,height:"calc(100vh-140px)",display:"flex",flexDirection:"column",gap:"8px"}}>
            <h1 style={{...S.pageTitle,marginBottom:"4px"}}>{t.communityChat}</h1>
            <p style={{...S.pageSub,marginBottom:"12px"}}>{t.openToAll}</p>
            <div style={{...S.chatWrap,height:"calc(100vh - 230px)"}}>
              <div style={{...S.chatHeader,display:"flex",alignItems:"center",gap:"10px"}}>
                <div style={{width:"10px",height:"10px",background:"#22c55e",borderRadius:"50%"}} />
                <span style={{fontWeight:700,color:"#E8E2D9"}}>{t.communityChat}</span>
                <span style={{fontSize:"12px",color:"#8A8070"}}>· {generalMsgs.length} messages</span>
              </div>
              <div style={S.chatBody} ref={chatRef}>
                {generalMsgs.map(m=>(
                  <div key={m.id} style={{...S.msgBubble(m.sender_id===user.id, m.is_admin)}}>
                    <div style={S.msgSender}>{m.is_admin?"👑 "+m.sender_name:m.sender_name}</div>
                    <div style={S.msgText}>{m.text}</div>
                    <div style={S.msgTime}>{new Date(m.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
                  </div>
                ))}
              </div>
              <div style={S.chatInputRow}>
                <input value={genInput} onChange={e=>setGenInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendGeneral()} placeholder={t.typeMessage} style={{...S.input,marginBottom:0,flex:1}} />
                <button style={{...S.btnGold,width:"auto",padding:"11px 20px"}} onClick={sendGeneral}>{t.send}</button>
              </div>
            </div>
          </div>
        )}

        {/* PRIVATE CHAT (client) */}
        {page==="privateChat" && (
          <div style={{...S.page,display:"flex",flexDirection:"column",gap:"8px"}}>
            <h1 style={{...S.pageTitle,marginBottom:"4px"}}>{t.privateChat}</h1>
            <p style={{...S.pageSub,marginBottom:"12px"}}>{t.directWithMaykel}</p>
            <div style={{...S.chatWrap,height:"calc(100vh - 230px)"}}>
              <div style={{...S.chatHeader,display:"flex",alignItems:"center",gap:"12px"}}>
                <div style={{...S.avatar,flexShrink:0}}>MY</div>
                <div>
                  <div style={{fontWeight:700,color:"#E8E2D9"}}>Maykel Yammine</div>
                  <div style={{fontSize:"12px",color:"#22c55e"}}>{t.usuallyReplies}</div>
                </div>
              </div>
              <div style={S.chatBody} ref={privRef}>
                {privateChats.map(m=>{
                  const isMe = m.sender_id===user.id;
                  return (
                    <div key={m.id} style={{...S.msgBubble(isMe,!isMe)}}>
                      <div style={S.msgSender}>{isMe?user.name:"Maykel"}</div>
                      <div style={S.msgText}>{m.text}</div>
                      <div style={S.msgTime}>{new Date(m.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
                    </div>
                  );
                })}
              </div>
              <div style={S.chatInputRow}>
                <input value={privInput} onChange={e=>setPrivInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendPrivate()} placeholder={t.askAboutCar} style={{...S.input,marginBottom:0,flex:1}} />
                <button style={{...S.btnGold,width:"auto",padding:"11px 20px"}} onClick={sendPrivate}>{t.send}</button>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {page==="profile" && (
          <div style={S.page}>
            <div style={{display:"flex",alignItems:"center",gap:"20px",marginBottom:"32px",background:"rgba(255,255,255,0.03)",borderRadius:"16px",padding:"24px",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{...S.avatar,width:"64px",height:"64px",fontSize:"22px"}}>{user.avatar}</div>
              <div>
                <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:"#E8E2D9",margin:"0 0 4px"}}>{user.name}</h1>
                <p style={{color:"#8A8070",fontSize:"14px",margin:0}}>{user.email} · {t.clientAccount}</p>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"32px"}}>
              {[[t.favorites,favorites.length+" "+t.savedCars],[t.chats,privateChats.length>0?"1 "+t.activeConversation:"0"],[t.alerts,t.priceDrop]].map(([title,sub],i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.03)",borderRadius:"12px",padding:"20px",border:"1px solid rgba(255,255,255,0.07)"}}>
                  <div style={{fontWeight:700,color:"#E8E2D9",marginBottom:"2px"}}>{title}</div>
                  <div style={{fontSize:"12px",color:"#8A8070"}}>{sub}</div>
                </div>
              ))}
            </div>
            {favorites.length>0 && <>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#E8E2D9",marginBottom:"16px"}}>{t.savedCarsTitle}</h2>
              <div style={S.carGrid} className="car-grid">
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
            </>}
            <button style={{...S.btnOutline,width:"100%",marginTop:"32px",padding:"14px",color:"#ef4444",borderColor:"rgba(239,68,68,0.3)"}} onClick={logout}>{t.signOut}</button>
          </div>
        )}

        {/* MOBILE NAV */}
        <div style={S.mobileNav}>
          {[["home",t.home],["inventory",t.inventory],["generalChat",t.chat],["privateChat",t.inbox],["profile",t.profile]].map(([pg,lb])=>(
            <button key={pg} style={S.mobileBtn(page===pg)} onClick={()=>setPage(pg)}>{lb}</button>
          ))}
        </div>
      </>}

      {/* ══ ADMIN PANEL ════════════════════════════════════════ */}
      {user.role==="admin" && (
        <div style={S.page}>
          <div style={{display:"flex",gap:"6px",marginBottom:"28px",background:"rgba(255,255,255,0.03)",padding:"6px",borderRadius:"12px",width:"fit-content"}}>
            {[["dashboard",t.admin],["cars",t.inventory],["messages",t.messages]].map(([key,lb])=>(
              <button key={key} onClick={()=>setAdminTab(key)} style={{padding:"9px 18px",borderRadius:"8px",cursor:"pointer",fontWeight:600,fontSize:"13px",fontFamily:"'Sora',sans-serif",background:adminTab===key?"rgba(201,168,76,0.15)":"transparent",color:adminTab===key?"#C9A84C":"#8A8070",border:adminTab===key?"1px solid rgba(201,168,76,0.3)":"1px solid transparent"}}>
                {lb}
              </button>
            ))}
          </div>

          {/* DASHBOARD */}
          {adminTab==="dashboard" && <>
            <h1 style={S.pageTitle}>{t.admin}</h1>
            <p style={S.pageSub}>{t.welcomeBack}</p>
            <div style={{display:"flex",gap:"14px",flexWrap:"wrap",marginBottom:"32px"}}>
              {[[t.totalCars,cars.length],[t.available,cars.filter(c=>c.status==="available").length],[t.sold,cars.filter(c=>c.status==="sold").length],[t.reserved,cars.filter(c=>c.status==="reserved").length]].map(([lb,n])=>(
                <div key={lb} style={S.statCard}><div style={S.statNum}>{n}</div><div style={S.statLabel}>{lb}</div></div>
              ))}
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",color:"#E8E2D9",marginBottom:"16px"}}>{t.recentListings}</h2>
            <div style={{background:"rgba(255,255,255,0.02)",borderRadius:"14px",border:"1px solid rgba(255,255,255,0.06)",overflow:"hidden"}}>
              <table style={S.table}>
                <thead><tr>{[t.car,t.year,t.price,t.status].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>{cars.slice(0,5).map(c=>(
                  <tr key={c.id}>
                    <td style={S.td}><strong>{c.make} {c.model}</strong></td>
                    <td style={S.td}>{c.year}</td>
                    <td style={S.td}>${c.price?.toLocaleString()}</td>
                    <td style={S.td}><span style={S.badge(c.status)}>{t[c.status]}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>}

          {/* CARS */}
          {adminTab==="cars" && <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexWrap:"wrap",gap:"12px"}}>
              <div><h1 style={{...S.pageTitle,marginBottom:"4px"}}>{t.inventory}</h1><p style={{...S.pageSub,marginBottom:0}}>{cars.length} {t.carsFound}</p></div>
              <button style={{...S.btnGold,width:"auto",padding:"11px 22px"}} onClick={()=>setShowAddCar(true)}>{t.addNewCar}</button>
            </div>
            <div style={{background:"rgba(255,255,255,0.02)",borderRadius:"14px",border:"1px solid rgba(255,255,255,0.06)",overflow:"auto"}}>
              <table style={S.table}>
                <thead><tr>{["",t.car,t.year,t.price,t.status,t.actions].map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
                <tbody>{cars.map(c=>(
                  <tr key={c.id}>
                    <td style={S.td}><img src={c.images[0]} style={{width:"60px",height:"40px",objectFit:"cover",borderRadius:"6px",background:"#111"}} /></td>
                    <td style={S.td}><strong>{c.make}</strong> {c.model}</td>
                    <td style={S.td}>{c.year}</td>
                    <td style={{...S.td,color:"#C9A84C",fontWeight:700}}>${c.price?.toLocaleString()}</td>
                    <td style={S.td}><span style={S.badge(c.status)}>{t[c.status]}</span></td>
                    <td style={S.td}>
                      <div style={{display:"flex",gap:"6px"}}>
                        <button onClick={()=>setEditingCar({...c})} style={{background:"rgba(27,58,107,0.4)",border:"1px solid rgba(27,58,107,0.7)",color:"#93c5fd",borderRadius:"6px",padding:"5px 10px",cursor:"pointer",fontSize:"12px",fontFamily:"'Sora',sans-serif"}}>{t.edit}</button>
                        <button onClick={()=>deleteCar(c.id)} style={{background:"rgba(127,29,29,0.4)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",borderRadius:"6px",padding:"5px 10px",cursor:"pointer",fontSize:"12px",fontFamily:"'Sora',sans-serif"}}>{t.delete}</button>
                      </div>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>}

          {/* MESSAGES */}
          {adminTab==="messages" && <>
            <h1 style={S.pageTitle}>{t.messages}</h1>
            <p style={S.pageSub}>{t.privateConversations}</p>
            <div style={{display:"grid",gridTemplateColumns:"240px 1fr",gap:"16px",height:"520px"}}>
              <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"12px",border:"1px solid rgba(255,255,255,0.07)",overflowY:"auto"}}>
                {clientsList.length===0
                  ? <div style={{padding:"20px",color:"#555",fontSize:"13px",textAlign:"center"}}>{t.noClients}</div>
                  : clientsList.map(cl=>(
                    <div key={cl.id} onClick={()=>setSelectedClientId(cl.id)} style={{padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,0.05)",cursor:"pointer",background:selectedClientId===cl.id?"rgba(201,168,76,0.12)":"transparent",display:"flex",alignItems:"center",gap:"10px"}}>
                      <div style={{...S.avatar,width:"32px",height:"32px",fontSize:"11px"}}>{cl.avatar_initials}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:"13px",fontWeight:600,color:"#E8E2D9"}}>{cl.full_name}</div>
                      </div>
                      {selectedClientId===cl.id && <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#C9A84C"}} />}
                    </div>
                  ))
                }
              </div>
              {selectedClientId ? (
                <div style={{...S.chatWrap}}>
                  <div style={S.chatHeader}>
                    <div style={{fontWeight:700,color:"#E8E2D9"}}>{clientsList.find(c=>c.id===selectedClientId)?.full_name}</div>
                    <div style={{fontSize:"12px",color:"#22c55e"}}>{t.active}</div>
                  </div>
                  <div style={S.chatBody} ref={privRef}>
                    {privateChats.map(m=>{
                      const isMe = m.sender_id===user.id;
                      return (
                        <div key={m.id} style={{...S.msgBubble(isMe,false)}}>
                          <div style={S.msgSender}>{isMe?"You (Maykel)":clientsList.find(c=>c.id===m.sender_id)?.full_name||"Client"}</div>
                          <div style={S.msgText}>{m.text}</div>
                          <div style={S.msgTime}>{new Date(m.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={S.chatInputRow}>
                    <input value={privInput} onChange={e=>setPrivInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendPrivate()} placeholder={t.typeMessage} style={{...S.input,marginBottom:0,flex:1}} />
                    <button style={{...S.btnGold,width:"auto",padding:"11px 20px"}} onClick={sendPrivate}>{t.send}</button>
                  </div>
                </div>
              ) : (
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",color:"#555",fontSize:"14px",border:"1px solid rgba(255,255,255,0.05)",borderRadius:"12px"}}>
                  {t.selectClient}
                </div>
              )}
            </div>
          </>}

          {/* ADD CAR MODAL */}
          {showAddCar && (
            <div style={S.modal} onClick={e=>e.target===e.currentTarget&&setShowAddCar(false)}>
              <div style={S.modalCard}>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",color:"#E8E2D9",marginBottom:"20px"}}>{t.addCar}</h2>
                <UploadBox uid="add-photo" url={addPhotoUrl} loading={addUploading} onFile={f=>uploadPhoto(f,setAddPhotoUrl,setAddUploading)} />
                {[["make",t.make,t.makePh],["model",t.model,t.modelPh],["year",t.year,t.yearPh],["price",t.price,t.pricePh],["mileage",t.mileage,t.mileagePh],["engine",t.engine,t.enginePh],["color",t.color,t.colorPh]].map(([k,lb,ph])=>(
                  <div key={k}><label style={S.lbl}>{lb}</label><input style={S.input} placeholder={ph} value={newCar[k]||""} onChange={e=>setNewCar(p=>({...p,[k]:e.target.value}))} /></div>
                ))}
                <label style={S.lbl}>{t.status}</label>
                <select style={{...S.filterSel,width:"100%",marginBottom:"14px"}} value={newCar.status} onChange={e=>setNewCar(p=>({...p,status:e.target.value}))}>
                  <option value="available">{t.available}</option>
                  <option value="reserved">{t.reserved}</option>
                  <option value="sold">{t.sold}</option>
                </select>
                <label style={{...S.lbl,display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}}>
                  <input type="checkbox" checked={newCar.featured} onChange={e=>setNewCar(p=>({...p,featured:e.target.checked}))} />
                  {t.featured}
                </label>
                <label style={{...S.lbl,marginTop:"10px"}}>{t.description}</label>
                <textarea style={{...S.input,minHeight:"80px",resize:"vertical"}} placeholder={t.descPh} value={newCar.description} onChange={e=>setNewCar(p=>({...p,description:e.target.value}))} />
                <div style={{display:"flex",gap:"10px",marginTop:"8px"}}>
                  <button style={S.btnGold} onClick={addCar}>{t.addCar}</button>
                  <button style={{...S.btnOutline,flex:1}} onClick={()=>setShowAddCar(false)}>{t.cancel}</button>
                </div>
              </div>
            </div>
          )}

          {/* EDIT CAR MODAL */}
          {editingCar && (
            <div style={S.modal} onClick={e=>e.target===e.currentTarget&&setEditingCar(null)}>
              <div style={S.modalCard}>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",color:"#E8E2D9",marginBottom:"20px"}}>{t.editCar}</h2>
                <UploadBox uid="edit-photo" url={editPhotoUrl} loading={editUploading} onFile={f=>uploadPhoto(f,setEditPhotoUrl,setEditUploading)} />
                {[["make",t.make],["model",t.model],["price",t.price],["mileage",t.mileage],["color",t.color]].map(([k,lb])=>(
                  <div key={k}><label style={S.lbl}>{lb}</label><input style={S.input} value={editingCar[k]||""} onChange={e=>setEditingCar(p=>({...p,[k]:e.target.value}))} /></div>
                ))}
                <label style={S.lbl}>{t.status}</label>
                <select style={{...S.filterSel,width:"100%",marginBottom:"14px"}} value={editingCar.status} onChange={e=>setEditingCar(p=>({...p,status:e.target.value}))}>
                  <option value="available">{t.available}</option>
                  <option value="reserved">{t.reserved}</option>
                  <option value="sold">{t.sold}</option>
                </select>
                <label style={{...S.lbl,display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}}>
                  <input type="checkbox" checked={editingCar.featured||false} onChange={e=>setEditingCar(p=>({...p,featured:e.target.checked}))} />
                  {t.featured}
                </label>
                <div style={{display:"flex",gap:"10px",marginTop:"16px"}}>
                  <button style={S.btnGold} onClick={updateCar}>{t.saveChanges}</button>
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