'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowRight, Cpu, Globe, Network, ShieldCheck, ChevronDown, Menu, X, Share2, 
  Workflow, Layers, Lock, Zap, FileText, Users, Code, Search, Box, 
  MessageSquare, BarChart, Bell, Settings, Database, Server, Fingerprint, Activity, Plus, Minus, Scan, QrCode, Award
} from 'lucide-react';

const FieldNineFinal = () => {
  const [activeTab, setActiveTab] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- SUB-COMPONENTS ---

  // 1. KAUS AI DASHBOARD (엔터프라이즈 솔루션)
  const KausView = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authStep, setAuthStep] = useState(0); // 0: init, 1: scanning, 2: success
    const [searchQuery, setSearchQuery] = useState('');
    const [activeModule, setActiveModule] = useState('dashboard');
    
    // Interactive Inventory Logic
    const [inventory, setInventory] = useState([
      { id: 1, name: 'NVIDIA H100 GPU', category: 'Hardware', status: 'In Stock', qty: 450, prediction: 'Low Stock Soon' },
      { id: 2, name: 'Quantum Sensor V2', category: 'R&D Kit', status: 'Shipping', qty: 1200, prediction: '-' },
      { id: 3, name: 'Cooling Module X', category: 'Parts', status: 'Critical', qty: 12, prediction: 'Order Required' },
      { id: 4, name: 'Server Rack Mount', category: 'Infra', status: 'In Stock', qty: 80, prediction: 'Stable' },
    ]);

    const updateStock = (id: number, delta: number) => {
      setInventory(prev => prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.qty + delta);
          let newStatus = item.status;
          if (newQty === 0) newStatus = 'Out of Stock';
          else if (newQty < 50) newStatus = 'Critical';
          else newStatus = 'In Stock';
          return { ...item, qty: newQty, status: newStatus };
        }
        return item;
      }));
    };

    const filteredInventory = useMemo(() => {
      if (!searchQuery) return inventory;
      return inventory.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [inventory, searchQuery]);

    // Simulated Security Login
    const handleLogin = () => {
      setAuthStep(1);
      setTimeout(() => {
        setAuthStep(2);
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 800);
      }, 1500);
    };

    // Login Screen
    if (!isAuthenticated) {
      return (
        <div className="pt-24 pb-10 bg-[#050505] min-h-screen flex items-center justify-center font-sans animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px]"></div>

          <div className="relative z-10 w-full max-w-md bg-black border border-white/10 p-8 rounded-2xl shadow-2xl shadow-indigo-500/10 text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 relative">
                {authStep === 0 && <Lock size={32} className="text-gray-400" />}
                {authStep === 1 && <Fingerprint size={32} className="text-indigo-500 animate-pulse" />}
                {authStep === 2 && <ShieldCheck size={32} className="text-green-500" />}
                {authStep === 1 && <div className="absolute inset-0 border-2 border-indigo-500 rounded-full animate-ping opacity-20"></div>}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">KAUS SECURE GATE</h2>
            <p className="text-gray-500 text-sm mb-8">
              {authStep === 0 && "Enter credentials to access the Neural Workspace."}
              {authStep === 1 && "Verifying Biometric Hash..."}
              {authStep === 2 && "Identity Confirmed. Establishing Secure Tunnel."}
            </p>

            {authStep === 0 && (
              <div className="space-y-4">
                <button 
                  onClick={handleLogin}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
                >
                  INITIALIZE ACCESS
                </button>
                <div className="flex justify-between text-xs text-gray-600 mt-4">
                  <span className="flex items-center gap-1"><Lock size={10}/> End-to-End Encrypted</span>
                  <span>v.2.4.0 (Stable)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Main Dashboard
    return (
      <div className="pt-24 pb-10 bg-[#0A0A0A] min-h-screen animate-fade-in font-sans">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex gap-6">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col w-64 h-[calc(100vh-140px)] sticky top-28 bg-white/5 rounded-2xl border border-white/10 p-4 backdrop-blur-md">
            <div className="flex items-center gap-3 px-4 py-4 mb-6 border-b border-white/10">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                <Cpu size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white tracking-wider">KAUS AI</h3>
                <p className="text-[10px] text-green-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  SECURE
                </p>
              </div>
            </div>
            <nav className="space-y-1 flex-1">
              {[
                { id: 'dashboard', icon: <BarChart size={18} />, label: 'Overview' },
                { id: 'inventory', icon: <Box size={18} />, label: 'Logistics' },
                { id: 'workspace', icon: <Database size={18} />, label: 'Data Room' },
                { id: 'team', icon: <Users size={18} />, label: 'Team' },
                { id: 'settings', icon: <Settings size={18} />, label: 'Security' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    activeModule === item.id 
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-inner' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 flex items-center gap-4 shadow-lg">
               <Search className="text-gray-400" size={20} />
               <input 
                 type="text" 
                 placeholder="KAUS Neural Search... (e.g., 'Inventory status', 'Q4 Report')" 
                 className="bg-transparent border-none focus:ring-0 text-white w-full placeholder-gray-500 outline-none"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
               <div className="flex gap-3 items-center border-l border-white/10 pl-4">
                 <div className="flex flex-col items-end mr-2">
                    <span className="text-[10px] text-gray-500 uppercase">Connection</span>
                    <span className="text-xs text-green-400 font-mono">ENCRYPTED</span>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats */}
              <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                 <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
                    <div className="text-gray-500 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Box size={14}/> Total Assets
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {inventory.reduce((acc, item) => acc + item.qty, 0).toLocaleString()}
                    </div>
                 </div>
                 <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
                    <div className="text-gray-500 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Activity size={14}/> System Status
                    </div>
                    <div className="text-3xl font-bold text-green-400 mb-1">99.9%</div>
                 </div>
                 <div className="bg-indigo-900/20 border border-indigo-500/30 p-6 rounded-2xl md:col-span-2">
                    <div className="text-indigo-400 text-xs uppercase tracking-widest mb-1">KAUS Insight</div>
                    <div className="text-sm text-white">"재고 데이터 패턴 분석 완료. 물류 효율화 리포트가 생성되었습니다."</div>
                 </div>
              </div>

              {/* Interactive List */}
              <div className="col-span-1 md:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                       <Box className="text-indigo-500" size={20} /> 실시간 자산 현황
                    </h3>
                    <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> LIVE
                    </span>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                       <thead className="text-xs text-gray-500 uppercase bg-white/5 border-b border-white/10">
                          <tr>
                             <th className="px-4 py-3">Asset Name</th>
                             <th className="px-4 py-3">Status</th>
                             <th className="px-4 py-3 text-center">Control</th>
                             <th className="px-4 py-3 text-right">Qty</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                          {filteredInventory.map((item) => (
                              <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-4 py-3 font-medium text-white group-hover:text-indigo-400">{item.name}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-xs border ${
                                        item.status === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                                        item.status === 'In Stock' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                    }`}>{item.status}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <button onClick={() => updateStock(item.id, -1)} className="p-1 hover:bg-white/20 rounded"><Minus size={14}/></button>
                                        <button onClick={() => updateStock(item.id, 1)} className="p-1 hover:bg-white/20 rounded"><Plus size={14}/></button>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right font-mono text-white">{item.qty.toLocaleString()}</td>
                              </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              {/* Workspace */}
              <div className="col-span-1 bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                       <FileText className="text-purple-500" size={20} /> Secure Workspace
                    </h3>
                 </div>
                 <div className="space-y-3 flex-1">
                    <div className="p-3 bg-white/5 rounded-xl border border-transparent hover:border-indigo-500/30 cursor-pointer">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-900/30 rounded text-blue-400"><FileText size={16}/></div>
                          <div>
                             <div className="text-sm font-bold text-white">Q4_Confidential.pdf</div>
                             <div className="text-[10px] text-gray-500">AES-256 Encrypted</div>
                          </div>
                       </div>
                    </div>
                    <button className="w-full mt-6 py-3 border border-dashed border-white/20 rounded-xl text-sm text-gray-400 hover:text-white hover:border-indigo-500 transition-all flex items-center justify-center gap-2">
                       <Share2 size={16} /> Secure Upload
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. HOME TAB
  const HomeView = () => (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-xs font-medium tracking-widest uppercase text-gray-300">The Next Generation Protocol</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-600">
            INTELLIGENCE <br />
            BEYOND LIMITS.
          </h1>
          
          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            우리는 연결을 넘어 지능을 설계합니다.<br />
            <span className="text-white font-medium">Nexus Tech</span>를 기반으로 신뢰와 확장성을 결합하여,<br className="hidden md:block"/>
            디지털 문명의 새로운 인프라를 구축하고 있습니다.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => navigateTo('technology')} className="bg-white text-black px-10 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group">
              DISCOVER OUR TECH
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigateTo('kaus')}
              className="px-10 py-4 rounded-full text-sm font-bold tracking-widest text-white border border-indigo-500/50 bg-indigo-900/20 hover:bg-indigo-900/40 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
            >
              <Cpu size={16} /> LAUNCH KAUS AI
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Summary */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xs font-bold tracking-widest text-indigo-500 mb-4">OUR PHILOSOPHY</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-12">Why Field Nine?</h3>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigateTo('vision')}>
                    <Globe className="mb-4 text-indigo-400" />
                    <h4 className="text-xl font-bold mb-2">Decentralized AI</h4>
                    <p className="text-gray-400 text-sm">중앙화된 권력을 분산시키고, 누구나 참여 가능한 지능형 네트워크를 구축합니다.</p>
                </div>
                <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigateTo('technology')}>
                    <Lock className="mb-4 text-purple-400" />
                    <h4 className="text-xl font-bold mb-2">Secure Consensus</h4>
                    <p className="text-gray-400 text-sm">속도와 보안의 딜레마를 해결한 독자적인 합의 알고리즘으로 금융권 수준의 보안을 제공합니다.</p>
                </div>
                <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer" onClick={() => navigateTo('ecosystem')}>
                    <Users className="mb-4 text-blue-400" />
                    <h4 className="text-xl font-bold mb-2">DAO Governance</h4>
                    <p className="text-gray-400 text-sm">투명한 거버넌스를 통해 생태계 참여자들이 직접 프로토콜의 미래를 결정합니다.</p>
                </div>
            </div>
        </div>
      </section>
    </>
  );

  // 3. VISION TAB
  const VisionView = () => (
    <div className="pt-32 pb-20 bg-black min-h-screen animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold tracking-widest text-indigo-500 mb-4">VISION & ROADMAP</h2>
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Designing the Singularity</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            우리는 기술이 인간의 통제를 벗어나는 것이 아니라, <br/>
            인간의 의도를 가장 완벽하게 수행하는 <span className="text-white">초지능(Super-Intelligence)</span> 시대를 준비합니다.
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10"></div>
          <div className="space-y-16 pl-12 relative">
            <div className="relative">
              <div className="absolute -left-[42px] top-1 w-6 h-6 rounded-full bg-indigo-600 border-4 border-black"></div>
              <span className="text-indigo-400 text-sm font-bold tracking-widest mb-2 block">PHASE 1 : GENESIS (2024.Q1-Q2)</span>
              <h3 className="text-2xl font-bold text-white mb-4">Foundation Construction</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0"/> Nexus Protocol 백서 발간</li>
                <li className="flex gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0"/> Core Team 구성 및 초기 Seed 투자 유치</li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -left-[42px] top-1 w-6 h-6 rounded-full bg-white border-4 border-black animate-pulse"></div>
              <span className="text-white text-sm font-bold tracking-widest mb-2 block">PHASE 2 : EXPANSION (2024.Q3-Q4)</span>
              <h3 className="text-2xl font-bold text-white mb-4">Ecosystem Growth</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0"/> Mainnet Beta 런칭 & Partners 10+</li>
                <li className="flex gap-2"><ArrowRight size={16} className="mt-1 flex-shrink-0"/> AI Governance 모듈 탑재</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. TECHNOLOGY TAB
  const TechnologyView = () => (
    <div className="pt-32 pb-20 bg-zinc-950 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold tracking-widest text-indigo-500 mb-4">CORE ARCHITECTURE</h2>
          <h1 className="text-5xl md:text-6xl font-bold mb-8">The Nexus Engine</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Field Nine의 기술 아키텍처는 속도, 보안, 확장성이라는 난제를 해결하기 위해<br/>
            <span className="text-white">3-Layered Neural Network</span> 구조로 설계되었습니다.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-black border border-white/10 p-8 rounded-2xl hover:border-indigo-500 transition-colors">
            <Layers size={48} className="text-indigo-500 mb-6"/>
            <h3 className="text-2xl font-bold mb-4 text-white">Settlement Layer</h3>
            <p className="text-gray-400 text-sm">모든 거래의 최종 완결성을 보장하는 기저 레이어. ZK-Rollup 기술 적용.</p>
          </div>
          <div className="bg-black border border-white/10 p-8 rounded-2xl hover:border-purple-500 transition-colors">
            <Cpu size={48} className="text-purple-500 mb-6"/>
            <h3 className="text-2xl font-bold mb-4 text-white">Computation Layer</h3>
            <p className="text-gray-400 text-sm">AI 모델 학습과 추론이 이루어지는 실행 레이어. GPU 자원 통합.</p>
          </div>
          <div className="bg-black border border-white/10 p-8 rounded-2xl hover:border-blue-500 transition-colors">
             <Globe size={48} className="text-blue-500 mb-6"/>
            <h3 className="text-2xl font-bold mb-4 text-white">Application Layer</h3>
            <p className="text-gray-400 text-sm">개발자와 사용자가 만나는 인터페이스 레이어. Nexus SDK 제공.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 5. ECOSYSTEM TAB
  const EcosystemView = () => (
    <div className="pt-32 pb-20 bg-gradient-to-b from-black to-zinc-900 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold tracking-widest text-indigo-500 mb-4">THE ECOSYSTEM</h2>
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Participate in Future</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Field Nine 생태계는 기여자들에게 공정한 리소스를 제공하며,<br/>
            모든 가치가 투명하게 순환하는 구조를 지향합니다.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 mb-20">
           <div className="bg-black p-10 rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-all">
             <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
               <Users className="text-indigo-500"/> Governance
             </h3>
             <p className="text-gray-400 mb-8 leading-relaxed">
               Nexus Protocol은 커뮤니티에 의해 운영됩니다. Protocol Member들은 주요 의사결정에 투표할 권리를 가집니다.
             </p>
           </div>
           <div className="bg-black p-10 rounded-3xl border border-white/10 hover:border-yellow-500/50 transition-all">
             <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
               <Zap className="text-yellow-500"/> Resource Dynamics
             </h3>
             <p className="text-gray-400 mb-8 leading-relaxed">
               생태계 내의 AI 연산과 데이터 전송은 Neural Credit을 연료로 사용합니다. 가치 최적화 모델을 따릅니다.
             </p>
           </div>
        </div>
      </div>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-lg">F</span>
              </div>
              <span className="text-xl font-bold tracking-widest text-white">FIELD NINE</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['vision', 'technology', 'ecosystem'].map((item) => (
                <button 
                  key={item}
                  onClick={() => navigateTo(item)}
                  className={`text-sm font-medium transition-colors tracking-wide uppercase ${activeTab === item ? 'text-white border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white'}`}
                >
                  {item}
                </button>
              ))}
              <div className="w-px h-6 bg-white/20 mx-2"></div>
              <button 
                onClick={() => navigateTo('kaus')}
                className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-all border ${
                  activeTab === 'kaus' 
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.5)]' 
                    : 'bg-white/5 text-indigo-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Cpu size={16} className={activeTab === 'kaus' ? 'animate-pulse' : ''} />
                KAUS ENGINE
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black border-b border-white/10 absolute w-full z-50">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {['home', 'vision', 'technology', 'ecosystem', 'kaus'].map((item) => (
                 <button key={item} onClick={() => navigateTo(item)} className="block w-full text-left py-3 text-lg font-medium text-gray-300 hover:text-white border-b border-white/5 uppercase">{item}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Switcher */}
      <main className="min-h-screen">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'vision' && <VisionView />}
        {activeTab === 'technology' && <TechnologyView />}
        {activeTab === 'ecosystem' && <EcosystemView />}
        {activeTab === 'kaus' && <KausView />}
      </main>

      {/* K-TAG PROPRIETARY TECHNOLOGY SECTION */}
      <section className="py-24 bg-[#080808] border-t border-white/5 relative overflow-hidden">
         <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
               <div className="md:w-1/2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/20 mb-6">
                     <Award size={14} className="text-yellow-400"/>
                     <span className="text-xs font-bold tracking-widest text-white uppercase">Patent Pending 2024</span>
                  </div>
                  <h2 className="text-xs font-bold tracking-[0.3em] text-gray-500 mb-2">PROPRIETARY TECHNOLOGY</h2>
                  <h3 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">K-TAG™</h3>
                  <h4 className="text-xl text-indigo-400 font-medium mb-8">Kinetic Trace Assurance Grid</h4>
                  <div className="space-y-6 text-gray-400 leading-relaxed font-light">
                     <p>
                        <strong className="text-white">Field Nine's Exclusive Technology.</strong><br/>
                        K-TAG is the world's first dynamic authentication protocol linking physical assets to the Nexus Blockchain. It bridges the gap between physical reality and digital truth.
                     </p>
                     <p>Unlike traditional static QR codes, K-TAG generates a <span className="text-white">cryptographically unique, time-sensitive hash</span> every time it is scanned. This makes duplication mathematically impossible.</p>
                     <p className="text-sm border-l-2 border-indigo-500 pl-4 mt-4 text-gray-500">
                        * Application No. 10-2024-XXXXXXX (KIPO/USPTO)<br/>
                        * Officially registered as a core technology of Field Nine Lab.
                     </p>
                  </div>
               </div>
               <div className="md:w-1/2 relative">
                  <div className="relative z-10 bg-black/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
                     <div className="flex justify-between items-start mb-12">
                        <Scan size={48} className="text-white opacity-80"/>
                        <QrCode size={48} className="text-indigo-500 animate-pulse"/>
                     </div>
                     <div className="space-y-4 font-mono text-sm">
                        <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-gray-500">PROTOCOL</span><span className="text-white">NEXUS-721 Standard</span></div>
                        <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-gray-500">ENCRYPTION</span><span className="text-white">SHA-3 + ZK-Proof</span></div>
                        <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-gray-500">RESPONSE</span><span className="text-green-400">0.02s (Instant)</span></div>
                        <div className="flex justify-between pt-2"><span className="text-gray-500">STATUS</span><span className="text-indigo-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div> VERIFIED</span></div>
                     </div>
                  </div>
                  <div className="absolute top-10 -right-10 w-full h-full border border-dashed border-white/10 rounded-3xl -z-10"></div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-white font-bold">F</div>
            <span className="font-bold text-white tracking-widest">FIELD NINE.</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Whitepaper</a>
          </div>
          <div className="text-right">
            <p>&copy; 2024 Field Nine Lab. All rights reserved.</p>
            <p className="mt-1">Designing the singularity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FieldNineFinal;
