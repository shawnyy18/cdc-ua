
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/supabase/functions/auth-handler`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'forgot-password',
          email: email
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        setError(data.error || 'Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <Image
                src="/images/itd-logo.png"
                alt="ITD Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
              />
              <h1 className="text-3xl font-bold text-green-600 tracking-wide">EcoKonek</h1>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-mail-check-line text-green-600 text-2xl"></i>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your inbox and follow the instructions to reset your password.
            </p>
            
            <div className="space-y-4">
              <Link href="/login" className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer inline-block">
                Back to Login
              </Link>
              
              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Try Different Email
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <Image
              src="/images/itd-logo.png"
              alt="ITD Logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
              priority
            />
            <h1 className="text-3xl font-bold text-green-600 tracking-wide">EcoKonek</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
          <p className="text-gray-600">No worries, we'll send you reset instructions</p>
        </div>

        {/* Reset Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <i className="ri-error-warning-line text-red-500"></i>
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                placeholder="Enter your email address"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-green-600 hover:text-green-700 font-medium cursor-pointer inline-flex items-center gap-2">
              <i className="ri-arrow-left-line"></i>
              Back to Login
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
          <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Make sure you entered the correct email address</p>
            <p>• Check your spam folder for the reset email</p>
            <p>• Contact support if you continue having issues</p>
          </div>
          <div className="mt-4">
            <Link href="/support" className="text-green-600 hover:text-green-700 font-medium cursor-pointer">
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
