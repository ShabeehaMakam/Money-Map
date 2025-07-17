import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance.js";
import { API_PATHS } from "../utils/apiPaths";

const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    if (!user) {
      const fetchUserInfo = async () => {
        try {
          const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER);
          if (isMounted && response.data) {
            updateUser(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          if (isMounted && location.pathname !== "/login") {
            clearUser();
            navigate("/login");
          }
        }
      };

      fetchUserInfo();
    }

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate, location.pathname]);
};

export default useUserAuth;
