var express = require("express");
var router = express.Router();
var Book = require("../models/Book");
var Comment = require("../models/Comment");

/* GET users listing. */

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ books: books });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/", async(req, res, next) => {
  try{
    const book = await Book.create(req.body);
    res.status(200).redirect('/api/v1/books')
  }catch(e) {
    res.status(400).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("commentId");
    res.status(200).json({ book: book });
  } catch (e) {
    res.status(400).send(e);
  }
});


router.put('/:id', async(req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id , req.body, {new:true});
    res.json({updateBook:book});
  }catch(e) {
    res.status(400).send(e)
  }
})

router.delete('/:id',  async (req, res)=> {
  try{
    const book = await Book.findByIdAndDelete(req.params.id);
    const commentDelete = await Comment.deleteMany({bookId: book.id})
    console.log(book);
    res.status(200).json({book:book});
  }catch(e) {
    res.status(400).send(e)
  }
})

module.exports = router;
