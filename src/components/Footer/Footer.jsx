import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        <ul className={styles.footer__links}>
          <li>
            <a href="/privacy-policy" className={styles.footer__link}>
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className={styles.footer__link}>
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/contact" className={styles.footer__link}>
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
