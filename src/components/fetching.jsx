export const fetchLocation = (city) => {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=1db78f5e7c1ac5b1aafacddbc0e4e54c`
  ).then((res) => res.json())
};

export const fetchWeather = (lati, long) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=1db78f5e7c1ac5b1aafacddbc0e4e54c`
  ).then((res) => res.json())
};

