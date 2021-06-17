import React, { Fragment } from "react";
import Form from "./Form";
import Songs from "./Songs";
import MicRecorder from 'mic-recorder-to-mp3';

export default function Dashboard() {
    return (
        <Fragment>
            <Form />
            <Songs />
        </Fragment>
    );
}
