const fs = require("fs");

export const getPageTemplate = () => {
    if (process.env.NODE_ENV === "production") {
        return fs.readFileSync("../client/build/index.html").toString();
    }
    return fs.readFileSync("../client/public/index.html").toString();
};
