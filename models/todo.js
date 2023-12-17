const todos = [
    {id: 125223, todo: 'Feed Dogs', done: true},
    {id: 127904, todo: 'Learn Express', done: false},
    {id: 139608, todo: 'Buy Milk', done: false}
  ];
	
  module.exports = {
    getAll, 
    getOne, 
    create, 
    deleteOne, 
    update
  };

  function update(id, updatedTodo){
    id = parseInt(id)

    const todo = todos.find(todo => todo.id === id)
    Object.assign(todo, updatedTodo) //<-- better programming
  }

  function deleteOne(id){
    //find index of todo delete item
    id = parseInt(id)
    const idx = todos.findIndex(todo => todo.id === id)
    todos.splice(idx, 1)
  }

  function create(todo){
    //Add the id
    todo.id = Date.now() % 1000000;
    todo.done = false
    todos.push(todo)
  }

  function getOne(id){
    id = parseInt(id)

    return todos.find(todo => todo.id === id)
  }
	
  function getAll() {
    return todos;
  }