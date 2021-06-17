import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSong } from "../../actions/songs";
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends Component {
  constructor(props) {
    super(props);
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    this.state = {
      isRecording: false,
      isPaused: false,
      blobURL: "",
      isBlocked: false
    };
  }

  startRecording = () => {
    if (this.state.isBlocked) {
      console.log("Please give permission for the microphone to record audio.");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch(e => console.error(e));
    }
  };

  stopRecording = () => {
    this.setState({ isRecording: false });
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        // const file = new File(buffer, 'me-at-thevoice.mp3', {
        //   type: blob.type,
        //   lastModified: Date.now()
        // });
        // const player = new Audio(URL.createObjectURL(file));
        // player.play();

        const blobURL = URL.createObjectURL(blob)
        this.setState({ 
          blobURL: blobURL,
          isRecording: false
        });
      })
      .catch(e => console.log(e));
  };

  checkPermissionForAudio = () => {
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.setState({ isBlocked: false });
      })
      .catch(err => {
        this.setState({ isBlocked: true });
        console.log("Please give permission for the microphone to record audio.");      
        console.log(err.name + ": " + err.message);
      });
  };

  componentDidMount() {
    this.checkPermissionForAudio();
  }

  render() {
    const { isRecording } = this.state;
    return (
      <React.Fragment>
      <h1>Audio Recorder</h1>
        <button
          onClick={this.startRecording}
          className="mr-3 add-collec-btn"
          disabled={isRecording}
        >
          Record
        </button>
        <button
          onClick={this.stopRecording}
          className="mr-3 delete-btn"
          disabled={!isRecording}
        >
          Stop
        </button>
      </React.Fragment>
    );
  }
}
export default Recorder;


  // state = {
  //   name: "",
  //   email: "",
  //   message: "",
  // };

  // static propTypes = {
  //   addLead: PropTypes.func.isRequired,
  // };

  // onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // onSubmit = (e) => {
  //   e.preventDefault();
  //   const { name, email, message } = this.state;
  //   const lead = { name, email, message };
  //   this.props.addLead(lead);
  //   this.setState({
  //     name: "",
  //     email: "",
  //     message: "",
  //   });
  // };

  // render() {
  //   const { name, email, message } = this.state;
  //   return (
  //     <div className="card card-body mt-4 mb-4" 
  //       style={{ 
  //           textAlign: "center",
  //       }}>

  //       <h2>Record Song</h2>
  //       <form onSubmit={this.onSubmit}>
  //         <button>
  //         <img
  //           src="../../../static/images/recordbutton.png"
  //           alt="Record button"
  //           style={{
  //             padding: "15px",
  //           }}
  //         />
  //         </button> 
  //         <div className="form-group">
  //           <button type="submit" className="btn btn-primary" >
  //             Submit
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // }
  //}
//connect(null, { addLead })(Form);
