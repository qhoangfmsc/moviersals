"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VnPayReturnPage() {
  const urlparams = useSearchParams();
  const [params, setParams] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    urlparams.forEach((value, key) => console.log(`${key}: ${value}`));
    setParams(urlparams); // Save params to state
    setLoading(false); // Stop loading
  }, []); // Run when the router is ready

  const handleButtonClick = () => {
    alert("Params received and button clicked!");
    console.log(params); // You can handle params here as needed
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">VNPay Transaction</h1>
      {loading ? (
        <div className="flex items-center">
          {/* Loading Spinner */}
          <div className="loader animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 mr-3"></div>
          <span>Loading transaction details...</span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="mb-4">Transaction details loaded successfully!</p>
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Proceed
          </button>
        </div>
      )}
      {/* Loader styles */}
      <style jsx>{`
        .loader {
          border-width: 4px;
        }
      `}</style>
    </div>
  );
}
