import http from "../http-common";
const Create = data => {
  return http.post("/Department/Create", data);
};

  const Update = data => {
    return http.post("/Department/Update", data);
  };

  const CreateInitialize = data => {
    return http.post("/Department/CreateInitialize", data);
  };

  const ChangeStatus = data => {
    return http.post("/Department/ChangeStatus", data);
  };
  
  const SearchInitialize = data => {
    return http.post("/Department/SearchInitialize", data);
  };
  
  const DepartmentService = {
    
    Create,
    Update,
    SearchInitialize,
    ChangeStatus,
    CreateInitialize
  };
  
  export default DepartmentService;