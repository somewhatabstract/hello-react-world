const fs = require("fs");
const http = require("http");
const {promisify} = require("util");
const readFileAsync = promisify(fs.readFile);

let prodPageTemplate;
export const getPageTemplate = async () => {
    if (process.env.NODE_ENV === "production") {
        if (prodPageTemplate != null) {
            return prodPageTemplate;
        }
        /**
         * Production is easy. We'll load the template from disk.
         * We'll also cache it for future calls.
         */
        prodPageTemplate = (await readFileAsync(`${__dirname}/../client/build/index.html`, "utf8")).toString();
        return prodPageTemplate;
    } else {
        /**
         * In development, we'll load the template from the client server.
         * We don't cache because we want to reload the template on each request
         * in case it changed.
         */
        return await new Promise((resolve, reject) => {
            http.get("http://localhost:3000/index.html", resp => {
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
