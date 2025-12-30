import { useReducer } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";

const initState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SET_USER_NAME = "set_userName";
const SET_EMAIL = "set_email";
const SET_PASSWORD = "set_password";
const SET_CONFIRM_PASSWORD = "set_confirmPassword";
const SIGNUP = "signUp";

const setUsername = (payload) => ({ type: SET_USER_NAME, payload });
const setEmail = (payload) => ({ type: SET_EMAIL, payload });
const setPassword = (payload) => ({ type: SET_PASSWORD, payload });
const setConfirmPassword = (payload) => ({
  type: SET_CONFIRM_PASSWORD,
  payload,
});
const signup = () => ({ type: SIGNUP });

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, userName: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.payload };
    case SIGNUP:
      return state;
    default:
      return state;
  }
};

export default function SignUp() {
  const [state, dispatch] = useReducer(reducer, initState);
  const handleClick = () => {
    if (
      state.userName.trim() === "" ||
      state.email.trim() === "" ||
      state.password.trim() === "" ||
      state.confirmPassword.trim() === "" ||
      state.password !== state.confirmPassword
    ) {
      alert("Vui long nhap lai");
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const checkEmail = users.find((u) => u.email === state.email.trim());
      if (checkEmail) {
        alert("Email đã tồn tại");
        return;
      }

      const newUser = {
        id: Date.now(),
        userName: state.userName.trim(),
        email: state.email.trim(),
        password: state.password,
        cart: [], 
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Đăng ký thành công!");

      dispatch(signup());
    }
  };

  return (
    <>
      <Header />

      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            Hello ! <br />
            <span>Welcome Back</span>
          </h1>

          <form className={styles.form}>
            <input
              className={styles.input}
              name="userName"
              type="text"
              placeholder="Username"
              value={state.userName}
              onChange={(e) => dispatch(setUsername(e.target.value))}
            />

            <input
              className={styles.input}
              name="email"
              type="email"
              placeholder="Your Email"
              value={state.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />

            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />

            <input
              className={styles.input}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={state.confirmPassword}
              onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
            />

            <button
              onClick={handleClick}
              className={styles.btnPrimary}
              type="button"
            >
              Register
            </button>

            <div className={styles.or}>or</div>

            <Link to="/login" className={styles.btnLight}>
              Sign In
            </Link>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
