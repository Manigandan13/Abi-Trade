import { useEffect, useState } from "react";
import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const WatchlistComponent = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { watchlist } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserWatchlist());
  }, [page]);

  const handleAddToWatchlist = (id) => {
    dispatch(addItemToWatchlist(id));
  };

  if (watchlist.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="px-3 md:px-6 py-4 min-h-screen bg-white">

      {/* Header */}
      <div className="hidden md:grid grid-cols-7 text-xs font-semibold text-gray-500 border border-gray-200 rounded py-2 px-3 bg-white mb-3">
        <div>Coin</div>
        <div>Symbol</div>
        <div>Volume</div>
        <div>Market Cap</div>
        <div>24H</div>
        <div>Price</div>
        <div className="text-center text-red-500">Remove</div>
      </div>

      {/* Data */}
      <div className="flex flex-col gap-2">
        {watchlist.items?.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-2 md:grid-cols-7 items-center text-sm bg-white border border-gray-200 rounded py-2 px-3 hover:bg-gray-50 transition cursor-pointer"
          >
            {/* Coin Info */}
            <div onClick={() => navigate(`/market/${item.id}`)} className="flex items-center gap-2">
              <img src={item.image} alt={item.symbol} className="w-7 h-7 rounded-full" />
              <div>
                <div className="font-medium text-gray-800">{item.name}</div>
                <div className="text-[10px] text-gray-400 uppercase">{item.symbol}</div>
              </div>
            </div>

            {/* Symbol */}
            <div className="text-gray-700 uppercase">{item.symbol}</div>

            {/* Volume */}
            <div className="hidden md:block text-gray-700">{item.total_volume.toLocaleString()}</div>

            {/* Market Cap */}
            <div className="hidden md:block text-gray-700">{item.market_cap.toLocaleString()}</div>

            {/* 24H Change */}
            <div
              className={`hidden md:block font-semibold ${
                item.market_cap_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {item.market_cap_change_percentage_24h}%
            </div>

            {/* Price */}
            <div className="font-semibold text-gray-900">${item.current_price}</div>

            {/* Remove / Toggle Button */}
            <div className="flex justify-center">
              <button
                onClick={() => handleAddToWatchlist(item.id)}
                className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                <BookmarkFilledIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Data */}
      {watchlist.items?.length === 0 && (
        <div className="text-center text-gray-500 text-sm mt-20">No watchlist data found.</div>
      )}
    </div>
  );
};

export default WatchlistComponent;

