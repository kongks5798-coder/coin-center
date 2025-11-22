"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Robot {
  id: string;
  name: string;
  position: { x: number; y: number };
  target: { x: number; y: number } | null;
  path: { x: number; y: number }[];
  status: 'idle' | 'moving' | 'working' | 'charging';
  battery: number;
  speed: number;
}

interface Obstacle {
  id: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  type: 'static' | 'dynamic';
}

export default function PathPlanning() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedRobot, setSelectedRobot] = useState<string | null>(null);
  const [isDrawingPath, setIsDrawingPath] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [robots, setRobots] = useState<Robot[]>([
    {
      id: 'AGV-001',
      name: 'Picker Alpha',
      position: { x: 100, y: 100 },
      target: null,
      path: [],
      status: 'idle',
      battery: 87,
      speed: 1.5
    },
    {
      id: 'AGV-002',
      name: 'Sorter Beta',
      position: { x: 300, y: 200 },
      target: null,
      path: [],
      status: 'moving',
      battery: 92,
      speed: 1.8
    },
    {
      id: 'AGV-003',
      name: 'Transport Gamma',
      position: { x: 500, y: 300 },
      target: null,
      path: [],
      status: 'working',
      battery: 64,
      speed: 1.2
    },
    {
      id: 'AGV-004',
      name: 'Loader Delta',
      position: { x: 200, y: 400 },
      target: null,
      path: [],
      status: 'charging',
      battery: 45,
      speed: 0
    },
    {
      id: 'AGV-005',
      name: 'Scanner Epsilon',
      position: { x: 600, y: 150 },
      target: null,
      path: [],
      status: 'idle',
      battery: 78,
      speed: 2.0
    }
  ]);

  const [obstacles, setObstacles] = useState<Obstacle[]>([
    { id: 'obs-1', position: { x: 250, y: 250 }, size: { width: 60, height: 60 }, type: 'static' },
    { id: 'obs-2', position: { x: 450, y: 180 }, size: { width: 80, height: 40 }, type: 'static' },
    { id: 'obs-3', position: { x: 350, y: 350 }, size: { width: 50, height: 70 }, type: 'dynamic' },
    { id: 'obs-4', position: { x: 150, y: 280 }, size: { width: 90, height: 50 }, type: 'static' },
  ]);

  // AI Path Planning Stats
  const planningStats = {
    algorithm: 'A* + DQN Hybrid',
    pathsOptimized: 8473,
    collisionsAvoided: 247,
    efficiency: 96.4,
    avgPathLength: 47.2,
    computationTime: 12, // ms
    activePaths: robots.filter(r => r.status === 'moving').length
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

    // Draw grid
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

    // Draw obstacles
    obstacles.forEach(obs => {
      ctx.fillStyle = obs.type === 'static' 
        ? 'rgba(255, 100, 100, 0.3)' 
        : 'rgba(255, 200, 100, 0.3)';
      ctx.strokeStyle = obs.type === 'static'
        ? 'rgba(255, 100, 100, 0.8)'
        : 'rgba(255, 200, 100, 0.8)';
      ctx.lineWidth = 2;
      ctx.fillRect(obs.position.x, obs.position.y, obs.size.width, obs.size.height);
      ctx.strokeRect(obs.position.x, obs.position.y, obs.size.width, obs.size.height);
    });

    // Draw robot paths
    robots.forEach(robot => {
      if (robot.path.length > 0) {
        ctx.strokeStyle = selectedRobot === robot.id 
          ? 'rgba(168, 85, 247, 0.8)' 
          : 'rgba(100, 200, 255, 0.4)';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(robot.position.x, robot.position.y);
        robot.path.forEach(point => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // Draw robots
    robots.forEach(robot => {
      const isSelected = selectedRobot === robot.id;
      const radius = isSelected ? 20 : 16;
      
      // Robot body
      ctx.fillStyle = 
        robot.status === 'idle' ? 'rgba(100, 200, 255, 0.8)' :
        robot.status === 'moving' ? 'rgba(168, 85, 247, 0.8)' :
        robot.status === 'working' ? 'rgba(34, 197, 94, 0.8)' :
        'rgba(251, 191, 36, 0.8)';
      
      ctx.beginPath();
      ctx.arc(robot.position.x, robot.position.y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Selection ring
      if (isSelected) {
        ctx.strokeStyle = 'rgba(168, 85, 247, 1)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(robot.position.x, robot.position.y, radius + 5, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Robot ID
      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(robot.id.split('-')[1], robot.position.x, robot.position.y + 3);
      
      // Battery indicator
      const batteryWidth = 30;
      const batteryHeight = 4;
      const batteryX = robot.position.x - batteryWidth / 2;
      const batteryY = robot.position.y - radius - 10;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(batteryX, batteryY, batteryWidth, batteryHeight);
      
      ctx.fillStyle = 
        robot.battery > 60 ? '#10b981' :
        robot.battery > 30 ? '#f59e0b' :
        '#ef4444';
      ctx.fillRect(batteryX, batteryY, batteryWidth * (robot.battery / 100), batteryHeight);
    });

  }, [robots, obstacles, selectedRobot]);

  // Robot movement simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRobots(prev => prev.map(robot => {
        if (robot.status === 'moving' && robot.path.length > 0) {
          const target = robot.path[0];
          const dx = target.x - robot.position.x;
          const dy = target.y - robot.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < robot.speed * 2) {
            // Reached waypoint
            return {
              ...robot,
              position: target,
              path: robot.path.slice(1),
              status: robot.path.length === 1 ? 'idle' : 'moving'
            };
          } else {
            // Move towards waypoint
            const ratio = (robot.speed * 2) / distance;
            return {
              ...robot,
              position: {
                x: robot.position.x + dx * ratio,
                y: robot.position.y + dy * ratio
              }
            };
          }
        }
        return robot;
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on a robot
    const clickedRobot = robots.find(robot => {
      const dx = robot.position.x - x;
      const dy = robot.position.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < 20;
    });

    if (clickedRobot) {
      setSelectedRobot(clickedRobot.id);
    } else if (selectedRobot) {
      // Set destination for selected robot (simple straight path for demo)
      setRobots(prev => prev.map(robot => {
        if (robot.id === selectedRobot) {
          // Simple A* simulation: create waypoints
          const path = generateSimplePath(robot.position, { x, y }, obstacles);
          return {
            ...robot,
            target: { x, y },
            path,
            status: 'moving' as const
          };
        }
        return robot;
      }));
    }
  };

  // Simple path generation (avoiding obstacles)
  const generateSimplePath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    obstacles: Obstacle[]
  ): { x: number; y: number }[] => {
    // Simple implementation: direct path with basic obstacle avoidance
    const waypoints: { x: number; y: number }[] = [];
    const steps = 5;
    
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const x = start.x + (end.x - start.x) * t;
      const y = start.y + (end.y - start.y) * t;
      
      // Check collision
      let adjusted = { x, y };
      obstacles.forEach(obs => {
        if (
          x >= obs.position.x - 20 &&
          x <= obs.position.x + obs.size.width + 20 &&
          y >= obs.position.y - 20 &&
          y <= obs.position.y + obs.size.height + 20
        ) {
          // Simple avoidance: go around
          adjusted = {
            x: x + (obs.position.x > x ? -30 : 30),
            y: y + (obs.position.y > y ? -30 : 30)
          };
        }
      });
      
      waypoints.push(adjusted);
    }
    
    return waypoints;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle': return 'text-cyan-400 bg-cyan-500/10';
      case 'moving': return 'text-purple-400 bg-purple-500/10';
      case 'working': return 'text-green-400 bg-green-500/10';
      case 'charging': return 'text-yellow-400 bg-yellow-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
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
              🛣️ AI Path Planning
            </h1>
            <p className="text-gray-400 text-lg">
              A* + DQN Hybrid Algorithm · Real-time Collision Avoidance
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-purple-400">
                {currentTime.toLocaleTimeString('ko-KR')}
              </div>
              <div className="text-sm text-gray-500">
                {planningStats.activePaths} Active Paths
              </div>
            </div>
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
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Algorithm</div>
          <div className="text-2xl font-bold text-purple-400">{planningStats.algorithm}</div>
          <div className="text-xs text-gray-500 mt-2">Deep Reinforcement Learning</div>
        </div>
        
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Paths Optimized</div>
          <div className="text-2xl font-bold text-cyan-400">{planningStats.pathsOptimized.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-2">Today: 847+</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Collisions Avoided</div>
          <div className="text-2xl font-bold text-green-400">{planningStats.collisionsAvoided}</div>
          <div className="text-xs text-gray-500 mt-2">This week</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Efficiency</div>
          <div className="text-2xl font-bold text-orange-400">{planningStats.efficiency}%</div>
          <div className="text-xs text-gray-500 mt-2">Avg compute: {planningStats.computationTime}ms</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-8">
        {/* Canvas - Path Planning Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Warehouse Map</h2>
            <div className="text-sm text-gray-400">
              Click robot to select · Click anywhere to set destination
            </div>
          </div>
          
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            onClick={handleCanvasClick}
            className="w-full bg-black/30 rounded-lg cursor-crosshair border border-gray-700/30"
          />
          
          {/* Legend */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-400"></div>
                <span className="text-gray-400">Idle</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-400"></div>
                <span className="text-gray-400">Moving</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-400"></div>
                <span className="text-gray-400">Working</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                <span className="text-gray-400">Charging</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-400/30 border-2 border-red-400/80"></div>
                <span className="text-gray-400">Static Obstacle</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-400/30 border-2 border-orange-400/80"></div>
                <span className="text-gray-400">Dynamic Obstacle</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Robot Status Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Robot Fleet</h2>
          
          <div className="space-y-3">
            {robots.map((robot, index) => (
              <motion.div
                key={robot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={() => setSelectedRobot(robot.id)}
                className={`border rounded-xl p-4 cursor-pointer transition-all ${
                  selectedRobot === robot.id
                    ? 'border-purple-500/50 bg-purple-500/10'
                    : 'border-gray-700/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-white">{robot.name}</div>
                    <div className="text-xs text-gray-400">{robot.id}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(robot.status)}`}>
                    {robot.status.toUpperCase()}
                  </div>
                </div>
                
                {/* Battery */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-400">Battery</span>
                    <span className={`font-bold ${
                      robot.battery > 60 ? 'text-green-400' :
                      robot.battery > 30 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {robot.battery}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${robot.battery}%` }}
                      className={`h-full rounded-full ${
                        robot.battery > 60 ? 'bg-green-500' :
                        robot.battery > 30 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
                
                {/* Position */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-gray-500">Position</div>
                    <div className="font-mono text-white">
                      ({robot.position.x.toFixed(0)}, {robot.position.y.toFixed(0)})
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Speed</div>
                    <div className="font-mono text-white">{robot.speed.toFixed(1)} m/s</div>
                  </div>
                </div>
                
                {/* Path info */}
                {robot.path.length > 0 && (
                  <div className="mt-2 text-xs text-purple-400">
                    📍 {robot.path.length} waypoints remaining
                  </div>
                )}
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
        className="mt-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🤖</span>
          AI Optimization Insights
        </h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-purple-400 font-semibold mb-2">Path Efficiency</div>
            <div className="text-white text-lg">+24% improvement</div>
            <div className="text-sm text-gray-400 mt-1">
              Using DQN over traditional A*
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-cyan-400 font-semibold mb-2">Time Saved</div>
            <div className="text-white text-lg">47.3 hours/week</div>
            <div className="text-sm text-gray-400 mt-1">
              Optimized routing reduces travel
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-green-400 font-semibold mb-2">Collision-Free</div>
            <div className="text-white text-lg">99.7% success</div>
            <div className="text-sm text-gray-400 mt-1">
              Real-time obstacle avoidance
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
