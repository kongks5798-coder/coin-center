import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, User, X, Heart, Zap, Scan, Crosshair, 
  TrendingUp, Globe, CheckCircle2, Menu, Bell, LayoutDashboard, 
  Filter, ArrowRight, ShieldCheck, Maximize2, Minimize2, Smartphone, 
  Cpu, Layers, ChevronRight, Download, Share, PlusSquare, Camera, 
  Shirt, Sparkles, Wine, Gamepad2, Watch, CreditCard, Truck, 
  Package, Car, Armchair, Apple, Clock, BarChart3, Award, MapPin, 
  FileText, Box
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

// ==========================================
// [DATA] REALISTIC INVENTORY
// ==========================================

const shopItems = [
  { id: 1, brand: "ROLEX", name: "Submariner Date", price: "$14,500", image: "⌚", condition: "New", origin: "Geneva, CH" },
  { id: 2, brand: "HERMES", name: "Birkin 30 Togo", price: "$22,000", image: "👜", condition: "A-Grade", origin: "Paris, FR" },
  { id: 3, brand: "NIKE", name: "Jordan 1 Chicago", price: "$1,800", image: "👟", condition: "New", origin: "New York, US" },
  { id: 4, brand: "LEICA", name: "M6 Rangefinder", price: "$3,200", image: "📷", condition: "Mint", origin: "Berlin, DE" },
  { id: 5, brand: "SUNTORY", name: "Yamazaki 18yr", price: "$980", image: "🥃", condition: "New", origin: "Osaka, JP" },
  { id: 6, brand: "APPLE", name: "MacBook Pro M3", price: "$2,499", image: "💻", condition: "New", origin: "Seoul, KR" },
];

// Mock Price History Data for Graph
const priceData = [
  { name: 'Jan', value: 13800 },
  { name: 'Feb', value: 14100 },
  { name: 'Mar', value: 13900 },
  { name: 'Apr', value: 14200 },
  { name: 'May', value: 14500 },
];

// ==========================================
// [COMPONENT] APP LOGIC (Clean & Trustworthy)
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

                      {/* Market Data Graph (Simple) */}
                      <div className="mb-8">
                          <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" /> Market Price Trend
                          </h3>
                          <div className="h-32 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={priceData}>
                                      <Line type="monotone" dataKey="value" stroke="#000000" strokeWidth={2} dot={false} />
                                      <Tooltip 
                                        contentStyle={{background: '#000', border: 'none', borderRadius: '8px', color: '#fff'}}
                                        itemStyle={{color: '#fff', fontSize: '12px'}}
                                        formatter={(value) => [`$${value}`, 'Price']}
                                        labelStyle={{display: 'none'}}
                                      />
                                  </LineChart>
                              </ResponsiveContainer>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-2 text-center">
                              *Based on last 6 months global transaction data.
                          </p>
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
// [COMPONENT] MAIN WEBSITE SHELL
// ==========================================

const FieldNineEmpire = () => {
  const [appOpen, setAppOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden relative flex flex-col">
      
      {/* Desktop Navigation */}
      <nav className="w-full bg-white border-b border-gray-200 px-8 h-20 flex items-center justify-between z-30">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded text-sm">K</div>
              K-TAG
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-black">Solutions</a>
              <a href="#" className="hover:text-black">Authentication</a>
              <a href="#" className="hover:text-black">Pricing</a>
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
