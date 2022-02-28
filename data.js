const fs = require("fs");
const { getAllArticles } = require("./articles");

async function save() {
  const articles = await getAllArticles();
  let data = JSON.stringify({ articles }, null, 2);
  fs.writeFileSync("./data.json", data);
}

function fetch() {
  let rawdata = fs.readFileSync("./data.json");
  let data = JSON.parse(rawdata);
  return data.articles;
}

module.exports = {
  save,
  fetch,
};
