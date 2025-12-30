import { useMemo, useState } from "react";
import styles from "./Search.module.css";

export default function Search({ cars = [], query, setQuery }) {
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => {
    const inputName = query.trim().toLowerCase();
    if (!inputName) return [];
    return cars.filter((data) => data.name.toLowerCase().includes(inputName)).slice(0, 6);
  }, [cars, query]);

  const pick = (name) => {
    setQuery(name);
    setOpen(false);
  };

  return (
    <div className={styles.center}>
      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Which car do you want to refer to ?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
        />

        <i className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`} />

        {open && suggestions.length > 0 && (
          <div className={styles.suggestBox}>
            {suggestions.map((car) => (
              <div
                key={car.id}
                className={styles.suggestItem}
                onMouseDown={() => pick(car.name)}
              >
                {car.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
