import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import EmployeeList from "./EmployeeList";


const Employee = () => {
    // const { id }=useParams();
    // //  let navigate = useNavigate();

    // const [EmployeeData,setEmployeeData] = useState({
    //     companyid: null,
    //     plantid: null,
    //     empid: null,
    //     empname: "",
    //     empcode: "",
    //     empfirstname: "",
    //     emplastname: "",
    //     empdop: null,
    //     empage: null,
    //     empdesignationid: null,
    //     empdeptid: null,
    //     empemail: "",
    //     emptelno: "",
    //     empgender: "",
    //     emptypeid: null,
    //     biometricid: null,
    //     empidcardno: "",
    //     empplantid: null,
    //     status: 0,
    //     createdby: "",
    //     createdon: "",
    //     modifieby: "",
    //     modifiedon: ""
    // });
    
    // const [message,setMesssage] = useState("");
    //  const Create = () => {
    //     EmployeeService.Create(EmployeeData).then(response => {
    //         console.log(response);
    //         setMesssage("Employee was created successfully!");
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         setMesssage("Error: unable to create the Employee....");
    //     });
    //  };

    //  const Update = () => {
    //     EmployeeService.Update(EmployeeData).then(response => {
    //         console.log(response);
    //         setMesssage("Employee was update successfully....");
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         setMesssage("Error:unable to update the Employee.... ");
    //     })
    //  };

    //  const ChangeStatus = () => {
    //     EmployeeService.ChangeStatus(EmployeeData)
    //     .then(response => {
    //         console.log(response);
    //         setMesssage("Status changed successfully....");
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         setMesssage("Error:unable to change the status");
    //     })
    //  };

    //  const CreateInitialize = () => {
    //     EmployeeService.CreateInitialize(EmployeeData)
    //     .then(response => {
    //         console.log(response);
    //         setMesssage("CreateInitialize successfully...");
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         setMesssage("Error:Unable to perform CreateInitialize");
    //     })
    //  };

    //  const SearchInitialize = () => {
    //     EmployeeService.SearchInitialize(EmployeeData)
    //     .then(response => {
    //         console.log(response);
    //         setMesssage("SearchInitialize successfully...");
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         setMesssage("Error:Unable to perform SearchInitialize");
    //     })
    //  };

    //  useEffect(() => {
    //     if(id){
    //         EmployeeService.get(id)
    //         .then(response => {
    //             setEmployeeData(response.data);
    //             console.log(response.data);
    //         })
    //         .catch(error =>{
    //             console.log(error);
    //             setMesssage("unable to fetch the data");
    //         });
    //     }
    //  },[id]);
    //  const handleInputChange = event => {
    //     const { name, value } = event.target;
    //     setEmployeeData({...EmployeeData, [name]: value });
    //  };
     return (
        <div>
            
             <EmployeeList/>
        </div>
     );

}

export default Employee;