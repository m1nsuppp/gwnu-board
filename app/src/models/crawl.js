"use strict";

const axios = require('axios'); // 특정 URL의 HTML을 갖고 오는 역할을 수행.
const cheerio = require('cheerio'); // HTML Parsing.
const URL = 'https://ee.gwnu.ac.kr/ee2/31950/subview.do'; 

const getHTML = async(URL) => {
  try {
    return await axios.get(URL);
  } catch(error) {
    console.log(error);
  };
};

const parsing = async(URL) => {
  const html = await getHTML(URL);
  const $ = cheerio.load(html.data);
  const $articleList = $('._artclTdTitle');

  let titles = [];
  $articleList.each((idx, node) => {
    let articleTdTitle = $(node).find('a').text().trim();
    let articleTdLink = $(node).find('a').attr('href');

    titles.push({
      articleTitle: articleTdTitle,
      articleLink: `https://ee.gwnu.ac.kr/${articleTdLink}`,
    });
  });
};

parsing(URL);