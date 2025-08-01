import {
    Flame,
    Calendar,
    Clock,
    TrendingUp,
    Plus,
    Eye,
    BarChart2,
    Users,
    PieChart,
    LineChart,
    Zap,
    DollarSign,
    Globe,
    Star,
    CircleDollarSign,
  } from 'lucide-react';
  
  const menuItems = [
    {
      title: 'Cryptocurrencies',
      items: [
        { label: 'Ranking', icon: <BarChart2 size={16} className="text-blue-400" /> },
        { label: 'Categories', icon: <Star size={16} className="text-blue-400" /> },
        { label: 'Historical Snapshots', icon: <Clock size={16} className="text-yellow-400" /> },
        { label: 'Token unlocks', icon: <DollarSign size={16} className="text-green-400" /> },
        { label: 'Yield', icon: <Zap size={16} className="text-blue-400" /> },
      ],
    },
    {
      title: 'Leaderboards',
      items: [
        { label: 'Trending', icon: <Flame size={16} className="text-red-400" /> },
        { label: 'Upcoming', icon: <Calendar size={16} className="text-purple-400" /> },
        { label: 'Recently Added', icon: <Plus size={16} className="text-blue-400" /> },
        { label: 'Gainers & Losers', icon: <TrendingUp size={16} className="text-green-400" /> },
        { label: 'Most Visited', icon: <Eye size={16} className="text-blue-400" /> },
        { label: 'Community Sentiment', icon: <Users size={16} className="text-blue-400" /> },
        { label: 'Chain Ranking', icon: <PieChart size={16} className="text-orange-400" /> },
      ],
    },
    {
      title: 'Market Overview',
      items: [
        { label: 'Market Overview', icon: <Globe size={16} className="text-purple-400" /> },
        { label: 'CoinMarketCap 100 Index', icon: <CircleDollarSign size={16} className="text-blue-400" /> },
        { label: 'Fear and Greed Index', icon: <Flame size={16} className="text-orange-400" /> },
        { label: 'Altcoin Season Index', icon: <LineChart size={16} className="text-cyan-400" /> },
        { label: 'Bitcoin Dominance', icon: <DollarSign size={16} className="text-yellow-400" /> },
        { label: 'Crypto ETFs', icon: <PieChart size={16} className="text-purple-400" /> },
      ],
    },
    {
      title: 'NFT',
      items: [
        { label: 'Overall NFT Stats', icon: <CircleDollarSign size={16} className="text-blue-400" /> },
        { label: 'Upcoming Sales', icon: <Calendar size={16} className="text-green-400" /> },
      ],
    },
  ];
  
  export default function MegaMenu({showDexScan}:{showDexScan:boolean}) {
    return (<>
    {
        showDexScan&&(
            <>
            <div className=" absolute w-0 h-0 border-l-[20px] top-7 border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-[#111827]"></div>
                <div className="flex bg-gray-900 text-white rounded-xl p-6 shadow-lg gap-10  absolute top-10 left-[-20px]">
                    {menuItems.map((section) => (
                    <div key={section.title} className="min-w-[180px]">
                        <h3 className="text-sm text-slate-400 font-medium mb-4">{section.title}</h3>
                        <ul className="space-y-3">
                        {section.items.map((item) => (
                            <li key={item.label} className="flex items-center gap-3 hover:text-white cursor-pointer text-slate-300">
                            {item.icon}
                            <span className="text-sm">{item.label}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                    ))}
                </div>
            </>
        )
    }
    </>
    );
  }
  