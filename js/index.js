const loadCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => displayCountries(data))
};
loadCountries();
const displayCountries = (countries) => {
    countries.forEach(country => {
        const countyName = country.name.common;
        // console.log(country)
        const countriesContainer = document.getElementById('countries');
        const div = document.createElement('div');
        div.classList.add('country');
        div.innerHTML = `
        <h3>${countyName}</h3>
        <p>${country.capital}</p>
        <button onclick="getDetail('${countyName}')">Detail</button>
        `;
        countriesContainer.appendChild(div);
    })
}
const getDetail = (name) => {
    const url = `https://restcountries.com/v3.1/name/${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountryDetail(data[0]))
    // console.log(url)
}
const displayCountryDetail = (country) => {
    const countryDiv = document.getElementById('country2');
    countryDiv.innerHTML = `
    <h5>name: ${country.name.common}</h5>
    <h6>capital: ${country.capital}
    <p>population: ${country.population}</p>
    
    flag:
    <img width="100px" src="${country.flags.png}">
    `;
    console.log(country)
    // countryDiv.innerText = country.name.common;
}

//********************************************************* */
const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    if (searchText == '') {
        // please write something to display
    }
    else {
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data.meals)
        }
        catch (error) {
            console.log(error);
        }

        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => displaySearchResult(data.meals));
    }

}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (meals.length == 0) {
        // show no result found;
    }
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadMealDetail = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
    `;
    mealDetails.appendChild(div);
} 