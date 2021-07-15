import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSong } from "../../actions/songs";

export class Form extends Component {
    state = {
        title: "",
        artist: "",
    };

    static propTypes = {
        addSong: PropTypes.func.isRequired,
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const { title, artist } = this.state;
        let duration ='00:03:25';
        const song = { title, artist, duration};
        console.log(song)
        this.props.addSong(song);
        this.setState({
            title: "",
            artist: "",
        });
    };

    render() {
        const { title,artist } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add Song</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Artist</label>
                        <input
                            className="form-control"
                            type="text"
                            name="artist"
                            onChange={this.onChange}
                            value={artist}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, { addSong })(Form);