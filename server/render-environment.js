import {Environments} from "render-gateway";
import http from "http";
import {URL} from "url";
import {promisify} from "util";
import fs from "fs";

const readFileAsync = promisify(fs.readFile);

const {JSDOMSixteen: {
    Environment,
    Configuration,
    FileResourceLoader,
    ResourceLoader,
}} = Environments;

const fetchManifest = (url) => {
        if (process.env.NODE_ENV === "production") {
            // In production, the file list comes from the build folder
            // manifest.
            return readFileAsync(`${__dirname}/../client/build/asset-manifest.json`, "utf8")
        } else {
            // In development, we request the manifest from the client server
            // which we can also pretend is our CDN.
            const base = new URL(url).origin;
            const manifestUrl = `${base}/asset-manifest.json`;
            return new Promise((resolve, reject) => {
                http.get(manifestUrl, (resp) => {
                    let data = '';

                    // A chunk of data has been received.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        resolve(data);
                    });
            }).on("error", (err) => {
                reject(err);
            });
        });
    }
};

// TODO: Move the server side rendering work to the client code
//       This needs to detect we're ssring by looking for __jsdom_env_register
//       on the window and acting accordingly by registering our SSR callback
//       versus render/hydrate for client-side.

export const renderEnvironment = new Environment(new Configuration(
    async (url, renderAPI) => {
        // We get the manifest by asking for the asset-manifest.json file from
        // the client server in dev, or loading it directly from disk in
        // production.
        const manifest = await fetchManifest(url);
        const {entrypoints} = JSON.parse(manifest);

        // We strip `static` off the front since that's the root of our site.
        return entrypoints.map(e => e.replace(/^\/?static\/?/g, ""));
    },
    (url, renderAPI) => {
        if (process.env.NODE_ENV === "production") {
            // We'll load from the filesystem in production.
            // In real life, this would be where we'd be downloading things
            // from the CDN, for example.
            return new FileResourceLoader("../client/build/static/");
        } else {
            // Our client dev server is going to give us all we need, so we
            // should just need a regular resource loader.
            return new ResourceLoader(renderAPI)
        }
    },
));
