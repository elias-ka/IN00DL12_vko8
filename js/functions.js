const url = "https://api.openweathermap.org/data/2.5/weather?";
const icon_url = "https://openweathermap.org/img/wn/";
const api_key = "";

const temp_span = document.querySelector("#temp");
const speed_span = document.querySelector("#speed");
const direction_span = document.querySelector("#direction");
const description_span = document.querySelector("#description");
const icon_img = document.querySelector("img");

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      document.querySelector("#lat").innerHTML = lat.toFixed(3) + ", ";
      document.querySelector("#lng").innerHTML = lng.toFixed(3);
      getWeather(lat, lng);
    }),
      (error) => {
        alert(error);
      };
  } else {
    alert("Your browser does not support geolocation!");
  }
};

const getWeather = (lat, lng) => {
  const address = `${url}lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`;
  axios
    .get(address)
    .then((response) => {
      const json = response.data;
      console.log(json);
      temp_span.innerHTML = json.main.temp + "°C";
      speed_span.innerHTML = json.wind.speed + "m/s";
      direction_span.innerHTML = json.wind.deg + "°";
      description_span.innerHTML = json.weather[0].description;
      const img = icon_url + json.weather[0].icon + "@2x.png";
      icon_img.src = img;
    })
    .catch((error) => {
      alert(error);
    });
};

getLocation();
