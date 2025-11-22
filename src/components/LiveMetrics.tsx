'use client';

import { useState, useEffect } from 'react';

interface Metric {
  id: string;
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'gold';
}

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: 'robots',
      label: 'Active Robots',
      value: '5/5',
      change: 0,
      trend: 'stable',
      icon: '🤖',
      color: 'blue'
    },
    {
      id: 'tasks',
      label: 'Tasks Processed',
      value: '1,247',
      change: +12.5,
      trend: 'up',
      icon: '✅',
      color: 'green'
    },
    {
      id: 'accuracy',
      label: 'AI Accuracy',
      value: '94.7%',
      change: +2.3,
      trend: 'up',
      icon: '🎯',
      color: 'purple'
    },
    {
      id: 'savings',
      label: 'Monthly Savings',
      value: '₩2.4M',
      change: +15.8,
      trend: 'up',
      icon: '💰',
      color: 'gold'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        if (metric.id === 'tasks') {
          const currentValue = parseInt(metric.value.toString().replace(/,/g, ''));
          const newValue = currentValue + Math.floor(Math.random() * 3);
          return {
            ...metric,
            value: newValue.toLocaleString(),
            change: +(Math.random() * 20 - 5).toFixed(1)
          };
        }
        if (metric.id === 'accuracy') {
          const newAccuracy = (94 + Math.random() * 2).toFixed(1);
          return {
            ...metric,
            value: `${newAccuracy}%`,
            change: +(Math.random() * 5 - 2).toFixed(1)
          };
        }
        return metric;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-cyan-500',
      green: 'from-green-500 to-emerald-500',
      purple: 'from-purple-500 to-fuchsia-500',
      gold: 'from-yellow-500 to-orange-500'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={metric.id}
          className="metric-badge-card group relative overflow-hidden"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Gradient Background on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(metric.color)} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

          <div className="relative z-10 p-6">
            {/* Icon & Trend */}
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{metric.icon}</div>
              <div className="metric-badge">
                <span className={`text-xs font-semibold ${
                  metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                  metric.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {metric.trend === 'up' && '↗'}
                  {metric.trend === 'down' && '↘'}
                  {metric.trend === 'stable' && '→'}
                  {metric.change > 0 && '+'}
                  {metric.change !== 0 && `${metric.change}%`}
                </span>
              </div>
            </div>

            {/* Value */}
            <div className="mb-2">
              <div className="text-3xl font-bold text-gradient-primary">
                {metric.value}
              </div>
            </div>

            {/* Label */}
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {metric.label}
            </div>

            {/* Live Indicator */}
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>실시간</span>
            </div>
          </div>

          {/* Hover Border Effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/30 rounded-lg transition-colors duration-300 pointer-events-none" />
        </div>
      ))}
      
      <style jsx>{`
        .metric-badge-card {
          background: var(--background-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          transition: all var(--transition-base);
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .metric-badge-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: var(--shadow-xl);
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
