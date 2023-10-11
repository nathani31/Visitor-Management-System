import React, { useState, useEffect } from "react";
import CountryService from "../../services/Countryservice";
import { Link , useNavigate} from "react-router-dom";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    retrieveCountries();
  }, []);

//  const onChangeSearchCountryName = (e) => {
//     const name = e.target.value;
//     setSearchCountryName(name);
//   };
 
  const retrieveCountries = () => {
    CountryService.SearchInitialize({Countryid:0})
     .then((response) => {
          
          console.log(response.data); 
          console.log(response.data.countryMasterOneList);

         setCountries(response.data.countryMasterOneList);
          
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const retrieveCountries = () => {
  //   CountryService.SearchInitialize({Countryid:0})
  //    .then((response) => {
          
  //         console.log(response.data); 
  //         console.log(response.data.countryMasterList);

  //        setCountries(response.data.countryMasterList);
          
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const refreshList = () => {
    retrieveCountries();
    setCurrentCountry(null);
    setCurrentIndex(-1);
  };

  
  const setActiveState = (country, index) => {
    setCurrentCountry(country);
    setCurrentIndex(index);
  };

  const ChangeStatus = (Countryid) => {

    if (window.confirm("Are you sure you want to remove this state?")) {
      // Make an API request to change the status of a state
      let reqdata={Countryid:Countryid }
      CountryService.ChangeStatus(reqdata)
        .then(() => {
          // After successful status change, refresh the list and show a message
          refreshList();
          setMessage("Country removed successfully.");
        })
        .catch((error) => {
          console.error(error);
          setMessage("Error: Unable to remove the Country.");
        });
    }
  };

  // const removeAllCountries = () => {
  //   CountryService.changeStatus({ countryid: null })
  //     .then(response => {
  //       console.log(response.data);
  //       setMessage("All countries have been removed successfully.");
  //       refreshList();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };


  // const findByCountryName = () => {
  //   CountryService.createInitialize({ Countryid: searchCountryName })
  //     .then(response => {
  //       setCountries(response.data.CountryList);
  //       console.log(response.data.CountryList);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const navigate = useNavigate();
   return (
    <div className="container mt-5">
    <div className="row">
    <div className="col-md-6">
      <div className="header-container">
        <h4>Country List</h4>
        <button className="btn btn-primary" onClick={() => navigate("/CreateCountry")}>
          Create New +
        </button>
      </div>
        <div className="scrollable-table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Country Name</th>
              <th>Country Code</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr
                className={"table" + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveState(country, index)}
                key={country.countryid}
              >
               <td>{country.countryname}</td>
                <td>{country.countrycode}</td> 
                <td>
                  {country.status === 2 ? (
                    <span className="badge badge-success" style={{ color: "grey" }}>InActive</span>
                  ) : (
                    <span className="badge badge-danger" style={{ color: "black" }}>Active</span>
                  )}
                </td>
                <td>
                  <Link
                  to={`/updatecountry/${country.countryid}`}
                  className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>
                  <span className="mx-2"></span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => ChangeStatus(country.countryid)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <p className="mt-3">{message}</p>
      </div>
        <div className="col-md-4">
          {currentCountry ? (
            <div>
              <h4>Country Details</h4>
              <div>
                <label>
                  <strong>Country Name:</strong>
                </label>{" "}
                {currentCountry.countryname}
              </div>
              <div>
                <label>
                  <strong>Country Code:</strong>
                </label>{" "}
                {currentCountry.countrycode}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCountry.status  === 2 ? (
                  <span className="badge badge-success" style={{ color: "black" }}>InActive</span>
                ) : (
                  <span className="badge badge-danger" style={{ color: "black" }}>Active</span>
                )}
              </div>
              {/* <Link
                to={`/updateCountry/${currentCountry.countryid}`}
                className="btn btn-success"
              >
                Edit
              </Link> */}
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Country...</p>
            </div>
          )}
        </div>
      
       
      </div>
    </div>


 );
};
    
export default CountryList;


