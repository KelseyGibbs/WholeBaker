import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";
import stylesheet from "./Dashboard";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container">
      
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name}
              <p className="flow-text grey-text text-darken-1">
                Welcome to the the <b>WholeBaker</b> customer portal
              </p>
            </h4>
            <button
              onClick={this.onLogoutClick}
              className="btn"
            >
              Logout
            </button>
            
          </div>
        </div>
        <div className="row space">

<div className="col s6">
  <div className="card-panel teal">
    <span className="white-text">
    <a href="/order"><h3>Place an Order</h3></a>
    </span>
  </div>
</div>

<div className="col s6">
  <div className="card-panel teal">
    <span className="white-text"> 
    <a href="/userInfo"><h3>View your user info.</h3></a>
    </span>
  </div>
</div>
      </div>
    </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);