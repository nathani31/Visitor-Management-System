import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik,Field,Form } from "formik";
import CompanyService from "../../services/CompanyService";

const UpdateCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  
  const initialValues = {
    companyid:id,
    companyname: "",
    companycode: "",
    status: 1,
    createdby : null,
    createdon : null ,
    modifiedby: null,
    modifiedon : null
     
  };

  const [companyData, setCompanyData] = useState(initialValues); // Add state for company data

  useEffect(() => {
    if (id) {
      console.log("If success:" + id);
      let reqdata = { Companyid: id };
      CompanyService.createinitialize(reqdata)
        .then(response => {
          // console.log(response);
          console.log(response.data);
           console.log(response.data.companyMasterList);
          setCompanyData(response.data.companyMasterList[0]); // Set company data
        })
        .catch(error => {
          console.error('Error:', error);
          setMessage('Error: Unable to fetch company data.');
        });
    }
  }, [id]);

  const handleSubmit = async (values) => {
 
    try {
      let reqData = {CompanyMaster:values};
      console.log("Request Data:", reqData);

      const response = await CompanyService.update(reqData);
      console.log(response);
      console.log(response.data);

      if (response.status===200 && response.data.transtatus.result) {
        
        if(window.confirm("company updated successfully"))
        {
          navigate('/');
        }  
        else{
          setMessage('company updated successfully');
        }
        // Optionally, you can redirect to a different page or update the UI as needed
      } else {
        console.error('Error: Unable to update company');
        setMessage('Error: Unable to update company');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: Unable to update company');
    }

  };

  // const formik = useFormik({
  //   initialValues: {
  //     companyData// Populate form fields with company data
  //   },
  //   onSubmit: handleSubmit,
  //   enableReinitialize:true
  // });

  return (
    <div className="container mt-5">
      <div className="col-md-6">
      <h4>Update Company</h4>
      <Formik
        initialValues={companyData}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Other form fields */}
           
            <div className="mb-3">
              <label htmlFor="companyname" className="form-label">
              Company Name
              </label>
              <Field
                type="text"
                id="companyname"
                name="companyname"
                className="form-control"
                placeholder="Enter company name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="companyid" className="form-label">
              Company Code
              </label>
              <Field
                type="text"
                id="companycode"
                name="companycode"
                className="form-control"
                placeholder="Enter company Code"
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


            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
      <button className="btn btn-secondary" onClick={() => navigate('/company')}>Back to company List</button>
    </div>
    </div>
  );
};

export default UpdateCompany;
