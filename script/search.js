"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const btnFind = document.getElementById("find-btn");
const tbody = document.getElementById("tbody");
const containerForm = document.getElementById("container-form");
let breedArr = getFromStorage("breedArr");
let petArr = getFromStorage("petArr");
let petArrFind = petArr;

// btnFind.addEventListener("click", function () {
//   petArrFind = petArr; // lấy tất cả các thú cưng ban đầu

//   const filters = [
//     (pet) => !idInput.value || pet.id.includes(idInput.value), // nếu idInput không có giá trị thì bỏ qua điều kiện này
//     (pet) => !nameInput.value || pet.name.includes(nameInput.value),
//     (pet) =>
//       breedInput.value === "Select Breed" || pet.breed === breedInput.value, // nếu breedInput là "Select Breed" thì bỏ qua điều kiện này
//     (pet) => typeInput.value === "Select Type" || pet.type === typeInput.value,
//     (pet) => !vaccinatedInput.checked || pet.vaccinated,
//     (pet) => !dewormedInput.checked || pet.dewormed,
//     (pet) => !sterilizedInput.checked || pet.sterilized,
//   ];

//   petArrFind = petArrFind.filter((pet) => filters.every((f) => f(pet))); // áp dụng tất cả các điều kiện

//   renderTableData(petArrFind);
// });
btnFind.addEventListener("click", function () {
  petArrFind = petArr;

  if (idInput.value && petArrFind) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }
  if (nameInput.value && petArrFind) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }
  if (breedInput.value !== "Select Breed" && petArrFind) {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }
  if (typeInput.value !== "Select Type" && petArrFind) {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }
  if (vaccinatedInput.checked === true && petArrFind) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  if (dewormedInput.checked === true && petArrFind) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  if (sterilizedInput.checked === true && petArrFind) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }

  renderTableData(petArrFind);
});

function renderAllBreed() {
  breedArr.forEach((breedItem) => {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
renderAllBreed();

function renderTableData(petArr) {
  tbody.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope='row'>${pet.id}</th>
        <td>${pet.name}</td>
        <td>${pet.age}</td>
        <td>${pet.type}</td>
        <td>${pet.weight} kg</td>
        <td>${pet.length} cm</td>
        <td>${pet.breed}</td>
       <td>
                  <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
                </td>
                <td><i class="bi ${
                  pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
                }"></i></td>
                 <td>${new Date(pet.date).getDate()} /
                ${new Date(pet.date).getMonth() + 1} /
                ${new Date(pet.date).getFullYear()}
                </td>
        `;
    tbody.appendChild(row);
  });
}

typeInput.addEventListener("change", renderBreed);
function renderBreed() {
  breedInput.innerHTML = ` <option>Select Breed</option>`;
  // Lọc ra các giống chó nếu lựa chọn là "Dog"
  if (typeInput.value === "Dog") {
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    // Thêm các tùy chọn mới của giống chó vào ô chọn giống
    breedDogs.forEach((dog) => {
      const option = document.createElement("option");
      option.textContent = dog.breed;
      breedInput.appendChild(option);
    });
  }
  // Lọc ra các giống mèo nếu lựa chọn là "Cat"
  else if (typeInput.value === "Cat") {
    const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    // Thêm các tùy chọn mới của giống mèo vào ô chọn giống
    breedCats.forEach((cat) => {
      const option = document.createElement("option");
      option.textContent = cat.breed;
      breedInput.appendChild(option);
    });
  }
}
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
  e.preventDefault();
  sidebar.classList.toggle("active");
});
