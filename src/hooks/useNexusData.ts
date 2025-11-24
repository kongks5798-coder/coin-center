/**
 * NEXUS OS Real-time Data Hook
 * Connects frontend to backend API for real-time data fetching
 */

import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface Robot {
  id: string;
  name: string;
  status: 'active' | 'charging' | 'maintenance' | 'idle';
  battery: number;
  position: { x: number; y: number };
  task: string;
}

interface Warehouse {
  zones: Array<{
    id: string;
    name: string;
    temperature: number;
    humidity: number;
    capacity: number;
  }>;
  conveyors: Array<{
    id: string;
    name: string;
    speed: number;
    items: number;
  }>;
  stations: Array<{
    id: string;
    name: string;
    occupied: boolean;
  }>;
}

interface Predictions {
  demandForecast: {
    confidence: number;
    trend: 'up' | 'down' | 'stable';
    nextHour: number;
    next6Hours: number[];
  };
  inventoryDepletion: {
    critical: string[];
    warnings: string[];
    daysLeft: Record<string, number>;
  };
  robotOptimization: {
    currentUtilization: number;
    recommendedFleetSize: number;
    potentialSavings: number;
  };
  aiPerformance: {
    accuracy: number;
    predictionsPerDay: number;
    learningRate: number;
    trainingDataPoints: number;
  };
}

export function useNexusRobots(refreshInterval: number = 5000) {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRobots = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/nexus/robots`);
      if (!response.ok) throw new Error('Failed to fetch robots');
      const data = await response.json();
      setRobots(data.robots || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Fallback to mock data if API fails
      setRobots([
        {
          id: 'robot-1',
          name: 'AGV-001',
          status: 'active',
          battery: 87,
          position: { x: 120, y: 80 },
          task: 'Picking Item #4521'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRobots();
    const interval = setInterval(fetchRobots, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchRobots, refreshInterval]);

  return { robots, loading, error, refetch: fetchRobots };
}

export function useNexusWarehouse(refreshInterval: number = 10000) {
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWarehouse = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/nexus/warehouse`);
      if (!response.ok) throw new Error('Failed to fetch warehouse data');
      const data = await response.json();
      setWarehouse(data.warehouse || null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWarehouse();
    const interval = setInterval(fetchWarehouse, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchWarehouse, refreshInterval]);

  return { warehouse, loading, error, refetch: fetchWarehouse };
}

export function useNexusPredictions(refreshInterval: number = 30000) {
  const [predictions, setPredictions] = useState<Predictions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPredictions = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/nexus/predictions`);
      if (!response.ok) throw new Error('Failed to fetch predictions');
      const data = await response.json();
      setPredictions(data.predictions || null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPredictions();
    const interval = setInterval(fetchPredictions, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchPredictions, refreshInterval]);

  return { predictions, loading, error, refetch: fetchPredictions };
}

export function useRFIDScan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scanRFID = useCallback(async (tagId: string, location: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/nexus/rfid-scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tagId,
          location,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error('Failed to record RFID scan');
      const data = await response.json();
      return data.event;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { scanRFID, loading, error };
}
