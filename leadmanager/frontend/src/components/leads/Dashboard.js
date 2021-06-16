import React, { Fragment } from "react";
import Recorder from "./Recorder";
import Leads from "./Leads";
import MicRecorder from 'mic-recorder-to-mp3';

export default function Dashboard() {
    return (
        <Fragment>
            <Recorder />
            <Leads />
        </Fragment>
    );
}
