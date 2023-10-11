import http from "../http-common";


const create = (data) => {
  return http.post("api/City/Create", data);
};
const createInitialize = (data) => {
  return http.post("api/City/CreateInitialize", data);
};
const searchInitialize = (data) => {
  return http.post("api/City/SearchInitialize", data);
};
const update = (data) => {
  return http.post("api/City/Update", data);
};
const changeStatus = (data) => {
  return http.post("api/City/ChangeStatus", data);
};
const CityServices = {
  create,
  createInitialize,
  searchInitialize,
  update,
  changeStatus,
};

export default CityServices;
