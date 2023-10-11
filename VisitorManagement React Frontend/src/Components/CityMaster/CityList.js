import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CityServices from "../../services/CityService";

const CityList = () => {
  const [City, setCity] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchCityName, setsearchCityName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    retrieveCity();
  }, []);

  const retrieveCity = () => {
    CityServices.searchInitialize({ Cityid: 0 })
      .then((response) => {
        console.log(response.data.cityMasterList);
        setCity(response.data.cityMasterList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCity();
    setCurrentCity(null);
    setCurrentIndex(-1);
  };

  const setActiveCity = (city, index) => {
    setCurrentCity(city);
    setCurrentIndex(index);
  };

  const changeStatus = (id) => {
    if (window.confirm("Are you sure you want to remove this City?")) {
      let reqdata = { Cityid: id };
      CityServices.changeStatus(reqdata)
        .then(() => {
          refreshList();
          setMessage("City removed successfully.");
        })
        .catch((error) => {
          console.error(error);
          setMessage("Error: Unable to remove the city.");
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row ">
        <div className="col-md-6">
        <div className="header-container">
          <h4>Cities List</h4>
          <button className="btn btn-primary" onClick={() => navigate("/Createcity")}>
        Create New +
      </button>
      </div>
       
          <div className="scrollable-table-container">
          <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>City ID</th>
                <th>City Name</th>
                <th>City Code</th>
                {/* <th>Country ID</th>
                <th>State ID</th> */}
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {City.map((city, index) => (
                <tr
                  className={index === currentIndex ? "table-active" : ""}
                  onClick={() => setActiveCity(city, index)}
                  key={index}
                >
                  <td>{city.cityid}</td>
                  <td>{city.cityname}</td>
                  <td>{city.citycode}</td>
                  {/* <td>{city.countryid}</td>
                  <td>{city.stateid}</td> */}
                  <td>
                    {city.status === 2 ? (
                      <span
                        className="badge badge-success"
                        style={{ color: "black" }}
                      >
                        Inactive
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
                      to={`/updatecity/${city.cityid}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger btn-sm mx-2"
                      onClick={() => changeStatus(city.cityid)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            
            
            
          </table>
          </div>
          </div>
          <p className="mt-3">{message}</p>
        </div>

        <div className="col-md-4">
          {currentCity ? (
            <div>
             

              <h4>City Details</h4>
              <div>
                <label>
                  <strong>City ID:</strong>
                </label>{" "}
                {currentCity.cityid}
              </div>
              <div>
                <label>
                  <strong>City Name:</strong>
                </label>{" "}
                {currentCity.cityname}
              </div>
              <div>
                <label>
                  <strong>City Code:</strong>
                </label>{" "}
                {currentCity.citycode}
              </div>
              <div>
                <label>
                  <strong>Country ID:</strong>
                </label>{" "}
                {currentCity.countryid}
              </div>
              <div>
                <label>
                  <strong>State ID:</strong>
                </label>{" "}
                {currentCity.stateid}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCity.status === 2 ? (
                  <span
                    className="badge badge-success"
                    style={{ color: "black" }}
                  >
                    Inactive
                  </span>
                ) : (
                  <span
                    className="badge badge-danger"
                    style={{ color: "black" }}
                  >
                    Active
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CityList;
