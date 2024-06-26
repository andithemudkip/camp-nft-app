import React, { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FileUploader } from "react-drag-drop-files";
import { ACCEPTED_FILE_TYPES, NFT_CONTRACT_ADDRESS } from "../constants";
import NFTContract from "../contracts/CampNFT.json";
import { uploadMetadata } from "../utils/create";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { truncateText } from "../utils/text";
import styles from "../styles/Mint.module.css";
import { toast } from "sonner";

const MintButton = (props: any) => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { data: hash, isPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
  const { address } = useAccount();

  const handleClear = () => {
    setOpen(false);
    setFile(null);
    setName("");
    setDescription("");
    setLoading(false);
  };

  const handleChange = (file: any) => {
    setFile(file);
    console.log(file);
  };
  const handleNameInput = (e: any) => {
    setName(e.target.value);
  };

  const handleDescriptionInput = (e: any) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (hash) {
      console.log(hash);
      setLoading(false);
    }
  }, [hash]);

  useEffect(() => {
    if (error) {
      console.error(error);
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (isConfirmed) {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          handleClear();
          props.refetch?.refetch();
          resolve(null);
        }, 3000);
      });
      toast.promise(promise, {
        loading: "Transaction confirmed. Closing modal in 3 seconds...",
        success: "Success!",
        error: "Error sending transaction. Please try again.",
      });
    }
  }, [isConfirmed]);

  const handleMint = async () => {
    if (!file) {
      // alert("Please select an image.");
      toast.info("Please select an image.");
      return;
    }
    if (!name) {
      // alert("Please enter a name.");
      toast.info("Please enter a name.");
      return;
    }
    if (!description) {
      // alert("Please enter a description.");
      toast.info("Please enter a description.");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const meta = await uploadMetadata({
        file,
        name,
        description,
      });

      writeContract({
        abi: NFTContract,
        address: NFT_CONTRACT_ADDRESS,
        functionName: "safeMint",
        args: [address, meta],
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="transition duration-200 ease-out bg-orange-500 border-2 hover:border-zinc-800 border-transparent hover:bg-black text-white font-bold py-1 px-3 text-sm md:text-base rounded-xl">
          Mint your own NFT
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>
            Create collectible
          </Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}>
            Fill in the details below to create your collectible.
          </Dialog.Description>
          <div className="flex flex-row items-end justify-between gap-4">
            <div className="flex-1">
              <fieldset className={styles.Fieldset}>
                <label className={styles.Label} htmlFor="name" aria-required>
                  Name
                </label>
                <input
                  className={styles.Input}
                  id="name"
                  placeholder="My NFT"
                  value={name}
                  onChange={handleNameInput}
                />
              </fieldset>
              <fieldset className={styles.Fieldset}>
                <label className={styles.Label}>Description</label>
                <textarea
                  className={styles.Textarea}
                  id="description"
                  placeholder="This is an NFT."
                  value={description}
                  onChange={handleDescriptionInput}
                />
              </fieldset>
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={ACCEPTED_FILE_TYPES}
                classes="drop-area"
                required
              />
            </div>
            <div className="self-center">
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="h-40 w-40 object-cover rounded"
                />
              ) : (
                <div className="h-40 w-40 bg-zinc-900 rounded">
                  <p className="text-zinc-400 text-center pt-16">
                    Image preview
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex justify-between items-end mt-3">
            <div className="text-sm text-zinc-500">
              {hash && (
                <a
                  className="hover:underline hover:text-zinc-400"
                  href={`https://explorer.camp-network-testnet.gelato.digital/address/${hash}`}
                >
                  Transaction hash: {truncateText(hash || "", 20)}
                </a>
              )}
              {isConfirming ? (
                <div>Waiting for confirmation...</div>
              ) : isConfirmed ? (
                <div>Transaction confirmed! Closing modal in 3 seconds...</div>
              ) : null}
            </div>
            <button
              className={styles.MintButton}
              onClick={handleMint}
              disabled={loading}
            >
              {(loading || isPending) && !isConfirmed ? "Loading" : "Mint"}
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className={styles.IconButton}
              aria-label="Close"
              onClick={handleClear}
            >
              x
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MintButton;
