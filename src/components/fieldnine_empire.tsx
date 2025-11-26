import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, User, X, Heart, Zap, Scan, Crosshair, 
  TrendingUp, Globe, CheckCircle2, Menu, Bell, LayoutDashboard, 
  Filter, ArrowRight, ShieldCheck, Maximize2, Minimize2, Smartphone, 
  Cpu, Layers, ChevronRight, Download, Share, PlusSquare, Camera, 
  Shirt, Sparkles, Wine, Gamepad2, Watch, CreditCard, Truck, 
  Package, Car, Armchair, Apple, Clock, BarChart3, Award, MapPin, 
  FileText, Box, Activity, Server, AlertTriangle, Lock, Users, DollarSign
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

// ==========================================
// [DATA] MOCK DATABASES
// ==========================================

const shopItems = [
  { id: 1, brand: "ROLEX", name: "Submariner Date", price: "$14,500", image: "⌚", condition: "New", origin: "Geneva, CH" },
  { id: 2, brand: "HERMES", name: "Birkin 30 Togo", price: "$22,000", image: "👜", condition: "A-Grade", origin: "Paris, FR" },
  { id: 3, brand: "NIKE", name: "Jordan 1 Chicago", price: "$1,800", image: "👟", condition: "New", origin: "New York, US" },
];

const liveEventsData = [
  { time: "10:42:01", type: "SCAN", user: "User_8291", item: "Rolex Submariner", loc: "Seoul, KR", status: "Verified" },
  { time: "10:42:05", type: "ORDER", user: "User_1102", item: "Hermes Birkin", loc: "Tokyo, JP", status: "Pending" },
  { time: "10:42:12", type: "AUTH", user: "Inspector_Kim", item: "Leica M6", loc: "Busan, KR", status: "Approving..." },
  { time: "10:42:18", type: "SCAN", user: "User_3391", item: "Nike Dunk Low", loc: "New York, US", status: "Verified" },
  { time: "10:42:25", type: "ALERT", user: "System", item: "Fraud Detected", loc: "London, UK", status: "Blocked" },
];

const revenueData = [
  { name: '00:00', value: 4000 },
  { name: '04:00', value: 3000 },
  { name: '08:00', value: 2000 },
  { name: '12:00', value: 2780 },
  { name: '16:00', value: 1890 },
  { name: '20:00', value: 2390 },
  { name: '24:00', value: 3490 },
];

// ==========================================
// [COMPONENT] NEXUS ADMIN DASHBOARD (The Brain)
// ==========================================

const NexusAdmin = ({ onClose }: { onClose: () => void }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [events, setEvents] = useState(liveEventsData);

  // Clock & Live Feed Simulation
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const feedTimer = setInterval(() => {
       setEvents(prev => {
         const newEvent = prev[Math.floor(Math.random() * prev.length)];
         return [newEvent, ...prev.slice(0, 6)];
       });
    }, 2500);
    return () => { clearInterval(timer); clearInterval(feedTimer); };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black text-white font-mono overflow-hidden animate-in fade-in duration-500">
      
      {/* Admin Header */}
      <header className="h-16 border-b border-gray-800 flex justify-between items-center px-6 bg-gray-900/50 backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <Globe className="w-6 h-6 animate-pulse" />
            <span className="font-black text-xl tracking-widest">NEXUS ADMIN</span>
          </div>
          <span className="text-xs text-gray-500 border-l border-gray-700 pl-4 ml-2">
            GLOBAL OPERATIONS CENTER
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <div className="flex flex-col items-end text-gray-400">
            <span>SYSTEM TIME (UTC)</span>
            <span className="text-white font-bold text-sm">{currentTime.toISOString().split('T')[1].split('.')[0]}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded border border-green-500/30">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            ALL SYSTEMS NOMINAL
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="p-6 grid grid-cols-4 grid-rows-6 gap-6 h-[calc(100vh-64px)]">
        
        {/* 1. KPI Cards (Top Row) */}
        <div className="col-span-1 bg-gray-900/50 border border-gray-800 rounded-xl p-5 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
           <div className="flex justify-between items-start mb-2">
             <div className="p-2 bg-cyan-500/10 rounded-lg"><DollarSign className="w-5 h-5 text-cyan-400"/></div>
             <span className="text-xs text-green-400 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +12.5%</span>
           </div>
           <div className="text-2xl font-bold text-white">$14,205,000</div>
           <div className="text-xs text-gray-500 uppercase tracking-wider">Daily Volume</div>
        </div>
        <div className="col-span-1 bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-purple-500/50 transition-colors">
           <div className="flex justify-between items-start mb-2">
             <div className="p-2 bg-purple-500/10 rounded-lg"><Scan className="w-5 h-5 text-purple-400"/></div>
             <span className="text-xs text-purple-400">Active Now</span>
           </div>
           <div className="text-2xl font-bold text-white">8,492</div>
           <div className="text-xs text-gray-500 uppercase tracking-wider">Live Scans</div>
        </div>
        <div className="col-span-1 bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 transition-colors">
           <div className="flex justify-between items-start mb-2">
             <div className="p-2 bg-blue-500/10 rounded-lg"><Truck className="w-5 h-5 text-blue-400"/></div>
             <span className="text-xs text-blue-400">En Route</span>
           </div>
           <div className="text-2xl font-bold text-white">1,204</div>
           <div className="text-xs text-gray-500 uppercase tracking-wider">Shipments</div>
        </div>
        <div className="col-span-1 bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-red-500/50 transition-colors">
           <div className="flex justify-between items-start mb-2">
             <div className="p-2 bg-red-500/10 rounded-lg"><AlertTriangle className="w-5 h-5 text-red-400"/></div>
             <span className="text-xs text-red-400">Action Req.</span>
           </div>
           <div className="text-2xl font-bold text-white">3</div>
           <div className="text-xs text-gray-500 uppercase tracking-wider">Fraud Alerts</div>
        </div>

        {/* 2. Global Map Visualization (Middle Left - Large) */}
        <div className="col-span-3 row-span-3 bg-black border border-gray-800 rounded-xl relative overflow-hidden flex items-center justify-center">
           {/* Grid Background */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
           
           <div className="absolute top-4 left-4 z-10">
             <h3 className="text-lg font-bold text-white flex items-center gap-2"><Globe className="w-4 h-4 text-cyan-400"/> GLOBAL TRAFFIC</h3>
             <p className="text-xs text-gray-500">Real-time node activity</p>
           </div>

           {/* Abstract World Map with Ping Animations */}
           <div className="relative w-3/4 h-3/4 opacity-60">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-500 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              
              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 <path d="M 200 150 Q 400 50 600 200" stroke="rgba(6,182,212,0.2)" strokeWidth="1" fill="none" />
                 <path d="M 600 200 Q 500 400 400 300" stroke="rgba(168,85,247,0.2)" strokeWidth="1" fill="none" />
              </svg>
           </div>
        </div>

        {/* 3. Live Event Feed (Right Column) */}
        <div className="col-span-1 row-span-3 bg-gray-900/50 border border-gray-800 rounded-xl flex flex-col overflow-hidden">
           <div className="p-4 border-b border-gray-800 bg-gray-900/80">
             <h3 className="text-xs font-bold text-gray-400 flex items-center gap-2"><Activity className="w-3 h-3"/> LIVE FEED</h3>
           </div>
           <div className="flex-1 overflow-y-auto p-2 space-y-2">
             {events.map((ev, i) => (
               <div key={i} className="p-3 bg-black/40 border border-gray-800 rounded-lg text-xs animate-in slide-in-from-right duration-300">
                 <div className="flex justify-between text-gray-500 mb-1">
                   <span>{ev.time}</span>
                   <span className={ev.type === 'ALERT' ? 'text-red-500 font-bold' : 'text-cyan-500'}>{ev.type}</span>
                 </div>
                 <div className="text-white font-bold truncate">{ev.item}</div>
                 <div className="flex justify-between mt-1">
                   <span className="text-gray-400">{ev.loc}</span>
                   <span className="text-green-400">{ev.status}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* 4. Pending Auth Requests (Bottom Left) */}
        <div className="col-span-2 row-span-2 bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex flex-col">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-sm font-bold text-white flex items-center gap-2"><Lock className="w-4 h-4 text-yellow-400"/> PENDING AUTH APPROVALS</h3>
             <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">3 Pending</span>
           </div>
           <div className="space-y-3">
             <div className="flex items-center justify-between bg-black/40 p-3 rounded border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-xl">👜</div>
                  <div>
                    <div className="text-sm font-bold text-white">Hermes Birkin 25</div>
                    <div className="text-xs text-gray-500">Req by: Inspector Lee</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs rounded hover:bg-red-500/20">Reject</button>
                  <button className="px-3 py-1.5 bg-green-500 text-black font-bold text-xs rounded hover:bg-green-400">Approve K-TAG</button>
                </div>
             </div>
             <div className="flex items-center justify-between bg-black/40 p-3 rounded border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-xl">⌚</div>
                  <div>
                    <div className="text-sm font-bold text-white">Rolex Daytona</div>
                    <div className="text-xs text-gray-500">Req by: Store Manager</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs rounded hover:bg-red-500/20">Reject</button>
                  <button className="px-3 py-1.5 bg-green-500 text-black font-bold text-xs rounded hover:bg-green-400">Approve K-TAG</button>
                </div>
             </div>
           </div>
        </div>

        {/* 5. Revenue Chart (Bottom Right) */}
        <div className="col-span-2 row-span-2 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
           <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-cyan-400"/> REVENUE FLOW</h3>
           <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#555" tick={{fontSize: 10}} />
                  <YAxis stroke="#555" tick={{fontSize: 10}} />
                  <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} itemStyle={{color: '#fff'}} />
                  <Area type="monotone" dataKey="value" stroke="#06b6d4" fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

      </main>
    </div>
  );
};

// ==========================================
// [COMPONENT] APP LOGIC (Client Side)
// ==========================================

const KTagAppInner = () => {
  const [activeTab, setActiveTab] = useState('shop'); 
  const [scanning, setScanning] = useState(false); 
  const [scanResult, setScanResult] = useState<any>(null); 
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [orderStatus, setOrderStatus] = useState('idle'); // idle, processing, shipped

  // --- Actions ---
  const activateScanner = () => {
    setScanning(true);
    setTimeout(() => {
        setScanning(false);
        // Realistic Scan Result: Rolex
        setScanResult({
            brand: "ROLEX",
            name: "Submariner Date 126610LN",
            serial: "8274X992",
            authDate: "2024.05.20",
            inspector: "Master Lee",
            price: "$14,500",
            marketDiff: "+2.4%",
            history: [
                { date: "2024.05.15", event: "Produced in Geneva", loc: "Swiss" },
                { date: "2024.05.18", event: "Arrived at K-TAG Lab", loc: "Seoul" },
                { date: "2024.05.20", event: "Authentication Complete", loc: "Seoul" }
            ]
        });
        setActiveTab('scan_result');
    }, 2000); 
  };

  const handleOrder = () => {
      setOrderStatus('processing');
      setTimeout(() => {
          setOrderStatus('shipped');
      }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white text-black font-sans overflow-hidden relative">
      
      {/* App Header (Minimalist) */}
      <header className="px-5 py-4 flex justify-between items-center bg-white border-b border-gray-100 sticky top-0 z-10">
        <span className="font-black tracking-tighter text-lg">K-TAG</span>
        <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-400" />
            <Menu className="w-5 h-5 text-gray-800" />
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative overflow-y-auto bg-gray-50">
          

          {/* VIEW: SCANNING (Camera Mode) */}
          {scanning && (
              <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center">
                  <div className="w-64 h-64 border-2 border-white/30 rounded-lg relative flex items-center justify-center">
                      <div className="w-60 h-60 border border-white/10 rounded"></div>
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500 animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_10px_red]"></div>
                  </div>
                  <p className="text-white mt-8 font-medium animate-pulse">Align code within frame</p>
              </div>
          )}

          {/* VIEW: SCAN RESULT (Digital Certificate) */}
          {activeTab === 'scan_result' && scanResult && (
              <div className="p-6 bg-white min-h-full">
                  <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white mb-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-gray-500 to-black"></div>
                      
                      {/* Certificate Header */}
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">Digital Guarantee</p>
                              <h2 className="text-2xl font-black tracking-tight">{scanResult.brand}</h2>
                          </div>
                          <ShieldCheck className="w-8 h-8 text-black" />
                      </div>

                      {/* Product Info */}
                      <div className="space-y-4 mb-6">
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                              <span className="text-sm text-gray-500">Model</span>
                              <span className="text-sm font-bold">{scanResult.name}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                              <span className="text-sm text-gray-500">Serial No.</span>
                              <span className="text-sm font-mono">{scanResult.serial}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-100 pb-2">
                              <span className="text-sm text-gray-500">Auth Date</span>
                              <span className="text-sm font-bold">{scanResult.authDate}</span>
                          </div>
                          <div className="flex justify-between pb-2">
                              <span className="text-sm text-gray-500">Inspector</span>
                              <span className="text-sm font-bold">{scanResult.inspector}</span>
                          </div>
                      </div>

                      {/* Signature Area */}
                      <div className="mt-4 pt-4 border-t border-dashed border-gray-300 flex justify-between items-end">
                          <div className="text-[10px] text-gray-400">
                              Verified by K-TAG Lab.<br/>Blockchain Hash: 0x82...9f
                          </div>
                          <div className="w-16 h-16">
                              {/* QR Code Placeholder */}
                              <div className="w-full h-full bg-black p-1">
                                  <div className="w-full h-full border-2 border-white bg-black flex items-center justify-center text-white text-[8px] text-center leading-none">
                                      SECURE<br/>CODE
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setActiveTab('shop')} className="py-4 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50">Close</button>
                      <button className="py-4 rounded-xl bg-black text-white font-bold shadow-lg hover:bg-gray-800">View Market Value</button>
                  </div>
              </div>
          )}

          {/* VIEW: SHOP (Clean Grid) */}
          {activeTab === 'shop' && (
              <div className="p-5 pb-20">
                  <div className="flex justify-between items-end mb-6">
                      <h2 className="text-2xl font-bold">Discover<br/><span className="text-gray-400">Premium Assets</span></h2>
                      <div className="text-xs font-bold border-b-2 border-black pb-1">View All</div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                      {shopItems.map((item) => (
                          <div key={item.id} onClick={() => setSelectedItem(item)} className="group bg-white rounded-2xl p-4 shadow-[0_5px_20px_rgba(0,0,0,0.03)] border border-gray-100 cursor-pointer active:scale-95 transition-transform">
                              <div className="aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center text-6xl relative overflow-hidden">
                                  <span className="group-hover:scale-110 transition-transform duration-500">{item.image}</span>
                                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-[10px] font-bold shadow-sm border border-gray-100">
                                      {item.condition}
                                  </div>
                              </div>
                              <div>
                                  <div className="text-[10px] font-bold text-gray-400 tracking-wider">{item.brand}</div>
                                  <div className="font-bold text-lg mb-1">{item.name}</div>
                                  <div className="flex justify-between items-center">
                                      <div className="text-sm font-bold">{item.price}</div>
                                      <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                          <MapPin className="w-3 h-3" /> {item.origin}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}

          {/* VIEW: ITEM DETAIL (Trust & Logistics) */}
          {selectedItem && (
              <div className="absolute inset-0 z-40 bg-white flex flex-col animate-in slide-in-from-right duration-300 overflow-y-auto">
                  {/* Close Button */}
                  <button onClick={() => setSelectedItem(null)} className="absolute top-4 left-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm">
                      <ChevronRight className="w-6 h-6 rotate-180 text-black" />
                  </button>

                  {/* Image Header */}
                  <div className="h-80 bg-gray-50 flex items-center justify-center text-9xl shadow-inner">
                      {selectedItem.image}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 -mt-6 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative">
                      <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
                      
                      {/* Header Info */}
                      <div className="mb-8">
                          <div className="flex justify-between items-start">
                              <div>
                                  <span className="text-xs font-bold text-gray-400 tracking-widest">{selectedItem.brand}</span>
                                  <h1 className="text-2xl font-black mt-1">{selectedItem.name}</h1>
                              </div>
                              <div className="text-2xl font-bold">{selectedItem.price}</div>
                          </div>
                      </div>

                      {/* Trust Indicators (Realistic) */}
                      <div className="grid grid-cols-3 gap-2 mb-8">
                          <div className="bg-gray-50 p-3 rounded-xl text-center border border-gray-100">
                              <ShieldCheck className="w-5 h-5 mx-auto mb-2 text-gray-800" />
                              <div className="text-[10px] font-bold text-gray-500">Auth Verified</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-xl text-center border border-gray-100">
                              <Box className="w-5 h-5 mx-auto mb-2 text-gray-800" />
                              <div className="text-[10px] font-bold text-gray-500">Double Box</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-xl text-center border border-gray-100">
                              <Truck className="w-5 h-5 mx-auto mb-2 text-gray-800" />
                              <div className="text-[10px] font-bold text-gray-500">Express Ship</div>
                          </div>
                      </div>

                      {/* Purchase Button */}
                      <div className="pb-6">
                          {orderStatus === 'idle' && (
                              <button onClick={handleOrder} className="w-full py-4 bg-black text-white font-bold rounded-xl shadow-xl hover:bg-gray-800 transition-colors flex justify-center items-center gap-2">
                                  Secure Checkout <ArrowRight className="w-4 h-4" />
                              </button>
                          )}
                          {orderStatus === 'processing' && (
                              <button className="w-full py-4 bg-gray-100 text-gray-500 font-bold rounded-xl flex justify-center items-center gap-2 cursor-not-allowed">
                                  <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                                  Processing Payment...
                              </button>
                          )}
                          {orderStatus === 'shipped' && (
                              <div className="w-full py-4 bg-green-50 text-green-700 font-bold rounded-xl flex justify-center items-center gap-2 border border-green-200">
                                  <CheckCircle2 className="w-5 h-5" /> Order Confirmed
                              </div>
                          )}
                          {orderStatus === 'shipped' && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                                  <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Logistics Status</div>
                                  <div className="flex items-center gap-3">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <div className="text-sm font-bold">Preparing for Dispatch</div>
                                  </div>
                                  <div className="text-xs text-gray-400 mt-1 pl-5">Est. Delivery: 2-3 Business Days</div>
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          )}

      </main>

      {/* App Bottom Nav (Simple & Clean) */}
      <nav className="bg-white border-t border-gray-100 flex justify-around items-center px-4 py-3 pb-6 sticky bottom-0 z-20">
        <button onClick={() => setActiveTab('shop')} className={`p-2 rounded-xl transition-all ${activeTab === 'shop' ? 'bg-gray-100 text-black' : 'text-gray-400'}`}>
            <ShoppingBag className="w-6 h-6" />
        </button>
        <button onClick={activateScanner} className="p-4 bg-black text-white rounded-full shadow-lg -mt-8 hover:scale-105 transition-transform">
            <Scan className="w-6 h-6" />
        </button>
        <button onClick={() => setActiveTab('my')} className={`p-2 rounded-xl transition-all ${activeTab === 'my' ? 'bg-gray-100 text-black' : 'text-gray-400'}`}>
            <User className="w-6 h-6" />
        </button>
      </nav>

    </div>
  );
};

// ==========================================
// [COMPONENT] MAIN WEBSITE SHELL (Container)
// ==========================================

const FieldNineEmpire = () => {
  const [appOpen, setAppOpen] = useState(true);
  const [adminMode, setAdminMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden relative flex flex-col">
      
      {/* NEXUS ADMIN OVERLAY */}
      {adminMode && <NexusAdmin onClose={() => setAdminMode(false)} />}

      {/* Desktop Navigation */}
      <nav className="w-full bg-white border-b border-gray-200 px-8 h-20 flex items-center justify-between z-30">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded text-sm">K</div>
              K-TAG
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-black">Solutions</a>
              <a href="#" className="hover:text-black">Authentication</a>
              {/* NEXUS TRIGGER BUTTON */}
              <button 
                onClick={() => setAdminMode(true)} 
                className="hover:text-cyan-600 font-bold flex items-center gap-1 text-black"
              >
                <Activity className="w-4 h-4" /> Nexus
              </button>
              <a href="#" className="hover:text-black">Enterprise</a>
          </div>
          <button 
            onClick={() => setAppOpen(!appOpen)}
            className="px-5 py-2.5 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors hidden md:block"
          >
            {appOpen ? 'Close Simulator' : 'Launch App Demo'}
          </button>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex relative">
          
          {/* Left: Value Proposition */}
          <div className="flex-1 flex flex-col justify-center px-12 lg:px-24 z-10">
              <div className="inline-block px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-bold w-fit mb-6">
                  Global Standard for Trust
              </div>
              <h1 className="text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-8 text-gray-900">
                  Trust is<br/>the New<br/>Currency.
              </h1>
              <p className="text-xl text-gray-500 max-w-lg mb-10 leading-relaxed">
                  전 세계 명품과 자산을 가장 안전하게 거래하는 표준.<br/>
                  K-TAG의 검증된 네트워크를 통해<br/>
                  가품 없는 세상을 경험하십시오.
              </p>
              <div className="flex gap-4">
                  <div className="flex flex-col border-l-2 border-black pl-4">
                      <span className="text-3xl font-bold">100%</span>
                      <span className="text-xs text-gray-500 font-bold uppercase">Authenticity</span>
                  </div>
                  <div className="flex flex-col border-l-2 border-gray-200 pl-4">
                      <span className="text-3xl font-bold text-gray-400">24h</span>
                      <span className="text-xs text-gray-400 font-bold uppercase">Inspection</span>
                  </div>
                  <div className="flex flex-col border-l-2 border-gray-200 pl-4">
                      <span className="text-3xl font-bold text-gray-400">0%</span>
                      <span className="text-xs text-gray-400 font-bold uppercase">Fraud Rate</span>
                  </div>
              </div>
          </div>

          {/* Right: App Simulator */}
          <div className={`flex-1 relative bg-gray-100 flex items-center justify-center transition-all duration-700 ${appOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              {/* Phone Frame */}
              <div className="relative w-[375px] h-[760px] bg-white rounded-[50px] shadow-[0_20px_80px_rgba(0,0,0,0.15)] border-[8px] border-black overflow-hidden z-20 ring-1 ring-gray-200">
                  {/* Dynamic Island */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50"></div>
                  {/* The App */}
                  <KTagAppInner />
              </div>
              
              {/* Background Decor */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-gray-200 to-white rounded-full z-0"></div>
          </div>

      </div>

    </div>
  );
};

export default FieldNineEmpire;
