import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoleService from '../../services/RoleService';
import { Formik,Field,Form } from 'formik';



const UpdateRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const initialValues = {
    roleid: id,
    rolename: '',
    rolecode: '',
    companyid: 0,
    plantid: 0,
    status: 1 // Set a default value for status
  };

  const [message, setMessage] = useState('');
  const [roleData, setRoleData] = useState(initialValues);

  useEffect(() => {
    if (id) {
      console.log("if success: " + id);
      let data = { roleid: id };
      RoleService.createInitialize(data)
        .then(response => {
          console.log(response.data.roleMasterList[0]);
          setRoleData(response.data.roleMasterList[0]);
          // const { deptname, deptcode, companyid, plantid } = response.data;
          // // Use Formik's setValues to set initial values
          // formik.setValues({ ...formik.values, deptname, deptcode, companyid, plantid });
        })
        .catch(error => {
          console.error(error);
          setMessage('Error: Unable to fetch Role data.');
        });
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const requestData = { RoleMaster: values };
    console.log("update Data:", requestData);
    // for debugging
    try {
      // Call the update function from your RouteService
      const response = await RoleService.update(requestData);

      if (response.data && response.data.transtatus.result) {
        if(window.confirm("Role updated successfully"))
        {
          navigate('/RoleList');
        }  
      } else {
        setMessage("Error: Unable to update the Role data.");
      }
    } catch (error) {
      setMessage("Error: Unable to update the Role.");
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

      <h1>Update Role</h1>
      <Formik
        initialValues={roleData}
        onSubmit={handleSubmit} enableReinitialize={true}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="rolename" className="form-label">
                Role Name
              </label>
              <Field
                type="text"
                id="rolename"
                name="rolename"
                className="form-control"
               
                placeholder="Enter Role Name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rolecode" className="form-label">
                Role code
              </label>
              <Field
                type="text"
                id="rolecode"
                name="rolecode"
                className="form-control"
                
                placeholder="Enter Role Code"
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
                
                placeholder="Enter Role Code"
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
                
                placeholder="Enter Role Code"
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
      <button className="btn btn-secondary" onClick={() => navigate("/")}>
        Back to Role List
      </button>
    </div>
   
  );
};

export default UpdateRole;

