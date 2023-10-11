import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import { Formik, Field, Form } from "formik";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    empid: id,
    empname: "",
    empcode: "",
    empfirstname: "",
    emplastname: "", 
    empdob: null,
    empage: "",
    empemail: "",
    emptelno: "",
    empgender: "",
    emptypeid: "",
    status: 0,
  };

  const [employeeData, setEmployeeData] = useState(initialValues);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      let reqdata = { empid: id };
      console.log("Employee Id", reqdata);
      EmployeeService.CreateInitialize(reqdata)
        .then((response) => {
          console.log("response Data", response.data.employeeMasterList[0]);
          setEmployeeData(response.data.employeeMasterList[0]);
        })
        .catch((error) => {
          console.error(error);
          setMessage("Error: Unable to fetch employee data");
        });
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const requestData = { EmployeeMaster: values };
    console.log("Update Data:", requestData);

    try {
      const response = await EmployeeService.Update(requestData);
      console.log({ RoleMaster: employeeData });

      if (response.data && response.data.transtatus.result) {
        setMessage("Employee updated successfully!");
      } else {
        setMessage("Error: Unable to update the Employee.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error: Unable to update the Employee.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
            <div className="col-md-6">

      <h1>Update Employee</h1>
      <Formik
        initialValues={employeeData}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="empname">Empoyee Name:</label>
              <Field
                type="text"
                className="form-control"
                id="empname"
                name="empname"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="empcode">Empoyee Code:</label>
              <Field
                type="text"
                className="form-control"
                id="empcode"
                name="empcode"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="empfirstname">Empoyee First Name:</label>
              <Field
                type="text"
                className="form-control"
                id="empfirstname"
                name="empfirstname"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emplastname">Empoyee Last Name:</label>
              <Field
                type="text"
                className="form-control"
                id="emplastname"
                name="emplastname"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="empdob">Empoyee DOB:</label>
              <Field
                type="text"
                className="form-control"
                id="empdob"
                name="empdob"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="empage">Empoyee Age:</label>
              <Field
                type="text"
                className="form-control"
                id="empage"
                name="empage"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="empemail">Empoyee Email:</label>
              <Field
                type="text"
                className="form-control"
                id="empemail"
                name="empemail"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emptelno">Empoyee TelNo:</label>
              <Field
                type="text"
                className="form-control"
                id="emptelno"
                name="emptelno"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="empgender">Empoyee Gender:</label>
              <Field
                type="text"
                className="form-control"
                id="empgender"
                name="empgender"
                required
              />
            </div>
           
            
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <Field
                as="select"
                id="status"
                name="status"
                className="form-control"
              >
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </Field>
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <p className="mb-3 text-center">{message}</p>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/Employees")}
            >
              Back to Employee List
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default UpdateEmployee;