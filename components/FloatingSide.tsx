import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { ArrowDown } from "./icons/ArrowDown";
import * as Popover from "@radix-ui/react-popover";
import styles from "../styles/Collection.module.css";
import { getInfuraURL } from "../utils/ipfs";
import { formatAddress, truncateText } from "../utils/text";
import { useAccount } from "wagmi";

const QUERY = gql`
  query MyQuery($id: ID = "") {
    tokens(where: { owner_: { id: $id } }) {
      tokenURI
      tokenID
    }
  }
`;

const CollectibleItem = ({ tokenID, owner, tokenURI }: any) => {
  const [name, setName] = useState("Loading...");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(getInfuraURL(tokenURI).toString())
      .then((response) => response.json())
      .then((data) => {
        setName(data?.name || "NFT");
        setImage(
          getInfuraURL(data?.image).toString() ||
            "https://picsum.photos/300/300"
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setName("NFT failed to load.");
        setLoading(false);
      });
  }, [tokenURI]);
  return (
    <div className="rounded-md p-0 duration-200 ease-in-out bg-black/80 overflow-hidden">
      <div className="flex">
        <div className="overflow-hidden inline-block">
          {image.length ? (
            <>
              <img
                className={`brightness-90 hover:brightness-100 blur-none z-15 w-20 h-20 object-cover transition duration-200 ease-out cursor-pointer`}
                src={image}
                alt="NFT"
              />
            </>
          ) : (
            <div className="w-28 h-28 bg-zinc-900 opacity-20 transition duration-200 ease-out cursor-pointer ${loading ? 'animate-pulse' : ''}" />
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
  const { address } = useAccount();
  const { data, loading, error, refetch } = useQuery(QUERY, {
    variables: {
      id: address.toLowerCase(),
    },
  });
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const tokens = data.tokens
    .map((token: any) => ({ ...token, tokenID: Number(token.tokenID) }))
    .sort((a: any, b: any) => b.tokenID - a.tokenID);
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
            {tokens.map((token: any) => (
              <CollectibleItem
                key={token.tokenID}
                tokenID={token.tokenID}
                owner={address}
                tokenURI={token.tokenURI}
              />
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FloatingSide;
