require("./require-patches.js");
const http = require("http");
const express = require("express");
const React = require("react");
const {renderToString} = require("react-dom/server");
const getProductionPageTemplate = require("./get-production-page-template.js");
const App = require("../client/src/App.js").default;

const port = 3001;
const app = express();

const renderPage = (pageTemplate, reactComponent) => {
    const renderedComponent = renderToString(reactComponent);
    return pageTemplate.replace('<div id="root"></div>', `<div id="root">${renderedComponent}</div>`);
};

if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));
}

app.get("/*", (req, res, next) => {
    /**
     * Production is easy. We'll load the template and render into it.
     */
    if (process.env.NODE_ENV === "production") {
        res.send(
            renderPage(getProductionPageTemplate(), <App ssrLocation={req.url} />),
        );
        next();
        return;
    }

    /**
     * During development, we're going to proxy to the webpack dev server.
     */
    if (process.env.NODE_ENV !== "production") {
        /**
         * Let's make life easier on ourselves and only accept UTF-8 when it's
         * a text/html request. We're in dev, so we don't need GZIP savings.
         */
        const headers = Object.assign({}, req.headers);
        if (req.headers["accept"] && req.headers["accept"].indexOf("text/html") > -1) {
            headers["accept-encoding"] = "utf8";
        }

        /**
         * Now call the client dev server, which we know is on port 3000.
         */
        http.get(
            {
                port: 3000,
                path: req.url,
                headers: headers,
            },
            (proxiedResponse) => {
                /**
                 * If our original request was text/html, we want to render
                 * react in there. So, let's gather that response and then
                 * render the page.
                 */
                if (req.headers["accept"] && req.headers["accept"].indexOf("text/html") > -1) {
                    let responseBody = "";
                    proxiedResponse.setEncoding("utf8");
                    proxiedResponse.on("data", (chunk) => {
                        responseBody += chunk;
                    }).on("end", () => {
                        res.send(
                            renderPage(responseBody, <App ssrLocation={req.url} />),
                        );
                        next();
                    }).on("error", e => {
                        res.status(500);
                        res.send(e);
                    });
                    return;
                }

                res.writeHead(proxiedResponse.statusCode, proxiedResponse.headers);
                proxiedResponse.pipe(res, {end: true});
                next();
            },
        );
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
