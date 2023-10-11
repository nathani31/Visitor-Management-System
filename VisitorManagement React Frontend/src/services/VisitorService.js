import http from "../http-common";

const create = () => {
    return http.post("/VisitorMasterList/Create")
};
const createinitialize = (data) => {
    return http.post("/VisitorMasterList/CreateInitialize",data);
};
const Update = (data) => {
    return http.post("/VisitorMasterList/Update",data);
};
const changeStatus = (data) => {
    return http.post("/VisitorMasterList/ChangeStatus",data);

};
const searchinitialize = data => {
    return http.post("/VisitorMasterList/SearchInitialize",data);
};

const VisitorService = {
    create,
    createinitialize,
    Update,
    changeStatus,
    searchinitialize
};

export default VisitorService;