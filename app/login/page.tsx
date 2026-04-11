
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { saveUserToLocalStorage } from '../../lib/storage';
import { getPostLoginRedirect } from '../../lib/adminAuth';
// Dev-only diagnostics: hidden by default to avoid exposing backend details to users
// To enable temporarily, set NEXT_PUBLIC_SHOW_CONNECTIVITY_DEBUG=1 and rebuild
import ConnectivityDebug from '@/components/ConnectivityDebug';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.email.trim()) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError('Password is required');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting login for:', formData.email);
      
      // First try direct Supabase authentication
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password
      });

      if (authError) {
        console.log('Direct Supabase auth failed, trying edge function:', authError.message);
        
        // Fallback to edge function
        const requestBody = {
          action: 'login',
          email: formData.email.trim(),
          password: formData.password
        };

        // Use Next.js API route instead of Supabase Edge Function
        const apiUrl = `/api/supabase/functions/auth-handler`;
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorText = await response.text();
          let errorMsg = 'Invalid email or password. Please try again.';
          try {
            const parsed = JSON.parse(errorText);
            if (parsed?.error && !/invalid/i.test(parsed.error)) {
              errorMsg = parsed.error;
            }
          } catch {}
          // Change from console.error to console.log for expected auth failures
          console.log('Auth failed:', errorMsg);
          setError(errorMsg);
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        
        if (!data.success) {
          setError('Invalid email or password. Please try again.');
          setIsLoading(false);
          return;
        }

        // Store the session data from edge function
        if (typeof window !== 'undefined') {
          localStorage.setItem('ecokonek_token', data.session.access_token);
          
          const userData = {
            id: data.user.id,
            email: data.user.email,
            username: data.user.user_metadata?.username || data.user.email.split('@')[0],
            full_name: data.user.user_metadata?.full_name || ''
          };
          
          saveUserToLocalStorage(userData);
        }

        // Check admin status and redirect accordingly
        console.log('Login successful, checking admin status...');
        const redirectPath = await getPostLoginRedirect(data.user.id);
        console.log('Redirecting to:', redirectPath);
        router.push(redirectPath);
        return;
      } else {
        // Direct Supabase auth succeeded
        console.log('Direct Supabase auth successful');
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('ecokonek_token', authData.session.access_token);
          
          const userData = {
            id: authData.user.id,
            email: authData.user.email,
            username: authData.user.user_metadata?.username || authData.user.email?.split('@')[0] || '',
            full_name: authData.user.user_metadata?.full_name || ''
          };
          
          saveUserToLocalStorage(userData);
        }

        // Check admin status and redirect accordingly
        console.log('Login successful, checking admin status...');
        const redirectPath = await getPostLoginRedirect(authData.user.id);
        console.log('Redirecting to:', redirectPath);
        router.push(redirectPath);
        return;
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error occurred. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      console.log(`[OAuth] Attempting ${provider} login from:`, window.location.origin);
      setError(''); // Clear any previous errors
      setIsLoading(true);
      
      const redirectUrl = `${window.location.origin}/auth/callback`;
      console.log(`[OAuth] Redirect URL:`, redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider.toLowerCase() as any,
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: false,
          // Query params to help debug and track the flow
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      console.log(`[OAuth] Response:`, { data, error });

      if (error) {
        console.error(`[OAuth] ${provider} login error:`, error);
        setIsLoading(false);
        const msg = (error as any)?.message || ''
        if (/provider is not enabled/i.test(msg)) {
          setError(`${provider} login is not enabled yet. Please enable ${provider} in Supabase Auth → Providers and save the Client ID/Secret.`)
        } else if (/redirect_uri|mismatch|invalid/i.test(msg)) {
          setError(`${provider} redirect mismatch. Add "${redirectUrl}" to Supabase Redirect URLs in your Supabase dashboard.`)
        } else if (/popup|blocked/i.test(msg)) {
          setError(`Popup was blocked. Please allow popups for this site or try again.`)
        } else {
          setError(`${provider} login failed: ${msg}. Please try again.`)
        }
        return;
      }

      // If we get here and there's a URL, it means the redirect is happening
      if (data?.url) {
        console.log(`[OAuth] Redirecting to:`, data.url);
        // The browser will redirect automatically - don't set loading to false
      } else {
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error(`[OAuth] ${provider} login exception:`, error);
      setIsLoading(false);
      setError(`${provider} login failed: ${error.message || 'Unknown error'}. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <i className="ri-recycle-line text-white text-xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-green-600 tracking-wide">EcoKonek</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Continue your sustainability journey</p>
        </div>

        {/* Login Form */}
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
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                placeholder="Enter your email"
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  disabled={isLoading}
                >
                  <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  disabled={isLoading}
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-707 font-medium cursor-pointer">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:bg-gray-100 text-sm font-medium text-gray-500 transition-colors cursor-pointer"
              >
                <i className="ri-google-fill text-red-500 text-lg"></i>
                <span className="ml-2">Google</span>
              </button>
              <button 
                onClick={() => handleSocialLogin('Facebook')}
                disabled={isLoading}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:bg-gray-100 text-sm font-medium text-gray-500 transition-colors cursor-pointer"
              >
                <i className="ri-facebook-fill text-blue-600 text-lg"></i>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-green-600 hover:text-green-700 font-semibold cursor-pointer">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Connectivity diagnostics (collapsible) - hidden by default */}
      {process.env.NEXT_PUBLIC_SHOW_CONNECTIVITY_DEBUG === '1' && (
        <div className="max-w-md w-full mt-4">
          <ConnectivityDebug />
        </div>
      )}
    </div>
  );
}
