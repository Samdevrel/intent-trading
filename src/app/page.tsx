'use client';

import { useState } from 'react';

interface Intent {
  id: string;
  type: 'swap' | 'limit' | 'twap' | 'dca';
  tokenIn: string;
      <header className="border-b-4 border-purple-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black">App</h1>
              <p className="text-gray-400 mt-2">Interactive demo</p>
            </div>
            <nav className="flex gap-2">
              <a href="/" className="px-4 py-2 bg-gray-800 border-2 border-gray-600 hover:border-purple-400 rounded font-bold transition-all">
                Home
              </a>
              <a href="/docs" className="px-4 py-2 bg-purple-500 border-2 border-purple-400 rounded font-bold transition-all">
                Documentation
              </a>
            </nav>
          </div>
        </div>
      </header>


  tokenOut: string;
  amountIn: number;
  minAmountOut: number;
  status: 'pending' | 'solving' | 'filled' | 'expired';
  solver?: string;
  savedMEV?: number;
  gasSaved?: number;
}

interface Solver {
  name: string;
  address: string;
  reputation: number;
  totalVolume: string;
  fillRate: number;
}

const intents: Intent[] = [
  {
    id: 'INT-001',
    type: 'swap',
    tokenIn: 'ETH',
    tokenOut: 'USDC',
    amountIn: 5,
    minAmountOut: 9500,
    status: 'filled',
    solver: 'Wintermute',
    savedMEV: 12.5,
    gasSaved: 0.008,
  },
  {
    id: 'INT-002',
    type: 'limit',
    tokenIn: 'USDC',
    tokenOut: 'ETH',
    amountIn: 10000,
    minAmountOut: 5.3,
    status: 'solving',
  },
  {
    id: 'INT-003',
    type: 'twap',
    tokenIn: 'WBTC',
    tokenOut: 'ETH',
    amountIn: 2,
    minAmountOut: 65,
    status: 'pending',
  },
  {
    id: 'INT-004',
    type: 'dca',
    tokenIn: 'ETH',
    tokenOut: 'UNI',
    amountIn: 1,
    minAmountOut: 420,
    status: 'expired',
  },
];

const solvers: Solver[] = [
  { name: 'Wintermute', address: '0x7a...9f2e', reputation: 98, totalVolume: '$2.4B', fillRate: 99.2 },
  { name: 'Propeller', address: '0x3c...1d4a', reputation: 96, totalVolume: '$1.8B', fillRate: 98.5 },
  { name: '1inch Resolver', address: '0x5f...7a8b', reputation: 95, totalVolume: '$1.2B', fillRate: 97.8 },
  { name: 'CoW Solver', address: '0x2a...9c1d', reputation: 94, totalVolume: '$890M', fillRate: 96.4 },
];

export default function Home() {
  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitIntent = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-green-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">Intent Trading</h1>
          <p className="text-gray-400 mt-2">Declare outcomes, let solvers compete — MEV-protected swaps</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-green-400 p-4 text-center">
            <div className="text-3xl font-black text-green-400">$150B+</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">12</div>
            <div className="text-sm text-gray-400">Active Solvers</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black text-yellow-400">$45M</div>
            <div className="text-sm text-gray-400">MEV Saved</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">98.5%</div>
            <div className="text-sm text-gray-400">Fill Rate</div>
          </div>
        </section>

        {/* Submit Intent */}
        <button
          onClick={submitIntent}
          disabled={isSubmitting}
          className="w-full py-4 bg-green-500 text-white font-bold border-4 border-green-400 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
        >
          {isSubmitting ? 'Submitting Intent to Solvers...' : 'Submit New Intent'}
        </button>

        {/* Intents */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Recent Intents</h2>
          <div className="space-y-4">
            {intents.map((intent) => (
              <div
                key={intent.id}
                onClick={() => setSelectedIntent(intent)}
                className={`p-4 border-4 cursor-pointer transition-all ${
                  selectedIntent?.id === intent.id
                    ? 'bg-green-900/30 border-green-400'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs text-gray-400">{intent.id}</span>
                    <h3 className="font-bold text-green-400">
                      {intent.amountIn} {intent.tokenIn} → {intent.tokenOut}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 text-xs font-bold ${
                      intent.type === 'swap' ? 'bg-blue-900 text-blue-400' :
                      intent.type === 'limit' ? 'bg-purple-900 text-purple-400' :
                      intent.type === 'twap' ? 'bg-orange-900 text-orange-400' :
                      'bg-pink-900 text-pink-400'
                    }`}>
                      {intent.type.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 text-xs font-bold ${
                      intent.status === 'filled' ? 'bg-green-900 text-green-400' :
                      intent.status === 'solving' ? 'bg-yellow-900 text-yellow-400' :
                      intent.status === 'pending' ? 'bg-blue-900 text-blue-400' :
                      'bg-red-900 text-red-400'
                    }`}>
                      {intent.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                  <div>
                    <div className="text-gray-500">Min Output</div>
                    <div className="font-bold text-white">{intent.minAmountOut.toLocaleString()} {intent.tokenOut}</div>
                  </div>
                  {intent.solver && (
                    <div>
                      <div className="text-gray-500">Filled by</div>
                      <div className="font-bold text-green-400">{intent.solver}</div>
                    </div>
                  )}
                  {intent.savedMEV && (
                    <div>
                      <div className="text-gray-500">MEV Saved</div>
                      <div className="font-bold text-yellow-400">${intent.savedMEV}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Intent */}
        {selectedIntent && (
          <section className="bg-gray-900 border-4 border-green-400 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-black text-green-400">Intent Details</h2>
                <p className="text-sm text-gray-400">{selectedIntent.id}</p>
              </div>
              <button
                onClick={() => setSelectedIntent(null)}
                className="px-4 py-2 bg-gray-700 text-white font-bold border-2 border-gray-600 hover:bg-gray-600"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400">Type</div>
                <div className="font-bold">{selectedIntent.type.toUpperCase()}</div>
              </div>
              <div className="p-3 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400">Input</div>
                <div className="font-bold">{selectedIntent.amountIn} {selectedIntent.tokenIn}</div>
              </div>
              <div className="p-3 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400">Min Output</div>
                <div className="font-bold">{selectedIntent.minAmountOut} {selectedIntent.tokenOut}</div>
              </div>
              <div className="p-3 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400">Status</div>
                <div className="font-bold text-green-400">{selectedIntent.status.toUpperCase()}</div>
              </div>
            </div>
          </section>
        )}

        {/* Solver Leaderboard */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Top Solvers</h2>
          <div className="space-y-2">
            {solvers.map((solver, i) => (
              <div key={solver.address} className="p-3 bg-gray-800 border border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-gray-500">#{i + 1}</span>
                  <div>
                    <span className="font-bold text-green-400">{solver.name}</span>
                    <span className="ml-2 text-xs text-gray-400 font-mono">{solver.address}</span>
                  </div>
                </div>
                <div className="flex gap-4 text-right">
                  <div>
                    <div className="text-xs text-gray-500">Volume</div>
                    <div className="font-bold">{solver.totalVolume}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Fill Rate</div>
                    <div className="font-bold text-green-400">{solver.fillRate}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Rep</div>
                    <div className="font-bold">{solver.reputation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How Intent Trading Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Declare Intent</h3>
              <p className="text-xs text-gray-400">Specify desired outcome, not execution path</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Solvers Compete</h3>
              <p className="text-xs text-gray-400">Professional solvers bid to fill your intent</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-purple-400 mb-2">Batch Auction</h3>
              <p className="text-xs text-gray-400">Intents batched for MEV protection</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">Best Execution</h3>
              <p className="text-xs text-gray-400">You get better price, solver earns fee</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-green-400 hover:underline">@samdevrel</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
