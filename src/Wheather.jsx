import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Nav";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState("");
  const [weather, setWeather] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const API_KEY = "d3203f459f8c42b88c2150742252906";

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.trim()}&aqi=no`
      );
      setWeather(response.data);
      setMsg("Weather Fetched Successfully");
      setIsSuccess(true);
    } catch (err) {
      setMsg("Failed to fetch weather");
      setWeather(null);
      setIsSuccess(false);
    }
  };

  return (
    <>
    <Nav/>
    <div className="container mt-5">
      <h2 className="text-center mb-4">🌤️ Weather App</h2>

      {/* {isSuccess ? (
        <h3 className="alert alert-success">{msg}</h3>
      ) : (
        <h3 className="alert alert-danger">{msg}</h3>
      )} */}

      {isSuccess !== null && (
        <div
          className={`alert ${isSuccess ? "alert-success" : "alert-danger"}`}
          role="alert"
        >
          {msg}
        </div>
      )}

      <form
        onSubmit={fetchWeather}
        className="d-flex justify-content-center mb-4"
      >
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Enter City (e.g., Delhi, India)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Show Weather
        </button>
      </form>

      {/* Weather Card */}
      {weather && (
        <div className="card mx-auto shadow p-4" style={{ maxWidth: "400px" }}>
          <h3 className="card-title text-center">{weather.location.name}</h3>
          <div className="text-center">
            <img
              src={weather.current.condition.icon}
              alt="icon"
              className="img-fluid"
              style={{ height: "100px" }}
            />
          </div>
          <div className="card-body">
            <p className="card-text">🌡️ Temp: {weather.current.temp_c}°C</p>
            <p className="card-text">
              🌥️ Condition: {weather.current.condition.text}
            </p>
            <p className="card-text">
              💧 Humidity: {weather.current.humidity}%
            </p>
            <p className="card-text">
              💨 Wind: {weather.current.wind_kph} km/h
            </p>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default WeatherApp;
