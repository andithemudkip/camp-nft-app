import { useQuery, gql, useSubscription } from "@apollo/client";
import styles from "../styles/Home.module.css";
import NFTCard from "./NFTCard";
import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";

const QUERY = gql`
  query NFTs {
    tokens {
      tokenID
      tokenURI
      owner {
        id
      }
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription MySubscription {
    tokens {
      tokenID
      tokenURI
      owner {
        id
      }
    }
  }
`;

const NFTs = forwardRef((props, ref) => {
  const { data, loading, error, refetch } = useQuery(QUERY);

  useImperativeHandle(ref, () => ({
    refetch,
  }));

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
    <div className={styles.grid}>
      {tokens.map((token: any) => (
        <NFTCard
          key={token.tokenID}
          tokenID={token.tokenID}
          owner={token.owner.id || ""}
          tokenURI={token.tokenURI}
        />
      ))}
    </div>
  );
});

export default NFTs;
