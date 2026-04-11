'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const deviceCategories = [
  { id: 'smartphone', name: 'Smartphone' },
  { id: 'laptop', name: 'Laptop' },
  { id: 'tablet', name: 'Tablet' },
  { id: 'desktop', name: 'Desktop' },
  { id: 'appliance', name: 'Small Appliance' },
  { id: 'battery', name: 'Battery' },
  { id: 'cable', name: 'Cables/Chargers' },
  { id: 'headphones', name: 'Headphones' },
];

function DeviceConditionPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams?.get('category') || '';
  const [condition, setCondition] = useState<'working' | 'broken' | ''>('');

  const categoryLabel = useMemo(() => {
    return deviceCategories.find((item) => item.id === category)?.name || category;
  }, [category]);

  if (!category || category === 'hazardous-consumables') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-lg w-full">
          <i className="ri-information-line text-4xl text-green-600"></i>
          <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-2">Select a Device Category First</h1>
          <p className="text-gray-600 mb-6">Please choose a standard hardware category before assessing condition.</p>
          <button
            onClick={() => router.push('/donate')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold"
          >
            Back to Category Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Device Condition</h1>
          <p className="text-gray-600 mt-2">
            Selected Category: <span className="font-semibold text-gray-800">{categoryLabel}</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <button
              type="button"
              onClick={() => setCondition('working')}
              className={`p-8 rounded-xl border-2 text-left transition-all ${
                condition === 'working'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center mb-5">
                <i className="ri-checkbox-circle-line text-2xl"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Working</h2>
              <p className="text-gray-600">Powers on and functions normally.</p>
            </button>

            <button
              type="button"
              onClick={() => setCondition('broken')}
              className={`p-8 rounded-xl border-2 text-left transition-all ${
                condition === 'broken'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center mb-5">
                <i className="ri-error-warning-line text-2xl"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Defective</h2>
              <p className="text-gray-600">Damaged or no longer functional.</p>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button
              type="button"
              onClick={() => router.push('/donate')}
              className="px-6 py-3 rounded-full font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!condition}
              onClick={() => router.push(`/donate?category=${encodeURIComponent(category)}&condition=${condition}`)}
              className="px-6 py-3 rounded-full font-semibold bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Submission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DeviceConditionPage() {
  return (
    <Suspense fallback={null}>
      <DeviceConditionPageContent />
    </Suspense>
  );
}
