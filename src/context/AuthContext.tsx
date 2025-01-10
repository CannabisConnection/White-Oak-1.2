/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged, User } from "firebase/auth"
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react"
import { auth } from "../firebase"
import { getUserInfoByEmailId } from "../services/database/databaseHelper"
import { UserInfoType } from "../types/user"

interface AuthContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean
  businessInfo: UserInfoType | null
  refreshUserInfo: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [businessInfo, setBusinessInfo] = useState<UserInfoType | null>(null)

  const fetchUserInfo = async () => {
    if (!user?.email) {
      return
    }
    try {
      const res = await getUserInfoByEmailId(user.email)
      console.log("Debug:fetchUserInfo", res)
      setBusinessInfo(res.user)
    } catch (error) {
      console.error("Error fetching user info:", error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser?.email) {
        await fetchUserInfo()
      } else {
        setBusinessInfo(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        businessInfo,
        refreshUserInfo: fetchUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
