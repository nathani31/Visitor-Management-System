import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


const validationSchema = Yup
.object().shape({
  visitortypename : Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'Enter a valid visitortypename')
    .required('VisitortypeName is required')

});



const company = [
  {id:1,name: 'APIL' },
  {id:2,name: 'LEITEN' },
  {id:3,name:'AGARAM'}

];

const plant = [
  {id:1,name:'AP1'},
  {id:2,name:'LT01'},
  {id:3,name:'AG01'}
];
const AddVisitor = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
   const options = {
     companyid:0,
     companyname:''

   }
   
  // const [companyOptions, setCompanyOptions] = useState([options]);

  // useEffect( async() => {
  //   // When the component mounts, fetch the list of visitors
  //   let Data = { companyid:0 };

  //   try {
  //     const response = await axios.post(
  //       'https://localhost:7041/VisitorMasterList/CountryList',
  //       Data
  //     );
  //     // Assuming your response data is an array
  //     setCompanyOptions(response.data.companyMastersList);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }, []);
 
  const handleSubmit = async (values) => {
    try {
      // Make an HTTP POST request to your backend API with the form data
      const reqData = { VisitorTypeMaster: values };
      console.log(reqData);
      const response = await axios.post('https://localhost:7252/VisitorMasterList/Create', reqData); // Replace with your actual API endpoint

      if (response.data && response.data.success) {
        
      } else {
        alert('Details saved successfully');
        console.log('saved record');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 return( 
  <div className='center'>
      <h4>Add Visitors</h4>
      <Formik
        initialValues={{
         visitortypename:'',
          status: 0,
          companyid: '',
          plantid: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
          {({ isSubmitting,errors,touched }) => (
          <Form>
            <table>
            <tbody>
            {/* <div className="mb-3">
              <label htmlFor="routename" className="form-label">
              Visitortypeid
              </label>
              <Field
                type="text"
                id="visitortypeid"
                name="visitortypeid"
                className="form-control"
                disabled
               />
            </div> */}
            <tr>
            <div className="mb-3 w-25">
              <label htmlFor="visitortypename" className="form-label">
              VisitortypeName:
              </label>
              <Field
                type="text"
                id="visitortypename"
                name="visitortypename"
                className="form-control"
                placeholder="Enter Name" required/>
                {errors.visitortypename && touched.visitortypename && (
                  <div className="error-message">
                    {errors.visitortypename}
                  </div>
                )}
            </div>
            </tr>

            {/* <div>
            
              { <td>
                <label htmlFor="status" >Status:</label>
              </td> }
              { <td className="form-control">
                <Field as="select" id="status" name="status" className="dropdown-item">
                  <option value='1'>Active</option>
                <option value="2">In-Active</option>
                </Field>
              </td> }
            
            </div> */}
            
           

            <div className="mb-3 w-25">
              <label htmlFor="companyid" className="form-label">
                Company ID:
              </label>
              { <Field
                as="select" // Use select element for dropdown
                id="companyid"
                name="companyid"
                className="form-control">
                  {/* {errors-companyid && touched.companyid && (
                  <div className="error-message">
                    {errors.visitortypename}
                  </div>
                )} */}
                   <option value="">Select Country</option>
                {company.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                       ))}
               
              </Field> }
            </div>

            {/* <div className="mb-3 w-25">
              <label htmlFor="companyid" className="form-label">Company ID:</label>
              <Field
                as="select" id="companyid" name="companyid"className="form-control">
                <option value="0">Click here ...</option>
                <option value='1'>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Field>
            </div> */}

            <div className="mb-3 w-25">
              <label htmlFor="plantid" className="form-label">Plant ID:</label>
              { <Field
                as="select" // Use select element for dropdown
                id="plantid"
                name="plantid"
                className="form-control">
                   <option value="">Select Plant</option>
                {plant.map((plant) => (
                  <option key={plant.id} value={plant.id}>
                    {plant.name}
                  </option>
                       ))}
               
      
      
              </Field> }
            </div>

            <div className="mb-3 w-25">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <Field
                as="select" id="status" name="status"className="form-control">
                <option value="0">Select Status</option>
                <option value='1'>Active</option>
                <option value="2">Inactive</option>
              </Field>
            </div>

            <button type="submit" className="btn btn-primary"disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            </tbody>
            </table>
          </Form>
        )}
      </Formik>

     
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="visitortypeid">VisitorTypeId:</label>
              <Field
                type="text"
                className="form-control"
                id="visitortypeid"
                name="visitortypeid"
              />
            </div>
            {/* ... Repeat similar code blocks for other fields ... */}
            {/* <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Add Visitor
              </button>
            </div> */}
          </Form>
        )}
       
      



      <p>{message}</p>
      <button onClick={() => navigate('/VisitorsList')} className="btn btn-warning">
       ^ Back to Visitor List ^
      </button>
      </div>
   
  );
};


export default AddVisitor;
      