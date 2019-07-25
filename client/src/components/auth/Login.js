import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";
import classnames from "classnames";
import stylesheet from "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      isAdmin: true
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
		this.setState(function(prevState) {
			return {isAdmin: !prevState.isAdmin};
		});
	}

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated && this.state.isAdmin === true) {
      this.props.history.push("/newproduct");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated && this.state.isAdmin === true) {
      this.props.history.push("/newProduct");
    }
    if (nextProps.auth.isAuthenticated && this.state.isAdmin === false) {
      this.props.history.push("/home");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
      isAdmin: this.state.isAdmin
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;




    return (
      
      <div className="container">
      <div id="login">
        <div className="row">
        <div id="logintext">
            <div className="col s12">
            <h2>Welcome to <b>Whole Baker</b></h2>
            <p style={{padding: "3px"}}><i>"your wholesale bakery management application"</i></p>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                <b>Don't have an account?</b> Contact WholeBaker to get setup 
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                  />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                  />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12">
              <div className="switch">
              <p>Admin?</p>
                <label>
                  true
                  <input 
                  type="checkbox"
                  onClick={this.handleToggle}
                  ></input>
                  <span className="lever">{this.state.isAdmin ? 'true' : 'false'}</span>
                  false
                </label>
              </div>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn"
                  >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
                  </div>
</div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);