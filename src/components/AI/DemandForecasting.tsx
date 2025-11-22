"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ForecastData {
  time: string;
  actual: number;
  predicted: number;
  confidence: number;
}

interface Product {
  id: string;
  name: string;
  currentStock: number;
  predictedDemand: number;
  reorderPoint: number;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export default function DemandForecasting() {
  const [activeTab, setActiveTab] = useState<'6h' | '24h' | '7d'>('6h');
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Mock forecast data
  const [forecastData, setForecastData] = useState<ForecastData[]>([
    { time: '00:00', actual: 145, predicted: 148, confidence: 94.2 },
    { time: '01:00', actual: 132, predicted: 128, confidence: 92.8 },
    { time: '02:00', actual: 118, predicted: 121, confidence: 93.5 },
    { time: '03:00', actual: 165, predicted: 162, confidence: 95.1 },
    { time: '04:00', actual: 178, predicted: 175, confidence: 94.7 },
    { time: '05:00', actual: 0, predicted: 189, confidence: 93.2 },
  ]);

  // Product inventory with predictions
  const [products] = useState<Product[]>([
    {
      id: 'P001',
      name: 'Premium Sneakers',
      currentStock: 1247,
      predictedDemand: 1890,
      reorderPoint: 1500,
      status: 'warning',
      trend: 'up'
    },
    {
      id: 'P002',
      name: 'Italian Coffee Beans',
      currentStock: 3421,
      predictedDemand: 2150,
      reorderPoint: 2000,
      status: 'normal',
      trend: 'stable'
    },
    {
      id: 'P003',
      name: 'Designer Handbag',
      currentStock: 89,
      predictedDemand: 245,
      reorderPoint: 150,
      status: 'critical',
      trend: 'up'
    },
    {
      id: 'P004',
      name: 'Smart Watch',
      currentStock: 567,
      predictedDemand: 421,
      reorderPoint: 400,
      status: 'normal',
      trend: 'down'
    },
    {
      id: 'P005',
      name: 'Organic Tea Set',
      currentStock: 2341,
      predictedDemand: 1876,
      reorderPoint: 1500,
      status: 'normal',
      trend: 'stable'
    }
  ]);

  // AI Model Performance
  const modelStats = {
    accuracy: 94.7,
    mape: 5.3, // Mean Absolute Percentage Error
    predictionsMade: 12847,
    trainingDataPoints: 187432,
    lastUpdated: '2분 전',
    modelType: 'LSTM + Prophet Hybrid',
    learningRate: 0.0018
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live data updates
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setForecastData(prev => {
        const newData = [...prev];
        const lastHour = parseInt(newData[newData.length - 1].time.split(':')[0]);
        const nextHour = (lastHour + 1) % 24;
        const nextHourStr = `${String(nextHour).padStart(2, '0')}:00`;
        
        // Update actual value for prediction
        if (newData.length > 0 && newData[newData.length - 1].actual === 0) {
          newData[newData.length - 1].actual = Math.round(
            newData[newData.length - 1].predicted * (0.95 + Math.random() * 0.1)
          );
        }
        
        // Add new prediction
        const predicted = 140 + Math.random() * 80;
        newData.push({
          time: nextHourStr,
          actual: 0,
          predicted: Math.round(predicted),
          confidence: 92 + Math.random() * 5
        });
        
        // Keep only last 6 hours
        return newData.slice(-6);
      });
    }, 8000); // Update every 8 seconds
    
    return () => clearInterval(interval);
  }, [isLive]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'warning': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-green-400 bg-green-500/10 border-green-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '➡️';
    }
  };

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
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              🧠 AI Demand Forecasting
            </h1>
            <p className="text-gray-400 text-lg">
              LSTM + Prophet Hybrid Model · Real-time Inventory Predictions
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-cyan-400">
                {currentTime.toLocaleTimeString('ko-KR')}
              </div>
              <div className="text-sm text-gray-500">
                {currentTime.toLocaleDateString('ko-KR')}
              </div>
            </div>
            
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isLive
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-700/50 text-gray-400 border border-gray-600'
              }`}
            >
              {isLive ? '🟢 Live' : '⏸️ Paused'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Model Performance Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Model Accuracy</div>
          <div className="text-4xl font-bold text-purple-400">{modelStats.accuracy}%</div>
          <div className="text-xs text-gray-500 mt-2">{modelStats.modelType}</div>
        </div>
        
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">MAPE (Error Rate)</div>
          <div className="text-4xl font-bold text-cyan-400">{modelStats.mape}%</div>
          <div className="text-xs text-gray-500 mt-2">Lower is better</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Predictions Made</div>
          <div className="text-4xl font-bold text-green-400">{modelStats.predictionsMade.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-2">Today: 1,847+</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Training Data</div>
          <div className="text-4xl font-bold text-orange-400">{(modelStats.trainingDataPoints / 1000).toFixed(0)}K</div>
          <div className="text-xs text-gray-500 mt-2">Updated {modelStats.lastUpdated}</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column: Forecast Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Demand Forecast</h2>
            
            <div className="flex gap-2">
              {(['6h', '24h', '7d'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {tab === '6h' ? '6 Hours' : tab === '24h' ? '24 Hours' : '7 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="space-y-4">
            <div className="flex items-end justify-between h-64 gap-2">
              {forecastData.map((data, index) => {
                const maxVal = 200;
                const actualHeight = (data.actual / maxVal) * 100;
                const predictedHeight = (data.predicted / maxVal) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    {/* Bars */}
                    <div className="w-full flex gap-1 items-end h-48">
                      {/* Actual */}
                      {data.actual > 0 && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${actualHeight}%` }}
                          className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg relative group"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap">
                            Actual: {data.actual}
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Predicted */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${predictedHeight}%` }}
                        className="flex-1 bg-gradient-to-t from-purple-500/50 to-purple-400/50 rounded-t-lg border-2 border-purple-400/30 relative group"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap">
                          Predicted: {data.predicted}
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Time Label */}
                    <div className="text-xs text-gray-500">{data.time}</div>
                    
                    {/* Confidence */}
                    <div className="text-xs text-cyan-400">{data.confidence.toFixed(1)}%</div>
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-700/50">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded"></div>
                <span className="text-sm text-gray-400">Actual Demand</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500/50 to-purple-400/50 rounded border-2 border-purple-400/30"></div>
                <span className="text-sm text-gray-400">Predicted Demand</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Product Inventory */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Inventory Alerts</h2>
          
          <div className="space-y-3">
            {products.map((product, index) => {
              const stockPercentage = (product.currentStock / product.predictedDemand) * 100;
              const needsReorder = product.currentStock < product.reorderPoint;
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`border rounded-xl p-4 ${getStatusColor(product.status)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-white">{product.name}</div>
                      <div className="text-xs text-gray-400">{product.id}</div>
                    </div>
                    <div className="text-2xl">{getTrendIcon(product.trend)}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <div className="text-gray-400">Current Stock</div>
                      <div className="font-bold text-lg">{product.currentStock.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Predicted Demand</div>
                      <div className="font-bold text-lg">{product.predictedDemand.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  {/* Stock Bar */}
                  <div className="mb-3">
                    <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(stockPercentage, 100)}%` }}
                        className={`h-full rounded-full ${
                          product.status === 'critical'
                            ? 'bg-red-500'
                            : product.status === 'warning'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {stockPercentage.toFixed(0)}% of predicted demand
                    </div>
                  </div>
                  
                  {needsReorder && (
                    <div className="bg-black/30 rounded-lg p-3 text-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-400">⚠️</span>
                        <span className="font-semibold">Reorder Recommended</span>
                      </div>
                      <div className="text-gray-400">
                        Order {(product.predictedDemand * 1.2 - product.currentStock).toFixed(0)} units
                        <br />
                        Estimated shortage in {Math.floor(Math.random() * 7 + 3)} days
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom: AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🤖</span>
          AI-Generated Insights
        </h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-purple-400 font-semibold mb-2">Peak Demand Period</div>
            <div className="text-white text-lg">Tomorrow 14:00-17:00</div>
            <div className="text-sm text-gray-400 mt-1">
              Expected surge: +47% from baseline
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-cyan-400 font-semibold mb-2">Cost Savings</div>
            <div className="text-white text-lg">₩2.7M/month</div>
            <div className="text-sm text-gray-400 mt-1">
              By optimizing reorder timing
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-green-400 font-semibold mb-2">Stock Efficiency</div>
            <div className="text-white text-lg">92.3%</div>
            <div className="text-sm text-gray-400 mt-1">
              Zero stockouts in 14 days
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
