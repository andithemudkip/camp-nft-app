import { useEffect, useState } from "react";
import { ArrowDown } from "./icons/ArrowDown";
import * as Popover from "@radix-ui/react-popover";
import styles from "../styles/Collection.module.css";
import { getInfuraURL } from "../utils/ipfs";
import { formatAddress, truncateText } from "../utils/text";

const CollectibleItem = ({ tokenID, owner, tokenURI }: any) => {
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
          data?.description || "This is an NFT yes it sure is an NFT alright.",
        );
        setImage(
          getInfuraURL(data?.image).toString() ||
            "https://picsum.photos/300/300",
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
    <div className="rounded-md p-0 duration-200 ease-in-out bg-black/80">
      <div className="flex">
        <div className="overflow-hidden rounded-lg inline-block">
          {image.length ? (
            <>
              <img
                className={`brightness-90 hover:brightness-100 blur-none absolute z-15 w-20 h-20 object-contain rounded-xl rounded-b-none transition duration-200 ease-out cursor-pointer`}
                src={image}
                alt="NFT"
              />
              <img
                className="blur-sm w-30 h-30 z-1 object-cover rounded-xl rounded-b-none opacity-20 hover:scale-105 transition duration-200 ease-out cursor-pointer"
                src={image}
                alt="NFT"
              />
            </>
          ) : (
            <div className="w-28 h-28 bg-zinc-900 rounded-xl rounded-b-none opacity-20 transition duration-200 ease-out cursor-pointer ${loading ? 'animate-pulse' : ''}" />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center align-center">
          <div
            className={`text-white text-lg pl-4 ${
              loading ? "animate-pulse" : ""
            }`}
          >
            {truncateText(name, 18)}
          </div>
          <div className="pl-4 pr-4 flex-0">
            <div className="flex justify-between">
              <div className="text-gray-500">#</div>
              <div className="text-gray-400">{tokenID}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">@</div>
              <a
                href={`https://explorer.camp-network-testnet.gelato.digital/address/${owner}`}
                className="text-gray-400 hover:text-gray-200"
              >
                {formatAddress(owner)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FloatingSide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          onClick={handleToggle}
          className="transition duration-200 ease-out bg-zinc-900 border-2 border-transparent hover:border-zinc-800 border-transparent hover:bg-black text-zinc-300 hover:text-white font-bold py-1 px-3 text-sm md:text-base rounded-xl"
          aria-label="Update dimensions"
        >
          My Collection
          <ArrowDown
            className={`inline-block w-5 h-5 ml-2 -mr-1 duration-200 origin-center ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.PopoverContent} sideOffset={5}>
          <div className="flex flex-col gap-2">
            <CollectibleItem
              tokenID={1}
              owner="0x1234567890abcdef1234567890abcdef12345678"
              tokenURI="ipfs://QmXJ9Z ... 6z"
            />
            <CollectibleItem
              tokenID={1}
              owner="0x1234567890abcdef1234567890abcdef12345678"
              tokenURI="ipfs://QmXJ9Z ... 6z"
            />
            <CollectibleItem
              tokenID={1}
              owner="0x1234567890abcdef1234567890abcdef12345678"
              tokenURI="ipfs://QmXJ9Z ... 6z"
            />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FloatingSide;
