import { transferMoney } from "@/Redux/Wallet/Action";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransferForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { wallet } = useSelector((store) => store);

  const [formData, setFormData] = useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  const [error, setError] = useState("");

  const balance = wallet.userWallet?.balance || 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (name === "amount") {
      const amountValue = parseFloat(value);
      if (isNaN(amountValue) || amountValue <= 0) {
        setError("Amount must be greater than zero.");
      } else if (amountValue > balance) {
        setError("Amount exceeds your wallet balance.");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = () => {
    if (!formData.amount || !formData.walletId) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (error) {
      toast.error(error);
      return;
    }

    dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.walletId,
        reqData: {
          amount: formData.amount,
          purpose: formData.purpose,
        },
      })
    )
      .then((res) => {
        if (res?.error || res?.message?.includes("Wallet not found")) {
          toast.error(res?.message || "Transfer failed.");
        } else {
          toast.success("Transfer successful!", {
            autoClose: 1500,
            onClose: () => {
              setFormData({ amount: "", walletId: "", purpose: "" });
              if (onClose) onClose();
            },
          });
        }
      })
      .catch((err) => {
        const message =
          err?.response?.data?.error ||
          err?.response?.data ||
          err?.message ||
          "Transfer failed.";
        console.log(message);
        toast.error(message);
      });
  };

  const isDisabled =
    !formData.amount ||
    !formData.walletId ||
    parseFloat(formData.amount) <= 0 ||
    parseFloat(formData.amount) > balance ||
    !!error;

  return (
    <div className="relative w-full max-w-md mx-auto bg-white rounded-md p-5 sm:p-6 text-gray-900 shadow border">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500 transition"
      >
        &times;
      </button>

      <h3 className="font-semibold text-lg mb-5 text-center text-gray-800">Transfer Funds</h3>

      {/* Amount */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Amount (USD)</label>
        <input
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter Amount"
          className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      {/* Wallet ID */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Recipient Wallet ID</label>
        <input
          name="walletId"
          type="number"
          value={formData.walletId}
          onChange={handleChange}
          placeholder="Enter Recipient Wallet ID"
          className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Purpose */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Purpose</label>
        <input
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="Enter purpose (optional)"
          className="w-full bg-gray-50 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`w-full py-2.5 rounded text-sm font-semibold transition ${
          isDisabled
            ? "bg-blue-300 text-white cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={isDisabled}
      >
        Send
      </button>

      <ToastContainer />
    </div>
  );
};

export default TransferForm;

