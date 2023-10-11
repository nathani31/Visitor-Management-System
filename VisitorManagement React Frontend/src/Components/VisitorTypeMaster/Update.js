import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import VisitorService from '../../services/VisitorService';

const Update = () => {
    const { id,visitortypename,companyid,plantid } = useParams();
  const navigate = useNavigate();


  const [message, setMessage] = useState('');
  const initialValues = {
    visitortypeid :id,
    visitortypename,
    status:1,
    companyid,
    plantid

  };
  const[visitorData, setvisitorData] = useState(initialValues);
  

  useEffect(() => {
    // Fetch the existing Visitor data when the component mounts
    if(id){
      console.log("if success: " + id);
      let Data={visitortypeid:id};
    VisitorService.createinitialize(Data)
      .then(response => {
         console.log('createinitialize',response.data.visitorMastersList );
         setvisitorData(response.data.visitorMastersList[0]);
        // const{visitortypeid,visitortypename,companyid,plantid}= response.data;
        // Formik.setValues({ visitortypeid, visitortypename,companyid,plantid});
      })
      .catch(error => {
        console.error(error);
        setMessage('Error: Unable to fetch Visitor data.');
      });
    }
  }, [id]);

  const handleSubmit = async () => {
    //e.preventDefault();

    try {
      let data = {VisitorTypeMaster:visitorData}
      console.log(data);
      const response = await VisitorService.Update(data);

      if (response.data && response.data.transtatus.result) {
        
        if(window.confirm("Update SuccessFully!"))
        {
       navigate('/VisitorsList');                   
          
        }
        else{
          setMessage('Visitor updated successfully!');
        }
        
      } else {
        setMessage('Error: Unable to update the Visitor.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error: Unable to update the Visitor.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setvisitorData({ ...visitorData, [name]: value });
  };

  return (
    <div>
      <h2>Update Visitor</h2>
      <Formik initialValues={visitorData} onSubmit={handleSubmit} enableReinitialize={true}>
        {({ isSubmitting }) => (
          <Form>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="visitortypeid">VisitorTypeId:</label>
              </td>
              <td>
                <input type="text" className="form-control" id="visitortypeid" name="visitortypeid" value={visitorData.visitortypeid} onChange={handleInputChange} disab required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="visitortypename">VisitorTypeName:</label>
              </td>
              <td>
                <input type="text" className="form-control" id="visitortypename" name="visitortypename" value={visitorData.visitortypename} onChange={handleInputChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="status" >Status:</label>
              </td>
              <td className="form-control">
                <Field as="select" id="status" name="status" className="dropdown-item">
                  <option value='1'>Active</option>
                <option value="2">In-Active</option>
                </Field>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="companyid">Company ID:</label>
              </td>
              <td>
             
                <input type="number" className="form-control" id="companyid" name="companyid" value={visitorData.companyid || ''} onChange={handleInputChange} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="plantid">Plant ID:</label>
              </td>
              <td>
                <input type="number" className="form-control" id="plantid" name="plantid" value={visitorData.plantid || ''} onChange={handleInputChange} />
              </td>
            </tr>
          </tbody>
        </table>

        
          <button className="btn btn-success" type="submit" disabled={isSubmitting} >Update</button>
          </Form>
          )}
       
     
      </Formik>
      <p>{message}</p>
      <button className="btn btn-warning" onClick={() => navigate('/VisitorsList')}>Back to Visitor List</button>
    </div>
  );
};

export default Update;
