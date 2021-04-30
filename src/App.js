import React, { useEffect, useState } from "react";
import './App.css';

function App() {


  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const fahrenheitTemp = Math.round((data.main.temp * 9/5) + 32);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])


  return (
    <div className="App">
      <header className="App-header">
      <div className="location">{data.name}, {data.sys.country}</div>
      <div>{fahrenheitTemp} °F</div>
      
      </header>
    </div>
  );
}

export default App;
