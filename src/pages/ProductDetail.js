import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetProductDetailQuery } from "../redux/api/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";

const ProductDetail = () => {
  const { productId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetProductDetailQuery(productId);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  let content = "";

  if (isSuccess) {
    content = (
      <>
        <div className="container mt-5 py-4 px-xl-5">
          <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
            <ol className="breadcrumb p-3">
              <li className="breadcrumb-item">All Prodcuts</li>
              <li className="breadcrumb-item active" aria-current="page">
                {data.title}
              </li>
            </ol>
          </nav>
          <div className="row mb-4">
            <div className="d-none d-lg-block col-lg-1">
              <div className="image-vertical-scroller">
                <div className="d-flex flex-column">
                  {Array.from({ length: 10 }, (_, i) => {
                    let selected = i !== 1 ? "opacity-6" : "";
                    return (
                      <a key={i} href="!#">
                        <img
                          className={"rounded mb-2 ratio " + selected}
                          alt=""
                          src=""
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12 mb-4">
                  <img
                    className="border rounded ratio ratio-1x1"
                    alt=""
                    src={data.thumbnail}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="d-flex flex-column h-100">
                <h2 className="mb-1">{data.title}</h2>
                <h4 className="text-muted mb-4">${data.price}</h4>

                <div className="row g-3 mb-4">
                  <div className="col">
                    <button
                      className="btn btn-outline-dark py-2 w-100"
                      onClick={() => handleAddToCart(data)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>

                <h4 className="mb-0">Details</h4>
                <hr />
                <dl className="row">
                  <dt className="col-sm-4">Category</dt>
                  <dd className="col-sm-8 mb-3">{data.category}</dd>

                  <dt className="col-sm-4">Brand</dt>
                  <dd className="col-sm-8 mb-3">{data.brand}</dd>

                  <dt className="col-sm-4">Stock</dt>
                  <dd className="col-sm-8 mb-3">{data.stock}</dd>

                  <dt className="col-sm-4">Rating</dt>
                  <dd className="col-sm-8 mb-3">{data.rating}/5</dd>
                </dl>

                <h4 className="mb-0">Description</h4>
                <hr />
                <p className="lead flex-shrink-0">
                  <small>{data.description}</small>
                </p>
              </div>
            </div>
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

export default ProductDetail;
