import styles from "./CarCard.module.css";
import { Link } from "react-router-dom";
import useFormatVnd from "../../hooks/useFormatVnd";

export default function CarCard({ car }) {
  const formatVnd = useFormatVnd()

  return (
    <Link
      to={`/car/${car.id}`}
      state={{ car }}
      className={styles.cardLink}
    >
      <div className={styles.card} role="button" tabIndex={0}>
        <div className={styles.fuel}>{car.Fuel}</div>

        <div className={styles.imageWrap}>
          <img className={styles.image} src={car.URL} alt={car.name} />
        </div>

        <div className={styles.name}>{car.name}</div>
        <div className={styles.price}>{formatVnd(car.Price)}</div>

        <div className={styles.meta}>
          <span>{car.seats} chỗ</span>
          <span className={styles.sep}>|</span>
          <span>{car.transmission}</span>
        </div>
      </div>
    </Link>
  );
}
