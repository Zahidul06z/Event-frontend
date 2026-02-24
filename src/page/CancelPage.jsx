// src/pages/CancelPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 text-center">
      <h1 className="text-3xl font-bold text-yellow-700">⚠️ Payment Cancelled</h1>
      <p className="mt-4 text-lg text-yellow-600">You have cancelled the payment process.</p>
      <Link to="/" className="mt-6 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
        Go Back
      </Link>
    </div>
  );
}
