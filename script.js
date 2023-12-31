const createBtn = document.querySelector(".create-todo-btn");
const getList = document.querySelector(".todos");
const inputField = document.querySelector(".create-todo-text");
let deleteBtn = document.querySelectorAll(".delete-btn");

const numberListOpen = document.querySelector(".todo-open");
const numberListClosed = document.querySelector(".todo-done");

// List items
let allOpenListItems = document.querySelectorAll(".item-open");
let allDoneListItems = document.querySelectorAll(".item-done");
let localStorageArray = [];
let getStorageList;

createBtn.addEventListener("click", createTodo);
init();
function createTodo() {
  if (inputField.value.length == "") {
    return;
  }
  let li = document.createElement("li");
  li.classList.add("todo-item", "item-open");
  li.innerHTML = `
    <h4>${inputField.value}</h4><button class="delete-btn">Löschen</button>
  `;

  getList.appendChild(li);
  li.style.opacity = "0";
  li.style.transform = "translateX(-50%)";
  setTimeout(function () {
    li.style.transform = "translateX(0)";
    li.style.opacity = "1";
  }, 200);
  inputField.value = "";

  update();
}

function deleteTodo(button) {
  button.target.offsetParent.style.transform = "translateX(50%)";
  button.target.offsetParent.style.opacity = "0";
  setTimeout(function () {
    button.target.offsetParent.remove();
    update();
  }, 200);
}

function update() {
  deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", deleteTodo)
  );

  // Anzeige für offene Todo's
  allOpenListItems = document.querySelectorAll(".item-open");
  if (allOpenListItems.length === 0) {
    numberListOpen.innerHTML = `Keine offenen Einträge`;
  } else {
    numberListOpen.innerHTML = `Offen (${allOpenListItems.length})`;
  }

  // Anzeige für abgeschlossene Todo's
  allDoneListItems = document.querySelectorAll(".item-done");
  if (allDoneListItems.length === 0) {
    numberListClosed.innerHTML = `Keine abgeschlossenen Einträge`;
  } else {
    numberListClosed.innerHTML = `Abgeschlossen (${allDoneListItems.length})`;
  }
  saveInLocalstorage();
}

function init() {
  let allOpenItems = 0;
  let allClosedItems = 0;

  deleteBtn.forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", deleteTodo)
  );

  if (!localStorage.getItem("openItems"))
    localStorage.setItem("openItems", JSON.stringify(localStorageArray));
  openFromLocalstorage();
  update();
}

function sortList() {
  let ul = document.querySelector(".todos");
  Array.from(ul.getElementsByTagName("LI"))
    .sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach((li) => ul.appendChild(li));
}

function saveInLocalstorage() {
  let li = document.querySelectorAll(".item-open");

  if (localStorageArray !== 0) {
    for (const elem of li) {
      localStorageArray.push(elem.getElementsByTagName("h4")[0].textContent);
    }
  }
  localStorage.setItem("openItems", JSON.stringify(localStorageArray));
  localStorageArray = [];
}

function openFromLocalstorage() {
  getStorageList = JSON.parse(localStorage.getItem("openItems"));
  for (const openListItem of getStorageList) {
    let li = document.createElement("li");
    li.classList.add("todo-item", "item-open");
    li.innerHTML = `
        <h4>${openListItem}</h4><button class="delete-btn">Löschen</button>
      `;
    getList.appendChild(li);
  }
}
