import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSong } from "../../actions/songs";

export class Form extends Component {
  state = {
    name: "",
    email: "",
    message: "",
  };

  static propTypes = {
    addSong: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { title, artist, image, audio_file, audio_link, duration } = this.state;
    const song = { title, artist, image, audio_file, audio_link, duration };
    this.props.addSong(song);
    this.setState({
      title: "",
      artist: "",
      image: "",
      audio_file: "",
      audio_link: "",
      duration: "",
    });
  };

  render() {
    const { title, artist, image, audio_file, audio_link, duration } = this.state;
    return (
      <div className="card card-body mt-4 mb-4" 
        style={{ 
            textAlign: "center",
            //backgroundColor:"black"
        }}>
        <h2>Record Song</h2>
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            onChange={this.onChange}
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            onChange={this.onChange}
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            className="form-control"
                            type="text"
                            name="message"
                            onChange={this.onChange}
                            value={message}
                        />
                    </div> */}
          <img
            src="../../../static/images/recordbutton.png"
            alt="Record button"
            style={{
              padding: "15px",
            }}
          />
          <div className="form-group">
            <button type="submit" className="btn btn-primary" >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addSong })(Form);
