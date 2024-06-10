import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Allbands.module.css";
import Header from "../../app/components/Header";
import Footer from "@/app/components/Footer";

function AllBands() {
  const [bandInfo, setBandInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBandInfo = async () => {
      try {
        const response = await fetch("https://sepia-bow-age.glitch.me/bands/");
        if (!response.ok) {
          throw new Error(`Fetch error: ${response.statusText}`);
        }
        const data = await response.json();
        setBandInfo(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBandInfo();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Fejl ved loading af band information {error.message}</p>;

  return (
    <main className={styles.contentContainer}>
      <Header />
      <div className={styles.contentBox}>
        <h1 className={styles.title}>BANDS</h1>
        <div className={styles.bandBox}>
          {bandInfo &&
            bandInfo.map((band) => (
              <Link
                className={styles.linkA}
                key={band.slug}
                href={`/bands/${band.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.imgBox}>
                  <Image
                    src={`/logos/${band.logo}`}
                    alt={band.name}
                    width={200}
                    height={200}
                  />
                </div>
                <h2>{band.name}</h2>
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default AllBands;
