"use strict";

// const sidebar = document.getElementById("sidebar");
// const sidebarHeader = document.querySelector(".sidebar-header");
// const navSideBar = document.querySelector(".list-unstyled");
// // const navs = document.querySelectorAll("li");

// navSideBar.addEventListener("click", function (e) {
//   const clicked = e.target.closest("li");
//   navs.forEach((e) => e.classList.remove("active"));
//   clicked.classList.add("active");
// });

// sidebarHeader.addEventListener("click", function (e) {
//   e.preventDefault();
//   sidebar.classList.toggle("active");
// });
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
const containerForm = document.getElementById("container-form");
const tableElBody = document.getElementById("tbody");
let breedArr = getFromStorage("breedArr");
let petArr = getFromStorage("petArr");
//Khi người dùng click vào nút Edit
function startEditPet(petId) {
  containerForm.classList.remove("hide");
  const pet = petArr.find((el) => el.id === petId);
  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = parseInt(pet.age);
  typeInput.value = pet.type;
  weightInput.value = parseInt(pet.weight);
  lengthInput.value = parseInt(pet.length);
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
  renderBreed();
  breedInput.value = pet.breed;
}
//Môĩ khi lạo thú cưng thay đổi bắt sự kiện change và render các breed trong breedInput
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
//Người dùng sau khi edit xong nhấn nút submit để lưu kết quả
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
  };

  const validate = validateData(data);
  if (validate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    data.date = petArr[index].date;
    data.bmi = petArr[index].bmi;
    //Dữ liệu trong form sau khi được edit sẽ lưu lại vào petArr có id của petArr trùng với id trong form edit
    petArr[index] = data;
    //Ẩn form sau khi đã edit xong
    containerForm.classList.add("hide");
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
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
                <td>${new Date(petArr[i].date).getDate()} /
                ${new Date(petArr[i].date).getMonth() + 1} /
                ${new Date(petArr[i].date).getFullYear()}
                </td>
                <td>
                  <button class="btn btn-warning" onclick="startEditPet('${
                    petArr[i].id
                  }')">Edit</button>
                </td>`;
    tableElBody.appendChild(row);
  }
};

const validateData = function (data) {
  if (data.name === "") {
    alert("Please enter name Pet!");
    return false;
  }
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
