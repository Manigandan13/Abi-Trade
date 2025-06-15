const CrazyLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center">
      
      {/* Smooth spinning ring */}
      <div className="relative w-28 h-28 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-[#d1d5db] border-t-[#1a73e8] animate-spin"></div>
        <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center">
          <span className="text-3xl font-semibold text-[#1a73e8]">₿</span>
        </div>
      </div>

      <p className="mt-2 text-lg font-medium text-[#202124]">
        Waking up your session...
      </p>
      <p className="text-sm text-[#5f6368] mt-1">
        Please wait while we prepare everything for you.
      </p>
    </div>
  );
};

export default CrazyLoader;
