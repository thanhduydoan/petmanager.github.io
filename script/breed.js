"use strict";

const inputBreed = document.querySelector("#input-breed");
const inputBreedType = document.querySelector("#input-type");
const btnSubmit = document.querySelector("#submit-btn");
const tbodyEl = document.querySelector("#tbody");
let breedArr = getFromStorage("breedArr", []);
renderTableBreed(breedArr);
btnSubmit.addEventListener("click", function () {
  const data = {
    breed: inputBreed.value,
    type: inputBreedType.value,
  };
  const isValidate = validate(data);
  if (isValidate) {
    breedArr.push(data);
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);
    clearInputBreed();
  }
});
function validate(data) {
  let isValidate = true;
  if (data.breed.trim().length === 0) {
    alert("Please input for breed");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Please choose Type");
    isValidate = false;
  }
  return isValidate;
}

function clearInputBreed() {
  inputBreed.value = "";
  inputBreedType.value = "Select Type";
}

function renderTableBreed() {
  tbodyEl.innerHTML = "";
  breedArr.forEach((breedItem, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td scope="col">${index + 1}</td>
                <td scope="col">${breedItem.breed}</td>
                <td scope="col">${breedItem.type}</td>
               <td scope="col"><button type='button' onclick='deleteBreed("${
                 breedItem.breed
               }")' class='btn btn-danger'>Delete</button></td>
`;
    tbodyEl.appendChild(row);
  });
}

function deleteBreed(breed) {
  const isDelete = confirm("Are you sure you want to delete");
  if (isDelete) {
    breedArr.forEach((item, index) => {
      if (breed === item.breed) {
        breedArr.splice(index, 1);
        saveToStorage("breedArr", breedArr);
        renderTableBreed();
      }
    });
  }
}
renderTableBreed(breedArr);
//Toggle sidebar
const sidebar = document.getElementById("sidebar");
const sidebarHeader = document.querySelector(".sidebar-header");
const navSideBar = document.querySelector(".list-unstyled");
const navs = document.querySelectorAll("li");

navSideBar.addEventListener("click", function (e) {
  const clicked = e.target.closest("li");
  navs.forEach((e) => e.classList.remove("active"));
  clicked.classList.add("active");
});

sidebarHeader.addEventListener("click", function (e) {
  sidebar.classList.toggle("active");
});
