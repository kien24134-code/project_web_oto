import { useState } from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar({  setFilters }) {
  const [open, setOpen] = useState({ price: false, type: false, fuel: false });

  const toggle = (type) => setOpen((prev) => ({ ...prev, [type]: !prev[type] }));

  const handleFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterTitle}>
        <i className="fa fa-filter"></i> Bộ lọc
      </div>

      {/* Price */}
      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle} onClick={() => toggle("price")}>
          Price of Vehicle
          <i className={`fa-solid fa-chevron-right ${styles.right} ${open.price ? styles.down : ""}`}></i>
        </h3>

        <div className={`${styles.options} ${open.price ? styles.active : ""}`}>
          <div className={styles.option} onClick={() => handleFilter("price", "400-600")}>400M - 600M</div>
          <div className={styles.option} onClick={() => handleFilter("price", "600-800")}>600M - 800M</div>
          <div className={styles.option} onClick={() => handleFilter("price", "800-1000")}>800M - 1B</div>
          <div className={styles.option} onClick={() => handleFilter("price", "gt-1000")}>{">"} 1B</div>
          <div className={styles.option} onClick={() => handleFilter("price", "all")}>All</div>
        </div>
      </div>

      {/* Type */}
      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle} onClick={() => toggle("type")}>
          Type of Vehicle
          <i className={`fa-solid fa-chevron-right ${styles.right} ${open.type ? styles.down : ""}`}></i>
        </h3>

        <div className={`${styles.options} ${open.type ? styles.active : ""}`}>
          <div className={styles.option} onClick={() => handleFilter("type", "Sedan")}>Sedan</div>
          <div className={styles.option} onClick={() => handleFilter("type", "SUV")}>SUV</div>
          <div className={styles.option} onClick={() => handleFilter("type", "Service Car")}>Service Car</div>
          <div className={styles.option} onClick={() => handleFilter("type", "TRUCK")}>Truck</div>
          <div className={styles.option} onClick={() => handleFilter("type", "Hatchback")}>Hatchback</div>
          <div className={styles.option} onClick={() => handleFilter("type", "all")}>All</div>
        </div>
      </div>

      {/* Fuel */}
      <div className={styles.filterGroup}>
        <h3 className={styles.groupTitle} onClick={() => toggle("fuel")}>
          Fuel
          <i className={`fa-solid fa-chevron-right ${styles.right} ${open.fuel ? styles.down : ""}`}></i>
        </h3>

        <div className={`${styles.options} ${open.fuel ? styles.active : ""}`}>
          <div className={styles.option} onClick={() => handleFilter("fuel", "GAS")}>Gasoline</div>
          <div className={styles.option} onClick={() => handleFilter("fuel", "OIL")}>Oil</div>
          <div className={styles.option} onClick={() => handleFilter("fuel", "all")}>All</div>
        </div>
      </div>
    </div>
  );
}
