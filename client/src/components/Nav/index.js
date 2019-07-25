import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Nav(...props) {
  return (
    <nav>
    <div class="nav-wrapper teal">
      <ul id="nav-mobile" class="right">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li></li>
      </ul>
    </div>
  </nav>
        
  );
}

export default Nav;
