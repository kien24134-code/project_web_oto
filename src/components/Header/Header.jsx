import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import logoWeb from "../../../public/image/LogoWeb.png";
import { useEffect, useMemo, useState } from "react";

const AUTH_KEY = "auth";

function readAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const formatVnd = (n) => `${new Intl.NumberFormat("vi-VN").format(Number(n) || 0)} đ`;

export default function Header({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => readAuth());
  const [openCart, setOpenCart] = useState(false);

  // ✅ tự cập nhật user (và cart) khi localStorage đổi
  useEffect(() => {
    const sync = () => setUser(readAuth());

    window.addEventListener("cart_updated", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("cart_updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const cart = user?.cart || [];

  const cartQty = useMemo(
    () => cart.reduce((sum, it) => sum + (Number(it.qty) || 0), 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 0), 0),
    [cart]
  );

  const handleAuthClick = (e) => {
    if (user) {
      e.preventDefault();
      const ok = window.confirm("Bạn có muốn đăng xuất không?");
      if (!ok) return;

      localStorage.removeItem(AUTH_KEY);
      window.dispatchEvent(new Event("cart_updated")); // ✅ sync header
      setUser(null);
      setOpenCart(false);
      navigate("/login");
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link className={styles.logo} to="/">
          <img src={logoWeb} alt="Kien Auto" />
        </Link>
      </div>

      <div className={styles.center}>{children}</div>

      <nav className={styles.right}>
        {user ? (
          <h3 className={styles.authDesc}>
            Xin chào: <strong className={styles.authDescName}>{user.userName}</strong>
          </h3>
        ) : null}

        {/* ✅ CART ICON */}
        <button
          type="button"
          className={styles.cartBtn}
          onClick={() => setOpenCart((p) => !p)}
        >
          <i className="fa fa-shopping-cart" />
          {cartQty > 0 && <span className={styles.cartBadge}>{cartQty}</span>}
        </button>

        {/* ✅ CART POPUP */}
        {openCart && (
          <div className={styles.cartPopup}>
            <div className={styles.cartTitle}>Giỏ hàng</div>

            {!user ? (
              <div className={styles.cartEmpty}>
                Bạn chưa đăng nhập.{" "}
                <button
                  type="button"
                  className={styles.cartLinkBtn}
                  onClick={() => {
                    setOpenCart(false);
                    navigate("/login");
                  }}
                >
                  Đăng nhập
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className={styles.cartEmpty}>Chưa có sản phẩm nào.</div>
            ) : (
              <>
                <div className={styles.cartList}>
                  {cart.map((it) => (
                    <div key={it.id} className={styles.cartItem}>
                      <img className={styles.cartImg} src={it.image} alt={it.name} />

                      <div className={styles.cartInfo}>
                        <div className={styles.cartName}>{it.name}</div>
                        <div className={styles.cartMeta}>
                          <span>{formatVnd(it.price)}</span>
                          <span className={styles.dot}>•</span>
                          <span>x{it.qty}</span>
                        </div>
                      </div>

                      <div className={styles.cartLineTotal}>
                        {formatVnd((Number(it.price) || 0) * (Number(it.qty) || 0))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.cartFooter}>
                  <div className={styles.cartTotalRow}>
                    <span>Tổng</span>
                    <b>{formatVnd(cartTotal)}</b>
                  </div>

                  <button
                    type="button"
                    className={styles.cartViewBtn}
                    onClick={() => {
                      setOpenCart(false);
                      navigate("/cart"); // nếu bạn có trang /cart
                    }}
                  >
                    Xem giỏ hàng
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <Link className={styles.navLink} to="/login" onClick={handleAuthClick}>
          <i className="fa fa-user" />
          <span>{user ? "Logout" : "Login"}</span>
        </Link>

        <Link className={styles.navLink} to="/aboutUs">
          <i className="fa fa-question-circle" />
          <span>About US</span>
        </Link>
      </nav>
    </div>
  );
}
