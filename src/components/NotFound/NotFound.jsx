import { useNavigate, useRouteError } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound__title}>Oops!</h1>
      <p className={styles.notFound__message}>
        Sorry, an unexpected error has occurred.
      </p>
      <p className={styles.notFound__error}>
        {error?.statusText || error?.message}
      </p>
      <div className={styles.notFound__actions}>
        <button
          onClick={() => navigate(-1)}
          className={styles.notFound__button}
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className={styles.notFound__button}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
