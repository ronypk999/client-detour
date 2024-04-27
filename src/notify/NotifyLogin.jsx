import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";

const NotifyLogin = () => {
  const locate = useLocation();
  const navigate = useNavigate();
  const { loginType } = useContext(AuthContext);
  useEffect(() => {
    if (locate.state === "login") {
      toast.success("Login successfull.");
      navigate({ state: null });
    }
    if (locate.state === "signup") {
      toast.success("Sign Up successfull.");
      navigate({ state: null });
    }
    if (locate.state === "logout") {
      toast.success("Logout successfull.");
      navigate({ state: null });
    }
    if (locate.state === "link") {
      toast.success("Account linked! successfull.");
      navigate({ state: null });
    }
  }, [locate, navigate, loginType]);

  return <ToastContainer></ToastContainer>;
};

export default NotifyLogin;
