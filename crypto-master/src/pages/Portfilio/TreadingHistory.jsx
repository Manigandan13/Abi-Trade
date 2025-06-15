/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { getAllOrdersForUser } from "@/Redux/Order/Action";
import { calculateProfite } from "@/Util/calculateProfite";
import { readableDate } from "@/Util/readableDate";
import TreadingHistorySkeleton from "@/components/custome/TreadingHistorySkeleton";

const TreadingHistory = () => {
  const dispatch = useDispatch();
  const { asset, order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  if (asset.loading) {
    return <TreadingHistorySkeleton rows={8} />;
  }

  const noOrders = !order.orders || order.orders.length === 0;

  return (
    <div className="mt-6 px-4 md:px-8">
      {noOrders ? (
        <div className="flex items-center justify-center h-[50vh]">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-400">
            No trading history available.
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-7 gap-4 text-sm font-semibold text-gray-600 bg-gradient-to-r from-[#cbd5e1] to-[#f8fafc] px-4 py-3 rounded-lg shadow">
            <div>Date & Time</div>
            <div>Trading Pair</div>
            <div>Buy Price</div>
            <div>Selling Price</div>
            <div>Order Type</div>
            <div>Profit/Loss</div>
            <div className="text-right">Value</div>
          </div>

          {/* Data Rows */}
          {order.orders?.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex flex-col">
                <p className="text-gray-800">{readableDate(item.timestamp).date}</p>
                <p className="text-xs text-gray-400">{readableDate(item.timestamp).time}</p>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={item.orderItem.coin.image}
                  alt={item.orderItem.coin.symbol}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">{item.orderItem.coin.name}</span>
                  <span className="text-xs text-gray-500 uppercase">{item.orderItem.coin.symbol}</span>
                </div>
              </div>

              <div className="text-gray-700 hidden md:block">${item.orderItem.buyPrice.toFixed(2)}</div>

              <div className="text-gray-700 hidden md:block">
                {item.orderItem.sellPrice ? `$${item.orderItem.sellPrice.toFixed(2)}` : "-"}
              </div>

              <div className="hidden md:block">
                <span
                  className={`font-semibold ${
                    item.orderType === "BUY" ? "text-blue-500" : "text-orange-500"
                  }`}
                >
                  {item.orderType}
                </span>
              </div>

              <div className="hidden md:block">
                {item.orderType === "SELL" ? (
                  <span
                    className={`font-semibold ${
                      calculateProfite(item) < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {calculateProfite(item).toFixed(4)}
                  </span>
                ) : (
                  "-"
                )}
              </div>

              <div className="text-right font-semibold text-indigo-600">
                ${item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreadingHistory;
