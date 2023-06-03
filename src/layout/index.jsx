import Header from "../layout/Header";
import Footer from "../layout/Footer";
const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
