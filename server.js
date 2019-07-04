const express = require("express");
const uuid = require("uuid");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const books = [
  {
    id: uuid(),
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41csVfG7xxL._SX337_BO1,204,203,200_.jpg"
  },
  {
    id: uuid(),
    title: "The Book Thief",
    author: "Markus Zusak",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/51C8Tg0TCaL._SX322_BO1,204,203,200_.jpg"
  }
];

app.get("/books", (req, res) => {
  res.json({ data: books });
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  res.json({ data: books.find(book => book.id === id) });
});

app.post("/books", (req, res) => {
  res.send({ data: books.concat(req.body) });
});

app.put("/books", (req, res) => {
  const { id } = req.params;
  res.json({ data: books.map(book => (book.id === id ? req.body : book)) });
});

app.delete("/books", (req, res) => {
  const { id } = req.params;
  res.json({ data: books.filter(book => book.id !== id) });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("Server running at localhost:" + port));
