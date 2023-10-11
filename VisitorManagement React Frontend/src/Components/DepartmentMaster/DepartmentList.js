import React, { useEffect, useState } from "react";
import { Link, UNavigate, useNavigate } from "react-router-dom";
import DepartmentService from "../../services/DepartmentService";

const DepartmentList = () => {
  const [departments, setDepartment] = useState([]);
  const [message, setMessage] = useState("");
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
  
  
   useEffect(() => {
    retrieveDepartment();
  }, []);

  const retrieveDepartment = () => {
    DepartmentService.SearchInitialize({
      deptid: 0
    })
      .then((response) => {
        console.log(response.data.DepartmentMasters);
        setDepartment(response.data.DepartmentMasters);
        // setLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const refreshList = () => {
    retrieveDepartment();
    setCurrentDepartment(null);
    setCurrentIndex(-1);
  };

  const setActiveDepartment = (department, index) => {
    setCurrentDepartment(department);
    setCurrentIndex(index);
  };

  const ChangeStatus = (deptid) => {
    if (window.confirm("Are you sure you want to remove this deptid?")) {
      let value = { deptid: deptid };
      console.log("deptid to be removed:", value);

      DepartmentService.ChangeStatus(value)
        .then((response) => {
          console.log("ChangeStatus Response:", response.data);
          refreshList();
          setMessage("Department removed successfully.");
        })
        .catch((error) => {
          console.error(error);
          setMessage("Error: Unable to remove the department.");
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
        <div className="header-container">
          <h4>Department List</h4>
          <button className="btn btn-primary" onClick={() => navigate("/AddDepartment")}>
            Create New +
          </button>
          </div>
          {loading ? (
            <p>Loading departments...</p>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Department Name</th>
                  <th>Department Code</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department, index) => (
                  <tr
                    className={"table" + (index === currentIndex ? " active" : "")}
                    onClick={() => setActiveDepartment(department, index)}
                    key={index}
                  >
                    <td>{department.deptname}</td>
                    <td>{department.deptcode}</td>
                    <td>
                      {department.status === 2 ? (
                        <span className="badge badge-success" style={{ color: "red" }}>InActive</span>
                      ) : (
                        <span className="badge badge-danger" style={{ color: "green" }}>Active</span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/UpdateDepartment/${department.deptid}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <span className="mx-2"></span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => ChangeStatus(department.deptid)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="mt-3">{message}</p>
        </div>
        <div className="col-md-4">
          {currentDepartment ? (
            <div>
              <h4>Department Details</h4>
              <div>
                <label>
                  <strong>Department Name:</strong>
                </label>{" "}
                {currentDepartment.deptname}
              </div>
              <div>
                <label>
                  <strong>Department Code:</strong>
                </label>{" "}
                {currentDepartment.deptcode}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentDepartment.status === 2 ? (
                  <span className="badge badge-success" style={{ color: "black" }}>InActive</span>
                ) : (
                  <span className="badge badge-danger" style={{ color: "black" }}>Active</span>
                )}
              </div>
              <Link
                to={`/UpdateDepartment/${currentDepartment.deptid}`}
                className="btn btn-warning btn-sm"
              >
                Edit
              </Link>
              <span className="mx-2"></span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => ChangeStatus(currentDepartment.deptid)}
              >
                Remove
              </button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Department...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
