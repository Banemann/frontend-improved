import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <Link className={styles.title} href="/" passHref>
          LAVAFEST
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={`${styles.link} ${router.pathname === '/billetter' ? styles.active : ''}`}>
              <Link prefetch={false} href="/billetter">
                Billetter
              </Link>
            </li>
            <li className={`${styles.link} ${router.pathname === '/program' ? styles.active : ''}`}>
              <Link prefetch={false} href="/program">
                Program
              </Link>
            </li>
            <li className={`${styles.link} ${router.pathname === '/allbands' ? styles.active : ''}`}>
              <Link prefetch={false} href="/allbands">
                Bands
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
