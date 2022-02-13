const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { getHtml } = require("./request");

async function getElements(url, selector) {
  const html = await getHtml(url);
  const { document } = new JSDOM(html).window;
  return document.querySelectorAll(selector);
}

function getBlogElements(selector, year, month) {
  let baseUrl = "https://dev98.de/";
  let withYear = `${baseUrl}/${year}`;
  let withMonth = `${withYear}/${month}`;
  let url = year ? withYear : baseUrl;
  if (month) {
    url = withMonth;
  }
  return getElements(url, selector);
}

async function getAllBlogElements() {
  const articles = [];
  const urlList = await getArchiveUrlList();
  for (const url of urlList) {
    const _articles = await getElements(url, "article.post-content");
    articles.push(..._articles);
  }
  return articles;
}

async function getElementsByCategory(category) {
  const allElements = await getAllBlogElements();
  const relatedElements = allElements.filter((elem) =>
    elem.getAttribute("class").includes(`category-${category}`)
  );
  return relatedElements;
}

async function getElementsByTag(tag) {
  const allElements = await getAllBlogElements();
  const relatedElements = allElements.filter((elem) =>
    elem.getAttribute("class").includes(`tag-${tag}`)
  );
  return relatedElements;
}

async function getArchiveUrlList() {
  const anchors = await getBlogElements("#archives-2 li a");
  const urlList = [];
  for (const a of anchors) {
    urlList.push(a.getAttribute("href"));
  }
  return urlList;
}

module.exports = {
  getAllBlogElements,
  getBlogElements,
  getElementsByCategory,
  getElementsByTag,
};
