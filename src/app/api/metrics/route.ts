import { NextResponse } from "next/server";

export async function GET() {
    // TODO: 여기서 실제 WMS/온체인 데이터로 교체
    const now = new Date().toISOString();

    return NextResponse.json({
        facilityStatus: "online",
        utilization: 0.83,
        todayOrders: 3214,
        kausCollateralRatio: 1.32,
        updatedAt: now,
    });
}

