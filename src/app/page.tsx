import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.6em] text-gray-400">
          Web3 Gateway
        </p>
        <h1 className="text-5xl font-black text-[#00FF94] drop-shadow-[0_0_24px_rgba(0,255,148,0.8)] sm:text-6xl">
          KAUS TRINITY
        </h1>
        <p className="max-w-2xl text-base text-gray-200 sm:text-lg">
          Connect your wallet to unlock the KAUS TRINITY multiverse and begin
          your on-chain journey.
        </p>
        <div className="flex justify-center">
          <div className="scale-[1.2] transform">
            <ConnectButton />
          </div>
        </div>
      </div>
    </main>
  );
}
