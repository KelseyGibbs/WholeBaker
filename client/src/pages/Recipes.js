import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions/authActions";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { List, ListItem, Card } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Recipes extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  // Setting our component's initial state
  state = {
    recipes: [],
    title: "",
    price: "",
    description: ""
  };

  // When the component mounts, load all recipes and save them to this.state.recipes
  componentDidMount() {
    this.loadRecipes();
  }

  // Loads all recipes  and sets them to this.state.recipes
  loadRecipes = () => {
    API.getRecipes()
      .then(res =>
        this.setState({ recipes: res.data, title: "", price: "", description: "" })
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
        description: this.state.description
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
        <form>
          <Input value={this.state.title} onChange={this.handleInputChange} name="title" placeholder="Title (required)" />
          <Input value={this.state.price} onChange={this.handleInputChange} name="price" placeholder="Price (required)" />
          <TextArea value={this.state.description} onChange={this.handleInputChange} name="description" placeholder="Description (Optional)" />
          <FormBtn
                  disabled={!(this.state.price && this.state.description)}
                  onClick={this.handleFormSubmit}
                  >
                  Submit Recipe
                </FormBtn>
              </form>
            </div>
          </div>
            <div className="col 3">
              {this.state.recipes.length ? (
                <List>
                  {this.state.recipes.map(recipe => {
                    return (
                      <ListItem key={recipe._id}>
                        <div className="card">
                              <div className="card-image waves-effect waves-block waves-light">
                              </div>
                              <div className="card-content">
                              <span className="card-title activator grey-text text-darken-4">{recipe.title}<i className="material-icons right">more_vert</i></span>
                                <p><a href={"/recipes/" + recipe._id}>This is a link</a></p>
                                </div>
                              <div className="card-reveal">
                             <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                          <p>{recipe.description}</p>
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
  Recipes.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Recipes);