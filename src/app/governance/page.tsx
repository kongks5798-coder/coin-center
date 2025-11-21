import Link from "next/link";

export default function GovernancePage() {
  const proposals = [
    { id: 1, title: "Increase Staking Rewards by 15%", status: "Active", votes: "2.4M KAUS", support: 78, endDate: "3 days" },
    { id: 2, title: "Launch on Arbitrum Network", status: "Active", votes: "1.8M KAUS", support: 92, endDate: "5 days" },
    { id: 3, title: "Allocate $500K for Marketing", status: "Passed", votes: "3.1M KAUS", support: 84, endDate: "Ended" },
    { id: 4, title: "Update Token Economics Model", status: "Discussion", votes: "0.5M KAUS", support: 45, endDate: "12 days" },
  ];

  const topVoters = [
    { address: "0xA3F9...9F21", power: "842,000 KAUS", votes: 24, participation: "96%" },
    { address: "0x7B02...C8D4", power: "620,000 KAUS", votes: 22, participation: "88%" },
    { address: "0x4C9E...11B7", power: "510,000 KAUS", votes: 20, participation: "80%" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02010a] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-fuchsia-600/30 blur-3xl" />
        <div className="absolute top-48 -right-16 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl" />
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
            <Link href="/governance" className="text-sm text-purple-400 font-semibold">
              Governance
            </Link>
            <Link href="/activity" className="text-sm text-slate-400 hover:text-purple-400 transition">
              Activity
            </Link>
          </nav>
        </header>

        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-fuchsia-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Governance & Voting
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            커뮤니티가 프로젝트의 미래를 결정합니다. 투표권 분배와 제안 진행 상황을 실시간으로 확인하세요.
          </p>
        </div>

        {/* Governance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="rounded-2xl border border-fuchsia-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Total Voting Power</p>
            <p className="text-3xl font-bold text-fuchsia-400">8.2M KAUS</p>
            <p className="text-sm text-slate-400 mt-1">Across all holders</p>
          </div>
          <div className="rounded-2xl border border-violet-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Active Proposals</p>
            <p className="text-3xl font-bold text-violet-400">4</p>
            <p className="text-sm text-emerald-400 mt-1">2 ending soon</p>
          </div>
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Participation Rate</p>
            <p className="text-3xl font-bold text-purple-400">64%</p>
            <p className="text-sm text-emerald-400 mt-1">+8% this month</p>
          </div>
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-6">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Proposals Passed</p>
            <p className="text-3xl font-bold text-cyan-400">18</p>
            <p className="text-sm text-slate-400 mt-1">This quarter</p>
          </div>
        </div>

        {/* Proposals */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 overflow-hidden shadow-[0_0_30px_rgba(15,23,42,0.5)] mb-12">
          <div className="bg-slate-950/90 border-b border-slate-800/80 px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-100">활성 제안</h2>
            <p className="text-sm text-slate-400 mt-1">커뮤니티 투표가 진행 중인 제안들</p>
          </div>
          
          <div className="divide-y divide-slate-800/50">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="p-6 hover:bg-slate-900/50 transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-100">{proposal.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        proposal.status === 'Active' ? 'bg-cyan-500/20 text-cyan-300' :
                        proposal.status === 'Passed' ? 'bg-emerald-500/20 text-emerald-300' :
                        'bg-amber-500/20 text-amber-300'
                      }`}>
                        {proposal.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">Total votes: {proposal.votes}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-fuchsia-400">{proposal.support}%</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Support</p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="bg-slate-800/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-fuchsia-500 to-violet-500 h-full rounded-full transition-all"
                      style={{ width: `${proposal.support}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Ends in: {proposal.endDate}</span>
                  <button className="text-fuchsia-400 hover:text-fuchsia-300 font-semibold">
                    Vote Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Voters */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Top Voters</h3>
            <div className="space-y-4">
              {topVoters.map((voter, index) => (
                <div key={index} className="rounded-xl border border-slate-800/60 bg-slate-900/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-slate-200">{voter.address}</span>
                    <span className="text-sm font-semibold text-fuchsia-400">{voter.power}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>{voter.votes} votes cast</span>
                    <span>•</span>
                    <span className="text-emerald-400">{voter.participation} participation</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Voting Power Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Top 10 Holders</span>
                  <span className="text-sm font-semibold text-slate-200">38%</span>
                </div>
                <div className="bg-slate-800/50 rounded-full h-3">
                  <div className="bg-fuchsia-500 h-full rounded-full" style={{ width: '38%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Community (11-100)</span>
                  <span className="text-sm font-semibold text-slate-200">42%</span>
                </div>
                <div className="bg-slate-800/50 rounded-full h-3">
                  <div className="bg-violet-500 h-full rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">Long Tail (100+)</span>
                  <span className="text-sm font-semibold text-slate-200">20%</span>
                </div>
                <div className="bg-slate-800/50 rounded-full h-3">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-fuchsia-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">🗳️</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">온체인 투표</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              모든 투표는 스마트 컨트랙트로 처리되어 조작이 불가능합니다. 투명하고 공정한 의사결정 시스템.
            </p>
          </div>
          <div className="rounded-2xl border border-violet-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">토론 포럼</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              제안 전에 커뮤니티와 충분히 논의하세요. Discord, Forum, Snapshot 등 다양한 채널 지원.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-500/30 bg-slate-950/70 p-6">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">즉시 집행</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              통과된 제안은 자동으로 집행됩니다. Timelock과 멀티시그로 보안을 강화하여 안전하게 실행.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
