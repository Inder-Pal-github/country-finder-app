const url = "https://restcountries.com/v3.1/all";

const sort_population = document.getElementById("sort_population");
const filter_region = document.getElementById("filter_region");
const all_countries = document.getElementById("all_countries");

window.addEventListener("load", () => {
  FetchData();
});

function FetchData() {
  fetch(`${url}`)
    .then((res) => res.json())
    .then((data) => displayData(data))
    .catch((err) => console.log(err));
}

const displayData = (data) => {
  all_countries.innerHTML = "";
  data?.length > 0 &&
    data?.map((ele) => {
      const box = document.createElement("div");

      const name = document.createElement("h3");
      name.innerText = ele.name.common;

      const img = document.createElement("img");
      img.src = ele.flags.png;

      const population = document.createElement("p");
      population.innerText = ele.population;

      const region = document.createElement("p");
      region.innerText = ele.region;

      const capital = document.createElement("p");
      capital.innerText = ele.capital;

      box.append(name, img, population, region, capital);

      all_countries.appendChild(box);
    });
};

function handleSortByPopulation(order) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (order === "asc") {
        data.sort((a, b) => {
          if (a.population < b.population) return 1;
          if (a.population > b.population) return -1;
          if (a.population === b.population) return 0;
        });
      } else {
        data.sort((a, b) => {
          if (a.population > b.population) return 1;
          if (a.population < b.population) return -1;
          if (a.population === b.population) return 0;
        });
      }
      displayData(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

sort_population.addEventListener("change", (e) => {
  handleSortByPopulation(e.target.value);
});
filter_region.addEventListener("change", (e) => {
  console.log(e.target.value);
});
// Country name(h3 tag) (data.name.common)
// Image of flag(img tag) (data.flags.png)
// Population(p tag) (data.population)
// Region(p tag) (data.region)
// Capital(p tag) (data.capital)
