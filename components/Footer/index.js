import Link from "next/link";

import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className="text">
        Feito com{" "}
        <Link href="https://nextjs.org/" target="_blank">
          <a>Next.js</a>
        </Link>{" "}
        e ❤️ - 2023
      </p>
    </footer>
  );
};

export default Footer;
