import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Bandname.module.css";
import Header from "../../app/components/Header";
import Footer from "../../app/components/Footer";

function BandPage() {
  const router = useRouter();
  const { bandName } = router.query;
  const [bandInfo, setBandInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (bandName) {
      async function fetchBandInfo() {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://sepia-bow-age.glitch.me/bands/${encodeURIComponent(
              bandName.replace(/ /g, "-").toLowerCase() // Igen hjælp af ChatGPT, havde nogle mærkelige tegn i URL'en
            )}`
          );
          if (!response.ok) {
            throw new Error("Failed fetch");
          }
          const text = await response.text();
          if (!text) {
            throw new Error("empty response");
          }
          const data = JSON.parse(text);
          setBandInfo(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching band information:", error);
          setError(error.message);
          setIsLoading(false);
        }
      }
      fetchBandInfo();
    }
  }, [bandName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!bandInfo) {
    return <div>No band information available.</div>;
  }

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.contentBox}>
        <div className={styles.leftContent}>
          <h1>{bandInfo.name}</h1>
          <div className={styles.logoContainer}>
            <Image
              src={`/logos/${bandInfo.logo}`}
              alt={bandInfo.name}
              width={200}
              height={200}
            />
          </div>
          <p>Members: {bandInfo.members.join(", ")}</p>
          <p>Genre: {bandInfo.genre}</p>
        </div>
        <div className={styles.rightContent}>
          <p>{bandInfo.bio}</p>
        </div>
      </div>
    </main>
  );
}

export default BandPage;
