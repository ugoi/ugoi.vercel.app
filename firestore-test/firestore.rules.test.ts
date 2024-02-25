import { render } from "@testing-library/react";
import { test } from "vitest";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { readFileSync, createWriteStream } from "node:fs";
import {
  expectFirestorePermissionDenied,
  expectFirestorePermissionUpdateSucceeds,
} from "./utils";

// Setup the test environment
let testEnv: RulesTestEnvironment;

const PROJECT_ID = "ugoi-portfolio";

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: readFileSync("firestore.rules", "utf8"),
      port: 8080, // default Firestore emulator port
      host: "127.0.0.1",
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

// // Example test case
// test("users can only read their own document", async () => {
//     initializeTestApp({ projectId: PROJECT_ID }).firestore();
//   // Authenticated as 'alice'
//   const aliceContext = testEnv.authenticatedContext("alice");
//   const aliceDocRef = doc(aliceContext.firestore(), "users", "alice");

//   // Alice should succeed reading her own document
//   await assertFails(getDoc(aliceDocRef));

//   //   // Authenticated as 'bob'
//   //   const bobContext = testEnv.authenticatedContext("bob");
//   //   const bobTriesAliceDocRef = doc(bobContext.firestore(), "users", "alice");

//   //   // Bob should fail reading Alice's document
//   //   await assertFails(getDoc(bobTriesAliceDocRef));
// }, 10000);

test("users can only read their own document", async function () {
  // Setup: Create documents in DB for testing (bypassing Security Rules).
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), "users/alice"), { foo: "bar" });
  });

  // const unauthedDb = testEnv.unauthenticatedContext().firestore();

  //   const aliceDb = testEnv.authenticatedContext("alice").firestore();

  //   const successResult = await assertSucceeds(
  //     setDoc(doc(aliceDb, "users/alice"), {
  //       birthday: "January 1",
  //     })
  //   );
  //   expect(successResult).toBeUndefined();

  await expectFirestorePermissionUpdateSucceeds(
    setDoc(
      doc(testEnv.authenticatedContext("alice").firestore(), "users/alice"),
      { birthday: "January 1" }
    )
  );

  //   const malloryDb = testEnv.authenticatedContext("alice").firestore();

  //   const errorResult = await assertSucceeds(
  //     setDoc(doc(malloryDb, "users/alice"), {
  //       birthday: "January 1",
  //     })
  //   );
  //   expect(errorResult).toBeUndefined();

  //   await expectFirestorePermissionDenied(
  //     setDoc(
  //       doc(testEnv.authenticatedContext("mallory").firestore(), "users/alice"),
  //       { birthday: "January 1" }
  //     )
  //   );
});
