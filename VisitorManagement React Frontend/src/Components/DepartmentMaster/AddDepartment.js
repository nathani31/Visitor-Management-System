import axios from 'axios';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Company = [
  { id: 1, name: 'Zoho' },
  { id: 2, name: 'Tcs' },
  { id: 3, name: 'Wipro' },
  { id: 4, name: 'Leiten' },
  { id: 5, name: 'Agaram' },
];

const plant = [
  { id: 1, name: 'Z001' },
  { id: 2, name: 'T001' },
  { id: 3, name: 'W001' },
  { id: 4, name: 'L001' },
  { id: 5, name: 'A001' },
];

const AddDepartment = () => {
  const navigate = useNavigate();
  const initialValues = {
    deptname: '',
    deptcode: '',
    companyid: '',
    plantid: '',
    status: '',
  };

  // Define validation schema
  const validationSchema = Yup.object().shape({
    deptname: Yup.string().required('Department Name is required'),
    deptcode: Yup.string().required('Department Code is required'),
    companyid: Yup.string().required('Company ID is required'),
    plantid: Yup.string().required('Plant ID is required'),
    status: Yup.string().required('Status is required'),
  });

  const [message, setMessage] = useState('');

  return (
    <div className="container mt-5">
      <div className="col-md-6">
      <h1>Create Department</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Make an HTTP POST request to your backend API with the form data
            let reqData = { DepartmentMaster: values };
            console.log('reqdata:', reqData);
            const response = await axios.post(
              'https://localhost:7252/api/Department/Create',
              reqData
            ); // Replace with your actual API endpoint

            console.log(response.status);
            if (response.status === 200) {
              // Display the success alert
              console.log('Department saved successfully');
              alert('Department saved successfully');
              setMessage('Saved Successfully!');
              // Optionally, you can redirect to a different page or update the UI as needed
              navigate('/'); // Replace with the desired route
            } else {
              // alert('Role saved successfully');
              console.error('Error: Unable to save department');
            }
          } catch (error) {
            console.error('Error:', error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="text-center">
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
                required
              />
              <ErrorMessage
                name="deptname"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="deptcode" className="form-label">
                Department Code
              </label>
              <Field
                type="text"
                id="deptcode"
                name="deptcode"
                className="form-control"
                placeholder="Enter Department Code"
                required
              />
              <ErrorMessage
                name="deptcode"
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
    </div>
    </div>
  );
};

export default AddDepartment;
