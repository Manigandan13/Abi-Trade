/* eslint-disable no-unused-vars */

import CrazyLoader from "@/components/custome/CrazyLoader";
import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/login";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((store) => store);

  const prevAuthRef = useRef({ jwt: null, error: null });

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (auth.jwt && auth.jwt !== prevAuthRef.current.jwt) {
      toast.success("Logged in successfully!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
    }

    if (auth.error && auth.error !== prevAuthRef.current.error) {
      toast.error(auth.error?.error || "Something went wrong", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
    }

    // Update previous values after processing
    prevAuthRef.current = { jwt: auth.jwt, error: auth.error };

  }, [auth.jwt, auth.error]);

  return (
    <div className="relative min-h-screen bg-[#ffffff] flex items-center justify-center px-4">
      {auth.loading && <CrazyLoader />}

      {/* Toast container only inside Auth */}
      <ToastContainer />

      <div className="w-full max-w-md bg-white border border-[#e0e0e0] rounded-xl shadow-lg p-8 sm:p-10">
        <div className="flex flex-row justify-center items-center mb-6 gap-2">
          <img 
            src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" 
            alt="ABI TRADE" 
            className="w-10 h-10" 
          />
          <h1 className="text-2xl font-semibold text-[#202124]">ABI TRADE</h1>
        </div>

        {location.pathname === "/signup" ? (
          <section className="space-y-6">
            <SignupForm />
            <div className="flex justify-center text-sm mt-3">
              <span className="text-[#5f6368]">Already have an account?</span>
              <button onClick={() => handleNavigation("/signin")} className="ml-2 text-[#1a73e8] hover:underline transition">
                Sign In
              </button>
            </div>
          </section>
        ) : (
          <section className="space-y-6">
            <LoginForm />
            <div className="flex justify-center text-sm mt-3">
              <span className="text-[#5f6368]">Don't have an account?</span>
              <button onClick={() => handleNavigation("/signup")} className="ml-2 text-[#1a73e8] hover:underline transition">
                Sign Up
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Auth;
