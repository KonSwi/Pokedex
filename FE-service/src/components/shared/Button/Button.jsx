import styles from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({ children, to, onClick, type = "button" }) => {
  if (to) {
    return (
      <Link to={to} className={`${styles.btn}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={`${styles.btn}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
