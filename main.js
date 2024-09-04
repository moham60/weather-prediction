const search = document.getElementById("search");
async function api() {
  search.addEventListener("click", async function () {
    const apiKey = "6ae6800ddaea110db0df8c6ce4812126";
    const city = storeInput();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      if (!response.ok) {
        // If the city is not found or an error occurs in the response
        throw new Error("City not found");
      } else {
        const degree = document.querySelector(".text-status");
        const wind = document.getElementById("wind");
        const humidity = document.getElementById("humidity");
        const img = document.getElementsByClassName("img")[0];
        const visibility = document.getElementById("visibility");
        const boxes = document.querySelectorAll(".boxes>div");
        console.log(data);
        for (let i = 0; i < boxes.length; i++) {
          boxes[i].style.display = "flex";
        }
        degree.innerHTML = `<div data-aos="fade-up" data-aos-duration="1500">${data.main.temp}&#176 Celsuis<p data-aos="fade-up" data-aos-duration="1500">${data.name}</p></div>`;

        humidity.innerHTML = `<div data-aos="zoom-in" data-aos-duration="1500">${data.main.humidity}%</div>`;
        visibility.innerHTML = `<div data-aos="zoom-in" data-aos-duration="1500">${
          data.visibility / 1000
        }KM</div>`;
        console.log(img);
        const sta = data.weather[0].main;
        if (sta === "Clear") {
          img.innerHTML = ` <img style="width:60%" src="./images/clear.png" data-aos="fade-up" data-aos-duration="1500" alt="" />`;
        } else if (sta === "Clouds") {
          img.innerHTML = ` <img style="width: 60%" src="./images/clouds.png" data-aos="fade-up" data-aos-duration="1500" alt="" />`;
        } else if (sta === "drizzle") {
          img.innerHTML = ` <img style="width: 60%" src="./images/drizzle.png" data-aos="fade-up" data-aos-duration="1500" alt="" />`;
        } else if (sta === "mist") {
          img.innerHTML = ` <img style="width: 60%" src="./images/mist.png" data-aos="fade-up" data-aos-duration="1500" alt="" />`;
        } else if (sta === "snow") {
          img.innerHTML = ` <img style="width: 60%" src="./images/snow.png" data-aos="fade-up" data-aos-duration="1500" alt="" />`;
        } else {
          img.innerHTML = ` <img style="width: 60%" src="./images/rain.png" data-aos="fade-up" data-aos-duration="1500" alt="" />`;
        }
        wind.innerHTML = `${data.wind.speed}`;
        document.getElementById("city").value = "";
      }
    } catch (error) {
      // Show an alert if the city is not available
      alert("City not found. Please enter a valid city name.");
    }
  });
}
api();
function storeInput() {
  const inputValue = document.getElementById("city").value;

  return inputValue;
}
