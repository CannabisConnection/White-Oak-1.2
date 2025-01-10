import { useState, useEffect, useCallback } from "react"
import { Order } from "../types/order"
import { auth } from "../firebase"
import { fetchOrderListCSVData } from "../services/orderSheets"

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    if (!auth.currentUser) return

    setLoading(true)
    setError(null)

    try {
      const result = await fetchOrderListCSVData()
      const order = result.filter(
        item => item.email === auth.currentUser?.email,
      )
      setOrders(order)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const refetchOrders = () => {
    fetchOrders()
  }
  return {
    orders,
    loading,
    error,
    refetchOrders,
  }
}
