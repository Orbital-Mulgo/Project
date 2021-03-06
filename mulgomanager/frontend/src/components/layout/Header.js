import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import SearchBar from "./SearchBar";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ms-auto mt-2 mt-lg-0 ">
        <span className="navbar-text mr-3" style={{ color: "white" }}>
          <strong>Welcome {user ? `${user.username}` : ""} !</strong>
        </span>
        <li className="nav-item">
          <button
            onClick={this.props.logout}
            className="nav-link btn btn-dark text-light"
            style={{
              marginLeft: "70px",
              width: "100px",
              innerHeight: "120px",
              fontSize: "13px",
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav
        class="navbar navbar-expand-lg navbar-dark"
        style={{
          backgroundColor: "#FF3399",
          height: "110px",
        }}
      >
        <a class="navbar-brand" href="#">
          <img
            src="../../../static/images/mulgotext.png"
            alt="Mulgo text"
            height="150px"
            width="250px"
            style={{
              margin: "0 0 -70px 0",
            }}
          ></img>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav md-auto">
            <li class="nav-item active">
              <Link to="/" class="nav-link" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to='/library' class="nav-link" style={{ color: "white" }}>
                Library
              </Link>
            </li>
            <li class="nav-item">
            <Link to='/discover' class="nav-link" style={{ color: "white" }}>
                Discover
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
