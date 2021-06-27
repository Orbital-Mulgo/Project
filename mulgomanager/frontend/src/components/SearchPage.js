import React, { Component, Fragment } from "react";
import axios from "axios";

// In order to work with redux from any component, you need to use "connect"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class SearchPage extends Component {
  state = {
    // id: "",
    // title: "",
    // artist: "",
    // image: "",
    // lyrics: "",
    info: [],
  };

  componentDidMount() {
    if (this.props.location.state) {
      console.log(this.props.location.state);
      const { query } = this.props.location.state;

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
      axios
        .post("search/", body, config)
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

  render() {
    return (
      <Fragment>
        <h2 style={{ textAlign: "center", padding: "20px" }}>Search Results</h2>
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

          {/* <tbody>
            <tr>
              <td>1</td>
              <td>
                 <Link
                  to={{
                    pathname: "/resultpage",
                    state: {
                      id: this.state.id,
                      title: this.state.title,
                      artist: this.state.artist,
                      image: this.state.image,
                      lyrics: this.state.lyrics,
                    },
                  }}
                  style={{ color: "black" }}
                  replace
                >
                  {this.state.title}
                </Link> 
              </td>
              <td>{this.state.artist}</td>
              <td>
                <img src={this.state.image} width="100" height="100" />
              </td>
            </tr>
          </tbody> */}
          <tbody>
            {this.state.info.map((song, index) => (
              <tr>
                <td>{index + 1}</td>

                <td>{song.result.primary_artist.name}</td>
                <Link
                  to={{
                    pathname: "/resultpage",
                    state: {
                      id: song.result.id,
                      title: song.result.title,
                      artist: song.result.primary_artist.name,
                      image: song.result.header_image_url,
                    },
                  }}
                  style={{ color: "black" }}
                  replace
                >
                  <td>{song.result.title}</td>
                </Link>
                <td>
                  <img
                    src={song.result.header_image_url}
                    alt="album image"
                    width="100"
                    height="100"
                  />
                </td>
                <td>
                  <button className="btn btn-danger btn-sm">
                    Add to Library
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

// const mapStateToProps = (state) => ({
//     songs: state.songs.songs, // state.(songReducer).(object)
// });

export default SearchPage;
