import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { getAllOrdersForUser } from "@/Redux/Order/Action";
import { calculateProfite } from "@/Util/calculateProfite";
import { readableDate } from "@/Util/readableDate";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const Activity = () => {
  const dispatch = useDispatch();
  const { asset, order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  if (asset.loading) {
    return <SpinnerBackdrop />;
  }

  const noOrders = !order.orders || order.orders.length === 0;

  return (
    <div className="px-3 md:px-6 py-4">
      {noOrders ? (
        <div className="flex items-center justify-center h-[50vh]">
          <h1 className="text-lg md:text-xl font-semibold text-gray-400">
            No trading history available.
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-3">

          {/* Header */}
          <div className="hidden md:grid grid-cols-7 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded py-2 px-3">
            <div>Date</div>
            <div>Pair</div>
            <div>Buy</div>
            <div>Sell</div>
            <div>Type</div>
            <div>P/L</div>
            <div className="text-right">Value</div>
          </div>

          {/* Rows */}
          {order.orders?.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-2 md:grid-cols-7 text-sm items-center bg-white border border-gray-200 rounded px-3 py-2 hover:bg-gray-50 transition"
            >
              {/* Date & Time */}
              <div className="flex flex-col">
                <span className="text-gray-700">{readableDate(item.timestamp).date}</span>
                <span className="text-xs text-gray-400">{readableDate(item.timestamp).time}</span>
              </div>

              {/* Coin */}
              <div className="flex items-center gap-2">
                <img src={item.orderItem.coin.image} alt={item.orderItem.coin.symbol} className="w-6 h-6 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium">{item.orderItem.coin.name}</span>
                  <span className="text-[10px] text-gray-400 uppercase">{item.orderItem.coin.symbol}</span>
                </div>
              </div>

              {/* Buy Price */}
              <div className="hidden md:block text-gray-700">
                ${item.orderItem.buyPrice.toFixed(2)}
              </div>

              {/* Sell Price */}
              <div className="hidden md:block text-gray-700">
                {item.orderItem.sellPrice ? `$${item.orderItem.sellPrice.toFixed(2)}` : "-"}
              </div>

              {/* Order Type */}
              <div className="hidden md:flex items-center">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                  ${item.orderType === "BUY" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {item.orderType}
                </span>
              </div>

              {/* Profit/Loss */}
              <div className="hidden md:block">
                {item.orderType === "SELL" ? (
                  <span className={`font-medium ${calculateProfite(item) < 0 ? "text-red-500" : "text-green-500"}`}>
                    {calculateProfite(item).toFixed(4)}
                  </span>
                ) : (
                  "-"
                )}
              </div>

              {/* Value */}
              <div className="text-right font-semibold text-gray-700">
                ${item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activity;
