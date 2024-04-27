import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const { user, loginType } = useContext(AuthContext);
  const navigate = useNavigate();
  const locate = useLocation();

  useEffect(() => {
    if (user && localStorage.getItem("logged")) {
      if (locate.state !== null) {
        navigate(locate.state, { state: loginType });
      } else {
        navigate("/", { state: loginType });
      }
    }
  }, [user, navigate, locate, loginType]);
  return children;
};

export default ProtectedRouter;
