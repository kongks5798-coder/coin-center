import Link from "next/link";

export default function MarketPage() {
  const marketData = [
    { symbol: "KAUS/USDT", price: 1.42, change24h: 12.4, volume: "8.2M", high: 1.48, low: 1.26 },
    { symbol: "KAUS/ETH", price: 0.00042, change24h: 8.7, volume: "2.1M", high: 0.00045, low: 0.00038 },
    { symbol: "BTC/USDT", price: 43250, change24h: 3.2, volume: "1.2B", high: 44100, low: 41800 },
    { symbol: "ETH/USDT", price: 2280, change24h: 5.1, volume: "845M", high: 2350, low: 2180 },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      {/* Neon background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute inset-x-0 bottom-[-20rem] mx-auto h-96 w-[40rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Header */}
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
            <Link href="/market" className="text-sm text-purple-400 font-semibold">
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
            <Link href="/activity" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Activity
            </Link>
          </nav>
        </header>

        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Live Market Radar
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            실시간 거래 데이터를 제공할 예정입니다. KAUS 메인넷 출시와 함께 활성화됩니다.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="mb-12 rounded-3xl border border-purple-500/50 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-12 text-center">
          <div className="text-6xl mb-6">📊</div>
          <h2 className="text-3xl font-bold text-slate-100 mb-4">거래소 통합 준비 중</h2>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
            KAUS Coin이 주요 거래소에 상장되면 실시간 가격, 차트, 오더북 데이터를 제공합니다.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-500/40 px-6 py-3 text-sm font-semibold text-purple-200">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
            2025 Q2 출시 예정
          </div>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/80 p-6 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Total Market Cap</p>
            <p className="text-3xl font-bold text-purple-400">$2.4T</p>
            <p className="text-sm text-emerald-400 mt-1">+5.2% 24h</p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-6 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">24h Volume</p>
            <p className="text-3xl font-bold text-cyan-400">$145B</p>
            <p className="text-sm text-emerald-400 mt-1">+12.8% 24h</p>
          </div>
          <div className="rounded-2xl border border-fuchsia-500/30 bg-slate-950/80 p-6 shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">BTC Dominance</p>
            <p className="text-3xl font-bold text-fuchsia-400">48.3%</p>
            <p className="text-sm text-slate-400 mt-1">-0.5% 24h</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/80 p-6 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Active Traders</p>
            <p className="text-3xl font-bold text-emerald-400">8.2K</p>
            <p className="text-sm text-emerald-400 mt-1">+18.3% 24h</p>
          </div>
        </div>

        {/* Market Table */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 overflow-hidden shadow-[0_0_30px_rgba(15,23,42,0.5)]">
          <div className="bg-slate-950/90 border-b border-slate-800/80 px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-100">실시간 시장 데이터</h2>
            <p className="text-sm text-slate-400 mt-1">주요 암호화폐 가격 및 거래량 정보</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-950/95">
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Pair</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-right">24h Change</th>
                  <th className="px-6 py-4 text-right">Volume</th>
                  <th className="px-6 py-4 text-right">24h High</th>
                  <th className="px-6 py-4 text-right">24h Low</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {marketData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-900/50 transition">
                    <td className="px-6 py-5">
                      <span className="font-mono text-sm font-semibold text-slate-100">{item.symbol}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="font-mono text-sm text-slate-200">${item.price.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className={`font-mono text-sm font-semibold ${item.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="font-mono text-sm text-slate-300">${item.volume}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="font-mono text-sm text-slate-400">${item.high.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="font-mono text-sm text-slate-400">${item.low.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">실시간 차트</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              TradingView 통합으로 전문가급 차트 분석 도구를 제공합니다. 캔들스틱, 라인, 영역 차트 등 다양한 차트 타입 지원.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">오더북 분석</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              실시간 매수/매도 주문을 시각화하여 시장 심리와 유동성을 파악할 수 있습니다. 대량 주문 알림 기능 포함.
            </p>
          </div>
          <div className="rounded-2xl border border-fuchsia-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">🔔</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">가격 알림</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              원하는 가격대에 도달하면 즉시 알림을 받을 수 있습니다. 이메일, 푸시, 텔레그램 등 다양한 알림 채널 지원.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
