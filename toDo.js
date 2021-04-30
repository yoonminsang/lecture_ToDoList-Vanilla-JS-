(function () {
  const TODOLIST = 'list';

  const contentMenu = document.querySelector('.contnet_menu');
  const toDoInput = document.querySelector('.toDo_input');
  const toDoAdd = document.querySelector('.toDo_add');
  const toDoMultiDelete = document.querySelector('.toDo_multi_delete');
  const toDoList = document.querySelector('.toDo_list');

  let list;
  const loadToDoList = () => {
    list = JSON.parse(localStorage.getItem(TODOLIST));
    list.forEach((v, i) => {
      v['id'] = i + 1;
      v['check'] = false;
      getToDoList(v);
    });
  };

  const toggleToDoList = (id) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i]['id'] === id) {
        list[i]['check'] = !list[i]['check'];
        break;
      }
    }
  };
  const deleteToDoList = (id) => {
    document.getElementById(id).remove();
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
  };
  init();
})();
