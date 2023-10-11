import http from "../http-common";

const create = data => {
    return http.post("/api/Route/Create",data);
};

const createinitialize = data=> {
    return http.post("/api/Route/CreateInitialize",data);
};

const update = data => {
    return http.post("/api/Route/Update",data);
};

const changestatus = data => {
    return http.post("/api/Route/ChangeStatus",data);
};

const searchinitialize = data => {
    return http.post("/api/Route/SearchInitialize",data);
};

const RouteService={
    create, 
    createinitialize,
    update,
    changestatus,
    searchinitialize
};

export default RouteService;

  