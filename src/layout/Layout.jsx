import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function Layout({ cartVersion, headerCenter }) {
  return (
    <>
      <Header cartVersion={cartVersion}>{headerCenter}</Header>
      <main style={{ marginTop: 70 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
