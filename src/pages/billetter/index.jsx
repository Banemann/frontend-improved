import React, { useState, useEffect } from "react";
import styles from "./Billetter.module.css";
import Header from "../../app/components/Header";
import { useRouter } from "next/router";

function Booking() {
  const [regularTicketCount, setRegularTicketCount] = useState(0);
  const [vipTicketCount, setVipTicketCount] = useState(0);
  const [availableSpots, setAvailableSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState("");
  const [greenCamping, setGreenCamping] = useState(false);
  const [tents, setTents] = useState({ twoPerson: 0, threePerson: 0 });
  const router = useRouter();
  const [selectedSpotIndex, setSelectedSpotIndex] = useState(null);

  useEffect(() => {
    const fetchAvailableSpots = async () => {
      try {
        const response = await fetch(
          "https://sepia-bow-age.glitch.me/available-spots",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setAvailableSpots(data);
      } catch (error) {
        console.error("Error fetching available spots:", error);
      }
    };
    fetchAvailableSpots();
  }, []);

  const handleRegularTicketChange = (e) => {
    setRegularTicketCount(Number(e.target.value));
  };

  const handleVipTicketChange = (e) => {
    setVipTicketCount(Number(e.target.value));
  };

  const handleGreenCampingChange = (e) => {
    setGreenCamping(e.target.checked);
  };

  const handleTentChange = (e) => {
    const { name, value } = e.target;
    setTents((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSpotChange = (index) => {
    setSelectedSpotIndex(index);
    setSelectedSpot(availableSpots[index].area);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalTickets = regularTicketCount + vipTicketCount;
    const totalTentCapacity = tents.twoPerson * 2 + tents.threePerson * 3;

    if (totalTickets === 0) {
      alert("Husk at vælge billet");
      return;
    }

    if (selectedSpot === "") {
      alert("Husk at vælge camping område");
      return;
    }

    if (totalTentCapacity > 0 && totalTickets > totalTentCapacity) {
      alert("Manglende telt-plads.");
      return;
    }

    // const selectedSpotData = availableSpots[selectedSpotIndex]; if (selectedSpotData && totalTickets > selectedSpotData.available) { alert("Ikke nok pladser til rådighed"); return; }
     
     
   
   

    if (selectedSpot) {
      try {
        const response = await fetch(
          "https://sepia-bow-age.glitch.me/reserve-spot",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              area: selectedSpot,
              amount: totalTickets,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Reservation ID:", data.id);

          router.push({
            pathname: "/personalinfo",
            query: {
              regularTickets: regularTicketCount,
              vipTickets: vipTicketCount,
              selectedSpot: selectedSpot,
              greenCamping: greenCamping,
              twoPersonTent: tents.twoPerson,
              threePersonTent: tents.threePerson,
              reservationId: data.id,
            },
          });
        } else {
          console.error("Failed to reserve spot");
        }
      } catch (error) {
        console.error("Error reserving spot:", error);
      }
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      <form className={styles.formBox} onSubmit={handleSubmit}>
        <h1>BILLETTER</h1>

        <div className={styles.cardBox}>
          <div className={styles.ticketCard}>
            <h2>Normal Billet</h2>
            <h3>799 kr</h3>
            <input
              className={styles.ticketCounter}
              type="number"
              id="regularTicketCount"
              name="regularTicketCount"
              value={regularTicketCount}
              onChange={handleRegularTicketChange}
              min="0"
            />
          </div>

          <div className={styles.ticketCard}>
            <h2>VIP Billet</h2>
            <h3>1299 kr</h3>
            <input
              className={styles.ticketCounter}
              type="number"
              id="vipTicketCount"
              name="vipTicketCount"
              value={vipTicketCount}
              onChange={handleVipTicketChange}
              min="0"
            />
          </div>
        </div>

        <div className={styles.campingOptions}>
          <h2>Camping område</h2>
          <div className={styles.campingAreabox}>
            {availableSpots.map((spot, index) => (
              <label
                key={spot.area}
                className={`${styles.campingAreaBtn} ${
                  selectedSpotIndex === index ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  name="selectedSpot"
                  value={spot.area}
                  checked={selectedSpot === spot.area}
                  onChange={() => handleSpotChange(index)}
                  style={{ display: "none" }}
                />
                {spot.area}
                <p className={styles.spotsLeft}>
                  {spot.available < 15 ? `(${spot.available} pladser)` : null}
                </p>
              </label>
            ))}
          </div>
          <h2>Camping Muligheder</h2>
          <label className={styles.greenCampingBox}>
            Grøn Camping (249,-){" "}
            <input
              type="checkbox"
              name="greenCamping"
              checked={greenCamping}
              onChange={handleGreenCampingChange}
            />
          </label>

          <h2>Telt (Inkl. Opsætning)</h2>
          <div className={styles.campingOptionsBox}>
            <div className={styles.campingTelt}>
              <label>
                <p>2 Personers Telt (299,-)</p>
                <input
                  type="number"
                  name="twoPerson"
                  value={tents.twoPerson}
                  onChange={handleTentChange}
                  min="0"
                />
              </label>
            </div>
            <div className={styles.campingTelt}>
              <label>
                <p>3 Personers Telt (399,-)</p>
                <input
                  type="number"
                  name="threePerson"
                  value={tents.threePerson}
                  onChange={handleTentChange}
                  min="0"
                />
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.nextBtn}>
          Næste
        </button>
      </form>
    </main>
  );
}

export default Booking;
