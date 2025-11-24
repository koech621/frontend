
import { createContext, useContext,  } from "react";
import type {ReactNode} from "react";
type UserRole = "farmer" | "customer" | null;

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType>({
  role: null,
  setRole: () => {},
});

export const useUser = () => useContext(UserContext);

interface Props {
  children: ReactNode;
  role?: UserRole;
}

export const UserProvider = ({ children, role = null }: Props) => {
  const setRole = (r: UserRole) => {
    // placeholder, can replace with auth logic
    console.log("Setting role to", r);
  };

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};
