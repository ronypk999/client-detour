import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const locate = useLocation();

  useEffect(() => {
    if (user === null && !localStorage.getItem("logged")) {
      navigate("/login", { state: locate.pathname });
    }
  }, [user, locate, navigate, children]);
  return children;
};

export default PrivateRouter;
