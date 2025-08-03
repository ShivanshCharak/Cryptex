export default function Loading() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  export function ChartLoading(){
    return(<div className="w-full  justify-center flex flex-col mb-5 items-center h-[60%]">
 <div className="w-6 h-6 border-2 border-[#0e0f14] border-t-blue-500 rounded-full animate-spin mb-5"></div>
      <h1>Getting Depth</h1>
      <span className="text-slate-500">Please wait a moment</span>

    </div>)
  }

