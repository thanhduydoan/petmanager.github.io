"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultValue) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}
//Lấy dữ liệu từ petArr
//saveToStorage("petArr", [data3, data4]);
// const petArr = getFromStorage("petArr", [data3, data4]);

//Lấy dữ liệu từ breedArr
//saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
// const breedArr = getFromStorage("breedArr", [breed1, breed2, breed3, breed4]);
// console.log(breedArr);
// console.log(petArr);
