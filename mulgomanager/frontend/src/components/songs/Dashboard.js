import React, { Fragment } from "react";
import Form from "./Form";
import Songs from "./Songs";

export default function Dashboard() {
    return (
        <Fragment>
            <Form />
            <Songs />
        </Fragment>
    );
}
