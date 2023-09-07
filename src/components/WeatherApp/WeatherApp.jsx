import { useEffect, useState } from "react";
import styles from "./Weather.module.css";
import Button from "react-bootstrap/Button";
import { fetchLocation, fetchWeather } from "../fetching";

const WeatherApp = (today) => {
  const [city, setCity] = useState("");
  const [details, setDetails] = useState({});
  const [error, setError] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lang: 0 });
  // const[temp,setTemp] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        lang: position.coords.longitude,
      });
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      fetchWeather(position.coords.latitude, position.coords.longitude)
        .then((details) => {
          setDetails(details);
        })
        .catch((e) => {});
    });
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const enterPress = (e) => {
    if (e.key === "Enter") {
      btnHandler();
      setCity("");
    }
  };

  const btnHandler = () => {
    fetchLocation(city)
      .then((data) => {
        fetchWeather(data[0].lat, data[0].lon).then((details) => {
          console.log(details);
          setDetails(details);
        });
        setError(false);
      })
      .catch((e) => {
        setError(true);
      });
    setCity("");
  };

  return (
    <>
      <div className={styles.container}>
        <input
          type="text"
          className={styles.input}
          value={city}
          onChange={handleChange}
          onKeyDown={enterPress}
        />
        <Button variant="outline-dark" onClick={btnHandler}>
          Search
        </Button>
        {error ? (
          <h1 className={styles.city}>Invalid City</h1>
        ) : (
          <h1 className={styles.city}>{details?.name}</h1>
        )}

        {!error ? (
          <>
            <span>weather: {details?.weather?.[0].description}</span>
            <img
              src={`http://openweathermap.org/img/w/${details?.weather?.[0].icon}.png`}
            ></img>
            <div className={styles.weather}>
              <div>
                <img
                  src="https://static.thenounproject.com/png/1267447-200.png"
                  alt=""
                  className={styles.img}
                />
                <span>{details?.main?.temp}</span>
              </div>
              <div>
                <img
                  src="https://static.thenounproject.com/png/5239887-200.png"
                  alt=""
                  className={styles.img}
                />
                <span>{details?.main?.pressure}</span>
              </div>
              <div>
                <img
                  src="https://static.thenounproject.com/png/1401918-200.png"
                  alt=""
                  className={styles.img}
                />
                <span>{details?.main?.temp_max}</span>
              </div>
              <div>
                <img
                  src="https://static.thenounproject.com/png/1091685-200.png"
                  alt=""
                  className={styles.img}
                />
                <span>{details?.main?.temp_min}</span>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default WeatherApp;

