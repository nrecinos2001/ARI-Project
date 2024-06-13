import Image from "next/image";
import styles from "./page.module.css";
import { HomePage } from "@/app/pages";

export default function Home() {
  return (
    <div className={styles.main}>
      <HomePage />
    </div>
  );
}
