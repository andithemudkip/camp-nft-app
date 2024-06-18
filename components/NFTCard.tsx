import { useEffect, useState } from "react";
import { formatAddress, truncateText } from "../utils/text";
import { getInfuraURL } from "../utils/ipfs";
import { MaterialPerson } from "./icons/Person";
import { CurlyBrackets } from "./icons/CurlyBrackets";

const NFTCard = ({ tokenID, owner, tokenURI }: any) => {
  const [name, setName] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(getInfuraURL(tokenURI).toString())
      .then((response) => response.json())
      .then((data) => {
        setName(data?.name || "NFT");
        setDescription(
          data?.description || "This is an NFT yes it sure is an NFT alright."
        );
        setImage(
          getInfuraURL(data?.image).toString() ||
            "https://picsum.photos/300/300"
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setName("NFT failed to load.");
        setDescription(":(");
        setLoading(false);
      });
  }, [tokenURI]);
  return (
    <div className="border-2 border-zinc-800 rounded-xl p-0 max-w-60 duration-200 ease-in-out bg-black">
      <div className="overflow-hidden rounded-lg inline-block">
        {image.length ? (
          <>
            <img
              className={`brightness-90 hover:brightness-100 absolute z-10 w-60 h-60 object-contain rounded-xl rounded-b-none transition duration-200 ease-out cursor-pointer`}
              src={image}
              alt="NFT"
            />
            <img
              className="blur-sm w-60 h-60 object-cover rounded-xl rounded-b-none opacity-20 cursor-pointer"
              src={image}
              alt="NFT"
            />
          </>
        ) : (
          <div className="w-60 h-60 bg-zinc-900 rounded-xl rounded-b-none opacity-20 transition duration-200 ease-out cursor-pointer ${loading ? 'animate-pulse' : ''}" />
        )}
      </div>
      <div
        className={`text-white text-lg pl-4 ${loading ? "animate-pulse" : ""}`}
      >
        {truncateText(name, 20)}
      </div>
      <div
        className={`pl-4 pt-0 text-zinc-400 ${loading ? "animate-pulse" : ""}`}
      >
        {truncateText(description, 30)}
      </div>
      <div className="p-4 w-60">
        <div className="flex justify-between">
          <div className="text-gray-500">#</div>
          <div className="text-gray-400">{tokenID}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-500">
            <MaterialPerson className="h-6 w-4" />
          </div>
          <a
            href={`https://explorer.camp-network-testnet.gelato.digital/address/${owner}`}
            className="text-gray-400 hover:text-gray-200"
            rel="noopener noreferrer"
            target="_blank"
          >
            {formatAddress(owner)}
          </a>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-500">
            <CurlyBrackets className="h-6 w-4" />
          </div>
          <a
            href={getInfuraURL(tokenURI).toString()}
            className="text-gray-400 hover:text-gray-200"
            rel="noopener noreferrer"
            target="_blank"
          >
            {truncateText(tokenURI, 16)}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
