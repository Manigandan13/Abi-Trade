
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { twoStepVerification } from "@/Redux/Auth/Action";
import CustomeToast from "@/components/custome/CustomeToast";

const TwoFactorAuth = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { session } = useParams();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleTwoFactoreAuth = () => {
    dispatch(twoStepVerification({ otp: value, session, navigate }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4">
      <CustomeToast show={auth.error} message={auth.error?.error} />

      <div className="bg-white border border-[#e0e0e0] rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col items-center space-y-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          alt="avatar"
          className="w-20 h-20 rounded-full border-4 border-[#1a73e8] object-cover"
        />

        <h1 className="text-xl font-semibold text-[#202124] text-center">
          Two Step Verification
        </h1>

        <p className="text-sm text-gray-500 text-center">
          Enter the 6-digit code we sent to your email
        </p>

        <div className="flex justify-center space-x-2 w-full">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value[index] || ""}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                const newVal = value.substring(0, index) + val + value.substring(index + 1);
                setValue(newVal.slice(0, 6));
                if (val && index < 5) {
                  document.getElementById(`otp-${index + 1}`).focus();
                }
              }}
              id={`otp-${index}`}
              className="w-10 h-12 text-center text-lg font-bold bg-white text-[#202124] border border-[#dadce0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a73e8] transition"
            />
          ))}
        </div>

        <button
          onClick={handleTwoFactoreAuth}
          className="w-full py-3 rounded-lg bg-[#1a73e8] text-white font-semibold text-base hover:bg-[#1558d6] transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
