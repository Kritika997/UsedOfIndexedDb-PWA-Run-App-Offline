const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const Mongoose = require("mongoose");
const { addTodo } = require('../services/item.services');

router.get("/todos", (req, res) => {
  console.log("22222")
  //return all items
  const todos = Todo.find({}, (err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: todos
      });
    }
  });


});

//add an item
router.post("/add-todo", (req, res) => {

  let newtodo = {
    _id: new Mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
    done: req.body.done
  }
  
  addTodo(newtodo).then((response)=>{
    res.json({
      message: "Todo was saved successfully"
    })
  }).catch((err)=>{
    console.log(err);
    res.status(400).json({
      message: "The Todo was not saved",
      errorMessage: err.message
    })
  })

});


router.post("/bulk", (req, res) => {
  console.log(req.body,"4444444");

  Todo.insertMany(req.body, (err, docs) => {
    if (err) {
      res.status(400).json({
        message: "The Todos were not saved",
        errorMessage: err.message
      })
    } else {
      res.status(200).json({
        message: "Bulk document creation successful",

      })
    }
  })

})


router.delete("/todo/:id", (req, res) => {

  let id = req.body._id;
  console.log(id,"55555");


  let todoToDelete = Todo.deleteOne({ _id: id }, (err) => {
    if (err) {
      res.status(404).json({
        message: "Item was not found",
      });
    } else {
      res.status(200).json({
        message: "Item was deleted successfully",
      });
    }

  })

});


router.delete("/bulkDelete", (req, res) => {
  console.log(req.body,"6666");
  Todo.deleteMany({ _id: { $in: req.body } }, (err, response) => {
    if (err) {
      res.status(404).json({
        message: "todos not found",
      });
    } else {
      res.status(200).json({
        message: response,
      });
    }
  })
})

module.exports = router;