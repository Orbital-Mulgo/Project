import React, { Fragment } from "react";
import Recorder from "./Recorder";
import Songs from "./Songs";

export default function Dashboard() {
    return (
        <Fragment>
            <Recorder />
            <Songs />
        </Fragment>
    );
}
