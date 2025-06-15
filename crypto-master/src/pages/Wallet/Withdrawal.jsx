
import { getWithdrawalHistory } from "@/Redux/Withdrawal/Action"; 
import { readableTimestamp } from "@/Util/readbaleTimestamp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WithdrawalSkeleton from "@/components/custome/WithdrawalSkeleton";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
  }, [dispatch]);

  if (withdrawal.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="min-h-screen bg-white py-6 px-3 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-6">
          Withdrawal History
        </h1>

        <div className="w-full border border-gray-200 rounded-md shadow-sm overflow-x-auto">
          <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200 text-xs md:text-sm font-semibold text-gray-700">
            <div className="p-3">Date</div>
            <div className="p-3">Method</div>
            <div className="p-3">Amount</div>
            <div className="p-3 text-right">Status</div>
          </div>

          {withdrawal.history.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              No withdrawal history found.
            </div>
          ) : (
            withdrawal.history.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-4 border-b border-gray-200 text-xs md:text-sm bg-white hover:bg-gray-50 transition"
              >
                <div className="p-3">{readableTimestamp(item?.date)}</div>
                <div className="p-3">Bank Account</div>
                <div className="p-3 font-semibold">₹{item.amount}</div>
                <div className="p-3 text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-[11px] font-medium ${
                      item.status === "PENDING"
                        ? "bg-orange-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
