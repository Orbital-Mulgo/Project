import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class SearchBar extends Component {
  state = {
    query: "",
  };


  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <div class="search-container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search for ..."
            name="search"
            style={{
              height: "48px",
              width: "270px",
              fontSize: "14px",
            }}
            onChange={this.handleChange}
          />
          <button class="btn btn-dark" type="submit">
            <Link to= {{
              pathname: "/searchpage",
              state: {
                query: this.state.query
              }
            }} style={{color:"white"}} replace >
            Search
            </Link>
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(SearchBar);
