import {
    GET_SONGS,
    DELETE_SONG,
    ADD_SONG,
    LOGOUT_SUCCESS,
} from "../actions/types.js";

const initialState = {
    songs: [],
    songinfos: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SONGS:
            return {
                ...state,
                songs: action.payload,
            };
        case DELETE_SONG:
            return {
                ...state,
                songs: state.songs.filter((song) => song.id !== action.payload),
            };
        case ADD_SONG:
            return {
                ...state,
                songs: [...state.songs, action.payload],
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                songs: [],
            };
        default:
            return state;
    }
}
