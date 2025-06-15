const AnimatedButton = ({ onClick, label, gradient }) => (
 <button
   onClick={onClick}
   className={`py-3 rounded-xl bg-gradient-to-r ${gradient} text-white  shadow-md transition hover:shadow-lg`}
 >
   {label}
 </button>
);
export default AnimatedButton;