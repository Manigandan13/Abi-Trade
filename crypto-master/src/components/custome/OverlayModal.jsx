const OverlayModal = ({ children, onClose }) => (
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <div className="bg-white p-8 rounded-2xl w-[90%] max-w-md shadow-lg">
     {children}
     <button onClick={onClose} className="mt-6 w-full bg-red-500 py-2 rounded-lg text-white font-bold">
       Close
     </button>
   </div>
 </div>
);
export default OverlayModal;
