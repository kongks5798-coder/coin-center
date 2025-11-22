"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceCommand {
  id: string;
  timestamp: string;
  transcript: string;
  confidence: number;
  intent: string;
  action: string;
  status: 'processing' | 'completed' | 'failed';
}

interface SuggestedCommand {
  phrase: string;
  description: string;
  category: string;
}

export default function VoiceCommands() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [commandHistory, setCommandHistory] = useState<VoiceCommand[]>([
    {
      id: 'CMD-001',
      timestamp: '14:23:17',
      transcript: 'AGV-003번 로봇을 Zone A로 보내줘',
      confidence: 97.3,
      intent: 'robot_control',
      action: 'Move AGV-003 to Zone A',
      status: 'completed'
    },
    {
      id: 'CMD-002',
      timestamp: '14:22:45',
      transcript: '프리미엄 스니커즈 재고 얼마나 남았어?',
      confidence: 95.8,
      intent: 'inventory_query',
      action: 'Query stock for Premium Sneakers: 1,247 units',
      status: 'completed'
    },
    {
      id: 'CMD-003',
      timestamp: '14:21:33',
      transcript: '내일 예상 수요량 보여줘',
      confidence: 98.2,
      intent: 'forecast_query',
      action: 'Display tomorrow demand forecast: 1,890 units',
      status: 'completed'
    }
  ]);

  const suggestedCommands: SuggestedCommand[] = [
    { phrase: '로봇 상태 확인해줘', description: 'Show all robot status', category: 'Robot Control' },
    { phrase: 'Zone B 온도 알려줘', description: 'Check Zone B temperature', category: 'Monitoring' },
    { phrase: '긴급 작업 생성해', description: 'Create urgent task', category: 'Task Management' },
    { phrase: '오늘 작업 완료율은?', description: 'Today\'s completion rate', category: 'Analytics' },
    { phrase: '배터리 부족한 로봇 찾아줘', description: 'Find low battery robots', category: 'Robot Control' },
    { phrase: '이상 징후 보고서 만들어', description: 'Generate anomaly report', category: 'Reports' }
  ];

  // Whisper + GPT-4 Model Stats
  const modelStats = {
    speechModel: 'Whisper Large-v3',
    nlpModel: 'GPT-4 Turbo',
    accuracy: 96.7,
    latency: 340, // ms
    commandsProcessed: 3847,
    intentRecognitionRate: 94.3,
    languageSupport: 57,
    successRate: 91.8
  };

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('');
    
    // Simulate voice recognition
    const phrases = [
      '컨베이어 벨트 2번 속도 줄여줘',
      'AGV-005 충전소로 보내',
      '오늘 출고량 리포트 작성해줘',
      'Zone C 습도 체크',
      '재고 부족한 제품 리스트업',
      '이상 감지된 센서 확인해줘'
    ];
    
    const selectedPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    let currentText = '';
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < selectedPhrase.length) {
        currentText += selectedPhrase[index];
        setTranscript(currentText);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsListening(false);
        setIsProcessing(true);
        
        // Simulate processing
        setTimeout(() => {
          const newCommand: VoiceCommand = {
            id: `CMD-${String(commandHistory.length + 1).padStart(3, '0')}`,
            timestamp: new Date().toLocaleTimeString('ko-KR'),
            transcript: selectedPhrase,
            confidence: 92 + Math.random() * 7,
            intent: ['robot_control', 'monitoring', 'task_management', 'analytics'][Math.floor(Math.random() * 4)],
            action: `Executing: ${selectedPhrase}`,
            status: 'completed'
          };
          
          setCommandHistory(prev => [newCommand, ...prev]);
          setIsProcessing(false);
          setTranscript('');
        }, 2000);
      }
    }, 80);
  };

  const handleSuggestedCommand = (command: string) => {
    setTranscript(command);
    setIsListening(false);
    setIsProcessing(true);
    
    setTimeout(() => {
      const newCommand: VoiceCommand = {
        id: `CMD-${String(commandHistory.length + 1).padStart(3, '0')}`,
        timestamp: new Date().toLocaleTimeString('ko-KR'),
        transcript: command,
        confidence: 95 + Math.random() * 4,
        intent: 'manual_input',
        action: `Executing: ${command}`,
        status: 'completed'
      };
      
      setCommandHistory(prev => [newCommand, ...prev].slice(0, 10));
      setIsProcessing(false);
      setTranscript('');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/10';
      case 'processing': return 'text-yellow-400 bg-yellow-500/10';
      case 'failed': return 'text-red-400 bg-red-500/10';
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
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              🎤 AI Voice Commands
            </h1>
            <p className="text-gray-400 text-lg">
              Whisper Large-v3 + GPT-4 Turbo · Natural Language Processing
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-purple-400">
                {currentTime.toLocaleTimeString('ko-KR')}
              </div>
              <div className="text-sm text-gray-500">
                {modelStats.commandsProcessed.toLocaleString()} commands today
              </div>
            </div>
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
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Speech Recognition</div>
          <div className="text-2xl font-bold text-purple-400">{modelStats.accuracy}%</div>
          <div className="text-xs text-gray-500 mt-2">{modelStats.speechModel}</div>
        </div>
        
        <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Intent Recognition</div>
          <div className="text-2xl font-bold text-pink-400">{modelStats.intentRecognitionRate}%</div>
          <div className="text-xs text-gray-500 mt-2">{modelStats.nlpModel}</div>
        </div>
        
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Response Time</div>
          <div className="text-2xl font-bold text-red-400">{modelStats.latency}ms</div>
          <div className="text-xs text-gray-500 mt-2">Average latency</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Success Rate</div>
          <div className="text-2xl font-bold text-orange-400">{modelStats.successRate}%</div>
          <div className="text-xs text-gray-500 mt-2">{modelStats.languageSupport} languages</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-8">
        {/* Voice Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Voice Input</h2>
          
          {/* Microphone Visualization */}
          <div className="mb-8 flex flex-col items-center justify-center h-64 bg-black/30 rounded-2xl border border-gray-700/30 relative overflow-hidden">
            <AnimatePresence>
              {(isListening || isProcessing) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  exit={{ scale: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className={`w-32 h-32 rounded-full ${
                    isListening ? 'bg-purple-500/20' : 'bg-cyan-500/20'
                  } blur-2xl`} />
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.button
              onClick={handleStartListening}
              disabled={isListening || isProcessing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all ${
                isListening
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse'
                  : isProcessing
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-500'
                  : 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
              } ${(isListening || isProcessing) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isListening ? '🎤' : isProcessing ? '⚙️' : '🎙️'}
            </motion.button>
            
            <div className="mt-6 text-center">
              <div className="text-gray-400 text-sm mb-2">
                {isListening ? 'Listening...' : isProcessing ? 'Processing...' : 'Click to speak'}
              </div>
              
              {transcript && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white text-lg font-medium max-w-md mx-auto"
                >
                  "{transcript}"
                </motion.div>
              )}
            </div>
          </div>

          {/* Suggested Commands */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Suggested Commands</h3>
            <div className="grid grid-cols-2 gap-3">
              {suggestedCommands.map((cmd, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => handleSuggestedCommand(cmd.phrase)}
                  disabled={isListening || isProcessing}
                  className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 border border-gray-700/50 rounded-lg p-3 text-left hover:border-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-purple-400 text-sm font-medium mb-1">{cmd.phrase}</div>
                  <div className="text-gray-500 text-xs">{cmd.description}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    <span className="px-2 py-0.5 bg-gray-700/50 rounded">{cmd.category}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Command History */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl overflow-hidden"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Command History</h2>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {commandHistory.map((cmd, index) => (
              <motion.div
                key={cmd.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="border border-gray-700/50 rounded-xl p-4 bg-black/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-white text-sm">{cmd.id}</div>
                    <div className="text-xs text-gray-400">{cmd.timestamp}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${getStatusColor(cmd.status)}`}>
                    {cmd.status}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="text-gray-400 text-xs">Transcript</div>
                    <div className="text-white italic">"{cmd.transcript}"</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-xs">Intent</div>
                    <div className="text-purple-400 font-mono text-xs">{cmd.intent}</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-xs">Action</div>
                    <div className="text-cyan-400">{cmd.action}</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Confidence</div>
                    <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cmd.confidence}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                    <div className="text-right text-xs text-purple-400 mt-1">
                      {cmd.confidence.toFixed(1)}%
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
        className="mt-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🤖</span>
          Voice AI Insights
        </h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-purple-400 font-semibold mb-2">Time Saved</div>
            <div className="text-white text-lg">124 hours/month</div>
            <div className="text-sm text-gray-400 mt-1">
              vs manual keyboard input
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-pink-400 font-semibold mb-2">User Satisfaction</div>
            <div className="text-white text-lg">4.8/5.0 ⭐</div>
            <div className="text-sm text-gray-400 mt-1">
              From 247 user ratings
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-red-400 font-semibold mb-2">Multilingual</div>
            <div className="text-white text-lg">{modelStats.languageSupport} languages</div>
            <div className="text-sm text-gray-400 mt-1">
              Real-time translation
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
