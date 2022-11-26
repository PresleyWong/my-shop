import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products/search?q=${keyword}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <Button variant="outline-secondary" type="submit">
            <FontAwesomeIcon icon={["fas", "search"]} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
