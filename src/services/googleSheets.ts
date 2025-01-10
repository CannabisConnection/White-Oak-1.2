import axios from "axios"
import { OrderFormDataType } from "../types/order"
import { GOOGLE_SHEET_API } from "./ApiConstant"
import { UserInfoType } from "../types/user"
import { SERVICE_TYPES } from "../utils/orderUtils"

export const addOrderToGoogleSheet = async (
  businessInfo: UserInfoType,
  orderData: OrderFormDataType,
) => {
  try {
    const formEle = new FormData()
    formEle.append("date", new Date().toISOString())
    formEle.append("email", businessInfo.email)
    formEle.append("phoneNumber", businessInfo.phone)
    formEle.append("dcpLicense", businessInfo.dcpLicense)
    formEle.append("status", "pending")
    formEle.append(
      "serviceRequested",
      orderData.serviceTypes === "hourly-van-rental"
        ? "Hourly Van Rental"
        : SERVICE_TYPES.find(type => type.id === orderData.serviceTypes)?.label ||
            "",
    )
    formEle.append(
      "manifestNumber",
      orderData.serviceTypes === "hourly-van-rental"
        ? ""
        : orderData.manifestNumber,
    )
    formEle.append("retailAddress", businessInfo.address)
    formEle.append(
      "noOfBox",
      orderData.serviceTypes === "hourly-van-rental"
        ? ""
        : orderData.boxCount.toString(),
    )
    formEle.append(
      "sizeOfLargest",
      orderData.serviceTypes === "hourly-van-rental"
        ? ""
        : `${orderData.boxHeight} x ${orderData.boxLength} x ${orderData.boxWidth}`,
    )
    formEle.append(
      "wholeSaleInventoryValue",
      orderData.serviceTypes === "hourly-van-rental"
        ? ""
        : orderData.inventoryValue,
    )
    formEle.append("orderNumber", orderData.orderNumber)
    formEle.append("timeStamp", new Date().toISOString())
    formEle.append(
      "vanRentalNotes",
      orderData.serviceTypes === "hourly-van-rental" ? orderData.notes : "",
    )
    formEle.append(
      "vanRentalServiceDate",
      orderData.serviceTypes === "hourly-van-rental"
        ? orderData.vanRentalDate
        : orderData.serviceDate,
    )
    formEle.append(
      "vanRentalArrivalTime",
      orderData.serviceTypes === "hourly-van-rental"
        ? `${orderData.arrivalTime} ${orderData.arrivalPeriod}`
        : "",
    )
    formEle.append(
      "vanRentalDepartureTime",
      orderData.serviceTypes === "hourly-van-rental"
        ? `${orderData.departureTime} ${orderData.departurePeriod}`
        : "",
    )
    formEle.append("type", "order")

    const response = await axios.post(GOOGLE_SHEET_API, formEle)
    return response.data
  } catch (error) {
    console.error("Error adding order to Google Sheet:", error)
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to add order to Google Sheet",
    )
  }
}
