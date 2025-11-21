import Link from "next/link";

export default function YieldPage() {
  const yieldPools = [
    { name: "KAUS-ETH LP", protocol: "Uniswap V3", apy: "142.8%", tvl: "$2.4M", rewards: "KAUS + Fees", risk: "Medium" },
    { name: "KAUS Staking", protocol: "Native", apy: "68.5%", tvl: "$8.1M", rewards: "KAUS", risk: "Low" },
    { name: "USDC Lending", protocol: "Aave", apy: "12.3%", tvl: "$5.2M", rewards: "USDC Interest", risk: "Low" },
    { name: "ETH-USDC LP", protocol: "Curve", apy: "24.7%", tvl: "$3.8M", rewards: "CRV + Fees", risk: "Medium" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-emerald-500/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <header className="flex items-center justify-between border-b border-purple-500/20 pb-6 mb-12">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all group-hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]">
              <span className="text-lg font-bold text-white">KC</span>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                KAUS Coin
              </h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Control Center</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/market" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Market
            </Link>
            <Link href="/wallets" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Wallets
            </Link>
            <Link href="/yield" className="text-sm text-purple-400 font-semibold">
              Yield
            </Link>
            <Link href="/treasury" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Treasury
            </Link>
            <Link href="/governance" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Governance
            </Link>
            <Link href="/activity" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Activity
            </Link>
          </nav>
        </header>

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Yield & Profit Dashboard
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            스테이킹, 렌딩, 파밍으로 수익을 창출하세요. 실시간 APY와 리워드 분배를 추적합니다.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Total Staked</p>
            <p className="text-3xl font-bold text-emerald-400">$19.5M</p>
            <p className="text-sm text-emerald-400 mt-1">+8.2% this week</p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Avg APY</p>
            <p className="text-3xl font-bold text-cyan-400">62.1%</p>
            <p className="text-sm text-slate-400 mt-1">Across all pools</p>
          </div>
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Daily Rewards</p>
            <p className="text-3xl font-bold text-purple-400">$3,240</p>
            <p className="text-sm text-emerald-400 mt-1">+12.5% 24h</p>
          </div>
          <div className="rounded-2xl border border-fuchsia-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Active Positions</p>
            <p className="text-3xl font-bold text-fuchsia-400">12</p>
            <p className="text-sm text-slate-400 mt-1">4 protocols</p>
          </div>
        </div>

        {/* Yield Pools */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 overflow-hidden shadow-[0_0_30px_rgba(15,23,42,0.5)]">
          <div className="bg-slate-950/90 border-b border-slate-800/80 px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-100">Active Yield Pools</h2>
            <p className="text-sm text-slate-400 mt-1">현재 운영 중인 수익 창출 풀</p>
          </div>
          
          <div className="divide-y divide-slate-800/50">
            {yieldPools.map((pool, index) => (
              <div key={index} className="p-6 hover:bg-slate-900/50 transition">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-1">{pool.name}</h3>
                    <p className="text-sm text-slate-400">{pool.protocol}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-emerald-400">{pool.apy}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">APY</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">TVL</p>
                    <p className="text-sm font-semibold text-slate-200">{pool.tvl}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Rewards</p>
                    <p className="text-sm font-semibold text-slate-200">{pool.rewards}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Risk Level</p>
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      pool.risk === 'Low' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {pool.risk}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">자동 복리</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              리워드를 자동으로 재투자하여 복리 효과를 극대화합니다. 수수료 최적화로 최대 수익 보장.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">수익 분석</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              일별, 주별, 월별 수익을 상세히 분석합니다. 각 풀의 성과를 비교하고 최적의 전략을 수립하세요.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">리스크 관리</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              스마트 컨트랙트 감사, IL(Impermanent Loss) 계산, 프로토콜 리스크 평가 등 종합적인 리스크 관리.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
