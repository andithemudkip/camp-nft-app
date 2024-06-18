import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import MintButton from "../components/MintButton";
import { Hero } from "../components/Hero";
import { useAccount } from "wagmi";
import NFTs from "../components/NFTGrid";
import ClientOnly from "../components/ClientOnly";
import { useRef } from "react";
import FloatingSide from "../components/FloatingSide";
import { Toaster } from "sonner";

const Home: NextPage = () => {
  const ref = useRef();
  const { isConnected } = useAccount();
  return (
    <div className={styles.container}>
      <Toaster />
      <Head>
        <title>Sparks | NFT App</title>
        <meta content="Sparks | NFT App" name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/static/favicon.ico" rel="icon" />
      </Head>
      <nav className={styles.nav}>
        {isConnected && (
          <>
            <MintButton refetch={ref.current} />
            <ClientOnly>
              <FloatingSide />
            </ClientOnly>
          </>
        )}
        <ConnectButton />
      </nav>
      {/* <FloatingSide /> */}
      <main className={styles.main}>
        <Hero />
        <div className="p-2 text-xl text-left w-full border-t-2 border-zinc-900 mb-2" />
        <ClientOnly>
          <NFTs ref={ref} />
        </ClientOnly>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/andithemudkip"
          rel="noopener noreferrer"
          target="_blank"
        >
          Github
        </a>
        <a
          href="https://andithemudkip.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Andrei Cracanau
        </a>
        <a
          href="https://twitter.com/andithemudkip"
          rel="noopener noreferrer"
          target="_blank"
        >
          Twitter
        </a>
      </footer>
    </div>
  );
};

export default Home;
