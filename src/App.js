import React, { useState } from 'react';

import './App.css';

const api={
  key:"b7c2c6849286ad2b5d8df8cd150cb3a4",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App()  {
  
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});

  const search=evt=>
  {
    if (evt.key==="Enter")
    {
      fetch(`${api.base}weather?q=${query}&units=metrics&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setWeather(result);
        setQuery('');
        console.log(result);
      });
      
    }
  }


  const dateBuilder=(d)=>{
    let months=["January","February","March","April","May","June","July","Augest","September",
  "October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Satureday"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
    return (
      <div className="App">
        <main>
          <div className="search-box">
            <input 
              type="text" 
              className="search-bar" 
              placeholder="search" 
              onChange={e=>setQuery(e.target.value)} 
              value={query} 
              onKeyPress={search}/>
          </div>
          {(typeof weather.main!="undefined")?(
          <div>
            <div className="location-box">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              
              <div className="temp">
                {Math.round(weather.main.temp)-273}°C
                </div>
                <div className="weather">
                  {console.log(weather.weather[0])}
                  {weather.weather[0].main}
                </div>
            </div>
          </div>):('')}
          
        </main>
        
      </div>
      
    );
  
  
}

export default App;
