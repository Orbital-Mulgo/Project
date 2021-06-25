import React, { Fragment } from "react";
import Recorder from "./Recorder";
import Songs from "./Songs";
import MicRecorder from "mic-recorder-to-mp3";

export default function Dashboard() {
    return (
        <Fragment>
            <Recorder />
            <Songs />
        </Fragment>
    );
}
