import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../app/components/Header";
import styles from "./Confirmation.module.css";

function Confirmation() {
  const router = useRouter();
  const {
    regularTickets = "0",
    vipTickets = "0",
    selectedSpot = "",
    greenCamping = "false",
    twoPersonTent = "0",
    threePersonTent = "0",
    formData = "[]",
    reservationId = "",
  } = router.query;

  const parsedFormData = JSON.parse(formData);

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const regularTicketPrice = 799;
    const vipTicketPrice = 1299;
    const twoPersonTentPrice = 299;
    const threePersonTentPrice = 399;
    const greenCampingPrice = greenCamping === "true" ? 249 : 0;
    const bookingFee = 99;

    const total =
      regularTickets * regularTicketPrice +
      vipTickets * vipTicketPrice +
      twoPersonTent * twoPersonTentPrice +
      threePersonTent * threePersonTentPrice +
      greenCampingPrice +
      bookingFee;

    setTotalCost(total);
  }, [
    regularTickets,
    vipTickets,
    greenCamping,
    twoPersonTent,
    threePersonTent,
  ]);

  const handleProceed = async () => {
    if (!reservationId) {
      alert("Fejl ved reservation.");
      return;
    }

    try {
      const response = await fetch(
        "https://sepia-bow-age.glitch.me/fullfill-reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: reservationId,
          }),
        }
      );

      if (response.ok) {
        console.log("Reservation confirmed");
        router.push("/checkout");
      } else {
        console.error("Failed reservation");
      }
    } catch (error) {
      console.error("Error reservation:", error);
    }
  };

  const regularTicketPrice = 799;
  const vipTicketPrice = 1299;
  const twoPersonTentPrice = 299;
  const threePersonTentPrice = 399;
  const greenCampingPrice = greenCamping === "true" ? 249 : 0;
  const bookingFee = 99;

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.contentBox}>
        <div className={styles.orderBox}>
          <h2>Din bestilling</h2>
          <div className={styles.orderDetails}>
            <div className={styles.orderItem}>
              <span className={styles.text}>Normal Billet:</span>
              <span className={styles.value}>
                {regularTickets} x {regularTicketPrice} kr ={" "}
                {regularTickets * regularTicketPrice} kr
              </span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.text}>VIP Billet:</span>
              <span className={styles.value}>
                {vipTickets} x {vipTicketPrice} kr ={" "}
                {vipTickets * vipTicketPrice} kr
              </span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.text}>Område:</span>
              <span className={styles.value}>{selectedSpot}</span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.text}>Grøn Camping:</span>
              <span className={styles.value}>
                {greenCamping === "true" ? `${greenCampingPrice} kr` : "No"}
              </span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.text}>2 Pers. Telt:</span>
              <span className={styles.value}>
                {twoPersonTent} x {twoPersonTentPrice} kr ={" "}
                {twoPersonTent * twoPersonTentPrice} kr
              </span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.text}>3 Pers. Telt:</span>
              <span className={styles.value}>
                {threePersonTent} x {threePersonTentPrice} kr ={" "}
                {threePersonTent * threePersonTentPrice} kr
              </span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.text}>Booking Gebyr:</span>
              <span className={styles.value}>{bookingFee} kr</span>
            </div>
            <div className={styles.orderItem}>
              <span className={styles.text}>Total:</span>
              <span className={`${styles.value} ${styles.total}`}>
                {totalCost} kr
              </span>
            </div>
          </div>
        </div>
        {parsedFormData.map((data, index) => (
          <div className={styles.orderBox} key={index}>
            <h3>Billet {index + 1}:</h3>
            <p>
              Fornavn: <span>{data.firstName}</span>
            </p>
            <p>
              Efternavn: <span>{data.lastName}</span>
            </p>
            <p>
              Email: <span>{data.email}</span>
            </p>
            <p>
              Mobil: <span>{data.phone}</span>
            </p>
          </div>
        ))}
        <div className={styles.btnBox}>
          <button className={styles.approveButton} onClick={handleProceed}>
            GODKEND
          </button>
        </div>
      </div>
    </main>
  );
}

export default Confirmation;
