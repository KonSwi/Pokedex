import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PokemonContext } from "../../../context/PokemonContext";
import { AuthContext } from "../../../context/AuthContext";
import { ThemeContext } from "../../../context/ThemeContext";
import Button from "../../shared/Button/Button";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { arenaPokemons } = useContext(PokemonContext);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);


  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`${styles.navbar} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          <img
            src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
            alt="Pokedex Logo"
            className={styles.logoImg}
          />
        </Link>
      </div>

      <div className={styles.right}>
        <div className={styles.topRight}>
          {user && <span>🖐🏻 {user.name}!</span>}
          <button onClick={toggleTheme} className={styles.switcher}>
                {theme === "light" ? "🌙 👉 🌞" : "🌙 👈 🌞"}
              </button>
        </div>

        <div className={styles.navLinks}>
          {!user && (
            <>
              <Button to="/login">Logowanie</Button>
              <Button to="/register">Rejestracja</Button>
            </>
          )}

          {user && (
            <>
              <Button to="/favourites">Ulubione</Button>
              <Button to="/arena">Arena ({arenaPokemons.length}/2)</Button>
              <Button to="/ranking">Ranking</Button>
              <Button to="/edition">Edycja</Button>
              <Button onClick={handleLogout}>Wyloguj</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
