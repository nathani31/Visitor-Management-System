import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage } from "formik";

const countries = [
  { id: 1, name: "India" },
  { id: 2, name: "USA" },
  // Add more countries as needed
];

const CreateState = () => {
  const navigate = useNavigate();

  // Define initial values
  const initialValues = {
    statename: "",
    statecode: "",
    countryid: "", // Add countryid field
    status: "", // Add status field
  };

  // Define validation schema
  const validationSchema = Yup.object({
    statename: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
      .required("State Name is required"),
    statecode: Yup.string().required("State Code is required"),
    countryid: Yup.string().required("Country is required"), // Validation for countryid
    status: Yup.string().required("Status is required"), // Validation for status
    // Add other validation rules if needed
  });

  const [message, setMessage] = useState("");

  return (
    <div className="container mt-5">
      <h4>Create State</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const reqData = { StateMaster: values };
            console.log(reqData);

            const response = await axios.post(
              "https://localhost:7252/State/Create", // Replace with your actual API endpoint
              reqData
            );

            console.log(response);
            if (response.data.transtatus.result && response.status === 200) {
              if (window.confirm("State Saved Successfully!")) {
                navigate("/state"); // Navigate to the desired route
              } else {
                setMessage("State saved successfully");
                console.log("State saved successfully");
              }
              setSubmitting(false);
            } else {
              console.error("Error: Unable to save state");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Other form fields */}
            <div className="mb-3">
              <label htmlFor="statename" className="form-label">
                State Name
              </label>
              <Field
                type="text"
                id="statename"
                name="statename"
                className="form-control"
                placeholder="Enter State Name"
              />
              <ErrorMessage
                name="statename"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="statecode" className="form-label">
                State Code
              </label>
              <Field
                type="text"
                id="statecode"
                name="statecode"
                className="form-control"
                placeholder="Enter State Code"
              />
              <ErrorMessage
                name="statecode"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="countryid" className="form-label">
                Country ID
              </label>
              <Field
                as="select"
                id="countryid"
                name="countryid"
                className="form-control"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="countryid"
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
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/State")}
            >
              Back to State List
            </button>
          </Form>
        )}
      </Formik>
      <div style={{ color: "green" }}>{message}</div>
    </div>
  );
};

export default CreateState;
