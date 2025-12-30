import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./DetailCar.module.css";
import useFormatVnd from "../../hooks/useFormatVnd";
import AddToCart from "../../components/AddToCard/AddToCart";

const AUTH_KEY = "auth";
const USERS_KEY = "users";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default function DetailCar({ bumpCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { formatVnd } = useFormatVnd();

  const carFromState = location.state ? location.state.car : null;

  const [carFromApi, setCarFromApi] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (carFromState) return;

    fetch("/data/cars.json")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((x) => String(x.id) === String(id));
        setCarFromApi(found || null);
      })
      .catch(() => setCarFromApi(null));
  }, [id, carFromState]);

  const car = useMemo(() => carFromState || carFromApi, [carFromState, carFromApi]);

  if (!car) {
    return <div style={{ padding: 24, color: "#fff" }}>Loading...</div>;
  }

  const bannerSrc = car?.BannerURL || car?.banner || car?.URL;

  const handleAddToCart = () => {
    const auth = readJSON(AUTH_KEY, null);
    if (!auth) {
      alert("Vui lòng đăng nhập");
      navigate("/login");
      return;
    }

    const users = readJSON(USERS_KEY, []);
    const userIndex = users.findIndex((u) => String(u.id) === String(auth.id));

    const currentUser = users[userIndex];

    const item = {
      id: String(car.id),
      name: car.name,
      price: Number(car.Price) || 0,
      image: car.URL,
      type: car.Type,
      fuel: car.Fuel,
      qty: Number(qty) || 1,
    };

    const cart = Array.isArray(currentUser.cart) ? [...currentUser.cart] : [];
    const idx = cart.findIndex((x) => String(x.id) === String(item.id));

    if (idx >= 0) cart[idx].qty = (Number(cart[idx].qty) || 0) + item.qty;
    else cart.push(item);

    const updatedUser = { ...currentUser, cart };
    users[userIndex] = updatedUser;

    writeJSON(USERS_KEY, users);
    writeJSON(AUTH_KEY, updatedUser);

    bumpCart(); 
    alert(`Đã thêm ${item.qty} vào giỏ hàng`);
  };

  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <img className={styles.bannerImg} src={bannerSrc} alt={car.name} />
      </section>

      <div className={styles.wrap}>
        <div className={styles.detailCard}>
          <div className={styles.left}>
            <div className={styles.badge}>{car.Fuel}</div>
            <img className={styles.image} src={car.URL} alt={car.name} />
          </div>

          <div className={styles.right}>
            <h1 className={styles.name}>{car.name}</h1>
            <div className={styles.price}>{formatVnd(car.Price)}</div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Type</span>
                <span className={styles.value}>{car.Type}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.label}>Seats</span>
                <span className={styles.value}>{car.seats}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.label}>Transmission</span>
                <span className={styles.value}>{car.transmission}</span>
              </div>
            </div>

            <AddToCart qty={qty} setQty={setQty} onAddToCart={handleAddToCart} />

            <div className={styles.actions}>
              <button className={styles.btn} type="button" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
