"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface AISystem {
  id: string;
  name: string;
  icon: string;
  status: 'active' | 'warning' | 'offline';
  accuracy: number;
  latency: number;
  tasksToday: number;
  roi: number;
  color: string;
  url: string;
}

export default function AIHub() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const aiSystems: AISystem[] = [
    {
      id: 'demand-forecasting',
      name: 'Demand Forecasting',
      icon: '🧠',
      status: 'active',
      accuracy: 94.7,
      latency: 230,
      tasksToday: 1847,
      roi: 2.7,
      color: 'from-purple-500 to-pink-500',
      url: '/ai-demand'
    },
    {
      id: 'path-planning',
      name: 'Path Planning',
      icon: '🛣️',
      status: 'active',
      accuracy: 96.4,
      latency: 12,
      tasksToday: 8473,
      roi: 1.9,
      color: 'from-purple-500 to-cyan-500',
      url: '/ai-path'
    },
    {
      id: 'anomaly-detection',
      name: 'Anomaly Detection',
      icon: '🔍',
      status: 'warning',
      accuracy: 96.3,
      latency: 45,
      tasksToday: 847,
      roi: 3.2,
      color: 'from-red-500 to-orange-500',
      url: '/ai-anomaly'
    },
    {
      id: 'computer-vision',
      name: 'Computer Vision',
      icon: '👁️',
      status: 'active',
      accuracy: 98.3,
      latency: 14,
      tasksToday: 147523,
      roi: 1.4,
      color: 'from-green-500 to-cyan-500',
      url: '/ai-vision'
    },
    {
      id: 'voice-commands',
      name: 'Voice Commands',
      icon: '🎤',
      status: 'active',
      accuracy: 96.7,
      latency: 340,
      tasksToday: 3847,
      roi: 0.8,
      color: 'from-purple-500 to-pink-500',
      url: '/ai-voice'
    }
  ];

  // Overall AI Stats
  const overallStats = {
    totalModels: 5,
    avgAccuracy: (aiSystems.reduce((sum, s) => sum + s.accuracy, 0) / aiSystems.length).toFixed(1),
    totalTasksToday: aiSystems.reduce((sum, s) => sum + s.tasksToday, 0),
    totalMonthlySavings: aiSystems.reduce((sum, s) => sum + s.roi, 0).toFixed(1),
    systemsOnline: aiSystems.filter(s => s.status === 'active').length,
    uptime: 99.7,
    totalInvestment: 10.0, // ₩10M
    monthlyROI: 10.0 // ₩10M/month savings
  };

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'warning': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'offline': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const paybackMonths = (overallStats.totalInvestment / parseFloat(overallStats.totalMonthlySavings)).toFixed(1);

  return (
    <div className="min-h-screen bg-[#02010a] text-white p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              🤖 FIELD NINE AI HUB
            </h1>
            <p className="text-gray-400 text-xl">
              Complete AI Automation Platform · 5 Integrated Systems
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-3xl font-mono font-bold text-cyan-400">
                {currentTime.toLocaleTimeString('ko-KR')}
              </div>
              <div className="text-sm text-gray-500">
                {currentTime.toLocaleDateString('ko-KR')}
              </div>
            </div>
            
            <div className={`px-4 py-2 rounded-lg font-medium border ${
              overallStats.systemsOnline === overallStats.totalModels
                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
            }`}>
              {overallStats.systemsOnline}/{overallStats.totalModels} Systems Online
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overall Performance Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-xl"
      >
        <h2 className="text-3xl font-bold text-white mb-6">Overall AI Performance</h2>
        
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-black/30 rounded-xl p-6 border border-purple-500/20">
            <div className="text-gray-400 text-sm mb-2">Average Accuracy</div>
            <div className="text-5xl font-bold text-purple-400 mb-2">{overallStats.avgAccuracy}%</div>
            <div className="text-xs text-gray-500">Across all models</div>
          </div>
          
          <div className="bg-black/30 rounded-xl p-6 border border-cyan-500/20">
            <div className="text-gray-400 text-sm mb-2">Tasks Today</div>
            <div className="text-5xl font-bold text-cyan-400 mb-2">{(overallStats.totalTasksToday / 1000).toFixed(0)}K</div>
            <div className="text-xs text-gray-500">Automated decisions</div>
          </div>
          
          <div className="bg-black/30 rounded-xl p-6 border border-green-500/20">
            <div className="text-gray-400 text-sm mb-2">Monthly Savings</div>
            <div className="text-5xl font-bold text-green-400 mb-2">₩{overallStats.totalMonthlySavings}M</div>
            <div className="text-xs text-gray-500">Cost reduction</div>
          </div>
          
          <div className="bg-black/30 rounded-xl p-6 border border-orange-500/20">
            <div className="text-gray-400 text-sm mb-2">ROI Payback</div>
            <div className="text-5xl font-bold text-orange-400 mb-2">{paybackMonths}mo</div>
            <div className="text-xs text-gray-500">Break-even time</div>
          </div>
          
          <div className="bg-black/30 rounded-xl p-6 border border-pink-500/20">
            <div className="text-gray-400 text-sm mb-2">System Uptime</div>
            <div className="text-5xl font-bold text-pink-400 mb-2">{overallStats.uptime}%</div>
            <div className="text-xs text-gray-500">Last 30 days</div>
          </div>
        </div>
      </motion.div>

      {/* AI Systems Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-6">AI Systems</h2>
        
        <div className="grid grid-cols-3 gap-6">
          {aiSystems.map((system, index) => (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onHoverStart={() => setSelectedSystem(system.id)}
              onHoverEnd={() => setSelectedSystem(null)}
              className="group relative"
            >
              <Link href={system.url}>
                <div className={`bg-gradient-to-br from-gray-900/50 to-gray-800/30 border ${
                  selectedSystem === system.id
                    ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20'
                    : 'border-gray-700/50'
                } rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`text-5xl bg-gradient-to-br ${system.color} p-3 rounded-xl`}>
                        {system.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{system.name}</h3>
                        <div className="text-sm text-gray-400">{system.id}</div>
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase border ${getStatusColor(system.status)}`}>
                      {system.status}
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Accuracy</div>
                      <div className="text-2xl font-bold text-white">{system.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Latency</div>
                      <div className="text-2xl font-bold text-white">{system.latency}ms</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Tasks Today</div>
                      <div className="text-2xl font-bold text-white">{system.tasksToday.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Monthly ROI</div>
                      <div className="text-2xl font-bold text-green-400">₩{system.roi}M</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-400">Performance</span>
                      <span className="text-white font-medium">{system.accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${system.accuracy}%` }}
                        className={`h-full rounded-full bg-gradient-to-r ${system.color}`}
                      />
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedSystem === system.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl pointer-events-none"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
          
          {/* Add New System Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-gray-900/30 to-gray-800/20 border-2 border-dashed border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 transition-all group"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">➕</div>
            <div className="text-xl font-semibold text-gray-400 group-hover:text-white transition-colors">Add New AI System</div>
            <div className="text-sm text-gray-500 mt-2">Deploy additional models</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Investment & ROI Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid grid-cols-2 gap-8"
      >
        {/* Investment Breakdown */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Investment Breakdown</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <span className="text-gray-400">Model Development</span>
              <span className="text-white font-bold">₩4.0M</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <span className="text-gray-400">Infrastructure Setup</span>
              <span className="text-white font-bold">₩3.0M</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <span className="text-gray-400">Training & Fine-tuning</span>
              <span className="text-white font-bold">₩2.0M</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
              <span className="text-gray-400">Integration & Testing</span>
              <span className="text-white font-bold">₩1.0M</span>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mt-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30">
                <span className="text-white font-semibold text-lg">Total Investment</span>
                <span className="text-purple-400 font-bold text-2xl">₩{overallStats.totalInvestment}M</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Projection */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white mb-6">ROI Projection</h2>
          
          <div className="space-y-4">
            {[1, 2, 3, 6, 12].map((month) => {
              const savings = parseFloat(overallStats.totalMonthlySavings) * month;
              const profit = savings - overallStats.totalInvestment;
              const roi = ((profit / overallStats.totalInvestment) * 100).toFixed(0);
              
              return (
                <div key={month} className="p-4 bg-black/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Month {month}</span>
                    <span className={`font-bold ${profit > 0 ? 'text-green-400' : 'text-orange-400'}`}>
                      {profit > 0 ? '+' : ''}₩{profit.toFixed(1)}M
                    </span>
                  </div>
                  <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (savings / (overallStats.totalInvestment * 2)) * 100)}%` }}
                      className={`h-full rounded-full ${
                        profit > 0
                          ? 'bg-gradient-to-r from-green-500 to-cyan-500'
                          : 'bg-gradient-to-r from-orange-500 to-yellow-500'
                      }`}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ROI: {roi}% · Savings: ₩{savings.toFixed(1)}M
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-8 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>⚡</span>
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-4 gap-4">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105">
            📊 Generate Report
          </button>
          <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105">
            🔄 Retrain Models
          </button>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105">
            ⚙️ System Settings
          </button>
          <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105">
            🚨 Emergency Stop
          </button>
        </div>
      </motion.div>
    </div>
  );
}
