import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  const Content = (props) => (
    <div className="container mt-5 py-4 px-xl-5">
      <main className="flex-shrink-0">{props.children}</main>
    </div>
  );

  return (
    <div className="page-layout">
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </div>
  );
};

export default Layout;
