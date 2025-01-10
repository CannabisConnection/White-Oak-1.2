import { useState } from "react"
import { BusinessFormData } from "../../types/business"
import { updateSubscriptionFirebaseUser } from "../../services/database/databaseHelper"

interface AccountInfoProps {
  businessInfo: BusinessFormData
  userId?: string
  refreshUserInfo: () => void
}

export default function AccountInfo({
  businessInfo,
  userId,
  refreshUserInfo,
}: AccountInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(businessInfo)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    if (userId) {
      updateSubscriptionFirebaseUser(userId, formData)
        .then(() => {
          refreshUserInfo()
          setIsEditing(false)
        })
        .catch(err => {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to update business information",
          )
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const handleCancel = () => {
    setFormData(businessInfo)
    setIsEditing(false)
    setError(null)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6">Account Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(businessInfo).map(key => (
          <div key={key} className="">
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700"
            >
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, str => str.toUpperCase())}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key as keyof typeof businessInfo]}
              onChange={handleChange}
              disabled={!isEditing}
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                isEditing ? "border-gray-300" : "border-gray-200 bg-gray-100"
              }`}
            />
          </div>
        ))}

        {isEditing ? (
          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Edit Info
          </button>
        )}
      </form>
    </div>
  )
}
