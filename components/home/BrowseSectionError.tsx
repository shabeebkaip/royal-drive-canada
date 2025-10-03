/**
 * Error Boundary Component for Browse Section
 * Displays error message when data fetching fails
 */

'use client';

import { useEffect } from 'react';

interface BrowseSectionErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BrowseSectionError({ error, reset }: BrowseSectionErrorProps) {
  useEffect(() => {
    console.error('Browse section error:', error);
  }, [error]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <svg
                className="w-16 h-16 text-red-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unable to Load Vehicle Types
              </h3>
              <p className="text-gray-600 mb-6">
                We're having trouble loading the vehicle types. Please try again.
              </p>
              <button
                onClick={reset}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
