import http from "../http-common";

const Create = data => {
    return http.post("/Country/Create", data);
  };

  const Update = data => {
    return http.post("/Country/Update", data);
  };

  const ChangeStatus = data => {
    return http.post("/Country/ChangeStatus", data);
  };

  const SearchInitialize = data => {
    return http.post("/Country/SearchInitialize",data);
  };

  const  CreateInitialize = data => {
    return http.post("/Country/CreateInitialize",data);
  };

  const CountryService = {
    
    Create,
    Update,
    ChangeStatus,
    SearchInitialize,
    CreateInitialize,
  };

  export default CountryService;
