import { useState } from "react"
import { User, History } from "lucide-react"
import AccountInfo from "./AccountInfo"
import OrderHistory from "./OrderHistory"
import { useAuth } from "../../context/AuthContext"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account")

  const { businessInfo, refreshUserInfo } = useAuth()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab("account")}
              className={`${
                activeTab === "account"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } flex items-center whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              <User className="h-5 w-5 mr-2" />
              Account Info
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`${
                activeTab === "history"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } flex items-center whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              <History className="h-5 w-5 mr-2" />
              Order History
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "account" && (
            <AccountInfo
              key={businessInfo?.userId}
              userId={businessInfo?.userId}
              businessInfo={{
                address: businessInfo?.address || "",
                businessName: businessInfo?.businessName || "",
                dcpLicense: businessInfo?.dcpLicense || "",
                email: businessInfo?.email || "",
                phone: businessInfo?.phone || "",
              }}
              refreshUserInfo={refreshUserInfo}
            />
          )}
          {activeTab === "history" && <OrderHistory />}
        </div>
      </div>
    </div>
  )
}
