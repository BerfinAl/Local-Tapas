const itemInput = document.querySelector("input[type=text]");
const tapasList = document.querySelector(".tapas-list");
const addBtn = document.querySelector("button");

let items = JSON.parse(localStorage.getItem("items")) || [];
let toBeRemovedTapas = [];

function showTapas() {
  if (items.length > 0) {
    tapasList.innerHTML = items
      .map((item ,index) => {
        return `  
        <div> 
            <input type="checkbox" name="${item}" id="${index}">
            <label for="${index}"> ${item} </label>
            <hr>
        </div>
`;
      })
      .join(" ");
  } else {
    tapasList.innerHTML = ` <p><i> Add Tapas </i></p> <hr/>`;
  }
}

if (items.length !== 0) window.addEventListener("load", showTapas);

itemInput.addEventListener("change", (e) => {
  items.push(e.target.value);
  e.target.value = "";
});

function addItem() {
  localStorage.setItem("items", JSON.stringify(items));
  showTapas();
}

itemInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addItem();
});

function chooseTapas(e) {
  if (e.target.tagName === "LABEL" || e.target.tagName === "INPUT") {
    if (e.target.checked === true) {
      toBeRemovedTapas.push(e.target.name);
    } else if (e.target.checked !== true) {
      const index = toBeRemovedTapas.indexOf(e.target.name);
      if (index > -1) toBeRemovedTapas.splice(index, 1);
    }
  }
  addBtn.innerText =
    toBeRemovedTapas.length > 0 ? "Delete Item(s)" : "+ Add Item";
  return toBeRemovedTapas;
}

tapasList.addEventListener("click", chooseTapas);

addBtn.addEventListener("click", () => {
  if (addBtn.innerText === "+ Add Item") addItem();
  if (addBtn.innerText === "Delete Item(s)") {
    items = items.filter((item) => !toBeRemovedTapas.includes(item));
    addItem();
  }
});
