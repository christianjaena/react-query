import React, { useState } from "react";
import "./styles.css";
import { usePaginatedQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
const fetchPlanets = async (key, number) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${number}`);
  return res.json();
};
export default function App() {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["planets", page],
    fetchPlanets
  );

  return (
    <>
      <div className="App">
        {status === "error" && <div>Error</div>}
        {status === "loading" && <div>Loading</div>}
        {status === "success" &&
          resolvedData.results.map((planet) => (
            <div key={planet.name}>
              <h2>{planet.name}</h2>
              <h3>{planet.population}</h3>
              <h3>{planet.terrain}</h3>
            </div>
          ))}
        <button
          onClick={() => {
            setPage((prevPage) => Math.max(prevPage - 1, 1));
          }}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>{page}</span>
        <button
          onClick={() =>
            setPage((prevPage) =>
              !latestData || !latestData.next ? prevPage : prevPage + 1
            )
          }
          disabled={!latestData || !latestData.next}
        >
          Next
        </button>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
