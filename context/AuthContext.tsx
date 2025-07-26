"use client";
import { perform_get } from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

type UserInfo = {
  id: number;
  username: string;
  roles: string[]; // مثل ["student", "admin"]
};

type AuthContextType = {
  user: UserInfo | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    perform_get("auths/user_info/")
      .then((res) => {
        if (res && res.user_roles) {
          setUser({
            id: res.id,
            username: res.username,
            roles: res.user_roles,
          });
        } else {
          setUser(null); // مهمان
        }
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
