import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// In order to work with redux from any component, you need to use "connect"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSongs, deleteSong } from "../../actions/songs";

export class Library extends Component {
  static propTypes = {
    songs: PropTypes.array.isRequired,
    getSongs: PropTypes.func.isRequired,
    deleteSong: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getSongs();
  }

  render() {
    return (
      <Fragment>
        <h2>Song list</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Song Title</th>
              <th>Artist</th>
              <th>Album Name</th>
              <th>More information</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Run</td>
              <td>Onerepublic</td>
              <td>Human</td>
              <td>
              <Link to='/resultpage' class="nav-link">
              <u>Click Here</u>
              </Link>
              </td>
              <td>
                <button className="btn btn-danger btn-sm"> Delete</button>
              </td>
            </tr>
          </tbody>
          {/* <tbody>
                        {this.props.songs.map((song) => (
                            <tr key={song.id}>
                                <td>{song.id}</td>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.image}</td>
                                <td>{song.audio_file}</td>
                                <td>{song.audio_link}</td>
                                <td>{song.duration}</td>
                                <td>
                                    <button
                                        onClick={this.props.deleteSong.bind(
                                            this,
                                            song.id
                                        )}
                                        className="btn btn-danger btn-sm"
                                    >
                                        {" "}
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
        </table>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  songs: state.songs.songs, // state.(songReducer).(object)
});

export default connect(mapStateToProps, { getSongs, deleteSong })(Library);
