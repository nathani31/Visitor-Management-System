import axios from "axios";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const CreateCountry = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="col-md-6">
        <h1>Create Country</h1>
        <Formik
          initialValues={{
            countryname: "",
            countrycode: "",
            status: 1, // Default to "Active"
          }}
          validationSchema={Yup.object({
            countryname: Yup.string()
              .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
              .required("Country Name is required"),
            countrycode: Yup.string().required("Country Code is required"),
          })}
          onSubmit={async (values, event) => {
            try {
              let reqData = { CountryMasterOne: values };
              console.log(reqData);
              const response = await axios.post(
                "https://localhost:7252/Country/Create",
                reqData
              );
              console.log(response);
              if (response.status === 200) {
                console.log("Country saved successfully");
                // Redirect to the country list page
                navigate("/Countrylist");
              } else {
                console.error("Error: Unable to save country");
              }
            } catch (error) {
              console.error("Error:", error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="countryname" className="form-label">
                  Country Name
                </label>
                <Field
                  type="text"
                  id="countryname"
                  name="countryname"
                  className="form-control"
                  placeholder="Enter Country Name"
                />
                <ErrorMessage
                  name="countryname"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="countrycode" className="form-label">
                  Country Code
                </label>
                <Field
                  type="text"
                  id="countrycode"
                  name="countrycode"
                  className="form-control"
                  placeholder="Enter Country Code"
                />
                <ErrorMessage
                  name="countrycode"
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
              <div class="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
             
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/Countrylist")}
              >
                Back to Country List
              </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateCountry;
