import React, { useState, useEffect } from "react";
import DepartmentList from "./DepartmentList";


const Department = () => {
  //const { id } = useParams();
 //const navigate = useNavigate();

  // const initialDepartmentState = {
  //   deptid: null,
  //   deptname: "",
  //   deptcode: "",
  //   companyid: null,
  //   plantid: null,
  //   status: 0,
  //   createdby: "",
  //   createdon: null,
  //   modifiedby: "",
  //   modifiedon: null,
  // };
  // const [departmentData, setDepartmentData] = useState(initialDepartmentState);
  // const [message, setMessage] = useState("");

  // const create = () => {
  //   DepartmentService.create(departmentData)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("The department was created successfully!");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to create the department.");
  //     });
  // };

  // const Update = () => {
  //   DepartmentService.Update(departmentData)
  //     .than(response => {
  //       console.log(response);
  //       setMessage("the department was update successfully!");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to update the department.");
  //     });
  // };

  // const ChangeStatus = () => {
  //   DepartmentService.ChangeStatus(departmentData.deptid)
  //     .than(response => {
  //       console.log(response);
  //       setMessage("Status changed successfully");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to change the status.")
  //     });
  // };

  // const CreateInitialize = () => {
  //   DepartmentService.CreateInitialize(departmentData.deptid)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("Create Initialize Successfully");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to perform createInitialize.");
  //     });
  // };

  // const SearchInitialize = () => {
  //   departmentData.SearchInitialize(departmentData.deptid)
  //     .then(response => {
  //       console.log(response);
  //       setMessage("search Initialize Successfully");
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setMessage("Error: Unable to perform SearchInitialize.")
  //     });
  // };


  // useEffect(() => {
  //   if (id) {
  //     DepartmentService.ged(id)
  //       .then(response => {
  //         setDepartmentData(response.data);
  //         console.log(response.data);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //         setMessage("Error: Unable to fecch department data.");
  //       });
  //   }
  // }, [id]);

  // const handleinputChange = event =>{
  //   const { name,value } = event.target;
  //   setDepartmentData({...departmentData, [name]: value});
  // };

  return(
    // <div>
    //   <h2>Department Details</h2>
    //   <input
    //   type="text"
    //   name="departmentname"
    //   value={departmentData.Departmentname}
    //   onChange={handleinputChange}
    //   />
    //   {/* Add similar inputs for other fields */}
    //   <button onClick={create}>Create Department</button>
    //   <button onClick={Update}>Update Department</button>
    //   <button onClick={ChangeStatus}>Remove Department</button>
    //   <p>{message}</p>
      <DepartmentList />
    // </div>
  );
}

export default Department;