import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../redux/features/cart/cartSlice";
import { useEffect } from "react";

const Header = () => {
  const { cartTotalQuantity, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <FontAwesomeIcon
              icon={["fab", "apple"]}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">Shop</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse "}>
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Explore
                </Link>
              </li>

              <SearchBar />
            </ul>
            <button
              type="button"
              className="btn btn-outline-dark me-3 d-none d-lg-inline"
            >
              <Link className="navbar-brand" to="/cart">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                <span className="ms-3 badge rounded-pill bg-dark">
                  {cartTotalQuantity}
                </span>
              </Link>
            </button>
          </div>

          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark">
              <Link className="navbar-brand" to="/cart">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                <span className="ms-3 badge rounded-pill bg-dark">
                  {cartTotalQuantity}
                </span>
              </Link>
            </button>
            <button className="navbar-toggler p-0 border-0 ms-3" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
