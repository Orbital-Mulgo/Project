import React, { Component, Fragment } from "react";

// In order to work with redux from any component, you need to use "connect"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSongs, deleteSong } from "../../actions/songs";

export class Songs extends Component {
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
                            <th>Image</th>
                            <th>Song File</th>
                            <th>Song Link</th>
                            <th>Song Duration</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    songs: state.songs.songs, // state.(songReducer).(object)
});

export default connect(mapStateToProps, { getSongs, deleteSong })(Songs);
