'use server';

/**
 * NEXUS Core Server Actions
 * Data handlers for FIELD NINE logistics ecosystem
 * Simulated network delays for realistic feel
 */

import {
    InventoryItem,
    KausMarket,
    SecurityLog,
    LogisticsNode,
    DroneStatus,
    BlockchainTransaction,
    SystemHealth,
    MarketAnalysis,
} from '@/lib/types/nexus-data';
import {
    mockInventoryItems,
    mockKausMarket,
    mockSecurityLogs,
    mockLogisticsNodes,
    mockDroneStatus,
    mockBlockchainTransactions,
    mockSystemHealth,
    mockMarketAnalysis,
} from '@/lib/data/mock-storage';

/**
 * Simulate network delay
 */
const delay = (ms: number = 500): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Add slight randomization to market data for realism
 */
const randomizeMarket = (market: KausMarket): KausMarket => {
    const variation = 0.0001; // Small price variation
    const priceChange = (Math.random() - 0.5) * variation;
    
    return {
        ...market,
        currentPrice: Math.max(0.0094, Math.min(0.0099, market.currentPrice + priceChange)),
        priceKRW: Math.max(12.4, Math.min(12.8, market.priceKRW + priceChange * 1300)),
        change24h: market.change24h + (Math.random() - 0.5) * 0.5,
        volume24h: market.volume24h * (0.95 + Math.random() * 0.1),
        lastUpdated: new Date(),
    };
};

/**
 * Fetch Inventory Status
 * Returns all inventory items with real-time status
 */
export async function fetchInventoryStatus(): Promise<InventoryItem[]> {
    await delay(500);
    
    // Simulate real-time updates
    return mockInventoryItems.map((item) => ({
        ...item,
        temperature: item.temperature + (Math.random() - 0.5) * 0.5,
        lastUpdated: new Date(),
    }));
}

/**
 * Get Inventory Item by ID
 */
export async function getInventoryItem(id: string): Promise<InventoryItem | null> {
    await delay(300);
    
    const item = mockInventoryItems.find((item) => item.id === id);
    if (!item) return null;
    
    return {
        ...item,
        temperature: item.temperature + (Math.random() - 0.5) * 0.5,
        lastUpdated: new Date(),
    };
}

/**
 * Get Market Analysis
 * Returns current KAUS Coin market data with analysis
 */
export async function getMarketAnalysis(): Promise<{
    market: KausMarket;
    analysis: MarketAnalysis;
}> {
    await delay(600);
    
    return {
        market: randomizeMarket(mockKausMarket),
        analysis: {
            ...mockMarketAnalysis,
            lastUpdated: new Date(),
        },
    };
}

/**
 * Get Current Market Price
 * Quick access to current KAUS price
 */
export async function getCurrentMarketPrice(): Promise<KausMarket> {
    await delay(400);
    
    return randomizeMarket(mockKausMarket);
}

/**
 * Fetch Security Logs
 * Returns recent security events
 */
export async function fetchSecurityLogs(limit: number = 50): Promise<SecurityLog[]> {
    await delay(500);
    
    return mockSecurityLogs
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, limit);
}

/**
 * Get Security Logs by Zone
 */
export async function getSecurityLogsByZone(zone: string, limit: number = 20): Promise<SecurityLog[]> {
    await delay(400);
    
    return mockSecurityLogs
        .filter((log) => log.zone === zone)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, limit);
}

/**
 * Fetch Logistics Nodes
 * Returns all logistics nodes with current status
 */
export async function fetchLogisticsNodes(): Promise<LogisticsNode[]> {
    await delay(500);
    
    return mockLogisticsNodes.map((node) => ({
        ...node,
        currentLoad: node.currentLoad + Math.floor((Math.random() - 0.5) * 100),
        lastSync: new Date(),
    }));
}

/**
 * Get Logistics Node by ID
 */
export async function getLogisticsNode(id: string): Promise<LogisticsNode | null> {
    await delay(300);
    
    const node = mockLogisticsNodes.find((node) => node.id === id);
    if (!node) return null;
    
    return {
        ...node,
        currentLoad: node.currentLoad + Math.floor((Math.random() - 0.5) * 100),
        lastSync: new Date(),
    };
}

/**
 * Fetch Drone Status
 * Returns current status of all drones
 */
export async function fetchDroneStatus(): Promise<DroneStatus[]> {
    await delay(500);
    
    return mockDroneStatus.map((drone) => ({
        ...drone,
        batteryLevel: Math.max(0, Math.min(100, drone.batteryLevel + (Math.random() - 0.5) * 5)),
        location: {
            ...drone.location,
            latitude: drone.location.latitude + (Math.random() - 0.5) * 0.001,
            longitude: drone.location.longitude + (Math.random() - 0.5) * 0.001,
        },
        lastUpdate: new Date(),
    }));
}

/**
 * Get Drone by ID
 */
export async function getDroneById(id: string): Promise<DroneStatus | null> {
    await delay(300);
    
    const drone = mockDroneStatus.find((drone) => drone.id === id);
    if (!drone) return null;
    
    return {
        ...drone,
        batteryLevel: Math.max(0, Math.min(100, drone.batteryLevel + (Math.random() - 0.5) * 5)),
        lastUpdate: new Date(),
    };
}

/**
 * Fetch Blockchain Transactions
 * Returns recent blockchain transactions
 */
export async function fetchBlockchainTransactions(limit: number = 50): Promise<BlockchainTransaction[]> {
    await delay(500);
    
    return mockBlockchainTransactions
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, limit);
}

/**
 * Get Transactions by Inventory Item
 */
export async function getTransactionsByInventoryItem(itemId: string): Promise<BlockchainTransaction[]> {
    await delay(400);
    
    return mockBlockchainTransactions
        .filter((tx) => tx.inventoryItemId === itemId)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

/**
 * Get System Health
 * Returns overall system performance metrics
 */
export async function getSystemHealth(): Promise<SystemHealth> {
    await delay(400);
    
    return {
        ...mockSystemHealth,
        networkLatency: mockSystemHealth.networkLatency + Math.floor((Math.random() - 0.5) * 5),
        apiResponseTime: mockSystemHealth.apiResponseTime + Math.floor((Math.random() - 0.5) * 10),
        activeDrones: mockSystemHealth.activeDrones + Math.floor((Math.random() - 0.5) * 50),
        lastUpdated: new Date(),
    };
}

/**
 * Search Inventory
 * Search inventory items by name, zone, or status
 */
export async function searchInventory(query: {
    name?: string;
    zone?: string;
    status?: string;
}): Promise<InventoryItem[]> {
    await delay(500);
    
    let results = [...mockInventoryItems];
    
    if (query.name) {
        results = results.filter((item) =>
            item.name.toLowerCase().includes(query.name!.toLowerCase())
        );
    }
    
    if (query.zone) {
        results = results.filter((item) => item.zone === query.zone);
    }
    
    if (query.status) {
        results = results.filter((item) => item.status === query.status);
    }
    
    return results.map((item) => ({
        ...item,
        lastUpdated: new Date(),
    }));
}

/**
 * Get Dashboard Summary
 * Returns aggregated data for dashboard display
 */
export async function getDashboardSummary(): Promise<{
    inventory: {
        total: number;
        byStatus: Record<string, number>;
        byZone: Record<string, number>;
    };
    market: KausMarket;
    security: {
        recentAlerts: number;
        totalEvents: number;
    };
    system: SystemHealth;
}> {
    await delay(600);
    
    const inventory = mockInventoryItems;
    const byStatus: Record<string, number> = {};
    const byZone: Record<string, number> = {};
    
    inventory.forEach((item) => {
        byStatus[item.status] = (byStatus[item.status] || 0) + 1;
        byZone[item.zone] = (byZone[item.zone] || 0) + 1;
    });
    
    const recentAlerts = mockSecurityLogs.filter(
        (log) => log.status === 'Alert' && 
        log.timestamp.getTime() > Date.now() - 24 * 60 * 60 * 1000
    ).length;
    
    return {
        inventory: {
            total: inventory.length,
            byStatus,
            byZone,
        },
        market: randomizeMarket(mockKausMarket),
        security: {
            recentAlerts,
            totalEvents: mockSecurityLogs.length,
        },
        system: {
            ...mockSystemHealth,
            lastUpdated: new Date(),
        },
    };
}

