let todos = [];
const btnSend = document.querySelector("#btnSend");
const inputNameTask = document.querySelector("#name");
const authorNameTask = document.querySelector("#pass");
const selectTask = document.querySelector("#select");
const listTaskPage = document.querySelector(".list_task");
const errText = document.querySelector(".text_err");
const todosTaskLocalStorage = JSON.parse(localStorage.getItem('todosTask'))

btnSend.addEventListener("click", createSendTask);
if(todosTaskLocalStorage){
  renderTaskPage(todosTaskLocalStorage);
}

function createSendTask(event) {
  event.preventDefault(); 
  if (validateForm()) {
    errText.classList.remove("opacity");
    return;
  }
  errText.classList.add("opacity");
  localStorage.setItem('todosTask', JSON.stringify(todos));
  todos.unshift(creteObjectTask());
  sortTasks(todos); 
  renderTaskPage(todos);
  inputNameTask.value = '';
  authorNameTask.value = '';
}
function sortTasks(arr) {
  const copyArr = arr.map((item, index) => {
    if (item.hasOwnProperty("counterId")) return item;
    item.counterId = index + 1;
    return item;
  });
  todos = copyArr.sort((a, b) => {
    return b.counterId - a.counterId;
  });
}

function renderTaskPage(arr) {
  listTaskPage.innerHTML = ""; 
  arr.forEach((item) => {
        createRenderTask(item);
  });
}
function createRenderTask(item) {
    const { name, author, status, id } = item;
  const template = `
  <div class ='container_item'>
  <p class='task_name task'>Задача:<span>${name}</span></p>
  <p class='task_author task'>Исполнитель:<span>${author}</span></p>
  <p class='task_status task'>Статус:<span>${status}</span></p>
  <p class='date_task task'>Дата:<span>${new Date(id).toLocaleDateString('be-by')}</span></p>
  <button class='btn_del' onclick ='delTasks(${id})' >Удалить</button>
  <button class='btn_edit' onclick ='editTask(${id})' >Редактировать</button>
  </div>
  <div class='edit_item none' id=${id}>
  <div class='wrapper_item-edit'>
  <label>Name edit</label>
  <input type='text' value="${name}" id='inputEditName' />
  </div>
    <div class='wrapper_item-edit'>
  <label>Author edit</label>
  <input type='text' value="${author}" id='inputEditAuthor' />
  </div>
    <div class='wrapper_item-edit'>
        <select id="selectEdit">
          <option hidden value="">Выберите статус задачи</option>
          <option value="В процессе">В процессе</option>
          <option value="Срочно">Срочно</option>
          <option value="Выполнено">Выполнено</option>
        </select>   
  </div>
  <button class = 'btnSave' onClick='saveEditTask(${id},event)' >Сохранить</button>
  <button class = 'btnCanc' onclick='exitFuncEdit(event)' >Отмена</button>
  </div>
  `;
  const li = document.createElement("li");
  li.insertAdjacentHTML("beforeend", template);
  listTaskPage.appendChild(li); 
}

function delTasks(id) {
  const filterArr = todos.filter((item) => item.id !== id);
  sortTasks(filterArr); 
  renderTaskPage(todos); 
}

function editTask(id) {
  const editItemArr = document.querySelectorAll(".edit_item");
  editItemArr.forEach((item) => {
    if (+item.id === id) {
            item.classList.remove("none");
    }
  });
}

function exitFuncEdit(event) {
    const parent = event.target.closest(".edit_item");
  parent.classList.add("none"); 
}

function saveEditTask(id, event) {
  const parent = event.target.closest(".edit_item"); 
  const inputEditName = parent.querySelector("#inputEditName").value;
  const inputEditAuthor = parent.querySelector("#inputEditAuthor").value;
  const selectEditTask = parent.querySelector("#selectEdit").value;
  const newTodos = todos.map((item) => {
    if (item.id === id) {
      item.name = inputEditName; 
      item.author = inputEditAuthor;
      item.status = selectEditTask;
      return item; 
    }
    return item; 
  });
  renderTaskPage(newTodos); 
}

function validateForm() {
   return (
    inputNameTask.value === "" ||
    authorNameTask.value === "" ||
    selectTask.value === ""
  );
}
function creteObjectTask() {
    const obj = {
    id: new Date().getTime(), 
    name: inputNameTask.value,
    author: authorNameTask.value,
    status: select.value,
  };
  inputNameTask.value = "";
  authorNameTask.value = "";
  selectTask.selectedIndex = 0; 
  return obj;
}

