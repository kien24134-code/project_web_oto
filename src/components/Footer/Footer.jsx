import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.socialsList}>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-facebook"></i>
        </a>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>

        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i>
        </a>

        <a href="#" aria-label="Twitter">
          <i className="fa-brands fa-twitter"></i>
        </a>

        <a href="#" aria-label="LinkedIn">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}
