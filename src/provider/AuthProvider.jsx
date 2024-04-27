import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  linkWithCredential,
  OAuthProvider,
} from "firebase/auth";
import auth from "../config/firebase";

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, SetUser] = useState(null);
  const [load, setLoad] = useState(true);
  const [loginType, setLoginType] = useState(null);
  const [token, setToken] = useState(null);

  const emailSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const emailSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const providerLogin = (type, provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (type === "link") {
          const credential = OAuthProvider.credentialFromError(token);
          linkWithCredential(result.user, credential)
            .then(() => {
              setLoginType(type);
            })
            .catch(() => {
              toast.error("Account linking failed. try again later");
            });
        } else {
          setLoginType(type);
        }
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          setToken(error);
        } else {
          toast.error(
            "Github is not available at this moment. try again later"
          );
        }
      });
  };

  const logout = () => {
    return signOut(auth)
      .then(() => {
        localStorage.removeItem("logged");
        navigate("/", { state: "logout" });
      })
      .catch();
  };

  useEffect(() => {
    const unsunscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        SetUser(user);
        setLoad(false);
        localStorage.setItem("logged", "yes");
      } else {
        SetUser(null);
        setLoad(false);
      }
    });
    return () => unsunscribe();
  }, [SetUser, setLoad]);
  const values = {
    providerLogin,
    emailSignUp,
    emailSignIn,
    loginType,
    load,
    token,
    setToken,
    logout,
    user,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
