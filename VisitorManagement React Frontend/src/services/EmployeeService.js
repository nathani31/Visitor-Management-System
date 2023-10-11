import http from "../http-common";

const Create = data => {
    return http.post("/Employee/Create",data);
  };

  const Update = data => {
    return http.post("/Employee/Update",data); 
  };

  const CreateInitialize = data => {
    return http.post("/Employee/CreateInitialize",data);
  };

  const SearchInitialize = data => {
    return http.post("/Employee/SearchInitialize",data);
  };

  const ChangeStatus = data => {
    return http.post("/Employee/ChangeStatus",data);
  };

 

  const EmployeeService = {
    Create,
    Update,
    ChangeStatus,
    SearchInitialize,
    CreateInitialize
  };

 
export default EmployeeService;
  