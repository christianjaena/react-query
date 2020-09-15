import React, { useState } from "react";
import "./styles.css";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
const fetchPlanets = async (key, number) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${number}`);
  return res.json();
};
export default function App() {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets", page], fetchPlanets, {
    staleTime: 5000
  });

  return (
    <>
      <div className="App">
        <button onClick={() => setPage(1)}>Page 1</button>
        <button onClick={() => setPage(2)}>Page 2</button>
        <button onClick={() => setPage(3)}>Page 3</button>
        {status === "error" && <div>Error</div>}
        {status === "loading" && <div>Loading</div>}
        {status === "success" &&
          data.results.map((planet) => (
            <div key={planet.name}>
              <h2>{planet.name}</h2>
              <h3>{planet.population}</h3>
              <h3>{planet.terrain}</h3>
            </div>
          ))}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
