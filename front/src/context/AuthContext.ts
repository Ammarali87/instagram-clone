import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";


type AuthContextState = {  // optional type
  user: IUser;   
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

// Initial user state with proper typing
export const INITIAL_USER: IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

// Initial context state with proper typing
const INITIAL_STATE: AuthContextState = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => null,
  setIsAuthenticated: () => null,
  checkAuthUser: async () => false,
};

const AuthContext = createContext<AuthContextState>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async (): Promise<boolean> => {
    setIsLoading(true);
    try {   
      const currentAccount = await getCurrentUser();
      
      if (!currentAccount) {
        setUser(INITIAL_USER);
        setIsAuthenticated(false);
        return false;
      }

      setUser({
        id: currentAccount.$id,
        name: currentAccount.name,
        username: currentAccount.username,
        email: currentAccount.email,
        imageUrl: currentAccount.imageUrl,
        bio: currentAccount.bio,
      });
      setIsAuthenticated(true);
      return true;

    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(INITIAL_USER);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const cookieFallback = localStorage.getItem("cookieFallback");
      if (!cookieFallback || cookieFallback === "[]") {
        navigate("/sign-in");
        return;   
      }
      await checkAuthUser();
    };

    checkAuth();  // trigger your fun
  }, [navigate]);   // can remove 

  const contextValue: AuthContextState = {  
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return (  // value={value}
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook with better error handling
export const useUserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within an AuthProvider");
  }
  return context;
};

// Custom hook
// export const useUserContext = () => useContext(AuthContext); //1 // three stuff




// import { useNavigate } from "react-router-dom";
// import { createContext, useContext, useEffect, useState } from "react";

// import { IUser } from "@/types";
// import { getCurrentUser } from "@/lib/appwrite/api";

// // async () => false as boolean
// export const INITIAL_USER = {
//   id: "",
//   name: "",
//   username: "",
//   email: "",
//   imageUrl: "",
//   bio: "",
// };

// const INITIAL_STATE = {
//   user: INITIAL_USER,
//   isLoading: false,
//   isAuthenticated: false,
//   setUser: () => {},
//   setIsAuthenticated: () => {},
//   checkAuthUser: async () => false as boolean,
// };

// type IContextType = {
//   user: IUser;
//   isLoading: boolean;
//   setUser: React.Dispatch<React.SetStateAction<IUser>>;
//   isAuthenticated: boolean;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//   checkAuthUser: () => Promise<boolean>;
// };

// const AuthContext = createContext<IContextType>(INITIAL_STATE);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<IUser>(INITIAL_USER);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const checkAuthUser = async () => {
//     setIsLoading(true);
//     try {
//       const currentAccount = await getCurrentUser();
//       if (currentAccount) {
//         setUser({
//           id: currentAccount.$id,
//           name: currentAccount.name,
//           username: currentAccount.username,
//           email: currentAccount.email,
//           imageUrl: currentAccount.imageUrl,
//           bio: currentAccount.bio,
//         });
//         setIsAuthenticated(true);

//         return true;
//       }

//       return false;
//     } catch (error) {
//       console.error(error);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const cookieFallback = localStorage.getItem("cookieFallback");
//     if (
//       cookieFallback === "[]" ||
//       cookieFallback === null ||
//       cookieFallback === undefined
//     ) {
//       navigate("/sign-in");
//     }

//     checkAuthUser();
//   }, []);

//   const value = {  // value  6 stuff 
//     user,
//     setUser,
//     isLoading,
//     isAuthenticated,
//     setIsAuthenticated,
//     checkAuthUser,
//   };            

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; // 2 
// } 

// export const useUserContext = () => useContext(AuthContext); //1 // three stuff



//   //  with out appwrite 

// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IUser } from "@/types";

// // Define the shape of the authentication context
// type AuthContextState = {
//   user: IUser;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   setUser: React.Dispatch<React.SetStateAction<IUser>>;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//   checkAuthUser: () => Promise<boolean>;
// };

// // Initial user state
// export const INITIAL_USER: IUser = {
//   id: "",
//   name: "",
//   username: "",
//   email: "",
//   imageUrl: "",
//   bio: "",
// };

// // Initial context state
// const INITIAL_STATE: AuthContextState = {
//   user: INITIAL_USER,
//   isLoading: false,
//   isAuthenticated: false,
//   setUser: () => null,
//   setIsAuthenticated: () => null,
//   checkAuthUser: async () => false,
// };

// const AuthContext = createContext<AuthContextState>(INITIAL_STATE);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<IUser>(INITIAL_USER);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const checkAuthUser = async (): Promise<boolean> => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setUser(INITIAL_USER);
//         setIsAuthenticated(false);
//         return false;
//       }

//       const response = await fetch("/api/auth/me", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to authenticate");
//       }

//       const data = await response.json();
//       setUser({
//         id: data._id,
//         name: data.name,
//         username: data.username,
//         email: data.email,
//         imageUrl: data.imageUrl || "",
//         bio: data.bio || "",
//       });
//       setIsAuthenticated(true);
//       return true;
//     } catch (error) {
//       console.error("Auth check failed:", error);
//       setUser(INITIAL_USER);
//       setIsAuthenticated(false);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initializeAuth = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/sign-in");
//         return;
//       }
//       const isLoggedIn = await checkAuthUser();
//       if (!isLoggedIn) {
//         navigate("/sign-in");
//       }
//     };

//     initializeAuth();
//   }, [navigate]);
   
   
//   const contextValue: AuthContextState = {
//     user,
//     setUser,
//     isLoading,
//     isAuthenticated,
//     setIsAuthenticated,
//     checkAuthUser,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Custom hook to use the AuthContext
// export const useUserContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within an AuthProvider");
//   }
//   return context;
// };
