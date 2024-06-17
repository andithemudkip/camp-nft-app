import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import MintButton from "../components/MintButton";
import { Hero } from "../components/Hero";
import NFTCard from "../components/NFTCard";
import { useAccount } from "wagmi";



const Home: NextPage = () => {
  const { isConnected } = useAccount();
  return (
    <div className={styles.container}>
      <Head>
        <title>Camp NFT App</title>
        <meta content="Camp NFT App | Sparks" name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <nav className={styles.nav}>
        {isConnected && <MintButton /> }
        <ConnectButton />
      </nav>
      <main className={styles.main}>
        <Hero />
        <div className="p-2 text-xl text-left w-full border-t-2 border-zinc-900 mb-2" />
        {/* <MintButton/> */}
        <div className={styles.grid}>
          <NFTCard
            tokenID={52323}
            owner={"0x5Cb5D140FbdFA59563e6bdc966d97296b0b61653"}
            tokenURI={"yes"}
          />
          <NFTCard
            tokenID={52323}
            owner={"0x5Cb5D140FbdFA59563e6bdc966d97296b0b61653"}
            tokenURI={"yes"}
          />
          <NFTCard
            tokenID={52323}
            owner={"0x5Cb5D140FbdFA59563e6bdc966d97296b0b61653"}
            tokenURI={"yes"}
          />
          <NFTCard
            tokenID={52323}
            owner={"0x5Cb5D140FbdFA59563e6bdc966d97296b0b61653"}
            tokenURI={"yes"}
          />
          <NFTCard
            tokenID={52323}
            owner={"0x5Cb5D140FbdFA59563e6bdc966d97296b0b61653"}
            tokenURI={"yes"}
          />
          <NFTCard
            tokenID={52323}
            owner={"0x5Cb5D140FbdFA59563e6bdc966d97296b0b61653"}
            tokenURI={"yes"}
          />
          <NFTCard
            tokenID={52323}
            owner={"0x5Cb5D140FbdFA59563e6bdc966d97296b0b61653"}
            tokenURI={"yes"}
          />
          <NFTCard
            tokenID={52323}
            owner={"0x5Cb5D140FbdFA59563e6bdc966d97296b0b61653"}
            tokenURI={"yes"}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://andithemudkip.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Andrei Cracanau
        </a>
      </footer>
    </div>
  );
};

export default Home;
