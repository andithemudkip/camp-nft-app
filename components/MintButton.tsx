import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
const MintButton = () => {
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
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
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
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
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
