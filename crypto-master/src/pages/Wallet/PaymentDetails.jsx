
import PaymentDetailsForm from "./PaymentDetailsForm"; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { maskAccountNumber } from "@/Util/maskAccountNumber";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#f9fafb] px-4 md:px-8 py-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8">
          Payment Details
        </h1>

        {withdrawal.paymentDetails ? (
          <div className="bg-white border border-gray-200 rounded-lg p-5 md:p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold mb-5 text-gray-800">
              {withdrawal.paymentDetails.bankName.toUpperCase()}
            </h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">A/C No:</span>
                <span>{maskAccountNumber(withdrawal.paymentDetails.accountNumber)}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Account Holder:</span>
                <span>{withdrawal.paymentDetails.accountHolderName}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">IFSC Code:</span>
                <span>{withdrawal.paymentDetails.ifsc.toUpperCase()}</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {!showForm && (
              <button
                className="bg-black text-white w-full py-3 rounded-md font-semibold text-sm mb-5 hover:bg-gray-900 transition"
                onClick={() => setShowForm(true)}
              >
                Add Payment Details
              </button>
            )}

            {showForm && (
              <div className="bg-white p-5 md:p-6 rounded-lg border border-gray-200 shadow-sm">
                <PaymentDetailsForm />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;

