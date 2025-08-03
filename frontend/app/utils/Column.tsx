import { X, RefreshCcw } from 'lucide-react';
import { useState } from 'react';

const allMetrics = {
  Price: ['Price in BTC', 'Price in ETH', 'ATH', 'ATL', '24h high', '24h low', 'From ATH', 'From ATL'],
  'Price Change': ['1h %', '24h %', '7d %', '30d %', '60d %', '90d %', 'YTD %', '1h% in BTC', '24h% in BTC', '1h% in ETH', '24h% in ETH'],
  'Market Cap': ['Market Cap', 'Fully Diluted Mcap'],
  Volume: ['Volume(24h)', 'Volume(7d)', 'Volume(30d)', 'Volume / Mcap'],
  Supply: ['Circulating Supply', 'Total Supply', 'Max Supply'],
  Charts: ['24h Chart', '7d Chart', '30d Chart', '60d Chart', '90d Chart'],
  Others: ['Audited', 'Dominance %', 'Total Value Locked']
};

export default function MetricsSelector({showColumn, setShowColumn}:{showColumn:boolean, setShowColumn:(column:boolean)=>void}) {
  const [selected, setSelected] = useState(['1h %', '24h %', '7d %', 'Market Cap', 'Volume(24h)', 'Circulating Supply', '7d Chart']);

  const toggleMetric = (metric:string) => {
    setSelected((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : prev.length < 12
        ? [...prev, metric]
        : prev
    );
  };

  const isSelected = (metric:string) => selected.includes(metric);

  return (
    <div className={` bg-gray-900 text-white rounded-xl p-6 w-full max-w-xl shadow-lg
        absolute top-[10%] left-[30%] z-[20]
        transition-all duration-300 transform
        backdrop-blur-md
        ${showColumn ? "opacity-100 scale-100 " : "opacity-0 scale-90 "}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold">Choose up to <span className="text-blue-400">{selected.length}/12</span> metrics</h2>
          <p className="text-sm text-slate-400">Add, delete and sort metrics just how you need it</p>
        </div>
        <button className="text-white">
          <X size={20} />
        </button>
      </div>

      {/* Layout Mode */}
      <div className="flex items-center justify-between mb-4">
        <select className="bg-gray-800 px-4 py-2 rounded text-white text-sm">
          <option>Classic</option>
        </select>
        <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <RefreshCcw size={16} />
          Restart
        </button>
      </div>

      {/* Selected Metrics Display */}
      <div className="flex flex-wrap gap-2 bg-gray-800 rounded p-4 mb-6">
        {selected.map((metric, idx) => (
          <div
            key={metric}
            className="bg-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            <span className="text-xs">{idx + 1}</span> {metric}
            <button onClick={() => toggleMetric(metric)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Metrics Categories */}
      <div className="space-y-6">
        {Object.entries(allMetrics).map(([category, metrics]) => (
          <div key={category}>
            <h3 className="text-sm text-slate-400 mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {metrics.map((metric) => (
                <button
                  key={metric}
                  onClick={() => (toggleMetric(metric))}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isSelected(metric)
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-800 text-slate-300 hover:bg-gray-700'
                  }`}
                >
                  {metric}
                  {isSelected(metric) && (
                      <X size={12} className="inline ml-1 mb-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="text-white hover:underline">Cancel</button>
        <button className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700`} onClick={()=>setShowColumn(false)} >
          Apply Changes
        </button>
      </div>
    </div>
  );
}
