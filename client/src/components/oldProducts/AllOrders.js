// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
// import API from "../../utils/API2";
// import { List, ListItem, Card } from "../List";
// import { Input, TextArea, FormBtn } from "../Form";
// import DeleteBtn from "../DeleteBtn";


// class AllOrders extends Component {
//   onLogoutClick = e => {
//     e.preventDefault();
//     this.props.logoutUser();
//   };

//   state = {
//     orders: [],
//     customer: "",
//     quantity: "",
//     title: "",
//     price: ""
//   };

//   // When the component mounts, load all orders and save them to this.state.orders
//   componentDidMount() {
//     this.loadOrders();
//   }

//   // Loads all orders  and sets them to this.state.orders
//   loadOrders = () => {
//     API.getOrders()
//       .then(res =>
//         this.setState({ orders: res.data,     customer: "",
//         quantity: "",
//         title: "",
//         price: "" })
//       )
//       .catch(err => console.log(err));
//   };

//   // Deletes a order from the database with a given id, then reloads orders from the db
//   deleteOrder = id => {
//     API.deleteOrder(id)
//       .then(res => this.loadOrders())
//       .catch(err => console.log(err));
//   };

//   // Handles updating component state when the user types into the input field
//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };


//   render() {
//     const { user } = this.props.auth;
//     return (
//       <div className="container">

//             <div className="col 3">
//               {this.state.orders.length ? (
//                 <List>
//                   {this.state.orders.map(order => {
//                     return (
//                       <ListItem key={order._id}>
//                         <div className="card">
//                               <div className="card-image waves-effect waves-block waves-light">
//                               </div>
//                               <div className="card-content">
//                               <span className="card-title activator grey-text text-darken-4">{order.title}<i className="material-icons right">more_vert</i></span>
//                                 <p><a href={"/orders/" + order._id}>This is a link</a></p>
//                                 </div>
//                               <div className="card-reveal">
//                              <span className="card-title grey-text text-darken-4">{order.price}<i className="material-icons right">close</i></span>
//                           <p>{order.quantity}</p>
//                       </div>
//                     </div>
                  
//                       </ListItem>
//                     );
//                   })}
//                 </List>
//               ) : (
//                 <h3>No Results to Display</h3>
//                 )}
//             </div>
//             <button
//               onClick={this.onLogoutClick}
//               className="btn"
//             >
//               Logout
//             </button>
//           </div>
//       );
//     }
//   }


// AllOrders.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   { logoutUser }
// )(AllOrders);