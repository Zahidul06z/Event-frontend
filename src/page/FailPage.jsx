// src/pages/FailPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function FailPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center">
      <h1 className="text-3xl font-bold text-red-700">❌ Payment Failed</h1>
      <p className="mt-4 text-lg text-red-600">Something went wrong. Please try again later.</p>
      <Link to="/" className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Try Again
      </Link>
    </div>
  );
}
