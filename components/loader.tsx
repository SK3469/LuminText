import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <div className="relative flex justify-center items-center w-20 h-20">
        <div className="absolute w-full h-full border-4 border-purple-600 rounded-full animate-ping"></div>
        <div className="absolute w-16 h-16 border-4 border-violet-600 rounded-full animate-spin"></div>
        <Loader2 className="w-10 h-10 text-white animate-pulse" />
      </div>
      <p className="text-white mt-4 text-lg font-semibold">Loading Dashboard</p>
      <p className="text-gray-400 mt-2 text-sm italic">Great to go</p>
    </div>
  );
};

export default Loader;
