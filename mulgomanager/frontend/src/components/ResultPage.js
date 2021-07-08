import React, { Component, Fragment } from "react";
import axios from "axios";

export class ResultPage extends Component {
  state = {
    id: "",
    title: "",
    artist: "",
    image: "",
    lyrics: "",
  };

  componentDidMount() {
    if (this.props.location.state) {
      const { title, artist, image } = this.props.location.state;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        param: {
          search_term: title,
        },
      };

      const body = {
        search_term: title,
      };
      axios
        .post("search/song/", body, config)
        .then((res) => {
          console.log(res.data);
          var data = JSON.parse(res.data);

          this.setState({
            id: data.id,
            title: title,
            artist: artist,
            image: image,
            lyrics: data.lyrics,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  render() {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <h1 style={{ padding: "20px" }}>Result Page</h1>
        <div
          style={{
            float: "left",
            width: "20%",
            textAlign: "left",
            fontWeight: "bold",
          }}
        >
          Song: {this.state.title}
          <br />
          Artist Name: {this.state.artist}
          <br />
          <img
            src={this.state.image}
            alt="Album photo"
            width="200"
            height="200"
          ></img>
        </div>
        <div style={{ float: "right", width: "80%" }}>
          <h2>Song Lyrics</h2>
          <br />
          {this.state.lyrics.split(/\n/).map((line) => (
            <div>{line}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default ResultPage;
