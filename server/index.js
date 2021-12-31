const http = require("http");
const express = require("express");
const {runServer} = require("render-gateway");
const {renderEnvironment} = require("./render-environment.js");

const port = 3001;
const app = express();

if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));
}

app.get("/*", (req, res, next) => {
    const headers = Object.assign({}, req.headers);
    if (req.headers["accept"] && req.headers["accept"].indexOf("text/html") > -1) {
        headers["accept-encoding"] = "utf8";
    }

    const targetUrl = new URL(req.url, `http://${req.headers.host}`);
    const hasExtension = targetUrl.pathname.indexOf(".") > -1;

    /**
     * Production is easy. We only get here for things that can't be served by
     * static files - which basically means `index.html`.
     *
     * Or if this request doesn't end on an extension.
     *
     * So, we'll let the render gateay stuff handle it.
     */
    if (process.env.NODE_ENV === "production" || (req.headers["accept"] && req.headers["accept"].indexOf("text/html") > -1 && !targetUrl.pathname.includes("static") && !hasExtension)) {
        http.get(
            {
                port: 3002,
                path: `/_render?url=${encodeURIComponent(targetUrl)}`,
                headers,
            },
            (proxiedResponse) => {
                res.writeHead(proxiedResponse.statusCode, proxiedResponse.headers);
                proxiedResponse.pipe(res, {end: true});
                next();
            },
        );
        return;
    }

    /**
     * Otherwise, we want to send this off to webpack so it can resolve it,
     * which we know is on port 3000.
     */
    http.get(
        {
            port: 3000,
            path: req.url,
            headers,
        },
        (proxiedResponse) => {
            res.writeHead(proxiedResponse.statusCode, proxiedResponse.headers);
            proxiedResponse.pipe(res, {end: true});
            next();
        },
    );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

runServer({
    port: 3002,
    renderEnvironment,
});
