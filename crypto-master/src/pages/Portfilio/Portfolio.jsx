/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { useNavigate } from "react-router-dom";
import Watchlist from "../Watchlist/Watchlist";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const tabs = [
  { label: "Portfolio", value: "portfolio" },
  { label: "Watchlist", value: "watchlist" },
];

const Portfolio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { asset } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <div className="px-3 md:px-6 py-4 min-h-screen bg-white">
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setCurrentTab(tab.value)}
            className={`px-4 py-2 rounded text-sm font-medium border transition-all duration-300 ${
              currentTab === tab.value
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Portfolio Content */}
      {currentTab === "portfolio" ? (
        asset.loading ? (
          <SpinnerBackdrop />
        ) : !asset.userAssets || asset.userAssets.length === 0 ? (
          <div className="flex items-center justify-center h-[50vh]">
            <h1 className="text-lg md:text-xl font-semibold text-gray-400">
              No assets in your portfolio.
            </h1>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Header */}
            <div className="hidden md:grid grid-cols-6 text-xs font-semibold text-gray-500 border border-gray-200 rounded py-2 px-3 bg-white">
              <div>Asset</div>
              <div>Price</div>
              <div>Units</div>
              <div>Change</div>
              <div>Change (%)</div>
              <div>Value</div>
            </div>

            {/* Data Rows */}
            {asset.userAssets?.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/market/${item.coin.id}`)}
                className="grid grid-cols-2 md:grid-cols-6 items-center text-sm bg-white border border-gray-200 rounded py-2 px-3 hover:bg-gray-50 transition cursor-pointer"
              >
                {/* Asset Info */}
                <div className="flex items-center gap-2">
                  <img src={item.coin.image} alt={item.coin.symbol} className="w-7 h-7 rounded-full" />
                  <div>
                    <div className="font-medium text-gray-800">{item.coin.name}</div>
                    <div className="text-[10px] text-gray-400 uppercase">{item.coin.symbol}</div>
                  </div>
                </div>

                {/* Current Price */}
                <div className="hidden md:block text-gray-700">${item.coin.current_price.toFixed(2)}</div>

                {/* Units */}
                <div className="text-gray-700">{item.quantity.toFixed(6)}</div>

                {/* Change */}
                <div
                  className={`hidden md:block font-medium ${
                    item.coin.price_change_24h < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {item.coin.price_change_24h.toFixed(4)}
                </div>

                {/* Change % */}
                <div
                  className={`font-medium ${
                    item.coin.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {item.coin.price_change_percentage_24h.toFixed(3)}%
                </div>

                {/* Total Value */}
                <div className="font-semibold text-gray-800">
                  ${(item.coin.current_price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <Watchlist />
      )}
    </div>
  );
};

export default Portfolio;
