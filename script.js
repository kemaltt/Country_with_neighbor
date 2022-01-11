const counteriesContainer = document.querySelector(".countries");

function renderCountry(data) {
    const content = `
   
    <div class="card country mx-auto " style="width: 18rem">
    <img class="country-image card-img-top" src="${data.flag}" alt="" />
    <div class="country-data card-body  ">
        <h5 class="country-name card-title">${data.name}</h5>
        <h6 class="country-name card-title">${data.region}</h6>
       
        <p class="country-row card-text"><span><i class="fas fa-2x fa-landmark"></i></span>${
          data.capital
        }</p>
        <p class="country-row card-text"><span><i class="fas fa-lg fa-users"></i></span>${(
          +data.population / 1_000_000
        ).toFixed(1)}M People</p>
        <p class="country-row card-text"><span><i class="fas fa-lg fa-comments"></i></span>${
          data.languages[0].name
        }</p>
        <p class="country-row card-text"><span><i class="fas fa-lg fa-money-bill-wave"></i></span>${
          data.currencies[0].name
        }  <strong>${data.currencies[0].symbol}</strong></p>
    </div>
</div>`;
    counteriesContainer.insertAdjacentHTML("beforeend", content);
    counteriesContainer.style.opacity = 1;
}

const countryBorders = async(countryCode) => {
    const data = await fetch(`https://restcountries.com/v2/alpha/${countryCode}`);
    const country = data.json();

    return country;
};

const getCountryData = async(country) => {
    fetch(`https://restcountries.com/v2/name/${country}`).then((res) => {
        //console.log(res)
        if (!res.ok) throw new Error(`Country not found ${res.status}`);
        return res.json();
    });
    //     .then((response) => {
    //         console.log(response[0]);
    //         renderCountry(response[0]);
    //         const neighbour = response[0].borders;
    //         console.log(neighbour);
    //         for (let i = 0; i < neighbour.length; i++) {
    //             return fetch(`https://restcountries.com/v2/alpha/${neighbour[i]}`);
    //         }
    //     })

    // .then((data) => data.json())
    //     .then((neighbour) => renderCountry(neighbour))
    //     .catch((err) => console.log(err.message));

    const { data } = await axios(`https://restcountries.com/v2/name/${country}`);

    console.log(data);
    const countryData = data[0];
    console.log(countryData);
    renderCountry(countryData);

    const neighbour = data[0].borders;

    neighbour.forEach(async(border) => {
        const land = await countryBorders(border);

        renderCountry(land);
    });
};
// getCountryData("turkey");

const searchBtn = document.querySelector(".btn");
console.log(searchBtn);
const inputText = document.querySelector("#input");
console.log(inputText);
const tryAgain = document.querySelector(".try-again");

searchBtn.addEventListener("click", () => {
    const countryVal = inputText.value.toLowerCase().trim();
    console.log(countryVal);
    getCountryData(countryVal);
    console.log(span);
    tryAgain.innerHTML = ` <a style="color: greenyellow" href="./index.html"> Try another </a>`;
});

inputText.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        const countryVal = inputText.value.toLowerCase().trim();
        getCountryData(countryVal);
        console.log(countryVal);
        tryAgain.innerHTML = ` <a style="color: greenyellow;" href="./index.html"> Try another</a>`;
        // inputText.value = "";
    }
});