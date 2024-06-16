import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

const MintButton = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="transition duration-200 ease-out bg-orange-500 border-2 hover:border-white border-transparent hover:bg-black text-white font-bold py-1 px-2 mr-5 text-sm md:text-base rounded-xl">
          Mint your own NFT
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Create collectible
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Fill in the details below to create your collectible.
          </Dialog.Description>
          <div className="flex flex-row items-end justify-between gap-4">
            <div className="flex-1">
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="name" aria-required>
                  Name
                </label>
                <input className="Input" id="name" placeholder="My NFT" />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label">Description</label>
                <textarea
                  className="Textarea"
                  id="description"
                  placeholder="This is an NFT."
                />
              </fieldset>
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
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

          <div className="w-full flex justify-end items-end mt-3">
            <Dialog.Close asChild>
              <button className="Button green">Mint</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              x
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MintButton;
