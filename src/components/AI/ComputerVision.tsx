"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface DetectedObject {
  id: string;
  class: string;
  confidence: number;
  bbox: { x: number; y: number; width: number; height: number };
  color: string;
}

interface QualityCheck {
  id: string;
  timestamp: string;
  productType: string;
  defectDetected: boolean;
  defectType?: string;
  confidence: number;
  imageUrl: string;
}

export default function ComputerVision() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isProcessing, setIsProcessing] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState<'camera1' | 'camera2' | 'camera3'>('camera1');
  
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([
    { id: 'obj-1', class: 'Box', confidence: 97.3, bbox: { x: 50, y: 80, width: 120, height: 100 }, color: '#10b981' },
    { id: 'obj-2', class: 'Pallet', confidence: 95.1, bbox: { x: 200, y: 120, width: 150, height: 130 }, color: '#3b82f6' },
    { id: 'obj-3', class: 'Forklift', confidence: 98.7, bbox: { x: 400, y: 60, width: 140, height: 160 }, color: '#f59e0b' },
    { id: 'obj-4', class: 'Person', confidence: 99.2, bbox: { x: 580, y: 90, width: 80, height: 180 }, color: '#ef4444' },
  ]);

  const [qualityChecks, setQualityChecks] = useState<QualityCheck[]>([
    {
      id: 'QC-001',
      timestamp: '14:23:17',
      productType: 'Sneakers Premium',
      defectDetected: true,
      defectType: 'Stitching misalignment',
      confidence: 94.2,
      imageUrl: ''
    },
    {
      id: 'QC-002',
      timestamp: '14:22:45',
      productType: 'Coffee Beans',
      defectDetected: false,
      confidence: 98.7,
      imageUrl: ''
    },
    {
      id: 'QC-003',
      timestamp: '14:21:33',
      productType: 'Handbag Leather',
      defectDetected: true,
      defectType: 'Surface scratch',
      confidence: 91.5,
      imageUrl: ''
    },
  ]);

  // YOLOv8 Model Stats
  const modelStats = {
    modelVersion: 'YOLOv8x',
    inferenceSpeed: 14, // ms
    fps: 68,
    detectionAccuracy: 98.3,
    classesDetected: 24,
    totalDetections: 147523,
    defectRate: 3.7,
    camerasActive: 3
  };

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw simulated warehouse image background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw detected objects with bounding boxes
    detectedObjects.forEach(obj => {
      // Bounding box
      ctx.strokeStyle = obj.color;
      ctx.lineWidth = 3;
      ctx.strokeRect(obj.bbox.x, obj.bbox.y, obj.bbox.width, obj.bbox.height);
      
      // Label background
      const labelText = `${obj.class} ${obj.confidence.toFixed(1)}%`;
      ctx.font = 'bold 14px monospace';
      const textMetrics = ctx.measureText(labelText);
      const labelWidth = textMetrics.width + 16;
      const labelHeight = 24;
      
      ctx.fillStyle = obj.color;
      ctx.fillRect(obj.bbox.x, obj.bbox.y - labelHeight, labelWidth, labelHeight);
      
      // Label text
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(labelText, obj.bbox.x + 8, obj.bbox.y - labelHeight / 2);
    });

    // Draw FPS counter
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(canvas.width - 120, 10, 110, 40);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${modelStats.fps} FPS`, canvas.width - 15, 30);

  }, [detectedObjects, modelStats.fps]);

  // Simulate object detection updates
  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setDetectedObjects(prev => prev.map(obj => ({
        ...obj,
        confidence: Math.min(99.9, obj.confidence + (Math.random() - 0.5) * 2),
        bbox: {
          ...obj.bbox,
          x: Math.max(10, Math.min(700 - obj.bbox.width, obj.bbox.x + (Math.random() - 0.5) * 10)),
          y: Math.max(10, Math.min(400 - obj.bbox.height, obj.bbox.y + (Math.random() - 0.5) * 10))
        }
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [isProcessing]);

  // Simulate quality check updates
  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      const products = ['Sneakers', 'Coffee Beans', 'Handbag', 'Watch', 'Tea Set'];
      const defects = ['Stitching issue', 'Color variation', 'Surface scratch', 'Alignment error', 'Label misprint'];
      
      const newCheck: QualityCheck = {
        id: `QC-${String(qualityChecks.length + 1).padStart(3, '0')}`,
        timestamp: new Date().toLocaleTimeString('ko-KR'),
        productType: products[Math.floor(Math.random() * products.length)],
        defectDetected: Math.random() > 0.85,
        defectType: Math.random() > 0.85 ? defects[Math.floor(Math.random() * defects.length)] : undefined,
        confidence: 88 + Math.random() * 11,
        imageUrl: ''
      };
      
      if (qualityChecks.length >= 5) return;
      setQualityChecks(prev => [newCheck, ...prev].slice(0, 5));
    }, 7000);

    return () => clearInterval(interval);
  }, [isProcessing, qualityChecks.length]);

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
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              👁️ AI Computer Vision
            </h1>
            <p className="text-gray-400 text-lg">
              YOLOv8x Real-time Object Detection · Quality Inspection
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-cyan-400">
                {currentTime.toLocaleTimeString('ko-KR')}
              </div>
              <div className="text-sm text-gray-500">
                {modelStats.fps} FPS · {modelStats.camerasActive} Cameras
              </div>
            </div>
            
            <button
              onClick={() => setIsProcessing(!isProcessing)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isProcessing
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-700/50 text-gray-400 border border-gray-600'
              }`}
            >
              {isProcessing ? '🟢 Processing' : '⏸️ Paused'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Model Version</div>
          <div className="text-2xl font-bold text-green-400">{modelStats.modelVersion}</div>
          <div className="text-xs text-gray-500 mt-2">{modelStats.inferenceSpeed}ms inference</div>
        </div>
        
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Detection Accuracy</div>
          <div className="text-2xl font-bold text-cyan-400">{modelStats.detectionAccuracy}%</div>
          <div className="text-xs text-gray-500 mt-2">{modelStats.classesDetected} object classes</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Total Detections</div>
          <div className="text-2xl font-bold text-blue-400">{modelStats.totalDetections.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-2">This week</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Defect Rate</div>
          <div className="text-2xl font-bold text-purple-400">{modelStats.defectRate}%</div>
          <div className="text-xs text-gray-500 mt-2">Quality inspection</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-8">
        {/* Camera Feed */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Live Camera Feed</h2>
            
            <div className="flex gap-2">
              {(['camera1', 'camera2', 'camera3'] as const).map((cam) => (
                <button
                  key={cam}
                  onClick={() => setSelectedCamera(cam)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCamera === cam
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  📹 {cam.replace('camera', 'Cam ')}
                </button>
              ))}
            </div>
          </div>
          
          <canvas
            ref={canvasRef}
            width={700}
            height={400}
            className="w-full bg-black/30 rounded-lg border border-gray-700/30"
          />
          
          {/* Detection Info */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            {detectedObjects.map((obj) => (
              <div key={obj.id} className="bg-black/30 rounded-lg p-3 border" style={{ borderColor: obj.color }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-semibold text-sm">{obj.class}</span>
                  <span className="text-xs" style={{ color: obj.color }}>
                    {obj.confidence.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${obj.confidence}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: obj.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quality Inspection Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quality Inspection</h2>
          
          <div className="space-y-3">
            {qualityChecks.map((check, index) => (
              <motion.div
                key={check.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`border rounded-xl p-4 ${
                  check.defectDetected
                    ? 'border-red-500/50 bg-red-500/10'
                    : 'border-green-500/50 bg-green-500/10'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-white">{check.id}</div>
                    <div className="text-xs text-gray-400">{check.timestamp}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    check.defectDetected
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {check.defectDetected ? '❌ DEFECT' : '✓ PASS'}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="text-gray-400 text-xs">Product Type</div>
                    <div className="font-medium text-white">{check.productType}</div>
                  </div>
                  
                  {check.defectDetected && check.defectType && (
                    <div>
                      <div className="text-gray-400 text-xs">Defect Type</div>
                      <div className="text-red-400 font-medium">{check.defectType}</div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Confidence</div>
                    <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${check.confidence}%` }}
                        className={`h-full rounded-full ${
                          check.defectDetected
                            ? 'bg-gradient-to-r from-red-500 to-orange-500'
                            : 'bg-gradient-to-r from-green-500 to-cyan-500'
                        }`}
                      />
                    </div>
                    <div className={`text-right text-xs mt-1 ${
                      check.defectDetected ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {check.confidence.toFixed(1)}%
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
        className="mt-8 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🤖</span>
          Computer Vision Insights
        </h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-cyan-400 font-semibold mb-2">Processing Speed</div>
            <div className="text-white text-lg">{modelStats.fps} FPS</div>
            <div className="text-sm text-gray-400 mt-1">
              Real-time {modelStats.inferenceSpeed}ms latency
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-green-400 font-semibold mb-2">Quality Improvement</div>
            <div className="text-white text-lg">87% reduction</div>
            <div className="text-sm text-gray-400 mt-1">
              Defective products caught early
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-blue-400 font-semibold mb-2">Safety Alerts</div>
            <div className="text-white text-lg">42 prevented</div>
            <div className="text-sm text-gray-400 mt-1">
              Person-forklift collision warnings
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
