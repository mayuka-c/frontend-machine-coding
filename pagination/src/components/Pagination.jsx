import { useEffect } from "react";
import { useState } from "react";
import "./Pagination.css";

const ProductCard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <span>{title}</span>
    </div>
  );
};

const PAGE_SIZE = 10;

export function Pagination() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(0);
  const [selectedPage, setSelectedPage] = useState("0");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("https://dummyjson.com/products?limit=200");
        const jsonData = await data.json();
        setProducts(jsonData.products);
        setLoading(false);
      } catch (error) {
        setError(`Error while fetching data: ${error}`);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrPage(n);
    setSelectedPage(n);
  };

  const goToPreviousPage = () => {
    const prevPage =
      parseInt(selectedPage) > 0 ? parseInt(selectedPage) - 1 : 0;
    setCurrPage(prevPage);
    setSelectedPage(prevPage.toString());
  };

  const goToNextPage = () => {
    const nextPage =
      parseInt(selectedPage) < noOfPages - 1
        ? parseInt(selectedPage) + 1
        : noOfPages - 1;
    setCurrPage(nextPage);
    setSelectedPage(nextPage.toString());
  };

  const handlePageSelection = (e) => {
    setCurrPage(e.target.value);
    setSelectedPage(e.target.value);
  };

  return loading ? (
    <h1>Loading....</h1>
  ) : error ? (
    <h1>Error Fetching Content. Please Try later!</h1>
  ) : products.length === 0 ? (
    <h1>No Products found</h1>
  ) : (
    <div className="app">
      <h1>Pagination Project</h1>
      <div className="pagination-container">
        <button
          className="page-number"
          onClick={() => goToPreviousPage()}
          disabled={currPage === 0}
        >
          ⬅️
        </button>
        {[...Array(noOfPages).keys()].map((n) => (
          <button
            key={n}
            className={
              "page-number " +
              (n === currPage || n === parseInt(selectedPage) ? "active" : "")
            }
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          className="page-number"
          onClick={() => goToNextPage()}
          disabled={
            currPage === noOfPages - 1 ||
            parseInt(selectedPage) === noOfPages - 1
          }
        >
          ➡️
        </button>
      </div>
      <div className="products-container">
        {products.slice(start, end).map((p) => (
          <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>
      <div className="page-selection">
        <select value={selectedPage} onChange={(e) => handlePageSelection(e)}>
          {[...Array(noOfPages).keys()].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
