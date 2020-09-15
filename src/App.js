import React from "react";
import "./styles.css";
import {useQuery} from 'react-query';

const fetchPlanets = async () => {
  const res = await fetch('https://swapi.dev/api/planets/');
  return res.json();
}
export default function App() {
  const {data, status} = useQuery('planets', fetchPlanets);

  return (
    <div className="App">
      {status === 'error' && (
        <div>Error</div>
      )}
      {status === 'loading' && (
        <div>Loading</div>
      )}
      {status === 'success' && (
        data.results.map(planet => (
          <div key={planet.name}>
            <h2>{planet.name}</h2>
            <h3>{planet.population}</h3>
            <h3>{planet.terrain}</h3>
          </div>
        ))
      )}
      
    </div>
  );
}
