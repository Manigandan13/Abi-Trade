/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { sendVerificationOtp } from "@/Redux/Auth/Action";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const AccountVarificationForm = ({ handleSubmit }) => {
  const [value, setValue] = useState("");
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const inputRefs = useRef([]);

  const handleSendOtp = (verificationType) => {
    dispatch(
      sendVerificationOtp({
        verificationType,
        jwt: localStorage.getItem("jwt"),
      })
    );
    setOpenOtpModal(true);
  };

  const handleOtpChange = (e, index) => {
    let val = e.target.value.replace(/[^0-9]/g, "");
    let newValue = value.split("");

    newValue[index] = val;
    setValue(newValue.join("").slice(0, 6));

    // Auto move to next input
    if (val && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Auto move to previous input if empty (for backspace)
    if (!val && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-10 w-full bg-white p-5 rounded-xl border border-[#e2e8f0] shadow-sm">
        <div className="flex justify-between items-center text-sm">
          <p className="text-gray-700">Email :</p>
          <p className="text-[#111827] font-semibold">{auth.user?.email}</p>
          <button
            onClick={() => handleSendOtp("EMAIL")}
            className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
        </div>

        {/* OTP Modal */}
        {openOtpModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
            <div className="bg-white w-[90%] max-w-md p-8 rounded-xl shadow-lg border border-[#e5e7eb]">
              <h3 className="text-xl text-center font-bold mb-6 text-[#1e3a8a]">
                Enter OTP
              </h3>

              <div className="flex justify-center gap-3 mb-6">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 text-center text-xl border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={value[index] || ""}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleOtpChange(e, index)}
                  />
                ))}
              </div>

              <button
                onClick={() => handleSubmit(value)}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>

              <button
                onClick={() => setOpenOtpModal(false)}
                className="mt-4 w-full bg-red-500 py-2 rounded-lg text-white hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountVarificationForm;
