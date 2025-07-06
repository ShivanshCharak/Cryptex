'use client'

import {
  Undo2, Redo2, Camera, Settings, RefreshCw, Expand, LineChart, Wand
} from 'lucide-react'

export default function TopToolbar() {
  return (
    <div className="bg-inherit text-white px-4 py-2 flex items-center justify-between text-sm border-b border-neutral-800">
      {/* Left Toolbar */}
      <div className="flex items-center space-x-4">
        {/* Time Interval */}
        <span className="relative group cursor-help">
          1h
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Time interval
          </div>
        </span>

        <Divider />

        {/* Line Chart */}
        <div className="relative group cursor-help">
          <LineChart className="w-4 h-4" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Chart Type
          </div>
        </div>

        <Divider />

        {/* Indicators */}
        <div className="relative group flex items-center space-x-1 cursor-help">
          <Wand className="w-4 h-4" />
          <span>Indicators</span>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Technical Indicators
          </div>
        </div>

        <Divider />

        {/* OL */}
        <span className="relative group cursor-help text-blue-400">
          OL
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Order Lines
          </div>
        </span>

        <Divider />

        {/* TE */}
        <span className="relative group cursor-help text-blue-400">
          TE
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Trade Execution
          </div>
        </span>

        <Divider />

        {/* Undo */}
        <div className="relative group cursor-help">
          <Undo2 className="w-4 h-4 opacity-50" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Undo
          </div>
        </div>

        {/* Redo */}
        <div className="relative group cursor-help">
          <Redo2 className="w-4 h-4 opacity-50" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Redo
          </div>
        </div>
      </div>

      {/* Right Toolbar */}
      <div className="flex items-center space-x-4">
        <Divider />

        {/* Refresh */}
        <div className="relative group cursor-help">
          <RefreshCw className="w-4 h-4" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Refresh Chart
          </div>
        </div>

        <Divider />

        {/* Settings */}
        <div className="relative group cursor-help">
          <Settings className="w-4 h-4" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Settings
          </div>
        </div>

        <Divider />

        {/* Expand */}
        <div className="relative group cursor-help">
          <Expand className="w-4 h-4" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Fullscreen
          </div>
        </div>

        <Divider />

        {/* Screenshot */}
        <div className="relative group cursor-help">
          <Camera className="w-4 h-4" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Take Screenshot
          </div>
        </div>

        <Divider />

        {/* Reset */}
        <span className="relative group cursor-help">
          Reset
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 
            bg-gray-800 text-white text-xs px-2 py-1 rounded 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
            Reset Chart
          </div>
        </span>
      </div>
    </div>
  )
}

// Divider helper
function Divider() {
  return <div className="h-6 w-[1px] bg-gray-600" />;
}
