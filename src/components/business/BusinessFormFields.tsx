import { ChangeEvent } from "react"
import { BusinessFormData } from "../../types/business"

interface BusinessFormFieldsProps {
  formData: BusinessFormData
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function BusinessFormFields({
  formData,
  onChange,
}: BusinessFormFieldsProps) {
  return (
    <>
      <div>
        <label
          htmlFor="businessName"
          className="block text-sm font-medium text-gray-700"
        >
          Business Name
        </label>
        <input
          id="businessName"
          name="businessName"
          type="text"
          required
          value={formData.businessName}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          required
          value={formData.address}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
        />
      </div>

      <div>
        <label
          htmlFor="dcpLicense"
          className="block text-sm font-medium text-gray-700"
        >
          DCP License #
        </label>
        <input
          id="dcpLicense"
          name="dcpLicense"
          type="text"
          required
          value={formData.dcpLicense}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Business Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
        />
      </div>
    </>
  )
}
