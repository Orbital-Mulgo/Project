import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// In order to work with redux from any component, you need to use "connect"

export class Discover extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }


  render() {
    return (
      <Fragment>
        <h2 style={{ textAlign: "center", padding: "20px" }}>Discover Page</h2>
      </Fragment>
    );
  }
}


export default Discover
