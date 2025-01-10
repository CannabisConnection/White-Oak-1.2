/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { getOrderHistoryDocUrl, getOrderListDocUrl } from "./ApiConstant"
import { parseCSV } from "../utils/orderUtils"
import { Order } from "../types/order"

const transformData = (data: any): Order[] => {
  if (!data) {
    return []
  }
  return data.map(
    (item: any) =>
      ({
        boxCount: 0,
        businessId: item["DCP License Number"],
        createdAt: item["Date"],
        id: item["Order Number"],
        inventoryValue: item["Wholesale Inventory Value"],
        largestBoxSize: item["Size of Largest Box (LxWxH)"],
        manifestNumber: item["Manifest Number"],
        orderNumber: item["Order Number"],
        serviceDate: item["Date"] || item["(Van Rental) Service Date"],
        serviceTypes: item["Service Requested"],
        status: item["Status"],
        notes: item["(Van Rental) Notes"],
        retailAddress: item["Retail Address"],
        timestamp: item["Timestamp"],
        email: item["Email"],
      } as Order),
  )
}
export const fetchOrderListCSVData = () => {
  return axios
    .get(getOrderListDocUrl)
    .then(response => {
      const parsedCsvData = parseCSV(response.data)
      console.log(parsedCsvData)

      return Promise.resolve(transformData(parsedCsvData))
    })
    .catch(() => {
      return Promise.reject()
    })
}

export const fetchPastOrderHistoryCsvData = () => {
  return axios
    .get(getOrderHistoryDocUrl)
    .then(response => {
      const parsedCsvData = parseCSV(response.data)
      return Promise.resolve(transformData(parsedCsvData))
    })
    .catch(() => {
      return Promise.reject()
    })
}
