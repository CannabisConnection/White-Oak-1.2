export type OrderStatus = "pending" | "completed"

export type ServiceType =
  | "contractual-delivery"
  | "standard-biomass"
  | "frozen-biomass"
  | "hourly-van-rental"

export interface Order {
  id: string
  serviceDate: string
  manifestNumber: string
  boxCount: number
  largestBoxSize: {
    length: number
    width: number
    height: number
  }
  inventoryValue: number
  orderNumber: string
  notes?: string
  status: OrderStatus
  businessId: string
  createdAt: string
  serviceTypes: ServiceType[]
  retailAddress: string
  timestamp: string
  email: string
}

export interface OrderFormDataType {
  serviceDate: string
  manifestNumber: string
  boxCount: number
  boxLength: string
  boxWidth: string
  boxHeight: string
  inventoryValue: string
  orderNumber: string
  notes: string
  serviceTypes: ServiceType
  vanRentalDate: string
  arrivalTime: string
  arrivalPeriod: "AM" | "PM"
  departureTime: string
  departurePeriod: "AM" | "PM"
}
