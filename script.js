// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoicmluanVsYWhoIiwiYSI6ImNta2NtbmUyZjAyOTczZXNmazQ0YzFwbXYifQ.zH7crTXgOiyQas7lZDdj_w";
const map = new mapboxgl.Map({
  container: "map", // container element id
  style: "mapbox://styles/mapbox/light-v10",
  center: [-0.07888, 51.79597],
  zoom: 10
});
const data_url =
  "https://api.mapbox.com/datasets/v1/rinjulahh/cml6omb0hibi01omkooal5c6r/features?access_token=pk.eyJ1IjoicmluanVsYWhoIiwiYSI6ImNta2NtbmUyZjAyOTczZXNmazQ0YzFwbXYifQ.zH7crTXgOiyQas7lZDdj_w";

map.on("load", () => {
  map.addLayer({
    id: "crimes",
    type: "circle",
    source: {
      type: "geojson",
      data: data_url
    },
    paint: {
      "circle-radius": 10,
      "circle-color": "#eb4d4b",
      "circle-opacity": 0.9
    }
  });
  //Initialise the map filter
  filterMonth = ["==", ["get", "Month"], "2025-01"];
  filterType = ["!=", ["get", "Crime type"], "placeholder"];

  map.setFilter("crimes", ["all", filterMonth, filterType]);
  //Slider interaction code goes below
  document.getElementById("slider").addEventListener("input", (event) => {
    //Get the month value from the slider
    const month = parseInt(event.target.value);
    // get the correct format for the data
    if (month > 10) {
      formatted_month = "2024-" + ("0" + month).slice(-2);
    } else {
      formatted_month = "2025-" + ("0" + month).slice(-2);
    }
    //Create a filter
    filterMonth = ["==", ["get", "Month"], formatted_month];
    //set the map filter
    map.setFilter("crimes", ["all", filterMonth, filterType]);
    // update text in the UI
    document.getElementById("active-month").innerText = month;
  });
  //Radio button interaction code goes below
  //Radio button interaction code goes below
  document.getElementById("filters").addEventListener("change", (event) => {
    const type = event.target.value;
    console.log(type);
    // update the map filter
    if (type == "all") {
      filterType = ["!=", ["get", "Crime type"], "placeholder"];
    } else if (type == "shoplifting") {
      filterType = ["==", ["get", "Crime type"], "Shoplifting"];
    } else if (type == "drugs") {
      filterType = ["==", ["get", "Crime type"], "Drugs"];
    } else {
      console.log("error");
    }
    map.setFilter("crimes", ["all", filterMonth, filterType]);
  });
});
