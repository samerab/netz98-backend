const {
  getBlogElements,
  getElementsByCategory,
  getElementsByTag,
  getAllBlogElements,
} = require("./dom");

function getLatestArticles() {
  return getArticleInfoList();
}

async function getAllArticles() {
  const articles = await getAllBlogElements();
  const articleInfoList = generateArticleInfoList(articles);
  return articleInfoList;
}

function getArticlesByYear(year) {
  return getArticleInfoList(year);
}

async function getArticlesByCategory(category) {
  const articles = await getElementsByCategory(category);
  const articleInfoList = generateArticleInfoList(articles);
  return articleInfoList;
}

async function getArticlesByTag(Tag) {
  const articles = await getElementsByTag(Tag);
  const articleInfoList = generateArticleInfoList(articles);
  return articleInfoList;
}

async function getArticleInfoList(year) {
  const articles = await getBlogElements("article.post-content", year);
  const articleInfoList = generateArticleInfoList(articles);
  return articleInfoList;
}

function generateArticleInfoList(articles) {
  const infoList = [];
  articles.forEach((article) => {
    const _article = {};
    _article.id = getId(article);
    _article.imgSrc = getImgSrc(article);
    _article.link = getLink(article);
    _article.title = getTitle(article);
    _article.pubDate = getPubDate(article);
    _article.author = getAuthor(article);
    _article.summary = getSummary(article);
    _article.categories = getCategories(article);
    _article.tags = getTags(article);
    infoList.push(_article);
  });
  return infoList;
}

function getId(article) {
  return article?.getAttribute("id");
}

function getImgSrc(article) {
  return article.querySelector("div.featured-image a img")?.getAttribute("src");
}

function getLink(article) {
  return article.querySelector("h2.entry-title a")?.getAttribute("href");
}

function getTitle(article) {
  return article.querySelector("span.screen-reader-text")?.textContent;
}

function getPubDate(article) {
  return article
    .querySelector(".entry-meta h5.entry-date a time.entry-date")
    ?.getAttribute("datetime");
}

function getAuthor(article) {
  return article.querySelector(".entry-meta h5.entry-date .byline .author a")
    ?.textContent;
}
function getSummary(article) {
  return article.querySelector(".entry-summary p")?.textContent;
}

function getCategories(article) {
  const categories = getClassList(article)
    .filter((c) => c.startsWith("category"))
    .map((c) => c.slice(9));
  return categories;
}

function getTags(article) {
  const tags = getClassList(article)
    .filter((c) => c.startsWith("tag"))
    .map((c) => c.slice(4));
  return tags;
}

function getClassList(article) {
  const articleClass = article?.getAttribute("class");
  const classList = articleClass.split(" ");
  return classList;
}

module.exports = {
  getLatestArticles,
  getArticlesByYear,
  getArticlesByCategory,
  getArticlesByTag,
  getAllArticles,
};
