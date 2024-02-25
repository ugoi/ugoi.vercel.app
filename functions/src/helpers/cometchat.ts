// Define an interface for the user details object
export interface CometChatUserDetails {
  uid: string;
  name: string;
  email?: string;
  contactNumber?: string;
  role?: string; // Make role optional with a default value implied in the function
}

/**
 * Creates a new user in CometChat.
 *
 * @param {CometChatUserDetails} userDetails An object containing details of the user to create.
 * @returns {Promise<Object>} A promise that resolves to the created user's data.
 */
export async function createCometChatUser(
  userDetails: CometChatUserDetails,
): Promise<Object> {
  console.log("createCometChatUser");
  console.log(userDetails);
  const { uid, name, email, contactNumber, role = "default" } = userDetails;
  const url = "https://252152741693d181.api-eu.cometchat.io/v3/users";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      apikey: "74097d30a70c0e7285ed3268057fa18c9a7921a0", // Replace 'YOUR_API_KEY_HERE' with your actual API key
    },
    body: JSON.stringify({
      uid,
      name,
      role,
      metadata: {
        "@private": {
          email,
          contactNumber,
        },
      },
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // Checks if the response status code is not in the range 200-299
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.error("error:" + err);
    throw err; // This allows the caller to handle errors
  }
}

/**
 * Creates an auth token for a specified CometChat user.
 *
 * @param {string} userId The unique identifier of the user for whom to create the auth token.
 * @returns {Promise<Object>} A promise that resolves to the auth token data.
 */
export async function createCometChatAuthToken(
  userId: string,
): Promise<Object> {
  const url = `https://252152741693d181.api-eu.cometchat.io/v3/users/${userId}/auth_tokens`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      apikey: "74097d30a70c0e7285ed3268057fa18c9a7921a0", // Replace 'YOUR_API_KEY_HERE' with your actual CometChat API key
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // Checks if the response status code is not in the range 200-299
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.error("error:" + err);
    throw err; // Allows the caller to handle the error
  }
}
