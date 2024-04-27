import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const LoginProvider = () => {
  const { providerLogin } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  return (
    <>
      <div className="flex pt-6 flex-col gap-3">
        <button
          className="btn w-full  btn-ghost border-2 border-primary"
          onClick={() => {
            providerLogin("login", googleProvider);
          }}
          type="button"
        >
          <FaGoogle></FaGoogle>Continue with Google
        </button>
        <button
          className="btn  w-full  btn-ghost border-2 border-primary"
          onClick={() => {
            providerLogin("login", githubProvider);
          }}
          type="button"
        >
          <FaGithub></FaGithub> Continue with Github
        </button>
      </div>
    </>
  );
};

export default LoginProvider;
