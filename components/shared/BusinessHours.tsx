/**
 * Example: Business Hours Component
 * Shows how to display business hours from settings
 */

import { getPublicSettings, isBusinessOpen } from '@/lib/api/settings';
import { Clock } from 'lucide-react';

export default async function BusinessHours() {
  const settings = await getPublicSettings();
  const isOpen = isBusinessOpen(settings.businessHours);

  if (!settings.businessHours || settings.businessHours.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Business Hours</h3>
      </div>

      {/* Current Status */}
      <div className="mb-4 p-3 rounded-lg bg-gray-50">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={`font-medium ${isOpen ? 'text-green-700' : 'text-red-700'}`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Hours List */}
      <div className="space-y-2">
        {settings.businessHours.map((day) => (
          <div
            key={day.day}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <span className="font-medium text-gray-700">{day.day}</span>
            <span className={`text-sm ${day.isOpen ? 'text-gray-900' : 'text-gray-500'}`}>
              {day.isOpen ? `${day.openTime} - ${day.closeTime}` : 'Closed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
