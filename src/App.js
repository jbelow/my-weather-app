import React, { useEffect, useState } from "react";
import './App.css';

function App() {

  //TODO: It might be erroring out because it loads the page before the data and then it gets the data in later so that is way it "works"?

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  // var fahrenheitTemp = Math.round((data.main.temp * 9/5) + 32);

  //testing to use if setting it's own const works over using the data
  const [tempo, setTemp] = useState([]);

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
        setTemp(Math.round((result.main.temp * 9/5) + 32))
        console.log(result);
      });
    }
    fetchData();
    
  }, [lat,long])


  return (
    <div className="App">
      <header className="App-header">
      <div className="location">{data.name}</div>
      <div>{tempo} °F</div>
      
      </header>
    </div>
  );
}

export default App;
