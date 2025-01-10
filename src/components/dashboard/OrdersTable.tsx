import { Order, OrderStatus } from "../../types/order"

interface OrdersTableProps {
  orders: Order[]
  loading: boolean
}

export default function OrdersTable({ orders, loading }: OrdersTableProps) {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Filter out cancelled orders
  const activeOrders = orders.filter(order => order.status === "pending")

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="min-w-full divide-y divide-gray-200">
        <div className="bg-gray-50 px-6 py-3">
          <div className="grid grid-cols-7 gap-4">
            <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </div>
            <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service Request
            </div>
            <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </div>
            <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </div>
            <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </div>
            <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </div>
          </div>
        </div>

        <div className="bg-white divide-y divide-gray-200">
          {loading ? (
            <div className="px-6 py-4 text-center">Loading...</div>
          ) : activeOrders.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-500">
              No orders found
            </div>
          ) : (
            activeOrders.map(order => (
              <div key={order.id} className="grid grid-cols-7 gap-4 px-6 py-4">
                <div className="text-sm text-gray-900">{order.id}</div>
                <div className="text-sm text-gray-900">
                  {order.serviceTypes}
                </div>
                <div className="text-sm text-gray-900">
                  {order.retailAddress}
                </div>
                <div className="text-sm text-gray-900">
                  {new Date(order.serviceDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-900">{order.timestamp}</div>
                <div className="text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
