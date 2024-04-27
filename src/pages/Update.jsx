import { useLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Update = () => {
  const [userSpot, setUserSpot] = useState(JSON.parse(useLoaderData()));

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [facilities, setFacilities] = useState(userSpot.seasonality);
  const facilityRef = useRef();

  const [countries, setCountries] = useState([]);
  const [activeSpots, setActiveSpots] = useState([]);
  const spot = watch("country_Name");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/countries/`)
      .then((res) => setCountries(res.data))
      .catch((error) => console.error(error));
  }, [setCountries]);

  useEffect(() => {
    if (countries.find(({ country }) => country === spot)) {
      const singleCountry = countries.find(({ country }) => country === spot);
      setActiveSpots(singleCountry.places);
    }
  }, [spot, countries]);
  const onSubmit = (data) => {
    if (activeSpots.length === 0) {
      toast.error("You must select the country");
      return;
    }
    if (!activeSpots.includes(data.tourists_spot_name)) {
      data.tourists_spot_name = activeSpots[0];
    }
    if (facilities.length < 1) {
      toast.error("You must add at least 1 facility");
    } else {
      data.seasonality = facilities;
      axios
        .put(`${import.meta.env.VITE_API_URL}/spots/${userSpot._id}`, data)
        .then((res) => {
          if (res.data.modifiedCount) {
            toast.success("Done! your spot has been updated");
          } else if (!res.data.matchedCount) {
            toast.error("this spot does not exist");
          } else {
            toast.info("Nothing to change! please make some changes");
          }
        })
        .catch(() => {
          toast.error("Failed to create new spot");
        });
    }
  };
  return (
    <>
      <Helmet>
        <title>Update your tourist spot</title>
      </Helmet>
      <ToastContainer></ToastContainer>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-xl font-bold flex gap-3">
              Update your tourist spot
            </h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Country name</span>
                </label>
                <select
                  {...register("country_Name")}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value={userSpot.country_Name}>
                    {userSpot.country_Name}
                  </option>
                  {countries.map(
                    ({ country, _id }) =>
                      userSpot.country_Name === country || (
                        <option value={country} key={_id}>
                          {country}
                        </option>
                      )
                  )}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tourist Spot</span>
                </label>
                <select
                  type="text"
                  {...register("tourists_spot_name")}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value={userSpot.tourists_spot_name}>
                    {userSpot.tourists_spot_name}
                  </option>
                  {activeSpots.map(
                    (spot, idx) =>
                      userSpot.tourists_spot_name === spot || (
                        <option value={spot} key={idx}>
                          {spot}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  {...register("location", { required: true, minLength: 5 })}
                  placeholder="Where is located?"
                  className="input input-bordered"
                  defaultValue={userSpot.location}
                  required
                />
                {errors?.location &&
                  (errors?.location?.type === "required" ? (
                    <span className="text-red-500">This field is required</span>
                  ) : (
                    errors?.location?.type === "minLength" && (
                      <span className="text-red-500">Must be 5 characters</span>
                    )
                  ))}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Average Cost (USD)</span>
                </label>
                <input
                  type="number"
                  {...register("average_cost", {
                    required: true,
                    minLength: 1,
                  })}
                  placeholder="What average cost will be?"
                  className="input input-bordered"
                  required
                  defaultValue={userSpot.average_cost}
                />
                {errors?.average_cost &&
                  (errors?.average_cost?.type === "required" ? (
                    <span className="text-red-500">This field is required</span>
                  ) : (
                    errors?.average_cost?.type === "minLength" && (
                      <span className="text-red-500">Must be 1 characters</span>
                    )
                  ))}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Seasonality</span>
                </label>
                {facilities.length > 0 && (
                  <div className="flex py-3 gap-1 flex-wrap">
                    {facilities.map((data, idx) => {
                      return (
                        <span className="badge badge-success pr-0" key={idx}>
                          {data}
                          <span
                            className="cursor-pointer rounded-full px-[5px] hover:bg-white"
                            onClick={() => {
                              const f = facilities.filter(
                                (face) => face !== data
                              );

                              setFacilities(f);
                            }}
                          >
                            x
                          </span>
                        </span>
                      );
                    })}
                  </div>
                )}
                <div className="join">
                  <input
                    ref={facilityRef}
                    className="input input-bordered join-item"
                    placeholder="Ex: Winter"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (facilityRef.current.value) {
                        setFacilities([
                          ...facilities,
                          facilityRef.current.value,
                        ]);
                        facilityRef.current.value = "";
                      }
                    }}
                    className="btn join-item rounded-r-full"
                  >
                    add
                  </button>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image Url</span>
                </label>
                <input
                  type="text"
                  {...register("image", { required: true })}
                  placeholder="Enter your image url"
                  className="input input-bordered"
                  required
                  defaultValue={userSpot.image}
                />

                {errors?.image && (
                  <span className="text-red-500">You must put a image url</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Travel Time (days)</span>
                </label>
                <input
                  type="number"
                  {...register("travel_time", { required: true })}
                  placeholder="How many days?"
                  className="input input-bordered"
                  required
                  defaultValue={userSpot.travel_time}
                />

                {errors?.travel_time && (
                  <span className="text-red-500">
                    You must type travel days
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Visitors (yearly)</span>
                </label>
                <input
                  type="number"
                  {...register("totaVisitorsPerYear", { required: true })}
                  placeholder="How many visitors per year?"
                  className="input input-bordered"
                  required
                  defaultValue={userSpot.totaVisitorsPerYear}
                />

                {errors?.totaVisitorsPerYear && (
                  <span className="text-red-500">
                    You must type visitors in average per year
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your contact Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Which email people will contact you?"
                  className="input input-bordered"
                  required
                  defaultValue={userSpot.email}
                />

                {errors?.email && (
                  <span className="text-red-500">
                    You must type email for contact
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your contact Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="How do people call you?"
                  className="input input-bordered"
                  required
                  defaultValue={userSpot.name}
                />

                {errors?.name && (
                  <span className="text-red-500">
                    You must type name for contact
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Short Description</span>
                </label>

                <textarea
                  {...register("descrition", {
                    required: true,
                    minLength: 100,
                    maxLength: 500,
                  })}
                  className="textarea textarea-bordered"
                  placeholder="Type your description about the spots and some nice things about it"
                  defaultValue={userSpot.descrition}
                ></textarea>

                {errors?.descrition &&
                errors?.descrition?.type === "required" ? (
                  <span className="text-red-500">
                    You must provide a description
                  </span>
                ) : errors?.descrition?.type === "minLength" ? (
                  <span className="text-red-500">
                    Must be 100 - 500 characters
                  </span>
                ) : (
                  errors?.descrition?.type === "maxLength" && (
                    <span className="text-red-500">
                      Must be under 500 characters
                    </span>
                  )
                )}
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
