import Cookies from "js-cookie";
import { perform_get } from "@/lib/api";

export const handleRole = async () => {
  const token = Cookies.get("token");

  if (token) {
    const response = await perform_get("auths/user_info/", token);
    return response.user_roles[0];
  }

  return null;
};
