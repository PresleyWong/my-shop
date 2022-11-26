import React from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../redux/api/productApi.js";
import Carousel from "react-bootstrap/Carousel";

const Homepage = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllProductsQuery(6);

  const FeatureProduct = (props) =>
    props.products.map((item) => (
      <div className="col" key={item.id}>
        <div className="card shadow-sm">
          <img
            className="card-img-top bg-dark cover"
            height="240"
            alt={item.title}
            src={item.thumbnail}
          />
          <div className="card-body">
            <h5 className="card-title text-center">{item.title}</h5>
            <p className="card-text text-center text-muted">${item.price}</p>
            <div className="d-grid gap-2">
              <Link to={`/product/${item.id}`} className="btn btn-outline-dark">
                Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));

  let content = "";

  if (isSuccess) {
    content = (
      <>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="img/banner-1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Apple</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="img/banner-2.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Samsung</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="d-flex flex-column bg-white py-4">
          <p className="text-center px-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/products" className="btn btn-primary" replace>
              Browse products
            </Link>
          </div>
        </div>
        <h2 className="text-muted text-center mt-4 mb-3">New Arrival</h2>
        <div className="container pb-5 px-lg-5">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
            <FeatureProduct products={data.products} />;
          </div>
        </div>
      </>
    );
  } else if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

export default Homepage;
