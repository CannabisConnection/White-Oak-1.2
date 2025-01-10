import { useState, useEffect } from "react"
import { Order } from "../types/order"
import { auth } from "../firebase"
import { fetchPastOrderHistoryCsvData } from "../services/orderSheets"

export function useOrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrderHistory() {
      if (!auth.currentUser) return

      try {
        const fetchedOrders = await fetchPastOrderHistoryCsvData()
        const orders = fetchedOrders.filter(
          item => item.email === auth.currentUser?.email,
        )
        setOrders(orders)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch order history",
        )
      } finally {
        setLoading(false)
      }
    }

    fetchOrderHistory()
  }, [])

  return { orders, loading, error }
}
