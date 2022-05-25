const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); // req.body

//ROUTES

//create a todo

app.post("/todos", async (req, res) => {
  //async providea await - ceka da se funkc izvrsi prije nego sto zavrsi
  try {
    //console.log(req.body);  u postmanu kada upisemo objekt descr: i need to clean my room u terminalu mi se ispise
    const { description } = req.body;
    const newTodo = await pool.query(
      //$1 je placeholder tj varijabla kokja ce specificirati ovaj description
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    //promjena

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todoId = $1", [id]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todoId = $2",
      [description, id]
    );

    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todoId = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.meassage);
  }
});

//-----------------------------------

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
