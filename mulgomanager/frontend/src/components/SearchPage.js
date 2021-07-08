import React, { Component, Fragment, useState } from "react";
import axios from "axios";

// In order to work with redux from any component, you need to use "connect"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class SongDetail extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    info: this.props.song,
    libraryState: "Add to library",
 }

 handleClick = () => {
  this.setState({
    info: this.state.info,
    libraryState: "Added to library",
  });
};

  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.state.info.result.primary_artist.name}</td>
        <Link
          to={{
            pathname: "/resultpage",
            state: {
              title: this.state.info.result.title,
              artist: this.state.info.result.primary_artist.name,
              image: this.state.info.result.header_image_url,
            },
          }}
          style={{ color: "black" }}
          replace
        >
          <td>{this.state.info.result.title}</td>
        </Link>
        <td>
          <img
            src={this.state.info.result.header_image_url}
            alt="album image"
            width="100"
            height="100"
          />
        </td>
        <td>
          <button
            type="submit"
            className="btn btn-danger btn-sm"
            onClick={this.handleClick}
          >
            {this.state.libraryState}
          </button>
        </td>
      </tr>
    );
  }
}

export class SearchPage extends Component {
  state = {
    info: [],
  };

  componentDidMount() {
    if (this.props.location.state) {
      console.log(this.props.location.state);
      const { query, value } = this.props.location.state;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        param: {
          search_term: query,
        },
      };

      const body = {
        search_term: query,
      };

      if (value == "artist") {
        axios
          .post("search/", body, config) //Change accordingly to the api
          .then((res) => {
            console.log(res.data);
            this.setState({
              info: res.data.hits,
            });
            console.log(this.state.info);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else if (value == "song_title") {
        axios
          .post("search/", body, config) //Change accordingly to the api
          .then((res) => {
            console.log(res.data);
            this.setState({
              info: res.data.hits,
            });
            console.log(this.state.info);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  }

  render() {
    return (
      <Fragment>
        <h2 style={{ textAlign: "center", padding: "20px" }}>
          Search Results
        </h2>
        <table className="table table-striped">
          <col width="300px" />
          <col width="450px" />
          <col width="450px" />
          <col width="450px" />
          <col width="450px" />
          <thead>
            <tr>
              <th>S/N</th>
              <th>Artist</th>
              <th>Song Title</th>
              <th>Image</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.info.map((song, index) => (
                <SongDetail song={song} index={index} />
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default SearchPage;
