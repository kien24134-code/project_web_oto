import styles from "./Login.module.css";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const usersSaved = JSON.parse(localStorage.getItem("users")) || [];
  
  const [error, setError] = useState({
    e: false,
    p: false,
  });
  const [input, setInput] = useState({
    e: "",
    p: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleSignIn = () => {
    if (input.e.trim() === "") {
      setError((prev) => ({
        ...prev,
        e: true,
      }));
    } else 
    if (input.p.trim() === "") {
      setError((prev) => ({
        ...prev,
        p: true,
    }));
    } else {
      const found = usersSaved.find((data) => {
        return (
          (data.userName === input.e.trim() || data.email === input.e.trim()) &&
          data.password === input.p.trim()
        );
      });

      if (found) {
        alert(`Đăng nhập thành công, xin chào ${found.userName}`);
        localStorage.setItem("auth", JSON.stringify(found));
        navigate("/");
      } else {
        setError({ e: true, p: true });
        setInput((prev)=>({...prev,e:'',p:''}))
    }
    }
  };

  return (
    <>
    <Header/>

       <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            Hello ! <br />
            <span>Welcome Back</span>
          </h1>

          <form className={styles.form}>
            {(error.e || error.p) &&<p className={styles.errorDesc}>Vui lòng kiểm tra lại Tài khoản & Mật khẩu </p>}
            <input
              className={`${styles.input} ${error.e ? styles.error : ""}`}
              type="text"
              name="e"
              value={input.e}
              onChange={handleChange}
              placeholder="Email or User"
            />

            <div className={styles.passwordWrap}>
              <input
                className={`${styles.input} ${error.p ? styles.error : ""}`}
                type="password"
                name="p"
                value={input.p}
                onChange={handleChange}
                placeholder="Password"
              />
              <a
                className={styles.forgot}
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Forget password?
              </a>
            </div>

            <button
              onClick={handleSignIn}
              className={styles.btnPrimary}
              type="button"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/signup")}
              className={styles.btnSecondary}
              type="button"
            >
              Register
            </button>
          </form>

          <div className={styles.divider}>
            <span className={styles.dividerText}>connect with</span>
          </div>

          <button className={styles.googleBtn} type="button">
            <span className={styles.googleIcon}>
              <i className="fa-brands fa-google"></i>
            </span>
            Google
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
