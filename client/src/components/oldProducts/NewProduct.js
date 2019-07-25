import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";
import { List, ListItem, Card } from "../List";
import { Input, TextArea, FormBtn } from "../Form";
import { fetchProducts } from '../../store/actions/products';
import Products from '../../components/Products/Products';

class NewProduct extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    this.props.fetchProducts();   
  }


  // Setting our component's initial state
  state = {
    recipes: [],
    title: "",
    price: "",
    image: ""
  };

  // When the component mounts, load all recipes and save them to this.state.recipes
  // componentDidMount() {
  //   this.loadRecipes();
  // }

  // Loads all recipes  and sets them to this.state.recipes
  // loadRecipes = () => {
  //   API.getRecipes()
  //     .then(res =>
  //       this.setState({ recipes: res.data, title: "", price: "", description: "", inventory: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  // // Deletes a recipe from the database with a given id, then reloads recipes from the db
  // deleteRecipe = id => {
  //   API.deleteRecipe(id)
  //     .then(res => this.loadRecipes())
  //     .catch(err => console.log(err));
  // };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveRecipe method to save the recipe data
  // Then reload recipes from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.price) {
      API.saveRecipe({
        title: this.state.title,
        price: this.state.price,
        image: this.state.image
      })
        .then(res => this.loadRecipes())
        .catch(err => console.log(err));
    }
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container">
      <div className="row">
      <div className="col s12">
      <h1>Add a <b>new</b> product</h1>
        <form>
          <Input value={this.state.title} onChange={this.handleInputChange} name="title" placeholder="Title (required)" />
          <Input value={this.state.inventory} onChange={this.handleInputChange} name="inventory" placeholder="Price (required)" />
          <Input value={this.state.price} onChange={this.handleInputChange} name="price" placeholder="Image Url (required)" />
          <FormBtn
                  disabled={!(this.state.price && this.state.description)}
                  onClick={this.handleFormSubmit}
                  >
                  Submit Recipe
                </FormBtn>
              </form>
            </div>
          </div>
          <Products products={ this.props.products } />
            <button
              onClick={this.onLogoutClick}
              className="btn"
            >
              Logout
            </button>
          </div>
      );
    }
  }

  NewProduct.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    products: state.products,
    cart: state.cart
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser, fetchProducts }
  )(NewProduct);