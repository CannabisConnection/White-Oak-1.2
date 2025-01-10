/* eslint-disable @typescript-eslint/no-explicit-any */
// Format: WOB-YYYYMMDD-XXXX where X is a random number
export function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")

  return `WOB-${year}${month}${day}-${random}`
}

export function parseCSV(csvText: any) {
  const rows = csvText.split("\n").filter(Boolean) // Split data into rows and filter out empty lines
  const headers = rows[0].split(",") // Extract headers from the first row

  // Map remaining rows into objects based on headers
  const parsedData = rows.slice(1).map((row: any) => {
    const values = row.split(",") // Split row into values
    const entry: any = {}

    headers.forEach((header: any, index: number) => {
      entry[header.trim()] = values[index]?.trim() || "" // Map headers to corresponding values
    })

    return entry
  })

  return parsedData
}

export const SERVICE_TYPES = [
  {
    id: "contractual-delivery",
    label: "Same-Day Contractual Delivery (4+ Days Lead Time)",
  },
  {
    id: "standard-biomass",
    label: "Same-Day Standard Biomass Delivery (4+ Days Lead Time)",
  },
  {
    id: "frozen-biomass",
    label: "Same-Day Frozen Biomass Delivery (4+ Days Lead Time)",
  },
  {
    id: "hourly-van-rental",
    label: "Hourly Van Rental (3+ Days Lead Time)",
  },
]
