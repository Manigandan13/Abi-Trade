import { VerifiedIcon } from "lucide-react";

const StatusBadge = ({ label, color }) => {
  const bg = color === "green" ? "bg-green-400" : "bg-red-400";
  return (
    <div className={`flex items-center gap-2 ${bg} text-white font-semibold px-3 py-1 rounded-2xl`}>
      <VerifiedIcon className="w-5 h-5" />
      {label}
    </div>
  );
};
export default StatusBadge;
