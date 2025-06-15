import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountUp from "react-countup";

import { getAssetDetails } from "@/Redux/Assets/Action";
import { payOrder } from "@/Redux/Order/Action";
import { getUserWallet } from "@/Redux/Wallet/Action";

const truncateDecimal = (num, decimalPlaces) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.floor(num * factor) / factor;
};

const TradingForm = () => {
  const { coin, asset, wallet } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [orderType, setOrderType] = useState("BUY");
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (e) => {
    const input = e.target.value;
    setAmount(input);
    const parsedAmount = parseFloat(input);
    if (!isNaN(parsedAmount) && parsedAmount > 0 && coin.coinDetails?.currentPrice) {
      const volume = parsedAmount / coin.coinDetails.currentPrice;
      const decimalPlaces = 6;
      setQuantity(truncateDecimal(volume, decimalPlaces));
    } else {
      setQuantity(0);
    }
  };

  const setMaxSell = () => {
    if (asset.assetDetails?.quantity && coin.coinDetails?.currentPrice) {
      const maxAmount = asset.assetDetails.quantity * coin.coinDetails.currentPrice;
      const safeMaxAmount = maxAmount - Math.max(0.01, maxAmount * 0.0001);
      const formattedAmount = safeMaxAmount.toFixed(2);
      setAmount(formattedAmount);
      handleAmountChange({ target: { value: formattedAmount } });
    }
  };

  const setMaxBuy = () => {
    if (wallet.userWallet?.balance && coin.coinDetails?.currentPrice) {
      const formattedAmount = wallet.userWallet.balance.toFixed(2);
      setAmount(formattedAmount);
      handleAmountChange({ target: { value: formattedAmount } });
    }
  };

  const isDisabled = () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0 || quantity <= 0) return true;
    if (orderType === "SELL") {
      return !asset.assetDetails?.quantity || asset.assetDetails.quantity * coin.coinDetails?.currentPrice < parsedAmount;
    }
    if (orderType === "BUY") {
      return quantity * coin.coinDetails?.currentPrice > wallet.userWallet?.balance;
    }
    return false;
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      await dispatch(
        payOrder({
          jwt: localStorage.getItem("jwt"),
          amount: parseFloat(amount),
          orderData: {
            coinId: coin.coinDetails?.id,
            quantity,
            orderType,
          },
        })
      );
      dispatch(getAssetDetails({ coinId: coin.coinDetails.id, jwt: localStorage.getItem("jwt") }));
      dispatch(getUserWallet({ jwt: localStorage.getItem("jwt") }));
      toast.success("✅ Order successfully executed!");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      toast.error("❌ Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coin.coinDetails?.id) {
      dispatch(getAssetDetails({ coinId: coin.coinDetails.id, jwt: localStorage.getItem("jwt") }));
    }
  }, [coin.coinDetails?.id]);

  return (
    <div className="w-full bg-white border border-gray-200 p-4 rounded-md">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      
      <h2 className="text-base font-semibold text-gray-900 mb-4 text-center">
        Trade {coin.coinDetails?.name || "Crypto"}
      </h2>

      {/* BUY / SELL Buttons */}
      <div className="flex justify-center gap-2 mb-4">
        {["BUY", "SELL"].map((type) => (
          <button
            key={type}
            className={`px-5 py-1.5 rounded text-sm font-medium border ${
              orderType === type
                ? type === "BUY"
                  ? "bg-green-500 text-white border-green-600"
                  : "bg-red-500 text-white border-red-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setOrderType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Wallet and Quantity */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div className="bg-gray-50 border border-gray-200 p-2 rounded">
          <p className="text-gray-500 mb-1">Wallet Balance</p>
          <p className="font-semibold text-gray-900 text-sm">
            <CountUp end={wallet.userWallet?.balance || 0} decimals={2} prefix="$ " duration={1.2} />
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-2 rounded">
          <p className="text-gray-500 mb-1">{coin.coinDetails?.symbol?.toUpperCase()} Quantity</p>
          <p className="font-semibold text-gray-900 text-sm">
            <CountUp end={asset.assetDetails?.quantity || 0} decimals={6} duration={1.2} />
          </p>
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-xs font-medium text-gray-600 mb-1">
          Enter Amount (USD)
        </label>
        <div className="flex gap-2">
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="e.g. 100"
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="bg-blue-500 text-white text-xs font-semibold px-3 rounded hover:bg-blue-600"
            onClick={orderType === "BUY" ? setMaxBuy : setMaxSell}
          >
            MAX
          </button>
        </div>
        {amount !== "" && parseFloat(amount) <= 0 && (
          <p className="text-xs text-red-500 mt-1">Amount must be greater than 0</p>
        )}
      </div>

      {/* Quantity Output */}
      <div className="mb-3 text-xs text-gray-700">
        You will {orderType === "BUY" ? "receive" : "sell"}: 
        <span className="font-semibold ml-1">
          <CountUp end={quantity} decimals={6} duration={1.2} /> {coin.coinDetails?.symbol?.toUpperCase()}
        </span>
      </div>

      {/* Validation Messages */}
      {orderType === "SELL" &&
        asset.assetDetails?.quantity * coin.coinDetails?.currentPrice < parseFloat(amount) && (
          <p className="text-xs text-red-500 mb-2">❌ Insufficient coin quantity to sell</p>
        )}

      {orderType === "BUY" &&
        quantity * coin.coinDetails?.currentPrice > wallet.userWallet?.balance && (
          <p className="text-xs text-red-500 mb-2">❌ Insufficient wallet balance</p>
        )}

      {/* Submit Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={isDisabled() || loading}
        className={`w-full flex justify-center items-center gap-2 py-2 rounded text-sm font-semibold transition ${
          isDisabled() || loading
            ? "bg-gray-300 cursor-not-allowed text-gray-600"
            : orderType === "BUY"
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        {loading ? (
          <>
            <Loader2Icon className="animate-spin" size={16} />
            Placing Order...
          </>
        ) : (
          `Place ${orderType} Order`
        )}
      </button>
    </div>
  );
};

export default TradingForm;
