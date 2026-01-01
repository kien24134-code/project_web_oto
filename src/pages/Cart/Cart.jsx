import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFormatVnd from "../../hooks/useFormatVnd";
import styles from "./Cart.module.css";

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



export default function Cart({ bumpCart }) {
  const navigate = useNavigate();
  const formatVnd = useFormatVnd()
  const auth = readJSON(AUTH_KEY, null);

  // chưa login
  if (!auth) {
    navigate("/login");
    return null;
  }

  const cart = auth.cart || [];

  const total = useMemo(
    () =>
      cart.reduce(
        (sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 0),
        0
      ),
    [cart]
  );

  const updateCart = (newCart) => {
    const users = readJSON(USERS_KEY, []);
    const idx = users.findIndex((u) => String(u.id) === String(auth.id));
    if (idx < 0) return;

    const updatedUser = { ...users[idx], cart: newCart };
    users[idx] = updatedUser;

    writeJSON(USERS_KEY, users);
    writeJSON(AUTH_KEY, updatedUser);
    bumpCart();
  };

  const increase = (id) => {
    const newCart = cart.map((it) =>
      String(it.id) === String(id) ? { ...it, qty: (Number(it.qty) || 0) + 1 } : it
    );
    updateCart(newCart);
  };

  const decrease = (id) => {
    const newCart = cart
      .map((it) =>
        String(it.id) === String(id)
          ? { ...it, qty: (Number(it.qty) || 0) - 1 }
          : it
      )
      .filter((it) => (Number(it.qty) || 0) > 0);

    updateCart(newCart);
  };

  const removeItem = (id) => {
    const ok = window.confirm("Xóa sản phẩm này khỏi giỏ hàng?");
    if (!ok) return;

    updateCart(cart.filter((it) => String(it.id) !== String(id)));
  };

  if (cart.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.cardEmpty}>
          <h2 className={styles.title}>Giỏ hàng trống</h2>
          <p className={styles.desc}>Bạn chưa có sản phẩm nào trong giỏ.</p>
          <button className={styles.btnPrimary} onClick={() => navigate("/")}>
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.headRow}>
          <h2 className={styles.title}>Giỏ hàng</h2>
          <button className={styles.btn} onClick={() => navigate("/")}>
            ← Tiếp tục mua
          </button>
        </div>

        <div className={styles.list}>
          {cart.map((it) => (
            <div key={it.id} className={styles.item}>
              <img className={styles.img} src={it.image} alt={it.name} />

              <div className={styles.info}>
                <div className={styles.name}>{it.name}</div>
                <div className={styles.meta}>
                  <span className={styles.price}>{formatVnd(it.price)}</span>
                  <span className={styles.dot}>•</span>
                  <span className={styles.badge}>
                    {it.type || "—"} / {it.fuel || "—"}
                  </span>
                </div>
              </div>

              <div className={styles.qty}>
                <button className={styles.qtyBtn} onClick={() => decrease(it.id)}>
                  −
                </button>
                <div className={styles.qtyValue}>{it.qty}</div>
                <button className={styles.qtyBtn} onClick={() => increase(it.id)}>
                  +
                </button>
              </div>

              <div className={styles.lineTotal}>
                {formatVnd((Number(it.price) || 0) * (Number(it.qty) || 0))}
              </div>

              <button className={styles.remove} onClick={() => removeItem(it.id)}>
                Xóa
              </button>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.totalRow}>
            <span>Tổng cộng</span>
            <b>{formatVnd(total)}</b>
          </div>

          <button
            className={styles.btnPrimary}
            onClick={() => alert("Demo: sau này làm thanh toán")}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
