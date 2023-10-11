import React, { Fragment ,useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreateCountry from './CreateCountry';
import UpdateCountry from './UpdateCountry';
import Home from './Home';
import Country from './Country';
import CountryList from './CountryList';


const Navigation1 = () => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <Fragment>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Country">
            Country
          </Link>
        </li>

        <li className="nav-item dropdown">
    <div
      className="nav-link dropdown-toggle"
      onClick={toggleDropdown}
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded={isDropdownOpen}
    >
      Actions
    </div>
    <ul
      className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
      aria-labelledby="navbarDropdown"
    >
      <li>
        <Link className="dropdown-item" to="/CreateCountry">
          Create Country
        </Link>
        {/* <Link className="dropdown-item" to="/UpdateCountry/:id">
          Update Country
        </Link> */}
      </li>
    </ul>
  </li>
</ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Country" element={<Country />} />
      <Route path="/UpdateCountry/:id" element={<UpdateCountry />} />    
    </Routes>
  </Fragment>
  );
};

export default Navigation1;
