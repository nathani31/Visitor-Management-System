import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Company = [
  { id: 1, name: 'Leiten' },
  { id: 2, name: 'Agaram' },
  { id: 3, name: 'TCS' },
  { id: 4, name: 'Accentre' },
  { id: 5, name: 'Wipro' },
];

const plant = [
  { id: 1, name: 'LEIT' },
  { id: 2, name: 'AGAR' },
  { id: 3, name: 'TCS' },
  { id: 4, name: 'WIP' },
  { id: 5, name: 'ACCT' },
];

const AddRole = () => {
  const navigate = useNavigate();
  const initialValues = {
    rolename: '',
    rolecode: '',
    companyid: '',
    plantid: '',
    status: '',
  };

  // Define validation schema
  const validationSchema = Yup.object().shape({
    rolename: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
      .required('Role Name is required'),
    rolecode: Yup.string().required('Role Code is required'),
    companyid: Yup.string().required('Company ID is required'),
    plantid: Yup.string().required('Plant ID is required'),
    status: Yup.string().required('Status is required'),
  });

  const [message, setMessage] = useState('');

  return (
    <div className="container mt-5">
      <div className="col-md-6">
      <h1>Create Role</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            let reqData = { RoleMaster: values };
            console.log('reqdata:', reqData);
            const response = await axios.post(
              'https://localhost:7252/RoleMasterController/Create',
              reqData
            );

            console.log(response.status);
            if (response.status === 200) {
              console.log('Role saved successfully');
              alert('Role saved successfully');
              setMessage('Saved Successfully!');
              navigate('/rolelist'); // Redirect to Role List after successful submission
            } else {
              console.error('Error: Unable to save role');
            }
          } catch (error) {
            console.error('Error:', error);
          }
          setSubmitting(false);
        }}
      >
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
                required
              />
              <ErrorMessage
                name="rolename"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rolecode" className="form-label">
                Role Code
              </label>
              <Field
                type="text"
                id="rolecode"
                name="rolecode"
                className="form-control"
                placeholder="Enter Role Code"
                required
              />
              <ErrorMessage
                name="rolecode"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="companyid" className="form-label">
                Company Id
              </label>
              <Field
                as="select"
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
              <ErrorMessage
                name="companyid"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="plantid" className="form-label">
                Plant Id
              </label>
              <Field
                as="select"
                id="plantid"
                name="plantid"
                className="form-control"
              >
                <option value="">Select Plant</option>
                {plant.map((plant) => (
                  <option key={plant.id} value={plant.id}>
                    {plant.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="plantid"
                component="div"
                className="text-danger"
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
                <option value="">Select Status</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-danger"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <p className="mt-3 text-center">{message}</p>
        <button className="btn btn-secondary" onClick={() => navigate('/rolelist')}>
          Back to Role List
        </button>
      </div>
    </div>
    </div>
  );
};

export default AddRole;
