require("./require-patches.js");
const express = require("express");
const React = require("react");
const {renderToString} = require("react-dom/server");
const {getPageTemplate} = require("./get-page-template.js");
const App = require("../client/src/App.js").default;

const port = 3000;
const app = express();

const pageTemplate = getPageTemplate();

const renderPage = (reactComponent) => {
    const renderedComponent = renderToString(reactComponent);
    return pageTemplate.replace('<div id="root"></div>', `<div id="root">${renderedComponent}</div>`);
};

app.get("/*", (req, res) => res.send(
    renderPage(<App ssrLocation={req.url} />),
));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
