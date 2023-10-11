import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Company = [
  { id: 1, name: 'wipro' },
  { id: 2, name: 'TCS' },
  { id: 3, name: 'Leiten' },
  { id: 4, name: 'Accentre' },
  { id: 5, name: 'Agaram' },
];

const plant = [
  { id: 1, name: 'WIP' },
  { id: 2, name: 'TCS' },
  { id: 3, name: 'LEIT' },
  { id: 4, name: 'ACCT' },
  { id: 5, name: 'AGAR' },
];

const Designation = [
  { id: 1, name: 'Testing' },
  { id: 2, name: 'Developer' },
  { id: 3, name: 'Business Executive' },
  { id: 4, name: 'Mechanical' },
  { id: 5, name: 'Engineer' },
];

const Dept = [
  { id: 1, name: 'Test' },
  { id: 2, name: 'Dev' },
  { id: 3, name: 'Business' },
  { id: 4, name: 'Mech' },
  { id: 5, name: 'Eng' },
];

const AddEmployee = () => {
  const navigate = useNavigate();

  const initialEmployee = {
    companyid: '',
    plantid: '',
    empname: '',
    empcode: '',
    empfirstname: '',
    emplastname: '',
    empdob: '',
    empage: '',
    empdesignationid: '',
    empdeptid: '',
    empemail: '',
    emptelno: '',
    empgender: '',
    emptypeid: '',
    status: '',
  };

  const validationSchema = Yup.object().shape({
    companyid: Yup.number().required("Company ID is required"),
    plantid: Yup.number().required("Plant ID is required"),
    empname: Yup.string().required("Employee Name is required"),
    empcode: Yup.string().required("Employee Code is required"),
    empfirstname: Yup.string().required("Employee Firstname is required"),
    emplastname: Yup.string().required("Employee Lastname is required"),
    empdob: Yup.string().required("Employee DOB is required"),
    empage: Yup.number().required("Employee Age is required").positive("Age must be a positive number"),
    empdesignationid: Yup.number().required("Employee Designation ID is required"),
    empdeptid: Yup.number().required("Employee Department ID is required"),
    empemail: Yup.string().email("Invalid email format").required("Employee Email is required"),
    emptelno: Yup.string().required("Employee Tel No is required"),
    empgender: Yup.string().required("Employee Gender is required"),
    emptypeid: Yup.string().required("Employee Type ID is required"),
    status: Yup.string().required("Status is required"),
  });

  return (
    <div className="container mt-5">
      <h1>Create Employee</h1>
      <Formik
        initialValues={initialEmployee}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            let reqdata = { EmployeeMaster: values };
            console.log("reqdata:", reqdata);
            // Make an HTTP POST request to your backend API with the form data
            const response = await axios.post("https://localhost:7243/Employee/Create", reqdata); // Replace with your actual API endpoint
            if (response.data && response.data.success) {
              console.log("Employee added successfully");
              // Optionally, you can redirect to a different page or update the UI as needed
              navigate("/employees");
            } else {
              alert("Employee Details saved successfully");
            }
          } catch (error) {
            console.error("Error:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
          <div className="row">
            <div className="col-md-6">
              {/* <div className="form-group">
                <label htmlFor="companyid">Company Id</label>
                <Field
                  type="text"
                  className="form-control"
                  id="companyid"
                  name="companyid"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="plantid">Plant Id</label>
                <Field
                  type="text"
                  className="form-control"
                  id="plantid"
                  name="plantid"
                  required
                />
              </div> */}
                  <div className="mb-3">
            <label htmlFor="companyid" className="form-label">
              Company ID
            </label>
            <Field
              as="select" // Use select element for dropdown
              id="companyid"
              name="companyid"
              className="form-control"
            >
              <option value="">Select Company</option>
              {Company.map((Company) => (
                <option key={Company.id} value={Company.id}>
                  {Company.name}
                </option>
              ))}
            </Field>
           
          </div>

          <div className="mb-3">
            <label htmlFor="plantid" className="form-label">
              Plant ID
            </label>
            <Field
              as="select" // Use select element for dropdown
              id="plantid"
              name="plantid"
              className="form-control"
            >
              <option value="">Select Plant</option>
              {plant.map((Plant) => (
                <option key={Plant.id} value={Plant.id}>
                  {Plant.name}
                </option>
              ))}
            </Field>
          </div>

              <div className="form-group">
                <label htmlFor="empname">Emp Name</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empname"
                  name="empname"
                  placeholder = "Enter Employee Name"
                  required
                /> <ErrorMessage
                name="empname"
                component="div"
                className="text-danger"
              />
              </div>

              <div className="form-group">
                <label htmlFor="empcode">Emp Code</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empcode"
                  name="empcode"
                  placeholder = "Enter Employee Code"
                  required
                /> <ErrorMessage
                name="empcode"
                component="div"
                className="text-danger"
              />
              </div>

              <div className="form-group">
                <label htmlFor="empfirstname">Emp Firstname</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empfirstname"
                  name="empfirstname"
                  placeholder = "Enter Employee Firstname"
                  required
                /> <ErrorMessage
                name="empfirstname"
                component="div"
                className="text-danger"
              />
              </div>

              <div className="form-group">
                <label htmlFor="emplastname">Emp Lastname</label>
                <Field
                  type="text"
                  className="form-control"
                  id="emplastname"
                  name="emplastname"
                  placeholder = "Enter Employee Lastname"
                  required
                /> <ErrorMessage
                name="emplastname"
                component="div"
                className="text-danger"
              />
              </div>

              <div className="form-group">
                <label htmlFor="empdob">Emp Dob</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empdob"
                  name="empdob"
                  placeholder = "Enter Employee DOB"
                  required
                /> <ErrorMessage
                name="empdob"
                component="div"
                className="text-danger"
              />
              </div>

              <div className="form-group">
                <label htmlFor="empage">Emp Age</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empage"
                  name="empage"
                  placeholder = "Enter Employee Age"
                  required
                /> <ErrorMessage
                name="empage"
                component="div"
                className="text-danger"
              />
              </div>
            </div>

            <div className="col-md-6">
              {/* <div className="form-group">
                <label htmlFor="empdesignationid">Emp Designation Id</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empdesignationid"
                  name="empdesignationid"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="empdeptid">Emp Dept Id</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empdeptid"
                  name="empdeptid"
                />
              </div> */}
              
              <div className="mb-3">
              <label htmlFor="empdesignationid" className="form-label">
                Emp Designation ID
              </label>
              <Field
                as="select" // Use select element for dropdown
                id="empdesignationid"
                name="empdesignationid"
                className="form-control"
              >
                <option value="">Select Employee Designation Id</option>
                {Designation.map((Designation) => (
                  <option key={Designation.id} value={Designation.id}>
                    {Designation.name}
                  </option>
                ))}
              </Field>
            </div>
            <div className="mb-3">
              <label htmlFor="empdeptid" className="form-label">
                Emp Department ID
              </label>
              <Field
                as="select" // Use select element for dropdown
                id="empdeptid"
                name="empdeptid"
                className="form-control"
              >
                <option value="">Select Employee Department Id</option>
                {Dept.map((Dept) => (
                  <option key={Dept.id} value={Dept.id}>
                    {Dept.name}
                  </option>
                ))}
              </Field>
            </div>
              <div className="form-group">
                <label htmlFor="empemail">Emp Email</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empemail"
                  name="empemail"
                  placeholder = "Enter Employee Email"
                  required
                />
                 <ErrorMessage
                name="empemail"
                component="div"
                className="text-danger"
              />
              </div>

              <div className="form-group">
                <label htmlFor="emptelno">Emp Tel No</label>
                <Field
                  type="text"
                  className="form-control"
                  id="emptelno"
                  name="emptelno"
                  placeholder = "Enter Employee Telno"
                  required
                />
                 <ErrorMessage
                name="emptelno"
                component="div"
                className="text-danger"
              />
              </div>

              <div className="form-group">
                <label htmlFor="empgender">Emp Gender</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empgender"
                  name="empgender"
                  placeholder = "Enter Employee Gender"
                  required
                /> <ErrorMessage
                name="empgender"
                component="div"
                className="text-danger"
              />
              </div>

              <div className="form-group">
                <label htmlFor="emptypeid">Emp Type Id</label>
                <Field
                  type="text"
                  className="form-control"
                  id="emptypeid"
                  name="emptypeid"
                  placeholder = "Enter Employee Type Id"
                  required
                /> <ErrorMessage
                name="companycode"
                component="div"
                className="text-danger"
              />
              </div>
              <div className="form-group">
                <label htmlFor="status">status</label>
                <Field
                 as = "select"
                  className="form-control"
                  id="status"
                  name="status"
                >
                  <option value="">Select Status </option>
                  <option value='1'>Active</option>
                  <option value = '2'>InActive</option>
                  </Field> <ErrorMessage
                name="companycode"
                component="div"
                className="text-danger"
              />
              </div>


              {/* <div className="form-group">
                <label htmlFor="empbiometricid">Emp Biometric Id</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empbiometricid"
                  name="empbiometricid"
                  required
                />
              </div> */}

              {/* <div className="form-group">
                <label htmlFor="empidcardno ">Emp Id Card No</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empidcardno"
                  name="empidcardno"
                  required
                />
              </div> */}
                {/* 
              <div className="form-group">
                <label htmlFor="empplantid">Emp Plant Id</label>
                <Field
                  type="text"
                  className="form-control"
                  id="empplantid"
                  name="empplantid"
                  required
                />
              </div>  */}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEmployee;
