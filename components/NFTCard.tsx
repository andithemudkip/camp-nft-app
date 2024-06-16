import { useEffect, useState } from "react";
import { formatAddress, truncateText } from "../utils/text";

const NFTCard = ({ tokenID, owner, tokenURI }: any) => {
  const [name, setName] = useState("NFT");
  const [description, setDescription] = useState(
    "This is an NFT yes it sure is an NFT alright."
  );
  const [imageWidth, setImageWidth] = useState(100);
  const [imageHeight, setImageHeight] = useState(100);
  useEffect(() => {
    // fetch(tokenURI)
    // .then(response => response.json())
    // .then(data => {
    //     setName(data.name);
    //     setDescription(data.description);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
    setImageWidth(Math.floor(Math.random() * 100) + 200);
    setImageHeight(Math.floor(Math.random() * 100) + 200);
    console.log(imageWidth, imageHeight);
  }, [tokenURI]);
  return (
    <div className="border-2 border-zinc-800 rounded-xl p-0 max-w-60 duration-200 ease-in-out bg-black">
      <div className="overflow-hidden rounded-lg inline-block">
        <img
          className="brightness-90 hover:brightness-100 blur-none absolute z-20 w-60 h-60 object-contain rounded-xl rounded-b-none transition duration-200 ease-out cursor-pointer"
          src={`https://picsum.photos/${imageWidth}/${imageHeight}`}
          alt="NFT"
        />
        <img
          className="blur-sm w-60 h-60 z-1 object-cover rounded-xl rounded-b-none opacity-20 hover:scale-105 transition duration-200 ease-out cursor-pointer"
          src={`https://picsum.photos/${imageWidth}/${imageHeight}`}
          alt="NFT"
        />
      </div>
      <div className="text-white text-lg pl-4">{truncateText(name, 20)}</div>
      <div className="pl-4 pt-0">{truncateText(description, 30)}</div>
      <div className="p-4 w-60">
        <div className="flex justify-between">
          <div className="text-gray-500">#</div>
          <div className="text-gray-400">{tokenID}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-500">@</div>
          <a href="#" className="text-gray-400 hover:text-gray-200">
            {formatAddress(owner)}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
