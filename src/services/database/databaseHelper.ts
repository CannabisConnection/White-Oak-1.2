import {
  addDoc,
  collection,
  updateDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore"
import { db } from "../../firebase"
import { User } from "firebase/auth"
import { BusinessFormData } from "../../types/business"
import { UserInfoType } from "../../types/user"

export const createSubscriptionFirebaseUser = async (user: User) => {
  try {
    console.log("DEBUG:createSubscriptionFirebaseUser", user)

    // Query to check if a user already exists with the same email
    const usersCollection = collection(db, "users")
    const userQuery = query(
      usersCollection,
      where("email", "==", user.email || ""),
    )
    const querySnapshot = await getDocs(userQuery)

    if (!querySnapshot.empty) {
      // User already exists
      const existingDoc = querySnapshot.docs[0]
      return Promise.resolve({
        success: true,
        user: { ...existingDoc.data(), userId: existingDoc.id },
      })
    }

    // Prepare initial user data
    const newUser = {
      displayName: user.displayName || "",
      email: user.email || "",
      businessName: "",
      address: "",
      phone: user.phoneNumber || "",
      dcpLicense: "",
      businessEmail: "",
    }

    // Add the user to Firestore and let Firestore generate a unique document ID
    const docRef = await addDoc(usersCollection, newUser)

    // Update the document to include the generated ID in the userId field
    await updateDoc(docRef, { userId: docRef.id })
    console.log("DEBUG:createSubscriptionFirebaseUser", docRef.id)
    return Promise.resolve({
      success: true,
      user: { ...newUser, userId: docRef.id },
    })
  } catch (error) {
    console.log("error", error)
    // Handle any errors that might occur during the process
    return Promise.reject({
      success: false,
      error: "An error occurred while adding or retrieving the user",
    })
  }
}

/**
 * Updates a user's subscription data in Firestore.
 *
 * @param userId - The unique ID of the user document.
 * @param data - The new business data to update.
 * @returns A promise resolving to a success or failure message.
 */
export const updateSubscriptionFirebaseUser = async (
  userId: string,
  data: BusinessFormData,
) => {
  try {
    // Reference to the user's document in Firestore
    const userDocRef = doc(db, "users", userId)

    // Update the user's data in Firestore
    await updateDoc(userDocRef, {
      businessName: data.businessName,
      address: data.address,
      phone: data.phone,
      dcpLicense: data.dcpLicense,
      businessEmail: data.email,
    })

    return Promise.resolve({
      success: true,
      message: "User data updated successfully",
    })
  } catch (error) {
    console.error("Error updating user data:", error)
    return Promise.reject({
      success: false,
      error: "An error occurred while updating the user data",
    })
  }
}

export const getUserInfoByEmailId = async (email: string) => {
  try {
    const usersCollection = collection(db, "users")
    const userQuery = query(usersCollection, where("email", "==", email))
    const querySnapshot = await getDocs(userQuery)

    if (!querySnapshot.empty) {
      const existingDoc = querySnapshot.docs[0]
      return Promise.resolve({
        success: true,
        user: { ...existingDoc.data(), userId: existingDoc.id } as UserInfoType,
      })
    }

    return Promise.reject({
      success: false,
      error: "User not found",
    })
  } catch (error) {
    console.error("Error getting user data:", error)
    return Promise.reject({
      success: false,
      error: "An error occurred while getting the user data",
    })
  }
}
