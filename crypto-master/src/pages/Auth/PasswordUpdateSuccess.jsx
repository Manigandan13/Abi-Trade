import { CheckCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const PasswordUpdateSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#0f0f0f] border border-[#0aefff50] rounded-2xl shadow-2xl p-10 w-[90%] max-w-md flex flex-col items-center space-y-6">

        <CheckCircle className="text-[#0aff99] w-24 h-24 drop-shadow-lg" />

        <p className="text-2xl font-extrabold text-[#0aefff] tracking-wide text-center">
          Password Changed!
        </p>

        <p className="text-gray-400 text-center text-sm leading-relaxed">
          Your password has been changed successfully.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0aefff] to-[#0aff99] text-black font-extrabold tracking-wide hover:scale-105 transform transition duration-300 shadow-lg"
        >
          Go To Login
        </button>
      </div>
    </div>
  );
};

export default PasswordUpdateSuccess;
