import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>WholeBaker</b> 
            </h4>
            <p className="flow-text grey-text">
              A bakery ordering and recipe management application.
            </p>
            <br />
            <div className="col s12">
              <Link
                to="/login"
                className="btn"
              >Log In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;