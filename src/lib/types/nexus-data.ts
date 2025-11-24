/**
 * NEXUS Data Backbone - TypeScript Interfaces
 * Core data structures for FIELD NINE logistics ecosystem
 */

/**
 * Inventory Item Status
 */
export type InventoryStatus = 'Good' | 'Warning' | 'Critical' | 'Maintenance';

/**
 * Warehouse Zone
 */
export type WarehouseZone = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

/**
 * Security Event Type
 */
export type SecurityEventType = 'Bio-scan' | 'Geofence' | 'Motion' | 'RFID' | 'Temperature' | 'Access';

/**
 * Security Status
 */
export type SecurityStatus = 'Clear' | 'Alert' | 'Warning' | 'Breach';

/**
 * Inventory Item
 * Represents a physical asset in the logistics hub
 */
export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    zone: WarehouseZone;
    temperature: number; // Celsius
    humidity?: number; // Percentage
    status: InventoryStatus;
    blockchainHash: string;
    lastUpdated: Date;
    location?: {
        x: number;
        y: number;
        z: number;
    };
    metadata?: {
        sku?: string;
        batch?: string;
        expiryDate?: Date;
        supplier?: string;
    };
}

/**
 * KAUS Market Data
 * Real-time market information for KAUS Coin
 */
export interface KausMarket {
    currentPrice: number; // USD
    priceKRW: number; // Korean Won
    price24hAgo: number;
    change24h: number; // Percentage
    change24hAbsolute: number;
    volume: number; // Total volume in KAUS
    volume24h: number;
    marketCap: number; // Total market capitalization
    gasFee: number; // Gwei
    activeNodes: number;
    totalAUM: number; // Total Assets Under Management (KRW)
    lastUpdated: Date;
    priceHistory?: {
        timestamp: Date;
        price: number;
    }[];
}

/**
 * Security Log Entry
 * Security events and monitoring data
 */
export interface SecurityLog {
    id: string;
    timestamp: Date;
    location: string;
    zone?: WarehouseZone;
    type: SecurityEventType;
    status: SecurityStatus;
    description: string;
    userId?: string;
    deviceId?: string;
    metadata?: {
        temperature?: number;
        motionLevel?: number;
        rfidTag?: string;
        biometricMatch?: boolean;
    };
}

/**
 * Logistics Node
 * Physical location in the logistics network
 */
export interface LogisticsNode {
    id: string;
    name: string;
    location: {
        latitude: number;
        longitude: number;
        address: string;
    };
    zone: WarehouseZone;
    capacity: number;
    currentLoad: number;
    status: 'Operational' | 'Maintenance' | 'Offline';
    inventory: InventoryItem[];
    lastSync: Date;
}

/**
 * Drone Status
 * Autonomous drone fleet information
 */
export interface DroneStatus {
    id: string;
    status: 'Active' | 'Idle' | 'Charging' | 'Maintenance' | 'Offline';
    location: {
        latitude: number;
        longitude: number;
        altitude: number;
    };
    batteryLevel: number; // Percentage
    currentTask?: {
        type: 'Delivery' | 'Inspection' | 'Patrol';
        destination: string;
        estimatedArrival: Date;
    };
    lastUpdate: Date;
}

/**
 * Blockchain Transaction
 * KAUS Coin transaction record
 */
export interface BlockchainTransaction {
    hash: string;
    from: string;
    to: string;
    amount: number;
    timestamp: Date;
    status: 'Pending' | 'Confirmed' | 'Failed';
    gasUsed: number;
    blockNumber?: number;
    inventoryItemId?: string; // Link to physical asset
}

/**
 * System Health Metrics
 * Overall system performance indicators
 */
export interface SystemHealth {
    uptime: number; // Percentage
    activeDrones: number;
    totalDrones: number;
    networkLatency: number; // Milliseconds
    apiResponseTime: number; // Milliseconds
    errorRate: number; // Percentage
    lastUpdated: Date;
}

/**
 * Market Analysis
 * Advanced market insights and predictions
 */
export interface MarketAnalysis {
    trend: 'Bullish' | 'Bearish' | 'Neutral';
    confidence: number; // 0-100
    predictions: {
        next24h: {
            price: number;
            change: number;
        };
        next7d: {
            price: number;
            change: number;
        };
    };
    indicators: {
        rsi: number; // Relative Strength Index
        macd: number;
        volumeTrend: 'Increasing' | 'Decreasing' | 'Stable';
    };
    lastUpdated: Date;
}

