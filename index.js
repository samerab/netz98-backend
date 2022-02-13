const express = require("express");
const app = express();
const cors = require("cors");
const {
  getLatestArticles,
  getAllArticles,
  getArticlesByYear,
  getArticlesByCategory,
  getArticlesByTag,
} = require("./articles");

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.get("/api/articles", async (req, res) => {
  const articles = await getAllArticles();
  res.send({
    success: true,
    articles,
  });
});

app.get("/api/articles/:year", async (req, res) => {
  const year = req.params.year;
  const articles = await getArticlesByYear(year);
  res.send({
    success: true,
    articles,
  });
});

app.get("/api/category/:category", async (req, res) => {
  const category = req.params.category;
  const articles = await getArticlesByCategory(category);
  res.send({
    success: true,
    articles,
  });
});

app.get("/api/tag/:tag", async (req, res) => {
  const tag = req.params.tag;
  const articles = await getArticlesByTag(tag);
  res.send({
    success: true,
    articles,
  });
});

app.listen(3000, () => {
  console.log(`Listening...`);
});
