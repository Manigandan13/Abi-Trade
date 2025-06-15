
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-[#202124] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-[80px] font-semibold text-[#d93025] leading-none">404</h1>
        <p className="mt-4 text-2xl font-medium">
          Page not found
        </p>

        <p className="mt-2 text-sm text-[#5f6368]">
          The page you're looking for might have been removed or never existed.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 text-sm font-medium bg-[#1a73e8] text-white rounded-xl shadow hover:bg-[#1558d6] transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
