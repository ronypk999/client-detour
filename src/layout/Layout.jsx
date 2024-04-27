import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useEffect } from "react";
const Layout = () => {
  useEffect(() => {
    AOS.init();
    return () => {
      AOS.refresh(); // Optional, if you want to restore default settings when component unmounts
    };
  }, []);
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Layout;
