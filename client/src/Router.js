import React from 'react';
import {BrowserRouter, StaticRouter} from "react-router-dom";

export default function Router(props) {
    const {ssrLocation, children} = props;

    if (ssrLocation == null) {
        return <BrowserRouter>{children}</BrowserRouter>;
    }

    return <StaticRouter location={ssrLocation}>{children}</StaticRouter>;
}
