import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/countries`)
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="grid justify-around gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {countries.map(({ country, image }) => {
          return (
            <>
              <Link
                to={`/all-tourist-spot/${country}`}
                className="hero min-h-48"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <h2 className="text-3xl font-bold"> {country}</h2>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Countries;
