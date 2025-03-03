import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen dark:bg-gray-800 bg-gray-100">
      <div className="relative flex justify-center items-center w-20 h-20">
        <div className="absolute w-full h-full border-4 border-purple-600 rounded-full animate-ping"></div>
        <div className="absolute w-16 h-16 border-4 border-violet-600 rounded-full animate-spin"></div>
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
      <p className="text-gray-900 dark:text-gray-100 mt-10 text-lg font-semibold">{"Loading Dashboard..."}</p>
      <p className="text-gray-900 dark:text-gray-100 mt-2 text-sm italic">
        {"Great things take time. Hang tight!"}
      </p>
    </div>
  );
};

export default Loader;
