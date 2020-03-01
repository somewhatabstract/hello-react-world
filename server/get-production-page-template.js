const fs = require("fs");

let productionTemplate;
export const getProductionPageTemplate = () => {
    if (!productionTemplate) {
        productionTemplate = fs.readFileSync("../client/build/index.html").toString();
    }
    return productionTemplate;
};
