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
  }
  state = {
    info: this.props.song,
    title: this.props.song.result.title,
    artist: this.props.song.result.primary_artist.name,
    image: this.props.song.result.header_image_url,
    libraryState: "Add to library",
  };

  handleClick = () => {
    console.log(this.props)
    const { info, title, artist, image, libraryState } = this.state;
    fetch("http://127.0.0.1:8000/songs/?name=" + title)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.props.addSong(data);
        });
    
    this.setState({
      info: this.state.info,
      title: this.state.title,
      artist: this.state.artist,
      image: this.state.image,
      libraryState: "Added to library",
    });
  };

  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.state.artist}</td>
        <Link
          to={{
            pathname: "/resultpage",
            state: {
              title: this.state.title,
              artist: this.state.artist,
              image: this.state.image,
            },
          }}
          style={{ color: "black" }}
          replace
        >
          <td>{this.state.title}</td>
        </Link>
        <td>
          <img
            src={this.state.image}
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
    total: [],
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

      axios
          .post("search/", body, config)
          .then((res) => {
            console.log(res.data);
            this.setState({
              info: res.data.hits,
              total: this.state.total,
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
