import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "formik";

const AddCompany = () => {

  const navigate = useNavigate();

  const initialValues = {
    companyname: '',
    companycode: '',
    status: 1, // Assuming "Active" is the default status
  };

  const validationSchema = Yup.object({
    companyname: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
      .required('Company Name is required'),
    companycode: Yup.string().required('Company Code is required'),
  });

  return (
    <div className="container mt-5">
      <div className="col-md-6">
      <h4>Create Company</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const reqData = { CompanyMaster: values };

            console.log(reqData);

            const response = await axios.post(
              'https://localhost:7252/Company/Create', // Replace with your actual API endpoint
              reqData
            );

            console.log(response);
            if (response.data.transtatus.result && response.status === 200) {
              if (window.confirm('Record Saved Successfully!')) {
                console.log('Company saved successfully');
              }
              // Optionally, you can redirect to a different page or update the UI as needed
            } else {
              alert('Error: Unable to Save Data!');
              console.error('Error: Unable to save Company');
            }
          } catch (error) {
            alert('Error:', error);
            console.error('Error:', error);
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="companyname" className="form-label">
                Company Name
              </label>
              <Field
                type="text"
                id="companyname"
                name="companyname"
                className="form-control"
                placeholder="Enter Company Name"
              />
               <ErrorMessage
                name="companyname"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="companycode" className="form-label">
                Company Code
              </label>
              <Field
                type="text"
                id="companycode"
                name="companycode"
                className="form-control"
                placeholder="Enter Company Code"
              />
              <ErrorMessage
                name="companycode"
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
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </Field>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/company')}>Back to company List</button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

//ReactDOM.render(<AddCompany />, document.getElementById('root'));

export default AddCompany;
