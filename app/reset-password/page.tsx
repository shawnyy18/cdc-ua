'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const checkRecoverySession = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (!mounted) return;

        if (sessionError || !data.session) {
          setError('This reset link is invalid or has expired. Please request a new password reset email.');
          setIsSessionReady(false);
          return;
        }

        setIsSessionReady(true);
      } catch {
        if (!mounted) return;
        setError('Unable to verify reset link. Please try again.');
        setIsSessionReady(false);
      }
    };

    checkRecoverySession();

    return () => {
      mounted = false;
    };
  }, []);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message || 'Unable to update password. Please try again.');
        return;
      }

      setIsSuccess(true);

      setTimeout(() => {
        router.replace('/login');
      }, 2000);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
              priority
            />
            <h1 className="text-3xl font-bold text-green-600 tracking-wide">EcoKonek</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Set New Password</h2>
          <p className="text-gray-600">Create a strong password for your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {isSuccess ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-checkbox-circle-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Password Updated</h3>
              <p className="text-gray-600 mb-6">Your password has been changed successfully. Redirecting to login...</p>
              <Link
                href="/login"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer inline-block"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <i className="ri-error-warning-line text-red-500 mt-0.5"></i>
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handlePasswordReset} className="space-y-5">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                    placeholder="Enter your new password"
                    required
                    minLength={8}
                    disabled={isLoading || !isSessionReady}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                    placeholder="Re-enter your new password"
                    required
                    minLength={8}
                    disabled={isLoading || !isSessionReady}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !isSessionReady}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating Password...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/forgot-password" className="text-green-600 hover:text-green-700 font-medium cursor-pointer inline-flex items-center gap-2">
                  <i className="ri-arrow-left-line"></i>
                  Request New Reset Link
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
