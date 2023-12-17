
const Todo = require('../models/todo') //<-- going up one level then over to models then todo

module.exports = {
    index, 
    show, 
    new: newTodo, 
    create, 
    delete: deleteTodo, 
    edit, 
    update
}

function update(req, res){
    req.body.done = !!req.body.done //<-- !! used to turn this into a boolean instead of 'on' or 'off'
    Todo.update(req.params.id, req.body)
    res.redirect(`/todos/${req.params.id}`)
}

function edit(req, res){
    const todo = Todo.getOne(req.params.id)
    res.render('todos/edit', {
        title: 'Edit To-Do',
        todo
    })
}

function deleteTodo(req, res){
    Todo.deleteOne(req.params.id)
    res.redirect('/todos')
}

function create(req, res){
    //Models are responsible for CRUD'ing the data
    Todo.create(req.body)

    //always do a redirect when data has been changed
    res.redirect('/todos')
}

function newTodo(req, res){
    res.render('todos/new', {title: 'New Todo'})
}

function show(req, res){
    res.render('todos/show', {
        todo: Todo.getOne(req.params.id),
        title: 'To-Do Details'
    })
}

function index(req, res) {
    res.render('todos/index', {
      todos: Todo.getAll(), //<-- Todo variable we created above
      title: 'All To-Dos'
    });
  }