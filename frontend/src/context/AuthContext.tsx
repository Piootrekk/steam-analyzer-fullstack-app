import { createContext, useContext } from "react";
import { AuthType } from "../types/authType";

export const AuthContext = createContext<
  | {
      auth: AuthType;
      setAuth: (auth: AuthType) => void;
    }
  | undefined
>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
