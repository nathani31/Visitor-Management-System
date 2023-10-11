import React, { useState, useEffect } from "react";
import RouteService from "../../services/RouteService";
import { Link, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import CreateRoute from "./CreateRoute";

const RouteList = () => {
  const [Route, setRoute] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchRouteName, setSearchRouteName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // const [createFormRoute, setCreateFormRoute] = useState({
  //   routeid: null,
  //   routename: '',
  //   routecode: '',
  //   routedes: '',
  //   routedistanceinkm: null,
  //   status: null
  // });

  const dummyData = [
    {
      routeid: 1,
      routename: "route 1",
      routedes: "kolimbia",
      routedistanceinkm: 23.67,
      routecode: "ST1",
      status: 1,
    },
    {
      routeid: 2,
      routename: "route 2",
      routedes: "Indonesia",
      routedistanceinkm: 73.67,
      routecode: "ST2",
      status: 2,
    },
    {
      routeid: 3,
      routename: "route 3",
      routedes: "Africa",
      routedistanceinkm: 28.67,
      routecode: "ST3",
      status: 1,
    },
  ];
  useEffect(() => {
    retrieveRoute();
    //setRoute(dummyData);
  }, []);

  const retrieveRoute = () => {
    RouteService.searchinitialize({ routeid: 0 })
      .then((response) => {
        //console.log(response);
        setRoute(response.data.routeList);
        //console.log("Response Data",response.data.routeList);
        console.log("Response Data", response.data.routeList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    console.log("Refresh List", refreshList);
    retrieveRoute();
    setCurrentRoute(null);
    setCurrentIndex(-1);
  };

  const setActiveRoute = (route, index) => {
    setCurrentRoute(route);
    setCurrentIndex(index);
  };

  const ChangeStatus = (routeid) => {
    if (window.confirm("Are you sure you want to remove this route?")) {
      let value = { Routeid: routeid };
      console.log("Routeid to be removed:", value);

      RouteService.changestatus(value)
        .then((response) => {
          console.log("ChangeStatus response:", response.data);
          refreshList(); // After successful status change, refresh the list and show a message
          alert("Route removed successfully.");
        })
        .catch((error) => {
          console.error(error);
          alert("Error: Unable to remove the route.");
        });
    }
  };
  // const findByRouteName = () => {
  //   RouteService
  //     .createinitialize({ routeid: searchRouteName })
  //     .then((response) => {
  //       setRoute(response.data.routeList);
  //       console.log("Response Data:",response.data.routeList);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  return (
    <div className="Container mt-5">
      <div className="row">
      <div className="col-md-9">
      <div className="header-container">
      <h4>
        <center>Route List</center>
      </h4>

      <button
        className="btn btn-primary"
        onClick={() => navigate("/createroute")}
      >
        Create New +
      </button>
      </div>
      <div className="row justify-content-center">
        <div className="col md-12">
          <div className="scrollable-table-container">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Route ID </th>
                    <th>Route Name</th>
                    {/* <th>Route Code</th> */}
                    <th>Route Destination</th>
                    <th>Route Distance in km</th>
                    <th>Route Status</th>
                    <th>
                      <center>Actions</center>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Route.map((route, index) => (
                    <tr
                      className={
                        "table" + (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveRoute(route, index)}
                      key={index}
                    >
                      <td>{route.routeid}</td>
                      <td>{route.routename}</td>
                      {/* <td>{route.routecode}</td> */}
                      <td>{route.routedes}</td>
                      <td>{route.routedistanceinkm}</td>

                      <td>
                        {route.status === 2 ? (
                          <span
                            className="badge badge-success"
                            style={{ color: "grey" }}
                          >
                            InActive
                          </span>
                        ) : (
                          <span
                            className="badge badge-danger"
                            style={{ color: "black" }}
                          >
                            Active
                          </span>
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/updateroute/${route.routeid}`}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger btn-sm mx-2"
                          onClick={() => ChangeStatus(route.routeid)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
export default RouteList;
