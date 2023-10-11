import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import StateService from '../../services/StateService'; // Import your StateService

const UpdateState = () => {
  const { id  } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
 
  const initialValues = {
    stateid : id,
    statename:"",
    statecode:"",
    countryid:"",
    status:1,
    modifiedby:"",
    modifiedon:""
  };

  const [StateData, setStateData]= useState(initialValues);

  useEffect(() => {
    if (id) {
      console.log("If success:" + id);
      let reqdata ={Stateid:id};
      StateService.CreateInitialize(reqdata )
        .then(response => {
          // Handle the successful response
          console.log(response.data.stateList);
          setStateData(response.data.stateList[0]);
          //const { statename, statecode, countryid, status, modifiedby, modifiedon} = response.data.stateList;

          // Set stateData using the destructured variables
          //Formik.setValues({statename, statecode, countryid, status, modifiedby, modifiedon});
        })
        .catch(error => {
          // Handle the error
          console.error('Error:', error);
          setMessage('Error: Unable to fetch state data.');
        });
    }
  }, [id]);

  const handleSubmit = async (values) => {
    // Map the status value to the database values
    //const mappedStatusValue = values.status === 1 ? 'Active' : 'Inactive';

    try {
      let reqData = { StateMaster:values};
      console.log("Request Data:", reqData);

      const response = await StateService.Update(reqData);
      console.log(response);
      console.log(response.data);

      if (response.status===200 && response.data.transtatus.result) {
        
        if(window.confirm("State updated successfully"))
        {
          navigate('/');
        }  
        else{
          setMessage('State updated successfully');
        }
        // Optionally, you can redirect to a different page or update the UI as needed
      } else {
        console.error('Error: Unable to update state');
        setMessage('Error: Unable to update state');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: Unable to update state');
    }

  };

  const formik = Formik ({
    initialValues,
    onSubmit:handleSubmit
  });

  return (
    <div className="container mt-5">
      <h4>Update State</h4>
      <Formik
        initialValues={StateData}
        enableReinitialize={true}
        onSubmit={handleSubmit}
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
            </div>

            <div className="mb-3">
              <label htmlFor="countryid" className="form-label">
                Country ID
              </label>
              <Field
                type="text"
                id="countryid"
                name="countryid"
                className="form-control"
                placeholder="Enter Country ID"
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
                <option value='1'>Active</option>
                <option value="2">Inactive</option>
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

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Update'}
            </button>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to State List</button>
    </div>
  );
};

export default UpdateState;
