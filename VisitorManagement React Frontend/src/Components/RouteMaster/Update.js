import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import RouteService from "../../services/RouteService";
import CreateRoute from "./CreateRoute";

const UpdateRoute = () => {
  const { id} = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const initialValues = {
    routeid: id,
    status:1,
  };

  const[routedata,setroutedata]=useState(initialValues);

  useEffect(() => {
    //Fetch the existing route data when the component mounts
    if(id){
      console.log("if success: " + id);
      let reqdata={Routeid:id};
      RouteService.createinitialize(reqdata)
      .then(response => {
        console.log("Response data:",response.data.routeList);
        setroutedata(response.data.routeList[0])
          // Use Formik's setValues to set initial values
      })
      .catch(error => {
        console.error(error);
        setMessage('Error: Unable to fetch route data.');
      });
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      // Created an object with the properties to send to the server
      // const requestData = {
      //   routename: values.routename,
      //   routecode: values.routecode,
      //   routedes: values.routedes,
      //   routedistanceinkm: values.routedistanceinkm,
      //   companyid: values.companyid,
      //   plantid: values.plantid,
      //   status: values.status,
      //   modifiedby: values.modifiedby,
      //   modifiedon: values.modifiedon,
      // };
      let requestData = {RouteMaster:values};
      console.log("Request Data:", requestData); // for debugging

  
      // Call the update function from your RouteService
      const response = await RouteService.update(requestData);
      console.log("Respose:",response);
      console.log("Respose data:",response.data.routeList);

      if (response.status===200 && response.data.transtatus.result)
      {
          if(window.confirm("Route updated successfully"))
          {
            navigate('/'); // Optionally, redirect to a different page or update  UI as needed

          }
         else {
          setMessage("Route updated successfully");
      } }else {
        console.log("Unable to update the Route.");
      setMessage("Error: Unable to update the Route.");

      }

    }catch (error) {
      console.log("Error:", error);
      setMessage("Error: Unable to update the Route.");
    }
  };
  

  const formik = Formik({
    initialValues,
    onSubmit: handleSubmit
  });

  return (
    <div className="container mt-5">
      <h1>Update Route</h1>
      <Formik 
      initialValues={routedata} 
      enableReinitialize={true}
      onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="routename" className="form-label">
                Route Name
              </label>
              <Field
                type="text"
                id="routename"
                name="routename"
                className="form-control"
                placeholder="Enter Route Name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="routecode" className="form-label">
                Route code
              </label>
              <Field
                type="text"
                id="routecode"
                name="routecode"
                className="form-control"
                placeholder="Enter route Code"
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
            </div>

            <div className="mb-3">
              <label htmlFor="routedistanceinkm" className="form-label">
                Route Distance in km
              </label>
              <Field
                type="text"
                id="routedistanceinkm"
                name="routedistanceinkm"
                className="form-control"
              />
            </div>

          <div className="mb-3">
              <label htmlFor="companyid" className="form-label">
                company ID
              </label>
              <Field
                type="number"
                id="companyid"
                name="companyid"
                className="form-control"
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
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <Field
                as="select" // Use a select element for dropdown
                id="status"
                name="status"
                className="dropdown-item" disabled // Use form-select class for Bootstrap styling
              >
                <option value='1' disabled>Active</option>
                <option value="2" disabled>Inactive</option>   
              </Field>
            </div>

            {/* <div className="mb-3">
              <label htmlFor="modifiedby" className="form-label">
                Modified by
              </label>
              <Field
                type="text"
                id="modifiedby"
                name="modifiedby"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="modifiedon" className="form-label">
                Modified on
              </label>
              <Field
                type="datetime-local"
                id="modifiedon"
                name="modifiedon"
                className="form-control"
              />
            </div> */}

            <button type="submit" className="btn btn-primary" disabled={isSubmitting} >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/RouteList')}>Back to Route List</button>

          </Form>
        )}
      </Formik>
      <p>{message}</p>
     
    </div>
  );
};

export default UpdateRoute;