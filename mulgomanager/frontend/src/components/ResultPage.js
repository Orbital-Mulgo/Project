import React, { Component, Fragment } from "react";

export class ResultPage extends Component {
  render() {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <h1 style={{ padding: "20px" }}>Result Page</h1>
        <div style={{ float: "left", width: "20%", textAlign: "left" }}>
          Song: {}
          <br />
          Artist Name: {}
          <br />
          Album Name: {}
          <br />
          <img alt="Album photo"></img>
        </div>
        <div style={{ float: "right", width: "80%" }}>
          <h2>Song Lyrics</h2>
          <br />
          Lyrics goes here {}
        </div>
      </div>
    );
  }
}

export default ResultPage;
