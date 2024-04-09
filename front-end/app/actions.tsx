// "use server"
import { z } from "zod";
import PocketBase from "pocketbase";
import jwt from "jsonwebtoken";


const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);

export const loginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

// Define a function to set a cookie
const setCookie = (
  name: string,
  value: string,
  options: {
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
  } = {}
) => {
  // Construct the cookie string
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Set optional cookie attributes
  if (options.expires) {
    const expires = options.expires;
    cookieString += `;expires=${expires.toUTCString()}`;
  }
  if (options.path) {
    cookieString += `;path=${options.path}`;
  }
  if (options.domain) {
    cookieString += `;domain=${options.domain}`;
  }
  if (options.secure) {
    cookieString += `;secure`;
  }
  if (options.sameSite) {
    cookieString += `;SameSite=${options.sameSite}`;
  }

  // Set the cookie
  if (typeof document !== "undefined") {
    document.cookie = cookieString;
  } else {
    // Handle setting cookie in non-browser environment
  }
};


// Async function to handle login submission
async function onSubmitLog(values: {
  username: string;
  password: string;
}): Promise<void> {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(`${values.username}`, `${values.password}`);
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(authData);

    // Set the authentication token as a cookie
    setCookie("pocketbase-token", pb.authStore.token);
  } catch (error) {
    console.error("Error logging in: ", error);
  }
}

// Define a function to get the value of a cookie
const getCookie = (name: string): string | undefined => {
  // Check if we are in a browser environment
  if (typeof document !== 'undefined') {
    // Split the cookie string into individual cookie pairs
    const cookiePairs = document.cookie.split(";");

    // Iterate over each cookie pair to find the one with the specified name
    for (const cookiePair of cookiePairs) {
      const [cookieName, cookieValue] = cookiePair
        .split("=")
        .map((pair) => pair.trim());
      if (cookieName === name) {
        // Return the value of the cookie if found
        return decodeURIComponent(cookieValue);
      }
    }
  } else {
    // Handle non-browser environment (e.g., server-side rendering)
    console.warn("getCookie function is only available in a browser environment.");
  }

  // Return undefined if the cookie is not found or if not in browser environment
  return undefined;
};


// Function to decode a JWT token
export const decodeJWTToken = (token: string): any => {
  try {
    // Decode the JWT token to extract its payload
    const decodedToken = jwt.decode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Example usage: Get the value of the 'pocketbase-token' cookie
const pocketbaseToken = getCookie("pocketbase-token");
console.log("Pocketbase Token:", pocketbaseToken);

// Example: Decode the JWT token if it exists and print the decoded token
if (pocketbaseToken) {
  const decodedToken = decodeJWTToken(pocketbaseToken);
  if (decodedToken) {
    console.log("Decoded Token:", decodedToken);
  }
}

export async function getUserData() {
  const pocketbaseToken = getCookie("pocketbase-token");
  if (pocketbaseToken) {
    const record = await pb
      .collection("users")
      .getFirstListItem(`id="${decodeJWTToken(pocketbaseToken).id}"`);
    return record;
  } else {
    return null;
  }
}

export async function getMembers(groupid : string){
  const members = await pb.collection('users').getList(1, 50, {
  filter: `group="${groupid}"`
});
  return members;
}

export async function getGroupData(groupid: string) {
  const group = await pb
    .collection("Group")
    .getFirstListItem(`id="${groupid}"`);
  return group;
}


getUserData().then(user => {
  if (user) {
    console.log("Logged in user:", user);
  }
});



export async function onSubmitLogClient(
  values: z.infer<typeof loginFormSchema>
) {
  console.log("Submitting log from client...");
  await onSubmitLog(values);
}


export const isUserLoggedIn = (): boolean => {
  const pocketbaseToken = getCookie("pocketbase-token");
  return !!pocketbaseToken;
};

if (isUserLoggedIn()) {
  console.log("User is logged in");
} else {
  console.log("User is not logged in");
}

// Function to log the user out

function deleteCookie(name: string) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export const logoutUser = (): void => {
  deleteCookie("pocketbase-token");
};

export const isGroupCreator = (groupid : string) : boolean => {
  const user = getUserData();
  const group = getGroupData(groupid);
  if (user.email == group.creator) {
    return true;
  } else {
    return false;
  }
}

const findByUsername = async (username: string): Promise<any> => {
  const user = await getUserData();
  const record = await pb.collection('users').getFirstListItem(`username="${username}"`);
  return record;
}

const findByCodeforcesID = async (codeforcesID: string): Promise<any> => {
  const user = await getUserData();
  const record = await pb.collection('users').getFirstListItem(`codeforcesID="${codeforcesID}"`);
  return record;
}


export const addToGroup = async (
  username: string,
  groupid: string
): Promise<void> => {
  try {
    const user = await findByUsername(`${username}`);
    console.log("userid found by username: ", user.id);
    const data = {
      "group": `${groupid}`, // Remove extra quotation mark and use await for group
      "codeforcesID": `${user.codeforcesID}`, // Remove extra quotation mark and use await for user
    };
    const record = await pb.collection("users").update(user.id, data);
    console.log(record);
  } catch (error) {
    console.error("Error adding user to group: ", error);
  }
};

export const removeFromGroup = async (
  username: string,
  groupid: string
): Promise<void> => {
  try {
    console.log(username);
    const user = await findByCodeforcesID(`${username}`);
    console.log("userid found by username: ", user.id);
    const data = {
      "group": ``,
      "codeforcesID": `${user.codeforcesID}`
    };
    const record = await pb.collection("users").update(user.id, data);
    console.log(record);
  } catch (error) {
    console.error("Error removing user from group: ", error);
  }
};

// addToGroup("arca", "2fo7knbubnqfk84");