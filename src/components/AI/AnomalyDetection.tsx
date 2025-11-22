"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SensorReading {
  timestamp: string;
  temperature: number;
  vibration: number;
  pressure: number;
  current: number;
  reconstructionError: number;
  isAnomaly: boolean;
}

interface Anomaly {
  id: string;
  timestamp: string;
  type: 'sensor_failure' | 'motor_issue' | 'belt_misalignment' | 'battery_degradation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedComponent: string;
  description: string;
  prediction: string;
  confidence: number;
}

export default function AnomalyDetection() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [sensorData, setSensorData] = useState<SensorReading[]>([]);
  
  const [anomalies, setAnomalies] = useState<Anomaly[]>([
    {
      id: 'ANO-001',
      timestamp: '2025-11-23 14:23:17',
      type: 'motor_issue',
      severity: 'high',
      affectedComponent: 'AGV-003 Drive Motor',
      description: 'Unusual vibration pattern detected',
      prediction: 'Motor bearing failure in 3-5 days',
      confidence: 94.2
    },
    {
      id: 'ANO-002',
      timestamp: '2025-11-23 14:18:42',
      type: 'belt_misalignment',
      severity: 'medium',
      affectedComponent: 'Conveyor Belt #2',
      description: 'Asymmetric load distribution',
      prediction: 'Belt slippage likely within 48 hours',
      confidence: 87.5
    },
    {
      id: 'ANO-003',
      timestamp: '2025-11-23 14:12:08',
      type: 'battery_degradation',
      severity: 'low',
      affectedComponent: 'AGV-004 Battery Pack',
      description: 'Gradual capacity reduction',
      prediction: 'Battery replacement recommended in 2 weeks',
      confidence: 91.8
    }
  ]);

  // Autoencoder Model Stats
  const modelStats = {
    modelType: 'Variational Autoencoder',
    latentDimensions: 16,
    trainingEpochs: 247,
    detectionAccuracy: 96.3,
    falsePositiveRate: 1.2,
    anomaliesDetected: 847,
    sensorsMonitored: 124,
    avgReconstructionError: 0.0142,
    threshold: 0.025
  };

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate sensor data
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('ko-KR');
      
      // Simulate sensor readings
      const reading: SensorReading = {
        timestamp: timeStr,
        temperature: 22 + Math.random() * 5 + (Math.random() > 0.9 ? Math.random() * 10 : 0),
        vibration: 0.1 + Math.random() * 0.3 + (Math.random() > 0.95 ? Math.random() * 0.5 : 0),
        pressure: 101 + Math.random() * 2,
        current: 2.5 + Math.random() * 0.5 + (Math.random() > 0.92 ? Math.random() * 1.5 : 0),
        reconstructionError: 0.01 + Math.random() * 0.02 + (Math.random() > 0.9 ? Math.random() * 0.03 : 0),
        isAnomaly: Math.random() > 0.88
      };

      setSensorData(prev => [...prev.slice(-29), reading]);

      // Occasionally add new anomaly
      if (Math.random() > 0.95 && anomalies.length < 5) {
        const types: Anomaly['type'][] = ['sensor_failure', 'motor_issue', 'belt_misalignment', 'battery_degradation'];
        const severities: Anomaly['severity'][] = ['low', 'medium', 'high', 'critical'];
        const components = ['AGV-001', 'AGV-002', 'Conveyor #1', 'Sensor Array A', 'Charging Station'];
        
        const newAnomaly: Anomaly = {
          id: `ANO-${String(anomalies.length + 1).padStart(3, '0')}`,
          timestamp: now.toLocaleString('ko-KR'),
          type: types[Math.floor(Math.random() * types.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          affectedComponent: components[Math.floor(Math.random() * components.length)],
          description: 'Anomalous pattern detected',
          prediction: 'Requires investigation',
          confidence: 85 + Math.random() * 12
        };
        
        setAnomalies(prev => [newAnomaly, ...prev]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isMonitoring, anomalies.length]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sensor_failure': return '📡';
      case 'motor_issue': return '⚙️';
      case 'belt_misalignment': return '🔧';
      case 'battery_degradation': return '🔋';
      default: return '⚠️';
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
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              🔍 AI Anomaly Detection
            </h1>
            <p className="text-gray-400 text-lg">
              Variational Autoencoder · Predictive Maintenance System
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-orange-400">
                {currentTime.toLocaleTimeString('ko-KR')}
              </div>
              <div className="text-sm text-gray-500">
                {modelStats.sensorsMonitored} Sensors Active
              </div>
            </div>
            
            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isMonitoring
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-700/50 text-gray-400 border border-gray-600'
              }`}
            >
              {isMonitoring ? '🟢 Monitoring' : '⏸️ Paused'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Model Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Detection Accuracy</div>
          <div className="text-4xl font-bold text-red-400">{modelStats.detectionAccuracy}%</div>
          <div className="text-xs text-gray-500 mt-2">{modelStats.modelType}</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">False Positive Rate</div>
          <div className="text-4xl font-bold text-orange-400">{modelStats.falsePositiveRate}%</div>
          <div className="text-xs text-gray-500 mt-2">Industry best: <3%</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500/10 to-green-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Anomalies Detected</div>
          <div className="text-4xl font-bold text-yellow-400">{modelStats.anomaliesDetected}</div>
          <div className="text-xs text-gray-500 mt-2">This month</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Reconstruction Error</div>
          <div className="text-4xl font-bold text-green-400">{(modelStats.avgReconstructionError * 100).toFixed(2)}%</div>
          <div className="text-xs text-gray-500 mt-2">Threshold: {(modelStats.threshold * 100).toFixed(2)}%</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-8">
        {/* Real-time Sensor Data */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Real-time Sensor Monitoring</h2>
          
          {/* Sensor Charts */}
          <div className="grid grid-cols-2 gap-6">
            {/* Temperature */}
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">Temperature (°C)</span>
                <span className="text-orange-400 font-mono text-lg">
                  {sensorData.length > 0 ? sensorData[sensorData.length - 1].temperature.toFixed(1) : '--'}°
                </span>
              </div>
              <div className="flex items-end h-24 gap-1">
                {sensorData.slice(-15).map((data, i) => {
                  const height = ((data.temperature - 20) / 15) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(0, Math.min(100, height))}%` }}
                        className={`w-full rounded-t ${
                          data.isAnomaly
                            ? 'bg-gradient-to-t from-red-500 to-red-400'
                            : 'bg-gradient-to-t from-orange-500/50 to-orange-400/50'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vibration */}
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">Vibration (g)</span>
                <span className="text-purple-400 font-mono text-lg">
                  {sensorData.length > 0 ? sensorData[sensorData.length - 1].vibration.toFixed(3) : '--'}
                </span>
              </div>
              <div className="flex items-end h-24 gap-1">
                {sensorData.slice(-15).map((data, i) => {
                  const height = (data.vibration / 1.0) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(0, Math.min(100, height))}%` }}
                        className={`w-full rounded-t ${
                          data.isAnomaly
                            ? 'bg-gradient-to-t from-red-500 to-red-400'
                            : 'bg-gradient-to-t from-purple-500/50 to-purple-400/50'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pressure */}
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">Pressure (kPa)</span>
                <span className="text-cyan-400 font-mono text-lg">
                  {sensorData.length > 0 ? sensorData[sensorData.length - 1].pressure.toFixed(1) : '--'}
                </span>
              </div>
              <div className="flex items-end h-24 gap-1">
                {sensorData.slice(-15).map((data, i) => {
                  const height = ((data.pressure - 98) / 8) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(0, Math.min(100, height))}%` }}
                        className={`w-full rounded-t ${
                          data.isAnomaly
                            ? 'bg-gradient-to-t from-red-500 to-red-400'
                            : 'bg-gradient-to-t from-cyan-500/50 to-cyan-400/50'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reconstruction Error */}
            <div className="bg-black/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">Reconstruction Error</span>
                <span className="text-red-400 font-mono text-lg">
                  {sensorData.length > 0 ? sensorData[sensorData.length - 1].reconstructionError.toFixed(4) : '--'}
                </span>
              </div>
              <div className="flex items-end h-24 gap-1">
                {sensorData.slice(-15).map((data, i) => {
                  const height = (data.reconstructionError / 0.08) * 100;
                  const isOverThreshold = data.reconstructionError > modelStats.threshold;
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(0, Math.min(100, height))}%` }}
                        className={`w-full rounded-t ${
                          isOverThreshold
                            ? 'bg-gradient-to-t from-red-500 to-red-400'
                            : 'bg-gradient-to-t from-green-500/50 to-green-400/50'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Threshold: {modelStats.threshold.toFixed(4)}
              </div>
            </div>
          </div>

          {/* Anomaly Indicator */}
          <div className="mt-6 p-4 bg-black/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  sensorData.length > 0 && sensorData[sensorData.length - 1].isAnomaly
                    ? 'bg-red-500 animate-pulse'
                    : 'bg-green-500'
                }`} />
                <span className="text-gray-400">System Status:</span>
                <span className={`font-semibold ${
                  sensorData.length > 0 && sensorData[sensorData.length - 1].isAnomaly
                    ? 'text-red-400'
                    : 'text-green-400'
                }`}>
                  {sensorData.length > 0 && sensorData[sensorData.length - 1].isAnomaly ? 'Anomaly Detected' : 'Normal'}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Last update: {sensorData.length > 0 ? sensorData[sensorData.length - 1].timestamp : '--'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Anomaly Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl overflow-hidden"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Active Anomalies</h2>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {anomalies.map((anomaly, index) => (
              <motion.div
                key={anomaly.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`border rounded-xl p-4 ${getSeverityColor(anomaly.severity)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getTypeIcon(anomaly.type)}</span>
                    <div>
                      <div className="font-semibold text-white">{anomaly.id}</div>
                      <div className="text-xs text-gray-400">{anomaly.timestamp}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${getSeverityColor(anomaly.severity)}`}>
                    {anomaly.severity}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="text-gray-400 text-xs">Affected Component</div>
                    <div className="font-medium">{anomaly.affectedComponent}</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-xs">Description</div>
                    <div className="text-white">{anomaly.description}</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-xs">AI Prediction</div>
                    <div className="text-orange-400 font-medium">{anomaly.prediction}</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Confidence</div>
                    <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${anomaly.confidence}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                      />
                    </div>
                    <div className="text-right text-xs text-orange-400 mt-1">
                      {anomaly.confidence.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🤖</span>
          Predictive Maintenance Insights
        </h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-orange-400 font-semibold mb-2">Downtime Prevented</div>
            <div className="text-white text-lg">127 hours</div>
            <div className="text-sm text-gray-400 mt-1">
              Early detection saved ₩18.5M this month
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-red-400 font-semibold mb-2">Critical Alerts</div>
            <div className="text-white text-lg">3 components</div>
            <div className="text-sm text-gray-400 mt-1">
              Require immediate maintenance
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-yellow-400 font-semibold mb-2">Model Performance</div>
            <div className="text-white text-lg">99.1% uptime</div>
            <div className="text-sm text-gray-400 mt-1">
              Continuous learning from {modelStats.trainingEpochs} epochs
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
