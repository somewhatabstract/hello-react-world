import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

if (typeof window !== "undefined" && typeof window["__jsdom_env_register"] === "function") {
    console.log("SERVER-SIDE RENDERING");
    const renderPage = async (pageTemplate, reactComponent) => {
        const {renderToString} = await import("react-dom/server");
        const renderedComponent = renderToString(reactComponent);
        return pageTemplate.replace('<div id="root"></div>', `<div id="root">${renderedComponent}</div>`);
    };

    // We are server-side rendering in the render gateway.
    // We need to register our SSR callback.
    window["__jsdom_env_register"](async () => {
        // 1. We need to grab our page template which the render server should
        //    have downloaded for us.
        const pageTemplate = window["__ssr_page_template"];

        // 2. We need to render our component.
        const body = await renderPage(pageTemplate, <App ssrLocation={window.location} />);

        // 3. Return a result.
        return {
            body,
            status: 200,
            headers: {
                "Content-Type": "text/html",
            },
        };
    });
} else {
    // We're client-side.
    const mountElement = document.getElementById('root');
    console.log(`CLIENT-SIDE ${mountElement.childElementCount === 0 ? "RENDERING" : "HYDRATING"}`);
    const reactMountFn = (mountElement.childElementCount === 0)
        ? ReactDOM.render
        : ReactDOM.hydrate;

    reactMountFn(<App />, mountElement);
}
