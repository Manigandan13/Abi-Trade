import { useNavigate } from "react-router-dom";

export function AssetTable({ coins, category }) {
  const navigate = useNavigate();

  const safeToFixed = (value, digits = 2) =>
    typeof value === "number" ? value.toFixed(digits) : "N/A";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {coins.map((item) => (
        <div
          key={item.id}
          onClick={() => navigate(`/market/${item.id}`)}
          className="cursor-pointer border border-gray-200 rounded-md p-4 bg-white hover:shadow-lg transition"
        >
          {/* Header Section */}
          <div className="flex items-center gap-3 mb-3">
            <img src={item.image} alt={item.symbol} className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="text-base font-semibold text-gray-900">{item.name}</h2>
              <p className="uppercase text-xs text-gray-500">{item.symbol}</p>
            </div>
          </div>

          {/* Price */}
          <div className="mb-3">
            <p className="text-xs text-gray-400 mb-1">Price</p>
            <h3 className="text-lg font-bold text-black">${safeToFixed(item.currentPrice)}</h3>
          </div>

          {/* Market Cap & Volume */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div>
              <p className="text-gray-400">Market Cap</p>
              <p className="text-gray-700 font-medium">${safeToFixed(item.marketCap)}</p>
            </div>
            <div>
              <p className="text-gray-400">Volume</p>
              <p className="text-gray-700 font-medium">${safeToFixed(item.totalVolume)}</p>
            </div>
          </div>

          {/* 24h Change */}
          <div className="flex justify-between items-center text-sm">
            <p className="text-gray-400">24h Change</p>
            <p className={`font-semibold ${item.marketCapChangePercentage24h < 0 ? "text-red-500" : "text-green-500"}`}>
              {safeToFixed(item.marketCapChangePercentage24h)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
