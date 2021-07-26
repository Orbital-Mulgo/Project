import React, { Component, Fragment} from "react";
import axios from "axios";

// In order to work with redux from any component, you need to use "connect"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { addSong } from "../actions/songs";

class SongDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: this.props.song,
      libraryState: "Add to library",
      artist: "",
      loading: false,
    };
  };

  FetchArtist() {
    fetch("http://127.0.0.1:8000/artists/?search=" + this.state.info.artists[0])
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0].name);
          this.setState({
            info: this.state.info,
            libraryState: this.state.libraryState,
            artist: data[0].name,
            loading: true,
          });
        })
  }

  componentDidMount() {
    this.FetchArtist()
  }

  handleClick = () => {
    console.log(this.state.artist)
    this.props.addSong(this.state.info)
    
    this.setState({
      info: this.state.info,
      libraryState: "Added to library",
      artist: this.state.artist,
      loading: this.state.loading,
    });
  };

  render() {
    const {info, libraryState,artist,loading} = this.state;
    return (
      <Fragment>
      {loading && (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.state.artist}</td>
        <Link
          to={{
            pathname: "/resultpage",
            state: {
              title: this.state.info.name,
              artist: this.state.artist,
              image: this.state.info.header_image_url,
              info: this.state.info,
            },
          }}
          style={{ color: "black" }}
          replace
        >
          <td>{this.state.info.name}</td>
        </Link>
        <td>
          <img
            src = {this.state.info.header_image_url}
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
      )}
      </Fragment>
    );
  }
}

export class SearchPage extends Component {
  state = {
    info: [],
    total: [],
  };

  componentDidMount() {
    if (this.props.location.state) {
      console.log(this.props.location.state);
      const { query, value } = this.props.location.state;
      fetch("http://127.0.0.1:8000/songs/?search=" + query)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({
            info: data,
          });
        })
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
          <tbody>
            {this.state.info.map((song, index) => (
              <SongDetail
                song={song}
                index={index}
                total={this.state.total}
                addSong={this.props.addSong}
              />
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default connect(null, { addSong })(SearchPage);
//export default withRouter(SearchPage)
