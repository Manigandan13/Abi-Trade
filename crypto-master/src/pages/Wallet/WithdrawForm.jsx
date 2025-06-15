
import { useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { withdrawalRequest } from "@/Redux/Withdrawal/Action";
import { maskAccountNumber } from "@/Util/maskAccountNumber";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { wallet, withdrawal } = useSelector((store) => store);
  const navigate = useNavigate();

  const walletBalance = wallet.userWallet?.balance || 0;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length < 6 && /^\d*$/.test(value)) {
      setAmount(value);
      if (parseFloat(value) > walletBalance) {
        setError("Withdrawal amount exceeds available balance.");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid withdrawal amount.");
      return;
    }
    if (parseFloat(amount) > walletBalance) {
      toast.error("Withdrawal amount exceeds available balance.");
      return;
    }

    dispatch(withdrawalRequest({ jwt: localStorage.getItem("jwt"), amount }))
      .then(() => {
        toast.success("Withdrawal request submitted!", {
          autoClose: 1500,
          onClose: () => {
            setAmount("");
            if (onClose) onClose();
          },
        });
      })
      .catch(() => {
        toast.error("Withdrawal failed. Please try again.");
      });
  };

  if (!withdrawal.paymentDetails) {
    return (
      <div className="h-72 flex flex-col justify-center items-center gap-4 text-gray-900 bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-sm font-medium">Add Payment Method</p>
        <button
          onClick={() => navigate("/payment-details")}
          className="px-6 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Add Payment Details
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-5 text-gray-900">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500 transition"
      >
        &times;
      </button>

      <h3 className="font-semibold text-lg mb-5 text-center">Withdraw Funds</h3>

      {/* Wallet Balance */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <span>Available Balance:</span>
        <span className="font-semibold text-gray-900">${walletBalance.toFixed(2)}</span>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-sm mb-1 font-medium text-gray-700">Withdrawal Amount</label>
        <input
          onChange={handleChange}
          value={amount}
          type="number"
          placeholder="Enter amount"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      {/* Payment Details */}
      <div className="flex items-center gap-3 border border-gray-300 bg-gray-50 rounded-md p-3 mb-5">
        <img
          className="h-10 w-10 object-contain"
          src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"
          alt="Bank"
        />
        <div className="flex flex-col text-sm">
          <span className="font-medium">{withdrawal.paymentDetails?.bankName}</span>
          <span>{maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`w-full py-2 rounded-md font-semibold text-sm transition ${
          !!error || !amount || parseFloat(amount) <= 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={!!error || !amount || parseFloat(amount) <= 0}
      >
        Withdraw {amount && <span>${amount}</span>}
      </button>

      <ToastContainer />
    </div>
  );
};

export default WithdrawForm;
