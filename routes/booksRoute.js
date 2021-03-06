const express = require("express");
const router = express.Router();
const bookService = require("../services/bookService");

router.get("/", async (req, res) => {
  res.json(await bookService.getAllBooks());
});

router.get("/searchdate/:date", async (req, res) => {
  try {
    const date = req.params.date;
    res.json(await bookService.getBooksFromDay(date));
  } catch (error) {
    res.json({ error: "Ocurrió un error en el servidor" });
  }
});

router.get("/searchid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    res.json(await bookService.getBookFromId(id));
  } catch (error) {
    res.json({ error: "Ocurrió un error en el servidor" });
  }
});

router.post("/", async (req, res) => {
  const { flat, password, day, hour } = req.body;
  try {
    res.json(await bookService.createBook(flat, password, day, hour));
  } catch (error) {
    res.json({ error: "Ocurrió un error en el servidor" });
  }
});

router.delete("/", async (req, res) => {
  const { day, hour, password } = req.body;
  try {
    res.json(await bookService.deleteBook(day, hour, password));
  } catch (error) {
    res.json({ error: "Ocurrió un error en el servidor" });
  }
});

module.exports = router;
