'use client';

import { useState, useEffect } from 'react';
import { useNexusRobots, useNexusWarehouse, useNexusPredictions } from '@/hooks/useNexusData';
import { TrendingUp, TrendingDown, Activity, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';

export function AnalyticsDashboard() {
  const { robots, loading: robotsLoading } = useNexusRobots(5000);
  const { warehouse, loading: warehouseLoading } = useNexusWarehouse(10000);
  const { predictions, loading: predictionsLoading } = useNexusPredictions(30000);

  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  const loading = robotsLoading || warehouseLoading || predictionsLoading;

  // Calculate statistics
  const stats = {
    activeRobots: robots.filter(r => r.status === 'active').length,
    totalRobots: robots.length,
    avgBattery: robots.length > 0
      ? Math.round(robots.reduce((sum, r) => sum + r.battery, 0) / robots.length)
      : 0,
    warehouseUtilization: warehouse
      ? Math.round(
          warehouse.zones.reduce((sum, z) => sum + z.capacity, 0) /
          warehouse.zones.length
        )
      : 0,
    aiAccuracy: predictions?.aiPerformance.accuracy || 0,
    demandTrend: predictions?.demandForecast.trend || 'stable',
    criticalItems: predictions?.inventoryDepletion.critical.length || 0,
  };

  if (loading && robots.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">실시간 분석 대시보드</h2>
        <div className="flex gap-2">
          {(['1h', '24h', '7d', '30d'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-accent'
              }`}
            >
              {range === '1h' ? '1시간' : range === '24h' ? '24시간' : range === '7d' ? '7일' : '30일'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Robots */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">활성 로봇</div>
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold">{stats.activeRobots}</div>
            <div className="text-sm text-muted-foreground">/ {stats.totalRobots}</div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(stats.activeRobots / stats.totalRobots) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Average Battery */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">평균 배터리</div>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold">{stats.avgBattery}%</div>
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  stats.avgBattery > 70 ? 'bg-green-500' : stats.avgBattery > 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${stats.avgBattery}%` }}
              />
            </div>
          </div>
        </div>

        {/* AI Accuracy */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">AI 정확도</div>
            {stats.demandTrend === 'up' ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : stats.demandTrend === 'down' ? (
              <TrendingDown className="w-5 h-5 text-red-500" />
            ) : (
              <Activity className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div className="text-3xl font-bold">{stats.aiAccuracy.toFixed(1)}%</div>
          <div className="mt-2 text-sm text-muted-foreground">
            {predictions?.aiPerformance.predictionsPerDay.toLocaleString()} 예측/일
          </div>
        </div>

        {/* Critical Items */}
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">긴급 재고</div>
            {stats.criticalItems > 0 ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
          </div>
          <div className="text-3xl font-bold">{stats.criticalItems}</div>
          <div className="mt-2 text-sm text-muted-foreground">
            {stats.criticalItems > 0 ? '재주문 필요' : '모든 재고 정상'}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand Forecast Chart */}
        {predictions && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">수요 예측</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">신뢰도</span>
                <span className="text-lg font-bold">{predictions.demandForecast.confidence}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">다음 시간 예측:</span>
                <span className="text-lg font-semibold">{predictions.demandForecast.nextHour}건</span>
              </div>
              <div className="h-32 bg-muted/50 rounded-lg flex items-end justify-around p-2">
                {predictions.demandForecast.next6Hours.map((value, i) => (
                  <div
                    key={i}
                    className="bg-primary rounded-t transition-all hover:bg-primary/80"
                    style={{
                      width: '12%',
                      height: `${(value / Math.max(...predictions.demandForecast.next6Hours)) * 100}%`,
                    }}
                    title={`${i + 1}시간 후: ${value}건`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Warehouse Zones */}
        {warehouse && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">창고 존 상태</h3>
            <div className="space-y-4">
              {warehouse.zones.map(zone => (
                <div key={zone.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{zone.name}</span>
                    <span className="text-muted-foreground">{zone.capacity}% 사용</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        zone.capacity > 90 ? 'bg-red-500' : zone.capacity > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${zone.capacity}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>온도: {zone.temperature}°C</span>
                    <span>습도: {zone.humidity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
