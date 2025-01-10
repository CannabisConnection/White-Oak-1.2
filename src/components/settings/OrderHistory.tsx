import { useState } from "react"
import { useOrderHistory } from "../../hooks/useOrderHistory"

export default function OrderHistory() {
  const { orders, error } = useOrderHistory()
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  const handleExport = () => {
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.serviceDate).getTime()
      const start = startDate ? new Date(startDate).getTime() : -Infinity
      const end = endDate ? new Date(endDate).getTime() : Infinity
      return orderDate >= start && orderDate <= end
    })

    const csvContent = [
      ["Order Number", "Service Date", "Box Count", "Value"],
      ...filteredOrders.map(order => [
        order.orderNumber,
        new Date(order.serviceDate).toLocaleDateString(),
        order.boxCount,
        `$${order.inventoryValue.toLocaleString()}`,
      ]),
    ]
      .map(row => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "order_history.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Order History</h3>
        <p className="mt-1 text-sm text-gray-500">
          View all your past orders and their details
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <input
          type="date"
          className="border rounded px-3 py-2 text-sm"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border rounded px-3 py-2 text-sm"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <button
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white 
    ${
      orders.length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    }
  `}
          onClick={handleExport}
          disabled={orders.length === 0}
        >
          Export to CSV
        </button>
      </div>
    </div>
  )
}
