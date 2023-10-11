import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik'; // Added ErrorMessage
import * as Yup from 'yup';

const countryOptions = [
  { value: '1', label: 'India' },
  { value: '2', label: 'China' },
  { value: '3', label: 'USA' },
  // Add more country options as needed
];

const CreateRoute = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1>Create Route</h1>
      <Formik
        initialValues={{
          routename: '',
          routecode: '',
          routedes: '',
          routedistanceinkm: '', // Change to a string to handle empty input
          companyid: '',
          plantid: '',
          status: '',
        }}
        validationSchema={Yup.object({
          routename: Yup.string()
            .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
            .required('Route Name is required'),
          routecode: Yup.string().required('Route Code is required'),
          routedes: Yup.string().required('Route Destination is required'),
          routedistanceinkm: Yup.number()
            .typeError('Route Distance must be a number')
            .required('Route Distance in km is required'),
          companyid: Yup.string().required('Company ID is required'),
          plantid: Yup.number().required('Plant ID is required'),
          status: Yup.string().required('Status is required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // If validation succeeds, make the API request
            let reqData = { RouteMaster: values };
            console.log(reqData);
            const response = await axios.post(
              'https://localhost:7252/api/Route/Create',
              reqData
            );

            if (response.data && response.data.success) {
              // Optionally, update UI or perform other actions
            } else {
              if (window.confirm('Route added successfully')) {
                navigate('/'); // Optionally, redirect to a different page or update UI as needed
              }
            }
          } catch (error) {
            console.error('Error:', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
          <div className="Container mt-5">
            <div className="col-md-6">
              <label htmlFor="routename" className="form-label">
                Route Name
              </label>
              <Field
                type="text"
                id="routename"
                name="routename"
                className="form-control"
              />
              <ErrorMessage
                name="routename"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="routecode" className="form-label">
                Route Code
              </label>
              <Field
                type="text"
                id="routecode"
                name="routecode"
                className="form-control"
              />
              <ErrorMessage
                name="routecode"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="routedes" className="form-label">
                Route Destination
              </label>
              <Field
                type="text"
                id="routedes"
                name="routedes"
                className="form-control"
              />
              <ErrorMessage
                name="routedes"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="routedistanceinkm" className="form-label">
                Route Distance in km
              </label>
              <Field
                type="text" // Change to text type
                id="routedistanceinkm"
                name="routedistanceinkm"
                className="form-control"
              />
              <ErrorMessage
                name="routedistanceinkm"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="companyid" className="form-label">
                Company ID
              </label>
              <Field
                as="select"
                id="companyid"
                name="companyid"
                className="form-control"
              >
                <option value="">Select Company</option>
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
                Plant ID
              </label>
              <Field
                type="number"
                id="plantid"
                name="plantid"
                className="form-control"
              />
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
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/RouteList')}
            >
              Back to Route List
            </button>
            </div>
          </Form>
         
        )}
      </Formik>
      
    </div>
   
  );
};

export default CreateRoute;
