import React, { useEffect, useState } from "react";
import styles from "./Program.module.css";
import Header from "../../app/components/Header";
import Link from "next/link";
import Footer from "../../app/components/Footer";

function BandProgram() {
  const [schedule, setSchedule] = useState({});
  const [filterScene, setFilterScene] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await fetch(
          "https://sepia-bow-age.glitch.me/schedule"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch schedule");
        }
        const data = await response.json();
        setSchedule(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setError(error.message);
        setLoading(false);
      }
    }
    fetchSchedule();
  }, []);

  if (loading) {
    return <div className={styles.loadingScreen}>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const danskeUgedage = {
    mon: "Mandag",
    tue: "Tirsdag",
    wed: "Onsdag",
    thu: "Torsdag",
    fri: "Fredag",
    sat: "Lørdag",
    sun: "Søndag",
  };

  const scenes = [...new Set(Object.keys(schedule))]; //set = fjerner dubletter, laver unikke scene-navne. object.keys = henter alle keys(scenerne) fra schedule. "..."= spread operator (laver til array)
  const filteredSchedule = Object.entries(schedule) //returnerer et array af key-value pairs (scene-navn og dage+tid)

    .filter(([stage]) => stage === (filterScene || scenes[0])); //filterer scenerne, så kun den valgte scene vises. Hvis filterScene er falsy(ikke valgt), vises første scene i arrayet.

  return (
    <main className={styles.contentContainer}>
      <Header />
      <div className={styles.contentBox}>
        <h1>PROGRAM</h1>
        <div className={styles.filterBox}>
          <div>
            {scenes.map((scene) => (
              <h2 key={scene} onClick={() => setFilterScene(scene)}>
                {scene}
              </h2>
            ))}
          </div>
        </div>
        {filteredSchedule.map(([stage, days]) => (
          <div className={styles.sceneprogramBox} key={stage}>
            <div className={styles.Sceneh2}>
              <h2>{stage}</h2>
            </div>
            <div className={styles.Dayschedule}>
              {Object.entries(days).map(([day, slots]) => (
                <div className={styles.aWidth} key={day}>
                  <h3>{danskeUgedage[day]}</h3>
                  {slots
                    .filter((slot) => slot.act !== "break")
                    .map((slot, i) => (
                      <Link
                        className={styles.linkA}
                        href={`/bands/${encodeURIComponent(
                          slot.act.includes("-")
                            ? slot.act.replace(/[,\s]+/g, "") // If band name contains "-", remove spaces and commas (hjælp af ChatGPT)
                            : slot.act.replace(/\s+/g, "-") // Otherwise, replace spaces with "-" (hjælp af ChatGPT)
                        )
                          .replace("%2C", "")
                          .toLowerCase()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                      >
                        <div className={styles.Bandtid}>
                          <p>
                            {slot.start} - {slot.end}
                          </p>{" "}
                          <p>{slot.act}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          </div>
        ))}
        <Link href="/billetter">
          <button type="submit" className={styles.billetBtn}>
            Gå til billetter
          </button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}

export default BandProgram;
