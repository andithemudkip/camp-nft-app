const getInfuraURL = (url: String): String =>
  `https://camp.infura-ipfs.io/ipfs/${url.replace("ipfs://", "")}`;
export { getInfuraURL };
