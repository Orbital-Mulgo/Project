import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// In order to work with redux from any component, you need to use "connect"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSongs, deleteSong } from "../../actions/songs";

export class SongDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      info: [],
      loading: false,
    };
  }

  FetchInfo() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      param: {
        search_term: this.props.song.name,
      },
    };

    const body = {
      search_term: this.props.song.name,
    };
      axios
        .post("search/", body, config)
        .then((res) => {
          console.log(res.data);
          this.setState({
            info: res.data.hits[0],
            loading: true,
            });
          console.log(this.state.info)
        })
        .catch((err) => {
          console.log(err.message);
        });
  }

  componentDidMount() {
    this.FetchInfo()
  }

  render() {
    const {info, loading} = this.state;
    
      return (
      <Fragment>
      {loading && (
      <tr key={this.props.song.id}>
                <td>{this.props.index + 1}</td>
                <td>{this.state.info.result.title}</td>
                <td>{this.state.info.result.primary_artist.name}</td>
                <td>
                   <img
                    src={this.state.info.result.header_image_url}
                    alt="album image"
                    width="100"
                    height="100"
                  /> 
                </td>
                <Link
                  to={{
                    pathname: "/resultpage",
                    state: {
                      title:this.state.info.result.title,
                      artist: this.state.info.result.primary_artist.name,
                      image: this.state.info.result.header_image_url,
                    },
                  }}
                  style={{ color: "black" }}
                >
                  <td>Click Here</td>
                </Link>
                <td>
                  <button
                    onClick={this.props.deleteSong.bind(this, this.props.song.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
              )
      }
      </Fragment>
    );
  }
}


export class Library extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSongs();
    console.log(this.props);
  }
    

  FetchInfo(song) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      param: {
        search_term: song.name,
      },
    };

    const body = {
      search_term: song.name,
    };
      axios
        .post("search/", body, config)
        .then((res) => {
          console.log(res.data);
          this.setState({
            info: res.data.hits[0],
          });
          console.log(this.state.info);
        })
        .catch((err) => {
          console.log(err.message);
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
          {this.props.songs.map((song, index) => (
              <SongDetail
                song={song}
                index={index}
                deleteSong={this.props.deleteSong}
              />
            ))}

             {/* <tr key={song.id}>
               {() => this.FetchInfo.call(this,song)} 
                <td>{index + 1}</td>
                <td>{}</td>
                <td>{}</td>
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
            ))}  */}
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
