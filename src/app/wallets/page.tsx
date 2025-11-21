import Link from "next/link";

export default function WalletsPage() {
  const wallets = [
    { name: "MetaMask Wallet", address: "0x742d...35A6", balance: "1,284.42 ETH", usdValue: "$2,931,008", chains: ["Ethereum", "Polygon", "BSC"] },
    { name: "Treasury Wallet", address: "0x4C9E...11B7", balance: "2,345,901 KAUS", usdValue: "$3,331,179", chains: ["Ethereum"] },
    { name: "Staking Vault", address: "0x7B02...C8D4", balance: "982,340 USDC", usdValue: "$982,340", chains: ["Ethereum", "Arbitrum"] },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
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
            <Link href="/wallets" className="text-sm text-purple-400 font-semibold">
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

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Wallet & Account Explorer
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            모든 지갑과 계정을 하나의 투명한 대시보드로 통합합니다. 멀티체인 자산을 실시간으로 추적하세요.
          </p>
        </div>

        {/* Total Balance Card */}
        <div className="mb-12 rounded-3xl border border-purple-500/50 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-8 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">Total Portfolio Value</p>
          <p className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            $7,244,527
          </p>
          <div className="flex items-center gap-4">
            <span className="text-lg text-emerald-400 font-semibold">+18.3% (24h)</span>
            <span className="text-sm text-slate-400">+$1,122,340</span>
          </div>
        </div>

        {/* Wallets Grid */}
        <div className="space-y-6">
          {wallets.map((wallet, index) => (
            <div key={index} className="rounded-2xl border border-slate-800/80 bg-slate-950/80 overflow-hidden shadow-[0_0_20px_rgba(15,23,42,0.4)] hover:border-purple-500/50 transition">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100 mb-1">{wallet.name}</h3>
                    <p className="font-mono text-sm text-slate-400">{wallet.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-400">{wallet.usdValue}</p>
                    <p className="text-sm text-slate-400 mt-1">{wallet.balance}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {wallet.chains.map((chain, idx) => (
                    <span key={idx} className="rounded-full bg-purple-500/20 border border-purple-500/40 px-3 py-1 text-xs text-purple-200">
                      {chain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">🔗</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">멀티체인 지원</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Ethereum, Polygon, BSC, Arbitrum 등 주요 블록체인의 자산을 하나의 대시보드에서 관리하세요.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">계정 세그먼트</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              지갑을 카테고리별로 분류하고 각각의 성과를 추적합니다. 개인, 비즈니스, DeFi 등으로 구분 가능.
            </p>
          </div>
          <div className="rounded-2xl border border-fuchsia-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">보안 & 프라이버시</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              모든 데이터는 암호화되어 저장되며, 지갑 주소는 익명화하여 표시됩니다. 완전한 프라이버시 보장.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
