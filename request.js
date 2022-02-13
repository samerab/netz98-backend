const axios = require("axios");

async function getHtml(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response.status !== 404) {
      console.log(error.response);
    }
  }
}

module.exports.getHtml = getHtml;
