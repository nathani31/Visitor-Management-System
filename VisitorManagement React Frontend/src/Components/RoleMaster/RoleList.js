import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import RoleService from "../../services/RoleService";
import axios from "axios";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");
  const [currentRole, setCurrentRole] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    retrieveRoles();
  }, []);

  const retrieveRoles = () => {
    RoleService.searchInitialize({
      roleid: 0
    })
      .then((response) => {
        console.log(response.data);
        setRoles(response.data.roleList); // Ensure RoleList is an array
        console.log(response.data.roleList );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const refreshList = () => {
    retrieveRoles();
    setCurrentRole(null);
    setCurrentIndex(-1);
  };

  const setActiveRole = (role, index) => {
    setCurrentRole(role);
    setCurrentIndex(index);
  };
  const changeStatus = (roleid) => {
    if(window.confirm("Do you want to remove this role?")){
      let value = {roleid:roleid};
      console.log("Role Id to be removed:" ,value);

      RoleService.changeStatus(value)
      .then((response) => {
        console.log("Changestatus Response:" ,response.data);
        refreshList();
        setMessage("Role removed successfully");

      })
      .catch((error) => {
        console.error(error);
        setMessage("Error:Unable to remove the role")
      })
    }
  }
  // const removeRole = (roleid) => {
  //   if (window.confirm("Are you sure you want to remove this role?")) {
  //     // Make a DELETE request to your server to delete the role by roleid
  //     axios.delete(`/api/roles/delete/${roleid}`)
  //       .then(() => {
  //         refreshList(); // Refresh the list after successful deletion
  //         setMessage("Role removed successfully.");
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setMessage("Error: Unable to remove the role.");
  //       });
  //   }
  // };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
        <div className="header-container">
          <h4>Roles List</h4>
          <button className="btn btn-primary" onClick={() => navigate("/AddRole")}>
            Create New +
          </button>
          </div>
          <div className="scrollable-table-container">
         
          
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Role Name</th>
                  <th>Role Code</th>
                  {/* <th>Company Id</th>
                  <th>Plant Id</th> */}
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr
                    className={"table" + (index === currentIndex ? " active" : "")}
                    onClick={() => setActiveRole(role, index)}
                    key={role.roleid}
                  >
                    <td>{role.rolename}</td>
                    <td>{role.rolecode}</td>
                    {/* <td>{role.companyid}</td>
                    <td>{role.plantid}</td> */}
                    <td>
                      {role.status === 2 ? (
                        <span className="badge badge-success" style={{ color: "grey" }}>InActive</span>
                      ) : (
                        <span className="badge badge-danger" style={{ color: "black" }}>Active</span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/updateRole/${role.roleid}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <span className="mx-2"></span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => changeStatus(role.roleid)}
                        
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
          {currentRole ? (
            <div>
              <h4>Role Details</h4>
              <div>
                <label>
                  <strong>Role Name:</strong>
                </label>{" "}
                {currentRole.rolename}
              </div>
              <div>
                <label>
                  <strong>Role Code:</strong>
                </label>{" "}
                {currentRole.rolecode}
              </div>
              {/* <div>
                <label>
                  <strong>Company Id:</strong>
                </label>{" "}
                {currentRole.companyid}
              </div>
              <div>
                <label>
                  <strong>Plant Id:</strong>
                </label>{" "}
                {currentRole.plantid}
              </div> */}
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentRole.status === 2 ? (
                  <span className="badge badge-success" style={{ color: "black" }}>InActive</span>
                ) : (
                  <span className="badge badge-danger" style={{ color: "black" }}>Active</span>
                )}
              </div>
              {/* <Link
                to={`/updateRole/${currentRole.roleid}`}
                className="btn btn-warning"
              >
                Edit
              </Link>
              <span className="mx-2"></span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => changeStatus(currentRole.roleid)}
                        
                      >
                        Remove
                      </button> */}
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Role...</p>
            </div>
          )}
        </div>
      </div>
      </div>
   
  );
};

export default RoleList;
