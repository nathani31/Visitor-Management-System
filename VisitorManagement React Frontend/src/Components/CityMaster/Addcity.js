import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const AddCity = () => {
  const navigate = useNavigate();

  return (
    <div className="Container mt-5">
        <div className="col-md-6">
          <h1>Create City</h1>

          <Formik
            initialValues={{
              cityname: "",
              citycode: "",
              countryid: "",
              stateid: "",
              status: "",
            }}
            validationSchema={Yup.object({
              cityname: Yup.string().required("City Name is required"),
              citycode: Yup.number()
                .typeError("City Code must be a number")
                .required("City Code is required"),
              countryid: Yup.number()
                .typeError("Country ID must be a number")
                .required("Country ID is required"),
              stateid: Yup.number()
                .typeError("State ID must be a number")
                .required("State ID is required"),
              status: Yup.number()
                .typeError("Status must be a number")
                .required("Status is required"),
            })}
            onSubmit={async (values) => {
              try {
                let reqData = { CityMaster: values };
                console.log(reqData);
                const response = await axios.post(
                  "https://localhost:7252/api/City/Create",
                  reqData
                );
                console.log(response);
                if (response.data && response.data.success) {
                  alert("City saved successfully");
                  console.log("City saved successfully");
                  // Optionally, you can redirect to a different page or update the UI as needed
                } else {
                  console.error("Error: Unable to save city");
                }
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="cityname" className="form-label">
                    City Name
                  </label>
                  <Field
                    type="text"
                    id="cityname"
                    name="cityname"
                    className="form-control block-border"
                    placeholder="Enter City Name"
                  />
                  <ErrorMessage
                    name="cityname"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="citycode" className="form-label">
                    City Code
                  </label>
                  <Field
                    type="number"
                    id="citycode"
                    name="citycode"
                    className="form-control block-border"
                    placeholder="Enter City Code"
                  />
                  <ErrorMessage
                    name="citycode"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="countryid" className="form-label">
                    Country ID
                  </label>
                  <Field
                    type="number"
                    id="countryid"
                    name="countryid"
                    className="form-control block-border"
                    placeholder="Enter Country ID"
                  />
                  <ErrorMessage
                    name="countryid"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="stateid" className="form-label">
                    State ID
                  </label>
                  <Field
                    type="number"
                    id="stateid"
                    name="stateid"
                    className="form-control block-border"
                    placeholder="Enter State ID"
                  />
                  <ErrorMessage
                    name="stateid"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <Field
                    type="number"
                    id="status"
                    name="status"
                    className="form-control block-border"
                    placeholder="Enter Status"
                  />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
                

                <div className="text-center">
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/citylist")}
                  >
                    Back to City List
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    // </div>
  );
};

export default AddCity;
