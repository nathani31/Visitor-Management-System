import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import CityServices from "../../services/CityService";

const UpdateCity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const initialValues = {
    cityid: id,
    cityname: "",
    citycode: "",
    countryid: "",
    stateid: "",
    status: 1,
  };
  const [CityData, setCityData] = useState(initialValues);
  useEffect(() => {
    console.log("if success: " + id);
    //Fetch the existing route data when the component mounts
    if (id) {
      console.log("if success: " + id);
      let reqdata = { Cityid: id };
      CityServices.createInitialize(reqdata)
        .then((response) => {
          console.log(response.data.cityMasterList);
          setCityData(response.data.cityMasterList[0]);
          // const { Cityid, Cityname, Citycode, Countryid, Stateid, status } =
          //   response.data;
          // // Use Formik's setValues to set initial values
          // formik.setValues({
          //   Cityid,
          //   Cityname,
          //   Citycode,
          //   Countryid,
          //   Stateid,
          //   status,
          // });
        })
        .catch((error) => {
          console.error(error);
          setMessage("Error: Unable to fetch route data.");
        });
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      // Created an object with the properties to send to the server
      // const requestData = {
      //   Cityid: values.Cityid,
      //   Cityname: values.Cityname,
      //   Citycode: values.Citycode,
      //   Countryid: values.Countryid,
      //   Stateid: values.Stateid,
      //   status: values.status,
      // };
      let data = { CityMaster: values };
      console.log("Request Data:", data); // for debugging

      // Call the update function from your RouteService
      const response = await CityServices.update(data);
      console.log("Response", response);
      console.log("Response Data", response.data);
      console.log("transtatus", response.data.transtatus.result);

      if (response.data.transtatus.result && response.status === 200) {
        setMessage("Route updated successfully!");
        // Optionally, redirect to a different page or update the UI as needed
      } else {
        setMessage("Error: Unable to update the Route data+.");
      }
    } catch (error) {
      setMessage("Error: Unable to update the Route.");
    }
  };

  const formik = Formik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <div className="container mt-5  center-content">
      <div className="col-md-6">
        <h1>Update City</h1>
        <Formik
          initialValues={CityData}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="Cityname" className="form-label">
                  Cityname
                </label>
                <Field
                  type="text"
                  id="Cityname"
                  name="cityname"
                  className="form-control"
                  placeholder="Enter Cityname"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Citycode" className="form-label">
                  Citycode
                </label>
                <Field
                  type="number"
                  id="Citycode"
                  name="citycode"
                  className="form-control"
                  placeholder="Enter Citycode"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Countryid" className="form-label">
                  Countryid
                </label>
                <Field
                  type="number"
                  id="Countryid"
                  name="countryid"
                  className="form-control"
                  placeholder="Enter Countryid"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Stateid" className="form-label">
                  Stateid
                </label>
                <Field
                  type="number"
                  id="Stateid"
                  name="stateid"
                  className="form-control"
                  placeholder="Enter Stateid"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <Field
                  as="select" // Use a select element for dropdown
                  id="status"
                  name="status"
                  className="dropdown-item" // Use form-select class for Bootstrap styling
                >
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </Field>
             
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <button
              className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Back to city List
          </button>
             </div>
             
            </Form>
          )}
        </Formik>
        <p>{message}</p>
        
        
          </div>
        </div>
  
  
  );
};

export default UpdateCity;
