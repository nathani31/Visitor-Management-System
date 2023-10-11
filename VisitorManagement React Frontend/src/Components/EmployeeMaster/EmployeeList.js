import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");
  const navigate=useNavigate();

  const retrieveEmployees = () => {
    // Make an API request to retrieve the list of employees
    EmployeeService.SearchInitialize({empid: 0})
      .then((response) => {
        console.log(response.data);
        // Update the 'employees' state with the data from the API response
        setEmployees(response.data.employeeList);
       
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const refreshList = () => {
    // Refresh the list of employees
    retrieveEmployees();
    setCurrentEmployee(null);
    setCurrentIndex(-1);
  };

  const setActiveEmployee = (employee, index) => {
    // Set the currently selected employee and its index
    setCurrentEmployee(employee);
    setCurrentIndex(index);
  };

  const ChangeStatus = (empid) => {
    if (window.confirm("Are you sure you want to remove this Employee?")) {
        // Debug: Log the stateId to make sure it's correct
     
      let value = {empid:empid};
      console.log("EmployeId to be removed:", value);
       // Make an API request to change the status of an employee
      EmployeeService.ChangeStatus(value)
        .then((response) => {
            // Debug: Log the API response
      console.log("ChangeStatus Response:",Response.data)
      
          // After a successful status change, refresh the list and show a message
          refreshList();
          setMessage("Employee removed successfully.");
        })
        .catch((error) => {
          console.error(error);
          setMessage("Error: Unable to remove the employee.");
        });
    }
  };

  useEffect(() => {
    // When the component mounts, fetch the list of employees
    retrieveEmployees();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-9">
        <div className="header-container">
          <h2>Employees List</h2>
          <button className="btn btn-primary" onClick={() => navigate("/AddEmployee")}>
        Create New +
      </button>
      </div>
        <div className="scrollable-table-container">
          
          <table className="table table-hover">
            <thead>
              <tr>
            {/* <th>Company ID</th>
            <th>Plant ID</th>  */}
            <th>Emp ID</th>
            <th>Emp Name</th>
            {/* <th>Emp Code</th>
            <th>Emp FirstName</th>
            <th>Emp LastName</th> */}
            {/* <th>Emp Dob</th> */}
            <th>Emp Age</th>
             {/* <th>Emp DesignationId</th>
            <th>Emp DeptId</th>  */}
            {/* <th>Emp Email</th> */}
             <th>Emp TelNo</th>
            <th>Emp Gender</th>
            <th>Emp TypeId</th>
            {/* <th>BiometricId</th>
            <th>Emp IdCardNo</th>
            <th>Emp PlantId</th> */}
            <th>Status</th>
            <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                className={"table" + (index === currentIndex ? " active" : "")}
                  onClick={() => setActiveEmployee(employee, index)}
                  key={employee.empid} // Use a unique identifier as the key
                >
                   {/* <td>{employee.companyid}</td>
                     <td>{employee.plantid}</td> */}
                   <td>{employee.empid}</td>
                  <td>{employee.empname}</td>
                  {/* <td>{employee.empcode}</td>
                  <td>{employee.empfirstname}</td>
                  <td>{employee.emplastname}</td>
                  <td>{employee.empdob}</td> */}
                  <td>{employee.empage}</td>
                  {/* <td>{employee.empdesignationid}</td>
                  <td>{employee.empdeptid}</td> */}
                  {/* <td>{employee.empemail}</td> */}
                  <td>{employee.emptelno}</td>
                  <td>{employee.empgender}</td>
                  <td>{employee.emptypeid}</td>
                  {/* <td>{employee.biometricid}</td>
                  <td>{employee.empidcardno}</td>
                  <td>{employee.empplantid}</td> */}
                 
                  <td>
                    {employee.status === 2 ? (
                      <span className="badge badge-success" style={{ color: "grey" }}>InActive</span>
                    ) : (
                      <span className="badge badge-danger" style={{ color: "black" }}>Active</span>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/updateemployee/${employee.empid}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>
                    <span className="mx-2"></span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => ChangeStatus(employee.empid)}
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
        
        <div className="col-md-0">
          <div>
          {currentEmployee ? (
            <div>
              <h4>Employee Details</h4>
              {/* <div>
                <label>
                  <strong>Company Id:</strong>
                </label>{" "}
                {currentEmployee.companyid}
              </div>
              <div>
                <label>
                  <strong>Plant Id:</strong>
                </label>{" "}
                {currentEmployee.plantid}
              </div> */}
              <div>
                <label>
                  <strong>Employee Id:</strong>
                </label>{" "}
                {currentEmployee.empid}
              </div>
              <div>
                <label>
                  <strong>Employee Name:</strong>
                </label>{" "}
                {currentEmployee.empname}
              </div>
              <div>
                <label>
                  <strong>Employee Code:</strong>
                </label>{" "}
                {currentEmployee.empcode}
              </div>
              <div>
                <label>
                  <strong>Employee FirstName:</strong>
                </label>{" "}
                {currentEmployee.empfirstname}
              </div>
              <div>
                <label>
                  <strong>Employee LastName:</strong>
                </label>{" "}
                {currentEmployee.emplastname}
              </div>
              <div>
                <label>
                  <strong>Employee Dob:</strong>
                </label>{" "}
                {currentEmployee.empdob}
              </div>
              <div>
                <label>
                  <strong>Employee Age:</strong>
                </label>{" "}
                {currentEmployee.empage}
              </div>
              {/* <div>
                <label>
                  <strong>Employee DesignationId:</strong>
                </label>{" "}
                {currentEmployee.empdesignationid}
              </div>
              <div>
                <label>
                  <strong>Employee  DeptId:</strong>
                </label>{" "}
                {currentEmployee.empdeptid}
              </div> */}
              <div>
                <label>
                  <strong>Employee Email:</strong>
                </label>{" "}
                {currentEmployee.empemail}
              </div>
              <div>
                <label>
                  <strong>Employee TelNo:</strong>
                </label>{" "}
                {currentEmployee.emptelno}
              </div>
              <div>
                <label>
                  <strong>Employee Gender:</strong>
                </label>{" "}
                {currentEmployee.empgender}
              </div>
              <div>
                <label>
                  <strong>Employee TypeId:</strong>
                </label>{" "}
                {currentEmployee.emptypeid}
              </div>
              {/* <div>
                <label>
                  <strong>Employee BiometricId:</strong>
                </label>{" "}
                {currentEmployee.biometricid}
              </div>
              <div>
                <label>
                  <strong>Employee IdCardNo:</strong>
                </label>{" "}
                {currentEmployee.empidcardno}
              </div>
              <div>
                <label>
                  <strong>Employee PlantId:</strong>
                </label>{" "}
                {currentEmployee.empplantid}

              </div> */}
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentEmployee.status === 2 ? (
                  <span className="badge badge-success" style={{ color: "red" }}>InActive</span>
                ) : (
                  <span className="badge badge-danger" style={{ color: "green" }}>Active</span>
                )}
              </div>
              <Link
                to={`/UpdateEmployee/${currentEmployee.empid}`}
                className="btn btn-warning"
              >
                Edit
              </Link>
              <span className="mx-2"></span> 
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => ChangeStatus(currentEmployee.empid)}
                    >
                      Remove
                    </button>
            </div>
          ) : (
            <div>
              <br />
              <br /><br /><br /><br /><br /><br /><br /><br />
              <p>Please click on a Employee...</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default EmployeeList;