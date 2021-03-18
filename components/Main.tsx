import { CascadeProvider } from "../contexts/CascadeContext";
import { Cascade } from "./Cascade";

import styles from '../styles/components/Main.module.css';

export function Main() {
  return(
    <div className={styles.mainConteiner}>
      <CascadeProvider>
        <Cascade />
      </CascadeProvider>
    </div>
  );
}