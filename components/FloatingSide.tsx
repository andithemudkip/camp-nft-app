import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { ArrowDown } from "./icons/ArrowDown";
import * as Popover from "@radix-ui/react-popover";
import styles from "../styles/Collection.module.css";
import { getInfuraURL } from "../utils/ipfs";
import { formatAddress, truncateText } from "../utils/text";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import NFTContract from "../contracts/CampNFT.json";
import { NFT_CONTRACT_ADDRESS } from "../constants";
import { toast } from "sonner";

const QUERY = gql`
  query MyQuery($id: ID = "") {
    tokens(where: { owner_: { id: $id } }) {
      tokenURI
      tokenID
    }
  }
`;

const CollectibleItem = ({ tokenID, owner, tokenURI, refetch }: any) => {
  const [name, setName] = useState("Loading...");
  const [description, setDescription] = useState("Loading...");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [transferRecipient, setTransferRecipient] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);

  const { data: hash, isPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    fetch(getInfuraURL(tokenURI).toString())
      .then((response) => response.json())
      .then((data) => {
        setName(data?.name || "NFT");
        setDescription(data?.description || "No description.");
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

  useEffect(() => {
    if (hash) {
      // console.log(hash);
      toast.info(`Transaction sent. Waiting for confirmation...`);
    }
  }, [hash]);

  useEffect(() => {
    if (error) {
      console.error(error);
      setTransferLoading(false);
      toast.error("Error sending transaction. Please try again.");
    }
  }, [error]);

  useEffect(() => {
    if (isConfirmed) {
      setTimeout(() => {
        setTransferLoading(false);
        refetch();
        toast.success("Transaction confirmed!");
      }, 3000);
    }
  }, [isConfirmed]);

  const handleTransfer = () => {
    if (!transferRecipient) {
      toast("Please enter a recipient address.");
      return;
    }
    if (transferLoading) {
      return;
    }
    setTransferLoading(true);

    writeContract({
      abi: NFTContract,
      address: NFT_CONTRACT_ADDRESS,
      functionName: "safeTransferFrom",
      args: [owner, transferRecipient, tokenID],
    });

    console.log("Transfer to ", transferRecipient);
  };

  const handleTransferRecipientChange = (e: any) => {
    setTransferRecipient(e.target.value);
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="rounded-md p-0 duration-200 ease-in-out bg-black/80 overflow-hidden">
      <div onClick={handleOpen} className="flex cursor-pointer">
        <div className="overflow-hidden inline-block">
          {image.length ? (
            <>
              <img
                className={`brightness-90 hover:brightness-100 blur-none z-15 w-14 h-14 object-cover transition duration-200 ease-out cursor-pointer`}
                src={image}
                alt="NFT"
              />
            </>
          ) : (
            <div className="w-14 h-14 bg-zinc-900 opacity-20 transition duration-200 ease-out cursor-pointer ${loading ? 'animate-pulse' : ''}" />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between">
          {/* name and # */}
          <div className="flex items-center justify-between pr-3 pt-1">
            <div
              className={`text-white text-lg pl-4 flex items-center ${
                loading ? "animate-pulse" : ""
              }`}
            >
              <span>{truncateText(name, 12)}</span>
            </div>
            <div className="flex flex-row items-center">
              <div className="text-gray-500">#</div>
              <div className="text-gray-400">{tokenID}</div>
            </div>
          </div>
          <div className="flex items-center justify-center pb-2 text-zinc-500 hover:text-zinc-400">
            <ArrowDown className={`duration-200 ${open ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>
      <div
        className={`duration-200 ease-in-out ${open ? "max-h-80" : "max-h-0"}`}
      >
        <div className="p-2">
          <div className="text-sm text-zinc-300">Description</div>
          <div className="text-zinc-400 text-sm">{description}</div>
          <div className="text-sm text-zinc-300 mt-2">Actions</div>
          {/* Transfer to... */}
          <div className="flex gap-2 mt-1">
            <input
              className="bg-white/5 text-zinc-400 pl-3 rounded-md flex-0 min-w-0"
              type="text"
              placeholder="Transfer to..."
              value={transferRecipient}
              onChange={handleTransferRecipientChange}
              disabled={transferLoading}
            />
            <button
              disabled={transferLoading}
              onClick={handleTransfer}
              className={`min-w-24 flex-1 p-2 bg-white/5 text-zinc-400 border-2 border-white/10 hover:border-white/20 rounded-md hover:text-zinc-300 ${transferLoading ? "animate-pulse" : ""}`}
            >
              {transferLoading ? "Sending..." : "Transfer"}
            </button>
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
      id: address?.toLowerCase() || "",
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
            {tokens.length === 0 && (
              <div className="text-zinc-400 text-center">
                No collectibles found.
              </div>
            )}
            {tokens.map((token: any) => (
              <CollectibleItem
                key={token.tokenID}
                tokenID={token.tokenID}
                owner={address}
                tokenURI={token.tokenURI}
                refetch={refetch}
              />
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FloatingSide;
