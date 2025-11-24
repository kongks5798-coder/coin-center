/**
 * NEXUS Mock Data Storage
 * Synthetic data for simulation and development
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

/**
 * Generate random number between min and max
 */
const random = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

/**
 * Generate random date within last N days
 */
const randomDate = (daysAgo: number = 7): Date => {
    const now = new Date();
    const past = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
};

/**
 * Generate blockchain hash
 */
const generateHash = (): string => {
    return '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

/**
 * Mock Inventory Items
 */
export const mockInventoryItems: InventoryItem[] = [
    {
        id: 'INV-001',
        name: 'Industrial Batteries',
        quantity: 1250,
        zone: 'A',
        temperature: 18.2,
        humidity: 45,
        status: 'Good',
        blockchainHash: generateHash(),
        lastUpdated: new Date(),
        location: { x: 12.5, y: 3.2, z: 8.1 },
        metadata: {
            sku: 'BAT-IND-2024',
            batch: 'BATCH-2024-Q1',
            supplier: 'TechPower Industries',
        },
    },
    {
        id: 'INV-002',
        name: 'RFID Tracking Tags',
        quantity: 50000,
        zone: 'B',
        temperature: 20.5,
        humidity: 42,
        status: 'Good',
        blockchainHash: generateHash(),
        lastUpdated: new Date(),
        location: { x: 45.2, y: 2.8, z: 12.3 },
        metadata: {
            sku: 'RFID-PRO-2024',
            batch: 'BATCH-2024-Q2',
        },
    },
    {
        id: 'INV-003',
        name: 'Quantum Computing Modules',
        quantity: 15,
        zone: 'C',
        temperature: 16.8,
        humidity: 38,
        status: 'Good',
        blockchainHash: generateHash(),
        lastUpdated: new Date(),
        location: { x: 78.9, y: 5.1, z: 20.4 },
        metadata: {
            sku: 'QC-MOD-V2',
            batch: 'BATCH-2024-EXCLUSIVE',
            supplier: 'Quantum Dynamics Corp',
        },
    },
    {
        id: 'INV-004',
        name: 'Autonomous Drone Parts',
        quantity: 320,
        zone: 'A',
        temperature: 19.5,
        humidity: 40,
        status: 'Warning',
        blockchainHash: generateHash(),
        lastUpdated: randomDate(1),
        location: { x: 15.3, y: 2.1, z: 5.7 },
        metadata: {
            sku: 'DRONE-PARTS-V3',
            batch: 'BATCH-2024-Q1',
        },
    },
    {
        id: 'INV-005',
        name: 'Satellite Communication Equipment',
        quantity: 48,
        zone: 'D',
        temperature: 17.2,
        humidity: 35,
        status: 'Good',
        blockchainHash: generateHash(),
        lastUpdated: new Date(),
        location: { x: 92.1, y: 6.3, z: 25.8 },
        metadata: {
            sku: 'SAT-COMM-PRO',
            batch: 'BATCH-2024-Q2',
            supplier: 'Orbit Systems Inc',
        },
    },
    {
        id: 'INV-006',
        name: 'Blockchain Node Hardware',
        quantity: 200,
        zone: 'C',
        temperature: 21.3,
        humidity: 50,
        status: 'Good',
        blockchainHash: generateHash(),
        lastUpdated: new Date(),
        location: { x: 65.4, y: 4.2, z: 18.9 },
        metadata: {
            sku: 'BC-NODE-HW',
            batch: 'BATCH-2024-Q1',
        },
    },
];

/**
 * Mock KAUS Market Data
 * Price fluctuates between 12.4 ~ 12.8 KRW (approximately $0.0095 ~ $0.0098 USD)
 */
export const mockKausMarket: KausMarket = {
    currentPrice: 0.0096, // USD (approximately 12.6 KRW)
    priceKRW: 12.6,
    price24hAgo: 0.0095,
    change24h: 1.05, // +1.05%
    change24hAbsolute: 0.0001,
    volume: 124000000000, // 124B KAUS
    volume24h: 8500000000, // 8.5B KAUS
    marketCap: 54000000000000, // ₩54T
    gasFee: 12, // Gwei
    activeNodes: 5000,
    totalAUM: 54000000000000, // ₩54T
    lastUpdated: new Date(),
    priceHistory: Array.from({ length: 24 }, (_, i) => ({
        timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
        price: 0.0095 + Math.random() * 0.0003, // Fluctuates between 0.0095 ~ 0.0098
    })),
};

/**
 * Mock Security Logs
 */
export const mockSecurityLogs: SecurityLog[] = [
    {
        id: 'SEC-001',
        timestamp: new Date(),
        location: 'Sector 4 - Zone A',
        zone: 'A',
        type: 'Motion',
        status: 'Clear',
        description: 'Authorized Drone - Delivery Task #DR-4521',
        deviceId: 'DRONE-4521',
        metadata: {
            motionLevel: 0.3,
        },
    },
    {
        id: 'SEC-002',
        timestamp: randomDate(2),
        location: 'Main Entrance - Zone B',
        zone: 'B',
        type: 'Bio-scan',
        status: 'Clear',
        description: 'Employee Access - ID: EMP-2024-001',
        userId: 'EMP-2024-001',
        metadata: {
            biometricMatch: true,
        },
    },
    {
        id: 'SEC-003',
        timestamp: randomDate(1),
        location: 'Perimeter - Zone C',
        zone: 'C',
        type: 'Geofence',
        status: 'Clear',
        description: 'RFID Tag Entry - Inventory Item INV-003',
        metadata: {
            rfidTag: 'RFID-003-2024',
        },
    },
    {
        id: 'SEC-004',
        timestamp: randomDate(3),
        location: 'Cold Storage - Zone D',
        zone: 'D',
        type: 'Temperature',
        status: 'Warning',
        description: 'Temperature Alert - Zone D - 2.5°C (Optimal: 2.0°C)',
        metadata: {
            temperature: 2.5,
        },
    },
    {
        id: 'SEC-005',
        timestamp: randomDate(0.5),
        location: 'Loading Dock - Zone A',
        zone: 'A',
        type: 'Access',
        status: 'Clear',
        description: 'Authorized Vehicle Entry - License: FIELD-2024-001',
        deviceId: 'VEHICLE-001',
    },
];

/**
 * Mock Logistics Nodes
 */
export const mockLogisticsNodes: LogisticsNode[] = [
    {
        id: 'NODE-001',
        name: 'Logistics Node 09',
        location: {
            latitude: 37.5665,
            longitude: 126.9780,
            address: 'Seoul, South Korea',
        },
        zone: 'A',
        capacity: 10000,
        currentLoad: 7500,
        status: 'Operational',
        inventory: mockInventoryItems.filter((item) => item.zone === 'A'),
        lastSync: new Date(),
    },
    {
        id: 'NODE-002',
        name: 'Logistics Node 12',
        location: {
            latitude: 35.1796,
            longitude: 129.0756,
            address: 'Busan, South Korea',
        },
        zone: 'B',
        capacity: 15000,
        currentLoad: 12000,
        status: 'Operational',
        inventory: mockInventoryItems.filter((item) => item.zone === 'B'),
        lastSync: new Date(),
    },
    {
        id: 'NODE-003',
        name: 'Logistics Node 15',
        location: {
            latitude: 37.4563,
            longitude: 126.7052,
            address: 'Incheon, South Korea',
        },
        zone: 'C',
        capacity: 20000,
        currentLoad: 18000,
        status: 'Operational',
        inventory: mockInventoryItems.filter((item) => item.zone === 'C'),
        lastSync: new Date(),
    },
];

/**
 * Mock Drone Status
 */
export const mockDroneStatus: DroneStatus[] = Array.from({ length: 10 }, (_, i) => ({
    id: `DRONE-${String(i + 1).padStart(4, '0')}`,
    status: ['Active', 'Idle', 'Charging', 'Maintenance'][Math.floor(Math.random() * 4)] as any,
    location: {
        latitude: 37.5665 + (Math.random() - 0.5) * 0.1,
        longitude: 126.9780 + (Math.random() - 0.5) * 0.1,
        altitude: random(50, 200),
    },
    batteryLevel: random(20, 100),
    currentTask: Math.random() > 0.3 ? {
        type: ['Delivery', 'Inspection', 'Patrol'][Math.floor(Math.random() * 3)] as any,
        destination: `Node-${Math.floor(Math.random() * 20)}`,
        estimatedArrival: new Date(Date.now() + random(5, 30) * 60 * 1000),
    } : undefined,
    lastUpdate: randomDate(0.1),
}));

/**
 * Mock Blockchain Transactions
 */
export const mockBlockchainTransactions: BlockchainTransaction[] = Array.from({ length: 20 }, (_, i) => ({
    hash: generateHash(),
    from: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    to: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    amount: random(100, 1000000),
    timestamp: randomDate(7),
    status: ['Pending', 'Confirmed', 'Confirmed', 'Confirmed'][Math.floor(Math.random() * 4)] as any,
    gasUsed: random(21000, 100000),
    blockNumber: Math.floor(Math.random() * 1000000) + 1000000,
    inventoryItemId: Math.random() > 0.5 ? `INV-${String(Math.floor(Math.random() * 6) + 1).padStart(3, '0')}` : undefined,
}));

/**
 * Mock System Health
 */
export const mockSystemHealth: SystemHealth = {
    uptime: 99.99,
    activeDrones: 8500,
    totalDrones: 10000,
    networkLatency: 12, // ms
    apiResponseTime: 45, // ms
    errorRate: 0.01, // 0.01%
    lastUpdated: new Date(),
};

/**
 * Mock Market Analysis
 */
export const mockMarketAnalysis: MarketAnalysis = {
    trend: 'Bullish',
    confidence: 87,
    predictions: {
        next24h: {
            price: 0.0097,
            change: 1.04,
        },
        next7d: {
            price: 0.0099,
            change: 3.13,
        },
    },
    indicators: {
        rsi: 65.2,
        macd: 0.00015,
        volumeTrend: 'Increasing',
    },
    lastUpdated: new Date(),
};

