// Track which breweries are favorited (heart icon) by user
var favList = [];

// Get data, create & populate cards with modals
const container = document.querySelector("#container");
getData();

function getData() {
  favList = [];
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        container.innerHTML += `<div class="card">
                <div class="image-wrapper">
                    <img class="imageUrl imageAlt" src="${
                      data[i].imageUrl
                    }" alt="${data[i].imageAlt}">
                </div>
                <h1 class="title">${data[i].title}</h1>
                <div class="card-details">
                    <span class="material-icons">
                      <a href="${data[i].website}"}>sports_bar</a></span>
                    <span class="material-icons" id="icon-${
                      data[i].id
                    }" data-icon-target="#icon-${
          data[i].id
        }">favorite_border</span>
                </div>
                <p class="description">${data[i].description}</p>
                <button data-modal-target="#modal-${
                  data[i].id
                }" class="details-btn">Details</button>
            </div>

            <div class="modal" id="modal-${data[i].id}">
                <div class="modal-header">
                    <div class="title">${data[i].title}</div>
                    <button data-close-button class="close-button">&times;</button>
                </div>
                <div class="modal-body">
                    <ul class="details-list">
                        <li><span>Address: </span>${data[i].address}</li>
                            <div class="google-map">
                                <iframe src="${
                                  data[i].location
                                }" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        <li><span>Hours: </span>
                            <ul>
                                ${getHours(data[i].hours)}
                            </ul>
                        <li><span>Website: </span><a href="${
                          data[i].website
                        }">${data[i].website}</a></li>
                        <li><span>Phone: </span>${data[i].phone}</li>
                    </ul>
                </div>
            </div> 
            `;
      }
    })
    .then(() => {
      const openModalButtons = document.querySelectorAll("[data-modal-target]");
      const closeModalButtons = document.querySelectorAll(
        "[data-close-button]"
      );
      const overlay = document.getElementById("overlay");

      const toggleFavoriteIcons =
        document.querySelectorAll("[data-icon-target]");
      toggleFavoriteIcons.forEach((favicon) => {
        const icon = document.querySelector(favicon.dataset.iconTarget);
        favicon.addEventListener("click", () => {
          toggleFavorite(icon);
        });
        checkLocalStorage(icon);
      });

      openModalButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const modal = document.querySelector(button.dataset.modalTarget);
          openModal(modal);
        });
      });

      overlay.addEventListener("click", () => {
        const modals = document.querySelectorAll(".modal.active");
        modals.forEach((modal) => {
          closeModal(modal);
        });
      });

      closeModalButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const modal = button.closest(".modal");
          closeModal(modal);
        });
      });
    });
}

function getHours(hrs) {
  let hours = "";
  for (let i = 0; i < hrs.length; i++) {
    hours += `<li>${hrs[i]}</li>`;
  }
  return hours;
}

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// Toggle heart icon style based on user clicking icon to favorite or unfavorite an item
// Store selections in local storage - populate favorites list based on local storage data
function toggleFavorite(icon) {
  if (icon.innerHTML === "favorite_border") {
    icon.innerHTML = "favorite";
    localStorage.setItem(icon.id, true);
    favList.push(icon.id.substring(5));
  } else {
    icon.innerHTML = "favorite_border";
    localStorage.removeItem(icon.id);
    let index = favList.indexOf(icon.id.substring(5));
    if (index > -1) {
      favList.splice(index, 1); // remove array element
    }
  }
}

// Check if brewery is favorited or not to display filled or unfilled heart icon
// Add favorited items to favorites list
function checkLocalStorage(icon) {
  const status = localStorage.getItem(icon.id);
  if (status == null) {
    icon.innerHTML = "favorite_border";
  } else {
    icon.innerHTML = "favorite";
    // store number of id only
    favList.push(icon.id.substring(5));
  }
}

function displayFavorites() {
  const favBtn = document.querySelector("#showFavBtn");
  const allBtn = document.querySelector("#viewAllBtn");
  favBtn.style.display = "none";
  allBtn.style.display = "inline";
  container.innerHTML = "";
  numFavs = favList.length;
  if (numFavs > 0) {
    for (var i = 0; i < favList.length; i++) {
      getFavData(favList[i]);
    }
  } else {
    container.innerHTML =
      "<p>No favorites selected. View All and click the heart icon to add favorites.</p>";
  }
}

function displayAll() {
  const favBtn = document.querySelector("#showFavBtn");
  const allBtn = document.querySelector("#viewAllBtn");
  favBtn.style.display = "inline";
  allBtn.style.display = "none";
  container.innerHTML = "";
  getData();
}

function getFavData(fav) {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == fav) {
          container.innerHTML += `<div class="card">
                <div class="image-wrapper">
                    <img class="imageUrl imageAlt" src="${
                      data[i].imageUrl
                    }" alt="${data[i].imageAlt}">
                </div>
                <h1 class="title">${data[i].title}</h1>
                <div class="card-details">
                    <span class="material-icons">
                      <a href="${data[i].website}"}>sports_bar</a></span>
                    <span class="material-icons" id="icon-${
                      data[i].id
                    }" data-icon-target="#icon-${
            data[i].id
          }">favorite_border</span>
                </div>
                <p class="description">${data[i].description}</p>
                <button data-modal-target="#modal-${
                  data[i].id
                }" class="details-btn">Details</button>
            </div>

            <div class="modal" id="modal-${data[i].id}">
                <div class="modal-header">
                    <div class="title">${data[i].title}</div>
                    <button data-close-button class="close-button">&times;</button>
                </div>
                <div class="modal-body">
                    <ul class="details-list">
                        <li><span>Address: </span>${data[i].address}</li>
                            <div class="google-map">
                                <iframe src="${
                                  data[i].location
                                }" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        <li><span>Hours: </span>
                            <ul>
                                ${getHours(data[i].hours)}
                            </ul>
                        <li><span>Website: </span><a href="${
                          data[i].website
                        }">${data[i].website}</a></li>
                        <li><span>Phone: </span>${data[i].phone}</li>
                    </ul>
                </div>
            </div> 
            `;
        }
      }
    })
    .then(() => {
      const openModalButtons = document.querySelectorAll("[data-modal-target]");
      const closeModalButtons = document.querySelectorAll(
        "[data-close-button]"
      );
      const overlay = document.getElementById("overlay");

      const toggleFavoriteIcons =
        document.querySelectorAll("[data-icon-target]");
      toggleFavoriteIcons.forEach((favicon) => {
        const icon = document.querySelector(favicon.dataset.iconTarget);
        favicon.addEventListener("click", () => {
          toggleFavorite(icon);
        });
        checkLocalStorage(icon);
      });

      openModalButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const modal = document.querySelector(button.dataset.modalTarget);
          openModal(modal);
        });
      });

      overlay.addEventListener("click", () => {
        const modals = document.querySelectorAll(".modal.active");
        modals.forEach((modal) => {
          closeModal(modal);
        });
      });

      closeModalButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const modal = button.closest(".modal");
          closeModal(modal);
        });
      });
    });
}
