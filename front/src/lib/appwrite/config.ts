import { Client, Account, Databases, Storage, Avatars } from "appwrite";

function validateEndpoint(url: string | undefined) {
  if (!url) throw new Error("Appwrite URL is not defined");
  try {
    new URL(url); // This will throw if URL is invalid
    return url;
  } catch (e) {
    throw new Error(`Invalid Appwrite URL: ${url}`);
  }
}
console.log("ENV URL:", import.meta.env.VITE_APPWRITE_URL);

export const appwriteConfig = {
  url: validateEndpoint(import.meta.env.VITE_APPWRITE_URL),
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};

export const client = new Client();

try {
console.log("ENV URL:", import.meta.env.VITE_APPWRITE_URL);

  client.setEndpoint(appwriteConfig.url);
  client.setProject(appwriteConfig.projectId);
} catch (error) {
  console.error("Failed to initialize Appwrite client:", error);
  throw error;
}
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);









// import { Client, Account, Databases, Storage, Avatars } from "appwrite";
   
// //  only focus in 
// export const appwriteConfig = {
//   url: import.meta.env.VITE_APPWRITE_URL,
//   projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
//   databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
//   storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
//   userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
//   postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
//   savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
// };

//   console.log(appwriteConfig.url , appwriteConfig.projectId);
  
// export const client = new Client();
 
// // config  url , project Id
// client.setEndpoint(appwriteConfig.url);
// client.setProject(appwriteConfig.projectId);  

// export const account = new Account(client);
// export const databases = new Databases(client);
// export const storage = new Storage(client);
// export const avatars = new Avatars(client);