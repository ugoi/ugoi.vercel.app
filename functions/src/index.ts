/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as v2 from "firebase-functions/v2";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { authenticateRequest } from "./helpers/auth";
import {
  createCometChatUser,
  CometChatUserDetails,
  createCometChatAuthToken,
} from "./helpers/cometchat";

// Initialize Firebase Admin SDK
admin.initializeApp();

export const helloWorld = v2.https.onRequest(
  { cors: true },
  (request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.json({ message: "Hello from Firebase!" });
  }
);

export const completeUserProfile = v2.https.onRequest(
  { cors: true },
  async (request, response) => {
    try {
      // Continue with your function logic here
      const uid = await authenticateRequest(request);
      const user = await admin.auth().getUser(uid);

      // Reference to the Firestore document
      const userDocRef = admin.firestore().doc(`users/${user.uid}`);

      // Check if the user document already exists
      const userDoc = await userDocRef.get();
      if (userDoc.exists) {
        console.log(`Document already exists for user ${user.uid}`);
        response.json({
          message: `User profile already exists for ${user.uid}`,
        });
        return;
      }

      const listUsersResult = await admin.auth().listUsers(2);

      const isAdmin = listUsersResult.users.length === 1;
      const isMember = !isAdmin;

      await admin
        .auth()
        .setCustomUserClaims(user.uid, { admin: isAdmin, member: isMember });

      // Data to be saved in the user's document
      const userData = {
        uid: user.uid,
        displayName: user.displayName || "Anonymous", // Default to 'Anonymous' if displayName is not provided
        photoURL: user.photoURL || "default-profile.png", // Default profile picture if photoURL is not provided
        email: user.email,
      };

      // Create the document with the specified data
      await userDocRef.set(userData).then(() => {
        console.log(`Document created for user ${user.uid}`);
      });

      // const customClaims = user.customClaims;
      // if (!customClaims) {
      //   throw new Error("Custom claims not found for user");
      // }

      // const role = customClaims.admin ? "admin" : "default";
      const role = isAdmin ? "admin" : "default";

      // Create comet chat user
      // Example usage without email and contactNumber
      const userDetails: CometChatUserDetails = {
        uid: user.uid,
        name: user.displayName || "Anonymous",
        role: role,
      };

      await createCometChatUser(userDetails)
        .then((response) => console.log("User created successfully", response))
        .catch((error) => {
          console.error("Error creating user", error);
          throw new Error(`Failed to create CometChat user: ${error.message}`);
        });

      response.json({
        message: `Successfully completed user profile for ${user.uid}`,
      });
    } catch (error: any) {
      console.error("Authentication error:", error);
      response.status(403).json({
        message: `Error completing user profile: ${error.message}`,
      });
    }
  }
);

export const generateCometChatAuthToken = v2.https.onRequest(
  { cors: true },
  async (request, response) => {
    // Enforce POST requests for security reasons
    if (request.method !== "POST") {
      response.status(405).send("Method Not Allowed");
      return;
    }

    try {
      // Use authenticateRequest to extract userId from the JWT token in the Authorization header
      const uid = await authenticateRequest(request);

      // Proceed to generate CometChat auth token for the authenticated user
      const authTokenData = await createCometChatAuthToken(uid);
      response.json({
        message: "Auth token created successfully",
        data: authTokenData,
      });
    } catch (error: any) {
      console.error("Error:", error);
      // Determine the type of error response based on the nature of the error
      if (error.message.includes("Unauthorized")) {
        response.status(401).json({
          message: "Unauthorized: Failed to authenticate user.",
        });
      } else {
        response.status(500).json({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    }
  }
);
