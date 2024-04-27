import { useLoaderData } from "react-router-dom";
import NotifyLogin from "../notify/NotifyLogin";
import { IoLocationSharp } from "react-icons/io5";
import { BsBoundingBoxCircles } from "react-icons/bs";
import { Helmet } from "react-helmet";

const Property = () => {
  const data = JSON.parse(useLoaderData());

  const {
    tourists_spot_name,
    image,
    location,
    country_Name,
    travel_time,
    average_cost,
    seasonality,
    descrition,
    name,
    email,
    totaVisitorsPerYear,
  } = data;

  return (
    <>
      <Helmet>
        <title>View Property</title>
      </Helmet>
      <NotifyLogin></NotifyLogin>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="hero min-h-screen bg-base-200"
      >
        <div className="hero-content flex-col">
          <div className="flex gap-3 flex-col">
            <img src={image} className="max-w-xxl rounded-lg shadow-2xl" />
            <div className="flex justify-around gap-6">
              <span
                data-aos="fade-right"
                data-aos-delay="100"
                className="badge badge-success p-3 text-base"
              >
                Average cost: ${average_cost}
              </span>
              <span
                data-aos="fade-left"
                data-aos-delay="300"
                className="badge badge-secondary p-3 text-base"
              >
                Travel {travel_time} days
              </span>
            </div>
          </div>
          <div className="space-y-3 max-w-lg">
            <h1
              data-aos="fade-left"
              data-aos-delay="500"
              className="text-xl md:text-2xl lg:text-5xl font-bold"
            >
              {tourists_spot_name}
            </h1>
            <p className="py-6 text-base">{descrition}</p>
            <p
              className="flex gap-1 items-center"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <IoLocationSharp className="text-xl text-red-500"></IoLocationSharp>
              {location} ({tourists_spot_name})
            </p>
            <p
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="1000"
              className="flex gap-1 items-center"
            >
              Country: {country_Name}
            </p>
            <p
              data-aos="fade-left"
              data-aos-delay="100"
              data-aos-duration="1000"
              className="flex gap-1 items-center"
            >
              Visits Yearly: {totaVisitorsPerYear}
            </p>
            <p
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="1000"
              className="flex gap-1 items-center"
            >
              Posted By: {name} ({email})
            </p>
            <div className="flex gap-2">
              Seasonality:
              {seasonality.map((f, idx) => {
                return (
                  <span
                    data-aos="fade-left"
                    data-aos-delay={(idx + 1) * 300}
                    key={idx}
                    className="badge badge-primary"
                  >
                    {f}
                  </span>
                );
              })}
            </div>
            <div className="text-right">
              <button
                data-aos="fade-left"
                data-aos-delay="700"
                className="btn btn-primary"
              >
                Contact via Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Property;
