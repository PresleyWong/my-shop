import Loader from "../components/Loader";
import { useSearchParams } from "react-router-dom";
import { useGetProductSearchQuery } from "../redux/api/productApi";
import { ProductList } from "./Products";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetProductSearchQuery(searchParams.get("q"));

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

export default SearchResults;
