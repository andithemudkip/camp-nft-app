import { useEffect, useState } from "react";
import { formatAddress, truncateText } from "../utils/text";
import { getInfuraURL } from "../utils/ipfs";

const NFTCard = ({ tokenID, owner, tokenURI }: any) => {
  const [name, setName] = useState('Loading...');
  const [description, setDescription] = useState('Loading...');
  const [image, setImage] = useState('');
  // const [imageWidth, setImageWidth] = useState(100);
  // const [imageHeight, setImageHeight] = useState(100);
  useEffect(() => {
    fetch (getInfuraURL(tokenURI).toString ())
    .then(response => response.json())
    .then(data => {
      console.log (data);
        setName(data?.name || "NFT");
        setDescription(data?.description || "This is an NFT yes it sure is an NFT alright.");
        setImage(getInfuraURL(data?.image).toString () || "https://picsum.photos/300/300");
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // setImageWidth(Math.floor(Math.random() * 100) + 200);
    // setImageHeight(Math.floor(Math.random() * 100) + 200);
    // console.log(imageWidth, imageHeight);
  }, [tokenURI]);
  return (
    <div className="border-2 border-zinc-800 rounded-xl p-0 max-w-60 duration-200 ease-in-out bg-black">
      <div className="overflow-hidden rounded-lg inline-block">
        {image.length ? (
          <>
            <img
              className="brightness-90 hover:brightness-100 blur-none absolute z-20 w-60 h-60 object-contain rounded-xl rounded-b-none transition duration-200 ease-out cursor-pointer"
              src={image}
              alt="NFT"
            />
            <img
              className="blur-sm w-60 h-60 z-1 object-cover rounded-xl rounded-b-none opacity-20 hover:scale-105 transition duration-200 ease-out cursor-pointer"
              src={image}
              alt="NFT"
            />
          </>
        ): (
          <div className="w-60 h-60 bg-zinc-900 rounded-xl rounded-b-none opacity-20 transition duration-200 ease-out cursor-pointer"/>
        )}
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
