const SpinnerBackdrop = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white bg-opacity-70 backdrop-blur-sm flex flex-col items-center justify-center">
      {/* Clean Crypto Spinner with Bounce */}
      <div className="relative w-28 h-28 mb-8 animate-bounce-smooth">
        <div className="absolute inset-0 rounded-full border-[4px] border-t-transparent border-b-transparent border-l-[#16FF00] border-r-[#0aefff] animate-spin"></div>
        <div className="absolute inset-3 rounded-full border-[2px] border-[#e0e0e0]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-semibold text-black">₿</span>
        </div>
      </div>

      <p className="mt-2 text-lg font-medium tracking-wide text-[#333]">
        Processing...
      </p>
      <p className="text-sm text-[#888] mt-1">Please wait a moment.</p>
    </div>
  );
};

export default SpinnerBackdrop;
