import Estate from "../components/estate/Estate";
import { useLoaderData, useParams } from "react-router-dom";
import Sort from "../components/sort/Sort";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const Allspots = () => {
  const [spots, setSpots] = useState(JSON.parse(useLoaderData()));
  const { country } = useParams();
  const sortByAverageCost = (order) => {
    let data;
    if (!order) {
      data = [...spots].sort((a, b) => a.average_cost - b.average_cost);
    } else {
      data = [...spots].sort((a, b) => b.average_cost - a.average_cost);
    }

    setSpots(data);
  };

  return (
    <>
      <Helmet>
        <title>
          {country ? `Tourist Spots By ${country}` : "All Tourist Spots"}
        </title>
      </Helmet>
      <div className="px-3 md:px-6 lg:px-12 pt-12">
        <h1 className="text-4xl font-bold py-6 text-center">
          {country ? `Tourist Spots By ${country}` : "All Tourist Spots"}
        </h1>
        <div className="pb-12">
          <Sort sortByAverageCost={sortByAverageCost}></Sort>
        </div>
        <div className="flex justify-around gap-12 flex-wrap">
          {spots.map((data, index) => {
            return <Estate key={data._id} data={data} index={index}></Estate>;
          })}
        </div>
      </div>
    </>
  );
};

export default Allspots;
