(function () {
  const TODOLIST = 'list';

  const loadToDo = () => {
    let load = JSON.parse(localStorage.getItem(TODOLIST));
    load.forEach((v, i) => {
      v['id'] = i + 1;
      v['checkList'] = false;
    });
    console.log(load);
  };
  const init = () => {
    loadToDo();
  };
  init();
})();
