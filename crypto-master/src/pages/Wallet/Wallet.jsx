
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet, getWalletTransactions } from "@/Redux/Wallet/Action";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { enableTwoStepAuthentication } from "@/Redux/Auth/Action";

import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { CopyIcon, ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import InfoRow from "@/components/custome/InfoRow";
import StatusBadge from "@/components/custome/StatusBadge";
import CustomModal from "@/components/custome/CustomModal";
import OverlayModal from "@/components/custome/OverlayModal";
import TopupForm from "./TopupForm";
import WithdrawForm from "./WithdrawForm";
import TransferForm from "./TransferForm";
import AccountVarificationForm from "../Profile/AccountVarificationForm";

const Wallet = () => {
  const dispatch = useDispatch();
  const { wallet, auth } = useSelector((store) => store);

  const [open2FA, setOpen2FA] = useState(false);
  const [isTopupOpen, setIsTopupOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  useEffect(() => {
    handleFetchUserWallet();
    handleFetchWalletTransactions();
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };

  const handleFetchWalletTransactions = () => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleEnableTwoStepVerification = (otp) => {
    dispatch(enableTwoStepAuthentication({ jwt: localStorage.getItem("jwt"), otp }));
    setOpen2FA(false);
  };

  if (wallet.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] px-3 md:px-6 py-4">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Wallet Summary */}
        <div className="bg-white border rounded-md p-5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-gray-800">Wallet</h2>
              <ReloadIcon onClick={handleFetchUserWallet} className="h-4 w-4 text-blue-500 cursor-pointer hover:rotate-180 transition" />
            </div>

            <div className="flex justify-between text-xs text-gray-400 mb-5">
              <span>ID: #{wallet.userWallet?.id}</span>
              <CopyIcon onClick={() => copyToClipboard(wallet.userWallet?.id)} className="cursor-pointer text-blue-500" />
            </div>

            <div className="text-2xl font-bold text-gray-900 mb-8">
              ${wallet.userWallet?.balance}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={() => setIsTopupOpen(true)} className="py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">Deposit</button>
            <button onClick={() => setIsWithdrawOpen(true)} className="py-2.5 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition">Withdraw</button>
            <button onClick={() => setIsTransferOpen(true)} className="py-2.5 bg-amber-500 text-white rounded-md text-sm font-medium hover:bg-amber-600 transition">Transfer</button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white border rounded-md p-5 lg:col-span-2 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-5">Account Settings</h2>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <InfoRow label="Email:" value={auth.user?.email} />
            <InfoRow label="Full Name:" value={auth.user?.fullName} />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white p-4 border rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-700">2FA Authentication</h3>
                {auth.user.twoFactorAuth?.enabled 
                  ? <StatusBadge label="Enabled" color="green" /> 
                  : <StatusBadge label="Disabled" color="red" />}
              </div>
              <button 
                onClick={() => setOpen2FA(true)} 
                disabled={auth.user.twoFactorAuth?.enabled}
                className={`w-full py-2.5 rounded-md text-sm font-medium ${auth.user.twoFactorAuth?.enabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 transition"}`}
              >
                {auth.user.twoFactorAuth?.enabled ? "Already Enabled" : "Enable 2FA"}
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white border rounded-md p-5 lg:col-span-3 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-gray-800">Transaction History</h2>
            <UpdateIcon onClick={handleFetchWalletTransactions} className="h-4 w-4 text-blue-500 cursor-pointer" />
          </div>

          <div className="space-y-2">
            {wallet.transactions?.length === 0 ? (
              <div className="text-center text-gray-400 text-sm py-8">No transactions found.</div>
            ) : (
              wallet.transactions?.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-3 border rounded-md text-sm shadow-sm">
                  <div>
                    <p className="font-medium text-gray-700">{item.type || item.purpose}</p>
                    <p className="text-[10px] text-gray-400">{item.date}</p>
                  </div>
                  <div className={`text-sm font-medium ${item.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                    {item.amount} USD
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CustomModal isOpen={isTopupOpen} onClose={() => setIsTopupOpen(false)}>
        <TopupForm onClose={() => setIsTopupOpen(false)} />
      </CustomModal>

      <CustomModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)}>
        <WithdrawForm onClose={() => setIsWithdrawOpen(false)} />
      </CustomModal>

      <CustomModal isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)}>
        <TransferForm onClose={() => setIsTransferOpen(false)} />
      </CustomModal>

      {open2FA && (
        <OverlayModal onClose={() => setOpen2FA(false)}>
          <AccountVarificationForm handleSubmit={handleEnableTwoStepVerification} />
        </OverlayModal>
      )}
    </div>
  );
};

export default Wallet;
