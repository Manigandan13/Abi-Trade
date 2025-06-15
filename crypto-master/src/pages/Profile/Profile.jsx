import { useDispatch, useSelector } from "react-redux";
import { VerifiedIcon } from "lucide-react";
import { useState } from "react";
import { enableTwoStepAuthentication, verifyOtp } from "@/Redux/Auth/Action";
import AccountVarificationForm from "./AccountVarificationForm";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [open2FA, setOpen2FA] = useState(false);
  const [openVerifyAccount, setOpenVerifyAccount] = useState(false);

  const handleEnableTwoStepVerification = (otp) => {
    dispatch(enableTwoStepAuthentication({ jwt: localStorage.getItem("jwt"), otp }));
    setOpen2FA(false);
  };

  const handleVerifyOtp = (otp) => {
    dispatch(verifyOtp({ jwt: localStorage.getItem("jwt"), otp }));
    setOpenVerifyAccount(false);
  };

  return (
    <div className="flex flex-col items-center mb-5 min-h-screen bg-[#000000] text-white py-10 px-3">
      <div className="w-full max-w-5xl space-y-10">
        {/* User Info Card */}
        <div className="bg-[#0a0a0a] rounded-xl p-6 shadow-lg border border-[#580aff]/40">
          <h2 className="text-2xl font-semibold mb-6 text-[#0aefff]">Your Information</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="flex justify-between">
              <span>Email:</span>
              <span className="text-[#cefcff]">{auth.user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Full Name:</span>
              <span className="text-[#cefcff]">{auth.user?.fullName}</span>
            </div>
          </div>
        </div>

        {/* 2 Step Verification */}
        <div className="bg-[#0a0a0a] rounded-xl p-6 shadow-lg border border-[#580aff]/40">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#0aefff]">2-Step Verification</h2>
            {auth.user.twoFactorAuth?.enabled ? (
              <div className="flex items-center gap-2 bg-[#0aff99] text-black font-semibold px-3 py-1 rounded-lg">
                <VerifiedIcon className="w-5 h-5" />
                Enabled
              </div>
            ) : (
              <div className="bg-[#ff0000] px-3 py-1 rounded-lg font-semibold">Disabled</div>
            )}
          </div>

          <button
            className="w-full bg-[#0aefff] text-black font-bold py-3 rounded-lg hover:bg-[#0aff99] transition"
            onClick={() => setOpen2FA(true)}
          >
            Enable 2-Step Verification
          </button>

          {open2FA && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
              <div className="bg-[#121212] p-8 rounded-xl w-[90%] max-w-md">
                <h3 className="text-xl font-semibold text-center mb-4">Verify Your Account</h3>
                <AccountVarificationForm handleSubmit={handleEnableTwoStepVerification} />
                <button className="mt-4 w-full bg-red-500 py-2 rounded-lg" onClick={() => setOpen2FA(false)}>Close</button>
              </div>
            </div>
          )}
        </div>

        {/* Account Status */}
        <div className="bg-[#0a0a0a] rounded-xl p-6 shadow-lg border border-[#580aff]/40">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#0aefff]">Account Status</h2>
            {auth.user.verified ? (
              <div className="flex items-center gap-2 bg-[#0aff99] text-black font-semibold px-3 py-1 rounded-lg">
                <VerifiedIcon className="w-5 h-5" />
                Verified
              </div>
            ) : (
              <div className="bg-[#ff0000] px-3 py-1 rounded-lg font-semibold">Pending</div>
            )}
          </div>

          <div className="flex justify-between text-sm mb-6">
            <span>Email:</span>
            <span className="text-[#cefcff]">{auth.user.email}</span>
          </div>

          <button
            className="w-full bg-[#0aefff] text-black font-bold py-3 rounded-lg hover:bg-[#0aff99] transition"
            onClick={() => setOpenVerifyAccount(true)}
          >
            Verify Account
          </button>

          {openVerifyAccount && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
              <div className="bg-[#121212] p-8 rounded-xl w-[90%] max-w-md">
                <h3 className="text-xl font-semibold text-center mb-4">Verify Your Account</h3>
                <AccountVarificationForm handleSubmit={handleVerifyOtp} />
                <button className="mt-4 w-full bg-red-500 py-2 rounded-lg" onClick={() => setOpenVerifyAccount(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
