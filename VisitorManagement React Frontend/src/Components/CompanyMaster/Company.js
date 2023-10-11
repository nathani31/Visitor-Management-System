import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import CompanyService from "../services/CompanyService";
import CompanyList from "./CompanyList";

const Company = () => {
  // const { id } = useParams();

  // const [currentCompany, setcurrentCompany] = useState({
  //   id: null,
  //   companyname: "",
  //   companycode: "",
  //   status: 1,
  // });

  // const [message, setMessage] = useState("");

  // // Define functions for your CRUD operations

  // const create = () => {
  //   companyservice
  //     .create(currentCompany)
  //     .then((response) => {
  //       console.log(response);
  //       setMessage("The company was created successfully!");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setMessage("Error: Unable to create the company.");
  //     });
  // };

  // const update = () => {
  //   companyservice
  //     .update(currentCompany)
  //     .then((response) => {
  //       console.log(response);
  //       setMessage("The company was updated successfully!");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setMessage("Error: Unable to update the company.");
  //     });
  // };

  // const changeStatus = () => {
  //   companyservice
  //     .changeStatus(currentCompany.companyid)
  //     .then((response) => {
  //       console.log(response);
  //       setMessage("Status changed successfully");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setMessage("Error: Unable to change the status.");
  //     });
  // };

  // const createInitialize = () => {
  //   companyservice
  //     .createInitialize(currentCompany.companyid)
  //     .then((response) => {
  //       console.log(response);
  //       setMessage("Create Initialize Successfully");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setMessage("Error: Unable to perform createInitialize.");
  //     });
  // };

  // const searchInitialize = () => {
  //   companyservice
  //     .searchInitialize(currentCompany.companyid)
  //     .then((response) => {
  //       console.log(response);
  //       setMessage("Search Initialize Successfully");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setMessage("Error: Unable to perform searchInitialize.");
  //     });
  // };

  // // Fetch company data when the component mounts or when the ID changes
  // useEffect(() => {
  //   if (id) {
  //     companyservice
  //       .get(id)
  //       .then((response) => {
  //         setcurrentCompany(response.data);
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setMessage("Error: Unable to fetch company data.");
  //       });
  //   }
  // }, [id]);

  // // Handle input changes
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setcurrentCompany({ ...currentCompany, [name]: value });
  // };

  return (
    <div>
      <CompanyList />
    </div>
  );
};

export default Company;
