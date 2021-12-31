import {Environments} from "render-gateway";
import {fetchManifest} from "./fetch-manifest.js";
import {getPageTemplate} from "./get-page-template.js";

const {JSDOMSixteen: {
    Environment,
    Configuration,
    FileResourceLoader,
    ResourceLoader,
}} = Environments;

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

        // We need to put the appropriate origin on these URLs.
        // In production, we're fine - but dev needs it.
        const {origin} = new URL(url);
        return entrypoints.map(e => `${origin}/${e}`);
    },
    (url, renderAPI) => {
        if (process.env.NODE_ENV === "production") {
            // We'll load from the filesystem in production.
            // In real life, this would be where we'd be downloading things
            // from the CDN, for example.
            return new FileResourceLoader("../client/build/");
        } else {
            // Our client dev server is going to give us all we need, so we
            // should just need a regular resource loader.
            return new ResourceLoader(renderAPI)
        }
    },
    async (url, files, renderAPI, vmContext) => {
        // Once the enviroment is setup, we also want to make sure we've
        // included the page template.
        const pageTemplate = await getPageTemplate(url);
        vmContext["__ssr_page_template"] = pageTemplate;
    },
));
