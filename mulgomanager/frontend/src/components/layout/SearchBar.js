import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class SearchBar extends Component {
  state = {
    query: "",
    value: "",
  };

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
      value: document.getElementById("myDropdown").value,
    });
  };

  render() {
    return (
      <div
        class="search-container"
        style={{
          marginLeft: "350px",
        }}
      >
      
        <img
          src="../../../static/images/mulgologo2.png"
          width="180"
          height="170"
          alt="Mulgo Logo"
          style={{
            margin:"25px",
            marginLeft:"100px"
          }}
        />
        <h2> Welcome to Mulgo! </h2>
        <select
          class="form-select form-select-sm"
          id="myDropdown"
          style={{
            width: "200px",
          }}
        >
          <option value="artist">Artist</option>
          <option value="song_title">Song Title</option>
        </select>
        <form>
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
            <Link
              to={{
                pathname: "/searchpage",
                state: {
                  query: this.state.query,
                  value: this.state.value,
                },
              }}
              style={{ color: "white" }}
              replace
            >
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
