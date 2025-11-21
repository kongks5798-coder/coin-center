import Link from "next/link";

export default function ActivityPage() {
  const activities = [
    { type: "whale", action: "Large Transfer", from: "0xA3F9...9F21", to: "Binance", amount: "840,000 KAUS", usd: "$1,192,800", time: "2 min ago", icon: "🐋" },
    { type: "liquidation", action: "Liquidation", from: "0x7B02...C8D4", to: "Aave Protocol", amount: "420 ETH", usd: "$957,600", time: "8 min ago", icon: "⚠️" },
    { type: "whale", action: "Whale Accumulation", from: "Multiple", to: "0x4C9E...11B7", amount: "1,240,000 KAUS", usd: "$1,761,600", time: "15 min ago", icon: "🐋" },
    { type: "burn", action: "Token Burn", from: "KAUS Treasury", to: "Burn Address", amount: "50,000 KAUS", usd: "$71,000", time: "32 min ago", icon: "🔥" },
    { type: "swap", action: "Large Swap", from: "Uniswap", to: "0xD1AA...7E09", amount: "2,500 ETH → KAUS", usd: "$5,700,000", time: "1 hour ago", icon: "🔄" },
  ];

  const whaleWallets = [
    { address: "0xA3F9...9F21", balance: "2.4M KAUS", percentage: "4.8%", lastActive: "2 min ago" },
    { address: "0x742d...35A6", balance: "1.8M KAUS", percentage: "3.6%", lastActive: "1 hour ago" },
    { address: "0x4C9E...11B7", balance: "1.6M KAUS", percentage: "3.2%", lastActive: "15 min ago" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-amber-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-rose-500/30 blur-3xl" />
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
            <Link href="/yield" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Yield
            </Link>
            <Link href="/treasury" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Treasury
            </Link>
            <Link href="/governance" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Governance
            </Link>
            <Link href="/activity" className="text-sm text-purple-400 font-semibold">
              Activity
            </Link>
          </nav>
        </header>

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Live Activity Feed
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            대량 전송, 청산, 고래 움직임을 실시간으로 추적합니다. 네트워크에서 발생하는 모든 주요 이벤트를 확인하세요.
          </p>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="rounded-2xl border border-amber-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">24h Transactions</p>
            <p className="text-3xl font-bold text-amber-400">12,847</p>
            <p className="text-sm text-emerald-400 mt-1">+22.4% vs yesterday</p>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Whale Movements</p>
            <p className="text-3xl font-bold text-rose-400">28</p>
            <p className="text-sm text-slate-400 mt-1">Last 24 hours</p>
          </div>
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Total Volume</p>
            <p className="text-3xl font-bold text-purple-400">$24.8M</p>
            <p className="text-sm text-emerald-400 mt-1">+18.7% 24h</p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Active Addresses</p>
            <p className="text-3xl font-bold text-cyan-400">4,521</p>
            <p className="text-sm text-emerald-400 mt-1">+12.3% 24h</p>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 overflow-hidden shadow-[0_0_30px_rgba(15,23,42,0.5)] mb-12">
          <div className="bg-slate-950/90 border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-100">실시간 활동 피드</h2>
              <p className="text-sm text-slate-400 mt-1">네트워크의 주요 이벤트를 실시간으로 모니터링</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm text-emerald-400 font-semibold">Live</span>
            </div>
          </div>
          
          <div className="divide-y divide-slate-800/50">
            {activities.map((activity, index) => (
              <div key={index} className="p-6 hover:bg-slate-900/50 transition">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-100">{activity.action}</h3>
                      <span className="text-sm text-slate-500">{activity.time}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">From</p>
                        <p className="font-mono text-sm text-slate-200">{activity.from}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">To</p>
                        <p className="font-mono text-sm text-slate-200">{activity.to}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-slate-300">{activity.amount}</span>
                      <span className="text-lg font-bold text-amber-400">{activity.usd}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Whale Tracker */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <span className="text-2xl">🐋</span>
              Top Whale Wallets
            </h3>
            <div className="space-y-4">
              {whaleWallets.map((wallet, index) => (
                <div key={index} className="rounded-xl border border-slate-800/60 bg-slate-900/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-slate-200">{wallet.address}</span>
                    <span className="text-sm font-semibold text-amber-400">{wallet.balance}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{wallet.percentage} of supply</span>
                    <span className="text-emerald-400">Active: {wallet.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Network Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Transaction Success Rate</span>
                  <span className="text-sm font-semibold text-emerald-400">99.8%</span>
                </div>
                <div className="bg-slate-800/50 rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '99.8%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Average Gas Price</span>
                  <span className="text-sm font-semibold text-cyan-400">42 Gwei</span>
                </div>
                <div className="bg-slate-800/50 rounded-full h-2">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Network Congestion</span>
                  <span className="text-sm font-semibold text-amber-400">Low</span>
                </div>
                <div className="bg-slate-800/50 rounded-full h-2">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-amber-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">🔔</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">실시간 알림</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              고래 움직임, 대량 거래, 청산 등 중요한 이벤트 발생 시 즉시 알림을 받습니다. 커스터마이징 가능한 알림 설정.
            </p>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">📡</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">고급 필터링</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              거래 유형, 금액, 시간대 등으로 활동을 필터링합니다. 관심있는 이벤트만 선택적으로 추적 가능.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">패턴 분석</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI 기반 패턴 인식으로 비정상적인 활동을 감지합니다. 시장 움직임을 예측하고 리스크를 관리하세요.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
