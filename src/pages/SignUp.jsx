import { BsEmojiGrin } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";

import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
const SignUp = () => {
  const { emailSignUp } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    setLoading(true);
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    if (name.length < 3) {
      toast.error("Name must be more than 3 characters");
      setLoading(false);
      return;
    }

    if (!email.includes("@") || !email.includes(".") || email.length < 7) {
      toast.error("Please provide a valid email");
      setLoading(false);
      return;
    }

    if (!photo.includes("http") || !photo.includes("://")) {
      toast.error("Please provide a valid photo url");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error("Password should be at least 8 characters.");
      setLoading(false);
      return;
    }
    if (!/.*[0-9].*/.test(password)) {
      toast.error("Password must contain at least 1 number.");
      setLoading(false);
      return;
    }
    if (!/.*[A-Z].*/.test(password)) {
      toast.error("Password must contain at least 1 Uppercase letter.");
      setLoading(false);
      return;
    }
    if (!/.*[a-z].*/.test(password)) {
      toast.error("Password must contain at least 1 Lowercase letter.");
      setLoading(false);
      return;
    }

    emailSignUp(email, password)
      .then((data) => {
        updateProfile(data.user, { displayName: name, photoURL: photo })
          .then(() => {
            e.target.reset();
            setLoading(false);

            navigate("/", { state: "signup" });
          })
          .catch((error) => {
            toast.error("Account signed up! But can't save name and photoUrl");
            console.error(error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          toast.error("Password should be at least 6 characters.");
        } else if (error.code === "auth/email-already-in-use") {
          toast.error("Email already registered");
        } else {
          toast.error(error.message);
          console.error(error);
        }
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <ToastContainer></ToastContainer>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold flex gap-3">
              Sign Up Folk! <BsEmojiGrin className="text-red-400"></BsEmojiGrin>
            </h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Url Of Image"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={eye ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <div
                  onClick={() => setEye(!eye)}
                  className="absolute top-[60%] right-2"
                >
                  {eye ? (
                    <IoMdEye className="text-xl"></IoMdEye>
                  ) : (
                    <IoMdEyeOff className="text-xl"></IoMdEyeOff>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  {loading ? (
                    <>
                      Please wait
                      <span className="loading loading-spinner loading-xs"></span>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
              <div className="form-control pt-6">
                <span className="label-text">
                  Already have an account?
                  <Link to="/login" className="link hover:text-red-500">
                    {" "}
                    Click here to Sign In
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
