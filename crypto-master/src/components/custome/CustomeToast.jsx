
import React, { useEffect, useState } from 'react';

const CustomeToast = ({ type, message, show }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className={`fixed top-5 right-5 z-[9999] px-6 py-4 rounded-md shadow-lg transition duration-300 
      ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
      <p className="font-semibold">{type === "success" ? "Success!" : "Error!"}</p>
      <p>{message}</p>
    </div>
  );
};

export default CustomeToast;
