export const NFT_CONTRACT_ADDRESS =
  "0xBd917d0822CCbbFb8A44e803ac3bA191c9791Acf";
export const DEV_BACKEND_URL = "http://localhost:8000";
export const PROD_BACKEND_URL =
  "https://camp-nft-backend-production.up.railway.app";
export const GRAPHQL_URL =
  "https://camp.andithemudkip.com/subgraphs/name/camp-nft-app";
export const WS_GRAPHQL_URL =
  "wss://camp.andithemudkip.com/subgraphs/name/camp-nft-app";
export const ACCEPTED_FILE_TYPES = ["JPG", "JPEG", "PNG", "GIF"];
export const inDevEnvironment =
  !!process && process.env.NODE_ENV === "development";
export const BACKEND_URL = inDevEnvironment
  ? DEV_BACKEND_URL
  : PROD_BACKEND_URL;
