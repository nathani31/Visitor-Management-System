import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import DepartmentService from '../../services/DepartmentService';

const UpdateDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    deptid: id,
    deptname: '',
    deptcode: '',
    companyid: '',
    plantid: '',
    status: 1 // Set a default value for status
  };

  const [message, setMessage] = useState('');
  const [DepartmentData, setDepartmentData] = useState(initialValues);

  useEffect(() => {
    if (id) {
      console.log("if success: " + id);
      let data = { deptid: id };
      DepartmentService.CreateInitialize(data)
        .then(response => {
          console.log(response.data.departmentMasters);
          setDepartmentData(response.data.departmentMasters[0]);
          // const { deptname, deptcode, companyid, plantid } = response.data;
          // // Use Formik's setValues to set initial values
          // formik.setValues({ ...formik.values, deptname, deptcode, companyid, plantid });
        })
        .catch(error => {
          console.error(error);
          setMessage('Error: Unable to fetch route data.');
        });
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const requestData = { DepartmentMaster: values };
    console.log("update Data:", requestData);
    // for debugging
    try {
      // Call the update function from your RouteService
      const response = await DepartmentService.Update(requestData);

      if (response.data && response.data.transtatus.result) {
        setMessage("Department updated successfully!");
      } else {
        setMessage("Error: Unable to update the Department data.");
      }
    } catch (error) {
      setMessage("Error: Unable to update the Department.");
    } finally {
      setSubmitting(false);
    }
  };

  const formik = Formik({
    initialValues,
    onSubmit: handleSubmit
  });

  return (
    <div className="container mt-5">
            <div className="col-md-6">

      <h1>Update Department</h1>
      <Formik
        initialValues={DepartmentData}
        onSubmit={handleSubmit} enableReinitialize={true}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="deptname" className="form-label">
                Department Name
              </label>
              <Field
                type="text"
                id="deptname"
                name="deptname"
                className="form-control"
                placeholder="Enter Department Name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="deptcode" className="form-label">
                Department code
              </label>
              <Field
                type="text"
                id="deptcode"
                name="deptcode"
                className="form-control"
                placeholder="Enter Department Code"
              />
            </div>



            <div className="mb-3">
              <label htmlFor="companyid" className="form-label">
                Company Id 
              </label>
              <Field
                type="text"
                id="companyid"
                name="companyid"
                className="form-control"
                // value={DepartmentData.companyid}
                placeholder="Enter Company Id  "
              />
            </div>
            <div className="mb-3">
              <label htmlFor="plantid" className="form-label">
                Plant Id 
              </label>
              <Field
                type="text"
                id="plantid"
                name="plantid"
                className="form-control"
                // value={DepartmentData.plantid}
                placeholder="Enter Plant Id  "
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
                className="form-control" // Use form-control class for Bootstrap styling
              >
                <option value='1'>Active</option>
                <option value="2">Inactive</option>
              </Field>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
      <button className="btn btn-secondary" onClick={() => navigate("/departments")}>
        Back to Department List
      </button>
    </div>
    </div>
  );
};

export default UpdateDepartment;