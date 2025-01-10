import { useState, useEffect } from "react"
import { X, Plus, Trash2 } from "lucide-react"
import { auth } from "../../firebase"
import OrderFormFields from "./OrderFormFields"
import VanRentalFields from "./VanRentalFields"
import OrderSuccessModal from "./OrderSuccessModal"
import { generateOrderNumber } from "../../utils/orderUtils"
import { OrderFormDataType, ServiceType } from "../../types/order"
import { addOrderToGoogleSheet } from "../../services/googleSheets"
import { useAuth } from "../../context/AuthContext"

interface NewOrderModalProps {
  onClose: () => void
  refetchOrders: () => void
}

const createInitialOrderData = (orderNumber: string): OrderFormDataType => ({
  serviceDate: "",
  manifestNumber: "",
  boxCount: 1,
  boxLength: "",
  boxWidth: "",
  boxHeight: "",
  inventoryValue: "",
  orderNumber,
  notes: "",
  serviceTypes: "contractual-delivery" as ServiceType,
  vanRentalDate: "",
  arrivalTime: "",
  arrivalPeriod: "AM" as "AM" | "PM",
  departureTime: "",
  departurePeriod: "AM" as "AM" | "PM",
})

export default function NewOrderModal({
  onClose,
  refetchOrders,
}: NewOrderModalProps) {
  const [firstOrderNumber] = useState(generateOrderNumber())
  const [orders, setOrders] = useState<OrderFormDataType[]>([
    createInitialOrderData(firstOrderNumber),
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const { businessInfo, user } = useAuth()

  // Check authentication and business info on mount
  useEffect(() => {
    if (!user || !businessInfo) {
      console.log("Auth check - User:", user, "Business Info:", businessInfo)
    }
  }, [user, businessInfo])

  const validateOrder = (order: OrderFormDataType) => {
    if (order.serviceTypes === "hourly-van-rental") {
      if (!order.vanRentalDate) return "Van rental date is required"
      if (!order.arrivalTime) return "Arrival time is required"
      if (!order.departureTime) return "Departure time is required"
    } else {
      if (!order.serviceDate) return "Service date is required"
      if (!order.manifestNumber) return "Manifest number is required"
      if (!order.boxLength || !order.boxWidth || !order.boxHeight)
        return "Box dimensions are required"
      if (!order.inventoryValue) return "Wholesale value is required"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Enhanced authentication check
    if (!user) {
      setError("Please log in to submit orders")
      return
    }

    if (!businessInfo) {
      setError("Business information not found. Please complete your business profile first")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Validate all orders first
      for (const order of orders) {
        const validationError = validateOrder(order)
        if (validationError) {
          throw new Error(validationError)
        }
      }

      // Submit all orders sequentially
      const promises = orders.map(order =>
        addOrderToGoogleSheet({
          ...businessInfo,
          email: user.email || businessInfo.email, // Fallback to businessInfo email if user email is null
        }, order),
      )
      await Promise.all(promises)

      setShowSuccess(true)
      refetchOrders()
    } catch (err) {
      console.error("Error creating orders:", err)
      setError(err instanceof Error ? err.message : "Failed to create orders")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setOrders(prevOrders => {
      const newOrders = [...prevOrders]
      newOrders[index] = {
        ...newOrders[index],
        [name]: value,
      }
      return newOrders
    })
  }

  const handleServiceTypeChange = (index: number, type: ServiceType) => {
    setOrders(prevOrders => {
      const newOrders = [...prevOrders]
      newOrders[index] = {
        ...newOrders[index],
        serviceTypes: type,
      }
      return newOrders
    })
  }

  const addOrder = () => {
    if (orders.length >= 200) {
      setError("Maximum limit of 200 orders reached")
      return
    }
    setOrders(prevOrders => [
      ...prevOrders,
      createInitialOrderData(firstOrderNumber),
    ])
  }

  const removeOrder = (index: number) => {
    if (orders.length === 1) {
      setError("Cannot remove the last order")
      return
    }
    setOrders(prevOrders => prevOrders.filter((_, i) => i !== index))
    setError(null)
  }

  if (showSuccess) {
    return (
      <OrderSuccessModal
        onClose={() => {
          setShowSuccess(false)
          onClose()
        }}
        orderCount={orders.length}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl mx-auto my-8 p-4">
        <div className="flex items-center justify-between p-3 border-b">
          <div>
            <h3 className="text-xl font-medium text-gray-900">
              New Order Request {orders.length > 1 && `(${orders.length} orders)`}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Order Number: {firstOrderNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {error && (
            <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="max-h-[60vh] overflow-y-auto px-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-4 relative bg-gray-50"
              >
                {orders.length > 1 && (
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={() => removeOrder(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
                <h4 className="text-lg font-medium mb-4">
                  Order {index + 1} of {orders.length}
                </h4>
                <OrderFormFields
                  formData={order}
                  onChange={e => handleChange(index, e)}
                  onServiceTypeChange={type => handleServiceTypeChange(index, type)}
                />
                {order.serviceTypes === "hourly-van-rental" && (
                  <VanRentalFields
                    vanRentalDate={order.vanRentalDate}
                    arrivalTime={order.arrivalTime}
                    arrivalPeriod={order.arrivalPeriod}
                    departureTime={order.departureTime}
                    departurePeriod={order.departurePeriod}
                    onChange={e => handleChange(index, e)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <button
              type="button"
              onClick={addOrder}
              disabled={orders.length >= 200 || loading}
              className="inline-flex items-center px-4 py-2 border border-green-600 rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Another Order
            </button>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading
                  ? `Creating ${orders.length} order${orders.length > 1 ? "s" : ""}...`
                  : `Create ${orders.length} order${orders.length > 1 ? "s" : ""}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
