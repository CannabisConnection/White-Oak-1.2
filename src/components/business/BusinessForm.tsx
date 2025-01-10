/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom"
import { Globe } from "lucide-react"
import { useBusinessForm } from "../../hooks/useBusinessForm"
import BusinessFormFields from "./BusinessFormFields"

export default function BusinessForm() {
  const navigate = useNavigate()
  const { formData, handleChange, handleSubmit, error, loading } =
    useBusinessForm({
      onSuccess: () => navigate("/dashboard"),
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Globe className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Business Information
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please provide your business details
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <BusinessFormFields formData={formData} onChange={handleChange} />
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
