
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showTOS, setShowTOS] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

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
    setSuccess('');

    // Clear localStorage to prevent quota errors
    try {
      localStorage.clear();
    } catch (storageError) {
      console.warn('Could not clear localStorage:', storageError);
    }

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (!formData.username.trim()) {
      setError('Username is required');
      setIsLoading(false);
      return;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long');
      setIsLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/supabase/functions/auth-handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'register',
          email: formData.email,
          password: formData.password,
          fullName: `${formData.firstName} ${formData.lastName}`,
          username: formData.username,
          phone: formData.phone
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.message);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        });
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: string) => {
    try {
      const response = await fetch('/api/supabase/functions/auth-handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'social-login',
          provider: provider.toLowerCase()
        })
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(`${provider} signup error:`, error);
      setError(`${provider} signup is temporarily unavailable`);
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-gray-600">CDC Internal Asset Surrender &amp; E-Waste Management</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <i className="ri-error-warning-line text-red-500"></i>
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <i className="ri-check-line text-green-500"></i>
                <span className="text-green-700 text-sm">{success}</span>
              </div>
              <p className="text-green-600 text-xs mt-2">Redirecting to login page...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                  placeholder="Juan"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                  placeholder="Cruz"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                placeholder="jcruz123"
                required
                disabled={isLoading}
                minLength={3}
                maxLength={20}
                pattern="[a-zA-Z0-9_]+"
                title="Username can only contain letters, numbers, and underscores"
              />
              <p className="text-xs text-gray-500 mt-1">3-20 characters, letters, numbers, and underscores only</p>
            </div>

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
                placeholder="juan.cruz@email.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                placeholder="+63 9XX XXX XXXX"
                required
                disabled={isLoading}
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
                  placeholder="Create a strong password"
                  required
                  disabled={isLoading}
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm"
                  placeholder="Confirm your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  disabled={isLoading}
                >
                  <i className={showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </button>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                required
                disabled={isLoading}
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                I agree to the{' '}
                <button type="button" onClick={() => setShowTOS(true)} className="text-green-600 hover:text-green-700 font-medium cursor-pointer underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" onClick={() => setShowPrivacy(true)} className="text-green-600 hover:text-green-700 font-medium cursor-pointer underline">
                  Privacy Policy
                </button>
              </label>
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
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Social Registration */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleSocialSignup('Google')}
                disabled={isLoading}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:bg-gray-100 text-sm font-medium text-gray-500 transition-colors cursor-pointer"
              >
                <i className="ri-google-fill text-red-500 text-lg"></i>
                <span className="ml-2">Google</span>
              </button>
              <button 
                onClick={() => handleSocialSignup('Facebook')}
                disabled={isLoading}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:bg-gray-100 text-sm font-medium text-gray-500 transition-colors cursor-pointer"
              >
                <i className="ri-facebook-fill text-blue-600 text-lg"></i>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold cursor-pointer">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
          <h3 className="font-semibold text-gray-800 mb-4">With EcoKonek you can:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-sm"></i>
              </div>
              <span className="text-sm text-gray-700">Submit IT assets for evaluation &amp; disposition</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-sm"></i>
              </div>
              <span className="text-sm text-gray-700">Earn department eco-points and track CO&#8322; saved</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-green-600 text-sm"></i>
              </div>
              <span className="text-sm text-gray-700">Support CDC&apos;s sustainability goals under RA 9003</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Terms of Service Modal ===== */}
      {showTOS && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowTOS(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-file-shield-2-line text-green-600 text-xl"></i>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Terms of Service</h2>
              </div>
              <button onClick={() => setShowTOS(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-6 text-sm text-gray-700 leading-relaxed">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Internal Use Agreement &bull; Clark Development Corporation</p>

              <p>Welcome to <strong>EcoKonek</strong>, the official internal asset surrender and e-waste management platform of the Clark Development Corporation (CDC). By logging into and utilizing this system, you agree to comply with the following terms, as well as all existing CDC IT and Environmental policies.</p>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h3>
                <p>Access to EcoKonek is restricted to authorized CDC employees and designated Department Representatives. By accessing this platform, you acknowledge that you are acting on behalf of your assigned CDC Department and agree to use the system solely for its intended corporate purposes.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">2. User Responsibilities &amp; Accuracy</h3>
                <p>As a Department Representative, you are responsible for ensuring that all asset data submitted&mdash;including Property Numbers, Serial Numbers, Brands, Models, and Initial Condition assessments&mdash;is accurate and truthful. Falsifying corporate asset records is a violation of CDC policy and may result in disciplinary action.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Asset Accountability &amp; Data Wiping</h3>
                <p className="mb-2"><strong>Chain of Custody:</strong> Submitting an asset through EcoKonek sets its status to &ldquo;Pending Evaluation.&rdquo; Your department remains accountable for the physical asset until the IT Asset Manager officially processes the item and generates a Transfer of Accountability or Certificate of Disposal.</p>
                <p><strong>Data Security:</strong> Prior to surrendering any corporate electronic device (e.g., laptops, smartphones, hard drives), you must ensure that all sensitive corporate data, personal files, and passwords have been backed up and securely wiped in accordance with CDC IT protocols.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">4. Account Security</h3>
                <p>Your EcoKonek account is tied to your CDC corporate credentials. You are responsible for maintaining the confidentiality of your login information. Do not share your access credentials with unauthorized personnel.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">5. System Misuse</h3>
                <p>Unauthorized attempts to modify system workflows, access other departments&apos; asset records without clearance, or manipulate the Department Points leaderboard are strictly prohibited and may result in disciplinary action.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">6. Modifications</h3>
                <p>The CDC IT Department and Environmental Permits Division reserve the right to modify or update these terms, system workflows, or the point-allocation matrix at any time to align with organizational goals or regulatory requirements, including Republic Act 9003 (Ecological Solid Waste Management Act).</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <button onClick={() => setShowTOS(false)} className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-semibold transition-colors cursor-pointer">
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Privacy Policy Modal ===== */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPrivacy(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-shield-check-line text-blue-600 text-xl"></i>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Privacy &amp; Data Handling Policy</h2>
              </div>
              <button onClick={() => setShowPrivacy(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-6 text-sm text-gray-700 leading-relaxed">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Clark Development Corporation &bull; Internal Platform Policy</p>

              <p>This Privacy Policy outlines how the Clark Development Corporation (CDC) collects, uses, and protects data within the internal EcoKonek platform.</p>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Information We Collect</h3>
                <p className="mb-2">To facilitate the secure transfer and disposal of corporate assets, EcoKonek collects the following internal data:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>User Information:</strong> Your name, CDC corporate email address, and assigned CDC Department.</li>
                  <li><strong>Asset Information:</strong> Details regarding surrendered corporate property, including property tags, serial numbers, device history, and operational condition.</li>
                  <li><strong>System Usage Data:</strong> Timestamps of submissions, logins, and automated form generations for IT audit purposes.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">2. How We Use Your Information</h3>
                <p className="mb-2">Data collected within EcoKonek is strictly used for internal corporate operations:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>To route and process the surrender, reallocation (Reuse), or retirement (Dispose/Donate) of CDC physical assets.</li>
                  <li>To automatically generate official corporate documentation, such as the Transfer of Accountability and Certificate of Disposal.</li>
                  <li>To calculate your department&apos;s sustainability metrics (Department Points and CO&#8322; Saved) for the corporate leaderboard and CDC environmental reports.</li>
                  <li>To allow IT Asset Managers to communicate disposition outcomes back to your department.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Data Sharing &amp; Disclosure</h3>
                <p className="mb-2">EcoKonek is a closed, single-tenant corporate system.</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Internal Sharing:</strong> Asset records and department points are visible to CDC Management, the IT Department, and the Environmental Permits Division for auditing and reporting.</li>
                  <li><strong>External Sharing:</strong> CDC will never sell or share user data. If a functional device is routed for &ldquo;Donation&rdquo; to an external beneficiary, it will undergo a certified IT data wipe. The beneficiary receives the physical hardware only&mdash;no employee or corporate data is transferred.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">4. Data Security</h3>
                <p>CDC employs enterprise-grade security protocols to protect the EcoKonek database. Information is stored on secure, monitored servers. Access to the IT Asset Manager Disposition Workflow is strictly limited to cleared IT Asset Managers.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">5. Contact Information</h3>
                <p>If you experience technical issues, notice an error in your department&apos;s inventory, or have questions about corporate asset disposal protocols, please contact the <strong>CDC IT Department Helpdesk</strong> or the <strong>Environmental Permits Division</strong>.</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <button onClick={() => setShowPrivacy(false)} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-semibold transition-colors cursor-pointer">
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
