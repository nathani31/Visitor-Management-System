import React, { useState, useEffect } from "react";
import StateService from "../../services/StateService";
import { Link, useNavigate } from "react-router-dom";

const StateList = () => {
  const [states, setStates] = useState([]);
  const [currentState, setCurrentState] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // When the component mounts, fetch the list of states
    retrieveStates();
  }, []);

  const retrieveStates = () => {
    // Make an API request to retrieve the list of states
    StateService.SearchInitialize({
      stateid: 0
    })
      .then((response) => {
        // Update the 'states' state with the data from the API response
        console.log("retrieveState:",response.data.stateList);
        setStates(response.data.stateList);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const refreshList = () => {
    // Refresh the list of states
    console.log("RefreshList");
    retrieveStates();
    setCurrentState(null);
    setCurrentIndex(-1);
  };

  const setActiveState = (state, index) => {
    // Set the currently selected state and its index
    setCurrentState(state);
    setCurrentIndex(index);
  };

  const ChangeStatus = (stateId) => {
    if (window.confirm("Are you sure you want to remove this state?")) {
      // Debug: Log the stateId to make sure it's correct
      let value = {Stateid:stateId};
      console.log("StateId to be removed:", value);
       
      // Make an API request to change the status of a state
      StateService.ChangeStatus(value)
        .then((response) => {
          // Debug: Log the API response
          console.log("ChangeStatus Response:", response.data);
          // After successful status change, refresh the list and show a message
          refreshList();
          alert("State removed successfully.");
        })
        .catch((error) => {
          console.error(error);
          setMessage("Error: Unable to remove the state.");
        });

    }
  };


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
        <div className="header-container">
          <h4>States List</h4>
          <button className="btn btn-primary" onClick={ () => navigate("/createstate")}>Create New +</button>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>State Name</th>
                <th>State Code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {states.map((state, index) => (
                <tr
                  className={"table" + (index === currentIndex ? " active" : "")}
                  onClick={() => setActiveState(state, index)}
                  key={state.stateid} // Use a unique identifier as the key
                >
                  <td>{state.statename}</td>
                  <td>{state.statecode}</td>
                  <td>
                    {state.status === 2 ? (
                      <span className="badge badge-success" style={{ color: "grey" }}>InActive</span>
                    ) : (
                      <span className="badge badge-danger" style={{ color: "black" }}>Active</span>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/updatestate/${state.stateid}`}
                      className="btn btn-warning btn-sm"                    >
                      Edit
                    </Link>
                    <span className="mx-2"></span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => ChangeStatus(state.stateid)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3">{message}</p>
        </div>
        <div className="col-md-6">
          {currentState ? (
            <div>
              <h4>State Details</h4>
              <div>
                <label>
                  <strong>State Name:</strong>
                </label>{" "}
                {currentState.statename}
              </div>
              <div>
                <label>
                  <strong>State Code:</strong>
                </label>{" "}
                {currentState.statecode}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentState.status === 2 ? (
                  <span className="badge badge-success" style={{ color: "black" }}>InActive</span>
                ) : (
                  <span className="badge badge-danger" style={{ color: "black" }}>Active</span>
                )}
              </div>
              {/* <Link
                to={`/updatestate/${currentState.stateid}`}
                className="btn btn-success"
              >
                Edit
              </Link> */}
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a State...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StateList;
