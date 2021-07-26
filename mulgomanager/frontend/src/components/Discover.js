import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import DiscoverList from "./DiscoverList";

// In order to work with redux from any component, you need to use "connect"

export class Discover extends Component {
  state = {
    info: [],
    acousticness: "",
    danceability: "",
    energy: "",
    instrumentalness: "",
    liveness: "",
    speechiness: "",
    valence: "",
    loudness: "",
    tempo: "",
};

  componentDidMount() {
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { acousticness,danceability,
      energy,instrumentalness,liveness,
      speechiness,valence,loudness,tempo } = this.state;
      fetch("http://127.0.0.1:8000/discover/?acousticness=" + acousticness + "&danceability=" + danceability
      + "&energy=" + energy + "&instrumentalness=" + instrumentalness
      + "&liveness=" + liveness + "&speechiness=" + speechiness
      + "&valence=" + valence + "&loudness=" + loudness 
      + "&tempo=" + tempo + "&deviation=80")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          info: data.slice(0,10),
          acousticness: this.state.acousticness,
          danceability: this.state.danceability,
          energy: this.state.energy,
          instrumentalness: this.state.instrumentalness,
          liveness: this.state.liveness,
          speechiness: this.state.speechiness,
          valence: this.state.valence,
          loudness: this.state.loudness,
          tempo: this.state.tempo,
        });
      })
    

};

  render() {
    const { acousticness,danceability,
      energy,instrumentalness,liveness,
      speechiness,valence,loudness,tempo } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
          <h2 style={{ textAlign: "center", padding: "20px" }}>Choose a song from your preference!</h2>
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                  <label>Acousticness (0 to 1)</label>
                  <input
                      className="form-control"
                      type="text"
                      name="acousticness"
                      onChange={this.onChange}
                      value={acousticness}
                  />
              </div>
              <div className="form-group">
                  <label>Danceability (0 to 1)</label>
                  <input
                      className="form-control"
                      type="text"
                      name="danceability"
                      onChange={this.onChange}
                      value={danceability}
                  />
              </div>
              <div className="form-group">
                  <label>Energy (0 to 1)</label>
                  <input
                      className="form-control"
                      type="text"
                      name="energy"
                      onChange={this.onChange}
                      value={energy}
                  />
              </div>
              <div className="form-group">
                  <label>Instrumentalness (0 to 1)</label>
                  <input
                      className="form-control"
                      type="text"
                      name="instrumentalness"
                      onChange={this.onChange}
                      value={instrumentalness}
                  />
              </div>
              <div className="form-group">
                  <label>Liveness (0 to 1)</label>
                  <input
                      className="form-control"
                      type="text"
                      name="liveness"
                      onChange={this.onChange}
                      value={liveness}
                  />
              </div>
              <div className="form-group">
                  <label>Speechiness (0 to 1)</label>
                  <input
                      className="form-control"
                      type="text"
                      name="speechiness"
                      onChange={this.onChange}
                      value={speechiness}
                  />
              </div>
              <div className="form-group">
                  <label>Valence (0 to 1)</label>
                  <input
                      className="form-control"
                      type="text"
                      name="valence"
                      onChange={this.onChange}
                      value={valence}
                  />
              </div>
              <div className="form-group">
                  <label>Loudness (-60 to 0)</label>
                  <input
                      className="form-control"
                      type="text"
                      name="loudness"
                      onChange={this.onChange}
                      value={loudness}
                  />
              </div>
              <div className="form-group">
                  <label>Tempo (50 to 150)</label>
                  <input
                      className="form-control"
                      type="text"
                      name="tempo"
                      onChange={this.onChange}
                      value={tempo}
                  />
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                      Submit
                  </button> 
              </div>
          </form> 
          <DiscoverList info={this.state.info}/>
      </div>
  );
}
}


export default Discover
