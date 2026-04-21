import userApi from "../api/user.api";
import { setUser } from "../store/slices/user.slice";

export const authUtils = {
  isAuthenticated: async (dispatch) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      if (dispatch) dispatch(setUser());
      return false;
    }

    try {
      const response = await userApi.verifyToken();
      if (response && dispatch) {
        dispatch(
          setUser({
            user: response.user,
          }),
        );
        return response.user || false;
      }

      if (dispatch) dispatch(setUser());
      return false;
    } catch {
      return false;
    }
  },
};

export const roleUtils = {
  isAvailable: (roles, userRole) => {
    if (roles === "all") return true;
    if (typeof roles === "string") return roles === userRole;
    if (Array.isArray(roles)) return roles.includes(userRole);

    return false;
  },
  isAdmin: (userRole) => userRole === "admin",
  isManager: (userRole) => userRole === "manager",
  isSupporter: (userRole) => userRole === "supporter",
  isAdminOrManager: (userRole) => ["admin", "manager"].includes(userRole),
  isAdminOrUserOrManager: (userRole) =>
    ["admin", "manager", "user"].includes(userRole),
};
