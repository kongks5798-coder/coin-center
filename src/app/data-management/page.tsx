'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import {
  LayoutDashboard, Plus, FileText, Database, Settings, Search,
  Bell, ChevronDown, Filter, Download, Upload, MoreHorizontal,
  TrendingUp, Users, DollarSign, Briefcase, Calendar, CheckCircle
} from 'lucide-react';

// ⛔ CRITICAL SECURITY: 데이터 관리 시스템 - 총괄/본부장 전용
// 최고 보안 등급 - 재무, 세무, 인사 등 핵심 데이터 관리

// --- Types ---
interface DataEntry {
  id: string;
  category: string;
  title: string;
  data: any;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  department: string;
  accessLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NORMAL' | 'PUBLIC';
  tags: string[];
  status: 'draft' | 'pending' | 'approved' | 'rejected';
}

interface DataTemplate {
  id: string;
  name: string;
  category: string;
  icon: any;
  description: string;
  fields: TemplateField[];
  requiredRole: string[];
}

interface TemplateField {
  name: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'select' | 'textarea' | 'file';
  label: string;
  required: boolean;
  options?: string[];
}

// --- Mock Data for Charts ---
const REVENUE_DATA = [
  { month: '1월', revenue: 12400, cost: 8200, profit: 4200 },
  { month: '2월', revenue: 14800, cost: 9100, profit: 5700 },
  { month: '3월', revenue: 16200, cost: 9800, profit: 6400 },
  { month: '4월', revenue: 18900, cost: 10500, profit: 8400 },
  { month: '5월', revenue: 21500, cost: 11200, profit: 10300 },
  { month: '6월', revenue: 24100, cost: 12800, profit: 11300 },
];

const EXPENSE_BY_CATEGORY = [
  { name: '인건비', value: 45 },
  { name: '인프라', value: 25 },
  { name: '마케팅', value: 15 },
  { name: '운영비', value: 10 },
  { name: '기타', value: 5 },
];

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#64748b'];

// --- Templates ---
const DATA_TEMPLATES: DataTemplate[] = [
  {
    id: 'financial-revenue',
    name: '월간 매출 입력',
    category: 'financial',
    icon: DollarSign,
    description: '월별 매출 데이터 입력 (최고 보안)',
    requiredRole: ['executive', 'general_manager'],
    fields: [
      { name: 'month', type: 'date', label: '년월', required: true },
      { name: 'revenue', type: 'currency', label: '매출액', required: true },
      { name: 'cost', type: 'currency', label: '비용', required: true },
      { name: 'profit', type: 'currency', label: '순이익', required: true },
      { name: 'category', type: 'select', label: '구분', required: true, options: ['상품매출', '서비스매출', '기타매출'] },
      { name: 'notes', type: 'textarea', label: '비고', required: false }
    ]
  },
  {
    id: 'hr-salary',
    name: '급여 정보',
    category: 'hr',
    icon: Users,
    description: '직원 급여 데이터 (임원진 공유)',
    requiredRole: ['executive', 'general_manager', 'director', 'manager'],
    fields: [
      { name: 'employeeName', type: 'text', label: '직원명', required: true },
      { name: 'month', type: 'date', label: '급여월', required: true },
      { name: 'baseSalary', type: 'currency', label: '기본급', required: true },
      { name: 'bonus', type: 'currency', label: '상여금', required: false },
      { name: 'netPay', type: 'currency', label: '실수령액', required: true }
    ]
  },
  {
    id: 'project-new',
    name: '신규 프로젝트',
    category: 'project',
    icon: Briefcase,
    description: '새 프로젝트 등록 (임원/팀장급)',
    requiredRole: ['executive', 'general_manager', 'director', 'manager', 'team_leader'],
    fields: [
      { name: 'projectName', type: 'text', label: '프로젝트명', required: true },
      { name: 'startDate', type: 'date', label: '시작일', required: true },
      { name: 'budget', type: 'currency', label: '예산', required: true },
      { name: 'team', type: 'select', label: '담당팀', required: true, options: ['디자인팀', 'MARD MARD', '생산팀', '온라인팀'] },
      { name: 'description', type: 'textarea', label: '설명', required: true }
    ]
  }
];

const ROLE_HIERARCHY: Record<string, number> = {
  'executive': 9, 'general_manager': 8, 'director': 7, 'manager': 6,
  'team_leader': 5, 'lead': 4, 'senior': 3, 'staff': 2, 'intern': 1
};

export default function DataManagementPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'entry' | 'list'>('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<DataTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [dataEntries, setDataEntries] = useState<DataEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check and data loading
    const checkAuth = () => {
      const storedUser = localStorage.getItem('fieldnine-user');
      if (!storedUser) {
        // For demo purposes, if no user, create a mock admin user
        const mockUser = {
          name: '공경수',
          role: 'executive',
          department: 'Management',
          avatar: '👑'
        };
        localStorage.setItem('fieldnine-user', JSON.stringify(mockUser));
        setUser(mockUser);
      } else {
        setUser(JSON.parse(storedUser));
      }

      const storedData = localStorage.getItem('fieldnine-data-entries');
      if (storedData) {
        setDataEntries(JSON.parse(storedData));
      }

      setTimeout(() => setIsLoading(false), 800);
    };

    checkAuth();
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate || !user) return;

    const newEntry: DataEntry = {
      id: `data-${Date.now()}`,
      category: selectedTemplate.category,
      title: formData.title || selectedTemplate.name,
      data: { ...formData },
      createdBy: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      department: user.department,
      accessLevel: selectedTemplate.category === 'financial' ? 'CRITICAL' : 'HIGH',
      tags: [selectedTemplate.category, user.department],
      status: 'pending'
    };

    const updated = [newEntry, ...dataEntries];
    setDataEntries(updated);
    localStorage.setItem('fieldnine-data-entries', JSON.stringify(updated));

    // Show success animation/toast here (omitted for brevity)
    alert('데이터가 성공적으로 저장되었습니다.');
    setSelectedTemplate(null);
    setFormData({});
    setActiveTab('list');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm animate-pulse">Secure System Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-blue-500/30">
      {/* Sidebar Navigation (Simplified) */}
      <nav className="fixed top-0 left-0 h-full w-20 bg-[#09090b] border-r border-white/5 flex flex-col items-center py-8 z-50">
        <Link href="/" className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
          <span className="font-bold text-white">F9</span>
        </Link>

        <div className="flex flex-col gap-6 w-full px-4">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: '대시보드' },
            { id: 'entry', icon: Plus, label: '입력' },
            { id: 'list', icon: Database, label: '데이터' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`p-3 rounded-xl transition-all duration-300 group relative ${activeTab === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
            >
              <item.icon size={20} />
              <span className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/10">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-6 w-full px-4">
          <Link href="/workspace" className="p-3 text-gray-500 hover:text-white transition-colors">
            <Briefcase size={20} />
          </Link>
          <button className="p-3 text-gray-500 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
            {user?.avatar || 'U'}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pl-20 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Data Management System
            </h1>
            <p className="text-sm text-gray-500">Enterprise Grade • Security Level: CRITICAL</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search data..."
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all w-64"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Revenue', value: '₩241.5M', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Active Projects', value: '14', change: '+2', trend: 'up', icon: Briefcase, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    { label: 'Team Members', value: '32', change: '0', trend: 'neutral', icon: Users, color: 'text-green-400', bg: 'bg-green-500/10' },
                    { label: 'Pending Approvals', value: '5', change: '-3', trend: 'down', icon: CheckCircle, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                          <stat.icon size={24} />
                        </div>
                        <span className={`text-sm font-medium px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : stat.trend === 'down' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
                      <p className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Chart */}
                  <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-white">Revenue & Profit Trend</h3>
                      <select className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-sm text-gray-400 focus:outline-none">
                        <option>Last 6 Months</option>
                        <option>This Year</option>
                      </select>
                    </div>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={REVENUE_DATA}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="month" stroke="#666" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                          <YAxis stroke="#666" tick={{ fill: '#888' }} axisLine={false} tickLine={false} tickFormatter={(value) => `₩${value / 1000}k`} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#333', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                          <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Secondary Chart */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Expense Breakdown</h3>
                    <div className="h-[300px] w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={EXPENSE_BY_CATEGORY}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {EXPENSE_BY_CATEGORY.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#333', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="text-xl font-bold text-white">₩12.8M</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {EXPENSE_BY_CATEGORY.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <span className="text-xs text-gray-400">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Entry View */}
            {activeTab === 'entry' && (
              <motion.div
                key="entry"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {!selectedTemplate ? (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Select Data Template</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {DATA_TEMPLATES.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => setSelectedTemplate(template)}
                          className="group bg-white/5 border border-white/10 rounded-2xl p-8 text-left hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                          <div className="relative z-10">
                            <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:border-blue-500/50 transition-colors shadow-lg">
                              <template.icon size={28} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{template.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                {template.category.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-3xl mx-auto">
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                      <ChevronDown className="rotate-90 mr-2" size={16} />
                      Back to Templates
                    </button>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                          <selectedTemplate.icon size={32} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">{selectedTemplate.name}</h2>
                          <p className="text-gray-400">{selectedTemplate.description}</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {selectedTemplate.fields.map((field) => (
                            <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                {field.label} {field.required && <span className="text-red-400">*</span>}
                              </label>

                              {field.type === 'select' ? (
                                <div className="relative">
                                  <select
                                    required={field.required}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                  >
                                    <option value="">Select...</option>
                                    {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                  </select>
                                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                </div>
                              ) : field.type === 'textarea' ? (
                                <textarea
                                  required={field.required}
                                  rows={4}
                                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                />
                              ) : (
                                <input
                                  type={field.type === 'currency' ? 'number' : field.type}
                                  required={field.required}
                                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                />
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                          <button
                            type="button"
                            onClick={() => setSelectedTemplate(null)}
                            className="px-6 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1"
                          >
                            Save Data
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* List View */}
            {activeTab === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-white">Data Entries</h2>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors border border-white/5">
                        <Filter size={16} /> Filter
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors border border-white/5">
                        <Download size={16} /> Export
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-gray-400 text-sm">
                          <th className="p-4 font-medium">Title</th>
                          <th className="p-4 font-medium">Category</th>
                          <th className="p-4 font-medium">Created By</th>
                          <th className="p-4 font-medium">Date</th>
                          <th className="p-4 font-medium">Status</th>
                          <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {dataEntries.length > 0 ? (
                          dataEntries.map((entry) => (
                            <tr key={entry.id} className="hover:bg-white/5 transition-colors group">
                              <td className="p-4">
                                <div className="font-medium text-white">{entry.title}</div>
                                <div className="text-xs text-gray-500">{entry.id}</div>
                              </td>
                              <td className="p-4">
                                <span className="px-2 py-1 rounded text-xs font-medium bg-white/10 text-gray-300 border border-white/5">
                                  {entry.category}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center justify-center text-[10px]">
                                    {entry.createdBy.charAt(0)}
                                  </div>
                                  <span className="text-sm text-gray-300">{entry.createdBy}</span>
                                </div>
                              </td>
                              <td className="p-4 text-sm text-gray-400">
                                {new Date(entry.createdAt).toLocaleDateString()}
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${entry.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                                    entry.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                                      'bg-gray-500/10 text-gray-400'
                                  }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${entry.status === 'approved' ? 'bg-green-400' :
                                      entry.status === 'pending' ? 'bg-yellow-400' :
                                        'bg-gray-400'
                                    }`}></span>
                                  {entry.status ? entry.status.toUpperCase() : 'DRAFT'}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <button className="p-2 text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                  <MoreHorizontal size={18} />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="p-12 text-center text-gray-500">
                              <Database size={48} className="mx-auto mb-4 opacity-20" />
                              <p>No data entries found.</p>
                              <button
                                onClick={() => setActiveTab('entry')}
                                className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
                              >
                                + Add New Entry
                              </button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
