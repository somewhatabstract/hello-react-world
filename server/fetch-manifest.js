import http from "http";
import {URL} from "url";
import {promisify} from "util";
import fs from "fs";

const readFileAsync = promisify(fs.readFile);

let prodManifest;
export const fetchManifest = async (url) => {
        if (process.env.NODE_ENV === "production") {
            if (prodManifest != null) {
                return prodManifest;
            }
            // In production, the file list comes from the build folder
            // manifest.
            prodManifest = await readFileAsync(`${__dirname}/../client/build/asset-manifest.json`, "utf8");
            return prodManifest;
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
