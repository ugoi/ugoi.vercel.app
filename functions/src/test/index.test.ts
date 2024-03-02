import { describe, it, expect } from "vitest";
// Assuming you have a function that handles Firebase admin initialization and token generation
import { createFirebaseUserAndGetToken } from "./helpers";
import { auth } from "../firebase-config";

// Setup the test environment
let testEnv: any;

const PROJECT_ID = "ugoi-portfolio-test";

// At the top of test/index.test.js
testEnv = require("firebase-functions-test")(
  {
    databaseURL: "https://ugoi-portfolio-test.firebaseio.com",
    storageBucket: "ugoi-portfolio-test.appspot.com",
    projectId: "ugoi-portfolio-test",
  },
  "./ugoi-portfolio-test-firebase-adminsdk-1wzyq-21fbb446ae.json"
);

var admin = require("firebase-admin");

var serviceAccount = require("./ugoi-portfolio-test-firebase-adminsdk-1wzyq-21fbb446ae.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

import { signInWithCustomToken } from "firebase/auth";

beforeAll(async () => {});

afterAll(() => {
  // Cleaning up the test environment
  admin
    .auth()
    .listUsers()
    .then((users: any) => {
      users.users.forEach((user: any) => {
        admin.auth().deleteUser(user.uid);
      });
    });
  testEnv.cleanup();
});

describe("Cloud Function Test", () => {
  it('should return "Hello from firebase!" in the message', async () => {
    // The URL of the cloud function
    const url = "https://helloworld-7sztcxxh4q-uc.a.run.app";

    // Make a request to the cloud function
    const response = await fetch(url);
    const data = await response.json();

    // Ensure the response is of type JSON
    expect(response.headers.get("content-type")).toContain("application/json");

    // Check if the response contains the expected message
    expect(data).toHaveProperty("message", "Hello from Firebase!");
  });

  describe("Complete User Profile Tests", () => {
    it("it should complete profiöe and auth token should be available immediately", async () => {
      const users = await admin.auth().listUsers();

      users.users.forEach(async (user: any) => {
        await admin.auth().deleteUser(user.uid);
      });

      const user = await admin.auth().createUser({
        email: "aliceklaus@gmail.com",
        emailVerified: true,
        password: "password",
        displayName: "Alice",
        disabled: false,
      });

      const customToken = await admin.auth().createCustomToken(user.uid);

      const userSignedIn = await signInWithCustomToken(auth, customToken);

      const idToken = await userSignedIn.user.getIdToken();

      // The URL of the cloud function
      const url = process.env.VITE_APP_API_COMPLETE_USER_PROFILE;

      if (!url) {
        throw new Error("Cloud function URL not found.");
      }

      // Make an authenticated request to the cloud function
      const response = await fetch(url, {
        method: "POST", // Adjust based on your Cloud Function's expected method
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        // Include any body data or params as needed
        // body: JSON.stringify({ someData: 'yourData' }),
      });
      const data = await response.json();

      // Ensure the response is of type JSON
      expect(response.headers.get("content-type")).toContain(
        "application/json"
      );

      // Check if the response structure matches your expectations
      expect(data.message).toContain("Success");

      const getAuthTokenUrl =
        process.env.VITE_APP_GENERATE_COMETCHAT_AUTH_TOKEN;

      if (!getAuthTokenUrl) {
        throw new Error("Cloud function URL not found.");
      }

      // Make an authenticated request to the cloud function
      const response2 = await fetch(getAuthTokenUrl, {
        method: "POST", // Adjust based on your Cloud Function's expected method
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        // Include any body data or params as needed
        // body: JSON.stringify({ someData: 'yourData' }),
      });
      const data2 = await response2.json();

      // Ensure the response is of type JSON
      expect(response2.headers.get("content-type")).toContain(
        "application/json"
      );

      // Check if the response structure matches your expectations
      expect(data2.message).toContain("Auth token created successfully");

      const users2 = await admin.auth().listUsers();

      users2.users.forEach(async (user: any) => {
        await admin.auth().deleteUser(user.uid);
      });
    }, 100000);

    it("should return a valid JSON response", async () => {
      // Generate a new Firebase user token
      const idToken = await createFirebaseUserAndGetToken();

      // The URL of the cloud function
      const url = "https://completeuserprofile-7sztcxxh4q-uc.a.run.app";

      // Make an authenticated request to the cloud function
      const response = await fetch(url, {
        method: "POST", // Adjust based on your Cloud Function's expected method
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        // Include any body data or params as needed
        // body: JSON.stringify({ someData: 'yourData' }),
      });
      const data = await response.json();

      // Ensure the response is of type JSON
      expect(response.headers.get("content-type")).toContain(
        "application/json"
      );

      // Check if the response structure matches your expectations
      expect(data.message).toContain("Error");
    });
  });
});
