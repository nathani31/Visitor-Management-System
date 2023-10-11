import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from 'react-router-dom';
// import StateService from "../../services/StateService";
import StateList from "./StateList";

const State = () => {
  // const { id } = useParams();
  // // const navigate = useNavigate();

  // const [stateData, setStateData] = useState({
  //   stateid: null,
  //   statename: "",
  //   statecode: "",
  //   countryid: null,
  //   status: 0,
  //   createdby: "",
  //   createdon: null,
  //   modifiedby: "",
  //   modifiedon: null,
  // });

  // const [message, setMessage] = useState("");

  // // Define functions for your CRUD operations

  // const Create = () => {
  //   StateService.Create(stateData)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("The state was created successfully!");
  //       // Optionally, you can redirect the user to a list of states or another page
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to create the state.");
  //     });
  // };

  // const Update = () => {
  //   StateService.Update(stateData)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("The state was updated successfully!");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to update the state.");
  //     });
  // };

  // const ChangeStatus = () => {
  //   StateService.ChangeStatus(stateData.stateid)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("Status changed successfully");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to change the status.");
  //     });
  // };

  // const CreateInitialize = () => {
  //   StateService.CreateInitialize(stateData.stateid)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("Create Initialize Successfully");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to perform createInitialize.");
  //     });
  // };

  // const SearchInitialize = () => {
  //   StateService.SearchInitialize(stateData.stateid)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("Search Initialize Successfully");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to perform searchInitialize.");
  //     });
  // };

  

  // // Fetch state data when the component mounts or when the ID changes
  // useEffect(() => {
  //   if (id) {
  //     StateService.get(id)
  //       .then(response => {
  //         setStateData(response.data);
  //         console.log(response.data);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         setMessage("Error: Unable to fetch state data.");
  //       });
  //   }
  // }, [id]);

  // // Handle input changes
  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setStateData({ ...stateData, [name]: value });
  // };

  return (
    <div>   
      <StateList />
      
    </div>
  );
}

export default State;
