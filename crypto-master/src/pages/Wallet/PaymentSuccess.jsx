import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { depositMoney } from "@/Redux/Wallet/Action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order_id } = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const stripe_payment_id = searchParams.get("payment_id");
  const razorpay_payment_id = searchParams.get("razorpay_payment_id");
  const payment_id = stripe_payment_id || razorpay_payment_id;

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (order_id && payment_id) {
      dispatch(
        depositMoney({
          jwt,
          orderId: order_id,
          paymentId: payment_id,
          navigate: () => {
            toast.success("🎉 Payment Successful");
            setLoading(false);
            setTimeout(() => {
              navigate("/wallet");
            }, 2000); // redirect after 2s
          },
        })
      ).catch(() => {
        toast.error("❌ Payment Failed");
        setLoading(false);
        setTimeout(() => {
          navigate("/wallet");
        }, 2000);
      });
    } else {
      toast.error("Invalid Payment Callback");
      setLoading(false);
      setTimeout(() => {
        navigate("/wallet");
      }, 2000);
    }
  }, [order_id, payment_id]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white text-gray-800 relative">
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="relative z-10 bg-white p-10 rounded-xl shadow-xl text-center w-[90%] sm:w-[400px]">
        {loading ? (
          <>
            <h1 className="text-2xl font-semibold mb-4">Processing Payment...</h1>
            <p className="text-gray-600">Please wait while we verify your payment.</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 text-green-500">Payment Verified ✅</h1>
            <p className="text-gray-600">You will be redirected shortly...</p>
          </>
        )}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default PaymentSuccess;
