"use strict";
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const calcBtn = document.getElementById("calc-btn");
const tableElBody = document.getElementById("tbody");
// let petArr = JSON.parse(localStorage.getItem("petArr"));
let breedArr = getFromStorage("breedArr", []);
let petArr = getFromStorage("petArr", []);

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
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
    date: new Date(),
  };

  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    saveToStorage("petArr", petArr);
    clearInput();
    renderTableData(petArr);
  }
});
let healthyCheck = false;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    const heathyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        heathyPetArr.push(petArr[i]);
      }
    }
    renderTableData(heathyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

const renderTableData = function (petArr) {
  tableElBody.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petArr[i].id}</th>
                <td>${petArr[i].name}</td>
                <td>${petArr[i].age}</td>
                <td>${petArr[i].type}</td>
                <td>${petArr[i].weight}</td>
                <td>${petArr[i].length}</td>
                <td>${petArr[i].breed}</td>
                <td>
                  <i class="bi bi-square-fill" style="color: ${
                    petArr[i].color
                  }"></i>
                </td>
                <td><i class="bi ${
                  petArr[i].vaccinated
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].dewormed
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td><i class="bi ${
                  petArr[i].sterilized
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }"></i></td>
                <td>${petArr[i].bmi}</td>
                <td>${new Date(petArr[i].date).getDate()} /
                ${new Date(petArr[i].date).getMonth() + 1} /
                ${new Date(petArr[i].date).getFullYear()}
                </td>
                <td>
                  <button class="btn btn-danger" onclick="deletePet('${
                    petArr[i].id
                  }')">Delete</button>
                </td>`;
    tableElBody.appendChild(row);
  }
};
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
      }
    }
  }
};
// Xoá dữ liệu sau khi đã nhập xong
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "Input Weight";
  lengthInput.value = "Input Length";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

const validateData = function (data) {
  if (data.id === "") {
    alert("Please enter ID!");
    return false;
  }
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      return false;
    }
  }
  // Kiểm tra giá trị của trường Age
  if (data.age === "") {
    alert("Please enter Age!");
    return false;
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }

  // Kiểm tra giá trị của trường Weight
  if (data.weight === "") {
    alert("Please enter Weight!");
    return false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }

  // Kiểm tra giá trị của trường Length
  if (data.length === "") {
    alert("Please enter Length!");
    return false;
  } else if (data.length < 1 || data.ength > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }

  // Kiểm tra xem trường Type có được chọn hay không
  if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }

  // Kiểm tra xem trường Breed có được chọn hay không
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }

  // Nếu dữ liệu hợp lệ, trả về true để submit form
  return true;
};

calcBtn.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type === "Dog"
        ? ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2)
        : ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
  }
  renderTableData(petArr);
});
renderTableData(petArr);

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
// console.log(breedArr);
