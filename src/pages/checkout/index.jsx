import React, { useState } from "react";
import { useRouter } from "next/router";
import GoBack from "../../app/components/GoBack";
import styles from "./Checkout.module.css";
import CcardFlip from "../../app/components/CcardFlip";

function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    cvc: "",
    expiry: "",
  });
  const router = useRouter();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/thanksbye",
    });
  };

  return (
    <main>
      <GoBack />
      <div className={styles.contentBox}>
        <form onSubmit={handleSubmit}>
          <h1>Betalingsinformation</h1>
          <CcardFlip formData={formData} handleChange={handleChange} />
          <div className={styles.btnBox}>
            <button className={styles.checkoutBtn} type="submit">
              Køb
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Checkout;