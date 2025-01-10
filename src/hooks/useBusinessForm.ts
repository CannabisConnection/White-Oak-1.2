import { useState, ChangeEvent, FormEvent } from "react"
import { BusinessFormData } from "../types/business"
import { useLocation } from "react-router-dom"
import { UserInfoType } from "../types/user"
import { updateSubscriptionFirebaseUser } from "../services/database/databaseHelper"
// import { addBusinessToSheet } from '../services/googleSheets';

interface UseBusinessFormProps {
  onSuccess: () => void
}

export function useBusinessForm({ onSuccess }: UseBusinessFormProps) {
  const [formData, setFormData] = useState<BusinessFormData>({
    businessName: "",
    address: "",
    phone: "",
    dcpLicense: "",
    email: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  console.log("DEBUG:useBusinessForm", location)
  const userInfo = location.state as UserInfoType
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    updateSubscriptionFirebaseUser(userInfo.userId, formData)
      .then(() => {
        onSuccess()
      })
      .catch(err => {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to save business information",
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
    loading,
  }
}
