import { app, auth, db } from "../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { deleteApp } from "firebase/app";

// This extends the Window interface to include FirebaseService2
declare global {
  interface Window {
    FirebaseService2: typeof FirebaseService2;
  }
}

class FirebaseService2 {
  // @ts-ignore
  private static settings: any; // Adjust the type as needed
  private static readonly cloudFunctionUrl: string =
    import.meta.env.VITE_APP_API_COMPLETE_USER_PROFILE || "";
  private static readonly cloudFunctionUrlAuthToken: string =
    import.meta.env.VITE_APP_GENERATE_COMETCHAT_AUTH_TOKEN || "";

  public static async init(settings?: any): Promise<any> {
    FirebaseService2.settings = settings;
    return Promise.resolve();
  }

  static async getAuthToken(): Promise<string> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No authenticated user found.");
      }

      // Get the user's ID token
      const idToken = await user.getIdToken();

      // Make an HTTP request to the Cloud Function to get auth token
      const response = await fetch(FirebaseService2.cloudFunctionUrlAuthToken, {
        method: "POST", // or 'GET', depending on your Cloud Function's setup
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(`${response.status} - ${errorJson.message}`);
      }

      // Assuming the cloud function returns the auth token directly in the response body
      const responseData = await response.json();
      console.log("Auth token fetched successfully:", responseData);
      return responseData.data.data.authToken; // Adjust based on the actual response structure
    } catch (error) {
      console.error("Error fetching CometChat auth token:", error);
      throw error; // Re-throw the error to handle it outside or log it
    }
  }

  public static async completeUserProfile(): Promise<void> {
    try {
      console.log("Completing user profile...");
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No authenticated user found.");
      }

      // Simply wait for 5 seconds for customClaims to propagate
      console.log("Waiting 5 seconds for custom claims to propagate...");
      // await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 5 seconds
      console.log("Continuing with user profile completion...");

      // Get the user's ID token
      const idToken = await user.getIdToken();
      // const idToken = "";

      // Make an HTTP request to the Cloud Function
      const response = await fetch(FirebaseService2.cloudFunctionUrl, {
        method: "POST", // or 'GET', depending on your Cloud Function's setup
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        // Include any body data or params as needed
        // body: JSON.stringify({ someData: 'yourData' }),
      });
      if (!response.ok) {
        //Json response
        const errorJson = await response.json();
        throw new Error(`${response.status} - ${errorJson.message}`);
      }

      // Handle the response from your Cloud Function
      const responseData = await response.json();
      console.log("Cloud Function call was successful:", responseData);
      // Refresh the page after successful completion
      // window.location.reload();
    } catch (error) {
      console.error("Error completing user profile:", error);
    }
  }

  public static async getCurrentUser(): Promise<any | null> {
    try {
      if (!auth.currentUser) {
        console.error("No user is currently logged in.");
        return null;
      }
      const usersRef = collection(db, "users");
      const userQuery = query(
        usersRef,
        where("uid", "==", auth.currentUser?.uid),
      );

      const querySnapshot = await getDocs(userQuery);
      const user = querySnapshot.docs[0].data();
      return user;
    } catch (err) {
      console.error("Error fetching current user: ", err);
      return null;
    }
  }
  async deleteApp(): Promise<void> {
    try {
      await deleteApp(app);
    } catch (error) {
      console.error("Error deleting Firebase app:", error);
    }
  }
}

window.FirebaseService2 = FirebaseService2;

export { FirebaseService2 };
