import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyService from "../../services/CompanyService";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    retrieveCompanies();
  }, []);

  const retrieveCompanies = () => {
    CompanyService.searchinitialize({ Companyid: 0 })
      .then((response) => {
        setCompanies(response.data.companyMasterList);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const viewCompany = (company) => {
    setCurrentCompany(company);
  };

  const changeStatus = (companyId) => {
    if (window.confirm("Are you sure you want to remove this company?")) {
      CompanyService.changestatus({ Companyid: companyId })
        .then((response) => {
          console.log("ChangeStatus Response:", response.data);
          refreshList();
          setMessage("Company removed successfully.");
        })
        .catch((error) => {
          console.error(error);
          setMessage("Error: Unable to remove the company.");
        });
    }
  };

  const refreshList = () => {
    retrieveCompanies();
    setCurrentCompany(null);
    setCurrentIndex(-1);
  };

  const setActiveState = (company, index) => {
    setCurrentCompany(company);
    setCurrentIndex(index);
  };

  return (
    <div className="container mt-5">
    <div className="row">
      <div className="col-md-6">
        <div className="header-container">
          <h4>Company List</h4>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/AddCompany")}
          >
            Create New +
          </button>
        </div>

        <div className="scrollable-table-container">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Company Code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company,index) => (
                 <tr
                 className={"table" + (index === currentIndex ? "active" : "")}
                 onClick={() => setActiveState(company,index)}
                 key={company.companyId}
               >

               
                  <td>{company.companyname}</td>
                  <td>{company.companycode}</td>
                  <td>
                    {company.status === 2 ? (
                      <span className="badge badge-success" style={{ color: "red" }}>
                        InActive
                      </span>
                    ) : (
                      <span className="badge badge-danger" style={{ color: "green" }}>
                        Active
                      </span>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/UpdateCompany/${company.companyid}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>
                    
                    <span className="mx-2"></span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => changeStatus(company.companyid)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3">{message}</p>
      </div>
      <div className="col-md-4">
          {currentCompany ? (
            <div>
              <h4>Company Details</h4>
              <div>
                <label>
                  <strong>Company Name:</strong>
                </label>{" "}
                {currentCompany.companyname}
              </div>
              <div>
                <label>
                  <strong>Company Code:</strong>
                </label>{" "}
                {currentCompany.companycode}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCompany.status  === 2 ? (
                  <span className="badge badge-success" style={{ color: "black" }}>InActive</span>
                ) : (
                  <span className="badge badge-danger" style={{ color: "black" }}>Active</span>
                )}
              </div>
              {/* <Link
                to={`/UpdateCompany/${currentCompany.companyId}`}
                className="btn btn-success"
              >
                Edit
              </Link> */}
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Company...</p>
            </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default CompanyList;

