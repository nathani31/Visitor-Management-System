import React, { useState, useEffect } from "react";
import CountryList from "./CountryList";

const Country = () => {
  // const { id } = useParams();
 

  // const [CountryData, setCountryData] = useState({
  //   countryid: null,
  //   countryname: "",
  //   countrycode: "",
  //   status: 0,
  //   createdby: "",
  //   createdon: null,
  //   modifiedby: "",
  //   modifiedon: null,
  // });

  // const [message, setMessage] = useState("");

  // Define functions for your CRUD operations

  // const create = () => {
  //   CountryService.create(CountryData)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("The country was created successfully!");
  //       // Optionally, you can redirect the user to a list of states or another page
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to create the country.");
  //     });
  // };

  // const update = () => {
  //   CountryService.update(CountryData)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("The country was updated successfully!");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to update the country.");
  //     });
  // };

  // const changeStatus = () => {
  //   CountryService.changeStatus(CountryData.countryid)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("Status changed successfully");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to change the status.");
  //     });
  // };

  // const createInitialize = () => {
  //   CountryService.createInitialize(CountryData.countryid)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("Create Initialize Successfully");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to perform createInitialize.");
  //     });
  // };

  // const searchInitialize = () => {
  //   CountryService.searchInitialize(CountryData.countryid)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("Search Initialize Successfully");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to perform searchInitialize.");
  //     });
  // };

  // Fetch state data when the component mounts or when the ID changes
  // useEffect(() => {
  //   if (id) {
  //   CountryService.post(id)
  //       .then(response => {
  //         setCountryData(response.data);
  //         console.log(response.data);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         setMessage("Error: Unable to fetch Country data.");
  //       });
  //   }
  // }, [id]);

  // // Handle input changes
  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setCountryData({ ...CountryData, [name]: value });
  // };

  return (
    <div>
      <CountryList />
    </div>
  );
}

export default  Country;