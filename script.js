//fetching Data From External File
async function getData(defaultCityCity) {
  let data = await fetch("./cities.json");
  let dataJson = await data.json();
  let sortedCitiesList = dataJson.sort((a, b) =>
    a.English.localeCompare(b.English)
  );

  addCitiesAsOption(sortedCitiesList, defaultCityCity);
}

function addCitiesAsOption(cities, defaultCity) {
  let content = "";
  for (const city of cities) {
    if (city.English == defaultCity) {
      content += `<option selected>${city.English}</option>`;
    } else {
      content += `<option>${city.English}</option>`;
    }
    document.getElementById("citySelect").innerHTML = content;
  }
}

function GetAdhan(CityName) {
  getData(CityName);
  let Params = {
    country: "MA",
    city: CityName,
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: Params,
    })
    .then((response) => {
      let PrayerTime = response.data.data.timings;
      let content = `
        <div class="adhanbox">
            <h3>Fajr</h3>
            <div><h1>${PrayerTime.Fajr}</h1></div>
        </div>
        <div class="adhanbox">
            <h3>Sunrise</h3>
            <div><h1>${PrayerTime.Sunrise}</h1></div>
        </div>
        <div class="adhanbox">
            <h3>Dhuhr</h3>
            <div><h1>${PrayerTime.Dhuhr}</h1></div>
        </div>
        <div class="adhanbox">
            <h3>Asr</h3>
            <div><h1>${PrayerTime.Asr}</h1></div>
        </div>
        <div class="adhanbox">
            <h3>Maghrib</h3>
            <div><h1>${PrayerTime.Maghrib}</h1></div>
        </div>
        <div class="adhanbox">
            <h3>Isha</h3>
            <div><h1>${PrayerTime.Isha}</h1></div>
        </div>
    `;
      let date = response.data.data.date.readable;
      document.getElementById("CityInfo").innerHTML = CityName;
      document.getElementById("DateInfo").innerHTML = date;
      document.getElementById("Salaatinfo").innerHTML = content;
    })
    .catch((error) => {
      alert(error);
    });
}
document.getElementById("citySelect").addEventListener("change", () => {
  let citySelected = document.getElementById("citySelect").value;
  GetAdhan(citySelected);
});

GetAdhan("Casablanca");
