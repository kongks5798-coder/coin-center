import Link from "next/link";

const featureCategories = [
  {
    key: "market",
    title: "Live Market Radar",
    badge: "Realtime",
    description:
      "Stream prices, volumes and volatility for every supported coin in one unified view.",
    href: "/market",
    accent: "from-purple-500/40 via-fuchsia-500/30 to-cyan-400/40",
  },
  {
    key: "wallets",
    title: "Wallet & Account Explorer",
    badge: "Transparent",
    description:
      "Drill down into anonymized wallets, balances and flows to see exactly where coins are sitting.",
    href: "/wallets",
    accent: "from-cyan-500/40 via-sky-500/30 to-purple-400/40",
  },
  {
    key: "yield",
    title: "Yield & Profit Dashboard",
    badge: "Revenue",
    description:
      "Visualize how yield is generated, how rewards are distributed and which pools drive profit.",
    href: "/yield",
    accent: "from-emerald-500/40 via-teal-400/30 to-cyan-400/40",
  },
  {
    key: "treasury",
    title: "Treasury & Reserves",
    badge: "On‑chain",
    description:
      "Track protocol treasuries, runway, collateral and reserves with full on‑chain transparency.",
    href: "/treasury",
    accent: "from-indigo-500/40 via-purple-500/30 to-fuchsia-400/40",
  },
  {
    key: "governance",
    title: "Governance & Voting",
    badge: "Community",
    description:
      "See who is voting, how power is distributed and what proposals are driving your roadmap.",
    href: "/governance",
    accent: "from-fuchsia-500/40 via-violet-500/30 to-sky-400/40",
  },
  {
    key: "activity",
    title: "Live Activity Feed",
    badge: "Streaming",
    description:
      "Watch large transfers, liquidations and whale movements as they happen across the network.",
    href: "/activity",
    accent: "from-amber-400/40 via-rose-500/30 to-purple-500/40",
  },
];

const transparencyRows = [
  {
    address: "0xA3F9...9F21",
    label: "Market Maker Node",
    balance: 1284.42,
    coin: "ETH",
    pnl24h: 12.4,
    pnlTotal: 231.8,
  },
  {
    address: "0x7B02...C8D4",
    label: "Yield Vault Pool #1",
    balance: 982_340.12,
    coin: "USDC",
    pnl24h: 3.1,
    pnlTotal: 48.3,
  },
  {
    address: "0x4C9E...11B7",
    label: "Treasury Multisig",
    balance: 2_345_901.55,
    coin: "KAUS",
    pnl24h: 0.7,
    pnlTotal: 114.9,
  },
  {
    address: "0xD1AA...7E09",
    label: "Top Community Wallet",
    balance: 74_210.33,
    coin: "KAUS",
    pnl24h: -1.9,
    pnlTotal: 26.4,
  },
  {
    address: "0x89F0...AA3C",
    label: "Arb Bot Strategy",
    balance: 412.78,
    coin: "ETH",
    pnl24h: 8.6,
    pnlTotal: 163.2,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      {/* Neon background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute inset-x-0 bottom-[-20rem] mx-auto h-96 w-[40rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent opacity-70" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12 lg:px-8">
        <div className="w-full space-y-16">
          {/* HEADER */}
          <header className="flex items-center justify-between border-b border-purple-500/20 pb-6">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all group-hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]">
                <span className="text-lg font-bold text-white">KC</span>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  KAUS
                </h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Control Center</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/market" className="text-sm text-slate-400 hover:text-purple-400 transition">
                Market
              </Link>
              <Link href="/about" className="text-sm text-slate-400 hover:text-purple-400 transition">
                About
              </Link>
              <Link href="/wallets" className="text-sm text-slate-400 hover:text-purple-400 transition">
                Wallets
              </Link>
              <Link href="/yield" className="text-sm text-slate-400 hover:text-purple-400 transition">
                Yield
              </Link>
              <Link href="/roadmap" className="text-sm text-slate-400 hover:text-purple-400 transition">
                Roadmap
              </Link>
              <Link href="/faq" className="text-sm text-slate-400 hover:text-purple-400 transition">
                FAQ
              </Link>
            </nav>

            <button className="rounded-full border border-purple-500/80 bg-purple-500/20 px-6 py-2 text-xs font-semibold text-purple-50 shadow-[0_0_20px_rgba(168,85,247,0.6)] transition hover:bg-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]">
              Connect Wallet
            </button>
          </header>

          {/* HERO */}
          <section className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/50 bg-purple-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-purple-100 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_14px_rgba(216,180,254,1)]" />
              <span>Futuristic crypto control room</span>
            </div>

            <h1 className="mt-6 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-5xl font-semibold leading-tight tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              NEXUS The Field Nine
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300/90 sm:text-base">
              The home base for your coins. Monitor markets, wallets and
              on‑chain activity in real time with full transparency.
            </p>
            <p className="mx-auto mt-1 max-w-2xl text-xs text-slate-400 sm:text-sm">
              See how profits are generated, which accounts hold which amounts,
              and how every token in the system is moving.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-purple-500/80 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_40px_rgba(168,85,247,0.9)] transition-transform duration-150 hover:scale-105 hover:shadow-[0_0_65px_rgba(34,211,238,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
                <span>Connect Wallet</span>
                <span
                  aria-hidden
                  className="translate-x-0 text-sm transition-transform group-hover:translate-x-1"
                >
                  ↗
                </span>
              </button>

              <Link
                href="/market"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900/40 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-100/90 backdrop-blur transition hover:border-cyan-400/80 hover:bg-slate-900/80 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span>View Market</span>
                <span aria-hidden className="text-sm">
                  ▶
                </span>
              </Link>
            </div>
          </section>

          {/* VISION SECTION - 공급망 추적 & 정품인증 */}
          <section className="mb-16 rounded-3xl border border-indigo-500/50 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-950 p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 border border-indigo-500/40 px-4 py-2 text-xs font-semibold text-indigo-200 mb-4">
                <span>🌐</span>
                <span>KAUS Coin의 핵심 비전</span>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                글로벌 상품 추적 & 정품인증 플랫폼
              </h2>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                블록체인 기술로 전 세계 모든 상품의 유통 과정을 투명하게 추적하고, 정품을 보증합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="rounded-2xl border border-indigo-500/30 bg-slate-950/70 p-6">
                <div className="text-4xl mb-4">👗</div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">패션 & 럭셔리</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">
                  의류, 화장품, 악세사리, 명품 가방까지 모든 패션 아이템의 정품을 보증합니다.
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• NFC 태그 내장 정품 인증</li>
                  <li>• 원산지부터 소비자까지 추적</li>
                  <li>• 위조품 실시간 차단</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-6">
                <div className="text-4xl mb-4">🍎</div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">식품 안전</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">
                  농산물, 가공식품, 건강기능식품의 생산부터 유통까지 완벽하게 기록합니다.
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• 온도/습도 센서 연동</li>
                  <li>• 유기농 인증 검증</li>
                  <li>• 유통기한 자동 알림</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/70 p-6">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">글로벌 유통</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-3">
                  전자제품, 의약품, 모든 상품의 국제 물류를 실시간으로 추적합니다.
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• 관세 자동 처리</li>
                  <li>• 운송 경로 실시간 확인</li>
                  <li>• 스마트 계약 자동 실행</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6">
                <h3 className="text-lg font-semibold text-indigo-400 mb-4 flex items-center gap-2">
                  <span>✨</span>
                  <span>핵심 기술</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 font-mono">01</span>
                    <div>
                      <p className="text-slate-200 font-medium">QR/NFC 통합 인증</p>
                      <p className="text-slate-500 text-xs">각 상품마다 고유한 블록체인 ID 부여</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 font-mono">02</span>
                    <div>
                      <p className="text-slate-200 font-medium">AI 위조품 탐지</p>
                      <p className="text-slate-500 text-xs">이미지 분석으로 가짜 상품 자동 차단</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 font-mono">03</span>
                    <div>
                      <p className="text-slate-200 font-medium">크로스체인 지원</p>
                      <p className="text-slate-500 text-xs">Ethereum, Polygon, BSC 모두 호환</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6">
                <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
                  <span>🎁</span>
                  <span>소비자 혜택</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-fuchsia-400 font-mono">01</span>
                    <div>
                      <p className="text-slate-200 font-medium">QR 스캔 리워드</p>
                      <p className="text-slate-500 text-xs">정품 확인 시 KAUS 토큰 적립</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-fuchsia-400 font-mono">02</span>
                    <div>
                      <p className="text-slate-200 font-medium">리뷰 작성 보상</p>
                      <p className="text-slate-500 text-xs">검증된 구매자 리뷰에 추가 보상</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-fuchsia-400 font-mono">03</span>
                    <div>
                      <p className="text-slate-200 font-medium">NFT 한정판</p>
                      <p className="text-slate-500 text-xs">희귀 상품은 NFT로 소유권 증명</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/about" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.6)] transition hover:shadow-[0_0_50px_rgba(99,102,241,0.8)]">
                <span>자세히 알아보기</span>
                <span>→</span>
              </Link>
            </div>
          </section>

          {/* MAIN GRID */}
          <section className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            {/* FEATURE CATEGORIES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Coin function categories
                </h2>
                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[10px] font-medium text-slate-300">
                  Click a module to dive in
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {featureCategories.map((feature) => (
                  <Link
                    key={feature.key}
                    href={feature.href}
                    className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70 px-4 py-4 shadow-[0_0_0_1px_rgba(15,23,42,0.9)] transition hover:-translate-y-1 hover:border-purple-500/80 hover:shadow-[0_0_28px_rgba(129,140,248,0.7)]"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.accent}`}
                      />
                    </div>

                    <div className="relative z-10 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold text-slate-50">
                          {feature.title}
                        </h3>
                        {feature.badge && (
                          <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-medium text-slate-100">
                            {feature.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs leading-relaxed text-slate-300/90">
                        {feature.description}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <span>Open module</span>
                        <span
                          aria-hidden
                          className="transition-transform group-hover:translate-x-1"
                        >
                          ⟶
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* TRANSPARENCY PANEL */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Transparent account snapshot
                </h2>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-200">
                  Demo data
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-[0_0_0_1px_rgba(15,23,42,0.9)]">
                <div className="border-b border-slate-800/80 bg-slate-950/90 px-4 py-3 text-[11px] text-slate-300">
                  See how different accounts hold coins, how profits are
                  changing and how the system is running — all in one look.
                </div>

                <div className="max-h-72 overflow-y-auto">
                  <table className="min-w-full border-separate border-spacing-y-1 px-2 py-2 text-left text-[11px]">
                    <thead className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur">
                      <tr className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        <th className="px-4 py-2">Account</th>
                        <th className="px-3 py-2 text-right">Coins</th>
                        <th className="px-3 py-2 text-right">24h PnL</th>
                        <th className="px-3 py-2 text-right">Total PnL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transparencyRows.map((row) => (
                        <tr key={row.address} className="align-middle">
                          <td className="px-4 py-2">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-mono text-[11px] text-slate-200">
                                {row.address}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {row.label}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-2 text-right">
                            <span className="font-mono text-[11px] text-slate-100">
                              {row.balance.toLocaleString("en-US", {
                                maximumFractionDigits: 2,
                              })}{" "}
                              {row.coin}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-right">
                            <span
                              className={`font-mono text-[11px] ${
                                row.pnl24h >= 0
                                  ? "text-emerald-400"
                                  : "text-rose-400"
                              }`}
                            >
                              {row.pnl24h >= 0 ? "+" : ""}
                              {row.pnl24h.toFixed(2)}%
                            </span>
                          </td>
                          <td className="px-3 py-2 text-right">
                            <span
                              className={`font-mono text-[11px] ${
                                row.pnlTotal >= 0
                                  ? "text-emerald-400"
                                  : "text-rose-400"
                              }`}
                            >
                              {row.pnlTotal >= 0 ? "+" : ""}
                              {row.pnlTotal.toFixed(2)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-slate-800/80 px-4 py-2 text-[10px] text-slate-500">
                  In the real platform, every module can expose similar views so
                  users can verify balances, flows and profit generation in real
                  time.
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-slate-800/50 pt-12 pb-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500">
                  <span className="text-sm font-bold text-white">KC</span>
                </div>
                <span className="text-lg font-bold text-slate-100">KAUS</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                완전한 투명성과 탈중앙화를 추구하는 차세대 DeFi 플랫폼
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/market" className="text-slate-400 hover:text-purple-400 transition">Market</Link></li>
                <li><Link href="/wallets" className="text-slate-400 hover:text-purple-400 transition">Wallets</Link></li>
                <li><Link href="/yield" className="text-slate-400 hover:text-purple-400 transition">Yield</Link></li>
                <li><Link href="/treasury" className="text-slate-400 hover:text-purple-400 transition">Treasury</Link></li>
                <li><Link href="/governance" className="text-slate-400 hover:text-purple-400 transition">Governance</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-slate-400 hover:text-purple-400 transition">About</Link></li>
                <li><Link href="/roadmap" className="text-slate-400 hover:text-purple-400 transition">Roadmap</Link></li>
                <li><Link href="/faq" className="text-slate-400 hover:text-purple-400 transition">FAQ</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-purple-400 transition">Whitepaper</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-purple-400 transition">Documentation</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-purple-400 transition">GitHub</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition">Discord</a></li>
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition">Telegram</a></li>
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition">Twitter</a></li>
                <li><a href="#" className="text-slate-400 hover:text-purple-400 transition">Medium</a></li>
                <li><a href="mailto:support@kaus.io" className="text-slate-400 hover:text-purple-400 transition">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} KAUS Coin. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-slate-300 transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-300 transition">Terms of Service</Link>
              <Link href="#" className="hover:text-slate-300 transition">Cookie Policy</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

