const express = require("express");
const React = require("react");
const {renderToString} = require("react-dom/server");

const port = 3000;
const app = express();

const pageTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="description"
      content="SSR result"
    />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`;

const renderPage = (reactComponent) => {
    const renderedComponent = renderToString(reactComponent);
    return pageTemplate.replace('<div id="root"></div>', `<div id="root">${renderedComponent}</div>`);
};

app.get("/*", (req, res) => res.send(
    renderPage(React.createElement("div", {children: "Hello World!"})),
));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
