import Loader from "../components/Loader";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useGetAllProductsQuery,
  useGetAllProductCategoriesQuery,
} from "../redux/api/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import Paginate from "../components/Paginate";
import { useState } from "react";

export const FilterMenuLeft = () => {
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllProductCategoriesQuery();

  let content = "";

  if (isSuccess) {
    content = (
      <ul className="list-group list-group-flush rounded">
        <li className="list-group-item d-none d-lg-block">
          <h5 className="mt-1 mb-2">Categories</h5>
          <div className="d-flex flex-wrap my-2">
            <ul className="list-unstyled">
              {categories.map((v, i) => {
                return (
                  <li key={i}>
                    <NavLink
                      to={`/products/category/${v}`}
                      className={`btn btn-sm btn-outline-dark rounded-pill me-2 mb-2 capitalize ${({
                        isActive,
                      }) => (isActive ? "active" : "undefined")}`}
                      replace
                    >
                      {v.replace(/-/g, " ")}
                    </NavLink>
                  </li>
                );
              })}{" "}
            </ul>
          </div>
        </li>
      </ul>
    );
  } else if (isLoading) {
    content = content = <span className="spinner-border"></span>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

export const ProductItem = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return products.map((item, index) => (
    <div className="col" key={index}>
      <div className="card shadow-sm">
        <Link to={`/product/${item.id}`}>
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt={item.title}
            src={item.thumbnail}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {item.title}
          </h5>
          <p className="card-text text-center text-muted mb-0">${item.price}</p>
          <div className="d-grid d-block">
            <button
              className="btn btn-outline-dark mt-3"
              onClick={() => handleAddToCart(item)}
            >
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
};

export const CategoryLink = ({ category }) => {
  if (category) return <li className="breadcrumb-item active">{category}</li>;
};

export const ProductList = ({ products, itemsPerPage = 12 }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentPageData = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const locationArray = useLocation().pathname.split("/category/");

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
              replace
            >
              ALL PRODUCTS
            </Link>
          </li>
          <CategoryLink
            category={
              locationArray.length > 1
                ? locationArray.pop().replace(/-/g, " ").toUpperCase()
                : ""
            }
          />
        </ol>
      </nav>

      <div className="row mb-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <FilterMenuLeft />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 row-cols-xl-3">
              <ProductItem products={currentPageData} />
            </div>
          </div>
        </div>
      </div>

      {pageCount === 1 ? (
        <span></span>
      ) : (
        <div className="d-flex justify-content-center">
          <nav className="my-2 pt-2">
            <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
          </nav>
        </div>
      )}
    </>
  );
};

const Products = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllProductsQuery(100);

  let content = "";

  if (isSuccess) {
    content = <ProductList products={data.products} />;
  } else if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

export default Products;
