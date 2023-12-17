var express = require('express');
var router = express.Router();
var todosCtrl = require('../controllers/todos')

//All actual paths start with "/todos"

//GET request /todos
router.get('/', todosCtrl.index);

//GET /todos/new //<-- this will need to be before the .show. 
//Creating a new todo item
router.get('/new', todosCtrl.new)

//GET /todos/:id
router.get('/:id', todosCtrl.show)//<-- reads a specific post, id used to get specific post
//get most likley is hyperlink
//The .show /:id will always match a pathway hyperlink since its a variable. 
//So any new .get will need to be before the show so there is no error and it
//renders the correct pathway

//GET EDIT /todos/:id/edit
router.get('/:id/edit', todosCtrl.edit)

//POST /todos
//creating a new todo item
router.post('/', todosCtrl.create)

//DELETE /todos/:id
router.delete('/:id', todosCtrl.delete)

//PUT /todos/:id
router.put('/:id', todosCtrl.update)



module.exports = router;

