import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";
import { List, ListItem, Card } from "../List";
import Guinness from "../Images/Guinness.jpeg"
import { Input, TextArea, FormBtn } from "../Form";
import stylesheet from "./Order.css"

class NewProduct extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  // Setting our component's initial state
  state = {
    recipes: [],
    title: "",
    price: "",
    inventory: "",
    description: "",
    inputValue: []
  };

  // When the component mounts, load all recipes and save them to this.state.recipes
  componentDidMount() {
    this.loadRecipes();
  }

  // Loads all recipes  and sets them to this.state.recipes
  loadRecipes = () => {
    API.getRecipes()
      .then(res =>
        this.setState({ recipes: res.data, title: "", price: "", description: "", inventory: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a recipe from the database with a given id, then reloads recipes from the db
  deleteRecipe = id => {
    API.deleteRecipe(id)
      .then(res => this.loadRecipes())
      .catch(err => console.log(err));
  };


  // Handles updating component state when the user types into the input field
  updateInput=(event) => {
    this.setState({
      inputValue: event.target.value
    }) 
      console.log(this.inputValue);

  };

  quantityInput = () =>{
      return <Input 
      name={this.inputValue}
      value={this.inputValue}
      onChange={this.updateInput}/>
  };
  

  // When the form is submitted, use the API.saveRecipe method to save the recipe data
  // Then reload recipes from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.price) {
      API.saveRecipe({
        title: this.state.title,
        price: this.state.price,
        description: this.state.description,
        inventory: this.state.inventory
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
      <h1><b>new</b> Order</h1>

            </div>
          </div>
          <div className="row">
              {this.state.recipes.length ? (
                <List>
                  {this.state.recipes.map(recipe => {
                    return (
                      <ListItem key={recipe._id}>
    <div class="col s3 m3 l3">
      <div class="card">
        <div class="card-image">
          <img src={Guinness}></img>
        </div>
        <div class="card-content">
        <h4>{recipe.title}</h4>
          <p>{recipe.description}</p>
          <h6>Price {recipe.price}$</h6>
        </div>
        <div class="card-action">
<form>
{/* <Input 
defaultValue={this.state.inputValue} 
name="quantity"
value={this.state.inputValue} 
onChange={this.updateInputValue.bind(this)}/> */}
<div style={{height: '40px', width: '100%'}}>
{this.quantityInput()}
</div>
</form>
</div>


        </div>
      </div>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <h3>No Results to Display</h3>
                )}
            
                </div>
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
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(NewProduct);