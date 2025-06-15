/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import { useParams } from "react-router-dom";   
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails } from "@/Redux/Coin/Action";
import { getUserWatchlist, addItemToWatchlist } from "@/Redux/Watchlist/Action";
import { getUserWallet } from "@/Redux/Wallet/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import StockChart from "./StockChart";
import TreadingForm from "./TreadingForm";
import { existInWatchlist } from "@/Util/existInWatchlist";
import { BookmarkIcon, BookmarkFilledIcon } from "@radix-ui/react-icons";

const StockDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { coin, watchlist, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchCoinDetails({ coinId: id, jwt: auth.jwt || localStorage.getItem("jwt") }));
  }, [id]);

  useEffect(() => {
    dispatch(getUserWatchlist());
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  }, []);

  const handleAddToWatchlist = () => {
    dispatch(addItemToWatchlist(coin.coinDetails?.id));
  };

  if (coin.loading) return <SpinnerBackdrop />;

  const coinDetails = coin.coinDetails;

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* LEFT SECTION */}
        <div className="flex flex-col gap-3">

          {/* Header */}
          <div className="bg-white border border-gray-200 rounded p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={coinDetails?.image} alt={coinDetails?.name} className="w-12 h-12 rounded-full border" />
              <div>
                <div className="flex items-center gap-1">
                  <h2 className="text-base font-semibold text-gray-900">{coinDetails?.symbol?.toUpperCase()}</h2>
                  <span className="text-sm text-gray-500">{coinDetails?.name}</span>
                </div>
                <div className="text-lg font-bold text-black mt-1">
                  ${coinDetails?.currentPrice?.toLocaleString()}
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToWatchlist}
              className="p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition"
            >
              {existInWatchlist(watchlist.items, coinDetails) ? (
                <BookmarkFilledIcon className="w-5 h-5 text-gray-800" />
              ) : (
                <BookmarkIcon className="w-5 h-5 text-gray-800" />
              )}
            </button>
          </div>

          {/* Price Change */}
          <div className="bg-white border border-gray-200 rounded p-3 flex justify-between items-center text-sm">
            <span className="text-gray-500">24h Change</span>
            <span className={`font-semibold ${coinDetails?.marketCapChange24h < 0 ? "text-red-500" : "text-green-500"}`}>
              {coinDetails?.priceChange24h} ({coinDetails?.marketCapChangePercentage24h}%)
            </span>
          </div>

          {/* Trading Form */}
          <div className="bg-white border border-gray-200 rounded p-3">
            <TreadingForm />
          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white border border-gray-200 rounded p-3">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Market Overview</h3>
          <StockChart coinId={coinDetails?.id} />
        </div>

      </div>
    </div>
  );
};

export default StockDetails;


