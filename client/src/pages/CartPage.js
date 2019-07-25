// import React, { Component } from 'react';
// // import { Cart } from '../components/Order/Cart';
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../actions/authActions";


// class CartPage extends Component {
//     onLogoutClick = e => {
//         e.preventDefault();
//         this.props.logoutUser();
//       };

//  render(){
//     const { user } = this.props.auth;
//      return(
//      <div>
//           <b>Hey there,</b> {user.name}

//      <button
//      onClick={this.onLogoutClick}
//      className="btn"
//    >
//      Logout
//    </button>
//      </div>
//      );
//  }
 


// }


// CartPage.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
//   };
  
//   const mapStateToProps = state => ({
//     auth: state.auth
//   });
  
//   export default connect(
//     mapStateToProps,
//     { logoutUser }
//   )(CartPage);