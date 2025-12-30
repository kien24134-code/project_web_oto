  import { useMemo, useState } from "react";
  import Content from "../../components/Content/Content";
  import Sidebar from "../../components/Sidebar/Sidebar";

  export default function Home({ cars, query }) {
    const [filters, setFilters] = useState({
      price: "all",
      type: "all",
      fuel: "all",
    });

    const filteredCars = useMemo(() => {
      const q = query.trim().toLowerCase();

      return cars.filter((car) => {
        if (filters.type !== "all" && car.Type !== filters.type) return false;
        if (filters.fuel !== "all" && car.Fuel !== filters.fuel) return false;

        if (filters.price !== "all") {
          const p = Number(car.Price);
          if (filters.price === "400-600" && !(p >= 400_000_000 && p <= 600_000_000)) return false;
          if (filters.price === "600-800" && !(p >= 600_000_000 && p <= 800_000_000)) return false;
          if (filters.price === "800-1000" && !(p >= 800_000_000 && p <= 1_000_000_000)) return false;
          if (filters.price === "gt-1000" && !(p > 1_000_000_000)) return false;
        }

        if (q && !car.name.toLowerCase().includes(q)) return false;

        return true;
      });
    }, [cars, filters, query]);

    return (
      <div style={{ display: "flex" }}>
        <Sidebar setFilters={setFilters} />

        <div style={{ flex: 1, padding: 20, color: "#fff", backgroundColor: "#333" }}>
          <Content cars={filteredCars} />
        </div>
      </div>
    );
  }
