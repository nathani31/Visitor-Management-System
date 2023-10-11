import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VisitorService from "../../services/VisitorService";

const VisitorsList = () => {
  const [visitors, setVisitors] = useState([]);
  const [currentVisitor, setCurrentVisitor] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // When the component mounts, fetch the list of visitors
    retrieveVisitors();
  }, []);

  const retrieveVisitors = () => {
    VisitorService.searchinitialize({ visitortypeid: 0 })
      .then((response) => {
        console.log("Response Data:", response.data.visitorMastersList);
        setVisitors(response.data.visitorMastersList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const refreshList = () => {
    // Refresh the list of visitors
    retrieveVisitors();
    setCurrentVisitor(null);
    setCurrentIndex(-1);
  };

  const setActiveVisitor = (visitor, index) => {
    // Set the currently selected visitor and its index
    setCurrentVisitor(visitor);
    setCurrentIndex(index);
  };

  const changeStatus = (visitortypeid) => {
    if (window.confirm("Are you sure you want to remove this Visitor Record?")) {
      const value = { visitortypeid: visitortypeid };
  
      // Make an API request to change the status of a visitor
      VisitorService.changeStatus(value)
        .then((response) => {
          // Debug: Log the API response
          console.log("ChangeStatus Response:", response.data);
          // After a successful status change, refresh the list and show a message
          refreshList();
          setMessage("Visitor Record removed successfully!!!!!!");
        })
        .catch((error) => {
          console.error("Error:", error);
          setMessage("Error: Unable to remove the Visitor Record!!!!!");
        });
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h4>Visitors List</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>visitortypeid </th>
                <th>visitortypename</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((visitor, index) => (
                <tr
                  className={"table" + (index === currentIndex ? " active" : "")}
                  onClick={() => setActiveVisitor(visitor, index)}
                  key={visitor.visitortypeid} // Use a unique identifier as the key
                >
                  <td>{visitor.visitortypeid}</td>
                  <td>{visitor.visitortypename}</td>
                  <td>
                    {visitor.status === 2 ? (
                      <span className="badge badge-success" style={{ color: "red" }}>In-Active</span>
                    ) : (
                      <span className="badge badge-danger" style={{ color: "green" }}>Active</span>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/Update/${visitor.visitortypeid}`}
                      className="btn btn-outline-primary btn-sm" >Edit
                    </Link>
                    <span className="mx-2"></span>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => changeStatus(visitor.visitortypeid)}> Remove
                      </button>
             </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3">{message}</p>
        </div>
        <div className="col-md-4">
          {currentVisitor ? (
            <div>
              <h4>Visitor Details</h4>
              <div>
                <label>
                  <strong>visitortypeid</strong>
                </label>{" "}
                {currentVisitor.visitortypeid}
              </div>
              <div>
                <label>
                  <strong>visitortypename</strong>
                </label>{" "}
                {currentVisitor.visitortypename}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentVisitor.status === 2 ? (
                  <span className="badge badge-success" style={{ color: "Red" }}>In-Active</span>
                ) : (
                  <span className="badge badge-danger" style={{ color: "green" }}>Active</span>
                )}
              </div>
              <Link
                to={`/Update/${VisitorsList.visitortypename}`}
                className="btn btn-info">EDIT</Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please Click On a Visitor...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorsList;