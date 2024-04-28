import Slider from "../components/home/Slider";
import Estate from "../components/estate/Estate";
import NotifyLogin from "../notify/NotifyLogin";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "../components/countries/Countries";
import { Link } from "react-router-dom";
const Home = () => {
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/spots`)
      .then((res) => {
        setSpots(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <NotifyLogin></NotifyLogin>
      <Slider></Slider>
      <div className="px-3 md:px-6 lg:px-12 pt-12">
        <h1 className="text-4xl font-bold py-6 text-center">Places to Visit</h1>
        <div className="flex justify-around gap-12 flex-wrap">
          {spots.map((data, index) => {
            return <Estate key={data._id} data={data} index={index}></Estate>;
          })}
        </div>
        <div className="text-center pt-12">
          <Link to="all-tourist-spot" className="btn btn-success">
            View All
          </Link>
        </div>
      </div>
      <div className="px-3 md:px-6 lg:px-12 py-12">
        <h1 className="text-4xl font-bold py-6 text-center">
          Visit place by country
        </h1>

        <Countries></Countries>
      </div>
    </>
  );
};

export default Home;
