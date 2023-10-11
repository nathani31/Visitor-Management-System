import http from "../http-common";

const create = data => {
    return http.post("Company/Create", data);
  };


  const createinitialize = data => {
    return http.post("Company/CreateInitialize", data);
  };

  const update = data => {
    return http.post("Company/Update", data);
  };

  const changestatus = data => {
    return http.post("Company/ChangeStatus", data);
  };

  const searchinitialize = data => {
    return http.post("Company/SearchInitialize", data);
  };

  const CompanyService = {
    create,
    createinitialize,
    update,
    changestatus,
    searchinitialize,
  };
  
  export default CompanyService;