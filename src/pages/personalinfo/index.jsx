import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Personalinfo.module.css";
import Header from "../../app/components/Header";

function PersonalInfo() {
  const router = useRouter();
  const {
    regularTickets = "0",
    vipTickets = "0",
    selectedSpot = "",
    greenCamping = "false",
    twoPersonTent = "0",
    threePersonTent = "0",
    reservationId = "",
  } = router.query;
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const totalRegularTickets = parseInt(regularTickets, 10);
    const totalVipTickets = parseInt(vipTickets, 10);

    if (totalRegularTickets > 0 || totalVipTickets > 0) {
      const totalTickets = totalRegularTickets + totalVipTickets;
      setFormData(
        Array.from({ length: totalTickets }, () => ({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        }))
      );
    }
  }, [regularTickets, vipTickets]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev.map((data, i) => (i === index ? { ...data, [name]: value } : data))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/confirmation",
      query: {
        regularTickets,
        vipTickets,
        selectedSpot,
        greenCamping,
        twoPersonTent,
        threePersonTent,
        formData: JSON.stringify(formData),
        reservationId,
      },
    });
  };

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.contentBox}>
        <h1>Deltager Information</h1>
        <form className={styles.formBoxBox} onSubmit={handleSubmit}>
          <div className={styles.formBox}>
            {formData.map((data, index) => (
              <div className={styles.informationCard} key={index}>
                <h2>Billet {index + 1}.</h2>
                <div>
                  <label>
                    Fornavn:
                    <input
                      className={styles.input}
                      type="text"
                      name="firstName"
                      value={data.firstName}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Efternavn:
                    <input
                      className={styles.input}
                      type="text"
                      name="lastName"
                      value={data.lastName}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Email:
                    <input
                      className={styles.input}
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Mobil:
                    <input
                      className={styles.input}
                      type="tel"
                      name="phone"
                      value={data.phone}
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className={styles.checkoutBtn}>
            Til betaling
          </button>
        </form>
      </div>
    </main>
  );
}

export default PersonalInfo;
