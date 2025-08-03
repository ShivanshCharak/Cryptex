import { X } from 'lucide-react';

export default function FilterSidebar({setShowFilter,showFilter}:{setShowFilter:(show:boolean)=>void,showFilter:boolean}) {

  return (
    <div className={`
        bg-gray-900 text-white rounded-xl p-6 w-full max-w-xl shadow-lg
        absolute top-[25%] left-[30%] z-[20]
        transition-all duration-300 transform
        backdrop-blur-md
        ${showFilter ? "opacity-100 scale-100 " : "opacity-0 scale-90 "}
      `}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button className="text-white" onClick={()=>setShowFilter(false)}>
          <X size={20} />
        </button>
      </div>

      {/* Dropdown Filters */}
      <div className="space-y-4">
        <div className='flex justify-between'>
          <label className="block text-sm text-slate-400 mb-1">Chain</label>
          <select className=" text-sm w-[300px] bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer">
            <option className=''>All Chains</option>
            <option value="">Acala Ecosystems</option>
            <option value="">AChain Ecosystems</option>
            <option value="">AION Ecosystems</option>
          </select>
        </div>

        <div className='flex justify-between'>
          <label className="block text-sm text-slate-400 mb-1">Category</label>
          <select className=" text-sm w-[300px] bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer">
            <option>All Categories</option>
            <option className=''>All Chains</option>
            <option value="">Acala Ecosystems</option>
            <option value="">AChain Ecosystems</option>
            <option value="">AION Ecosystems</option>
          </select>
        </div>

        {/* Range Inputs */}
        {[
          { label: 'Market Cap', unit: '$' },
          { label: 'FDV', unit: '$' },
          { label: 'Price Change (24h)', unit: '%' },
          { label: 'Volume (24h)', unit: '$' },
        ].map(({ label, unit }, idx) => (
          <div key={idx} className='flex justify-between'>
            <label className="block text-sm text-slate-400 mb-1">{label}</label>
            <div className="flex gap-2 w-[300px] items-center">
              <div className="relative ">
                <input
                  placeholder="Min"
                  className=" text-sm bg-gray-800 text-white px-3 py-1 pr-5 w-[150px] rounded-lg"
                />
                <span className="absolute right-2 top-2 text-slate-400 text-sm">{unit}</span>
              </div>
              <div className="relative ">
                <input
                  placeholder="Max"
                  className=" focus:outline-none text-sm w-[150px] bg-gray-800 text-white px-3 py-1 pr-5 rounded-lg"
                />
                <span className="absolute right-2 top-2 text-slate-400 text-xs">{unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button className="text-blue-400 font-medium hover:underline">Reset</button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Apply
        </button>
      </div>
    </div>
  );
}
