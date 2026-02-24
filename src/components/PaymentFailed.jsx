import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get('transactionId');

  return (
    <div className="  min-h-screen  flex items-center justify-center">
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-red-600">Payment Failed!</h2>
        <p className="mt-2 text-gray-600">Your payment could not be processed. Please try again.</p>
        
        {transactionId && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">Transaction ID: {transactionId}</p>
          </div>
        )}
        
        <div className="mt-6 space-y-3">
          <button
            onClick={() => window.location.href = '/payment'}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;