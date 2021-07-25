// Any actions that we want to fire off will go in here, and this is where we will make all our HTTP requests.

import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_SONGS, DELETE_SONG, ADD_SONG } from "./types";

// GET SONGS
export const getSongs = () => (dispatch, getState) => {
    axios
        .get("/api/songs/", tokenConfig(getState)) // Already on local host, so don't need to specify port 8000
        .then((res) => {
            // Response
            dispatch({
                type: GET_SONGS, // Send (dispatch) the action (in this case we have "GET_SONGS") to the reducers
                payload: res.data, // Return (payload) the data from the response
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        ); // In case we have an error. Eventually, we want to have an error reducer, which will be sent down to our components, but for now we will console log it.
};

// DELETE SONG

export const deleteSong = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/songs/${id}/`, tokenConfig(getState)) // Backtick, and pass in the id of the song you want to delete
        .then((res) => {
            dispatch(createMessage({ deleteSong: "Song Deleted" }));
            // Response
            dispatch({
                type: DELETE_SONG,
                payload: id,
            });
        })
        .catch((err) => console.log(err)); // In case we have an error. Eventually, we want to have an error reducer, which will be sent down to our components, but for now we will console log it.
};

// ADD SONG
export const addSong = (song) => (dispatch, getState) => {
    axios
        .post("/api/songs/", song, tokenConfig(getState)) // Already on local host, so don't need to specify port 8000
        .then((res) => {
            dispatch(createMessage({ addSong: "Song Added" }));
            // Response
            dispatch({
                type: ADD_SONG,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response.data);
        }
        );
};
