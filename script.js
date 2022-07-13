let recepies = document.getElementById("recepies");
let searchbtn = document.getElementById("searchbtn");
let searchByArea = document.getElementById("searchByArea");
let closebtn = document.getElementById("closebtn");

// SEARCH BUTTON
searchbtn.addEventListener("click", () => {
  let input = document.getElementById("searchfield").value.trim();
  getResponse(input);
});
// CLOSE BUTTON
closebtn.addEventListener("click", () => {
  closebtn.parentElement.parentElement.style.display = "none";
});
// SEARCH BY AREA BUTTON
searchByArea.addEventListener("click", () => {
  let searchByArea = document.getElementById("searchByArea");
  let searchByAreaDropdown = document.getElementById("searchByAreaDropdown");
  let url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

  if (
    document.getElementById("searchByArea").getAttribute("aria-expanded") ==
    "false"
  ) {
    // console.log('clicked');
    searchByArea.classList.add("show");
    searchByArea.setAttribute("aria-expanded", "true");
    searchByAreaDropdown.classList.add("show");
    searchByAreaDropdown.style =
      "position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 40px);";
    searchByAreaDropdown.setAttribute("data-popper-placement", "bottom-start");
    fetch(url, { method: "GET" })
      .then((response) => response.text())
      .then((text) => {
        let data = JSON.parse(text).meals;
        // console.log(data);
        let li = "";
        data.forEach((element, index) => {
          let area = element.strArea;
          li += `<li onclick="getResponsebyArea(area${index}.innerText)"><a id="area${index}" class="dropdown-item" href="#">${area}</a></li>
                        `;
          searchByAreaDropdown.innerHTML = li;
          // console.log(element.strArea);
        });
      });
  } else {
    searchByArea.classList.remove("show");
    searchByArea.setAttribute("aria-expanded", "false");
    searchByAreaDropdown.classList.remove("show");
    searchByAreaDropdown.style = "none";
    searchByAreaDropdown.removeAttribute("data-popper-placement");
  }
});
// SEARCH BY CATEGORY BUTTON
searchByCategory.addEventListener("click", () => {
  let searchByCategory = document.getElementById("searchByCategory");
  let searchByCategoryDropdown = document.getElementById(
    "searchByCategoryDropdown"
  );
  let url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

  if (
    document.getElementById("searchByCategory").getAttribute("aria-expanded") ==
    "false"
  ) {
    searchByCategory.classList.add("show");
    searchByCategory.setAttribute("aria-expanded", "true");
    searchByCategoryDropdown.classList.add("show");
    searchByCategoryDropdown.style =
      "position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 40px);";
    searchByCategoryDropdown.setAttribute(
      "data-popper-placement",
      "bottom-start"
    );
    fetch(url, { method: "GET" })
      .then((response) => response.text())
      .then((text) => {
        let data = JSON.parse(text).meals;
        // console.log(data);
        let li = "";
        data.forEach((element, index) => {
          let category = element.strCategory;
          li += `<li onclick="getResponsebyCategory(category${index}.innerText)"><a id="category${index}" class="dropdown-item" href="#">${category}</a></li>
                        `;
          searchByCategoryDropdown.innerHTML = li;
          // console.log(element.strCategory);
        });
      });
  } else {
    searchByArea.classList.remove("show");
    searchByArea.setAttribute("aria-expanded", "false");
    searchByAreaDropdown.classList.remove("show");
    searchByAreaDropdown.style = "none";
    searchByAreaDropdown.removeAttribute("data-popper-placement");
  }
});

function getResponse(input) {
  console.log("clicked");
  let data;
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
  fetch(url, { method: "GET" })
    .then((response) => response.text())
    .then((text) => {
      data = JSON.parse(text);
      console.log(data);
      if (data.meals) {
        let html = "";
        data.meals.forEach((element, index) => {
          html += `<div class="card m-3 px-0" style="width: 18rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                    <h5 class="card-title my-2 fw-bold">${element.strMeal}</h5>
                    <button onclick="getRecepieDetail(${element.idMeal})" id="${index}" class="btn btn-orange my-2" type="button" >Get Recepies</button>
                    </div>
                        </div>
                        `;
        });
        recepies.innerHTML = html;
      } else
        recepies.innerHTML = `<h2 class="text-center orange">No ingredients Fonund</h2>`;
    });
}

function getResponsebyArea(input) {
  console.log("clicked");
  let data;

  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${input}`;
  fetch(url, { method: "GET" })
    .then((response) => response.text())
    .then((text) => {
      data = JSON.parse(text);
      console.log(data);
      if (data.meals) {
        let html = "";
        data.meals.forEach((element, index) => {
          html += `<div class="card m-3 px-0" style="width: 18rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                    <h5 class="card-title my-2 fw-bold">${element.strMeal}</h5>
                    <button onclick="getRecepieDetail(${index})" id="${index}" class="btn btn-orange my-2" type="button" >Get Recepies</button>
                    </div>
                        </div>
                        `;
        });
        recepies.innerHTML = html;
      } else
        recepies.innerHTML = `<h2 class="text-center orange">No ingredients Fonund</h2>`;
    });
}

function getResponsebyCategory(input) {
  // console.log('clicked');
  let data;
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`;
  fetch(url, { method: "GET" })
    .then((response) => response.text())
    .then((text) => {
      data = JSON.parse(text);
      console.log(data);
      if (data.meals) {
        let html = "";
        data.meals.forEach((element, index) => {
          html += `<div class="card m-3 px-0" style="width: 18rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                    <h5 class="card-title my-2 fw-bold">${element.strMeal}</h5>
                    <button onclick="getRecepieDetail(${index},${element.idMeal})" id="${index}" class="btn btn-orange my-2" type="button" >Get Recepies</button>
                    </div>
                        </div>
                        `;
        });
        recepies.innerHTML = html;
      } else
        recepies.innerHTML = `<h2 class="text-center orange">No ingredients Fonund</h2>`;
    });
}

function getRecepieDetail(id) {
  console.log(id);
  let mealdetails = document.getElementById("meal-details");
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  mealdetails.style.display = "block";
  // console.log(document.getElementById(input).parentElement.parentElement);

  fetch(url, { method: "GET" })
    .then((response) => response.text())
    .then((text) => {
      let data = JSON.parse(text);
      // console.log(data.meals[0].strMeal);
      document.getElementById("mealTitle").innerText = data.meals[0].strMeal;
      document.getElementById("categoryTitle").innerText =
        data.meals[0].strCategory;
      document.getElementById("details").innerText =
        data.meals[0].strInstructions;
      document
        .getElementById("mealImage")
        .setAttribute("src", data.meals[0].strMealThumb);
    });
}
