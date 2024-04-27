import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 not found :(</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold">
              The page you are looking for does not exist
            </h1>

            <div className="flex gap-6 justify-center py-6">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="btn btn-primary"
              >
                Back
              </button>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="btn btn-primary"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
