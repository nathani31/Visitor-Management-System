import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from './Components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
    </Router>
  );
}


export default App;
