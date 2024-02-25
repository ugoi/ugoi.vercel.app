import * as admin from "firebase-admin";
import * as v2 from "firebase-functions/v2";


/**
 * Helper function to authenticate a user using Firebase ID token
 * @param request The incoming request object from the client
 * @returns A promise that resolves to the UID of the authenticated user
 */
async function authenticateRequest(request: v2.https.Request): Promise<string> {
  if (
    !request.headers.authorization ||
    !request.headers.authorization.startsWith("Bearer ")
  ) {
    throw new Error(
      "Unauthorized - No Firebase ID token was passed as a Bearer token in the Authorization header.",
    );
  }

  const idToken = request.headers.authorization.split("Bearer ")[1];
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  return decodedToken.uid;
}

export { authenticateRequest };
