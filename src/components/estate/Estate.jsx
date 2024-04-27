import PropTypes from "prop-types";
import { IoLocationSharp } from "react-icons/io5";
import { BsBoundingBoxCircles } from "react-icons/bs";
import { Link } from "react-router-dom";
const Estate = ({ data, index }) => {
  index++;
  const {
    tourists_spot_name,
    image,
    location,
    totaVisitorsPerYear,
    travel_time,
    average_cost,
    seasonality,
    _id,
  } = data;
  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-delay={index * 200}
        data-aos-duration="1000"
        className="card w-96 bg-base-100 shadow-xl"
      >
        <figure>
          <img src={image} alt="Shoes" className="w-full h-64" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{tourists_spot_name}</h2>
          <div className="flex justify-between">
            <div className="badge badge-success">Average ${average_cost}</div>
            <div className="badge badge-secondary">{travel_time} days</div>
          </div>
          <p className="flex gap-1 items-center">
            <IoLocationSharp className="text-xl text-red-500"></IoLocationSharp>
            {location}
          </p>
          <p className="flex gap-1 items-center">
            Yearly visitors: {totaVisitorsPerYear}
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
          <div className="card-actions justify-end">
            <Link to={`/property/${_id}`} className="btn btn-success">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Estate;

Estate.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
