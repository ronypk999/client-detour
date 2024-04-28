import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

const List = () => {
  const [spots, setSpots] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { user } = useContext(AuthContext);
  const handleDelete = () => {
    if (deleteItemId === null) {
      toast.error("Can't delete null");
      return;
    }
    axios
      .delete(`${import.meta.env.VITE_API_URL}/spots/${deleteItemId}`)
      .then((res) => {
        if (res.data.deletedCount) {
          const newSpots = [...spots].filter(({ _id }) => _id !== deleteItemId);
          setSpots(newSpots);
          setDeleteItemId(null);
          toast.success("Deleted");
        } else {
          toast.error("Already deleted or Does not exist");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/allSpots/${user.uid}`)
        .then((res) => setSpots(res.data))
        .catch((error) => console.error(error));
    }
  }, [user]);
  return (
    <>
      <Helmet>
        <title>My listings</title>
      </Helmet>
      <ToastContainer></ToastContainer>
      <div className="px-3 md:px-6 lg:px-12 pt-12">
        <h1 className="text-4xl font-bold py-6 text-center">
          My Tourist Spots
        </h1>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Spots / Country</th>
                <th>Travel time / Average Cost</th>
                <th>Update and Delete</th>
              </tr>
            </thead>
            <tbody>
              {spots.length === 0 && (
                <>
                  <tr>
                    <td>
                      <div className="skeleton w-6 h-6 rounded-full shrink-0"></div>
                    </td>
                    <td>
                      <div className="flex">
                        <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                        <div className="space-y-3">
                          <div className="skeleton w-24 h-4 rounded shrink-0"></div>
                          <div className="skeleton w-24 h-4 rounded shrink-0"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-3">
                        <div className="skeleton w-32 h-4 rounded shrink-0"></div>
                        <div className="skeleton w-32 h-4 rounded shrink-0"></div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="skeleton w-12 h-6 rounded shrink-0"></div>
                        <div className="skeleton w-12 h-6 rounded shrink-0"></div>
                      </div>
                    </td>
                  </tr>
                </>
              )}
              {spots.map(
                ({
                  tourists_spot_name,
                  image,
                  average_cost,
                  country_Name,
                  _id,
                  travel_time,
                }) => {
                  return (
                    <tr key={_id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={image}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {tourists_spot_name}
                            </div>
                            <div className="text-sm opacity-50">
                              {country_Name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        Travel Time {travel_time} days
                        <br />
                        <span className="badge badge-success badge-sm">
                          Average cost ${average_cost}
                        </span>
                      </td>
                      <td>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            to={`/update/${_id}`}
                            className="btn btn-info btn-xs"
                          >
                            Update
                          </Link>
                          <button
                            onClick={() => {
                              setDeleteItemId(_id);
                              document.getElementById("my_modal_1").showModal();
                            }}
                            className="btn btn-error btn-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Spots / Country</th>
                <th>Travel time / Average Cost</th>
                <th>Update and Delete</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure!</h3>
          <p className="py-4">
            Once you click confirm then the data will be remnoved permanently
          </p>
          <div className="">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setDeleteItemId(null);
                  }}
                  className="btn btn-error"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDelete();
                  }}
                  className="btn btn-success"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default List;
