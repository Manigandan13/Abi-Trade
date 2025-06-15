
import { paymentHandler } from "@/Redux/Wallet/Action"; 
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopupForm = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let value = e.target.value;
    if (value.toString().length < 6) {
      setAmount(value);
    }
  };

  const handleSubmit = () => {
    const amountValue = parseFloat(amount);
    if (!amount || amountValue <= 0) {
      toast.error("Please enter a valid amount greater than 0.");
      return;
    }

    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount: amountValue,
      })
    )
      .then(() => {
        setAmount("");
        if (onClose) onClose();
      })
      .catch(() => {
        toast.error("Payment failed. Please try again.");
      });
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-white rounded-md p-5 sm:p-6 text-gray-900 shadow border">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500 transition"
      >
        &times;
      </button>

      <h3 className="font-semibold text-lg mb-5 text-center text-gray-800">Deposit Funds</h3>

      {/* Amount Input */}
      <div className="mb-5">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Enter Amount</label>
        <input
          onChange={handleChange}
          value={amount}
          type="number"
          className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Amount in USD"
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Select Payment Method</label>
        <div className="flex gap-3 justify-center flex-wrap">

          <div
            onClick={() => setPaymentMethod("RAZORPAY")}
            className={`border rounded px-3 py-2 flex items-center justify-center cursor-pointer w-32 h-20 transition ${
              paymentMethod === "RAZORPAY"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png"
              alt="Razorpay"
              className="w-16"
            />
          </div>

          <div
            onClick={() => setPaymentMethod("STRIPE")}
            className={`border rounded px-3 py-2 flex items-center justify-center cursor-pointer w-32 h-20 transition ${
              paymentMethod === "STRIPE"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png"
              alt="Stripe"
              className="w-16"
            />
          </div>

        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full">
        <button
          onClick={handleSubmit}
          disabled={wallet.loading}
          className={`w-full py-2.5 rounded text-sm font-semibold transition ${
            wallet.loading
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {wallet.loading ? "Processing..." : "Confirm Deposit"}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default TopupForm;
