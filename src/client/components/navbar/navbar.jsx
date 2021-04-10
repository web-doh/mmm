import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { X } from "react-feather";
import styles from "./navbar.module.css";
import Popup from "../popup/popup";

const Navbar = ({ isOpen, onOpenHandler, logoutHandler }) => {
  const history = useHistory();
  const location = useLocation().pathname.replace("/", "");
  const [isPopup, setIsPopup] = useState(false);
  const username = localStorage.getItem("username");
  const menus = ["board", "search", "favorites", "my page"];

  const onClickHandler = () => {
    onOpenHandler(false);
  };

  const onPopupHandler = () => {
    setIsPopup(true);
  };
  const onLogout = () => {
    logoutHandler();
    history.push("/");
  };
  const onCancel = () => {
    setIsPopup(false);
  };

  const confirmPopup = {
    title: "Are you sure",
    info: "Do you want to log out?",
    buttons: [
      { id: "cancel", name: "Cancel", clickHandler: onCancel },
      { id: "logout", name: "Log out", clickHandler: onLogout },
    ],
  };

  return (
    <div className={`${styles.background} ${isOpen && styles.show}`}>
      <section className={styles.contents}>
        <header className={styles.header}>
          <button className={styles.cancel} onClick={onClickHandler}>
            <X />
          </button>
          <h4 className={styles.username}>Welcome, {username}!</h4>
        </header>
        <nav className={styles.menu}>
          <ul className={styles.list}>
            {menus.map((menu, i) => (
              <li
                key={i}
                className={`${styles.listItem} ${
                  menu.replace(" ", "").includes(location) && styles.selected
                }`}
              >
                <Link to={`/${menu.replace(" ", "")}`}>{menu}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <footer>
          <button
            type="submit"
            onClick={onPopupHandler}
            className={styles.logout}
          >
            log out
          </button>
        </footer>
      </section>
      {isPopup && <Popup contents={confirmPopup} />}
    </div>
  );
};

export default Navbar;