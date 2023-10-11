



import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./Navigation.css";

import Home from "./CM/Home";
import CountryList from "./CM/CountryList";
import CreateCountry from "./CM/CreateCountry";
import UpdateCountry from "./CM/UpdateCountry";


import UpdateState from "./StateMaster/UpdateState";
import CreateState from "./StateMaster/CreateState";
import State from "./StateMaster/State";

import RoleList from "./RoleMaster/RoleList";
import AddRole from "./RoleMaster/AddRole";
import UpdateRole from "./RoleMaster/UpdateRole";

import RouteList from "./RouteMaster/RouteList";
import CreateRoute from "./RouteMaster/CreateRoute";
import UpdateRoute from "./RouteMaster/Update";

import CityList from "./CityMaster/CityList";
import AddCity from "./CityMaster/Addcity";
import UpdateCity from "./CityMaster/UpdateCity";

import Company from "./CompanyMaster/Company";
import CompanyList from "./CompanyMaster/CompanyList";
import AddCompany from "./CompanyMaster/AddCompany";
import UpdateCompany from "./CompanyMaster/UpdateCompany";

import UpdateEmployee from "./EmployeeMaster/UpdateEmployee";
import AddEmployee from "./EmployeeMaster/AddEmployee";
import EmployeeList from "./EmployeeMaster/EmployeeList";
import Employee from "./EmployeeMaster/Employee";

import UpdateDepartment from "./DepartmentMaster/UpdateDepartment";
import AddDepartment from "./DepartmentMaster/AddDepartment";
import DepartmentList from "./DepartmentMaster/DepartmentList";
import Department from "./DepartmentMaster/Department";

import Visitor from "./VisitorTypeMaster/Visitor";
import UpdateVisitor from "./VisitorTypeMaster/Update";
import AddVisitor from "./VisitorTypeMaster/AddVisitor";


const Navigation = () => {
  return (
    <div className="container-fluid">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="mastersDropdown"
              role="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false" // Prevents automatic close
              aria-expanded="false"
            >
              Masters
            </a>
            <ul className="dropdown-menu" aria-labelledby="mastersDropdown">
              <li>
                <Link to="/CountryList" className="dropdown-item">
                  Country Master
                </Link>
              </li>
              <li>
                <Link to="/state" className="dropdown-item">
                  State Master
                </Link>
              </li>
              <li>
                <Link to="/CityList" className="dropdown-item">
                  City Master
                </Link>
              </li>
              <li>
                <Link to="/Company" className="dropdown-item">
                  Company Master
                </Link>
              </li>
              <li>
                <Link to="/departments" className="dropdown-item">
                  Department Master
                </Link>
              </li>
              <li>
                <Link to="/RoleList" className="dropdown-item">
                  Role Master
                </Link>
              </li>
              <li>
                <Link to="/RouteList" className="dropdown-item">
                  Route Master
                </Link>
              </li>
              <li>
                <Link to="/Employee" className="dropdown-item">
                  Employee Master
                </Link>
              </li>
              <li>
                <Link to="/Visitor" className="dropdown-item">
                  Visitor Master
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CountryList" element={<CountryList />} />
          <Route path="/UpdateCountry/:id" element={<UpdateCountry />} />
          <Route path="/CreateCountry" element={<CreateCountry />} />

          <Route path="/CreateState" element={<CreateState />} />
          <Route path="/UpdateState/:id" element={<UpdateState />} />
          <Route path="/State" element={<State />} />

          <Route path="/RoleList" element={<RoleList />} />
          <Route path="/addrole" element={<AddRole />} />
          <Route path="/updaterole/:id" element={<UpdateRole />} />

          <Route path="/RouteList" element={<RouteList />} />
          <Route path="/createroute" element={<CreateRoute />} />
          <Route path="/updateroute/:id" element={<UpdateRoute />} />

          <Route path="/CityList" element={<CityList />} />
          <Route path="/Createcity" element={<AddCity />} />
          <Route path="/updatecity/:id" element={<UpdateCity />} />

          <Route path="/Company" element={<Company />} />
          <Route path="/AddCompany" element={<AddCompany />} />
          <Route path="/UpdateCompany/:id" element={<UpdateCompany />} />

          <Route path="/Employee" element={<Employee />} />
          <Route path="/AddEmployee" element={<AddEmployee />} />
          <Route path="/UpdateEmployee/:id" element={<UpdateEmployee />} />

          <Route path="/departments" element={<Department/>} />
          <Route path="/AddDepartment" element={<AddDepartment/>} />
          <Route path="/UpdateDepartment/:id" element={<UpdateDepartment/>} />

          <Route path="/Visitor" element={<Visitor/>} />
          <Route path="/addVisitor" element={<AddVisitor/>} />
          <Route path="/Update/:id" element={<UpdateVisitor/>} />

        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default Navigation;






