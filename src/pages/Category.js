import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetProductByCategoryQuery } from "../redux/api/productApi";
import { ProductList } from "./Products";

const Category = () => {
  const cat = useLocation().pathname.split("/").pop();
  const { data, isLoading, isSuccess, isError, error } =
    useGetProductByCategoryQuery(cat);

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

export default Category;
