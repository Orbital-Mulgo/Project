// Any actions that we want to fire off will go in here, and this is where we will make all our HTTP requests.

import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
    axios
        .get("/api/leads/", tokenConfig(getState)) // Already on local host, so don't need to specify port 8000
        .then((res) => {
            // Response
            dispatch({
                type: GET_LEADS, // Send (dispatch) the action (in this case we have "GET_LEADS") to the reducers
                payload: res.data, // Return (payload) the data from the response
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        ); // In case we have an error. Eventually, we want to have an error reducer, which will be sent down to our components, but for now we will console log it.
};

// DELETE LEAD

export const deleteLead = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/leads/${id}/`, tokenConfig(getState)) // Backtick, and pass in the id of the lead you want to delete
        .then((res) => {
            dispatch(createMessage({ deleteLead: "Lead Deleted" }));
            // Response
            dispatch({
                type: DELETE_LEAD,
                payload: id,
            });
        })
        .catch((err) => console.log(err)); // In case we have an error. Eventually, we want to have an error reducer, which will be sent down to our components, but for now we will console log it.
};

// ADD LEAD
export const addLead = (lead) => (dispatch, getState) => {
    axios
        .post("/api/leads/", lead, tokenConfig(getState)) // Already on local host, so don't need to specify port 8000
        .then((res) => {
            dispatch(createMessage({ addLead: "Lead Added" }));
            // Response
            dispatch({
                type: ADD_LEAD,
                payload: res.data,
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
