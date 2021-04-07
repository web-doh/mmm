import React, { useEffect } from "react";
import { Menu, Search } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/mini_logo.png";
import styles from "./header.module.css";

const Header = ({ search }) => {
  const location = useLocation();
  let path = location.pathname;

  useEffect(() => {
    path = location.pathname;
  }, [location]);

  return (
    <header className={styles.container}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.right}>
        {!path.includes("search") && (
          <Link to="/search">
            <div className={styles.search}>
              <span className={styles.text}>Search with materials..</span>
              <Search />
            </div>
          </Link>
        )}
        <Menu />
      </div>
    </header>
  );
};

export default Header;
