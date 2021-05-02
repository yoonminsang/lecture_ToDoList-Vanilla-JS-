(function () {
  const TODOLIST = 'list';

  const form = document.querySelector('form');
  const toDoInput = document.querySelector('.toDo_input');
  const toDoMultiDelete = document.querySelector('.toDo_multi_delete');
  const toDoList = document.querySelector('.toDo_list');

  let list;
  const loadToDoList = () => {
    list = JSON.parse(localStorage.getItem(TODOLIST)) || [];
    list.forEach((v, i) => {
      v.id = i + 1;
      v.check = false;
      getToDoList(v);
    });
  };

  const saveToDoList = () => {
    const save = list.map((v) => {
      const obj = Object.assign({}, v);
      delete obj.id;
      delete obj.check;
      return obj;
    });
    localStorage.setItem(TODOLIST, JSON.stringify(save));
  };

  const toggleToDoList = (id) => {
    const findIdx = list.findIndex((v) => v.id === id);
    list[findIdx].check = !list[findIdx].check;
  };

  const deleteMultiToDoList = () => {
    const filter = list.filter((v) => v.check === true);
    filter.forEach((v) => {
      deleteToDoList(v.id);
    });
  };

  const deleteToDoList = (id) => {
    document.getElementById(id).remove();
    const findIdx = list.findIndex((v) => v.id === id);
    list.splice(findIdx, 1);
    saveToDoList();
  };

  const getTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + String(month);
    let datee = date.getDate();
    if (datee < 10) datee = '0' + String(datee);
    const day = date.toString().slice(0, 3);
    const dateArr = [year, month, datee, day];
    const time = date.toString().slice(16, 24);
    return dateArr.join(' ') + '  ' + time;
  };

  const addToDoList = (e) => {
    e.preventDefault();
    const id = list[list.length - 1] ? list[list.length - 1].id + 1 : 1;
    const toDo = toDoInput.value;
    const date = getTime();
    const check = false;
    list.push({ id, toDo, date, check });
    getToDoList(list[list.length - 1]);
    saveToDoList();
    toDoInput.value = '';
  };

  const getToDoList = (v) => {
    const { id, toDo, date } = v;
    const div = document.createElement('div');
    div.id = id;
    div.className = 'toDo_list_item';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.addEventListener('click', () => toggleToDoList(id));
    div.append(checkBox);
    const textDiv = document.createElement('div');
    textDiv.className = 'text';
    textDiv.textContent = toDo;
    div.append(textDiv);
    const dateDiv = document.createElement('div');
    dateDiv.className = 'date';
    dateDiv.textContent = date;
    div.append(dateDiv);
    const deleteBtn = document.createElement('input');
    deleteBtn.className = 'delete';
    deleteBtn.type = 'button';
    deleteBtn.value = '❌';
    deleteBtn.addEventListener('click', () => deleteToDoList(id));
    div.append(deleteBtn);
    toDoList.append(div);
  };
  const init = () => {
    loadToDoList();
    form.addEventListener('submit', addToDoList);
    toDoMultiDelete.addEventListener('click', deleteMultiToDoList);
  };
  init();
})();
