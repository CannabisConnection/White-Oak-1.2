export interface BusinessFormData {
  businessName: string
  address: string
  phone: string
  dcpLicense: string
  email: string
}

export interface Business extends BusinessFormData {
  userId: string
  createdAt: string
}
