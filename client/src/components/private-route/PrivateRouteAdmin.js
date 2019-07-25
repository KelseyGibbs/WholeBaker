import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../store/actions/authActions";
import { userInfo } from "os";

const PrivateRouteAdmin = ({ component: Component, auth, isAdmin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true 
      ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRouteAdmin.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAdmin: state.isAdmin
});

export default connect(mapStateToProps)(PrivateRouteAdmin);
