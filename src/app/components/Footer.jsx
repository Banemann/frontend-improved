import Link from "next/link";
import Image from "next/image";
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLinks}>
          <Link href="/allbands" className={styles.footerLink}>
            Bands
          </Link>
          <Link href="/program" className={styles.footerLink}>
            Program
          </Link>
          <Link href="/billetter" className={styles.footerLink}>
            Billetter
          </Link>
        </div>
        <div className={styles.footerSocials}>
          <Link href="https://www.facebook.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
          </Link>
          <Link href="https://www.twitter.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
          </Link>
          <Link href="https://www.instagram.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
          </Link>
        </div>
        <div className={styles.footerContact}>
          <p>E-mail: info@foofest.com</p>
          <p>Tlf: 20 60 39 20</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
