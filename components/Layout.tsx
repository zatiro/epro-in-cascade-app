import { useState } from "react";

import { Main } from "./Main";
import { Sidebar } from "./Sidebar";

import styles from '../styles/components/Layout.module.css';

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  }

  function handleToogleSidebar(value) {
    setToggled(value);
  }

  return(
    <div className={styles.layoutContainer}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        handleCollapsedChange={handleCollapsedChange}
        handleToogleSidebar={handleToogleSidebar}
      />
      <Main />
    </div>
  );
}