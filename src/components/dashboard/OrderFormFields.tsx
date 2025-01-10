import { ChangeEvent } from "react"
import { OrderFormDataType, ServiceType } from "../../types/order"
import { SERVICE_TYPES } from "../../utils/orderUtils"

interface OrderFormFieldsProps {
  formData: OrderFormDataType
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onServiceTypeChange: (type: ServiceType) => void
}

export default function OrderFormFields({
  formData,
  onChange,
  onServiceTypeChange,
}: OrderFormFieldsProps) {
  const isVanRental = formData.serviceTypes.includes("hourly-van-rental")

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Type of service requested (Select all that apply)
        </label>
        <div className="space-y-2">
          {SERVICE_TYPES.map(type => (
            <label key={type.id} className="flex items-start">
              <input
                type="radio"
                checked={formData.serviceTypes.includes(type.id as ServiceType)}
                onChange={() => onServiceTypeChange(type.id as ServiceType)}
                className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {!isVanRental && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="serviceDate"
                className="block text-xs font-medium text-gray-700"
              >
                Service Date
              </label>
              <input
                type="date"
                id="serviceDate"
                name="serviceDate"
                required={!isVanRental}
                value={formData.serviceDate}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="manifestNumber"
                className="block text-xs font-medium text-gray-700"
              >
                Manifest #
              </label>
              <input
                type="text"
                id="manifestNumber"
                name="manifestNumber"
                required={!isVanRental}
                value={formData.manifestNumber}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="orderNumber"
                className="block text-xs font-medium text-gray-700"
              >
                Order #
              </label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                required
                value={formData.orderNumber}
                readOnly
                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm bg-gray-50 shadow-sm"
              />
            </div>

            <div>
              <label
                htmlFor="boxCount"
                className="block text-xs font-medium text-gray-700"
              >
                Box Count
              </label>
              <input
                type="number"
                id="boxCount"
                name="boxCount"
                min="1"
                required={!isVanRental}
                value={formData.boxCount}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">
              Largest Box Size (inches)
            </label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              <input
                type="number"
                id="boxLength"
                name="boxLength"
                placeholder="L"
                min="1"
                required={!isVanRental}
                value={formData.boxLength}
                onChange={onChange}
                className="block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              />
              <input
                type="number"
                id="boxWidth"
                name="boxWidth"
                placeholder="W"
                min="1"
                required={!isVanRental}
                value={formData.boxWidth}
                onChange={onChange}
                className="block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              />
              <input
                type="number"
                id="boxHeight"
                name="boxHeight"
                placeholder="H"
                min="1"
                required={!isVanRental}
                value={formData.boxHeight}
                onChange={onChange}
                className="block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="inventoryValue"
              className="block text-xs font-medium text-gray-700"
            >
              Wholesale Value ($)
            </label>
            <input
              type="number"
              id="inventoryValue"
              name="inventoryValue"
              min="0"
              step="0.01"
              required={!isVanRental}
              value={formData.inventoryValue}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
            />
          </div>
        </>
      )}

      <div>
        <label
          htmlFor="notes"
          className="block text-xs font-medium text-gray-700"
        >
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          value={formData.notes}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
        />
      </div>
    </div>
  )
}
