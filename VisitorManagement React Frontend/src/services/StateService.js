import http from "../http-common";

const Create = data => {
    return http.post("/State/Create", data);
  };


  const Update = data => {
    return http.post("/State/Update", data);
  };


  const ChangeStatus = data => {
    return http.post("/State/ChangeStatus", data);
  };

  const CreateInitialize = data => {
    return http.post("/State/CreateInitialize", data);
  };

  const SearchInitialize = data => {
    return http.post("/State/SearchInitialize", data);
  };

  const StateService = {
    Create,
    Update,
    ChangeStatus,
    CreateInitialize,
    SearchInitialize
  };
  
  export default StateService;
  