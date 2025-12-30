import styles from "./Content.module.css";
import CarCard from "../CarCard/CarCard";

export default function Content({ cars = [] }) {
  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <h1 className={styles.heading}>Choose Your Vehicle</h1>
      </div>

      <div className={styles.product}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
