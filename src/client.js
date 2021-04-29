import env from "react-dotenv";
import sanityClient from "@sanity/client";

export default sanityClient({
  apiVersion: "2021-04-29",
  projectId: env.SANITY_STUDIO_API_PROJECT_ID,
  dataset: "production",
  // authenticated requests can't be cached so we have to set useCdn to false
  useCdn: false,
  token: env.SANITY_STUDIO_API_TOKEN,
});
