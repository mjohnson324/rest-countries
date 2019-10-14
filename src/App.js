import React from 'react';
import './App.css';
import Region from './Components/Region';

function App() {
  const regions = [
    {name: "africa", key: 1 },
    {name: "americas", key: 2 },
    {name: "asia", key: 3 },
    {name: "europe", key: 4 },
    {name: "oceania", key: 5 }
  ];
  return (
    <div className="App">
        <h1>RESTful Country Data</h1>
        <ul className="region-list">
          {regions.map(region => {
            return <Region key={region.key} region={region.name} />;
          })}
        </ul>
    </div>
  );
}

export default App;
