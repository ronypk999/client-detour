import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { BsEmojiGrin } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet";

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    if (name.length < 3) {
      toast.error("Name must be more than 3 characters");
      setLoading(false);
      return;
    }

    if (!photo.includes("http") || !photo.includes("://")) {
      toast.error("Please provide a valid photo url");
      setLoading(false);
      return;
    }

    updateProfile(user, { displayName: name, photoURL: photo })
      .then(() => {
        setLoading(false);
        toast.success("Info updated");
      })
      .catch((error) => {
        toast.error("Account signed up! But can't save name and photoUrl");
        console.error(error);
      });
  };
  return (
    <>
      <Helmet>
        <title>Update your profile</title>
      </Helmet>
      <ToastContainer></ToastContainer>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold flex gap-3">
              Update your profile!
              <BsEmojiGrin className="text-red-400"></BsEmojiGrin>
            </h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  defaultValue={user?.displayName || ""}
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
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                  defaultValue={user?.photoURL || ""}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  defaultValue={user?.email || ""}
                  readOnly
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  {loading ? (
                    <>
                      Please wait
                      <span className="loading loading-spinner loading-xs"></span>
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
