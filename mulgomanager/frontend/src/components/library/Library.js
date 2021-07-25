import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// In order to work with redux from any component, you need to use "connect"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSongs, deleteSong } from "../../actions/songs";

export class Library extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSongs();
    console.log(this.props);
  }

  FetchArtist(song) {
    fetch("http://127.0.0.1:8000/artists/?id=" + song.artists[0])
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    });
  }

  render() {
    return (
      <Fragment>
        <h2 style={{ textAlign: "center", padding: "20px" }}>Library</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Song Title</th>
              <th>Artist</th>
              <th>Image</th>
              <th>More information</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.songs.map((song, index) => 
            //FetchArtist(song)
            (
              <tr key={song.id}>
                <td>{index + 1}</td>
                <td>{song.name}</td>
                <td>{song.artist}</td>
                <td>
                  <img
                    src={song.image}
                    alt="album image"
                    width="100"
                    height="100"
                  />
                </td>
                <Link
                  to={{
                    pathname: "/resultpage",
                    state: {
                      title: song.title,
                      artist: song.artist,
                      image: song.image,
                    },
                  }}
                  style={{ color: "black" }}
                >
                  <td>Click Here</td>
                </Link>
                <td>
                  <button
                    onClick={this.props.deleteSong.bind(this, song.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {" "}
                    Delete
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
const mapStateToProps = (state) => ({
  songs: state.songs.songs, // state.(songReducer).(object)
});

export default connect(mapStateToProps, { getSongs, deleteSong })(Library);
