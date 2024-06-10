import { useState } from "react";
import styles from "./Fakelogin.module.css";
import Header from "../../app/components/Header";

function FakeLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fakeUsername = "lavagæst";
    const fakePassword = "lava123";

    if (username === fakeUsername && password === fakePassword) {
      alert("Login fuldent!");
    } else {
      setErrorMessage("Forkert brugernavn eller kode. Prøv igen.");
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.contentBox}>
        <form className={styles.formBox} onSubmit={handleSubmit}>{errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <div className={styles.loginCard}>
            <div>
              <label htmlFor="username">
                Brugernavn:
                <input
                  className={styles.input}
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Brugernavn (prøv 'lavagæst')"
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Kode:
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Kode (prøv 'lava123')"
                />
              </label>
            </div>
          </div>
          <button className={styles.loginBtn} type="submit">Login</button>
          
        </form>
      </div>
    </main>
  );
}

export default FakeLogin;
