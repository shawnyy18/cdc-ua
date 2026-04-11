"use client"

import React from 'react'

type Props = {
  id: string
  title: string
  subtitle: string
  border: string
  icon: string
  onStart: () => void
}

export default function ModuleCard({ id, title, subtitle, border, icon, onStart }: Props) {
  return (
    <div className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden ${border}`}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <i className={`${icon} text-xl`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={onStart}
            className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-medium"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  )
}
