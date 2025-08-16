import { useEffect, useState } from "react";
import "./Search.css";

export function Search() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (cache[input]) {
        setResults(cache[input]);
        return;
      }

      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${input}`
      );
      const data = await response.json();
      setResults(data?.recipes);
      setCache((prev) => ({ ...prev, [input]: data?.recipes }));
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [input, cache]);

  return (
    <div className="container">
      <h1>Auto-complete Search Bar</h1>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
        />
      </div>
      {show && results.length > 0 && (
        <div className="results-container">
          {results.map((result) => (
            <span key={result.id} className="result">
              {result.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
