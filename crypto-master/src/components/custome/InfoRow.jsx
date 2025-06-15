const InfoRow = ({ label, value }) => (
 <div className="flex gap-3 items-center text-sm text-gray-700">
   <span className="font-medium">{label}</span>
   <span className="font-medium">{value}</span>
 </div>
);
export default InfoRow;
