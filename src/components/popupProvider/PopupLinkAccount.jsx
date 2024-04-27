import { useContext } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const PopupLinkAccount = ({ providerName }) => {
  const { providerLogin } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  if (providerName === "google.com") {
    return (
      <>
        <button
          className="btn w-full btn-ghost border-2 border-primary"
          onClick={() => {
            providerLogin("link", googleProvider);
          }}
          type="button"
        >
          <FaGoogle></FaGoogle> Link with Google
        </button>
      </>
    );
  }

  if (providerName === "github.com") {
    return (
      <>
        <button
          className="btn w-full btn-ghost border-2 border-primary"
          onClick={() => {
            providerLogin("link", githubProvider);
          }}
          type="button"
        >
          <FaGithub></FaGithub> Link with Github
        </button>
      </>
    );
  }
};

export default PopupLinkAccount;
