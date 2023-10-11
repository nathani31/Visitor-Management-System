import http from "../http-common";

const create = data => {
    return http.post("/RoleMasterController/Create" , data);
};
const update = data => {
    return http.post("/RoleMasterController/Update",data);
};
const changeStatus = data => {
    return http.post("/RoleMasterController/ChangeStatus",data);
};
const searchInitialize = data => {
    return http.post("/RoleMasterController/SearchInitialize",data);
};
const createInitialize = data =>{
    return http.post("/RoleMasterController/CreateInitialize",data);
};


const RoleService = {
    create,
    update,
    changeStatus,
    searchInitialize,
    createInitialize
};

export default RoleService;