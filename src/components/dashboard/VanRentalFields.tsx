import { ChangeEvent } from 'react';

interface VanRentalFieldsProps {
  vanRentalDate: string;
  arrivalTime: string;
  arrivalPeriod: 'AM' | 'PM';
  departureTime: string;
  departurePeriod: 'AM' | 'PM';
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function VanRentalFields({
  vanRentalDate,
  arrivalTime,
  arrivalPeriod,
  departureTime,
  departurePeriod,
  onChange,
}: VanRentalFieldsProps) {
  return (
    <div className="space-y-4 border-t border-gray-200 pt-4 mt-4">
      <div>
        <label htmlFor="vanRentalDate" className="block text-xs font-medium text-gray-700">
          Van Rental Requested Service Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="vanRentalDate"
          name="vanRentalDate"
          value={vanRentalDate}
          onChange={onChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Arrival and Departure times from your location <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="arrivalTime" className="block text-xs font-medium text-gray-700">
              Requested arrival time <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                id="arrivalTime"
                name="arrivalTime"
                placeholder="HH:MM"
                pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                value={arrivalTime}
                onChange={onChange}
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              />
              <select
                name="arrivalPeriod"
                value={arrivalPeriod}
                onChange={onChange}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="departureTime" className="block text-xs font-medium text-gray-700">
              Requested departure time <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                id="departureTime"
                name="departureTime"
                placeholder="HH:MM"
                pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                value={departureTime}
                onChange={onChange}
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              />
              <select
                name="departurePeriod"
                value={departurePeriod}
                onChange={onChange}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
