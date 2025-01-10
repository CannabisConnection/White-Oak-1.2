import { useState } from "react"
import { Plus, RefreshCwIcon } from "lucide-react"
import NewOrderModal from "./NewOrderModal"
import OrdersTable from "./OrdersTable"
import OrderStats from "./OrderStats"
import { useOrders } from "../../hooks/useOrders"

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { orders, loading, error, refetchOrders } = useOrders()

  return (
    <div className="space-y-6 p-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          <h3 className="text-lg font-medium">Error Loading Orders</h3>
          <p className="mt-1">{error}</p>
          <button
            onClick={refetchOrders}
            className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Delivery Dashboard</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Order
        </button>
      </div>

      <OrderStats orders={orders} />
      <div className="flex justify-end">
        <button
          onClick={refetchOrders}
          className="inline-flex items-center px-4 py-2 border border-green-600  text-sm font-medium rounded-md text-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <RefreshCwIcon className="h-5 w-5 mr-2" />
          Refresh
        </button>
      </div>
      <OrdersTable orders={orders} loading={loading} />

      {isModalOpen && (
        <NewOrderModal
          onClose={() => setIsModalOpen(false)}
          refetchOrders={refetchOrders}
        />
      )}
    </div>
  )
}
