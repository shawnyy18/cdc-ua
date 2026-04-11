
'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Monitor, 
  Battery, 
  Cable, 
  Printer, 
  Headphones 
} from 'lucide-react';

// Animated counter hook for smooth number transitions
function useAnimatedCounter(end: number, duration: number = 2000, isLoading: boolean) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLoading || end === 0) {
      setCount(0);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    startTimeRef.current = null;
    requestAnimationFrame(animate);
  }, [end, duration, isLoading]);

  return count;
}

export default function Home() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalDevices: 0,
    totalCO2Saved: 0,
    activeUsers: 0,
    partnerCenters: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [statsError, setStatsError] = useState(false);
  // Synchronously check localStorage so we know BEFORE the first paint whether
  // to show the hero or a redirect state — this eliminates the hero-page flicker
  // for authenticated users navigating to/from the dashboard.
  const [isCheckingAuth, setIsCheckingAuth] = useState(() => {
    if (typeof window === 'undefined') return false; // SSR: always show hero
    try {
      return !!(
        localStorage.getItem('ecokonek_token') &&
        localStorage.getItem('ecokonek_user')
      );
    } catch {
      return false;
    }
  });

  // Animated counters
  const animatedDevices = useAnimatedCounter(stats.totalDevices, 2000, isLoading);
  const animatedCO2 = useAnimatedCounter(stats.totalCO2Saved, 2000, isLoading);
  const animatedUsers = useAnimatedCounter(stats.activeUsers, 2000, isLoading);

  useEffect(() => {
    // Auth check: redirect logged-in users immediately (localStorage is synchronous)
    try {
      const token = localStorage.getItem('ecokonek_token');
      const userData = localStorage.getItem('ecokonek_user');
      setIsLoggedIn(!!token && !!userData);
      if (token && userData) {
        router.push('/dashboard');
        return; // Skip stats fetch — user won't see this page
      }
    } catch (e) {
      setIsLoggedIn(false);
    }
    // Not authenticated — reveal the hero page and start fetching stats
    setIsCheckingAuth(false);
    fetchRealStats();
  }, []);



  const fetchRealStats = async () => {
    try {
      // Use local API endpoint that queries Supabase directly
      const response = await fetch('/api/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats({
          totalDevices: data.totalDevices || 0,
          totalCO2Saved: Math.round((data.totalCO2Saved || 0) * 100) / 100,
          activeUsers: data.activeUsers || 0,
          partnerCenters: data.partnerCenters || 0
        });
        setStatsError(false);
      } else {
        console.error('Stats API returned error:', response.status);
        setStatsError(true);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStatsError(true);
    } finally {
      setIsLoading(false);
    }
  };


  // Authenticated users: show a neutral screen while the redirect fires.
  // Non-authenticated users: isCheckingAuth is already false, hero renders immediately.
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.2)), url('https://readdy.ai/api/search-image?query=Modern%20eco-friendly%20technology%20recycling%20center%20with%20green%20plants%2C%20sustainable%20electronic%20waste%20management%20facility%2C%20clean%20minimalist%20environment%20with%20recycled%20devices%20and%20solar%20panels%2C%20bright%20natural%20lighting%2C%20professional%20photography%20style%2C%20shallow%20depth%20of%20field&width=1920&height=1080&seq=hero-bg&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <i className="ri-recycle-line text-white text-xl"></i>
              </div>
              <h1 className="text-4xl font-bold text-green-600 tracking-wide">EcoKonek</h1>
            </div>
            
            <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Smart E-Waste Management for
              <span className="text-green-500"> Clark Development Corporation</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              EcoKonek streamlines e-waste tracking and disposal for the CDC IT Department. Departments submit surplus or defective IT equipment, administrators assess and route devices for reuse, donation, or certified disposal—ensuring compliance, accountability, and environmental responsibility across the Clark Freeport Zone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/donate" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer text-center">
                Submit a Record
              </Link>
              <Link href="/login" className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 whitespace-nowrap cursor-pointer text-center">
                Access Dashboard
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-green-600">
                  {isLoading ? (
                    <span className="inline-block w-12 h-8 bg-green-100 rounded animate-pulse"></span>
                  ) : statsError ? (
                    <span className="text-gray-400">--</span>
                  ) : (
                    animatedDevices.toLocaleString()
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">Devices Donated</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-green-600">
                  {isLoading ? (
                    <span className="inline-block w-12 h-8 bg-green-100 rounded animate-pulse"></span>
                  ) : statsError ? (
                    <span className="text-gray-400">--</span>
                  ) : (
                    animatedCO2.toLocaleString()
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">kg CO₂ Saved</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-green-600">
                  {isLoading ? (
                    <span className="inline-block w-12 h-8 bg-green-100 rounded animate-pulse"></span>
                  ) : statsError ? (
                    <span className="text-gray-400">--</span>
                  ) : (
                    animatedUsers.toLocaleString()
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">How EcoKonek Works at CDC</h3>
            <p className="text-xl text-gray-600">A streamlined workflow for IT asset disposition across departments</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-file-add-line text-white text-2xl"></i>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">1. Department Submits Record</h4>
              <p className="text-gray-600">CDC departments log surplus or end-of-life IT equipment—specifying the item type and entering device data. Points are tracked per department.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-search-eye-line text-white text-2xl"></i>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">2. Admin Reviews &amp; Assesses</h4>
              <p className="text-gray-600">The IT admin receives a notification, reviews the record, and classifies the item as a working device, defective device, or waste component.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-route-line text-white text-2xl"></i>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">3. Reuse or Donate</h4>
              <p className="text-gray-600">Working devices are transferred to another department (reuse) or donated to a beneficiary committee, with a printed Transfer of Accountability form.</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-delete-bin-6-line text-white text-2xl"></i>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">4. Proper Disposal</h4>
              <p className="text-gray-600">Defective devices and waste components go through the disposal workflow—generating disposal forms and a Certificate of Disposal for compliance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Device Categories */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">What IT Assets Are Tracked?</h3>
            <p className="text-xl text-gray-600">CDC IT Department manages a full range of electronic equipment</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Laptop, name: 'Laptops & Desktops', impact: '50-100 pts' },
              { icon: Monitor, name: 'Monitors & Displays', impact: '30-60 pts' },
              { icon: Printer, name: 'Printers & Scanners', impact: '40-80 pts' },
              { icon: Smartphone, name: 'Mobile Devices', impact: '25-50 pts' },
              { icon: Cable, name: 'Cables & Peripherals', impact: '5-10 pts' },
              { icon: Battery, name: 'UPS & Batteries', impact: '20-40 pts' },
              { icon: Tablet, name: 'Networking Gear', impact: '30-60 pts' },
              { icon: Headphones, name: 'Audio/Video Equipment', impact: '15-30 pts' }
            ].map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center border border-gray-100">
                  <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-green-500 w-8 h-8" />
                  </div>
                  <h5 className="font-semibold text-gray-800 mb-2">{category.name}</h5>
                  <p className="text-sm text-green-600 font-medium">{category.impact}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-20 bg-green-500">
        <div className="container mx-auto px-6 text-center text-white">
          <h3 className="text-4xl font-bold mb-6">CDC IT Department Impact</h3>
          <p className="text-xl mb-12 opacity-90">Tracking responsible e-waste management across the Clark Freeport Zone</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold">
                {isLoading ? '...' : stats.totalDevices.toLocaleString()}
              </div>
              <div className="text-lg opacity-80">Devices Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold">
                {isLoading ? '...' : stats.totalCO2Saved.toLocaleString()}
              </div>
              <div className="text-lg opacity-80">kg CO₂ Prevented</div>
            </div>
            <div>
              <div className="text-4xl font-bold">
                {isLoading ? '...' : stats.activeUsers.toLocaleString()}
              </div>
              <div className="text-lg opacity-80">Departments Active</div>
            </div>
            <div>
              <div className="text-4xl font-bold">
                {isLoading ? '...' : stats.partnerCenters}
              </div>
              <div className="text-lg opacity-80">Disposal Certificates</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-gray-800 mb-6">Ready to Manage Your Department's E-Waste?</h3>
          <p className="text-xl text-gray-600 mb-8">Log in to submit records, track disposals, and keep CDC compliant</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer">
              Register Your Department
            </Link>
            <Link href="/donate" className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 whitespace-nowrap cursor-pointer">
              Submit a Record
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <i className="ri-recycle-line text-white"></i>
                </div>
                <h4 className="text-xl font-['Pacifico'] text-green-400">EcoKonek</h4>
              </div>
              <p className="text-gray-400">Powering responsible e-waste management for the Clark Development Corporation IT Department.</p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Platform</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/donate" className="hover:text-white transition-colors cursor-pointer">Donate Device</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors cursor-pointer">Track Impact</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors cursor-pointer">Join Community</Link></li>
                <li><Link href="/donate" className="hover:text-white transition-colors cursor-pointer">Drop-off Centers</Link></li>
              </ul>
            </div>
            
            {/* Resources removed per design request */}
            
            <div>
              <h5 className="font-semibold mb-4">Connect</h5>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                  <i className="ri-facebook-fill"></i>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                  <i className="ri-twitter-fill"></i>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                  <i className="ri-instagram-fill"></i>
                </div>
                {/* LinkedIn (opens in new tab) */}
                <a
                  href="https://linkedin.com/in/shawnashlee1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Shawn Ashlee on LinkedIn"
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <i className="ri-linkedin-box-fill text-white"></i>
                </a>
              </div>
              {isLoggedIn && (
                <div className="mt-4">
                  <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                    Made with The Bun Squad
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EcoKonek — Clark Development Corporation IT Department. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
